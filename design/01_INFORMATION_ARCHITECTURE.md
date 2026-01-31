# Investaar — Information Architecture

## Global IA Diagram

```
INVESTAAR
│
├── 🔔 NOTIFICATIONS (Global System Layer — overlay / badge, not a destination)
│
├── MARKET [Default Landing]
│   ├── Allocation Header (state-driven)
│   │   ├── Active Allocation
│   │   ├── Advanced Allocation
│   │   └── Final Allocation
│   ├── Allocation Bar (gold, momentum)
│   ├── Asset Grid
│   │   └── Plot Card → Plot Detail (Asset Allocation Page)
│   ├── Filter Chips (Size, Price, Facing, Road Access, Availability)
│   └── Market Signals (small contextual cards)
│
├── PORTFOLIO [Asset Holdings Ledger]
│   ├── Holdings Overview
│   └── Plot Cards
│       └── Asset Page (ownership details)
│
├── RECORDS [Digital Registry Room]
│   ├── Approvals
│   ├── Agreements
│   ├── Payments
│   ├── EMI Records
│   ├── Registration Proof
│   ├── Digital Certificates
│   └── Physical Collectibles Tracking
│
└── ACCOUNT [Who I Am]
    ├── Profile
    ├── Preferences
    └── Support
```

---

## Primary Navigation Structure

| Tab | Label | Metaphor | Primary Question |
|-----|-------|----------|------------------|
| 1 | Market | Allocation hall | What is being allocated? |
| 2 | Portfolio | Holdings ledger | What do I hold? |
| 3 | Records | Registry room | What is verified? |
| 4 | Account | Identity | Who am I? |

**Tab order:** Market → Portfolio → Records → Account

---

## Content Hierarchy — Market

```
MARKET
├── Header (Layout + Phase + Status + Plot count)
├── Allocation Bar (visual momentum, no %)
├── Micro-line: "Inventory updates in real time"
├── Asset Grid (primary focus)
│   └── Plot Cards
├── Filter Chips (trading-style)
└── Market Signals (whisper cards)
```

---

## Content Hierarchy — Plot Detail (Asset Allocation Page)

```
PLOT DETAIL
├── Asset Header (ID, Layout, Phase, Price, EMI, Status)
├── Visual Blueprint Stack
│   ├── Master layout
│   ├── Plot boundary
│   ├── Road access
│   └── Satellite view
├── Key Metrics Grid
├── Location Context
├── Trust Snapshot
└── Sticky Allocation Box (CTAs)
```

---

## Content Hierarchy — Allocation Flow (4 Steps)

```
ALLOCATION FLOW
├── Step 1: Allocation Summary
├── Step 2: Intent Confirmation
├── Step 3: Payment
└── Step 4: Allocation Confirmed
```

---

## Content Hierarchy — Portfolio

```
PORTFOLIO
├── Holdings Overview (optional summary)
└── Plot Cards
    ├── Plot ID
    ├── Status (Reserved / EMI Active / Registered / Ownership Complete)
    ├── Completion %
    └── Ownership Type
```

---

## Content Hierarchy — Records

```
RECORDS
├── Verified Items (all plot-linked)
│   ├── Approvals
│   ├── Agreements
│   ├── Payments
│   ├── EMI Records
│   ├── Registration Proof
│   └── Digital Certificates
└── Physical Collectibles Tracking
    ├── Digital (unlocks)
    │   ├── Investor Star Frame
    │   ├── Allocation Certificate
    │   └── EMI Completion Certificate
    └── Physical (unlocks)
        ├── Mini Frame
        ├── Plot Keychain
        └── Registry Day Photo Frame
```

---

## User Journey Loop

```
Market → Asset → Allocation → Portfolio → Records → Market
   ↑                                                    │
   └────────────────────────────────────────────────────┘
```

**Entry:** Market (what's available)  
**Action:** Proceed to Allocation (asset page → flow)  
**Result:** Portfolio (what I hold)  
**Proof:** Records (verified documents)  
**Return:** Market (explore more)
