(function () {
  var P = {
    home: 'M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z',
    rx: 'M7 3h8l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M14 3v5h5 M9 13h6 M9 17h4',
    qr: 'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h2v2h-2z M18 14h2v2h-2z M14 18h2v2h-2z M18 18h2v2h-2z',
    pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
    user: 'M12 12a4 4 0 100-8 4 4 0 000 8z M4 20a8 8 0 0116 0',
    plus: 'M12 5v14 M5 12h14', bell: 'M6 17v-6a6 6 0 1112 0v6l1.5 2h-15z M10 21h4',
    back: 'M15 5l-7 7 7 7', next: 'M9 5l7 7-7 7', check: 'M5 12.5l4.5 4.5L19 7.5',
    pill: 'M4.5 15.5l11-11a4 4 0 015.7 5.7l-11 11a4 4 0 01-5.7-5.7z M10 10l4 4',
    box: 'M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8', clock: 'M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v4l3 2',
    case: 'M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1z M9 8V5h6v3', chat: 'M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H10l-5 4v-4a1 1 0 01-1-1V6a1 1 0 011-1z',
    arrow: 'M7 17L17 7 M9 7h8v8', share: 'M12 4v11 M8 8l4-4 4 4 M5 13v6h14v-6', search: 'M11 4a7 7 0 100 14 7 7 0 000-14z M20 20l-4-4',
    cal: 'M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z M4 10h16 M8 3v4 M16 3v4', x: 'M6 6l12 12 M18 6L6 18'
  };
  var DIR = { back: 1, next: 1, arrow: 0 };
  function ic(n, s) { return '<svg class="ic' + (DIR[n] ? ' dir' : '') + '" width="' + (s || 22) + '" height="' + (s || 22) + '" viewBox="0 0 24 24" aria-hidden="true"><path d="' + P[n] + '"/></svg>'; }
  var MARK = '<svg width="34" height="34" viewBox="0 0 100 100" aria-hidden="true"><path fill="#fff" d="M43 8h14a6 6 0 016 6v20a6 6 0 01-6 6H43z" opacity=".95"/><path fill="#fff" d="M57 92H43V60h14a6 6 0 016 6v20a6 6 0 01-6 6z" opacity=".95"/><path fill="#03442D" d="M8 43v14h32V43a6 6 0 00-6-6H14a6 6 0 00-6 6z" opacity=".55"/><path fill="#03442D" d="M92 57V43H60v14a6 6 0 006 6h20a6 6 0 006-6z" opacity=".55"/></svg>';

  var S = {
    en: {
      proto: 'Prototype', pharmacy: 'Pharmacy', rx_n: 'prescriptions', viewas: 'View as', patient: 'Patient', clinic: 'Clinic', gm: 'Good morning', nav_home: 'Home', nav_rx: 'Prescriptions', nav_ph: 'Pharmacies', nav_me: 'Profile', nav_dash: 'Dashboard', nav_q: 'Queue', nav_new: 'New',
      hl1: 'Your medicine is', hl2: 'ready', hl3: 'at', hl4: 'Al Noor Pharmacy', upd: 'Prescription update', show: 'Show pickup code', share: 'Share link', copied: 'Link copied', copy_fail: 'Link: rushta.example/r/',
      active: 'Active', ready_n: 'Ready to collect', issued: 'Issued', sent: 'Sent', ready: 'Ready', collected: 'Collected', preparing: 'Preparing', collect_by: 'Collect by Sat 18 May',
      near: 'Pharmacies near you', all: 'See all', rxs: 'Prescriptions', past: 'Past', shared: 'Shared with me', none_shared: 'Nothing shared with you yet', none_shared_s: 'When a doctor or family member shares a prescription, it shows up here.',
      details: 'Prescription details', qty: 'Quantity', doctor: 'Doctor', valid: 'Valid until', pickup: 'Pickup time', reserve: 'Reserve pickup', reserved: 'Reserved for', share_t: 'Share',
      km: 'km', open11: 'Open until 11 pm', open24: 'Open 24 hours', opens8: 'Opens 8 am', closed: 'Closed now', search_ph: 'Search pharmacies', open_now: 'Open now', h24: 'Open 24 hours', send_here: 'Send prescriptions here', selected_ph: 'Your pharmacy is',
      code_t: 'Pickup code', code_s: 'Show this code at the pharmacy counter.', sample: 'Sample code', done: 'Done', lang: 'Language', note: 'All names, prescriptions and pharmacies here are sample data.', my_ph: 'My pharmacy',
      today: 'Prescriptions today', new_rx: 'New prescription', send: 'Send', invite: 'Invite a pharmacy', invite_s: 'Connect Al Noor Pharmacy and send prescriptions without paper.', issued_l: 'Issued', coll_l: 'Collected', l30: 'last 30 days', dispensed: 'Dispensed', of: 'of', next_sync: 'Next sync', recent: 'Recent prescriptions', manage: 'Manage',
      q_new: 'New', q_prep: 'Preparing', q_coll: 'Collected', q_ready: 'Ready', waiting: 'waiting for pickup', today_s: 'today', per_hr: 'per hour', avg: 'average wait', scan: 'Scan pickup code', verify: 'Check code', code_ph: 'Enter a code', match: 'Matches a prescription', no_match: 'No prescription with this code', dispense: 'Ready to dispense',
      f_patient: 'Patient', f_med: 'Medicine', f_med_ph: 'Amoxicillin 500 mg', f_dose: 'Dose', f_dose_ph: '1 capsule, 3 times a day', f_days: 'Course length', days: 'days', f_time: 'Dose time', morning: 'Morning', noon: 'Noon', evening: 'Evening', f_notes: 'Notes for the pharmacist', f_notes_ph: 'Optional', draft: 'Save draft', send_ph: 'Send to pharmacy', need_med: 'Enter a medicine to continue.',
      saved: 'Draft saved', sent_t: 'Prescription sent', sent_s: 'Al Noor Pharmacy has it now. The patient gets a pickup code when it is ready.', back_dash: 'Back to dashboard', another: 'Write another', pharm_set: 'Pharmacy updated', slot_pick: 'Choose a time to reserve.'
    },
    ar: {
      proto: 'نموذج تجريبي', pharmacy: 'الصيدلية', rx_n: 'وصفات', viewas: 'العرض كـ', patient: 'مريض', clinic: 'عيادة', gm: 'صباح الخير', nav_home: 'الرئيسية', nav_rx: 'الوصفات', nav_ph: 'الصيدليات', nav_me: 'حسابي', nav_dash: 'اللوحة', nav_q: 'الطابور', nav_new: 'جديدة',
      hl1: 'وصفتك', hl2: 'جاهزة', hl3: 'في', hl4: 'صيدلية النور', upd: 'تحديث الوصفة', show: 'اعرض رمز الاستلام', share: 'شارك الرابط', copied: 'تم نسخ الرابط', copy_fail: 'الرابط: rushta.example/r/',
      active: 'نشطة', ready_n: 'جاهزة للاستلام', issued: 'صدرت', sent: 'أُرسلت', ready: 'جاهزة', collected: 'تم الاستلام', preparing: 'قيد التجهيز', collect_by: 'استلمها قبل السبت 18 مايو',
      near: 'صيدليات قريبة منك', all: 'عرض الكل', rxs: 'الوصفات', past: 'سابقة', shared: 'مشاركة معي', none_shared: 'لا توجد وصفات مشاركة معك', none_shared_s: 'عندما يشارك طبيب أو أحد أفراد العائلة وصفة معك ستظهر هنا.',
      details: 'تفاصيل الوصفة', qty: 'الكمية', doctor: 'الطبيب', valid: 'صالحة حتى', pickup: 'موعد الاستلام', reserve: 'احجز موعد الاستلام', reserved: 'تم الحجز عند', share_t: 'مشاركة',
      km: 'كم', open11: 'مفتوحة حتى 11 مساءً', open24: 'مفتوحة 24 ساعة', opens8: 'تفتح 8 صباحًا', closed: 'مغلقة الآن', search_ph: 'ابحث عن صيدلية', open_now: 'مفتوحة الآن', h24: 'مفتوحة 24 ساعة', send_here: 'أرسل الوصفات إلى هنا', selected_ph: 'صيدليتك هي',
      code_t: 'رمز الاستلام', code_s: 'اعرض هذا الرمز عند كاونتر الصيدلية.', sample: 'رمز تجريبي', done: 'تم', lang: 'اللغة', note: 'جميع الأسماء والوصفات والصيدليات هنا بيانات تجريبية.', my_ph: 'صيدليتي',
      today: 'وصفات اليوم', new_rx: 'وصفة جديدة', send: 'إرسال', invite: 'ادعُ صيدلية', invite_s: 'اربط صيدلية النور وأرسل الوصفات دون ورق.', issued_l: 'صدرت', coll_l: 'تم استلامها', l30: 'آخر 30 يومًا', dispensed: 'صُرفت', of: 'من', next_sync: 'المزامنة القادمة', recent: 'آخر الوصفات', manage: 'إدارة',
      q_new: 'جديدة', q_prep: 'قيد التجهيز', q_coll: 'تم الاستلام', q_ready: 'جاهزة', waiting: 'بانتظار الاستلام', today_s: 'اليوم', per_hr: 'في الساعة', avg: 'متوسط الانتظار', scan: 'امسح رمز الاستلام', verify: 'تحقق من الرمز', code_ph: 'أدخل الرمز', match: 'الرمز يطابق وصفة', no_match: 'لا توجد وصفة بهذا الرمز', dispense: 'جاهزة للصرف',
      f_patient: 'المريض', f_med: 'الدواء', f_med_ph: 'أموكسيسيلين 500 ملغ', f_dose: 'الجرعة', f_dose_ph: 'كبسولة واحدة 3 مرات يوميًا', f_days: 'مدة العلاج', days: 'أيام', f_time: 'وقت الجرعة', morning: 'صباحًا', noon: 'ظهرًا', evening: 'مساءً', f_notes: 'ملاحظات للصيدلي', f_notes_ph: 'اختياري', draft: 'حفظ كمسودة', send_ph: 'أرسل إلى الصيدلية', need_med: 'أدخل اسم الدواء للمتابعة.',
      saved: 'تم حفظ المسودة', sent_t: 'تم إرسال الوصفة', sent_s: 'وصلت الوصفة إلى صيدلية النور. سيصل المريض رمز الاستلام عندما تصبح جاهزة.', back_dash: 'العودة إلى اللوحة', another: 'اكتب وصفة أخرى', pharm_set: 'تم تحديث الصيدلية', slot_pick: 'اختر وقتًا للحجز.'
    }
  };
  var D = {
    meds: { amox: { en: 'Amoxicillin 500 mg', ar: 'أموكسيسيلين 500 ملغ' }, metf: { en: 'Metformin 850 mg', ar: 'ميتفورمين 850 ملغ' }, ibu: { en: 'Ibuprofen 400 mg', ar: 'إيبوبروفين 400 ملغ' } },
    docs: { omar: { en: 'Dr. Omar Al-Khalid', ar: 'د. عمر الخالد' }, sara: { en: 'Dr. Sara Hamdan', ar: 'د. سارة حمدان' } },
    ph: {
      p1: { n: { en: 'Al Noor Pharmacy', ar: 'صيدلية النور' }, h: 'open11', km: '1.2', open: true, l: 'A', all: false },
      p2: { n: { en: 'Shifa Care', ar: 'شفاء كير' }, h: 'open24', km: '2.4', open: true, l: 'S', all: true },
      p3: { n: { en: 'Rawabi Pharmacy', ar: 'صيدلية الروابي' }, h: 'opens8', km: '3.1', open: false, l: 'R', all: false }
    },
    patients: { p1: { en: 'Ahmed S.', ar: 'أحمد س.' }, p2: { en: 'Layla M.', ar: 'ليلى م.' }, p3: { en: 'Noura Al-Qahtani', ar: 'نورة القحطاني' } },
    rx: [
      { id: 'rx1', med: 'amox', doc: 'omar', ph: 'p1', qty: { en: '21 capsules', ar: '21 كبسولة' }, st: 'ready', stage: 3, price: 'SAR 38', code: 'RS-20418', issued: { en: 'Tue 14 May', ar: 'الثلاثاء 14 مايو' }, valid: { en: '18 May', ar: '18 مايو' }, group: 'active' },
      { id: 'rx2', med: 'metf', doc: 'sara', ph: 'p2', qty: { en: '60 tablets', ar: '60 قرصًا' }, st: 'preparing', stage: 2, price: 'SAR 22', code: 'RS-20397', issued: { en: 'Mon 13 May', ar: 'الاثنين 13 مايو' }, valid: { en: '27 May', ar: '27 مايو' }, group: 'active' },
      { id: 'rx3', med: 'ibu', doc: 'omar', ph: 'p3', qty: { en: '20 tablets', ar: '20 قرصًا' }, st: 'collected', stage: 4, price: 'SAR 14', code: 'RS-20102', issued: { en: 'Thu 2 May', ar: 'الخميس 2 مايو' }, valid: { en: '9 May', ar: '9 مايو' }, group: 'past' }
    ],
    slots: [['08:00', 1], ['09:40', 1], ['10:00', 1], ['11:50', 1], ['12:30', 0], ['17:40', 0]]
  };

  var st = { lang: 'en', role: 'patient', route: 'home', rx: 'rx1', slot: '', reserved: '', filter: 'active', ph: 'p1', phq: '', phf: '', sheet: '', toast: '', qf: 'ready', scan: '', scanRes: '',
    count: 128, recent: [{ p: 'p2', m: 'metf', s: 'ready' }, { p: 'p1', m: 'amox', s: 'preparing' }],
    form: { patient: 'p3', med: '', dose: '', days: 7, time: 'morning', notes: '', err: false } };
  try { var sv = JSON.parse(localStorage.getItem('rushta-proto') || '{}'); if (sv.lang) st.lang = sv.lang; if (sv.role) { st.role = sv.role; st.route = sv.role === 'clinic' ? 'dash' : 'home'; } } catch (e) {}
  function save() { try { localStorage.setItem('rushta-proto', JSON.stringify({ lang: st.lang, role: st.role })); } catch (e) {} }

  function t(k) { return (S[st.lang] && S[st.lang][k]) || S.en[k] || k; }
  function L(o) { return o[st.lang]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function rx(id) { return D.rx.filter(function (r) { return r.id === id; })[0]; }
  function stLabel(s) { return t(s === 'ready' ? 'ready' : s === 'preparing' ? 'preparing' : 'collected'); }
  function badge(s) { return '<span class="badge' + (s === 'collected' ? ' q' : '') + '"><i></i>' + stLabel(s) + '</span>'; }
  function phHours(p) { return p.open || p.h === 'opens8' ? t(p.h) : t('closed'); }

  function header() {
    var name = st.role === 'patient' ? (st.lang === 'ar' ? 'نورة' : 'Noura') : (st.lang === 'ar' ? 'د. سارة' : 'Dr. Sara');
    return '<div class="hdr"><div class="av">' + (st.role === 'patient' ? (st.lang === 'ar' ? 'ن' : 'N') : 'SH') + '</div><div class="who"><small>' + t('gm') + '</small><b>' + name + '</b></div><button class="cb w" aria-label="Notifications">' + ic('bell', 20) + '</button></div>';
  }
  function steps(stage) {
    var h = '<div class="steps" role="img" aria-label="' + stLabel(stage === 4 ? 'collected' : stage === 3 ? 'ready' : 'preparing') + '">';
    for (var i = 1; i <= 4; i++) h += '<i class="' + (i < stage ? 'd1' : i === stage ? 'd2' : '') + '"></i>';
    return h + '</div><div class="steplab"><span>' + t('issued') + '</span><span>' + t('sent') + '</span><span>' + t('ready') + '</span><span>' + t('collected') + '</span></div>';
  }

  /* ---------- patient ---------- */
  function homeP() {
    var r = rx('rx1'), r2 = rx('rx2');
    var h = header();
    h += '<div style="margin-top:26px"><div class="eyebrow">' + t('upd') + '</div><h1 class="hl"><span class="m">' + t('hl1') + '</span> ' + t('hl2') + ' <span class="m">' + t('hl3') + '</span> ' + t('hl4') + '</h1></div>';
    h += '<div class="row2 mt"><button class="btn p f2" data-act="code">' + t('show') + '</button><button class="btn s" data-act="share">' + t('share') + '</button></div>';
    h += '<button class="card mt rxc" data-go="detail" data-id="rx1" style="padding:20px"><div class="rxtop"><div><h3>' + L(D.meds[r.med]) + '</h3><p>' + r.code + ' · ' + L(D.docs[r.doc]) + '</p></div><span class="cb">' + ic('arrow', 18) + '</span></div>';
    h += '<div class="facts"><div>' + t('issued') + '<b>' + L(r.issued) + '</b></div><div>' + t('pharmacy') + '<b>' + L(D.ph[r.ph].n) + '</b></div><div>' + t('qty') + '<b>' + L(r.qty) + '</b></div></div>' + steps(r.stage) + '<div class="steplab" style="margin-top:12px"><span>' + t('collect_by') + '</span></div></button>';
    h += '<div class="bento mt"><div class="card stat"><div class="top"><span>' + t('active') + '</span></div><div class="num">2 <small>' + t('rx_n') + '</small></div></div><div class="card stat"><div class="top"><span>' + t('ready_n') + '</span></div><div class="num">1 <small>' + t('rx_n') + '</small></div></div></div>';
    h += '<div class="sec-h"><h2>' + t('near') + '</h2><button data-go="pharm">' + t('all') + '</button></div><div class="stack">' + phRows(['p1', 'p2']) + '</div>';
    return h;
  }
  function phRows(ids) {
    return ids.map(function (id) {
      var p = D.ph[id];
      return '<button class="item" data-go="pharm"><span class="av ' + (id === 'p1' ? 'l' : 'g') + '" style="width:44px;height:44px">' + (st.lang === 'ar' ? L(p.n).charAt(L(p.n).indexOf(' ') + 1) : p.l) + '</span><span class="t"><b>' + L(p.n) + '</b><span>' + phHours(p) + '</span></span><span class="e">' + p.km + ' ' + t('km') + ic('next', 16) + '</span></button>';
    }).join('');
  }
  function rxList() {
    var h = '<h1 class="title">' + t('rxs') + '</h1><div class="chips">';
    [['active', 'active'], ['past', 'past'], ['shared', 'shared']].forEach(function (f) { h += '<button class="chip" data-act="filter" data-v="' + f[0] + '" aria-pressed="' + (st.filter === f[0]) + '">' + t(f[1]) + '</button>'; });
    h += '</div><div class="stack mt">';
    var list = D.rx.filter(function (r) { return r.group === st.filter; });
    if (!list.length) h += '<div class="empty"><b>' + t('none_shared') + '</b>' + t('none_shared_s') + '</div>';
    list.forEach(function (r) {
      h += '<button class="rxc" data-go="detail" data-id="' + r.id + '"><div class="l"><span class="av g" style="width:44px;height:44px">' + ic('pill', 20) + '</span>' + badge(r.st) + '</div><h3>' + L(D.meds[r.med]) + '</h3><p>' + L(D.docs[r.doc]) + '</p><div class="f"><span class="price">' + r.price + '</span><span style="display:flex;gap:4px;align-items:center">' + ic('clock', 14) + ' ' + L(r.issued) + '</span></div></button>';
    });
    return h + '</div>';
  }
  function detail() {
    var r = rx(st.rx), p = D.ph[r.ph], h = '';
    h += '<div class="back"><button class="cb w" data-go="rx" aria-label="Back">' + ic('back', 20) + '</button><button class="cb w" data-act="share" aria-label="' + t('share_t') + '">' + ic('share', 19) + '</button></div>';
    h += '<div style="margin-top:22px">' + badge(r.st) + '</div><h1 class="hero-n">' + L(D.meds[r.med]) + '</h1><div class="loc">' + ic('pin', 18) + L(p.n) + ' · ' + p.km + ' ' + t('km') + '</div>';
    h += '<div class="card mt">' + steps(r.stage) + '</div>';
    h += '<div class="sec-h" style="margin-top:24px"><h2>' + t('details') + '</h2></div><div class="tiles"><div class="tile">' + ic('box', 22) + '<b>' + L(r.qty) + '</b><span>' + t('qty') + '</span></div><div class="tile">' + ic('case', 22) + '<b>' + L(D.docs[r.doc]) + '</b><span>' + t('doctor') + '</span></div><div class="tile">' + ic('clock', 22) + '<b>' + L(r.valid) + '</b><span>' + t('valid') + '</span></div></div>';
    if (r.st === 'ready') {
      h += '<div class="sec-h"><h2>' + t('pickup') + '</h2></div><div class="card"><div style="display:flex;justify-content:space-between;align-items:center;font-weight:500"><span>' + (st.lang === 'ar' ? 'الأربعاء، 14 مايو' : 'Wednesday, 14 May') + '</span>' + ic('cal', 20) + '</div><div class="chips" style="flex-wrap:wrap;overflow:visible;margin-top:14px">';
      D.slots.forEach(function (s) { h += '<button class="chip slot" data-act="slot" data-v="' + s[0] + '" aria-pressed="' + (st.slot === s[0]) + '"' + (s[1] ? '' : ' disabled') + '>' + s[0] + '</button>'; });
      h += '</div>' + (st.reserved ? '<p class="eyebrow" style="margin:14px 0 0">' + t('reserved') + ' ' + st.reserved + '</p>' : '') + '</div>';
      h += '<div class="row2 mt2">' + (st.reserved ? '<button class="btn p f2" data-act="code">' + t('show') + '</button>' : '<button class="btn p f2" data-act="reserve">' + t('reserve') + '</button>') + '<button class="cb" style="width:52px;height:52px" data-act="share" aria-label="' + t('share') + '">' + ic('chat', 21) + '</button></div>';
    } else {
      h += '<div class="row2 mt2"><button class="btn s" data-act="share">' + t('share') + '</button></div>';
    }
    return h;
  }
  function pharm() {
    var h = '<h1 class="title">' + t('nav_ph') + '</h1><input class="field" id="phq" type="search" placeholder="' + t('search_ph') + '" value="' + esc(st.phq) + '" aria-label="' + t('search_ph') + '"><div class="chips mt" style="margin-top:12px">';
    [['open', 'open_now'], ['24', 'h24']].forEach(function (f) { h += '<button class="chip" data-act="phf" data-v="' + f[0] + '" aria-pressed="' + (st.phf === f[0]) + '">' + t(f[1]) + '</button>'; });
    h += '</div><div class="stack mt" id="phlist">' + pharmList() + '</div><p class="eyebrow" style="margin-top:20px">' + t('send_here') + '</p>';
    return h;
  }
  function pharmList() {
    var q = st.phq.toLowerCase(), out = '';
    Object.keys(D.ph).forEach(function (id) {
      var p = D.ph[id];
      if (q && (L(p.n).toLowerCase().indexOf(q) < 0 && p.n.en.toLowerCase().indexOf(q) < 0)) return;
      if (st.phf === 'open' && !p.open) return;
      if (st.phf === '24' && !p.all) return;
      out += '<button class="item pcard" role="radio" aria-checked="' + (st.ph === id) + '" data-act="pickph" data-id="' + id + '"><span class="av ' + (st.ph === id ? '' : 'g') + '" style="width:44px;height:44px">' + (st.ph === id ? ic('check', 20) : (st.lang === 'ar' ? L(p.n).charAt(L(p.n).indexOf(' ') + 1) : p.l)) + '</span><span class="t"><b>' + L(p.n) + '</b><span>' + phHours(p) + ' · ' + p.km + ' ' + t('km') + '</span></span></button>';
    });
    return out || '<div class="empty"><b>—</b></div>';
  }
  function me() {
    var h = '<h1 class="title">' + t('nav_me') + '</h1><div class="card" style="display:flex;align-items:center;gap:14px"><div class="av" style="width:56px;height:56px;font-size:20px">' + (st.role === 'patient' ? (st.lang === 'ar' ? 'ن' : 'N') : 'SH') + '</div><div><b style="font-size:18px">' + (st.role === 'patient' ? (st.lang === 'ar' ? 'نورة القحطاني' : 'Noura Al-Qahtani') : (st.lang === 'ar' ? 'د. سارة حمدان' : 'Dr. Sara Hamdan')) + '</b><div class="eyebrow">' + (st.role === 'patient' ? t('my_ph') + ': ' + L(D.ph[st.ph].n) : 'Al Noor Clinic') + '</div></div></div>';
    h += '<span class="lab">' + t('lang') + '</span><div class="row2"><button class="chip" style="flex:1;justify-content:center" data-act="lang" data-v="en" aria-pressed="' + (st.lang === 'en') + '">English</button><button class="chip" style="flex:1;justify-content:center" data-act="lang" data-v="ar" aria-pressed="' + (st.lang === 'ar') + '">العربية</button></div>';
    h += '<span class="lab">' + t('viewas') + '</span><div class="row2"><button class="chip" style="flex:1;justify-content:center" data-act="role" data-v="patient" aria-pressed="' + (st.role === 'patient') + '">' + t('patient') + '</button><button class="chip" style="flex:1;justify-content:center" data-act="role" data-v="clinic" aria-pressed="' + (st.role === 'clinic') + '">' + t('clinic') + '</button></div>';
    return h + '<p class="eyebrow" style="margin-top:26px">' + t('note') + '</p>';
  }

  /* ---------- clinic ---------- */
  function dash() {
    var h = '<div class="hdr"><div class="av">SH</div><div class="who"><small>' + t('gm') + '</small><b>' + (st.lang === 'ar' ? 'د. سارة' : 'Dr. Sara') + '</b></div><span class="chip" style="height:38px;font-size:13px;gap:6px">' + ic('case', 15) + (st.lang === 'ar' ? 'عيادة النور' : 'Al Noor Clinic') + '</span></div>';
    h += '<div style="text-align:center;margin-top:28px"><div class="eyebrow" style="display:flex;gap:8px;justify-content:center;align-items:center">' + t('today') + ' <span class="badge"><i></i>+5%</span></div><div class="big">' + st.count + '</div></div>';
    h += '<div class="row2 mt2"><button class="btn p f2 sm" data-go="new">' + t('new_rx') + '</button><button class="cb" style="width:46px;height:46px" data-act="scan" aria-label="' + t('scan') + '">' + ic('qr', 19) + '</button><button class="btn s sm" data-act="sendq">' + t('send') + '</button></div>';
    h += '<div class="invite mt"><div style="flex:1"><b style="font-size:15px">' + t('invite') + '</b><p>' + t('invite_s') + '</p></div><div class="glyph">' + MARK + '</div></div>';
    h += '<div class="bento mt"><div class="card stat"><div class="top"><span>' + t('issued_l') + '</span><span class="d">▲ 2.8%</span></div><div class="num">3,789</div><div class="sub">' + t('l30') + '</div></div><div class="card stat"><div class="top"><span>' + t('coll_l') + '</span><span class="d dn">▼ 2.6%</span></div><div class="num">3,587</div><div class="sub">' + t('l30') + '</div></div></div>';
    h += '<div class="card mt"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>' + t('dispensed') + '</b><span style="font-size:24px;font-weight:700">94 <small style="font-size:14px;color:var(--mute);font-weight:500">' + t('of') + ' ' + st.count + '</small></span></div><div class="eyebrow" style="display:flex;justify-content:space-between;margin-top:6px"><span>' + t('next_sync') + '</span><span>20 ' + (st.lang === 'ar' ? 'مارس' : 'Mar') + ' 2026</span></div><div class="track"><b style="width:' + Math.round(94 / st.count * 100) + '%"></b><u style="inset-inline-start:' + Math.round(94 / st.count * 100) + '%"></u></div></div>';
    h += '<div class="sec-h"><h2>' + t('recent') + '</h2><button>' + t('all') + '</button></div><div class="stack">' + st.recent.map(function (x) { return '<div class="item"><span class="av l" style="width:42px;height:42px;font-size:14px">' + L(D.patients[x.p]).slice(0, 2) + '</span><span class="t"><b>' + L(D.patients[x.p]) + '</b><span>' + L(D.meds[x.m]) + '</span></span>' + badge(x.s) + '</div>'; }).join('') + '</div>';
    return h;
  }
  function queue() {
    var cards = [['new', 'q_new', '14', t('per_hr') + ' 4'], ['preparing', 'q_prep', '6', t('avg') + ' 7 ' + (st.lang === 'ar' ? 'د' : 'min')], ['collected', 'q_coll', '31', t('today_s')], ['ready', 'q_ready', '9', t('waiting')]];
    var h = '<h1 class="title">' + t('nav_q') + '</h1><div class="q4">';
    cards.forEach(function (c) { h += '<button class="qt" data-act="qf" data-v="' + c[0] + '" aria-pressed="' + (st.qf === c[0]) + '"><b>' + t(c[1]) + '</b><span><span class="n">' + c[2] + '</span><small>' + c[3] + '</small></span></button>'; });
    h += '</div><div class="sec-h"><h2>' + t('q_' + (st.qf === 'new' ? 'new' : st.qf === 'preparing' ? 'prep' : st.qf === 'collected' ? 'coll' : 'ready')) + '</h2></div><div class="stack">';
    var rows = [['p1', 'amox', 'ready'], ['p2', 'metf', 'preparing'], ['p3', 'ibu', 'collected']];
    rows.forEach(function (x) { h += '<div class="item"><span class="av l" style="width:42px;height:42px;font-size:14px">' + L(D.patients[x[0]]).slice(0, 2) + '</span><span class="t"><b>' + L(D.patients[x[0]]) + '</b><span>' + L(D.meds[x[1]]) + '</span></span>' + badge(x[2]) + '</div>'; });
    return h + '</div>';
  }
  function form() {
    var f = st.form, h = '<div class="back"><button class="cb w" data-go="dash" aria-label="Back">' + ic('back', 20) + '</button></div><h1 class="title" style="margin-top:18px">' + t('new_rx') + '</h1>';
    h += '<span class="lab" style="margin-top:6px">' + t('f_patient') + '</span><div class="chips">' + Object.keys(D.patients).map(function (k) { return '<button class="chip" data-act="fpat" data-v="' + k + '" aria-pressed="' + (f.patient === k) + '">' + L(D.patients[k]) + '</button>'; }).join('') + '</div>';
    h += '<label class="lab" for="f-med">' + t('f_med') + '</label><input class="field" id="f-med" placeholder="' + t('f_med_ph') + '" value="' + esc(f.med) + '" autocomplete="off">' + (f.err ? '<div class="err" role="alert">' + t('need_med') + '</div>' : '');
    h += '<label class="lab" for="f-dose">' + t('f_dose') + '</label><input class="field" id="f-dose" placeholder="' + t('f_dose_ph') + '" value="' + esc(f.dose) + '" autocomplete="off">';
    h += '<span class="lab">' + t('f_days') + '</span><div class="chips">' + [3, 5, 7, 10, 14].map(function (d) { return '<button class="chip" data-act="fdays" data-v="' + d + '" aria-pressed="' + (f.days === d) + '">' + d + ' ' + t('days') + '</button>'; }).join('') + '</div>';
    h += '<span class="lab">' + t('f_time') + '</span><div class="chips">' + ['morning', 'noon', 'evening'].map(function (k) { return '<button class="chip" data-act="ftime" data-v="' + k + '" aria-pressed="' + (f.time === k) + '">' + t(k) + '</button>'; }).join('') + '</div>';
    h += '<label class="lab" for="f-notes">' + t('f_notes') + '</label><input class="field" id="f-notes" placeholder="' + t('f_notes_ph') + '" value="' + esc(f.notes) + '" autocomplete="off">';
    h += '<div class="row2 mt2"><button class="btn s" data-act="draft">' + t('draft') + '</button><button class="btn p f2" data-act="sendrx">' + t('send_ph') + '</button></div>';
    return h;
  }

  /* ---------- sheets ---------- */
  function qrSvg(seed) {
    var n = 25, h = 0, i, x, y, s = '';
    for (i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
    function rnd() { h = (h * 1664525 + 1013904223) >>> 0; return h / 4294967296; }
    function finder(fx, fy) { return x >= fx && x < fx + 7 && y >= fy && y < fy + 7; }
    for (y = 0; y < n; y++) for (x = 0; x < n; x++) {
      var on;
      if (finder(0, 0) || finder(n - 7, 0) || finder(0, n - 7)) {
        var fx = x < 7 ? 0 : n - 7, fy = y < 7 ? 0 : n - 7, dx = x - fx, dy = y - fy;
        on = dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
      } else if ((x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9)) on = false; else on = rnd() > .52;
      if (on) s += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02"/>';
    }
    return '<svg class="qr" viewBox="0 0 ' + n + ' ' + n + '" fill="#090E0E" role="img" aria-label="' + t('sample') + '">' + s + '</svg>';
  }
  function sheetHtml() {
    var h = '<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-modal="true"><div class="grab"></div>';
    if (st.sheet === 'code') {
      var r = rx(st.rx === 'rx2' || st.rx === 'rx3' ? st.rx : 'rx1');
      h += '<h2>' + t('code_t') + '</h2><p class="sub">' + t('code_s') + '</p>' + qrSvg(r.code) + '<div class="code">' + r.code + '</div><p class="eyebrow" style="text-align:center;margin:0 0 18px">' + t('sample') + ' · ' + L(D.meds[r.med]) + (st.reserved ? ' · ' + st.reserved : '') + '</p><div class="row2"><button class="btn s" data-act="share">' + t('share') + '</button><button class="btn p" data-act="close">' + t('done') + '</button></div>';
    } else if (st.sheet === 'scan') {
      h += '<h2>' + t('scan') + '</h2><p class="sub">' + t('code_s') + '</p><input class="field" id="scan-in" placeholder="RS-20418" value="' + esc(st.scan) + '" autocomplete="off" aria-label="' + t('code_ph') + '">';
      if (st.scanRes === 'ok') h += '<div class="invite" style="margin-top:14px"><div><b>' + t('match') + '</b><p>Noura Al-Qahtani · ' + L(D.meds.amox) + '<br>' + t('dispense') + '</p></div></div>';
      if (st.scanRes === 'no') h += '<div class="err" role="alert">' + t('no_match') + '</div>';
      h += '<div class="row2 mt"><button class="btn s" data-act="close">' + t('done') + '</button><button class="btn p f2" data-act="verify">' + t('verify') + '</button></div>';
    } else if (st.sheet === 'sent') {
      h += '<div class="invite" style="background:#E3F5EE;margin-bottom:16px"><div class="glyph" style="transform:none;width:54px;height:54px;border-radius:18px">' + ic('check', 26) + '</div><div><h2 style="margin:0">' + t('sent_t') + '</h2></div></div><p class="sub">' + t('sent_s') + '</p><div class="row2"><button class="btn s" data-act="another">' + t('another') + '</button><button class="btn p f2" data-act="tohome">' + t('back_dash') + '</button></div>';
    }
    return h + '</div>';
  }

  /* ---------- shell ---------- */
  function navItems() {
    return st.role === 'patient'
      ? [['home', 'home', 'nav_home'], ['rx', 'rx', 'nav_rx'], ['pharm', 'pin', 'nav_ph'], ['me', 'user', 'nav_me']]
      : [['dash', 'home', 'nav_dash'], ['cq', 'rx', 'nav_q'], ['new', 'plus', 'nav_new'], ['me', 'user', 'nav_me']];
  }
  function routeHtml() {
    var r = st.route;
    if (st.role === 'patient') return r === 'home' ? homeP() : r === 'rx' ? rxList() : r === 'detail' ? detail() : r === 'pharm' ? pharm() : me();
    return r === 'dash' ? dash() : r === 'cq' ? queue() : r === 'new' ? form() : me();
  }
  function render(keepScroll) {
    var y = window.scrollY, a = document.getElementById('app');
    a.setAttribute('dir', st.lang === 'ar' ? 'rtl' : 'ltr'); a.setAttribute('lang', st.lang);
    var proto = '<div class="proto"><span>' + t('proto') + '</span><span class="seg2" role="group" aria-label="' + t('viewas') + '"><button data-act="role" data-v="patient" aria-pressed="' + (st.role === 'patient') + '">' + t('patient') + '</button><button data-act="role" data-v="clinic" aria-pressed="' + (st.role === 'clinic') + '">' + t('clinic') + '</button></span><span class="seg2" role="group" aria-label="' + t('lang') + '"><button data-act="lang" data-v="en" aria-pressed="' + (st.lang === 'en') + '">EN</button><button data-act="lang" data-v="ar" aria-pressed="' + (st.lang === 'ar') + '">ع</button></span></div>';
    var items = navItems(), cur = st.route === 'detail' ? 'rx' : st.route;
    var nav = '<nav class="nav" aria-label="Main">' + items.map(function (i) { return '<button data-go="' + i[0] + '" aria-label="' + t(i[2]) + '"' + (cur === i[0] ? ' aria-current="page"' : '') + '>' + ic(i[1], 21) + '<span>' + t(i[2]) + '</span></button>'; }).join('') + '</nav>';
    a.innerHTML = proto + routeHtml() + nav;
    document.getElementById('layer').innerHTML = (st.sheet ? sheetHtml() : '') + (st.toast ? '<div class="toast" role="status">' + esc(st.toast) + '</div>' : '');
    window.scrollTo(0, keepScroll ? y : 0);
  }
  var tt;
  function toast(m) { st.toast = m; clearTimeout(tt); tt = setTimeout(function () { st.toast = ''; var l = document.getElementById('layer'); var el = l.querySelector('.toast'); if (el) el.remove(); }, 2400); }
  function link() { var r = rx(st.rx); return 'rushta.example/r/' + r.code; }
  function copy() {
    var u = 'https://' + link();
    try { navigator.clipboard.writeText(u).then(function () { toast(t('copied')); render(true); }, function () { toast(t('copy_fail') + rx(st.rx).code); render(true); }); }
    catch (e) { toast(t('copy_fail') + rx(st.rx).code); render(true); }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go],[data-act]'); if (!el) return;
    var go = el.getAttribute('data-go'), act = el.getAttribute('data-act'), v = el.getAttribute('data-v'), id = el.getAttribute('data-id');
    if (go) { if (id) st.rx = id; st.route = go; st.sheet = ''; return render(); }
    if (act === 'close') { st.sheet = ''; st.scanRes = ''; return render(true); }
    if (act === 'lang') { st.lang = v; save(); return render(true); }
    if (act === 'role') { st.role = v; st.route = v === 'clinic' ? 'dash' : 'home'; st.sheet = ''; save(); return render(); }
    if (act === 'filter') { st.filter = v; return render(true); }
    if (act === 'slot') { st.slot = v; return render(true); }
    if (act === 'reserve') { if (!st.slot) { toast(t('slot_pick')); return render(true); } st.reserved = st.slot + (st.lang === 'ar' ? ' يوم الأربعاء' : ' on Wed 14 May'); toast(t('reserved') + ' ' + st.slot); return render(true); }
    if (act === 'code') { st.sheet = 'code'; return render(true); }
    if (act === 'share') return copy();
    if (act === 'phf') { st.phf = st.phf === v ? '' : v; return render(true); }
    if (act === 'pickph') { st.ph = id; toast(t('pharm_set')); return render(true); }
    if (act === 'qf') { st.qf = v; return render(true); }
    if (act === 'scan') { st.sheet = 'scan'; st.scanRes = ''; return render(true); }
    if (act === 'verify') { var inp = document.getElementById('scan-in'); st.scan = inp ? inp.value.trim().toUpperCase() : ''; st.scanRes = st.scan === 'RS-20418' ? 'ok' : 'no'; return render(true); }
    if (act === 'sendq') { toast(t('sent_t')); return render(true); }
    if (act === 'fpat') { st.form.patient = v; return render(true); }
    if (act === 'fdays') { st.form.days = +v; return render(true); }
    if (act === 'ftime') { st.form.time = v; return render(true); }
    if (act === 'draft') { toast(t('saved')); return render(true); }
    if (act === 'sendrx') {
      var m = document.getElementById('f-med'); st.form.med = m ? m.value.trim() : st.form.med; st.form.dose = (document.getElementById('f-dose') || {}).value || ''; st.form.notes = (document.getElementById('f-notes') || {}).value || '';
      if (!st.form.med) { st.form.err = true; render(true); var f = document.getElementById('f-med'); if (f) f.focus(); return; }
      st.form.err = false; st.count += 1; st.recent.unshift({ p: st.form.patient, m: 'amox', s: 'preparing' }); st.sheet = 'sent'; return render(true);
    }
    if (act === 'another') { st.form = { patient: 'p3', med: '', dose: '', days: 7, time: 'morning', notes: '', err: false }; st.sheet = ''; st.route = 'new'; return render(); }
    if (act === 'tohome') { st.form = { patient: 'p3', med: '', dose: '', days: 7, time: 'morning', notes: '', err: false }; st.sheet = ''; st.route = 'dash'; return render(); }
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'phq') { st.phq = e.target.value; var l = document.getElementById('phlist'); if (l) l.innerHTML = pharmList(); }
    if (e.target.id === 'f-med') { st.form.med = e.target.value; }
    if (e.target.id === 'f-dose') { st.form.dose = e.target.value; }
    if (e.target.id === 'f-notes') { st.form.notes = e.target.value; }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && st.sheet) { st.sheet = ''; render(true); } });
  render();
})();
