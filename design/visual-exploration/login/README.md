# Rushta sign in and verify

Screens A01 to A04 from the wireframes page, built as a clickable UI. Open `index.html`. Add `#board` to the address to see every screen at once.

| Screen | What it is |
| --- | --- |
| A01 | Sign in. Saudi mobile number, nine digits starting with 5. WhatsApp code. |
| A02 | Verify your mobile number. Six code boxes, a five minute countdown, resend and change number. |
| A03 | Verification code not recognised. Red aurora alert, Try again. |
| A04 | Verification code expired. Amber aurora alert, Send a new code. |

Mobile web is one column. Desktop is the brand panel on one side and the form on the other. Arabic mirrors the whole layout. Arabic for A03 and A04 is new and needs review.

## Style rules used

- Cards and alerts have a radius of 12 to 16 px at most. Buttons are pills.
- Inactive items have no fill. Selected items, the active code box and the chosen language are mint.
- Main button is dark green. Secondary is light grey with a green tint and no stroke.
- Alerts have a status icon and a soft aurora glow along the edges in the status colours. A successful resend uses the green one as a toast.

## Prototype behaviour

Any nine digits starting with 5 sends a code. The code `482916` verifies. Any other six digits goes to A03. The code expires after 4:59 and goes to A04. Resend is locked for 30 seconds. The 30 second lock, the loading states and the phone number message are my additions, not in the wireframes.

`build.py` writes `index.html` and `artifact.html`. The mark is the pinwheel placeholder.
