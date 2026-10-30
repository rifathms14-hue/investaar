import sys
sys.path.insert(0, '.')
from icons import ic, statusbar
from build_ui import HEAD, MARK, MARKR

G = 'background:linear-gradient(135deg,rgba(255,255,255,.82),rgba(255,255,255,.5));box-shadow:0 1px 0 rgba(255,255,255,.9) inset,0 10px 30px rgba(3,68,45,.08)'


def nav4(active=0):
    items = ['home', 'hist', 'qr', 'gear']
    out = ''
    for i, n in enumerate(items):
        on = i == active
        out += (f'<div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:{"#03442D" if on else "#9AA8A3"};{"background:#fff;box-shadow:0 4px 14px rgba(3,68,45,.12)" if on else ""}">{ic(n,21)}</div>')
    return f'<div style="position:absolute;left:30px;right:30px;bottom:30px;height:60px;border-radius:999px;background:rgba(232,240,236,.9);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:space-around">{out}</div>'


# ---------- Direction D: glass wallet, three screens ----------
def dir_d():
    # screen 1: home with arc and round actions
    act = lambda i, l: f'<div style="text-align:center;font-size:13px;color:#4c5f59"><div class="cb" style="width:62px;height:62px;margin:0 auto 8px">{ic(i,23)}</div>{l}</div>'
    row = lambda av, c, n, sub, st, tone: (f'<div class="card" style="height:68px;border-radius:22px;display:flex;align-items:center;gap:12px;padding:0 14px;box-shadow:0 1px 2px rgba(3,68,45,.04),0 6px 16px rgba(3,68,45,.05)"><div class="av {c}" style="width:42px;height:42px">{av}</div>'
                                           f'<div style="flex:1"><div style="font-weight:700;font-size:14px">{n}</div><div class="mute" style="font-size:12px;margin-top:2px">{sub}</div></div><div style="font-size:13px;font-weight:700;color:{tone}">{st}</div></div>')
    s1 = f'''<div class="phone" style="border-radius:46px;background:#F5F9F8;box-shadow:0 30px 70px rgba(3,68,45,.16)">{statusbar()}
<div style="position:absolute;top:0;left:0;right:0;height:430px;border-radius:0 0 54px 54px;background:linear-gradient(180deg,#D5EAE4 0%,#E8F3F0 60%,#F3F8F7 100%)"></div>
<div style="position:absolute;top:96px;left:50%;width:320px;height:320px;margin-left:-160px;border-radius:50%;border:2px solid rgba(255,255,255,.85);border-bottom-color:transparent;border-left-color:rgba(255,255,255,.2)"></div>
<div style="position:absolute;top:66px;left:22px;right:22px;display:flex;align-items:center;gap:12px"><div class="av k" style="width:48px;height:48px">N</div><div style="flex:1"><div class="mute" style="font-size:12px">Good morning</div><div style="font-weight:700;font-size:16px">Noura</div></div><div class="cb m s" style="background:rgba(255,255,255,.7)">{ic("bell",19)}</div></div>
<div style="position:absolute;top:176px;left:0;right:0;text-align:center"><div class="mute" style="font-size:13px;letter-spacing:.02em">Ready to collect</div><div style="font-size:64px;font-weight:700;letter-spacing:-.02em;line-height:1.1;margin-top:6px">2<span style="font-size:20px;font-weight:500;color:#6F7E79;margin-left:8px">prescriptions</span></div>
  <div class="btn p" style="width:170px;height:46px;font-size:14px;margin:18px auto 0">Show pickup code</div><div style="display:flex;gap:7px;justify-content:center;margin-top:18px"><i style="width:7px;height:7px;border-radius:50%;background:#03442D"></i><i style="width:7px;height:7px;border-radius:50%;background:#C8D6D1"></i><i style="width:7px;height:7px;border-radius:50%;background:#C8D6D1"></i></div></div>
<div style="position:absolute;top:372px;left:40px;right:40px;display:flex;justify-content:space-between">{act("pill","Refill")}{act("share","Share")}{act("qr","Scan")}</div>
<div style="position:absolute;top:490px;left:24px;right:24px;height:48px;border-radius:999px;background:#EAF1EE;padding:5px;display:flex"><div style="flex:1;border-radius:999px;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(3,68,45,.08)">Activity</div><div style="flex:1;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6F7E79">Pharmacies</div></div>
<div class="soft" style="position:absolute;top:558px;left:26px;font-size:13px">Yesterday</div>
<div style="position:absolute;top:586px;left:16px;right:16px;display:flex;flex-direction:column;gap:10px">{row("M","g","Metformin 850 mg","Shifa Care","Collected","#03442D")}{row("A","","Amoxicillin 500 mg","Al Noor Pharmacy","Ready","#03442D")}</div>
{nav4(0)}<div class="hb"></div></div>'''

    # screen 2: stacked glass cards
    peek = lambda top, w, bg, label: f'<div style="position:absolute;top:{top}px;left:{(390-w)/2}px;width:{w}px;height:80px;border-radius:26px 26px 0 0;background:{bg};color:rgba(255,255,255,.9);font-size:12px;font-weight:700;text-align:center;padding-top:10px">{label}</div>'
    s2 = f'''<div class="phone" style="border-radius:46px;background:#F5F9F8;box-shadow:0 30px 70px rgba(3,68,45,.16)">{statusbar()}
<div style="position:absolute;top:0;left:0;right:0;height:300px;background:linear-gradient(180deg,#D5EAE4,#F5F9F8)"></div>
<div style="position:absolute;top:70px;left:0;right:0;text-align:center;font-weight:700;font-size:20px">Prescriptions</div>
<div style="position:absolute;top:124px;left:22px;right:22px;height:168px;border-radius:30px;background:#fff;box-shadow:0 8px 30px rgba(3,68,45,.08);padding:14px"><div style="height:46px;border-radius:999px;background:#EEF4F1;padding:5px;display:flex"><div style="flex:1;border-radius:999px;background:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 2px 8px rgba(3,68,45,.08)">Active</div><div style="flex:1;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6F7E79">Past</div></div>
  <div style="display:flex;align-items:center;gap:14px;margin-top:22px;border-radius:20px;background:#F7FAF9;padding:14px"><div class="cb m" style="background:#DDF4EA;color:#03442D;box-shadow:none;width:42px;height:42px">{ic("check",19)}</div><div><div style="font-weight:700;font-size:14px">Ready at Al Noor Pharmacy</div><div class="mute" style="font-size:12px;margin-top:2px">Show the code at the counter</div></div></div></div>
{peek(318,300,"rgba(1,190,132,.28)","Refill")}{peek(344,326,"rgba(1,190,132,.45)","Chronic")}{peek(370,352,"linear-gradient(180deg,#0f7a58,#0a6247)","Shared with me")}
<div style="position:absolute;top:398px;left:14px;right:14px;height:256px;border-radius:30px;background:linear-gradient(145deg,#1d8a68 0%,#03442D 62%,#02281b 100%);color:#fff;padding:22px;box-shadow:0 18px 40px rgba(3,68,45,.3)"><div style="display:flex;justify-content:space-between;font-size:13px;opacity:.85"><span>My prescription</span><span>Digital</span></div>
  <div style="font-size:30px;font-weight:700;margin-top:34px;letter-spacing:-.01em">Amoxicillin 500 mg</div><div style="font-size:13px;opacity:.7;margin-top:6px">Rx RS-20418 · Dr. Omar Al-Khalid</div>
  <div style="position:absolute;left:22px;bottom:20px;font-size:12px;opacity:.7">Valid until 18 May</div><div style="position:absolute;right:20px;bottom:16px;opacity:.95">{MARKR % 30}</div></div>
<div style="position:absolute;left:20px;right:20px;top:690px;display:flex;gap:10px"><div class="btn p" style="flex:1.5">Show code</div><div class="btn s" style="flex:1">Share link</div></div><div class="hb"></div></div>'''

    # screen 3: overview with bars
    bar = lambda h, pct, on=False, lab="": (f'<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:10px"><div style="width:100%;height:{h}px;border-radius:18px;background:{"linear-gradient(180deg,#4FD3A6,#01BE84)" if on else "#E6EFEB"};position:relative;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px;font-weight:700;font-size:13px;color:{"#fff" if on else "#6F7E79"}">{pct}</div><div style="font-size:13px;color:#6F7E79">{lab}</div></div>')
    med = lambda n, sub, dose: (f'<div style="display:flex;align-items:center;gap:12px;height:62px"><div class="av g" style="width:46px;height:46px;border-radius:16px">{ic("pill",21)}</div><div style="flex:1"><div style="font-weight:700;font-size:15px">{n}</div><div class="mute" style="font-size:12px;margin-top:2px">{sub}</div></div><div style="font-weight:700;font-size:15px">{dose}</div></div>')
    s3 = f'''<div class="phone" style="border-radius:46px;background:#fff;box-shadow:0 30px 70px rgba(3,68,45,.16)">{statusbar()}
<div style="position:absolute;top:0;left:0;right:0;height:380px;background:linear-gradient(180deg,#E4F1EC,#fff)"></div>
<div style="position:absolute;top:66px;left:20px;right:20px;display:flex;align-items:center;justify-content:space-between"><div class="cb m d">{ic("back",19)}</div><div style="font-weight:700;font-size:19px">Overview</div><div class="cb m s">{ic("menu",19)}</div></div>
<div style="position:absolute;top:130px;left:24px;right:24px"><div class="mute" style="font-size:13px">Doses taken on time</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px"><div style="font-size:42px;font-weight:700;letter-spacing:-.02em">86<span style="font-size:24px;color:#6F7E79">%</span></div><div style="display:flex;gap:8px"><div class="cb m s" style="width:36px;height:36px">{ic("back",16)}</div><div class="cb m s" style="width:36px;height:36px">{ic("next",16)}</div></div></div></div>
<div style="position:absolute;top:238px;left:24px;right:24px;height:210px;display:flex;gap:12px;align-items:flex-end">{bar(60,"22%",False,"Mar")}{bar(124,"56%",False,"Apr")}{bar(84,"31%",False,"May")}{bar(180,"67%",True,"Jun")}</div>
<div style="position:absolute;top:226px;left:96px;height:34px;padding:0 12px;border-radius:999px;display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;{G}"><span style="color:#03442D">+8%</span><span class="mute" style="font-weight:500">vs last month</span></div>
<div style="position:absolute;top:490px;left:24px;right:24px"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:19px;font-weight:700">Active medicines</div><div class="mute" style="font-size:13px">Manage</div></div>
  <div style="margin-top:8px">{med("Amoxicillin","Next dose 8:00 pm","500 mg")}{med("Metformin","Next dose 9:30 pm","850 mg")}{med("Ibuprofen","As needed, max 3 a day","400 mg")}</div></div>
{nav4(1)}<div class="hb"></div></div>'''
    css = '.board{width:1560px;height:1100px;background:radial-gradient(60% 70% at 12% 8%,#F1F7F5,transparent),radial-gradient(70% 80% at 92% 100%,#D3E6E1,transparent),#E2EEEA}.row{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:50px}'
    return HEAD % ('Direction D', css, f'<div class="board"><div class="row">{s1}{s2}{s3}</div></div>')


# ---------- Direction E: hero poster, big type behind the phone, glossy ribbon ----------
def dir_e():
    stat = lambda t, v, sub, d, up=True: (f'<div class="card" style="flex:1;border-radius:24px;padding:14px 16px;box-shadow:0 1px 2px rgba(3,68,45,.04),0 8px 20px rgba(3,68,45,.06)"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700"><span>{t}</span><span style="font-size:11px;color:{"#03442D" if up else "#6F7E79"};display:flex;align-items:center;gap:2px">{"▲" if up else "▼"} {d}</span></div>'
                                          f'<div style="font-size:23px;font-weight:700;margin-top:10px;letter-spacing:-.01em">{v}</div><div class="soft" style="font-size:11px;margin-top:2px">{sub}</div></div>')
    pill = ('<div style="position:absolute;left:34px;right:34px;bottom:30px;height:58px;border-radius:999px;background:#090E0E;display:flex;align-items:center;padding:0 6px;gap:6px;box-shadow:0 14px 34px rgba(0,0,0,.35)">'
            f'<div style="height:46px;padding:0 18px;border-radius:999px;background:#fff;display:flex;align-items:center;gap:7px;font-weight:700;font-size:14px;color:#090E0E">{ic("home",20)}Home</div>'
            + ''.join(f'<div style="flex:1;display:flex;justify-content:center;color:#fff">{ic(n,21)}</div>' for n in ('rx', 'qr', 'cal', 'menu')) + '</div>')
    ph = f'''<div class="phone frame" style="background:#fff">
<div class="island"></div>{statusbar()}
<div style="position:absolute;inset:0;background:radial-gradient(80% 30% at 50% 0%,rgba(128,222,193,.35),transparent 70%),#fff"></div>
<div style="position:absolute;top:70px;left:20px;right:20px;display:flex;align-items:center;gap:10px"><div class="av k" style="width:40px;height:40px;font-size:14px">AN</div><div class="cb m s" style="width:40px;height:40px">{ic("bell",18)}</div><div style="flex:1"></div><div class="chip" style="height:38px;font-size:13px;gap:6px;padding:0 14px">{ic("case",15)} Al Noor Clinic {ic("next",13)}</div></div>
<div style="position:absolute;top:134px;left:0;right:0;text-align:center"><div style="font-size:13px;display:flex;gap:8px;align-items:center;justify-content:center">Prescriptions today <span class="badge" style="height:20px;font-size:10px;padding:0 8px"><i></i>+5%</span></div><div style="font-size:48px;font-weight:700;letter-spacing:-.02em;margin-top:4px">128</div></div>
<div style="position:absolute;top:240px;left:20px;right:20px;display:flex;gap:8px"><div class="btn p" style="flex:1.2;height:46px;font-size:14px">New prescription</div><div class="cb s" style="width:46px;height:46px">{ic("qr",19)}</div><div class="btn s" style="flex:1;height:46px;font-size:14px">Send</div></div>
<div style="position:absolute;top:304px;left:16px;right:16px;height:98px;border-radius:26px;background:linear-gradient(120deg,#E5F6EF,#F3FAF7 55%,#fff);display:flex;align-items:center;padding:0 18px;gap:14px"><div style="flex:1"><div style="font-weight:700;font-size:15px">Invite a pharmacy</div><div class="mute" style="font-size:11.5px;line-height:1.4;margin-top:5px">Connect Al Noor Pharmacy and send prescriptions without paper.</div></div>
  <div style="width:70px;height:70px;border-radius:22px;background:linear-gradient(145deg,#7CF0C8,#01BE84 55%,#03442D);display:flex;align-items:center;justify-content:center;box-shadow:0 14px 26px rgba(1,190,132,.4);transform:rotate(8deg)">{MARKR % 38}</div></div>
<div style="position:absolute;top:418px;left:16px;right:16px;display:flex;gap:10px">{stat("Issued","3,789","last 30 days","2.8%")}{stat("Collected","3,587","last 30 days","2.6%",False)}</div>
<div class="card" style="position:absolute;top:546px;left:16px;right:16px;height:112px;border-radius:26px;padding:16px 18px;box-shadow:0 1px 2px rgba(3,68,45,.04),0 8px 20px rgba(3,68,45,.06)"><div style="display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:14px;font-weight:700">Dispensed</div><div style="font-size:24px;font-weight:700">94<span class="soft" style="font-size:14px;font-weight:500"> / 128</span></div></div>
  <div class="soft" style="font-size:11.5px;margin-top:6px;display:flex;justify-content:space-between"><span>Next sync</span><span>20 Mar 2026</span></div>
  <div style="position:relative;height:6px;border-radius:3px;background:#E3ECE8;margin-top:14px"><div style="width:73%;height:100%;border-radius:3px;background:linear-gradient(90deg,#80DEC1,#01BE84)"></div><div style="position:absolute;left:73%;top:-8px;width:3px;height:22px;border-radius:2px;background:#03442D"></div></div></div>
<div style="position:absolute;top:678px;left:20px;right:20px"><div style="display:flex;justify-content:space-between;font-size:14px;font-weight:700">Recent prescriptions<span class="soft" style="font-weight:500;font-size:12px">View all</span></div>
 <div style="display:flex;align-items:center;gap:10px;margin-top:12px"><div class="av" style="width:38px;height:38px;font-size:14px">LM</div><div style="flex:1;font-size:13px;font-weight:700">Layla M.<div class="soft" style="font-weight:500;font-size:11px">Metformin 850 mg</div></div><div style="font-size:12px;font-weight:700;color:#03442D">Ready</div></div></div>
{pill}<div class="hb" style="background:#fff"></div></div>'''
    ribbon = '''<svg width="1100" height="1400" viewBox="0 0 1100 1400" style="position:absolute;inset:0"><defs>
<linearGradient id="rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4FFFB"/><stop offset=".45" stop-color="#9FE6CE"/><stop offset=".75" stop-color="#2FC79B"/><stop offset="1" stop-color="#0B6F52"/></linearGradient>
<linearGradient id="hl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/></linearGradient>
<filter id="bl"><feGaussianBlur stdDeviation="5"/></filter><filter id="sh"><feGaussianBlur stdDeviation="22"/></filter></defs>
<path d="M-120 840 C 120 520, 560 470, 900 650 S 1180 1010, 760 1120 S 150 1160, -60 1330" fill="none" stroke="#03442D" stroke-opacity=".35" stroke-width="96" stroke-linecap="round" filter="url(#sh)" transform="translate(0 40)"/>
<path d="M-120 840 C 120 520, 560 470, 900 650 S 1180 1010, 760 1120 S 150 1160, -60 1330" fill="none" stroke="url(#rb)" stroke-width="92" stroke-linecap="round"/>
<path d="M-120 826 C 120 506, 560 456, 900 636 S 1180 996, 760 1106 S 150 1146, -60 1316" fill="none" stroke="url(#hl)" stroke-width="12" stroke-linecap="round" filter="url(#bl)" opacity=".9"/></svg>'''
    css = ('.board{width:1100px;height:1400px;background:linear-gradient(160deg,#C7EADF 0%,#8FD2BC 45%,#2E8F72 100%)}'
           '.big{position:absolute;left:0;right:0;top:70px;text-align:center;font-weight:700;font-size:430px;letter-spacing:-.04em;line-height:1;color:rgba(255,255,255,.34)}'
           '.t{position:absolute;color:#fff;font-size:22px;line-height:1.25}.ph{position:absolute;left:50%;top:210px;margin-left:-195px;transform:rotate(-5deg)}')
    body = (f'<div class="board">{ribbon}<div class="big">Rushta</div>'
            f'<div class="t" style="left:46px;top:44px;font-size:20px">UI/UX<br>2026</div><div style="position:absolute;right:46px;top:40px">{MARKR % 44}</div>'
            f'<div class="t" style="left:46px;bottom:46px">Prescription workflow<br>for clinics</div><div class="t" style="right:46px;bottom:46px;text-align:right">Doctors, patients,<br>pharmacy, clinic</div>'
            f'<div class="ph">{ph}</div></div>')
    return HEAD % ('Direction E', css, body)


for n, f in (('d', dir_d), ('e', dir_e)):
    open(f'direction-{n}.html', 'w', encoding='utf-8').write(f())
print('ok')
