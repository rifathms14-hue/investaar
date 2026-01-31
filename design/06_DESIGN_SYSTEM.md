# Investaar — Design System

---

## Colour Palette

| Name | Hex | RGB | Use |
|------|-----|-----|-----|
| Base | `#0D0D0D` | 13, 13, 13 | Background |
| Surface | `#1A1A1A` | 26, 26, 26 | Cards, panels |
| Surface Elevated | `#242424` | 36, 36, 36 | Modals, dropdowns |
| Border | `#2A2A2A` | 42, 42, 42 | Dividers, outlines |
| Border Subtle | `#1F1F1F` | 31, 31, 31 | Soft dividers |
| Text Primary | `#FFFFFF` | 255, 255, 255 | Headlines, key info |
| Text Secondary | `#A3A3A3` | 163, 163, 163 | Body, microcopy |
| Text Tertiary | `#737373` | 115, 115, 115 | Hints, disabled |
| Accent Gold | `#D4AF37` | 212, 175, 55 | Allocation, progress, CTAs |
| Accent Gold Light | `#E5C65C` | 229, 198, 92 | Hover, active |
| Accent Violet | `#7C3AED` | 124, 58, 237 | Ownership, status |
| Accent Violet Light | `#8B5CF6` | 139, 92, 246 | Hover, active |
| Success | `#22C55E` | 34, 197, 94 | Verified, complete |
| Error | `#EF4444` | 239, 68, 68 | Error states |
| Warning | `#F59E0B` | 245, 158, 11 | Caution |

---

## Typography

| Role | Weight | Size | Line Height | Use |
|------|--------|------|-------------|-----|
| Display | Bold | 28–32px | 1.2 | Screen titles |
| Headline | Semibold | 20–24px | 1.3 | Section headers |
| Title | Medium | 16–18px | 1.4 | Card titles, plot IDs |
| Body | Regular | 14–16px | 1.5 | Body text |
| Caption | Regular | 12px | 1.4 | Microcopy, labels |
| Overline | Medium | 10–11px | 1.3 | Uppercase labels |

**Font:** Gotham, Gilroy, or geometric sans (e.g. Satoshi, General Sans)

---

## Spacing Scale (8px base)

| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Icon padding |
| sm | 8px | Tight gaps |
| md | 16px | Default padding |
| lg | 24px | Section gaps |
| xl | 32px | Screen padding |
| xxl | 48px | Large sections |

---

## Border Radius — Sharp & Premium

| Token | Value | Use |
|-------|-------|-----|
| sharp | 0 | Cards, chips, buttons, inputs (default) |
| xs | 1px | Optional micro-softening |

---

## Shadows (Neumorphism)

| Token | Value | Use |
|-------|-------|-----|
| Soft | `0 4px 20px rgba(0,0,0,0.3)` | Cards |
| Elevated | `0 8px 32px rgba(0,0,0,0.4)` | Modals |
| Glow (Gold) | `0 0 24px rgba(212,175,55,0.2)` | Verified, CTAs |
| Glow (Violet) | `0 0 24px rgba(124,58,237,0.2)` | Ownership states |

---

## Glassmorphism

| Property | Value |
|----------|-------|
| Background | `rgba(26,26,26,0.8)` |
| Backdrop blur | `blur(16px)` |
| Border | `1px solid rgba(255,255,255,0.08)` |

---

## Component Specs

### Plot Card

- **Padding:** 16px
- **Border radius:** 10px
- **Background:** Surface (glassmorphism)
- **Border:** 1px solid Border
- **Status chip:** sm radius, gold/violet/green by status

### Allocation Bar

- **Height:** 4px
- **Background:** Border
- **Fill:** Accent Gold
- **Border radius:** full
- **Animation:** 500ms ease-in-out on fill change

### Status Chips

- **Padding:** 6px 12px
- **Font:** Caption, Medium
- **Colours:** Open (default), High Interest (gold), Allocated (grey)

### Filter Chips

- **Padding:** 10px 16px
- **Border radius:** sm
- **States:** Default (border), Active (gold fill)

### Sticky Allocation Box

- **Padding:** 24px
- **Background:** Surface Elevated
- **Border top:** 1px Border
- **Shadow:** Soft (elevated feel)

---

## Iconography

- **Style:** Linear, 24px default
- **Stroke:** 1.5–2px
- **Colour:** Inherit or Text Secondary
- **Accent:** Gold for CTAs, Violet for ownership

---

## Accessibility

- **Contrast:** WCAG AA minimum (4.5:1 text, 3:1 UI)
- **Touch targets:** Min 44px
- **Focus states:** Visible outline (gold or violet)
- **Reduced motion:** Respect `prefers-reduced-motion`
