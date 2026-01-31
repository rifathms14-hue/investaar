# Investaar — Information Architecture

## Location Hierarchy (Multi-Region, Multi-Area)

The product spans **multiple locations and cities across India**. Plot discovery and display follow a strict hierarchy:

```
Region (city)  →  Area (locality/zone)  →  Plot (number)
e.g. Madurai   →  Melur                  →  M-22
```

- **Region** = city or broad location: Jaipur, Haryana, Mumbai, Chennai, Madurai, Delhi, Rajkot, etc.
- **Area** = locality/zone within the region: e.g. Melur (in Madurai), Greenfield (in Chennai).
- **Plot** = plot number within the area: e.g. M-22, S14, N07. Display with full context: **Plot number · Area, Region** (e.g. M-22 · Melur, Madurai).

---

## Global IA Diagram

```
INVESTAAR
│
├── GLOBAL UX
│   ├── Progress indicator (Allocation → Ownership → Record)
│   └── Floating View Terms (Legal always accessible)
│
├── ALLOCATION BOARD [Default Landing]
│   ├── Banner (Phase · Status: Pre-Booking / Open / Final Allocation)
│   ├── CTA: View Pre-Booking → Pre-Booking flow
│   └── CTA: View Allocations → Active Regions (cities)
│
├── PRE-BOOKING FLOW (Priority access, not plot selection yet)
│   ├── Pre-Booking Campaigns (Region + Area in cards)
│   ├── Allocation Pool Overview
│   ├── Allocation Request (plot count stepper)
│   ├── Confirm Priority Allocation (payment)
│   └── Priority Access Granted (success)
│
├── NORMAL BOOKING FLOW (Region → Area → Plot)
│   ├── Active Regions (cities)
│   ├── Areas in Region
│   ├── Allocation Size (plot count)
│   ├── Plot List (by area)
│   ├── Plot Detail (Plot number · Area, Region)
│   ├── Ownership Path (Full / EMI)
│   ├── Confirm Allocation (summary + payment)
│   └── Allocation Successful (next steps)
│
├── PORTFOLIO [Asset Holdings Ledger]
│   ├── Holdings Overview (Plot number · Area, Region)
│   ├── Plot Cards → EMI Dashboard (when EMI Active)
│   └── EMI Complete → Star Frame flow
│
├── EMI DASHBOARD (Ownership Progress)
│   ├── Circular progress (payments completed)
│   ├── Timeline (Allocation → EMI Active → Registration Eligible → Ownership Complete)
│   ├── Make Payment CTA
│   └── Ownership Completed → Customize Investor Star Frame
│
├── STAR FRAME FLOW (Reward)
│   ├── Create Your Investor Star Frame (customize)
│   ├── Delivery Details (home / registry day)
│   └── Milestone Recorded → View in Records
│
├── RECORDS [Digital Registry Room]
│   ├── Verified Items (plot-linked)
│   ├── Digital Certificates (Investor Star Frame, Allocation Certificate, EMI Completion)
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

## Content Hierarchy — Allocation Board (Entry)

```
ALLOCATION BOARD
├── Banner (Phase · Status: Pre-Booking / Open / Final Allocation)
├── CTA: View Pre-Booking
├── CTA: View Allocations
└── Optional: Current phase summary (plot discovery via Region → Area)
```

## Content Hierarchy — Normal Flow (Region → Area → Plot)

```
ACTIVE REGIONS → AREAS IN REGION → ALLOCATION SIZE → PLOT LIST → PLOT DETAIL
     (cities)        (areas)         (1–4 plots)     (by area)   (Plot · Area, Region)
```

## Content Hierarchy — Allocation Flow (Normal Booking)

```
OWNERSHIP PATH (Full / EMI) → CONFIRM ALLOCATION → PAYMENT → ALLOCATION SUCCESSFUL
                              (summary, legal)    (method)   (next steps, View in Portfolio)
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

## Content Hierarchy — Allocation Flow (Normal Booking)

```
ALLOCATION FLOW
├── Step 1: Ownership Path (Full Allocation / EMI Allocation) — skipped if chosen from Plot Detail
├── Step 2: Confirm Allocation (plot context, total cost / EMI, legal, registration)
├── Step 3: Payment (method selection)
└── Step 4: Allocation Successful (next steps: KYC → Agreement → Registration → Ownership; CTA: View in Portfolio)
```

---

## Content Hierarchy — Portfolio

```
PORTFOLIO
├── Holdings Overview (optional summary)
└── Plot Cards (Plot number · Area, Region)
    ├── Status (Reserved / EMI Active / Registered / Ownership Complete)
    ├── Completion %
    ├── Ownership Type
    └── EMI Active → Link to EMI Dashboard (Ownership Progress)
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
Allocation Board → View Pre-Booking OR View Allocations
                        ↓                    ↓
                  Pre-Booking flow    Regions → Areas → Plots → Plot Detail → Allocation flow
                        ↓                    ↓
                  Priority Access      Allocation Successful
                        ↓                    ↓
                  View Campaign        Portfolio → (EMI Dashboard → Ownership Complete → Star Frame)
                        ↓                    ↓
                  —————————————        Records (verified documents) → Market
```

**Entry:** Allocation Board (Phase · Status; View Pre-Booking / View Allocations)  
**Pre-Booking:** Campaigns (Region+Area) → Pool → Plot count → Payment → Priority Access Granted  
**Normal:** Regions (cities) → Areas → Allocation Size → Plot List → Plot Detail (Plot · Area, Region) → Ownership Path → Confirm → Payment → Allocation Successful  
**Result:** Portfolio (Plot · Area, Region; EMI Dashboard when EMI Active; Ownership Complete → Star Frame)  
**Proof:** Records (verified documents; Star Frame milestone)  
**Global UX:** Progress indicator (Allocation → Ownership → Record); Floating View Terms
