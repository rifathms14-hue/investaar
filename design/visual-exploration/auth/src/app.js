import { MockServer, makeClock, isWeakPin } from './server.js';
import { CONFIG } from './config.js';
import { STR } from './i18n.js';
import { normalizePhone, isValidPhone, formatNational, maskPhone } from './phone.js';

const params = new URLSearchParams(location.search);
const storage = window.localStorage;
const clock = makeClock(storage);
const server = await MockServer.create({ storage, clock, latency: Number(params.get('latency') ?? 150) });

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- language
let lang = params.get('lang') || storage.getItem('rushta.lang') || (navigator.language?.startsWith('ar') ? 'ar' : 'en');
const t = (key, vars = {}) => (STR[lang][key] ?? STR.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
const locale = () => (lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB');
const fmtDate = ms => new Date(ms).toLocaleDateString(locale(), { day: 'numeric', month: 'short', year: 'numeric' });
const fmtTime = ms => new Date(ms).toLocaleTimeString(locale(), { hour: '2-digit', minute: '2-digit' });
const mmss = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
const ltr = s => `<bdi dir="ltr">${esc(s)}</bdi>`;
const personName = u => (lang === 'ar' ? u.nameAr : u.name);

// ---------- device
const deviceId = params.get('deviceId') || storage.getItem('rushta.deviceId') || (() => { const id = crypto.randomUUID(); storage.setItem('rushta.deviceId', id); return id; })();
const deviceInfo = () => {
  const cls = params.get('device') || (matchMedia('(max-width: 767px)').matches ? 'phone' : 'large');
  return { cls, label: `${cls === 'phone' ? 'Phone' : 'Desktop'} · ${navigator.platform || 'browser'}` };
};

// ---------- state
const S = { screen: null, phone: storage.getItem('rushta.lastPhone') || '', challenge: null, ticket: null, devices: [], pinDraft: '', user: null, token: storage.getItem('rushta.token'), mode: null, attemptsLeft: null, error: null, flash: null, expiredReason: null, from: null };
let timers = [];
const clearTimers = () => { timers.forEach(clearInterval); timers = []; };
const every = (ms, fn) => { timers.push(setInterval(fn, ms)); };

function setSession(session, user) { S.token = session.token; S.user = user; storage.setItem('rushta.token', session.token); S.phone = user.phone; storage.setItem('rushta.lastPhone', user.phone); S.sessionEnds = session.expiresAt; }
function dropSession() { S.token = null; S.user = null; storage.removeItem('rushta.token'); }

// ---------- shell
const MARK = `<svg class="mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="#03442D" transform="translate(7.4 12)" d="M 9.168 7.2468 L 9.168 10.9164 C 9.168 11.514 8.6832 11.9988 8.0856 11.9988 L 1.7508 11.9988 C 0.7848 11.9988 0 11.2152 0 10.248 L 0 4.5828 C 0 2.8512 0.7092 1.1952 1.9608 0 C 2.646 2.8152 4.9068 4.974 7.7508 5.5284 C 8.574 5.688 9.168 6.408 9.168 7.2468 Z"/><path fill="#03442D" transform="translate(7.4 0)" d="M 0 4.752 L 0 1.0824 C 0 0.4848 0.4848 0 1.0824 0 L 7.4172 0 C 8.3832 0 9.168 0.7836 9.168 1.7508 L 9.168 7.416 C 9.168 9.1476 8.4588 10.8036 7.2072 11.9988 C 6.522 9.1836 4.2612 7.0248 1.4172 6.4704 C 0.594 6.3108 0 5.5908 0 4.752 Z"/><path fill="#01BE84" transform="translate(0 7.4)" d="M 4.752 9.168 L 1.0824 9.168 C 0.4848 9.168 0 8.6832 0 8.0856 L 0 1.7508 C 0 0.7848 0.7836 0 1.7508 0 L 7.416 0 C 9.1476 0 10.8036 0.7092 11.9988 1.9608 C 9.1836 2.646 7.0248 4.9068 6.4704 7.7508 C 6.3108 8.574 5.5908 9.168 4.752 9.168 Z"/><path fill="#01BE84" transform="translate(12 7.4)" d="M 7.2468 0 L 10.9164 0 C 11.514 0 11.9988 0.4848 11.9988 1.0824 L 11.9988 7.4172 C 11.9988 8.3832 11.2152 9.168 10.248 9.168 L 4.5828 9.168 C 2.8512 9.168 1.1952 8.4588 0 7.2072 C 2.8152 6.522 4.974 4.2612 5.5284 1.4172 C 5.688 0.594 6.408 0 7.2468 0 Z"/></svg>`;
const ICON = {
  back: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  chev: '<svg viewBox="0 0 14 14" width="14" height="14" fill="none" aria-hidden="true"><path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  info: '<svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.4"/><path d="M9 8v4.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="9" cy="5.6" r=".9" fill="currentColor"/></svg>',
  ban: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M5.6 5.6l12.8 12.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  warn: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true"><path d="M12 4L2.8 19.5h18.4L12 4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M12 10v4.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  alert: '<svg viewBox="0 0 18 18" width="18" height="18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="7.25" stroke="currentColor" stroke-width="1.5"/><path d="M9 5.2v4.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="12.3" r=".95" fill="currentColor"/></svg>',
};
// How far along sign in the progress line is. Screens outside the sign in path show none.
const PROG = { signin: 0.33, signin_again: 0.33, verify: 0.66, wrong: 0.66, expired: 0.66, create_pin: 0.8, confirm_pin: 0.9, ready: 1 };
const backTarget = () => ({ verify: 'signin', wrong: 'signin', expired: 'signin', confirm_pin: 'create_pin', device_limit: 'signin', recovery: S.token && S.from ? S.from : 'signin' }[S.screen]);

function shell(inner) {
  const p = PROG[S.screen]; const back = backTarget();
  return `<a class="skip" href="#main">${esc(t('skip'))}</a>
  <div class="stage"><div class="card">
    <aside class="panel" aria-hidden="true">
      <div class="fade"></div>
      <div class="panel-text"><p class="tagline">${esc(t('tagline'))}</p><p class="panel-sub">${esc(t('panelSub'))}</p></div>
      <p class="chip"><i></i><span>${esc(t('chip'))}</span></p>
    </aside>
    <div class="formside">
      ${p != null ? `<div class="progress" role="progressbar" aria-label="${esc(t('progress'))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p * 100)}"><i style="width:${p * 100}%"></i></div>` : '<div class="progress-gap"></div>'}
      <header class="topbar">
        ${back ? `<button type="button" class="iconbtn" data-act="back" aria-label="${esc(t('back'))}">${ICON.back}</button>` : '<span></span>'}
        <div class="langswitch" dir="ltr" role="group" aria-label="Language">
          <button type="button" data-lang="en" lang="en" aria-pressed="${lang === 'en'}">${STR.en.langEn}</button>
          <button type="button" class="switch" role="switch" data-act="toggle-lang" aria-checked="${lang === 'ar'}" aria-label="${esc(t('switchLabel'))}"><i></i></button>
          <button type="button" data-lang="ar" lang="ar" aria-pressed="${lang === 'ar'}">${STR.ar.langAr}</button>
        </div>
      </header>
      <main id="main" tabindex="-1">${inner}</main>
    </div>
  </div></div>`;
}

const head = (key, eyebrow, lead) => `<div class="lockup">${MARK}<span>${esc(t('brand'))}</span></div>${eyebrow ? `<p class="sr-only">${esc(eyebrow)}</p>` : ''}<h1 id="title" tabindex="-1">${esc(t(key))}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}`;
const alertBox = (kind, title, body) => `<div class="alert alert-${kind}" role="alert"><span class="ic">${kind === 'error' ? ICON.ban : ICON.warn}</span><div class="txt"><strong>${esc(title)}</strong><span>${esc(body)}</span></div><button type="button" class="x" data-dismiss aria-label="${esc(t('dismiss'))}">${ICON.close}</button></div>`;
const codeBoxes = (label, secret) => `<fieldset class="codefield"><legend class="sr-only">${esc(label)}</legend><div class="code" dir="ltr">${[0, 1, 2, 3, 4, 5].map(i =>
  `<input ${secret ? 'type="password"' : 'type="text"'} inputmode="numeric" pattern="[0-9]*" autocomplete="${!secret && i === 0 ? 'one-time-code' : 'off'}" aria-label="${esc(label)} ${i + 1} / 6" data-i="${i}">`).join('')}</div></fieldset>`;
const btn = (id, label, cls = 'btn-primary', extra = '') => `<button type="button" id="${id}" class="btn ${cls}" ${extra}>${esc(label)}</button>`;
const status = () => `<p id="status" class="status" role="status" aria-live="polite">${S.flash ? esc(S.flash) : ''}</p>`;

// ---------- reusable behaviours
function bindCode(root, { onChange = () => {}, onEnter = () => {} } = {}) {
  const boxes = [...root.querySelectorAll('.code input')];
  const val = () => boxes.map(b => b.value).join('');
  const fill = (start, d) => { for (let k = 0; k < d.length && start + k < boxes.length; k++) boxes[start + k].value = d[k]; boxes[Math.min(start + d.length, boxes.length - 1)].focus(); onChange(val()); };
  boxes.forEach((b, i) => {
    b.addEventListener('input', () => { const d = b.value.replace(/\D/g, ''); if (d.length > 1) return fill(i, d); b.value = d; if (d && boxes[i + 1]) boxes[i + 1].focus(); onChange(val()); });
    b.addEventListener('keydown', e => {
      if (e.key === 'Backspace' && !b.value && i > 0) { boxes[i - 1].value = ''; boxes[i - 1].focus(); onChange(val()); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' && i > 0) boxes[i - 1].focus();
      else if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
      else if (e.key === 'Enter') onEnter(val());
    });
    b.addEventListener('paste', e => { const d = (e.clipboardData.getData('text') || '').replace(/\D/g, ''); if (d) { e.preventDefault(); fill(i, d); } });
    b.addEventListener('focus', () => b.select());
  });
  return { val, focus: () => boxes[0].focus(), clear() { boxes.forEach(b => (b.value = '')); boxes[0].focus(); onChange(''); }, invalid(on) { boxes.forEach(b => b.setAttribute('aria-invalid', on ? 'true' : 'false')); } };
}

async function busy(button, fn) {
  if (!button || button.disabled) return;
  const was = button.disabled; button.disabled = true; button.setAttribute('aria-busy', 'true');
  try { await fn(); } finally { if (button.isConnected) { button.removeAttribute('aria-busy'); button.disabled = was; } }
}
const say = msg => { S.flash = msg; const el = $('#status'); if (el) el.textContent = msg; };

// ---------- screens: each returns { html, mount }
const SCREENS = {
  signin() {
    return {
      html: `${head('signin.title', t('signin.eyebrow'), esc(t('signin.lead')))}
      <form id="f" novalidate>
        <label for="phone">${esc(t('signin.label'))}</label>
        <div class="phone" dir="ltr"><span class="cc" aria-hidden="true">+966 ${ICON.chev}</span><input id="phone" name="phone" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="5X XXX XXXX" aria-describedby="phone-help phone-err" value="${esc(formatNational(S.phone))}"><span class="info" aria-hidden="true">${ICON.info}</span></div>
        <p id="phone-help" class="help">${esc(t('signin.help'))}</p>
        <p id="phone-err" class="error" role="alert">${S.error ? esc(S.error) : ''}</p>
        <button id="send" class="btn btn-primary" type="submit" disabled>${esc(t('signin.send'))}</button>
      </form>
      <p class="note"><strong>${esc(t('signin.needA'))}</strong> ${esc(t('signin.needB'))}</p>`,
      mount() {
        const input = $('#phone'), send = $('#send');
        const sync = () => { const n = normalizePhone(input.value).slice(0, 9); input.value = formatNational(n); S.phone = n; send.disabled = !isValidPhone(n); };
        input.addEventListener('input', () => { S.error = null; $('#phone-err').textContent = ''; sync(); });
        sync(); input.focus();
        $('#f').addEventListener('submit', e => { e.preventDefault(); if (!send.disabled) busy(send, () => requestCodeFor(S.phone)); });
      },
    };
  },

  verify() { return verifyScreen(false); },
  wrong() { return verifyScreen(true); },

  expired() {
    const many = S.expiredReason === 'many';
    return {
      html: `${head('expired.title', t('expired.eyebrow'), esc(t('expired.lead')))}
      ${alertBox('warn', t(many ? 'many.alertTitle' : 'expired.alertTitle'), t(many ? 'many.alertBody' : 'expired.alertBody'))}
      ${status()}
      <div class="actions">${btn('resend', t('expired.send'))}${btn('change', t('wrong.change'), 'btn-secondary')}</div>`,
      mount() {
        $('#resend').addEventListener('click', e => busy(e.currentTarget, resend));
        $('#change').addEventListener('click', () => go('signin'));
      },
    };
  },

  create_pin() {
    return {
      html: `${head('pin.title', t('pin.eyebrow'), esc(t('pin.lead')))}
      ${codeBoxes(t('pin.label'), true)}
      <p id="pin-err" class="error" role="alert">${S.error ? esc(S.error) : ''}</p>
      <div class="callout"><strong>${esc(t('pin.doctorTitle'))}</strong><span>${esc(t('pin.doctorBody'))}</span></div>
      ${btn('go', t('pin.continue'), 'btn-primary', 'disabled')}`,
      mount() {
        const go_ = () => { const pin = c.val(); if (pin.length < CONFIG.pinLength) return; if (isWeakPin(pin)) { c.clear(); S.error = t('pin.weak'); $('#pin-err').textContent = S.error; c.invalid(true); return; } S.error = null; S.pinDraft = pin; go('confirm_pin'); };
        const c = bindCode($('#main'), { onChange: v => { $('#go').disabled = v.length < CONFIG.pinLength; if (S.error) { S.error = null; $('#pin-err').textContent = ''; c.invalid(false); } }, onEnter: go_ });
        $('#go').addEventListener('click', go_); c.focus();
      },
    };
  },

  confirm_pin() {
    return {
      html: `${head('confirm.title', t('confirm.eyebrow'), esc(t('confirm.lead')))}
      ${codeBoxes(t('pin.label'), true)}
      <p id="pin-err" class="error" role="alert">${S.error ? esc(S.error) : ''}</p>
      <div class="actions">${btn('go', t('confirm.save'), 'btn-primary', 'disabled')}${btn('other', t('confirm.other'), 'btn-secondary')}</div>`,
      mount() {
        const save = () => busy($('#go'), async () => {
          const pin = c.val(); if (pin.length < CONFIG.pinLength) return;
          if (pin !== S.pinDraft) { c.clear(); S.error = t('confirm.mismatch'); $('#pin-err').textContent = S.error; c.invalid(true); return; }
          const r = await server.createPin({ ticket: S.ticket, pin });
          S.pinDraft = '';
          if (r.error === 'weak_pin') { S.error = t('pin.weak'); return go('create_pin'); }
          if (r.error) { S.error = t('err.ticket'); S.ticket = null; return go('signin'); }
          handleVerified(r);
        });
        const c = bindCode($('#main'), { onChange: v => { $('#go').disabled = v.length < CONFIG.pinLength; if (S.error) { S.error = null; $('#pin-err').textContent = ''; c.invalid(false); } }, onEnter: save });
        $('#go').addEventListener('click', save);
        $('#other').addEventListener('click', () => { S.pinDraft = ''; S.error = null; go('create_pin'); });
        c.focus();
      },
    };
  },

  device_limit() {
    return {
      html: `${head('limit.title', t('limit.eyebrow'), esc(t('limit.lead')))}
      <section aria-labelledby="devs"><h2 id="devs" class="h2">${esc(t('limit.list'))}</h2>
      <ul class="list">${S.devices.map(d => `<li><strong>${esc(d.label)}</strong><span>${esc(t('limit.registered', { d: fmtDate(d.registeredAt) }))}</span><span class="tag">${esc(t('limit.trusted'))}</span></li>`).join('')}</ul></section>
      <div class="callout"><strong>${esc(t('limit.removeTitle'))}</strong><span>${esc(t('limit.removeBody'))}</span></div>
      ${btn('back', t('limit.back'), 'btn-secondary')}`,
      mount() { $('#back').addEventListener('click', () => { S.ticket = null; go('signin'); }); },
    };
  },

  ready() {
    const role = S.user.role; const items = { doctor: ['doctor1', 'doctor2'], chief: ['chief1', 'chief2'], rep: ['rep1'], operator: ['operator1'] }[role];
    return {
      html: `${head('ready.title', t('ready.eyebrow', { name: personName(S.user) }), esc(t('ready.lead')))}
      <section aria-labelledby="ws"><h2 id="ws" class="h2">${esc(t('ready.workspace'))}</h2>
      <ul class="list">${items.map(k => `<li><strong>${esc(t('ready.' + k))}</strong><span>${esc(t('ready.' + k + 'b'))}</span></li>`).join('')}<li><span class="tag">${esc(t('role.' + role))}</span> <span>${esc(t('clinic'))}</span></li></ul></section>
      ${btn('open', t('ready.open'))}`,
      mount() { $('#open').addEventListener('click', () => go(S.user.landing === 'home' ? 'home' : S.user.landing)); },
    };
  },

  unlock() {
    return {
      html: `${head('unlock.title', t('unlock.eyebrow', { name: personName(S.user) }), esc(t('unlock.lead')))}
      ${codeBoxes(t('unlock.label'), true)}
      <p id="pin-err" class="error" role="alert">${S.error ? esc(S.error) : ''}</p>
      ${btn('go', t('unlock.submit'), 'btn-primary', 'disabled')}
      <div class="actions">${btn('forgot', t('unlock.forgot'), 'link')}${btn('out', t('unlock.signout'), 'link')}</div>`,
      mount() {
        const submit = () => busy($('#go'), async () => {
          const pin = c.val(); if (pin.length < CONFIG.pinLength) return;
          const r = await server.unlock({ token: S.token, pin });
          if (r.result === 'ok') { S.error = null; return go(landingScreen()); }
          if (r.result === 'pin_locked') return go('pin_locked');
          if (r.result === 'session_expired') return go('signin_again');
          S.error = r.attemptsLeft === 1 ? t('unlock.one') : t('unlock.wrong', { n: r.attemptsLeft }); $('#pin-err').textContent = S.error; c.invalid(true); c.clear();
        });
        const c = bindCode($('#main'), { onChange: v => { $('#go').disabled = v.length < CONFIG.pinLength; }, onEnter: submit });
        $('#go').addEventListener('click', submit);
        $('#forgot').addEventListener('click', () => { S.from = 'unlock'; go('recovery'); });
        $('#out').addEventListener('click', signOut); c.focus();
      },
    };
  },

  pin_locked() {
    return {
      html: `${head('locked.title', t('locked.eyebrow'), esc(t('locked.lead')))}
      <div class="callout"><strong>${esc(t('locked.recTitle'))}</strong><span>${esc(t('locked.recBody'))}</span></div>
      <div class="actions">${btn('help', t('locked.help'))}${btn('back', t('locked.back'), 'btn-secondary')}</div>`,
      mount() { $('#help').addEventListener('click', () => { S.from = 'pin_locked'; go('recovery'); }); $('#back').addEventListener('click', signOut); },
    };
  },

  signin_again() {
    return {
      html: `${head('again.title', t('again.eyebrow'), esc(t('again.lead')))}
      <dl class="kv"><dt>${esc(t('again.mobile'))}</dt><dd>${ltr(maskPhone(S.phone))}</dd></dl>
      <p id="phone-err" class="error" role="alert">${S.error ? esc(S.error) : ''}</p>
      ${btn('send', t('again.send'))}
      <div class="callout"><strong>${esc(t('again.stayTitle'))}</strong><span>${esc(t('again.stayBody'))}</span></div>
      ${btn('other', t('again.other'), 'link')}`,
      mount() {
        $('#send').addEventListener('click', e => busy(e.currentTarget, () => requestCodeFor(S.phone)));
        $('#other').addEventListener('click', () => { S.phone = ''; go('signin'); });
      },
    };
  },

  recovery() {
    return {
      html: `${head('rec.title', t('rec.eyebrow'), esc(t('rec.lead')))}
      <section aria-labelledby="nx"><h2 id="nx" class="h2">${esc(t('rec.next'))}</h2>
      <ol class="list steps">${[1, 2, 3].map(n => `<li><strong>${esc(t('rec.s' + n))}</strong><span>${esc(t('rec.s' + n + 'b'))}</span></li>`).join('')}</ol></section>
      ${btn('back', t('rec.back'), 'btn-secondary')}`,
      mount() { $('#back').addEventListener('click', () => (S.token && S.from ? go(S.from) : go('signin'))); },
    };
  },

  unavailable() {
    return {
      html: `${head('na.title', t('na.eyebrow'), esc(t('na.lead')))}
      <div class="callout"><strong>${esc(t('na.retTitle'))}</strong><span>${esc(t('na.retBody'))}</span></div>
      ${btn('back', t('na.back'), 'btn-secondary')}`,
      mount() { $('#back').addEventListener('click', signOut); },
    };
  },
};

// Role landing placeholders. Sign in is the part built so far.
for (const w of ['home', 'stock', 'clinics']) {
  SCREENS[w] = () => ({
    html: `<p class="eyebrow">${esc(t('role.' + S.user.role))} · ${esc(t('clinic'))}</p><h1 id="title" tabindex="-1">${esc(t('ws.' + w))}</h1>
    <p class="lead">${esc(t('ws.signedIn', { name: personName(S.user) }))}</p>
    <p class="help">${esc(t('ws.session', { t: fmtTime(S.sessionEnds) }))}</p>
    <p class="note">${esc(t('ws.placeholder', { w: t('ws.' + w) }))}</p>
    <div class="actions">${btn('lock', t('ws.lock'), 'btn-secondary')}${btn('out', t('ws.signout'), 'link')}</div>`,
    mount() { $('#lock').addEventListener('click', async () => { await server.lock({ token: S.token }); checkSession(); }); $('#out').addEventListener('click', signOut); },
  });
}

const landingScreen = () => (S.user.landing === 'home' ? 'home' : S.user.landing);

function verifyScreen(wrong) {
  const ch = S.challenge;
  const lead = wrong ? esc(t('wrong.lead'))
    : `${esc(t('verify.eyebrow'))}. ${esc(t('verify.lead', { masked: '\u0000' })).replace('\u0000', ltr(ch.masked))} <button type="button" id="change" class="link inline">${esc(t('verify.change'))}</button>`;
  return {
    html: `${head(wrong ? 'wrong.title' : 'verify.title', wrong ? t('wrong.eyebrow') : '', lead)}
    ${codeBoxes(t('verify.codeLabel'), false)}
    ${wrong ? alertBox('error', t('wrong.alertTitle'), `${t('wrong.alertBody')} ${S.attemptsLeft != null ? t('wrong.left', { n: S.attemptsLeft }) : ''}`) : ''}
    <div class="meta"><p id="timer" class="timer"></p>${btn('resend', t('verify.resend'), 'link', 'disabled')}</div>
    ${status()}<p id="demo" class="demo" hidden></p>
    ${btn('go', wrong ? t('wrong.retry') : t('verify.submit'), 'btn-primary', 'disabled')}
    ${wrong ? btn('change', t('wrong.change'), 'btn-secondary') : ''}`,
    mount() {
      const go_ = () => busy($('#go'), async () => {
        const code = c.val(); if (code.length < CONFIG.otpLength) return;
        const r = await server.verifyCode({ challengeId: ch.challengeId, code, deviceId, deviceInfo: deviceInfo() });
        if (r.result === 'wrong') { S.attemptsLeft = r.attemptsLeft; S.flash = null; return go('wrong'); }
        if (r.result === 'expired') { S.expiredReason = 'expired'; return go('expired'); }
        if (r.result === 'too_many') { S.expiredReason = 'many'; return go('expired'); }
        handleVerified(r);
      });
      const c = bindCode($('#main'), { onChange: v => { $('#go').disabled = v.length < CONFIG.otpLength; }, onEnter: go_ });
      if (wrong) c.invalid(true);
      $('#go').addEventListener('click', go_);
      $('#resend').addEventListener('click', e => busy(e.currentTarget, async () => { await resend(); c.clear(); }));
      $('#change').addEventListener('click', () => go('signin'));
      const tick = () => {
        const left = ch.expiresAt - clock.now();
        if (left <= 0) { S.expiredReason = 'expired'; return go('expired'); }
        $('#timer').innerHTML = esc(t('verify.expires', { t: '\u0000' })).replace('\u0000', ltr(mmss(left)));
        const wait = ch.resendAt - clock.now(), rb = $('#resend');
        if (rb && !rb.hasAttribute('aria-busy')) { rb.disabled = wait > 0; rb.textContent = wait > 0 ? t('verify.resendIn', { s: Math.ceil(wait / 1000) }) : t('verify.resend'); }
      };
      tick(); every(500, tick); c.focus();
      if (params.get('dev') !== '0') server.outbox().then(m => { const el = $('#demo'); if (el && m[0]) { el.hidden = false; el.innerHTML = `${esc(t('demo.code'))} ${ltr(m[0].code)}`; } });
    },
  };
}

// ---------- flows
async function requestCodeFor(phone) {
  const r = await server.requestCode({ phone });
  if (r.error === 'invalid_phone') { S.error = t('err.phone'); return go(S.screen); }
  if (r.error === 'send_limit') { S.error = t('err.sendLimit', { m: Math.max(1, Math.ceil((r.retryAt - clock.now()) / 60000)) }); return go(S.screen); }
  if (r.error) { S.error = t('err.generic'); return go(S.screen); }
  S.error = null; S.flash = null; S.phone = phone; storage.setItem('rushta.lastPhone', phone); S.challenge = r; go('verify');
}

async function resend() {
  const r = await server.resendCode({ challengeId: S.challenge.challengeId });
  if (r.error === 'cooldown') { S.challenge.resendAt = r.retryAt; return say(t('verify.resendIn', { s: Math.ceil((r.retryAt - clock.now()) / 1000) })); }
  if (r.error === 'send_limit') return say(t('err.sendLimit', { m: Math.max(1, Math.ceil((r.retryAt - clock.now()) / 60000)) }));
  if (r.error) return say(t('err.generic'));
  S.challenge = { ...S.challenge, ...r }; S.attemptsLeft = null; S.flash = t('verify.resent');
  if (S.screen !== 'verify') go('verify'); else say(S.flash);
}

function handleVerified(r) {
  if (r.next === 'unavailable') return go('unavailable');
  if (r.next === 'create_pin') { S.ticket = r.ticket; S.user = r.user; S.error = null; return go('create_pin'); }
  if (r.next === 'device_limit') { S.ticket = r.ticket; S.devices = r.devices; return go('device_limit'); }
  setSession(r.session, r.user); startMonitor();
  go(r.next === 'ready' ? 'ready' : landingScreen());
}

async function signOut() { if (S.token) await server.signOut({ token: S.token }); dropSession(); stopMonitor(); S.error = null; go('signin'); }

// ---------- session monitor: idle lock after 30 min, hard stop after 8 h
let monitor = null, dirty = false;
const LOCKABLE = new Set(['home', 'stock', 'clinics', 'ready']);
function startMonitor() { stopMonitor(); monitor = setInterval(checkSession, 4000); }
function stopMonitor() { clearInterval(monitor); monitor = null; }
['pointerdown', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => { dirty = true; }, { passive: true }));

async function checkSession() {
  if (!S.token) return;
  const st = LOCKABLE.has(S.screen) && dirty ? await server.touch({ token: S.token }) : await server.getSession({ token: S.token });
  if (LOCKABLE.has(S.screen)) dirty = false;
  if (st.user) { S.user = st.user; }
  if (st.state === 'locked' && S.screen !== 'unlock' && S.screen !== 'recovery') { S.error = null; go('unlock'); }
  else if (st.state === 'pin_locked' && S.screen !== 'pin_locked' && S.screen !== 'recovery') go('pin_locked');
  else if (st.state === 'expired' && S.screen !== 'signin_again' && !['verify', 'wrong', 'expired'].includes(S.screen)) { dropSession(); stopMonitor(); S.phone = st.phone; go('signin_again'); }
  else if (st.state === 'revoked') { dropSession(); stopMonitor(); go('unavailable'); }
  else if (st.state === 'none') { dropSession(); stopMonitor(); if (S.screen !== 'signin') go('signin'); }
}

// ---------- rendering
const TITLE_KEY = { signin: 'signin', verify: 'verify', wrong: 'wrong', expired: 'expired', create_pin: 'pin', confirm_pin: 'confirm', device_limit: 'limit', ready: 'ready', unlock: 'unlock', pin_locked: 'locked', signin_again: 'again', recovery: 'rec', unavailable: 'na' };
let lastScreen = null;
function render({ focus = true } = {}) {
  clearTimers();
  document.documentElement.lang = lang; document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = `${TITLE_KEY[S.screen] ? t(`${TITLE_KEY[S.screen]}.title`) : t(`ws.${S.screen}`)} · ${t('brand')}`;
  const v = SCREENS[S.screen]();
  $('#app').innerHTML = shell(v.html);
  const setLang = l => { lang = l; storage.setItem('rushta.lang', lang); render({ focus: false }); $(`[data-lang="${lang}"]`)?.focus(); };
  $('#app').querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  $('[data-act="toggle-lang"]').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));
  const back = $('[data-act="back"]'); if (back) back.addEventListener('click', () => go(backTarget()));
  $('#app').querySelectorAll('[data-dismiss]').forEach(b => b.addEventListener('click', () => b.closest('.alert').remove()));
  v.mount && v.mount();
  if (focus && lastScreen !== S.screen) { const h = $('#title'); if (h && !document.activeElement?.closest('.code, .phone')) h.focus({ preventScroll: true }); }
  lastScreen = S.screen;
  renderDev();
}

function go(screen) { S.screen = screen; render(); }

// ---------- demo tools: simulated WhatsApp, demo accounts, time travel, support actions
async function renderDev() {
  const el = $('#dev'); if (!el || params.get('dev') === '0') return;
  const [msgs, users] = await Promise.all([server.outbox(), server.demoUsers()]);
  const open = el.querySelector('details')?.open ?? params.get('dev') === '1';
  el.innerHTML = `<details ${open ? 'open' : ''}><summary>Demo tools</summary>
    <section><h2>WhatsApp (simulated)</h2>${msgs.length ? `<ul>${msgs.map(m => `<li data-testid="wa">+966 ${esc(m.to)}: <code>${esc(m.code)}</code> <small>${new Date(m.at).toLocaleTimeString()}</small></li>`).join('')}</ul>` : '<p>No messages yet.</p>'}</section>
    <section><h2>Demo accounts</h2><table><tbody>${users.map(u => `<tr><td>${esc(u.name)}<br><small>${esc(u.role)} · ${esc(u.note)}</small></td><td><button type="button" data-dev="use" data-phone="${u.phone}">Use +966 ${esc(u.phone)}</button></td><td>
      <button type="button" data-dev="reset-pin" data-user="${u.id}">Munjze: reset PIN${u.pinLocked ? ' (locked)' : ''}</button>
      <button type="button" data-dev="status" data-user="${u.id}" data-status="${u.status === 'inactive' ? 'active' : 'inactive'}">${u.status === 'inactive' ? 'Restore access' : 'Revoke access'}</button>
      ${u.devices ? `<button type="button" data-dev="free" data-user="${u.id}">Chief: remove devices (${u.devices})</button>` : ''}</td></tr>`).join('')}</tbody></table></section>
    <section><h2>Time travel</h2>
      <button type="button" data-dev="time" data-ms="${CONFIG.otpTtlMs + 1000}">Expire the code (+5 min)</button>
      <button type="button" data-dev="time" data-ms="${CONFIG.resendCooldownMs + 1000}">+30 s</button>
      <button type="button" data-dev="time" data-ms="${CONFIG.idleLockMs + 1000}">Idle 30 min</button>
      <button type="button" data-dev="time" data-ms="${CONFIG.sessionTtlMs + 1000}">Session +8 h</button>
      <button type="button" data-dev="reset">Reset demo data</button></section></details>`;
  el.querySelectorAll('[data-dev]').forEach(b => b.addEventListener('click', async () => {
    const d = b.dataset;
    if (d.dev === 'use') { dropSession(); stopMonitor(); S.phone = d.phone; S.error = null; return go('signin'); }
    if (d.dev === 'reset-pin') await server.adminResetPin({ userId: d.user });
    if (d.dev === 'status') await server.adminSetStatus({ userId: d.user, status: d.status });
    if (d.dev === 'free') await server.adminClearDevices({ userId: d.user });
    if (d.dev === 'time') clock.advance(Number(d.ms));
    if (d.dev === 'reset') { await server.reset(); clock.reset(); dropSession(); stopMonitor(); S.phone = ''; return go('signin'); }
    await checkSession(); renderDev();
  }));
}

// ---------- boot
(async function boot() {
  if (S.token) {
    const st = await server.getSession({ token: S.token });
    if (st.state === 'active') { S.user = st.user; S.sessionEnds = st.expiresAt; startMonitor(); return go(landingScreen()); }
    if (st.state === 'locked') { S.user = st.user; S.sessionEnds = st.expiresAt; startMonitor(); return go('unlock'); }
    if (st.state === 'pin_locked') { S.user = st.user; startMonitor(); return go('pin_locked'); }
    if (st.state === 'expired') { dropSession(); S.phone = st.phone; return go('signin_again'); }
    dropSession();
  }
  go('signin');
})();
