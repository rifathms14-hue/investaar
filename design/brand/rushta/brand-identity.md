# Rushta visual identity brief

Built from `brand-context.md` and the logo system in `logo/`. Hex values and measurements are real. Items marked "proposed" are my calls and need your sign-off.

## 01 Identity strategy statement

Rushta handles medical records, so the identity has to look careful before it looks friendly. The mark is a medical cross that has been turned into a pinwheel. That turn is the product: a prescription goes out from the doctor and comes back as a record. Everything else stays quiet. Flat colour, no gradients, one typeface family per script, and generous space. The design should feel like a well-kept clinic, not a health-tech startup.

## 02 Logo direction

**Primary direction.** Symbol plus a bilingual wordmark. Arabic sits above English, both set to the same width, with the mark on the left. A stacked version exists for square spaces. The mark works alone from 24 px up.

**Character.** Calm, exact, local. The sharp tips of the pinwheel are the only hard edge. Every other corner is rounded.

**Style notes.** Constructed, not drawn. All spacing comes from one unit, `u`, which is the mark height divided by eight. The text block is exactly 10u wide. The gap between mark and text is 1u. Clear space is 2u. Straight edges in the mark are true horizontal and vertical lines.

**What to avoid.** The caduceus, the Rx glyph, pills, hearts, heartbeat lines and stethoscopes. A green cross on its own, because every pharmacy in the region already owns that signal. The twist is what makes this mark yours, so never flatten it back into a plain plus.

**Three logo references.**
- **Uber (2018 system).** Borrow the discipline: clear space equals one letter's cap height, and lockups align on cap height and baseline. Nothing is left to taste.
- **GoDaddy.** Borrow the idea that the symbol carries the meaning and the clear space is measured from the logo's own geometry. Also the three-colour limit and the per-variant minimum sizes.
- **Twitch.** Borrow the single-unit system. Every gap is written as a multiple of `x`, including the partner lockup (`2x`, divider, `2x`).

## 03 Colour palette

**Primary colour.** Forest, `#03442D`. It carries trust and weight. White on Forest is 11.2 to 1.

**Secondary colours.**
- Emerald, `#01BE84`. The light arms of the mark and the Arabic dots. Use it as a fill, never as text on light grounds.
- Ink, `#090E0E`. All logo text and body copy. 19.4 to 1 on white.
- White, `#FFFFFF`, and Mist, `#F2F7F5` (proposed). Mist is the quiet ground for app screens and documents.

**Color personality.** Clinical and calm, with one warm-leaning green that signals care. No red, no blue, no gradients in the identity.

**Usage rules.**
- Emerald on white is only 2.41 to 1. It fails for text and for small interface parts. Put Ink on Emerald, never white (white on Emerald is also 2.41 to 1).
- Emerald on Forest is 4.66 to 1, so the dots hold up on a dark green ground.
- Proportions on a typical page: White and Mist about 70 percent, Ink about 15, Forest about 10, Emerald 5 or less.

**A conflict to resolve.** Emerald is also what most interfaces use for "success". In Rushta the status "Collected" is a success state. If brand green and success green are the same colour, a screen full of brand chrome looks like a screen full of good news. Give status colours their own tokens, and always pair them with a word or icon. That work belongs in the product design system, not here, but the identity must leave room for it.

**Palette type.** Analogous with neutrals. One hue family, two values, three neutrals.

## 04 Typography

**Primary typeface.** Satoshi for Latin. Bold for display and headings, Regular for body. It is free from Fontshare. Check the licence for your use.

**Secondary typeface.** Madani Arabic for Arabic. Medium for display and headings, Regular for body. It was supplied with the logo work. Confirm its licence before it ships in a product.

**Why this pairing.** The stems match. Satoshi Bold stems measure 121 units and Madani Medium strokes measure 116, so the two scripts carry the same weight when they sit side by side. This is the same pairing the logo uses, so product type and logo share one voice.

**Type personality.** Geometric, open and modern. Friendly enough for a patient, steady enough for a pharmacist.

**Usage hierarchy.**

| Level | Satoshi | Madani Arabic | Size, line height |
| --- | --- | --- | --- |
| Display | Bold | Medium | 40 and 48 |
| Heading | Bold | Medium | 24 and 32 |
| Subhead | Regular | Regular | 18 and 26 |
| Body | Regular | Regular | 16 and 24 |
| Label and caption | Medium | Medium | 12 and 16 |

Arabic needs more room than Latin. Add about 10 percent to Arabic line height, and set Arabic one step larger when it sits next to English at the same level.

**Numbers.** Turn on tabular figures (`tnum`) for Rx numbers, quantities and dates. Satoshi supports them.

**Avoid.** Condensed faces, script faces, and any Arabic face that imitates calligraphy. Never mirror an English layout to make an Arabic one. Co-design both.

## 05 Imagery and photography style

**Overall aesthetic.** Clean and documentary. Real clinics, real counters, real hands.

**Subject matter.** The prescription pad, a phone showing a QR code, a pharmacist scanning, a doctor signing. Product screens on real devices. Show Arabic and English screens equally often.

**Color treatment.** Natural. No filters, no green wash.

**What to avoid.** Stock smiling doctors, stethoscopes on white, floating pills and 3D medical icons. Any image that suggests AI reads the prescription. It does not, and the product says so.

## 06 Iconography and illustration

**Style.** Line icons with rounded ends and rounded corners, in the same family as the mark's soft corners.

**Weight.** Regular, about 1.75 px at 24 px size.

**Personality.** Functional. Icons label things. They do not decorate. Use no illustration in the first release.

## 07 Design principles

**One record, always in view.** The product is a loop from signature to last item collected. Screens should show where a prescription is in that loop at a glance.

**Boundaries are visible.** Each role sees only its own world. Empty states should say what is hidden and why, in plain words, instead of showing a blank.

**Two languages, one layout.** Arabic and English share edges, widths and rhythm, as they do in the logo. Right to left is built in, not added later.

**Plain over clever.** Short sentences, real labels, no decoration. If a thing is not allowed, say so.

## 08 Brand expressions

- **App and web.** Mist ground, Ink text, Forest for primary actions, Emerald for small brand moments only. The home-screen icon is the mark on White or Forest, never the lockup.
- **Printed prescription (the clinic pad).** The clinic leads. Its logo sits at the top. Rushta appears once, small, in the footer, using the horizontal lockup in Ink or Forest at no less than 120 px (32 mm) wide.
- **Patient link page.** Arabic first, mark small at the top, large QR as the hero. No marketing.
- **Social profiles.** The mark alone on Forest, with the light arms in Emerald and the dark arms in white (the reversed version).
- **Presentations and proposals.** Horizontal lockup top left on White, Forest rule, Satoshi headings. Close to the Munjze proposal format, with Rushta colours.

## Open decisions for you

1. **Which `t`?** Satoshi's default `t` is a plain cross and can read as an `f` at small sizes ("Rushfa"). The alternate `t.ss03` has a hooked foot. Both are in the files. Pick one and retire the other before launch. I would pick the hooked one.
2. **The dots on white.** At 2.41 to 1, the Emerald dots are the weakest part of the logo on a light ground, and in Arabic the dots decide which letter you are reading. Use the Black version when the logo is small or printed on cheap stock. The guidelines set the limit at 120 px.
3. **Does the name work in Saudi Arabia?** See the open questions in `brand-context.md`.
