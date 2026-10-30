"""index.html opens from disk. artifact.html is the same app as a fragment with fonts and marks inlined."""
import base64, pathlib
here = pathlib.Path(__file__).parent
assets = here.parent / 'assets'
css, js = (here / 'app.css').read_text(), (here / 'app.js').read_text()
body = '<div id="app"></div>'
b64 = lambda p, mime: f'data:{mime};base64,' + base64.b64encode(p.read_bytes()).decode()
local = ''.join(f'@font-face{{font-family:Satoshi;font-weight:{w};src:url(../assets/fonts/Satoshi-{n}.woff2) format("woff2")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
local += ''.join(f'@font-face{{font-family:Rubik;font-weight:{w};src:url(../assets/fonts/Rubik-{n}.ttf) format("truetype")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
js_local = js.replace('__MARK_C__', '../assets/rushta-mark-color.svg').replace('__MARK_R__', '../assets/rushta-mark-reversed.svg')
(here / 'index.html').write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Rushta Sign In</title><style>{local}{css}</style></head><body>{body}<script>{js_local}</script></body></html>', encoding='utf-8')
inl = ''.join(f'@font-face{{font-family:Satoshi;font-weight:{w};src:url({b64(assets / "fonts" / f"Satoshi-{n}.woff2", "font/woff2")}) format("woff2")}}' for n, w in (('Regular', 400), ('Medium', 500), ('Bold', 700)))
js_art = js.replace('__MARK_C__', b64(assets / 'rushta-mark-color.svg', 'image/svg+xml')).replace('__MARK_R__', b64(assets / 'rushta-mark-reversed.svg', 'image/svg+xml'))
art = ('<title>Rushta Sign In</title><meta name="claude:viewport-fit-sides" content="cover">'
       '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap">'
       f'<style>{inl}{css}</style>{body}<script>{js_art}</script>')
(here / 'artifact.html').write_text(art, encoding='utf-8')
print(len(art) // 1024, 'KB artifact')
