# Rushta lockup

| File | What it is |
| --- | --- |
| `rushta-lockup.svg` / `.png` | Mark, Arabic (Madani Arabic Medium) and English (Satoshi Bold, default `t`). All text is outlined. |
| `rushta-lockup-hooked-t.svg` / `.png` | Same lockup using Satoshi's `t.ss03` alternate, so the English `t` has a hooked foot and cannot be misread as an `f`. |
| `rushta-mark.svg` | The pinwheel cross on its own. |

PNGs are transparent, 2x.

## Colours

| Use | Hex |
| --- | --- |
| Mark, dark green | `#03442D` |
| Mark, light green. Also the Arabic dots | `#01BE84` |
| Text | `#090E0E` |

## Structure

Layers are named so they can be recoloured or split without hunting: `mark`, `arabic-letters`, `arabic-dots`, `english`.

## Notes

- The mark was traced from the reference render. Straight edges are true lines snapped to exact horizontal and vertical, curves are cubic Béziers fitted to the source. It sits within about 1 px of the reference at source scale.
- The Arabic is set as plain `روشتة` (no tatweel). Both words are justified to the same ink width and share the same left and right edges.
- Spacing: 11 px between the lowest Arabic descender and the tallest English letter, and the text block is centred on the mark's height.
- The font files are not committed. Madani Arabic comes from the supplied family and Satoshi from Fontshare, so check licences before redistributing.
