import sys
sys.path.insert(0, '.')
from icons import ic, statusbar

NOISE = """<div style="position:absolute;inset:0;mix-blend-mode:screen;opacity:.32;background-size:100% 100%;background:url(&quot;data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='500' height='500'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.035 .06' numOctaves='6' seed='4'/><feColorMatrix values='0 0 0 0 .75 0 0 0 0 .8 0 0 0 0 .78 0 0 0 2.4 -1.25'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>&quot;)"></div>"""
HEAD = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>%s</title><link rel="stylesheet" href="ui.css"><style>%s</style></head><body>%s</body></html>'
MARK = '<img src="assets/rushta-mark-color.svg" style="height:%dpx;display:block">'
MARKR = '<img src="assets/rushta-mark-reversed.svg" style="height:%dpx;display:block">'


# ---------- Direction A: calm daily, tilted device on dark stone ----------
def dir_a():
    seg = lambda w, c: f'<div style="width:{w}px;height:34px;border-radius:7px;background:{c}"></div>'
    nav = (f'<div style="position:absolute;left:24px;right:24px;bottom:34px;height:64px;border-radius:999px;background:rgba(232,240,236,.92);backdrop-filter:blur(14px);box-shadow:0 10px 30px rgba(3,68,45,.14);display:flex;align-items:center;justify-content:space-between;padding:0 8px">'
           f'<div class="cb" style="width:50px;height:50px;color:var(--emerald)">{ic("home",22)}</div>'
           f'<div style="color:#8da09a">{ic("rx",22)}</div>'
           f'<div style="width:52px;height:52px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7CF0C8 0%,#01BE84 45%,#03442D 100%);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(1,190,132,.18),0 8px 20px rgba(1,190,132,.4)">{MARKR % 24}</div>'
           f'<div style="color:#8da09a">{ic("cal",22)}</div>'
           f'<div style="color:#8da09a;margin-right:12px">{ic("gear",22)}</div></div>')
    screen = f'''<div class="phone frame" style="background:#fff">
<div class="island"></div>{statusbar()}
<div style="position:absolute;inset:0;background:radial-gradient(70% 38% at 85% 8%,rgba(128,222,193,.55),rgba(255,255,255,0) 70%),#fff"></div>
<div style="position:absolute;top:72px;left:24px;right:24px;display:flex;align-items:center;gap:12px">
  <div class="av k" style="width:46px;height:46px">F</div>
  <div style="flex:1"><div class="mute" style="font-size:14px">Good morning</div><div style="font-weight:700;font-size:17px">Faisal Al-Harbi</div></div>
  <div class="cb m s">{ic("bell",20)}</div><div class="cb m s">{ic("menu",20)}</div></div>
<div style="position:absolute;top:136px;left:24px;right:24px">
  <div class="soft" style="font-size:13px;letter-spacing:.02em">Prescription update</div>
  <div style="font-size:37px;line-height:1.08;font-weight:500;margin-top:6px;letter-spacing:-.01em"><span class="soft">Your medicine is</span> <span>ready</span> <span class="soft">at</span> <span>Al Noor Pharmacy</span></div></div>
<div class="card" style="position:absolute;top:318px;left:16px;right:16px;padding:20px 22px 18px">
  <div style="display:flex;justify-content:space-between;align-items:flex-start">
    <div><div style="font-size:21px;font-weight:500">Amoxicillin 500 mg</div><div class="mute" style="font-size:13px;margin-top:4px">Rx RS-20418 · Dr. Omar Al-Khalid</div></div>
    <div class="cb s m">{ic("arrow",18)}</div></div>
  <div style="display:flex;gap:30px;margin-top:20px;font-size:12px"><div><div class="soft">Issued</div><div style="font-weight:700;font-size:14px;margin-top:3px">Tue 14 May</div></div>
    <div><div class="soft">Status</div><div style="font-weight:700;font-size:14px;margin-top:3px">Ready</div></div>
    <div><div class="soft">Quantity</div><div style="font-weight:700;font-size:14px;margin-top:3px">21 capsules</div></div></div>
  <div style="display:flex;gap:4px;margin-top:20px">{seg(44,"linear-gradient(90deg,#B5F0DB,#80DEC1)")}{seg(86,"linear-gradient(90deg,#4FD3A6,#01BE84)")}
    <div style="flex:1;height:34px;border-radius:7px;background:repeating-linear-gradient(135deg,#DDE6E2 0 2px,#fff 2px 7px)"></div></div>
  <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:8px" class="soft"><span>Issued</span><span>Collect by Sat 18 May</span></div></div>
<div class="card" style="position:absolute;top:556px;left:16px;right:16px;padding:18px 22px 20px">
  <div style="display:flex;justify-content:space-between"><div><div style="font-size:19px;font-weight:500">Pick up today</div><div class="mute" style="font-size:13px;margin-top:3px">Al Noor Pharmacy · 1.2 km · open until 11 pm</div></div></div>
  <div style="display:flex;gap:10px;margin-top:14px"><div class="btn p" style="flex:1.6;height:50px;font-size:15px">Show pickup code</div><div class="btn s" style="flex:1;height:50px;font-size:15px">Share link</div></div></div>
{nav}<div class="hb"></div></div>'''
    rock = ('<div style="position:absolute;left:-120px;top:-80px;width:620px;height:760px;background:radial-gradient(60% 50% at 30% 30%,#2a312f 0%,#0b0e0d 70%);clip-path:polygon(0 0,100% 0,86% 18%,92% 30%,70% 44%,52% 62%,38% 100%,0 100%)">'+NOISE+'</div>'
            '<div style="position:absolute;right:-140px;bottom:-60px;width:700px;height:640px;background:radial-gradient(60% 50% at 60% 60%,#262d2a 0%,#070908 72%);clip-path:polygon(100% 0,100% 100%,0 100%,6% 70%,24% 56%,40% 40%,62% 18%)">'+NOISE+'</div>'
            '<div style="position:absolute;inset:0;background:radial-gradient(circle at 20% 14%,rgba(255,255,255,.12) 0,transparent 8%),radial-gradient(circle at 12% 28%,rgba(255,255,255,.1) 0,transparent 6%)"></div>')
    css = '.board{width:1100px;height:1500px;background:linear-gradient(180deg,#E3ECE9,#D3DFDB)}.t{position:absolute;left:50%;top:52%;transform:translate(-50%,-50%) rotate(-14deg) skewY(2deg)}'
    return HEAD % ('Direction A', css, f'<div class="board">{rock}<div class="t">{screen}</div></div>')


# ---------- Direction B: clinic desk, soft glass cards, two screens ----------
def dir_b():
    ticks = ''.join(f'<div style="width:2px;height:{34 if i in (5,10,15) else 22}px;border-radius:2px;background:{"#8FC9BC" if 7<=i<=13 else "#A9B6B2"}"></div>' for i in range(21))
    days = ''.join(f'<div style="width:62px;height:62px;border-radius:18px;background:{"#BFE9DC" if d==7 else "#F2F6F4"};display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:{700 if d==7 else 500};color:{"#03442D" if d==7 else "#6F7E79"}"><div style="font-size:19px">{d}</div><div style="font-size:11px;opacity:.7">days</div></div>' for d in (3, 5, 7, 10, 14))
    left = f'''<div class="phone" style="border-radius:46px;box-shadow:0 30px 70px rgba(3,68,45,.18)">{statusbar()}
<div style="position:absolute;inset:0 0 auto 0;height:300px;background:linear-gradient(170deg,#CFE7E2 0%,#E3F1EE 60%,#fff 100%)"></div>
<div style="position:absolute;top:62px;left:20px;right:20px;display:flex;justify-content:space-between"><div class="cb m" style="background:rgba(255,255,255,.6);box-shadow:none">{ic("back",20)}</div><div class="cb m" style="background:rgba(255,255,255,.6);box-shadow:none">{ic("menu",20)}</div></div>
<div style="position:absolute;top:130px;left:24px"><span class="badge" style="background:rgba(255,255,255,.7)"><i></i>Chronic care</span>
  <div style="font-size:34px;line-height:1.05;font-weight:500;margin-top:14px;color:#03442D">Noura<br>Al-Qahtani</div><div style="font-size:12px;margin-top:8px;color:#4c6a62;line-height:1.4">MRN 204118 · Age 34<br>Allergy: penicillin</div></div>
<div style="position:absolute;top:104px;right:-8px;width:150px;height:176px;border-radius:40px 0 0 40px;background:linear-gradient(160deg,#0c5a3e,#03442D);display:flex;align-items:center;justify-content:center;overflow:hidden"><div style="position:absolute;right:-26px;bottom:-26px;opacity:.14">{MARKR % 110}</div><div style="position:absolute;font-weight:700;font-size:46px;color:#fff;letter-spacing:.02em">NA</div></div>
<div style="position:absolute;top:322px;left:20px;right:20px;display:flex;gap:10px"><div class="btn s" style="flex:1;height:54px;font-size:15px">{ic("hist",18)} History</div><div class="cb" style="width:54px;height:54px">{ic("phone",20)}</div><div class="cb" style="width:54px;height:54px">{ic("chat",20)}</div></div>
<div class="card" style="position:absolute;top:404px;left:16px;right:16px;height:78px;border-radius:24px;display:flex;align-items:center;justify-content:space-around;font-size:12px"><div style="text-align:center"><div style="font-size:17px;font-weight:700">12</div><div class="soft">Active Rx</div></div><div style="width:1px;height:30px;background:#E4ECE9"></div><div style="text-align:center"><div style="font-size:17px;font-weight:700">3</div><div class="soft">Refills due</div></div><div style="width:1px;height:30px;background:#E4ECE9"></div><div style="text-align:center"><div style="font-size:17px;font-weight:700">98%</div><div class="soft">Collected</div></div></div>
<div style="position:absolute;top:512px;left:22px;right:22px"><div class="soft" style="font-size:13px">Course length</div><div style="display:flex;gap:8px;margin-top:10px;justify-content:space-between">{days}</div>
  <div class="soft" style="font-size:13px;margin-top:20px">Morning dose</div><div style="display:flex;align-items:flex-end;justify-content:space-between;height:44px;margin-top:10px">{ticks}</div>
  <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:6px;color:#6F7E79"><span>7:30</span><span>8:00</span><span>8:30</span><span>9:00</span></div></div>
<div style="position:absolute;left:20px;right:20px;bottom:34px;display:flex;gap:10px"><div class="btn s" style="width:120px">Save draft</div><div class="btn p" style="flex:1">Send to pharmacy</div></div><div class="hb"></div></div>'''
    card = lambda n, sub, dark=False: (f'<div style="height:150px;border-radius:26px;padding:18px 18px 16px;position:relative;{"background:#03442D;color:#fff" if dark else "background:#F6F9F8;color:#090E0E"}"><div style="font-size:15px;font-weight:500">{n}</div>'
                                       f'<div style="position:absolute;left:18px;bottom:16px"><div style="font-size:30px;font-weight:700;letter-spacing:-.01em">{sub[0]}</div><div style="font-size:11px;opacity:.55">{sub[1]}</div></div>'
                                       f'<div class="cb" style="position:absolute;right:14px;bottom:14px;width:42px;height:42px;background:{"#BFE9DC" if dark else "#E8F0EC"};box-shadow:none;color:#03442D">{ic("arrow",18)}</div></div>')
    pc = lambda n, who, g: (f'<div style="width:176px;height:190px;border-radius:28px;background:{g};position:relative;flex:none;overflow:hidden;padding:14px"><div style="position:absolute;right:-22px;top:-18px;opacity:.12">{MARKR % 96}</div>'
                           f'<div style="position:absolute;left:14px;right:14px;bottom:14px;background:rgba(255,255,255,.72);backdrop-filter:blur(10px);border-radius:18px;padding:10px 12px"><div style="font-size:13px;font-weight:700">{n}</div><div style="font-size:11px;color:#4c6a62">{who}</div></div></div>')
    right = f'''<div class="phone" style="border-radius:46px;background:#F6F9F8;box-shadow:0 30px 70px rgba(3,68,45,.18)">{statusbar()}
<div style="position:absolute;top:62px;left:20px;right:20px;display:flex;align-items:center;gap:10px"><div style="flex:1;display:flex;align-items:center;gap:10px">{MARK % 30}<div style="font-weight:700;font-size:22px;letter-spacing:-.01em;color:#03442D">Rushta</div></div><div class="cb m">{ic("search",19)}</div><div class="cb m">{ic("bell",19)}</div><div class="av k" style="width:40px;height:40px;font-size:14px">AN</div></div>
<div style="position:absolute;top:128px;left:18px;right:0;display:flex;gap:12px;overflow:hidden">{pc("Ahmed S.","Amoxicillin · ready","linear-gradient(150deg,#CFE7E2,#9ED4C6)")}{pc("Layla M.","Metformin · preparing","linear-gradient(150deg,#EAF0ED,#C6D6D0)")}</div>
<div class="card" style="position:absolute;top:336px;left:0;right:0;bottom:0;border-radius:36px 36px 0 0;padding:22px 20px"><div style="width:44px;height:4px;border-radius:2px;background:#DCE6E2;margin:-8px auto 14px"></div>
  <div style="display:flex;align-items:center;justify-content:space-between"><div style="font-size:23px;line-height:1.1"><span style="font-weight:400" class="mute">Today's</span><br><b style="font-weight:700">queue</b></div><div style="display:flex;gap:10px"><div class="cb m s">{ic("search",19)}</div><div class="cb m s">{ic("filter",19)}</div></div></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px">{card("New",("14","per hour 4"))}{card("Preparing",("6","avg 7 min"))}{card("Collected",("31","today"))}{card("Ready",("9","waiting pickup"),True)}</div>
  <div class="btn p" style="margin-top:18px">Scan pickup code</div></div><div class="hb"></div></div>'''
    css = '.board{width:1500px;height:1160px;background:radial-gradient(60% 70% at 15% 10%,#EAF4F2,transparent),radial-gradient(70% 70% at 90% 100%,#CFE4E0,transparent),#DDE9E6}.row{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:90px}'
    return HEAD % ('Direction B', css, f'<div class="board"><div class="row">{left}{right}</div></div>')


# ---------- Direction C: bilingual, pastel dunes, English and Arabic RTL ----------
def dir_c():
    rxcard = lambda name, sub, price, ready=True, tint="#F2F7F5": (f'<div class="card" style="width:178px;flex:none;border-radius:24px;padding:14px;box-shadow:0 2px 6px rgba(3,68,45,.05)"><div style="display:flex;justify-content:space-between;align-items:center"><div class="av g" style="width:46px;height:46px">{ic("pill",20)}</div>'
                                                                       f'<span class="badge" style="height:22px;font-size:11px;padding:0 8px"><i></i>{"Ready" if ready else "Preparing"}</span></div><div style="font-size:15px;font-weight:700;margin-top:12px">{name}</div><div class="mute" style="font-size:12px;margin-top:2px">{sub}</div>'
                                                                       f'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><div style="color:#03442D;font-weight:700;font-size:20px">{price}</div><div class="mute" style="font-size:12px;display:flex;gap:3px;align-items:center;color:#8da09a">{ic("clock",13)} 14 May</div></div></div>')
    ph = lambda n, t, d, c: (f'<div class="card" style="height:70px;border-radius:22px;display:flex;align-items:center;gap:14px;padding:0 16px;box-shadow:0 2px 6px rgba(3,68,45,.05)"><div class="av {c}" style="width:46px;height:46px">{n}</div><div style="flex:1"><div style="font-weight:700;font-size:15px">{t}</div><div class="mute" style="font-size:12px;margin-top:2px">{d}</div></div><div class="mute" style="font-size:13px">1.2 km</div>{ic("next",18,"#090E0E")}</div>')
    left = f'''<div class="phone" style="border-radius:46px;background:#F4F8F7;box-shadow:0 30px 70px rgba(3,68,45,.18)">{statusbar()}
<div style="position:absolute;inset:0 0 auto 0;height:330px;background:linear-gradient(180deg,#E6F2EE 0%,#F4F8F7 100%)"></div>
<div style="position:absolute;top:66px;left:22px;right:22px;display:flex;align-items:center;justify-content:space-between"><div class="av k" style="width:48px;height:48px">N</div><div style="display:flex;gap:10px"><div class="cb">{ic("bell",21)}</div><div class="cb">{ic("cal",21)}</div></div></div>
<div style="position:absolute;top:148px;left:24px"><div style="font-size:33px;line-height:1.1;font-weight:400">Good Morning</div><div style="font-size:33px;line-height:1.15;font-weight:700">Noura</div></div>
<div style="position:absolute;top:262px;left:22px;right:0;display:flex;gap:10px;overflow:hidden"><div class="chip on">Active</div><div class="chip">Past</div><div class="chip">Shared with me</div></div>
<div style="position:absolute;top:330px;left:22px;right:0;display:flex;gap:12px;overflow:hidden">{rxcard("Amoxicillin 500 mg","Dr. Omar Al-Khalid","SAR 38")}{rxcard("Metformin 850 mg","Dr. Sara Hamdan","SAR 22",False)}</div>
<div style="position:absolute;top:538px;left:22px;right:22px;display:flex;justify-content:space-between;align-items:baseline"><div style="font-size:19px;font-weight:700">Pharmacies near you</div><div class="mute" style="font-size:14px">See all</div></div>
<div style="position:absolute;top:578px;left:16px;right:16px;display:flex;flex-direction:column;gap:10px">{ph("A","Al Noor Pharmacy","Open until 11 pm","")}{ph("S","Shifa Care","Open 24 hours","g")}{ph("R","Rawabi Pharmacy","Opens 8 am","g")}</div><div class="hb"></div></div>'''
    tile = lambda ic_, v, l: (f'<div style="flex:1;height:96px;border-radius:22px;background:#EDF3F1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;color:#03442D">{ic(ic_,22)}<div style="font-weight:700;font-size:15px;color:#090E0E">{v}</div><div style="font-size:11px;color:#6F7E79">{l}</div></div>')
    slot = lambda t, st="": (f'<div style="height:40px;padding:0 15px;border-radius:999px;display:flex;align-items:center;font-size:14px;font-weight:{700 if st=="on" else 500};'
                             f'{"background:#03442D;color:#fff" if st=="on" else ("background:#F0F4F2;color:#B7C3BF" if st=="off" else "background:#E8F0EC;color:#03442D")}">{t}</div>')
    right = f'''<div class="phone" dir="rtl" style="border-radius:46px;background:#fff;box-shadow:0 30px 70px rgba(3,68,45,.18)"><div dir="ltr">{statusbar()}</div>
<div style="position:absolute;inset:0 0 auto 0;height:350px;background:linear-gradient(180deg,#E3F1EC 0%,#fff 100%)"></div>
<div style="position:absolute;top:66px;left:22px;right:22px;display:flex;justify-content:space-between"><div class="cb">{ic("next",20)}</div><div class="cb">{ic("phone",20)}</div></div>

<div style="position:absolute;top:150px;right:24px;left:24px"><span class="badge"><i></i>جاهزة للاستلام</span>
  <div style="font-size:34px;line-height:1.25;font-weight:700;margin-top:14px">أموكسيسيلين<br><span style="font-weight:500">500 ملغ</span></div>
  <div style="margin-top:12px;display:flex;align-items:center;gap:8px;font-size:15px;color:#4c6a62">{ic("pin",18)}<span>صيدلية النور، الرياض</span></div></div>
<div style="position:absolute;top:372px;left:20px;right:20px"><div style="font-size:18px;font-weight:700;margin-bottom:12px">تفاصيل الوصفة</div><div style="display:flex;gap:10px">{tile("box","21 كبسولة","الكمية")}{tile("case","د. عمر الخالد","الطبيب")}{tile("clock","18 مايو","صالحة حتى")}</div></div>
<div style="position:absolute;top:530px;left:20px;right:20px"><div style="font-size:18px;font-weight:700;margin-bottom:12px">موعد الاستلام</div>
  <div style="border-radius:24px;background:#F6F9F8;padding:16px"><div style="display:flex;justify-content:space-between;align-items:center;font-size:15px;font-weight:500"><span>الأربعاء، 14 مايو</span>{ic("cal",20)}</div>
  <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">{slot("08:00")}{slot("09:40")}{slot("10:00","on")}{slot("11:50")}{slot("12:30","off")}{slot("17:40","off")}</div></div></div>
<div style="position:absolute;left:20px;right:20px;bottom:34px;display:flex;gap:10px"><div class="btn p" style="flex:1">احجز موعد الاستلام</div><div class="cb s" style="width:52px;height:52px">{ic("chat",21)}</div></div><div class="hb"></div></div>'''
    dunes = ''.join(f'<div style="position:absolute;left:-10%;right:-10%;top:{66+i*3.4}%;height:{22-i}%;border-radius:50%;border-top:3px solid rgba(255,255,255,{.5-i*.02});background:linear-gradient(180deg,rgba({150-i*5},{190-i*4},{176-i*4},.55),rgba(120,168,154,.4))"></div>' for i in range(10))
    css = '.board{width:1200px;height:1100px;background:linear-gradient(180deg,#D6E5EE 0%,#E4EEEB 46%,#BFD5CC 62%,#8FB4A5 100%)}.row{position:absolute;left:0;right:0;top:90px;display:flex;gap:56px;justify-content:center}'
    return HEAD % ('Direction C', css, f'<div class="board">{dunes}<div class="row">{left}{right}</div></div>')


if __name__ == "__main__":
  for n, f in (('a', dir_a), ('b', dir_b), ('c', dir_c)):
    open(f'direction-{n}.html', 'w', encoding='utf-8').write(f())
print('ok')
