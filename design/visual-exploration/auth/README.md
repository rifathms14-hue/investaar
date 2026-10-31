# Rushta access flow: working version

Every access screen from the wireframes (A01 to A16) with the real behaviour behind it, styled from the Rushta Login UI Figma page: split card with the prescription art panel, coral progress line, language switch, Base Web gray ramp, `#02110C` and `#D2DDCD` buttons. Satoshi and Rubik are bundled in `assets/fonts`.

## Run it

```
cd design/visual-exploration/auth
python3 -m http.server 8080      # any static server works, ES modules need http
open http://localhost:8080/?dev=1
```

`npm test` runs the rule tests. `npm run e2e` clicks through the whole flow in Chromium (needs Playwright).

Query switches: `?dev=0` hides the demo tools, `?lang=ar`, `?device=phone|large`, `?deviceId=...` (pretend to be another device), `?latency=0`.

## What it does

| Screen | Behaviour |
| --- | --- |
| A01 Sign in | Saudi mobile, nine digits starting with 5. Accepts `+966`, `00966`, `05` and Arabic digits when pasted. Button stays off until the number is valid. |
| A02 Verify | Six boxes with auto advance, paste and one-time-code autofill. Five minute countdown. Resend unlocks after 30 s. Change number goes back. |
| A03 Not recognised | Wrong code, with attempts left. Five wrong codes burn the challenge. |
| A04 Expired | Expired or burned code, Send a new code issues a fresh one and kills the old one. |
| A05 and A06 PIN | Six digits, entered twice. Repeats (111111) and runs (123456, 654321) are refused. |
| A07 Device limit | One phone and one tablet, laptop or desktop per person. A third device lists the two registered ones. |
| A08 Ready | Role summary after the first PIN. |
| A09 Unlock | Idle for 30 minutes locks the screen. PIN unlock never extends the eight hour session. |
| A10 PIN locked | Three wrong PINs lock it until support resets it. |
| A11 Sign in again | After eight hours. Registered mobile is shown masked and the device stays registered. |
| A12 Recovery | Static steps, reachable from Unlock and PIN locked. |
| A13 Access unavailable | Revoked account. Only shown after a correct code, so unknown and revoked numbers cannot be told apart from outside. |
| A14 to A16 | Arabic, with `dir="rtl"`. Codes, PINs, times and phone numbers stay left to right. |

Role landing: doctor and chief doctor go to Home, medical rep to Stock, Munjze operator to the clinic list. These three are placeholders. Patients never sign in; they open a link.

## Rules and where to change them

All limits are in `src/config.js`: code length and lifetime, resend wait, wrong code limit, sends per hour, PIN length, PIN attempts, idle lock, session length, device limits.

The wireframes call attempt and resend limits implementation configuration, so the numbers above (five wrong codes, five sends per hour, 30 s resend) are my defaults.

## Demo tools

The panel under the form (open with `?dev=1`) replaces the services that do not exist yet:

- WhatsApp (simulated): the code that would have been sent.
- Demo accounts: six numbers covering a first login, a returning chief doctor with PIN `482916`, a rep, an operator, a revoked doctor and a doctor with both devices taken.
- Time travel: expire the code, skip 30 s, idle 30 minutes, skip eight hours.
- Support actions: Munjze resets a PIN, a chief doctor removes devices, revoke or restore access.

## Structure

- `src/server.js` is the stand-in auth service. It keeps its state in `localStorage` and has no UI code. Replace it with real API calls and keep the method names and result shapes.
- `src/app.js` is the screen state machine and rendering.
- `src/i18n.js` holds the English and Arabic copy. Arabic for A05 to A13 is a first draft and needs clinic review.
- `src/phone.js`, `src/config.js`, `styles.css`, `index.html`.

## Not done yet

- A real backend. PINs and codes are hashed with plain SHA-256 here; production needs a slow salted hash (argon2 or bcrypt), server-side rate limits and a real WhatsApp provider.
- The signing PIN check on prescriptions (same three attempt lock) belongs with the doctor screens.
- Retry rules for rep and operator PINs are not in the wireframes. They reuse the doctor rule.
- Visual design, motion, the Munjze recovery flow itself.

## Deploy

Static site, no build. On Vercel set the root directory to `design/visual-exploration/auth`, framework preset Other, no build command. `vercel.json` in this folder only sets cache headers.
