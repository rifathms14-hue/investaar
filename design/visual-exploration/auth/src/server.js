// In-browser stand-in for the Rushta auth service. It holds every rule the
// wireframes describe so the screens stay thin. Swap this file for real API
// calls later; the method names and result shapes are the contract.
import { CONFIG, ROLES } from './config.js';
import { isValidPhone, maskPhone } from './phone.js';

const enc = new TextEncoder();
const hex = bytes => [...new Uint8Array(bytes)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha256 = async s => hex(await crypto.subtle.digest('SHA-256', enc.encode(s)));
const rid = (n = 12) => hex(crypto.getRandomValues(new Uint8Array(n)));
const digits = n => [...crypto.getRandomValues(new Uint32Array(n))].map(v => v % 10).join('');

// A mock only. A real service needs a slow salted hash for PINs.
const hashSecret = (salt, value) => sha256(`${salt}:${value}`);

export function isWeakPin(pin) {
  if (/^(\d)\1+$/.test(pin)) return true;
  const d = [...pin].map(Number);
  const steps = d.slice(1).map((v, i) => (v - d[i] + 10) % 10);
  return steps.every(s => s === 1) || steps.every(s => s === 9);
}

export class MemoryStorage {
  constructor() { this.m = new Map(); }
  getItem(k) { return this.m.has(k) ? this.m.get(k) : null; }
  setItem(k, v) { this.m.set(k, String(v)); }
  removeItem(k) { this.m.delete(k); }
}

export function makeClock(storage) {
  const KEY = 'rushta.timeOffset';
  return {
    now: () => Date.now() + Number(storage.getItem(KEY) || 0),
    advance(ms) { storage.setItem(KEY, Number(storage.getItem(KEY) || 0) + ms); },
    reset() { storage.removeItem(KEY); },
  };
}

const DEMO_USERS = [
  { id: 'u-noura', name: 'Dr Noura Al Qahtani', nameAr: 'د. نورة القحطاني', role: 'doctor', phone: '551234521', note: 'New doctor, no PIN yet. Walks the whole first-login path.' },
  { id: 'u-khalid', name: 'Dr Khalid Al Otaibi', nameAr: 'د. خالد العتيبي', role: 'chief', phone: '541112233', pin: '482916', note: 'Chief doctor, PIN already set (482916).' },
  { id: 'u-reem', name: 'Reem Al Harbi', nameAr: 'ريم الحربي', role: 'rep', phone: '562223344', note: 'Medical rep, lands on Stock.' },
  { id: 'u-faisal', name: 'Faisal Al Dosari', nameAr: 'فيصل الدوسري', role: 'operator', phone: '573334455', note: 'Munjze operator, lands on the clinic list.' },
  { id: 'u-sara', name: 'Dr Sara Al Mutairi', nameAr: 'د. سارة المطيري', role: 'doctor', phone: '584445566', status: 'inactive', note: 'Access revoked. Shows Access unavailable after the code.' },
  { id: 'u-omar', name: 'Dr Omar Al Ghamdi', nameAr: 'د. عمر الغامدي', role: 'doctor', phone: '595556677', pin: '739204', devices: 'full', note: 'Phone and desktop already registered. A new device hits the limit.' },
];

export class MockServer {
  constructor({ storage, clock, latency = 0 }) {
    this.storage = storage; this.clock = clock; this.latency = latency; this.KEY = 'rushta.server';
  }

  static async create(opts) {
    const s = new MockServer(opts);
    if (!s.storage.getItem(s.KEY)) await s.reset();
    return s;
  }

  // ---------- plumbing
  _load() { return JSON.parse(this.storage.getItem(this.KEY)); }
  _save(db) { this.storage.setItem(this.KEY, JSON.stringify(db)); }
  async _wait() { if (this.latency) await new Promise(r => setTimeout(r, this.latency)); }
  async _op(fn) { await this._wait(); const db = this._load(); const out = await fn(db); this._save(db); return out; }
  _now() { return this.clock.now(); }
  _userByPhone(db, phone) { return Object.values(db.users).find(u => u.phone === phone) || null; }
  _public(u) { return { id: u.id, name: u.name, nameAr: u.nameAr, role: u.role, landing: ROLES[u.role].landing, clinic: 'GlowRx Clinic', phone: u.phone, masked: maskPhone(u.phone) }; }

  async reset() {
    const db = { users: {}, challenges: {}, tickets: {}, sessions: {}, sends: {}, outbox: [] };
    for (const d of DEMO_USERS) {
      const salt = rid(8);
      db.users[d.id] = {
        id: d.id, name: d.name, nameAr: d.nameAr, role: d.role, phone: d.phone, status: d.status || 'active', note: d.note,
        pin: d.pin ? { salt, hash: await hashSecret(salt, d.pin) } : null, pinAttempts: 0, pinLocked: false,
        devices: d.devices === 'full' ? [
          { id: 'seed-omar-phone', label: 'Samsung Galaxy · phone', cls: 'phone', registeredAt: Date.UTC(2026, 9, 26) },
          { id: 'seed-omar-desktop', label: 'Clinic laptop · desktop', cls: 'large', registeredAt: Date.UTC(2026, 9, 28) },
        ] : [],
      };
    }
    this._save(db);
  }

  // ---------- one-time codes
  _issue(db, phone, user, ch) {
    const now = this._now();
    const sends = (db.sends[phone] || []).filter(t => now - t < CONFIG.sendWindowMs);
    if (sends.length >= CONFIG.maxSendsPerWindow) return { error: 'send_limit', retryAt: sends[0] + CONFIG.sendWindowMs };
    const code = digits(CONFIG.otpLength); const salt = rid(8);
    return (async () => {
      ch.salt = salt; ch.hash = await hashSecret(salt, code); ch.expiresAt = now + CONFIG.otpTtlMs; ch.attempts = 0; ch.lastSentAt = now; ch.burned = false;
      sends.push(now); db.sends[phone] = sends;
      // Unknown numbers get the same response and no message. No account probing.
      if (user) db.outbox.push({ to: phone, code, at: now, body: `Your Rushta verification code is ${code}. It expires in 5 minutes.` });
      return { challengeId: ch.id, expiresAt: ch.expiresAt, resendAt: now + CONFIG.resendCooldownMs, masked: maskPhone(phone) };
    })();
  }

  requestCode({ phone }) {
    return this._op(async db => {
      if (!isValidPhone(phone)) return { error: 'invalid_phone' };
      const user = this._userByPhone(db, phone);
      const ch = { id: rid(), phone, userId: user ? user.id : null };
      db.challenges[ch.id] = ch;
      const r = await this._issue(db, phone, user, ch);
      if (r.error) delete db.challenges[ch.id];
      return r;
    });
  }

  resendCode({ challengeId }) {
    return this._op(async db => {
      const ch = db.challenges[challengeId];
      if (!ch) return { error: 'unknown_challenge' };
      const wait = ch.lastSentAt + CONFIG.resendCooldownMs;
      if (this._now() < wait) return { error: 'cooldown', retryAt: wait };
      return this._issue(db, ch.phone, ch.userId ? db.users[ch.userId] : null, ch);
    });
  }

  verifyCode({ challengeId, code, deviceId, deviceInfo }) {
    return this._op(async db => {
      const ch = db.challenges[challengeId];
      if (!ch || ch.burned) return { result: 'expired' };
      if (this._now() > ch.expiresAt) return { result: 'expired' };
      if (ch.attempts >= CONFIG.maxOtpAttempts) return { result: 'too_many' };
      const ok = ch.userId && (await hashSecret(ch.salt, code)) === ch.hash;
      if (!ok) {
        ch.attempts += 1;
        if (ch.attempts >= CONFIG.maxOtpAttempts) { ch.burned = true; return { result: 'too_many' }; }
        return { result: 'wrong', attemptsLeft: CONFIG.maxOtpAttempts - ch.attempts };
      }
      ch.burned = true;
      const t = { id: rid(), userId: ch.userId, deviceId, deviceInfo, expiresAt: this._now() + 10 * 60 * 1000, stage: 'verified' };
      db.tickets[t.id] = t;
      return this._advance(db, t, false);
    });
  }

  // ---------- what happens after a verified code
  _advance(db, t, firstTime) {
    const u = db.users[t.userId];
    if (u.status !== 'active') { delete db.tickets[t.id]; return { result: 'verified', next: 'unavailable' }; }
    if (!u.pin) { t.stage = 'need_pin'; return { result: 'verified', next: 'create_pin', ticket: t.id, user: this._public(u) }; }
    return this._deviceStep(db, t, u, firstTime);
  }

  _deviceStep(db, t, u, firstTime) {
    const known = u.devices.some(d => d.id === t.deviceId);
    if (!known) {
      const cls = t.deviceInfo.cls;
      if (u.devices.filter(d => d.cls === cls).length >= (CONFIG.deviceLimits[cls] ?? 1)) {
        t.stage = 'device_limit';
        return { result: 'verified', next: 'device_limit', ticket: t.id, devices: u.devices.map(d => ({ id: d.id, label: d.label, registeredAt: d.registeredAt })), user: this._public(u) };
      }
      u.devices.push({ id: t.deviceId, label: t.deviceInfo.label, cls, registeredAt: this._now() });
    }
    delete db.tickets[t.id];
    return { result: 'verified', next: firstTime ? 'ready' : 'landing', ...this._start(db, u, t.deviceId) };
  }

  _start(db, u, deviceId) {
    for (const [k, s] of Object.entries(db.sessions)) if (s.userId === u.id && s.deviceId === deviceId) delete db.sessions[k];
    const now = this._now(); const token = rid(16);
    db.sessions[token] = { token, userId: u.id, deviceId, startedAt: now, expiresAt: now + CONFIG.sessionTtlMs, lastActivityAt: now, locked: false };
    return { session: { token, expiresAt: now + CONFIG.sessionTtlMs }, user: this._public(u) };
  }

  createPin({ ticket, pin }) {
    return this._op(async db => {
      const t = db.tickets[ticket];
      if (!t || this._now() > t.expiresAt || t.stage !== 'need_pin') return { error: 'ticket_expired' };
      if (!new RegExp(`^\\d{${CONFIG.pinLength}}$`).test(pin)) return { error: 'invalid_pin' };
      if (isWeakPin(pin)) return { error: 'weak_pin' };
      const u = db.users[t.userId]; const salt = rid(8);
      u.pin = { salt, hash: await hashSecret(salt, pin) }; u.pinAttempts = 0; u.pinLocked = false;
      return this._deviceStep(db, t, u, true);
    });
  }

  // ---------- sessions
  _state(db, s) {
    if (!s) return { state: 'none' };
    const u = db.users[s.userId]; const now = this._now();
    if (!u || u.status !== 'active') { delete db.sessions[s.token]; return { state: 'revoked' }; }
    if (now >= s.expiresAt) { delete db.sessions[s.token]; return { state: 'expired', phone: u.phone, masked: maskPhone(u.phone), user: this._public(u) }; }
    if (u.pinLocked) return { state: 'pin_locked', user: this._public(u) };
    if (s.locked || now - s.lastActivityAt >= CONFIG.idleLockMs) { s.locked = true; return { state: 'locked', user: this._public(u), expiresAt: s.expiresAt }; }
    return { state: 'active', user: this._public(u), expiresAt: s.expiresAt };
  }

  getSession({ token }) { return this._op(db => this._state(db, db.sessions[token])); }

  touch({ token }) {
    return this._op(db => { const s = db.sessions[token]; const st = this._state(db, s); if (st.state === 'active') s.lastActivityAt = this._now(); return st; });
  }

  lock({ token }) { return this._op(db => { const s = db.sessions[token]; if (s) s.locked = true; return { ok: true }; }); }

  unlock({ token, pin }) {
    return this._op(async db => {
      const s = db.sessions[token]; const st = this._state(db, s);
      if (st.state === 'expired' || st.state === 'none' || st.state === 'revoked') return { result: 'session_expired' };
      const u = db.users[s.userId];
      if (u.pinLocked) return { result: 'pin_locked' };
      if ((await hashSecret(u.pin.salt, pin)) !== u.pin.hash) {
        u.pinAttempts += 1;
        if (u.pinAttempts >= CONFIG.maxPinAttempts) { u.pinLocked = true; return { result: 'pin_locked' }; }
        return { result: 'wrong', attemptsLeft: CONFIG.maxPinAttempts - u.pinAttempts };
      }
      u.pinAttempts = 0; s.locked = false; s.lastActivityAt = this._now(); // expiresAt is never touched
      return { result: 'ok', expiresAt: s.expiresAt };
    });
  }

  signOut({ token }) { return this._op(db => { delete db.sessions[token]; return { ok: true }; }); }

  getTicketDevices({ ticket }) {
    return this._op(db => { const t = db.tickets[ticket]; return t ? { devices: db.users[t.userId].devices } : { error: 'ticket_expired' }; });
  }

  // ---------- demo and support tools (Munjze, chief doctor, WhatsApp)
  outbox() { return this._op(db => db.outbox.slice(-5).reverse()); }
  demoUsers() { return this._op(db => Object.values(db.users).map(u => ({ id: u.id, name: u.name, role: u.role, phone: u.phone, status: u.status, note: u.note, hasPin: !!u.pin, devices: u.devices.length, pinLocked: u.pinLocked }))); }
  adminResetPin({ userId }) { return this._op(db => { const u = db.users[userId]; u.pin = null; u.pinAttempts = 0; u.pinLocked = false; for (const k of Object.keys(db.sessions)) if (db.sessions[k].userId === userId) delete db.sessions[k]; return { ok: true }; }); }
  adminRemoveDevice({ userId, deviceId }) { return this._op(db => { const u = db.users[userId]; u.devices = u.devices.filter(d => d.id !== deviceId); return { ok: true }; }); }
  adminClearDevices({ userId }) { return this._op(db => { db.users[userId].devices = []; return { ok: true }; }); }
  adminSetStatus({ userId, status }) { return this._op(db => { db.users[userId].status = status; return { ok: true }; }); }
}
