# Rushta brand

Logo system, brand context and identity brief for Rushta (روشتة), the prescription workflow that connects doctors, patients, the pharmacy and the clinic.

Open `rushta-brand-guidelines.html` in a browser for the full guidelines. It is a single file with no dependencies.

## What is here

| Path | What |
| --- | --- |
| `rushta-brand-sheet.png`, `.pdf`, `.html` | One-page brand sheet: concept, lockups, colour, type, construction, applications, misuse |
| `rushta-brand-guidelines.html` | The guidelines: lockups, spacing unit, clear space, minimum sizes, colour, type, approved grounds, partner lockup, misuse, open decisions |
| `brand-context.md` | Brand context in the format the brand skills read. Start any new brand task here |
| `brand-identity.md` | Visual identity brief |
| `construction/` | Circle and golden-ratio drawings (SVG and PNG) and the mark geometry as JSON |
| `logo/horizontal/` | Four SVGs: color, reversed, black, white |
| `logo/stacked/` | Four SVGs |
| `logo/mark/` | Four SVGs |
| `logo/alt-hooked-t/` | Eight SVGs that use Satoshi's hooked `t` (`t.ss03`) |
| `logo/alt-lighter/` | Four SVGs with Satoshi Medium for the English line |
| `png/` | Transparent 2x PNGs, colour and reversed |
| `option-r/` | A second mark direction, the folded page that forms an R, with its own lockups, PNGs and golden-ratio construction. See `option-r/README.md` |

All text is outlined. Nothing in these files depends on an installed font. SVGs are cropped tight to the artwork, so add clear space around them: phi times `h`, which is 61.8 px at the master size.

## How the mark is built

One arm, turned four times. Every curve is a true circular arc, and every radius is a step on the golden ladder, measured in `h`, half the thickness of an arm. At a 200 px mark, `h` is 38.2 px.

| Part | In h | At 200 px |
| --- | --- | --- |
| Reach, centre to arm end | phi squared, 2.618 | 100.0 |
| Swoosh radius | 1 + 1/phi squared, 1.382 | 52.8 |
| Swoosh circle centre | (-1/phi squared, -1) | (-14.6, -38.2) |
| Big corner and fillet | 1/phi squared, 0.382 | 14.6 |
| Small corner and channel gap | 1/phi cubed, 0.236 | 9.0 |

The mark is exactly square and four-fold symmetric. Its width is phi squared times the thickness of an arm. The drawings are in `construction/`, and `construction/mark-geometry.json` holds the arcs.

The construction was fitted to the reference mark with 92 percent overlap. The rest is the reference's own asymmetry.

## How the lockup is built

The lockup runs on the same unit as the mark, `h`, the half-thickness of an arm (38.2 px at the master size). Every gap is a golden-ratio step of `h`.

| Part | Rule | At master size |
| --- | --- | --- |
| Mark to text | phi times h in the horizontal lockup. h in the stacked lockup | 61.8 px, 38.2 px |
| Text block width | 2 phi squared times h, the same as the mark. Arabic and English are justified to it | 200 px |
| English size | Set to the width of the Arabic word, tracked 4 percent | |
| Arabic descender to English cap top | h divided by phi | 23.6 px |
| Arabic dots | Same colour as the text | |
| Text block position | Centred on the mark's height. Its inset is close to h divided by phi | |
| Clear space | Phi times h on every side, the same as the mark to text gap | 61.8 px |

Minimum widths: horizontal 120 px (32 mm), stacked 90 px (24 mm), mark 24 px (6 mm).

## Colours

| Name | Hex |
| --- | --- |
| Forest | `#03442D` |
| Emerald | `#01BE84` |
| Ink | `#090E0E` |
| White | `#FFFFFF` |
| Mist (proposed) | `#F2F7F5` |

## Type

Latin is Satoshi Bold in the logo. Arabic is Madani Arabic Medium. The mark was traced from the reference render and cleaned so straight edges are exact horizontals and verticals. It sits within about 1 px of the reference at source scale.

## Licences

Satoshi is under the ITF Free Font License, which allows logos and wordmarks made with it, including trademark registration. Madani Arabic came without a licence file. Confirm its terms before the logo ships. The guidelines page embeds Satoshi as a web font for its own display only.

## Open decisions

See the last section of the guidelines page. The main ones are which `t` to use, Emerald never carrying text on white, and whether the name suits Saudi Arabia.
