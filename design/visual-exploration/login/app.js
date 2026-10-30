(function () {
  var MARK_C = '__MARK_C__', MARK_R = '__MARK_R__';
  var P = {
    alert: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v5 M12 16h.01', clock: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v4l3 2',
    check: 'M6 12.5l4 4L18 8', back: 'M15 5l-7 7 7 7', del: 'M9 6h10a1 1 0 011 1v10a1 1 0 01-1 1H9l-5-6z M12 10l4 4 M16 10l-4 4'
  };
  function ic(n, s, cls) { return '<svg class="ic ' + (cls || '') + '" width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }
  function scallop() { var pts = [], n = 120, i, a, r; for (i = 0; i <= n; i++) { a = i / n * Math.PI * 2; r = 32 + 2.4 * Math.sin(a * 12); pts.push((34 + r * Math.cos(a)).toFixed(2) + ' ' + (34 + r * Math.sin(a)).toFixed(2)); } return '<svg class="bg" viewBox="0 0 68 68" aria-hidden="true"><path d="M' + pts.join('L') + 'Z" fill="#80DEC1"/></svg>'; }

  var S = {
    en: {
      title1: 'Sign in to Rushta', lead1: 'Enter your mobile number to receive a verification code on WhatsApp.', mobile: 'Mobile number', hint1: 'Use the number registered by your clinic.',
      send: 'Send verification code', sending: 'Sending code', need: 'Need access?', need_s: 'Ask your chief doctor to add your mobile number.', bad_phone: 'Enter nine digits starting with 5.',
      title2: 'Verify your mobile number', lead2: 'Check WhatsApp. We sent a six-digit code to', exp: 'Code expires in', resend: 'Resend code', resend_in: 'Resend in', change: 'Change number', verify: 'Verify and continue', verifying: 'Verifying', code_label: 'Verification code',
      title3: 'Verification code not recognised', lead3: 'Enter the latest code from WhatsApp.', a_bad: 'Incorrect code', a_bad_s: 'That code did not match. Please try again.', retry: 'Try again', change_m: 'Change mobile number',
      title4: 'Verification code expired', lead4: 'The previous code has expired.', a_exp: 'Code expired', a_exp_s: 'Request a new WhatsApp code to continue.', newcode: 'Send a new code',
      sent: 'New code sent', sent_s: 'Check WhatsApp for the latest code.', ok_t: 'Number verified', ok_s: 'Next, create a six-digit PIN to unlock Rushta.', cont: 'Continue',
      tag: 'Write. Share. Collect.', panel_s: 'A connected prescription workspace for your clinic and pharmacy.', clinic: 'GlowRx Clinic', end_t: 'End of this flow', end_s: 'Next screen: Create your PIN (A05).', again: 'Start again', lang: 'Language', back: 'Back', pad: 'Number pad', del: 'Delete',
      s1: 'A01', s2: 'A02', s3: 'A03', s4: 'A04'
    },
    ar: {
      title1: 'تسجيل الدخول إلى رُشتة', lead1: 'أدخل رقم جوالك لاستلام رمز التحقق عبر واتساب.', mobile: 'رقم الجوال', hint1: 'استخدم الرقم المسجل لدى العيادة.',
      send: 'إرسال رمز التحقق', sending: 'جارٍ إرسال الرمز', need: 'هل تحتاج إلى حساب؟', need_s: 'اطلب من الطبيب المسؤول إضافة رقم جوالك.', bad_phone: 'أدخل تسعة أرقام تبدأ بالرقم 5.',
      title2: 'التحقق من رقم الجوال', lead2: 'تحقق من واتساب. أرسلنا رمزًا من ستة أرقام إلى', exp: 'تنتهي صلاحية الرمز خلال', resend: 'إعادة إرسال الرمز', resend_in: 'إعادة بعد', change: 'تغيير الرقم', verify: 'تحقق وتابع', verifying: 'جارٍ التحقق', code_label: 'رمز التحقق',
      title3: 'لم يتم التعرف على رمز التحقق', lead3: 'أدخل أحدث رمز وصلك على واتساب.', a_bad: 'رمز غير صحيح', a_bad_s: 'لم يتطابق هذا الرمز. حاول مرة أخرى.', retry: 'حاول مرة أخرى', change_m: 'تغيير رقم الجوال',
      title4: 'انتهت صلاحية رمز التحقق', lead4: 'انتهت صلاحية الرمز السابق.', a_exp: 'انتهت صلاحية الرمز', a_exp_s: 'اطلب رمز واتساب جديدًا للمتابعة.', newcode: 'إرسال رمز جديد',
      sent: 'تم إرسال رمز جديد', sent_s: 'افتح واتساب لرؤية أحدث رمز.', ok_t: 'تم التحقق من الرقم', ok_s: 'بعد ذلك، أنشئ رمز PIN من ستة أرقام لفتح رُشتة.', cont: 'متابعة',
      tag: 'اكتب. شارك. استلم.', panel_s: 'مساحة عمل وصفات مرتبطة لعيادتك وصيدليتك.', clinic: 'عيادة GlowRx', end_t: 'نهاية هذا المسار', end_s: 'الشاشة التالية: إنشاء رمز PIN (A05).', again: 'ابدأ من جديد', lang: 'اللغة', back: 'رجوع', pad: 'لوحة الأرقام', del: 'حذف',
      s1: 'A14', s2: 'A15', s3: 'A03', s4: 'A04'
    }
  };
  var DEMO = '482916', CIRC = 50.27;
  var st = { lang: 'en', screen: 'signin', phone: '', phoneErr: false, code: '', secs: 299, cool: 0, busy: '', sheet: false, ended: false, toast: '' };
  var root, tmr, toastT, UID = 0;
  function tt(s, k) { return S[s.lang][k]; }
  function T(k) { return tt(st, k); }
  function toAr(x) { return String(x).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.charAt(+d); }); }
  function clock(s, lang) { var m = Math.floor(s / 60), r = s % 60, v = (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; return lang === 'ar' ? toAr(v) : v; }
  function digits(s) { return (s || '').replace(/\D/g, ''); }
  function fmtPhone(d) { d = d.slice(0, 9); var o = d.slice(0, 2); if (d.length > 2) o += ' ' + d.slice(2, 5); if (d.length > 5) o += ' ' + d.slice(5, 9); return o; }
  function masked(d) { d = d || '551001021'; return '+966 ' + d.slice(0, 2) + ' ••• ••' + d.slice(-2); }
  function phoneOk(d) { return d.length === 9 && d.charAt(0) === '5'; }

  /* ---------- markup ---------- */
  function lockup(s, rev) { return '<span class="lock"><img src="' + (rev ? MARK_R : MARK_C) + '" alt="">' + (s.lang === 'ar' ? 'رُشتة' : 'Rushta') + '</span>'; }
  function toggle(s) { return '<span class="toggle" role="group" aria-label="' + tt(s, 'lang') + '"><button data-act="lang" data-v="en" aria-pressed="' + (s.lang === 'en') + '">EN</button><button data-act="lang" data-v="ar" aria-pressed="' + (s.lang === 'ar') + '" lang="ar">ع</button></span>'; }
  function backBtn(s) { return '<button class="round" data-act="change" aria-label="' + tt(s, 'back') + '">' + ic('back', 20, 'dir') + '</button>'; }
  function alertBox(cls, icon, title, text) { return '<div class="alert ' + cls + '" role="alert"><span class="ico">' + ic(icon, 17) + '</span><div><b>' + title + '</b><span class="t">' + text + '</span></div></div>'; }
  function cells(s, bad, pre) {
    var v = s.code, act = Math.min(v.length, 5), h = '<div class="cells' + (bad ? ' bad' : '') + '" data-cells>';
    for (var i = 0; i < 6; i++) h += cell(i, v, act, bad);
    return h + '</div>';
  }
  function cell(i, v, act, bad) { var d = v.charAt(i); return '<div class="cell num' + (i === act && !bad ? ' act' : '') + '">' + (d || (i === act && !bad ? '<i class="caret"></i>' : '')) + '</div>'; }
  function btn(s, cls, act, label, enabled, busyKey) {
    var busy = busyKey && s.busy === busyKey;
    return '<button class="btn ' + cls + '" data-act="' + act + '"' + (enabled && !s.busy ? '' : ' disabled') + '>' + (busy ? '<span class="spin" aria-hidden="true"></span>' + tt(s, busyKey === 'send' ? 'sending' : 'verifying') : label) + '</button>';
  }
  function pad(s) {
    var h = '<div class="pad" role="group" aria-label="' + tt(s, 'pad') + '">';
    '123456789'.split('').forEach(function (k) { h += '<button class="key num" data-key="' + k + '">' + k + '</button>'; });
    return h + '<span></span><button class="key num" data-key="0">0</button><button class="key x" data-key="del" aria-label="' + tt(s, 'del') + '">' + ic('del', 24) + '</button></div>';
  }
  function view(s, mode, pre) {
    var d = digits(s.phone), u = pre ? 'b' + (++UID) : 'live', v = { back: s.screen !== 'signin', mid: '', acts: '', pad: false };
    if (s.screen === 'signin') {
      v.title = tt(s, 'title1'); v.lead = tt(s, 'lead1');
      v.mid = '<div class="field"><label for="phone-' + u + '">' + tt(s, 'mobile') + '</label><div class="phone' + (s.phoneErr ? ' bad' : '') + (pre ? ' on' : '') + '"><span class="cc num">+966</span><input class="num" id="phone-' + u + '" data-phone type="tel" ' + (mode === 'lm' ? 'inputmode="none"' : 'inputmode="numeric"') + ' autocomplete="tel-national" placeholder="5X XXX XXXX" value="' + fmtPhone(d) + '" aria-describedby="hint-' + u + '"' + (s.phoneErr ? ' aria-invalid="true"' : '') + '></div>' +
        '<div id="hint-' + u + '" aria-live="polite">' + (s.phoneErr ? '<div class="err">' + ic('alert', 15) + tt(s, 'bad_phone') + '</div>' : '<p class="helper">' + tt(s, 'hint1') + '</p>') + '</div></div>' +
        '<p class="note"><b>' + tt(s, 'need') + '</b> ' + tt(s, 'need_s') + '</p>';
      v.acts = btn(s, 'p', 'send', tt(s, 'send'), phoneOk(d), 'send'); v.pad = true;
    } else if (s.screen === 'verify') {
      var cd = s.cool > 0;
      v.title = tt(s, 'title2'); v.leadHtml = tt(s, 'lead2') + ' <span class="ltr num">' + masked(d) + '</span>.';
      v.mid = '<div class="codewrap' + (pre ? ' pre' : '') + '">' + cells(s, false, pre) + '<input class="codein num" data-code type="text" ' + (mode === 'lm' ? 'inputmode="none"' : 'inputmode="numeric"') + ' autocomplete="one-time-code" maxlength="6" value="' + s.code + '" aria-label="' + tt(s, 'code_label') + '"></div>' +
        '<div class="meta"><svg class="ring" viewBox="0 0 20 20" aria-hidden="true"><circle class="tr" cx="10" cy="10" r="8"/><circle class="pr" data-ring cx="10" cy="10" r="8" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + (CIRC * (1 - s.secs / 299)).toFixed(2) + '"/></svg><span>' + tt(s, 'exp') + ' <span class="num ltr" data-timer>' + clock(s.secs, s.lang) + '</span></span></div>' +
        '<div class="chips"><button class="btn s sm" data-act="resend"' + (cd ? ' disabled' : '') + '>' + (cd ? tt(s, 'resend_in') + ' <span class="num ltr" data-cool>' + clock(s.cool, s.lang).replace(/^0/, '') + '</span>' : tt(s, 'resend')) + '</button><button class="btn s sm" data-act="change">' + tt(s, 'change') + '</button></div>';
      v.acts = btn(s, 'p', 'verify', tt(s, 'verify'), s.code.length === 6, 'verify'); v.pad = true;
    } else if (s.screen === 'wrong') {
      v.title = tt(s, 'title3'); v.lead = tt(s, 'lead3');
      v.mid = '<div class="codewrap">' + cells(s, true, pre) + '</div>' + alertBox('', 'alert', tt(s, 'a_bad'), tt(s, 'a_bad_s'));
      v.acts = btn(s, 'p', 'retry', tt(s, 'retry'), true) + btn(s, 's', 'change', tt(s, 'change_m'), true);
    } else {
      v.title = tt(s, 'title4'); v.lead = tt(s, 'lead4');
      v.mid = alertBox('warn', 'clock', tt(s, 'a_exp'), tt(s, 'a_exp_s'));
      v.acts = btn(s, 'p', 'newcode', tt(s, 'newcode'), true) + btn(s, 's', 'change', tt(s, 'change'), true);
    }
    return v;
  }
  function frame(s, mode, pre) {
    var ar = s.lang === 'ar', v = view(s, mode, pre), lead = '<p class="lead">' + (v.leadHtml || v.lead) + '</p>';
    var head = '<h1>' + v.title + '</h1>' + lead + v.mid, h = '<div class="frame ' + mode + (ar ? ' rtl' : '') + '" dir="' + (ar ? 'rtl' : 'ltr') + '" lang="' + s.lang + '">';
    if (mode === 'ld') {
      h += '<aside class="panel">' + lockup(s, true) + '<div><div class="clinic">' + tt(s, 'clinic') + '</div><h2 class="tag">' + tt(s, 'tag') + '</h2><p>' + tt(s, 'panel_s') + '</p></div></aside>' +
        '<section class="side"><div class="aurora"></div><header class="bar"><span>' + (v.back ? backBtn(s) : '') + '</span>' + toggle(s) + '</header><main class="stage"><div class="col">' + head + '<div class="acts">' + v.acts + '</div></div></main></section>';
    } else {
      h += '<div class="aurora"></div><header class="bar">' + (v.back ? backBtn(s) : lockup(s, false)) + toggle(s) + '</header><main class="stage">' + head + '</main><div class="dock"><div class="acts">' + v.acts + '</div>' + (v.pad ? pad(s) : '') + '</div>';
    }
    return h + '</div>';
  }
  function sheet(s) {
    return '<div class="scrim" data-act="close"></div><div class="sheet" dir="' + (s.lang === 'ar' ? 'rtl' : 'ltr') + '" role="dialog" aria-modal="true" aria-label="' + tt(s, 'ok_t') + '"><div class="grab"></div><div class="badge">' + scallop() + ic('check', 32) + '</div><h2>' + tt(s, 'ok_t') + '</h2><p>' + tt(s, 'ok_s') + '</p><button class="btn p" data-act="continue">' + tt(s, 'cont') + '</button></div>';
  }

  /* ---------- live app ---------- */
  function layout() { return window.innerWidth >= 900 ? 'ld' : 'lm'; }
  function protoBar() {
    var scr = [['signin', 's1'], ['verify', 's2'], ['wrong', 's3'], ['expired', 's4']];
    return '<div class="proto"><b>' + (st.screen === 'verify' ? 'Demo code ' + DEMO : 'Prototype') + '</b><span class="pseg" role="group" aria-label="Screen">' + scr.map(function (x) { return '<button data-act="go" data-v="' + x[0] + '" aria-pressed="' + (st.screen === x[0] && !st.ended) + '">' + S.en[x[1]] + '</button>'; }).join('') + '</span>' +
      '<a href="#board">All screens</a></div>';
  }
  function render() {
    var h = protoBar();
    if (st.ended) h += '<div class="end" dir="' + (st.lang === 'ar' ? 'rtl' : 'ltr') + '"><b>' + T('end_t') + '</b>' + T('end_s') + '<div class="acts" style="margin-top:16px"><button class="btn s" data-act="restart">' + T('again') + '</button></div></div>';
    else h += frame(st, layout(), false);
    h += st.sheet ? sheet(st) : '';
    h += st.toast ? '<div class="alert ok toast" role="status"><span class="ico">' + ic('check', 17) + '</span><div><b>' + T('sent') + '</b><span class="t">' + T('sent_s') + '</span></div></div>' : '';
    root.innerHTML = h;
  }
  function field() { return root.querySelector('[data-phone]') || root.querySelector('[data-code]'); }
  function focusField() { var f = field(); if (f && !st.sheet) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } } }
  function go(screen) { st.screen = screen; st.sheet = false; st.ended = false; st.busy = ''; if (screen === 'verify') { if (!st.phone) st.phone = '551001021'; } render(); focusField(); }
  function showToast() { st.toast = '1'; clearTimeout(toastT); toastT = setTimeout(function () { st.toast = ''; var t = root.querySelector('.toast'); if (t) t.remove(); }, 2600); }
  function newCode() { st.secs = 299; st.cool = 30; st.code = ''; st.screen = 'verify'; st.busy = ''; showToast(); render(); focusField(); }
  function syncPhone() {
    var d = digits(st.phone), i = root.querySelector('[data-phone]'), b = root.querySelector('[data-act=send]');
    if (i) i.value = fmtPhone(d); if (b && !st.busy) b.disabled = !phoneOk(d);
    if (st.phoneErr && phoneOk(d)) { st.phoneErr = false; render(); focusField(); }
  }
  function syncCode() {
    var w = root.querySelector('[data-cells]'), i = root.querySelector('[data-code]'), b = root.querySelector('[data-act=verify]');
    if (i && i.value !== st.code) i.value = st.code;
    if (w) { var act = Math.min(st.code.length, 5), h = ''; for (var k = 0; k < 6; k++) h += cell(k, st.code, act, false); w.innerHTML = h; }
    if (b && !st.busy) b.disabled = st.code.length !== 6;
  }
  function press(k) {
    if (st.screen === 'signin') { var d = digits(st.phone); d = k === 'del' ? d.slice(0, -1) : (d.length < 9 ? d + k : d); st.phone = d; syncPhone(); }
    else if (st.screen === 'verify') { st.code = k === 'del' ? st.code.slice(0, -1) : (st.code.length < 6 ? st.code + k : st.code); syncCode(); }
  }
  function tick() {
    if (st.ended || st.sheet) return;
    if (st.screen === 'verify' || st.screen === 'wrong') {
      st.secs--;
      if (st.secs <= 0) { st.secs = 0; st.screen = 'expired'; st.code = ''; render(); return; }
      var el = root.querySelector('[data-timer]'); if (el) el.textContent = clock(st.secs, st.lang);
      var rg = root.querySelector('[data-ring]'); if (rg) rg.setAttribute('stroke-dashoffset', (CIRC * (1 - st.secs / 299)).toFixed(2));
      if (st.cool > 0) { st.cool--; if (st.cool === 0) { render(); focusField(); } else { var c = root.querySelector('[data-cool]'); if (c) c.textContent = clock(st.cool, st.lang).replace(/^0/, ''); } }
    }
  }
  document.addEventListener('mousedown', function (e) { if (e.target.closest('[data-key]')) e.preventDefault(); });
  document.addEventListener('click', function (e) {
    var kb = e.target.closest('[data-key]'); if (kb) { press(kb.getAttribute('data-key')); return; }
    var el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
    var a = el.getAttribute('data-act'), v = el.getAttribute('data-v');
    if (a === 'lang') { st.lang = v; render(); focusField(); }
    else if (a === 'go') go(v);
    else if (a === 'send') {
      var d = digits(st.phone);
      if (!phoneOk(d)) { st.phoneErr = true; render(); focusField(); return; }
      st.busy = 'send'; render();
      setTimeout(function () { st.busy = ''; st.secs = 299; st.cool = 30; st.code = ''; st.screen = 'verify'; render(); focusField(); }, 900);
    }
    else if (a === 'verify') {
      st.busy = 'verify'; render();
      setTimeout(function () {
        st.busy = '';
        if (st.code === DEMO) { st.sheet = true; render(); var b = root.querySelector('.sheet .btn'); if (b) b.focus(); }
        else { st.screen = 'wrong'; render(); var c = root.querySelector('.cells'); if (c) c.classList.add('shake'); var bt = root.querySelector('[data-act=retry]'); if (bt) bt.focus(); }
      }, 800);
    }
    else if (a === 'retry') { st.code = ''; st.screen = 'verify'; render(); focusField(); }
    else if (a === 'resend' || a === 'newcode') newCode();
    else if (a === 'change') { st.screen = 'signin'; st.code = ''; st.busy = ''; render(); focusField(); }
    else if (a === 'close') { st.sheet = false; render(); }
    else if (a === 'continue') { st.sheet = false; st.ended = true; render(); }
    else if (a === 'restart') { st.ended = false; st.screen = 'signin'; st.phone = ''; st.code = ''; st.phoneErr = false; render(); focusField(); }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute('data-phone')) { st.phone = digits(t.value).slice(0, 9); syncPhone(); }
    else if (t.hasAttribute && t.hasAttribute('data-code')) { st.code = digits(t.value).slice(0, 6); syncCode(); }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (e.key === 'Enter' && t.hasAttribute && (t.hasAttribute('data-phone') || t.hasAttribute('data-code'))) { var b = root.querySelector('[data-act=send],[data-act=verify]'); if (b && !b.disabled) b.click(); }
    else if (e.key === 'Escape' && st.sheet) { st.sheet = false; render(); }
  });
  window.addEventListener('resize', function () { if (!inBoard()) { render(); } });

  /* ---------- every screen on one board ---------- */
  function inBoard() { return location.hash === '#board'; }
  function preset(lang, screen) {
    var o = { lang: lang, screen: screen, phone: '551001021', phoneErr: false, code: '', secs: 262, cool: 0, busy: '' };
    if (screen === 'signin') o.phone = '';
    if (screen === 'verify') o.code = '482';
    if (screen === 'wrong') o.code = '482917';
    return o;
  }
  function board() {
    var names = { en: ['A01 Sign in', 'A02 Verify your mobile number', 'A03 Code not recognised', 'A04 Code expired'], ar: ['A14 تسجيل الدخول', 'A15 التحقق من رقم الجوال', 'A03 رمز غير معروف (جديد)', 'A04 رمز منتهي (جديد)'] };
    var scr = ['signin', 'verify', 'wrong', 'expired'];
    function row(lang, mode, title) {
      var h = '<h3>' + title + '</h3><div class="row-b">';
      scr.forEach(function (sc, i) { h += '<div class="fr ' + (mode === 'lm' ? 'm' : 'd') + '"><small>' + names[lang][i] + '</small><div class="box" inert><div class="scale">' + frame(preset(lang, sc), mode, true) + '</div></div></div>'; });
      return h + '</div>';
    }
    return '<div class="proto"><b>Prototype</b><a href="#">Back to the live flow</a></div><div class="board"><h1>Sign in and verify</h1><p class="lead">Mobile web and desktop, English and Arabic. Arabic A03 and A04 are new translations for review.</p>' +
      row('en', 'lm', 'Mobile, English') + row('ar', 'lm', 'Mobile, Arabic') + row('en', 'ld', 'Desktop, English') + row('ar', 'ld', 'Desktop, Arabic') + '</div>';
  }
  function boot() { clearInterval(tmr); if (inBoard()) { root.innerHTML = board(); window.scrollTo(0, 0); } else { render(); focusField(); tmr = setInterval(tick, 1000); } }
  root = document.getElementById('app');
  window.addEventListener('hashchange', boot);
  boot();
})();
