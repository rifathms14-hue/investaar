// Click-through of every access screen in a real browser. Run: npm run e2e
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8765;
const server = spawn('python3', ['-m', 'http.server', String(PORT), '-d', root], { stdio: 'ignore' });
await new Promise(r => setTimeout(r, 800));
const base = `http://localhost:${PORT}/index.html?latency=0&dev=1`;

const browser = await chromium.launch();
let n = 0; const step = name => console.log(`${String(++n).padStart(2, '0')} ${name}`);
const h1 = p => p.locator('h1');
const expectH1 = async (p, text) => { await p.waitForFunction(t => document.querySelector('h1')?.textContent.trim() === t, text, { timeout: 4000 }).catch(async () => { throw new Error(`expected H1 "${text}", got "${await p.locator('h1').textContent()}"`); }); };
const typeCode = async (p, code) => { await p.locator('.code input').first().click(); await p.keyboard.type(code); };
const lastCode = async p => { await p.waitForSelector('[data-testid=wa] code'); return (await p.locator('[data-testid=wa] code').first().textContent()).trim(); };
const useAccount = async (p, phone) => { await p.click(`[data-dev=use][data-phone="${phone}"]`); await p.fill('#phone', phone); await p.click('#send'); await expectH1(p, 'Verify your mobile number'); };
const signInWithCode = async (p, phone) => { await useAccount(p, phone); await typeCode(p, await lastCode(p)); await p.click('#go'); };
const dev = (p, label) => p.click(`#dev button:has-text("${label}")`);
const fresh = async (opts = {}) => { const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...opts }); const p = await ctx.newPage(); p.on('pageerror', e => { throw e; }); await p.goto(base); return p; };

try {
  let p = await fresh();
  step('A01 loads, button disabled until a valid Saudi number');
  await expectH1(p, 'Sign in to Rushta');
  assert.equal(await p.locator('#send').isDisabled(), true);
  await p.fill('#phone', '451234521'); assert.equal(await p.locator('#send').isDisabled(), true);
  await p.fill('#phone', '0551234521'); assert.equal(await p.inputValue('#phone'), '55 123 4521'); assert.equal(await p.locator('#send').isDisabled(), false);

  step('A02 code sent to a masked number, countdown running');
  await p.click('#send'); await expectH1(p, 'Verify your mobile number');
  assert.match(await p.locator('.lead').textContent(), /\+966 55 ••• ••21/);
  assert.match(await p.locator('#timer').textContent(), /Code expires in 0[45]:\d\d/);
  assert.equal(await p.locator('#resend').isDisabled(), true);
  assert.equal(await p.locator('#go').isDisabled(), true);

  step('A03 wrong code shows the alert and attempts left');
  const code = await lastCode(p); const wrong = code === '000000' ? '111111' : '000000';
  await typeCode(p, wrong); await p.click('#go'); await expectH1(p, 'Verification code not recognised');
  assert.match(await p.locator('.alert').textContent(), /Incorrect code.*4 attempts left/);

  step('A02 resend unlocks after the cooldown');
  await dev(p, '+30 s'); await p.waitForFunction(() => !document.querySelector('#resend').disabled);
  await p.click('#resend'); await p.waitForFunction(() => document.querySelector('#status')?.textContent.includes('new code'));
  const code2 = await lastCode(p);

  step('A05 PIN: weak refused, strong accepted');
  await typeCode(p, code2); await p.click('#go'); await expectH1(p, 'Create your PIN');
  await typeCode(p, '123456'); await p.click('#go'); assert.match(await p.locator('#pin-err').textContent(), /harder to guess/);
  await typeCode(p, '482916'); await p.click('#go'); await expectH1(p, 'Confirm your PIN');

  step('A06 mismatch is caught, a different PIN can be chosen');
  await typeCode(p, '482917'); await p.click('#go'); assert.match(await p.locator('#pin-err').textContent(), /do not match/);
  await p.click('#other'); await expectH1(p, 'Create your PIN');
  await typeCode(p, '482916'); await p.click('#go'); await typeCode(p, '482916'); await p.click('#go');

  step('A08 ready screen for a doctor, then Home');
  await expectH1(p, 'You are ready to begin'); assert.match(await p.locator('main').textContent(), /Write and share prescriptions/);
  await p.click('#open'); await expectH1(p, 'Home');

  step('A09 idle 30 minutes locks the screen, wrong PIN counts down, right PIN unlocks');
  await dev(p, 'Idle 30 min'); await expectH1(p, 'Unlock Rushta');
  await typeCode(p, '000111'); await p.click('#go'); assert.match(await p.locator('#pin-err').textContent(), /2 attempts left/);
  await typeCode(p, '482916'); await p.click('#go'); await expectH1(p, 'Home');

  step('A10 three wrong PINs lock the PIN, A12 recovery is reachable');
  await dev(p, 'Idle 30 min'); await expectH1(p, 'Unlock Rushta');
  for (let i = 0; i < 3; i++) { await typeCode(p, '000111'); await p.click('#go'); await p.waitForTimeout(60); }
  await expectH1(p, 'PIN locked'); await p.click('#help'); await expectH1(p, 'Account recovery'); await p.click('#back'); await expectH1(p, 'PIN locked');

  step('Munjze resets the PIN, the next sign in asks for a new one');
  await p.click('#back'); await expectH1(p, 'Sign in to Rushta');
  await p.click('#dev button[data-dev=reset-pin][data-user=u-noura]');
  await signInWithCode(p, '551234521'); await expectH1(p, 'Create your PIN');

  step('A04 an expired code, then a fresh one signs a returning chief doctor straight in');
  p = await fresh(); await useAccount(p, '541112233');
  await dev(p, 'Expire the code'); await expectH1(p, 'Verification code expired');
  await p.click('#resend'); await expectH1(p, 'Verify your mobile number');
  await typeCode(p, await lastCode(p)); await p.click('#go'); await expectH1(p, 'Home');

  step('A11 eight hours later: sign in again, device stays registered');
  await dev(p, 'Session +8 h'); await expectH1(p, 'Sign in again');
  assert.match(await p.locator('.kv').textContent(), /\+966 54 ••• ••33/);
  await p.click('#send'); await expectH1(p, 'Verify your mobile number');
  await typeCode(p, await lastCode(p)); await p.click('#go'); await expectH1(p, 'Home');

  step('Too many wrong codes burn the challenge');
  await p.click('#out'); await useAccount(p, '541112233');
  const real = await lastCode(p); const bad = real === '000000' ? '111111' : '000000';
  for (let i = 0; i < 5; i++) { await typeCode(p, bad); await p.click('#go'); if (i < 4) await expectH1(p, 'Verification code not recognised'); }
  await expectH1(p, 'Verification code expired'); assert.match(await p.locator('.alert').textContent(), /Too many attempts/);

  step('A13 revoked access shows Access unavailable only after the code');
  p = await fresh(); await signInWithCode(p, '584445566'); await expectH1(p, 'Access unavailable');

  step('A07 device limit lists both devices, a chief doctor frees one');
  p = await fresh(); await signInWithCode(p, '595556677'); await expectH1(p, 'Device limit reached');
  assert.equal(await p.locator('.list li').count(), 2);
  await p.click('#dev button[data-dev=free]'); await p.click('#back'); await signInWithCode(p, '595556677'); await expectH1(p, 'Home');

  step('Role landings: rep sees Stock, operator sees the clinic list');
  p = await fresh(); await signInWithCode(p, '562223344'); await typeCode(p, '482916'); await p.click('#go'); await typeCode(p, '482916'); await p.click('#go'); await expectH1(p, 'You are ready to begin'); await p.click('#open'); await expectH1(p, 'Stock');
  p = await fresh(); await signInWithCode(p, '573334455'); await typeCode(p, '739204'); await p.click('#go'); await typeCode(p, '739204'); await p.click('#go'); await p.click('#open'); await expectH1(p, 'Clinic list');

  step('Arabic flips direction and copy, numbers stay left to right');
  p = await fresh(); await p.click('[data-lang=ar]');
  assert.equal(await p.getAttribute('html', 'dir'), 'rtl'); await expectH1(p, 'تسجيل الدخول إلى رُشتة');
  assert.equal(await p.locator('.phone').getAttribute('dir'), 'ltr');

  step('Mobile width has no sideways scroll');
  p = await fresh({ viewport: { width: 390, height: 844 } });
  assert.ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'horizontal overflow');
  console.log('\nAll steps passed');
} finally {
  await browser.close(); server.kill();
}
