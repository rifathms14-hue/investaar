# Investaar — Screen Layouts & UI Specifications

## Design System Tokens

| Token | Value | Use |
|-------|-------|-----|
| Base | `#0D0D0D` (charcoal) | Background |
| Surface | `#1A1A1A` | Cards, panels |
| Accent Gold | `#D4AF37` | Allocation, progress, CTAs |
| Accent Violet | `#7C3AED` | Ownership, status, verified |
| Text Primary | `#FFFFFF` | Headlines, key info |
| Text Secondary | `#A3A3A3` | Body, microcopy |
| Success | `#22C55E` | Verified, complete |
| Border | `#2A2A2A` | Dividers, outlines |

**Typography:** Gotham / Gilroy-like — geometric sans  
**Effects:** Neumorphism (soft depth) + Glassmorphism (frosted panels)  
**Motion:** 300–500ms ease, deliberate

---

## 1. Market (Default Landing)

### Layout Structure

```
┌─────────────────────────────────────────┐
│  [Status Bar]                           │
├─────────────────────────────────────────┤
│  MARKET                                 │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ [Allocation Header Card]        │   │
│  │ Greenfield Layout · Phase 1     │   │
│  │ Allocation in Progress          │   │
│  │ 28 plots currently available    │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ████████████░░░░░░░░ [Gold Bar]       │
│  Inventory updates in real time         │
│                                         │
│  [Size] [Price] [Facing] [Road] [Avail] │
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │ S14 │ │ N07 │ │ E22 │               │
│  │ ... │ │ ... │ │ ... │               │
│  └─────┘ └─────┘ └─────┘               │
│  [Asset Grid]                           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 3 plots were allocated today    │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  [Market] [Portfolio] [Records] [Acct]  │
└─────────────────────────────────────────┘
```

### Market Header States (3 Variants)

| State | Subheadline | Tone |
|-------|-------------|------|
| Active Allocation | Allocation in Progress | Calm, open |
| Advanced Allocation | Allocation Advanced | Neutral |
| Final Allocation | Final Allocation | Reserved, finite |

### Plot Card Specs

- **Layout:** 2-column grid (or 1-col on small screens)
- **Content:** Mini blueprint tile (top), Plot ID, Size, Price, EMI from, Status chip
- **States:** Open | High Interest | Allocated
- **Interaction:** Tap → Plot Detail

---

## 2. Plot Detail (Asset Allocation Page)

### Layout Structure

```
┌─────────────────────────────────────────┐
│  ← Back                                 │
│                                         │
│  S14                                    │
│  Greenfield Layout · Phase 1             │
│  ₹18,50,000    EMI from ₹12,400/mo      │
│  [Open]                                 │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ [Blueprint Stack - Tabs]        │   │
│  │ Master | Plot | Road | Satellite│   │
│  │ [Visual]                        │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Size     Facing    Road Width          │
│  1200 sqft  East    30 ft               │
│  Distance to main road | Zone type      │
│                                         │
│  Location Context                       │
│  [School 2 km] [Hospital 4 km] ...      │
│                                         │
│  Trust Snapshot                         │
│  Layout approval ✔ Ownership chain ✔    │
│  Booking terms ✔ Registration sample ✔  │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ Proceed to Allocation (Full)    │   │
│  │ Apply for EMI Allocation        │   │
│  │                                 │   │
│  │ Allocation initiates a legal    │   │
│  │ land ownership process.         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Sticky Allocation Box

- **Position:** Sticky bottom (or inline on scroll)
- **Primary CTA:** Proceed to Allocation (Full Payment)
- **Secondary CTA:** Apply for EMI Allocation
- **Legal line:** Always visible, subtle

---

## 3. Allocation Flow (4 Steps)

### Step 1 — Allocation Summary

```
┌─────────────────────────────────────────┐
│  Allocation Summary                     │
│  Step 1 of 4                            │
│                                         │
│  Plot S14                               │
│  ₹18,50,000                             │
│  Full Payment / EMI from ₹12,400/mo     │
│  Advance: ₹3,70,000                     │
│  Legal charges: ₹45,000                 │
│                                         │
│  [Continue]                             │
└─────────────────────────────────────────┘
```

### Step 2 — Intent Confirmation

```
┌─────────────────────────────────────────┐
│  Intent Confirmation                    │
│  Step 2 of 4                            │
│                                         │
│  ☐ I understand this is a legal land    │
│    allocation and registration process. │
│                                         │
│  [Confirm & Continue]                   │
└─────────────────────────────────────────┘
```

### Step 3 — Payment

```
┌─────────────────────────────────────────┐
│  Payment                                │
│  Step 3 of 4                            │
│                                         │
│  [Payment method selection UI]          │
│                                         │
│  [Proceed to Payment]                   │
└─────────────────────────────────────────┘
```

### Step 4 — Allocation Confirmed

```
┌─────────────────────────────────────────┐
│  ✓                                      │
│  Plot S14 has been allocated to your    │
│  portfolio.                             │
│                                         │
│  [View in Portfolio]                    │
└─────────────────────────────────────────┘
```

---

## 4. Portfolio (Holdings Ledger)

### Layout Structure

```
┌─────────────────────────────────────────┐
│  PORTFOLIO                              │
│                                         │
│  Your Asset Holdings                    │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ S14    [Registered]             │   │
│  │ 95% complete · EMI Active       │   │
│  │ [Progress bar]                  │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ N07    [Reserved]               │   │
│  │ 15% complete · EMI Active       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ E22    [Ownership Complete]     │   │
│  │ 100% · Full Payment             │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  [Market] [Portfolio] [Records] [Acct]  │
└─────────────────────────────────────────┘
```

### Portfolio Plot Card Status Chips

| Status | Colour | Meaning |
|--------|--------|---------|
| Reserved | Gold | Intent confirmed, allocation in progress |
| EMI Active | Violet | EMI allocation underway |
| Registered | Green | Registration complete |
| Ownership Complete | Green + gold | Full ownership verified |

---

## 5. Records (Registry Room)

### Layout Structure

```
┌─────────────────────────────────────────┐
│  RECORDS                                │
│                                         │
│  Verified Documents                     │
│                                         │
│  Plot S14                               │
│  ├── Approvals ✓                        │
│  ├── Agreements ✓                       │
│  ├── Payments ✓                         │
│  ├── EMI Records ✓                      │
│  └── Registration Proof ✓               │
│                                         │
│  Digital Certificates                   │
│  ├── Allocation Certificate [unlocked]  │
│  └── EMI Completion [locked]            │
│                                         │
│  Physical Collectibles                  │
│  ├── Mini Frame [unlocked]              │
│  ├── Plot Keychain [locked]             │
│  └── Registry Day Photo [locked]        │
│                                         │
├─────────────────────────────────────────┤
│  [Market] [Portfolio] [Records] [Acct]  │
└─────────────────────────────────────────┘
```

### Records Rules

- Verified status on every item
- Time-stamped access logs
- Read-only after validation
- Plot-linked grouping

---

## 6. Account

### Layout Structure

```
┌─────────────────────────────────────────┐
│  ACCOUNT                                │
│                                         │
│  [Avatar]                               │
│  [Name]                                 │
│                                         │
│  Profile                                │
│  Preferences                            │
│  Support                                │
│                                         │
├─────────────────────────────────────────┤
│  [Market] [Portfolio] [Records] [Acct]  │
└─────────────────────────────────────────┘
```

---

## Component Hierarchy Summary

| Component | Purpose |
|-----------|---------|
| Allocation Header | Context, status, plot count |
| Allocation Bar | Visual momentum (no %) |
| Plot Card | Asset summary, status |
| Blueprint Stack | Plot visualisation |
| Trust Snapshot | Verification badges |
| Sticky Allocation Box | Primary CTAs |
| Status Chips | Reserved, EMI Active, etc. |
| Filter Chips | Market filters |
| Market Signal Card | Whisper-style updates |
