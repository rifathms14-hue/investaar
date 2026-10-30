# Visual exploration: Rushta mock UI

Five UI directions in the style of your references, in the Rushta colours. Open `direction-a.html` to `direction-e.html`. The PNGs are 2x renders of the same pages.

| Direction | Reference | What it shows |
| --- | --- | --- |
| A | Tilted phone on dark stone | Patient home: a ready prescription, status bar, pickup actions |
| B | Soft glass cards | Doctor writing a prescription, and the pharmacy queue |
| C | Pastel dunes | Patient home in English, and a prescription detail in Arabic (RTL) |
| D | Glass wallet, stacked cards, overview chart | Patient home with round actions, a stack of prescription cards, and an adherence overview |
| E | Poster with giant type and a glossy ribbon | Clinic dashboard: prescriptions today, issued and collected, dispensed progress, dark nav pill |

## Rules used

- Primary button: Forest `#03442D`, white text, pill.
- Secondary button: light grey with a slight green tint `#E8F0EC`, Forest text, no stroke.
- Emerald and its tint appear only as accents and fills. They never carry text.
- Status is a word plus a dot, never colour alone.
- The mark is the pinwheel from the main brand folder, as a placeholder until a logo is chosen.
- Avatars are initials, not stock photos.

## Notes

- Type is Satoshi for English and Rubik for Arabic. Rubik is open source (SIL OFL) and is included in `assets/fonts/`. Satoshi has no Arabic glyphs, so Arabic text falls through to Rubik on its own.
- Patient names, prescriptions and pharmacies are made up.
- `build_ui.py` generates A to C, `build_ui2.py` generates D and E, `render.cjs` makes the PNGs.
