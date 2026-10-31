import test from 'node:test';
import assert from 'node:assert/strict';
import { MockServer, MemoryStorage, makeClock, isWeakPin } from '../src/server.js';
import { CONFIG } from '../src/config.js';
import { normalizePhone, isValidPhone, formatNational, maskPhone } from '../src/phone.js';

const MIN = 60 * 1000;
async function setup() {
  const storage = new MemoryStorage(); const clock = makeClock(storage);
  const server = await MockServer.create({ storage, clock });
  return { server, clock };
}
const phoneDev = { cls: 'phone', label: 'Test phone' };
const deskDev = { cls: 'large', label: 'Test desktop' };
const lastCode = async s => (await s.outbox())[0].code;
async function signIn(server, phone, deviceId, info = deskDev) {
  const c = await server.requestCode({ phone });
  const code = (await server.outbox())[0]?.code;
  const v = await server.verifyCode({ challengeId: c.challengeId, code, deviceId, deviceInfo: info });
  return { c, v };
}

test('phone helpers', () => {
  assert.equal(normalizePhone('+966 55 123 4521'), '551234521');
  assert.equal(normalizePhone('0551234521'), '551234521');
  assert.equal(normalizePhone('00966551234521'), '551234521');
  assert.equal(normalizePhone('٥٥١٢٣٤٥٢١'), '551234521');
  assert.ok(isValidPhone('551234521'));
  assert.ok(!isValidPhone('451234521') && !isValidPhone('55123452') && !isValidPhone('5512345211'));
  assert.equal(formatNational('551234521'), '55 123 4521');
  assert.equal(maskPhone('551234521'), '+966 55 \u2022\u2022\u2022 \u2022\u202221');
});

test('weak PINs are refused', () => {
  for (const p of ['000000', '111111', '123456', '654321', '234567', '098765']) assert.ok(isWeakPin(p), p);
  for (const p of ['482916', '739204', '135790']) assert.ok(!isWeakPin(p), p);
});

test('invalid phone is rejected before a code is sent', async () => {
  const { server } = await setup();
  assert.deepEqual(await server.requestCode({ phone: '123' }), { error: 'invalid_phone' });
  assert.equal((await server.outbox()).length, 0);
});

test('first sign in: code, PIN, device, then ready', async () => {
  const { server } = await setup();
  const { c, v } = await signIn(server, '551234521', 'dev-1');
  assert.equal(v.result, 'verified'); assert.equal(v.next, 'create_pin');
  assert.equal(c.masked, '+966 55 \u2022\u2022\u2022 \u2022\u202221');
  assert.deepEqual(await server.createPin({ ticket: v.ticket, pin: '123456' }), { error: 'weak_pin' });
  assert.deepEqual(await server.createPin({ ticket: v.ticket, pin: '12ab56' }), { error: 'invalid_pin' });
  const done = await server.createPin({ ticket: v.ticket, pin: '482916' });
  assert.equal(done.next, 'ready'); assert.equal(done.user.landing, 'home');
  assert.equal((await server.getSession({ token: done.session.token })).state, 'active');
  assert.deepEqual(await server.createPin({ ticket: v.ticket, pin: '482916' }), { error: 'ticket_expired' }, 'ticket is single use');
});

test('wrong code, then the right one', async () => {
  const { server } = await setup();
  const c = await server.requestCode({ phone: '541112233' });
  const code = await lastCode(server); const wrong = code === '000000' ? '111111' : '000000';
  const w = await server.verifyCode({ challengeId: c.challengeId, code: wrong, deviceId: 'd', deviceInfo: deskDev });
  assert.deepEqual(w, { result: 'wrong', attemptsLeft: CONFIG.maxOtpAttempts - 1 });
  const ok = await server.verifyCode({ challengeId: c.challengeId, code, deviceId: 'd', deviceInfo: deskDev });
  assert.equal(ok.next, 'landing');
  const again = await server.verifyCode({ challengeId: c.challengeId, code, deviceId: 'd', deviceInfo: deskDev });
  assert.equal(again.result, 'expired', 'a used code cannot be replayed');
});

test('too many wrong codes burn the challenge', async () => {
  const { server } = await setup();
  const c = await server.requestCode({ phone: '541112233' });
  const code = await lastCode(server); const wrong = code === '000000' ? '111111' : '000000';
  let r;
  for (let i = 0; i < CONFIG.maxOtpAttempts; i++) r = await server.verifyCode({ challengeId: c.challengeId, code: wrong, deviceId: 'd', deviceInfo: deskDev });
  assert.equal(r.result, 'too_many');
  const late = await server.verifyCode({ challengeId: c.challengeId, code, deviceId: 'd', deviceInfo: deskDev });
  assert.equal(late.result, 'expired');
});

test('codes expire after five minutes, resend gives a fresh one and kills the old one', async () => {
  const { server, clock } = await setup();
  const c = await server.requestCode({ phone: '541112233' });
  const first = await lastCode(server);
  clock.advance(CONFIG.otpTtlMs + 1000);
  assert.equal((await server.verifyCode({ challengeId: c.challengeId, code: first, deviceId: 'd', deviceInfo: deskDev })).result, 'expired');
  const r = await server.resendCode({ challengeId: c.challengeId });
  assert.ok(r.expiresAt > c.expiresAt);
  const second = await lastCode(server);
  if (second !== first) assert.equal((await server.verifyCode({ challengeId: c.challengeId, code: first, deviceId: 'd', deviceInfo: deskDev })).result, 'wrong');
  assert.equal((await server.verifyCode({ challengeId: c.challengeId, code: second, deviceId: 'd', deviceInfo: deskDev })).result, 'verified');
});

test('resend cooldown and hourly send cap', async () => {
  const { server, clock } = await setup();
  const c = await server.requestCode({ phone: '541112233' });
  const early = await server.resendCode({ challengeId: c.challengeId });
  assert.equal(early.error, 'cooldown'); assert.ok(early.retryAt > clock.now());
  for (let i = 1; i < CONFIG.maxSendsPerWindow; i++) { clock.advance(CONFIG.resendCooldownMs + 1); assert.ok(!(await server.resendCode({ challengeId: c.challengeId })).error); }
  clock.advance(CONFIG.resendCooldownMs + 1);
  assert.equal((await server.resendCode({ challengeId: c.challengeId })).error, 'send_limit');
  assert.equal((await server.requestCode({ phone: '541112233' })).error, 'send_limit');
  clock.advance(CONFIG.sendWindowMs);
  assert.ok(!(await server.requestCode({ phone: '541112233' })).error);
});

test('unknown numbers look identical but never get a code', async () => {
  const { server } = await setup();
  const c = await server.requestCode({ phone: '500000000' });
  assert.ok(c.challengeId); assert.equal((await server.outbox()).length, 0);
  const v = await server.verifyCode({ challengeId: c.challengeId, code: '123456', deviceId: 'd', deviceInfo: deskDev });
  assert.equal(v.result, 'wrong');
});

test('inactive accounts see Access unavailable only after the code', async () => {
  const { server } = await setup();
  const { v } = await signIn(server, '584445566', 'dev-x');
  assert.deepEqual(v, { result: 'verified', next: 'unavailable' });
});

test('role landing pages', async () => {
  const { server } = await setup();
  const land = {};
  for (const [phone, key] of [['541112233', 'chief'], ['562223344', 'rep'], ['573334455', 'operator']]) {
    let { v } = await signIn(server, phone, 'dev-' + key);
    if (v.next === 'create_pin') v = await server.createPin({ ticket: v.ticket, pin: '482916' });
    land[key] = v.user.landing;
  }
  assert.deepEqual(land, { chief: 'home', rep: 'stock', operator: 'clinics' });
});

test('device limit: one phone and one large device, a chief doctor can free a slot', async () => {
  const { server } = await setup();
  const { v } = await signIn(server, '595556677', 'new-laptop');
  assert.equal(v.next, 'device_limit'); assert.equal(v.devices.length, 2);
  assert.equal((await server.getSession({ token: 'nope' })).state, 'none');
  await server.adminRemoveDevice({ userId: 'u-omar', deviceId: 'seed-omar-desktop' });
  const retry = await signIn(server, '595556677', 'new-laptop');
  assert.equal(retry.v.next, 'landing');
  const phone = await signIn(server, '595556677', 'second-phone', phoneDev);
  assert.equal(phone.v.next, 'device_limit', 'the phone slot is still taken');
});

test('idle lock after 30 minutes, three wrong PINs lock the PIN, support reset recovers', async () => {
  const { server, clock } = await setup();
  const { v } = await signIn(server, '541112233', 'dev-k');
  const token = v.session.token;
  clock.advance(CONFIG.idleLockMs - MIN); assert.equal((await server.touch({ token })).state, 'active');
  clock.advance(CONFIG.idleLockMs + MIN); assert.equal((await server.getSession({ token })).state, 'locked');
  assert.deepEqual(await server.unlock({ token, pin: '000111' }), { result: 'wrong', attemptsLeft: 2 });
  assert.deepEqual(await server.unlock({ token, pin: '000111' }), { result: 'wrong', attemptsLeft: 1 });
  assert.deepEqual(await server.unlock({ token, pin: '000111' }), { result: 'pin_locked' });
  assert.equal((await server.unlock({ token, pin: '482916' })).result, 'pin_locked', 'the right PIN does not help once locked');
  assert.equal((await server.getSession({ token })).state, 'pin_locked');
  await server.adminResetPin({ userId: 'u-khalid' });
  const again = await signIn(server, '541112233', 'dev-k');
  assert.equal(again.v.next, 'create_pin');
});

test('unlocking never extends the eight hour session', async () => {
  const { server, clock } = await setup();
  const { v } = await signIn(server, '541112233', 'dev-k');
  const token = v.session.token; const end = v.session.expiresAt;
  clock.advance(CONFIG.idleLockMs + MIN);
  const u = await server.unlock({ token, pin: '482916' });
  assert.equal(u.result, 'ok'); assert.equal(u.expiresAt, end);
  clock.advance(CONFIG.sessionTtlMs);
  const s = await server.getSession({ token });
  assert.equal(s.state, 'expired'); assert.equal(s.phone, '541112233');
});

test('sign in again keeps the registered device', async () => {
  const { server, clock } = await setup();
  const first = await signIn(server, '595556677', 'seed-omar-desktop');
  assert.equal(first.v.next, 'landing', 'a registered device skips the limit check');
  clock.advance(CONFIG.sessionTtlMs + MIN);
  assert.equal((await server.getSession({ token: first.v.session.token })).state, 'expired');
  const second = await signIn(server, '595556677', 'seed-omar-desktop');
  assert.equal(second.v.next, 'landing');
});

test('sign out ends the session', async () => {
  const { server } = await setup();
  const { v } = await signIn(server, '541112233', 'dev-k');
  await server.signOut({ token: v.session.token });
  assert.equal((await server.getSession({ token: v.session.token })).state, 'none');
});
