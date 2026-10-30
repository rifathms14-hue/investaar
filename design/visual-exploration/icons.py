P = dict(
home="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z",
rx="M7 3h8l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z M14 3v5h5 M9 13h6 M9 17h4",
qr="M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h2v2h-2z M18 14h2v2h-2z M14 18h2v2h-2z M18 18h2v2h-2z",
cal="M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z M4 10h16 M8 3v4 M16 3v4",
gear="M12 15a3 3 0 100-6 3 3 0 000 6z M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.4-2.3 1a7 7 0 00-2-1.2L14 3h-4l-.6 2.7a7 7 0 00-2 1.2l-2.3-1-2 3.4 2 1.5A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.4 2.3-1c.6.5 1.3.9 2 1.2L10 21h4l.6-2.7c.7-.3 1.4-.7 2-1.2l2.3 1 2-3.4-2-1.5c.1-.4.1-.8.1-1.2z",
phone="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A15 15 0 014 5a1 1 0 011-1z",
chat="M5 5h14a1 1 0 011 1v9a1 1 0 01-1 1H10l-5 4v-4a1 1 0 01-1-1V6a1 1 0 011-1z",
search="M11 4a7 7 0 100 14 7 7 0 000-14z M20 20l-4-4",
filter="M4 7h16 M7 12h10 M10 17h4",
arrow="M7 17L17 7 M9 7h8v8",
bell="M6 17v-6a6 6 0 1112 0v6l1.5 2h-15z M10 21h4",
menu="M4 8h16 M4 16h16",
back="M15 5l-7 7 7 7",
next="M9 5l7 7-7 7",
pin="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z M12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
clock="M12 4a8 8 0 100 16 8 8 0 000-16z M12 8v4l3 2",
pill="M4.5 15.5l11-11a4 4 0 015.7 5.7l-11 11a4 4 0 01-5.7-5.7z M10 10l4 4",
check="M5 12.5l4.5 4.5L19 7.5",
hist="M4 12a8 8 0 108-8 M4 5v5h5 M12 8v4l3 2",
share="M12 4v11 M8 8l4-4 4 4 M5 13v6h14v-6",
user="M12 12a4 4 0 100-8 4 4 0 000 8z M4 20a8 8 0 0116 0",
box="M4 8l8-4 8 4v8l-8 4-8-4z M4 8l8 4 8-4 M12 12v8",
lang="M4 6h9 M8.5 4v2 M6 6c1 4 3.5 6.5 7 8 M12 6c-1 4-3.5 6.5-7 8 M13 20l4-9 4 9 M14.5 17h5",
case="M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1z M9 8V5h6v3",
)
def ic(n, s=22, c="currentColor", sw=None):
    st = f' style="stroke-width:{sw}"' if sw else ""
    return f'<svg class="ic" width="{s}" height="{s}" viewBox="0 0 24 24" style="color:{c}{";stroke-width:"+str(sw) if sw else ""}"><path d="{P[n]}"/></svg>'
def statusbar(color="#090E0E"):
    return (f'<div class="sb" style="color:{color}"><span>9:41</span><span class="r">'
            '<svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2" width="3" height="10" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>'
            '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 4.2a10 10 0 0114 0 M3.5 6.8a6.5 6.5 0 019 0 M6 9.3a3 3 0 014 0"/></svg>'
            '<svg width="26" height="12" viewBox="0 0 26 12" fill="none"><rect x=".6" y=".6" width="21" height="10.8" rx="3.2" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/><rect x="23" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".45"/></svg>'
            '</span></div>')
