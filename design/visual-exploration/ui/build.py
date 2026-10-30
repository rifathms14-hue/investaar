"""Builds index.html (local fonts, opens from disk) and artifact.html (fragment, Satoshi inlined, Rubik from Google Fonts)."""
import base64, pathlib
here = pathlib.Path(__file__).parent
css, js = (here / 'app.css').read_text(), (here / 'app.js').read_text()
fonts = here.parent / 'assets' / 'fonts'
body = '<div class="stage"><div class="app" id="app"></div></div><div id="layer"></div>'
local = ''.join(f'@font-face{{font-family:Satoshi;font-weight:{w};src:url(../assets/fonts/Satoshi-{n}.woff2) format("woff2")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
local += ''.join(f'@font-face{{font-family:Rubik;font-weight:{w};src:url(../assets/fonts/Rubik-{n}.ttf) format("truetype")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
(here / 'index.html').write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Rushta App</title><style>{local}{css}</style></head><body>{body}<script>{js}</script></body></html>', encoding='utf-8')
b64 = lambda n: base64.b64encode((fonts / f'Satoshi-{n}.woff2').read_bytes()).decode()
inl = ''.join(f'@font-face{{font-family:Satoshi;font-weight:{w};src:url(data:font/woff2;base64,{b64(n)}) format("woff2")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
art = ('<title>Rushta App</title><meta name="claude:viewport-fit-sides" content="cover">'
       '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap">'
       f'<style>{inl}{css}</style>{body}<script>{js}</script>')
(here / 'artifact.html').write_text(art, encoding='utf-8')
print(len(art) // 1024, 'KB artifact')
