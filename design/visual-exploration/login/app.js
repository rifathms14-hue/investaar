(function () {
  var MARK_C = '__MARK_C__', MARK_R = '__MARK_R__';
  var P = {
    alert: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v5 M12 16h.01', clock: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v4l3 2',
    check: 'M5 12.5l4.5 4.5L19 7.5', info: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 11v5 M12 8h.01', chat: 'M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H10l-5 4v-4a1 1 0 01-1-1V6a1 1 0 011-1z'
  };
  function ic(n, s) { return '<svg class="ic" width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }

  var S = {
    en: {
      title1: 'Sign in to Rushta', welcome: 'Welcome back', lead1: 'Enter your mobile number to receive a verification code on WhatsApp.', mobile: 'Mobile number', hint1: 'Use the number registered by your clinic.',
      send: 'Send verification code', sending: 'Sending code', need: 'Need access?', need_s: 'Ask your chief doctor to add your mobile number.', bad_phone: 'Enter a Saudi mobile number: nine digits, starting with 5.',
      title2: 'Verify your mobile number', check: 'Check WhatsApp', lead2: 'We sent a six-digit code to', exp: 'Code expires in', resend: 'Resend code', resend_in: 'Resend in', change: 'Change number', verify: 'Verify and continue', verifying: 'Verifying',
      title3: 'Verification code not recognised', check3: 'Check the code', lead3: 'Enter the latest code from WhatsApp.', a_bad: 'Incorrect code', a_bad_s: 'That code did not match. Please try again.', retry: 'Try again', change_m: 'Change mobile number',
      title4: 'Verification code expired', check4: 'Get a new code', lead4: 'The previous code has expired.', a_exp: 'Code expired', a_exp_s: 'Request a new WhatsApp code to continue.', newcode: 'Send a new code',
      sent: 'New code sent', sent_s: 'Check WhatsApp for the latest code.', ok_t: 'Number verified', ok_s: 'Next, create a six-digit PIN to unlock Rushta.', cont: 'Continue', code_label: 'Digit',
      tag: 'Write. Share. Collect.', panel_s: 'A connected prescription workspace for your clinic and pharmacy.', clinic: 'GlowRx Clinic', end_t: 'End of this flow', end_s: 'Next screen: Create your PIN (A05).', again: 'Start again', lang: 'Language',
      s1: 'A01 Sign in', s2: 'A02 Verify', s3: 'A03 Code not recognised', s4: 'A04 Code expired'
    },
    ar: {
      title1: 'تسجيل الدخول إلى رُشتة', welcome: 'مرحبًا بعودتك', lead1: 'أدخل رقم جوالك لاستلام رمز التحقق عبر واتساب.', mobile: 'رقم الجوال', hint1: 'استخدم الرقم المسجل لدى العيادة.',
      send: 'إرسال رمز التحقق', sending: 'جارٍ إرسال الرمز', need: 'هل تحتاج إلى حساب؟', need_s: 'اطلب من الطبيب المسؤول إضافة رقم جوالك.', bad_phone: 'أدخل رقم جوال سعوديًا من تسعة أرقام يبدأ بالرقم 5.',
      title2: 'التحقق من رقم الجوال', check: 'تحقق من واتساب', lead2: 'أرسلنا رمزًا من ستة أرقام إلى', exp: 'تنتهي صلاحية الرمز خلال', resend: 'إعادة إرسال الرمز', resend_in: 'إعادة بعد', change: 'تغيير رقم الجوال', verify: 'تحقق وتابع', verifying: 'جارٍ التحقق',
      title3: 'لم يتم التعرف على رمز التحقق', check3: 'تحقق من الرمز', lead3: 'أدخل أحدث رمز وصلك على واتساب.', a_bad: 'رمز غير صحيح', a_bad_s: 'لم يتطابق هذا الرمز. حاول مرة أخرى.', retry: 'حاول مرة أخرى', change_m: 'تغيير رقم الجوال',
      title4: 'انتهت صلاحية رمز التحقق', check4: 'احصل على رمز جديد', lead4: 'انتهت صلاحية الرمز السابق.', a_exp: 'انتهت صلاحية الرمز', a_exp_s: 'اطلب رمز واتساب جديدًا للمتابعة.', newcode: 'إرسال رمز جديد',
      sent: 'تم إرسال رمز جديد', sent_s: 'افتح واتساب لرؤية أحدث رمز.', ok_t: 'تم التحقق من الرقم', ok_s: 'بعد ذلك، أنشئ رمز PIN من ستة أرقام لفتح رُشتة.', cont: 'متابعة', code_label: 'الرقم',
      tag: 'اكتب. شارك. استلم.', panel_s: 'مساحة عمل وصفات مرتبطة لعيادتك وصيدليتك.', clinic: 'عيادة GlowRx', end_t: 'نهاية هذا المسار', end_s: 'الشاشة التالية: إنشاء رمز PIN (A05).', again: 'ابدأ من جديد', lang: 'اللغة',
      s1: 'A14 تسجيل الدخول', s2: 'A15 التحقق', s3: 'A03 رمز غير معروف', s4: 'A04 رمز منتهي'
    }
  };
  var DEMO = '482916';
  var st = { lang: 'en', screen: 'signin', phone: '', phoneErr: false, code: [], secs: 299, cool: 0, busy: '', sheet: false, ended: false, toast: '' };
  var root, tmr, toastT, UID = 0;

  function T(k) { return S[st.lang][k]; }
  function tt(s, k) { return S[s.lang][k]; }
  function toAr(x) { return String(x).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'.charAt(+d); }); }
  function clock(s, lang) { var m = Math.floor(s / 60), r = s % 60, v = (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r; return lang === 'ar' ? toAr(v) : v; }
  function fmtPhone(d) { d = d.slice(0, 9); var o = d.slice(0, 2); if (d.length > 2) o += ' ' + d.slice(2, 5); if (d.length > 5) o += ' ' + d.slice(5, 9); return o; }
  function masked(d) { d = d || '551001021'; return '+966 ' + d.slice(0, 2) + ' ••• ••' + d.slice(-2); }
  function digits(s) { return (s || '').replace(/\D/g, ''); }

  /* ---------- markup ---------- */
  function lockup(s, rev) { return '<div class="lock"><img src="' + (rev ? MARK_R : MARK_C) + '" alt=""><span>' + (s.lang === 'ar' ? 'رُشتة' : 'Rushta') + '</span></div>'; }
  function panel(s) {
    return '<aside class="panel">' + lockup(s, true) + '<div><div class="clinic">' + tt(s, 'clinic') + '</div><h2 class="tag" style="margin:10px 0 0;font-size:40px;line-height:1.12;color:#fff">' + tt(s, 'tag') + '</h2><p>' + tt(s, 'panel_s') + '</p></div>' + langs(s, true) + '</aside>';
  }
  function langs(s, inPanel) { return '<div class="langs" role="group" aria-label="' + tt(s, 'lang') + '"><button data-act="lang" data-v="en" aria-pressed="' + (s.lang === 'en') + '">English</button><button data-act="lang" data-v="ar" aria-pressed="' + (s.lang === 'ar') + '" lang="ar">العربية</button></div>'; }
  function top(s) {
    var two = s.screen !== 'signin';
    return '<div class="top">' + lockup(s, false) + '</div><div class="step" aria-hidden="true"><i class="on"></i><i class="' + (two ? 'on' : '') + '"></i></div>';
  }
  function alertBox(cls, icon, title, text) { return '<div class="alert ' + cls + '" role="alert"><span class="ico">' + ic(icon, 18) + '</span><div><b>' + title + '</b><span class="t">' + text + '</span></div></div>'; }
  function cells(s, bad, act) {
    var h = '<div class="cells' + (bad ? ' bad' : '') + '" role="group" aria-label="' + tt(s, 'check') + '">';
    for (var i = 0; i < 6; i++) { var v = s.code[i] || ''; h += '<input class="cell num' + (v ? ' filled' : '') + (act === i ? ' act' : '') + '" data-i="' + i + '" inputmode="numeric" autocomplete="' + (i === 0 ? 'one-time-code' : 'off') + '" maxlength="1" value="' + v + '" aria-label="' + tt(s, 'code_label') + ' ' + (i + 1) + '">'; }
    return h + '</div>';
  }
  function busyBtn(s, label, busyKey, act, enabled, cls) {
    var b = s.busy === busyKey;
    return '<button class="btn ' + (cls || 'p') + '" data-act="' + act + '"' + (enabled && !s.busy ? '' : ' disabled') + '>' + (b ? '<span class="spin" aria-hidden="true"></span>' + tt(s, busyKey === 'send' ? 'sending' : 'verifying') : label) + '</button>';
  }
  function body(s, preset) {
    var d = digits(s.phone), ok = d.length === 9 && d.charAt(0) === '5', h = '', u = preset ? 'b' + (++UID) : 'live';
    if (s.screen === 'signin') {
      h += '<h1>' + tt(s, 'title1') + '</h1><h2>' + tt(s, 'welcome') + '</h2><p class="lead" style="margin-top:0">' + tt(s, 'lead1') + '</p>';
      h += '<label class="lab" for="phone-' + u + '">' + tt(s, 'mobile') + '</label><span class="hint-t">' + tt(s, 'hint1') + '</span>';
      h += '<div class="phone' + (s.phoneErr ? ' bad' : '') + '"><span class="cc num">+966</span><input class="num" id="phone-' + u + '" data-phone type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="5X XXX XXXX" value="' + fmtPhone(d) + '" aria-describedby="phone-err-' + u + '"' + (s.phoneErr ? ' aria-invalid="true"' : '') + '></div>';
      h += '<div id="phone-err-' + u + '" aria-live="polite">' + (s.phoneErr ? '<div class="fieldmsg">' + ic('alert', 16) + tt(s, 'bad_phone') + '</div>' : '') + '</div>';
      h += '<div class="btns">' + busyBtn(s, tt(s, 'send'), 'send', 'send', ok, 'p') + '</div>';
      h += '<div class="need"><b>' + tt(s, 'need') + '</b><span>' + tt(s, 'need_s') + '</span></div>';
    } else if (s.screen === 'verify') {
      var full = s.code.join('').length === 6;
      h += '<h1>' + tt(s, 'title2') + '</h1><h2>' + tt(s, 'check') + '</h2><p class="lead" style="margin-top:0">' + tt(s, 'lead2') + ' <span class="ltr num">' + masked(d) + '</span>.</p>';
      h += cells(s, false, preset ? s.code.length : -1);
      h += '<div class="timer">' + ic('clock', 18) + '<span>' + tt(s, 'exp') + ' <span class="num" data-timer>' + clock(s.secs, s.lang) + '</span></span></div>';
      h += '<div class="btns">' + busyBtn(s, tt(s, 'verify'), 'verify', 'verify', full, 'p') + '<div class="btns row" style="margin:0">' +
        '<button class="btn s" data-act="resend" data-resend' + (s.cool > 0 ? ' disabled' : '') + '>' + (s.cool > 0 ? tt(s, 'resend_in') + ' <span class="num" data-cool>' + clock(s.cool, s.lang).replace(/^0/, '') + '</span>' : tt(s, 'resend')) + '</button>' +
        '<button class="btn s" data-act="change">' + tt(s, 'change') + '</button></div></div>';
    } else if (s.screen === 'wrong') {
      h += '<h1>' + tt(s, 'title3') + '</h1><h2>' + tt(s, 'check3') + '</h2><p class="lead" style="margin-top:0">' + tt(s, 'lead3') + '</p>';
      h += cells(s, true, -1) + alertBox('', 'alert', tt(s, 'a_bad'), tt(s, 'a_bad_s'));
      h += '<div class="btns"><button class="btn p" data-act="retry">' + tt(s, 'retry') + '</button><button class="btn s" data-act="change">' + tt(s, 'change_m') + '</button></div>';
    } else {
      h += '<h1>' + tt(s, 'title4') + '</h1><h2>' + tt(s, 'check4') + '</h2><p class="lead" style="margin-top:0">' + tt(s, 'lead4') + '</p>';
      h += alertBox('warn', 'clock', tt(s, 'a_exp'), tt(s, 'a_exp_s'));
      h += '<div class="btns"><button class="btn p" data-act="newcode">' + tt(s, 'newcode') + '</button><button class="btn s" data-act="change">' + tt(s, 'change') + '</button></div>';
    }
    return h;
  }
  function frame(s, mode, preset) {
    var ar = s.lang === 'ar';
    return '<div class="frame ' + mode + (ar ? ' rtl' : '') + '" dir="' + (ar ? 'rtl' : 'ltr') + '" lang="' + s.lang + '">' + (mode === 'ld' ? panel(s) : '') +
      '<main class="main"><div class="in">' + top(s) + body(s, preset) + (mode === 'lm' || preset ? langs(s, false) : langs(s, false)) + '</div></main></div>';
  }
  function sheet(s) {
    return '<div class="scrim" data-act="close"></div><div class="sheet" dir="' + (s.lang === 'ar' ? 'rtl' : 'ltr') + '" role="dialog" aria-modal="true" aria-label="' + tt(s, 'ok_t') + '"><div class="grab"></div><div class="badge">' + ic('check', 30) + '</div><h2>' + tt(s, 'ok_t') + '</h2><p>' + tt(s, 'ok_s') + '</p><div class="btns"><button class="btn p" data-act="continue">' + tt(s, 'cont') + '</button></div></div>';
  }

  /* ---------- live app ---------- */
  function layout() { return window.innerWidth >= 900 ? 'ld' : 'lm'; }
  function protoBar() {
    var scr = [['signin', 's1'], ['verify', 's2'], ['wrong', 's3'], ['expired', 's4']];
    return '<div class="proto"><b>Prototype</b><span class="seg" role="group" aria-label="Screen">' + scr.map(function (x) { return '<button data-act="go" data-v="' + x[0] + '" aria-pressed="' + (st.screen === x[0] && !st.ended) + '">' + S.en[x[1]].split(' ')[0] + '</button>'; }).join('') + '</span>' +
      '<span class="seg" role="group" aria-label="Language"><button data-act="lang" data-v="en" aria-pressed="' + (st.lang === 'en') + '">EN</button><button data-act="lang" data-v="ar" aria-pressed="' + (st.lang === 'ar') + '">ع</button></span>' +
      '<a href="#board" style="color:var(--forest);font-weight:700">All screens</a><span class="hint">Demo code ' + DEMO + '</span></div>';
  }
  function render() {
    var h = protoBar();
    if (st.ended) h += '<div class="end" dir="' + (st.lang === 'ar' ? 'rtl' : 'ltr') + '"><b>' + T('end_t') + '</b>' + T('end_s') + '<div class="btns"><button class="btn s" data-act="restart">' + T('again') + '</button></div></div>';
    else h += frame(st, layout(), false);
    h += st.sheet ? sheet(st) : '';
    h += st.toast ? '<div class="alert ok toast" role="status"><span class="ico">' + ic('check', 18) + '</span><div><b>' + T('sent') + '</b><span class="t">' + T('sent_s') + '</span></div></div>' : '';
    root.innerHTML = h;
  }
  function focusFirst() {
    var el = root.querySelector('[data-phone]') || root.querySelector('.cell:not(.filled)') || root.querySelector('.cell');
    if (el) el.focus();
  }
  function go(screen) { st.screen = screen; st.sheet = false; st.ended = false; st.busy = ''; if (screen === 'verify' && !st.phone) st.phone = '551001021'; render(); focusFirst(); }
  function showToast() { st.toast = '1'; clearTimeout(toastT); toastT = setTimeout(function () { st.toast = ''; var t = root.querySelector('.toast'); if (t) t.remove(); }, 2600); }
  function newCode() { st.secs = 299; st.cool = 30; st.code = []; st.screen = 'verify'; st.busy = ''; showToast(); render(); focusFirst(); }
  function tick() {
    if (st.ended || st.sheet) return;
    if (st.screen === 'verify' || st.screen === 'wrong') {
      st.secs--;
      if (st.secs <= 0) { st.secs = 0; st.screen = 'expired'; st.code = []; render(); return; }
      var el = root.querySelector('[data-timer]'); if (el) el.textContent = clock(st.secs, st.lang);
      if (st.cool > 0) {
        st.cool--;
        if (st.cool === 0) render(); else { var c = root.querySelector('[data-cool]'); if (c) c.textContent = clock(st.cool, st.lang).replace(/^0/, ''); }
      }
    }
  }
  function updateVerify() {
    var b = root.querySelector('[data-act=verify]'); if (b && !st.busy) b.disabled = st.code.join('').length !== 6;
    root.querySelectorAll('.cell').forEach(function (c, i) { c.classList.toggle('filled', !!st.code[i]); });
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el || el.disabled) return;
    var a = el.getAttribute('data-act'), v = el.getAttribute('data-v');
    if (a === 'lang') { st.lang = v; render(); }
    else if (a === 'go') go(v);
    else if (a === 'send') {
      var d = digits(st.phone);
      if (!(d.length === 9 && d.charAt(0) === '5')) { st.phoneErr = true; render(); focusFirst(); return; }
      st.busy = 'send'; render(); setTimeout(function () { st.busy = ''; st.secs = 299; st.cool = 30; st.code = []; st.screen = 'verify'; render(); focusFirst(); }, 900);
    }
    else if (a === 'verify') {
      st.busy = 'verify'; render();
      setTimeout(function () {
        st.busy = '';
        if (st.code.join('') === DEMO) { st.sheet = true; render(); var b = root.querySelector('.sheet .btn'); if (b) b.focus(); }
        else { st.screen = 'wrong'; render(); var c = root.querySelector('.cells'); if (c) c.classList.add('shake'); var bt = root.querySelector('[data-act=retry]'); if (bt) bt.focus(); }
      }, 800);
    }
    else if (a === 'retry') { st.code = []; st.screen = 'verify'; render(); focusFirst(); }
    else if (a === 'resend') newCode();
    else if (a === 'newcode') newCode();
    else if (a === 'change') { st.screen = 'signin'; st.code = []; st.busy = ''; render(); focusFirst(); }
    else if (a === 'close') { st.sheet = false; render(); }
    else if (a === 'continue') { st.sheet = false; st.ended = true; render(); }
    else if (a === 'restart') { st.ended = false; st.screen = 'signin'; st.phone = ''; st.code = []; st.phoneErr = false; render(); focusFirst(); }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.hasAttribute && t.hasAttribute('data-phone')) {
      var d = digits(t.value).slice(0, 9); st.phone = d; t.value = fmtPhone(d);
      var ok = d.length === 9 && d.charAt(0) === '5'; var b = root.querySelector('[data-act=send]'); if (b) b.disabled = !ok;
      if (st.phoneErr && ok) { st.phoneErr = false; t.closest('.phone').classList.remove('bad'); var m = document.getElementById('phone-err-live'); if (m) m.innerHTML = ''; }
    } else if (t.classList && t.classList.contains('cell')) {
      var i = +t.getAttribute('data-i'), ds = digits(t.value);
      if (ds.length > 1) { for (var k = 0; k < ds.length && i + k < 6; k++) { st.code[i + k] = ds.charAt(k); var c = root.querySelector('.cell[data-i="' + (i + k) + '"]'); if (c) c.value = ds.charAt(k); } var nx = Math.min(5, i + ds.length); root.querySelector('.cell[data-i="' + nx + '"]').focus(); }
      else { st.code[i] = ds.charAt(0) || ''; t.value = ds.charAt(0) || ''; if (ds && i < 5) root.querySelector('.cell[data-i="' + (i + 1) + '"]').focus(); }
      for (var j = 0; j < 6; j++) if (st.code[j] === undefined) st.code[j] = '';
      updateVerify();
    }
  });
  document.addEventListener('keydown', function (e) {
    var t = e.target;
    if (t.classList && t.classList.contains('cell')) {
      var i = +t.getAttribute('data-i');
      if (e.key === 'Backspace' && !t.value && i > 0) { var p = root.querySelector('.cell[data-i="' + (i - 1) + '"]'); p.value = ''; st.code[i - 1] = ''; p.focus(); updateVerify(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' && i > 0) root.querySelector('.cell[data-i="' + (i - 1) + '"]').focus();
      else if (e.key === 'ArrowRight' && i < 5) root.querySelector('.cell[data-i="' + (i + 1) + '"]').focus();
      else if (e.key === 'Enter') { var v = root.querySelector('[data-act=verify]'); if (v && !v.disabled) v.click(); }
    } else if (t.hasAttribute && t.hasAttribute('data-phone') && e.key === 'Enter') { var s = root.querySelector('[data-act=send]'); if (s) s.click(); }
    else if (e.key === 'Escape' && st.sheet) { st.sheet = false; render(); }
  });
  window.addEventListener('resize', function () { if (!inBoard()) render(); });

  /* ---------- board of every screen ---------- */
  function inBoard() { return location.hash === '#board'; }
  function preset(lang, screen) {
    var o = { lang: lang, screen: screen, phone: '551001021', phoneErr: false, code: [], secs: 262, cool: 0, busy: '' };
    if (screen === 'signin') o.phone = '';
    if (screen === 'verify') o.code = ['4', '8', '2'];
    if (screen === 'wrong') o.code = ['4', '8', '2', '9', '1', '7'];
    return o;
  }
  function board() {
    var names = { en: ['A01 Sign in', 'A02 Verify your mobile number', 'A03 Code not recognised', 'A04 Code expired'], ar: ['A14 تسجيل الدخول', 'A15 التحقق من رقم الجوال', 'A03 رمز غير معروف (جديد)', 'A04 رمز منتهي (جديد)'] };
    var scr = ['signin', 'verify', 'wrong', 'expired'];
    function row(lang, mode, title) {
      var h = '<h3>' + title + '</h3><div class="row-b">';
      scr.forEach(function (sc, i) {
        var f = frame(preset(lang, sc), mode, true);
        h += '<div class="fr ' + (mode === 'lm' ? 'm' : 'd') + '"><small>' + names[lang][i] + '</small><div class="box" inert>' + (mode === 'ld' ? '<div class="scale">' + f + '</div>' : f) + '</div></div>';
      });
      return h + '</div>';
    }
    return '<div class="proto"><b>Prototype</b><a href="#" style="color:var(--forest);font-weight:700">Back to the live flow</a></div><div class="board"><h1>Sign in and verify</h1><p class="lead">Mobile web and desktop, English and Arabic. Arabic A03 and A04 are new translations for review.</p>' +
      row('en', 'lm', 'Mobile, English') + row('ar', 'lm', 'Mobile, Arabic') + row('en', 'ld', 'Desktop, English') + row('ar', 'ld', 'Desktop, Arabic') + '</div>';
  }
  function boot() { if (inBoard()) { clearInterval(tmr); root.innerHTML = board(); window.scrollTo(0, 0); } else { render(); focusFirst(); clearInterval(tmr); tmr = setInterval(tick, 1000); } }
  root = document.getElementById('app');
  window.addEventListener('hashchange', boot);
  boot();
})();
