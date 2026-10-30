# Rushta brand

Logo system, brand context and identity brief for Rushta (روشتة), the prescription workflow for clinics, pharmacies, patients and medical reps.

Open `rushta-brand-guidelines.html` in a browser for the full guidelines. It is a single file with no dependencies.

## What is here

| Path | What |
| --- | --- |
| `rushta-brand-guidelines.html` | The guidelines: lockups, spacing unit, clear space, minimum sizes, colour, type, approved grounds, partner lockup, misuse, open decisions |
| `brand-context.md` | Brand context in the format the brand skills read. Start any new brand task here |
| `brand-identity.md` | Visual identity brief |
| `logo/horizontal/` | Four SVGs: color, reversed, black, white |
| `logo/stacked/` | Four SVGs |
| `logo/mark/` | Four SVGs |
| `logo/alt-hooked-t/` | Eight SVGs that use Satoshi's hooked `t` (`t.ss03`) |
| `png/` | Transparent 2x PNGs, colour and reversed |

All text is outlined. Nothing in these files depends on an installed font. SVGs are cropped tight to the artwork, so add 2u of clear space around them.

## How the logo is built

One unit, `u`, is the mark height divided by eight (43.55 px in the master files).

| Part | Rule |
| --- | --- |
| Mark to text | 1u |
| Text block width | 10u. Arabic and English share the same left and right ink edges |
| Arabic descender to tallest English letter | 1/4 u |
| Text block | Centred on the mark's height |
| Clear space | 2u on every side |

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

See the last section of the guidelines page. The main ones are which `t` to use, the weak contrast of the Emerald dots on white, and whether the name suits Saudi Arabia.

## Logo v2 (current proposal)

`logo-v2/` replaces the stacked-text lockup in `logo/` with a cleaner single-line system. The old `logo/` folder stays until v2 is signed off, and the guidelines page still describes v1.

| Lockup | Use | Minimum width |
| --- | --- | --- |
| `inline/` | Master. Mark, Rushta, hairline divider, روشتة on one baseline | 150 px (40 mm) |
| `en/` | English interfaces. Mark and Rushta | 80 px (21 mm) |
| `ar/` | Arabic interfaces. روشتة with the mark on the right, the natural reading side | 90 px (24 mm) |

Each comes in color, reversed, black and white, as SVG, with 2x transparent PNGs for color and reversed.

How it is built: Satoshi Bold and Madani Arabic Medium are set at the same font scale. Their stroke weights match within 4 percent (121 and 116 units) and the Arabic letter body equals the English x-height, so both scripts share one baseline with no fudging. The mark is 1.9 times the English cap height. The mark to text gap is 3u and the divider gaps are 2u, where u is the mark height divided by eight. The divider is Ink at 28 percent opacity.
