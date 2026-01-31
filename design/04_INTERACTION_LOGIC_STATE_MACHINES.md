# Investaar — Interaction Logic & State Machines

---

## 1. Market Header State Machine

```
                    ┌─────────────────────────┐
                    │     ALLOCATION HEADER   │
                    └───────────┬─────────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│    ACTIVE     │     │   ADVANCED    │     │     FINAL     │
│   >70% free   │────▶│  30–70% free  │────▶│   <30% free   │
│               │     │               │     │               │
│ "In Progress" │     │ "Advanced"    │     │ "Final"       │
└───────────────┘     └───────────────┘     └───────────────┘
```

**Trigger:** Plot count / availability ratio  
**Transition:** Automatic based on inventory

---

## 2. Plot Card Status State Machine

```
                    ┌─────────────┐
                    │  PLOT CARD  │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│    OPEN     │   │ HIGH        │   │  ALLOCATED  │
│             │   │ INTEREST    │   │             │
│ Available   │   │ >X interests│   │ Reserved    │
│ for alloc.  │   │ in period   │   │ by someone  │
└─────────────┘   └─────────────┘   └─────────────┘
```

**Triggers:**
- Open: Default availability
- High Interest: Interest threshold crossed
- Allocated: Reserved or paid

---

## 3. Portfolio Plot Status State Machine

```
                    ┌─────────────────┐
                    │ PORTFOLIO PLOT  │
                    └────────┬────────┘
                             │
     ┌───────────┬───────────┼───────────┬───────────┐
     │           │           │           │           │
     ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐
│RESERVED │─│EMI      │─│REGISTERED│─│OWNERSHIP│
│         │ │ACTIVE   │ │         │ │COMPLETE │
│ Intent  │ │Payment  │ │ Reg.    │ │ Full    │
│ confirm │ │ongoing  │ │ done    │ │ verified│
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

**Transitions:**
- Reserved → EMI Active: First EMI payment received
- EMI Active → Registered: EMI complete + registration filed
- Registered → Ownership Complete: Registration verified

---

## 4. Allocation Flow State Machine (Normal Booking)

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Step 1       │    │ Step 2       │    │ Step 3       │    │ Step 4       │
│ Ownership    │───▶│ Confirm      │───▶│ Payment      │───▶│ Allocation   │
│ Path         │    │ Allocation   │    │              │    │ Successful   │
│ (Full/EMI)   │    │ (summary)    │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                    │                    │                    │
       │ (skipped if        │◀───────────────────┘                    │
       │  from Plot Detail  │              Back                       │
       │  with type)       │                    │                    │
       └──────────────────▶│                    │                    │
                            │                    │                    ▼
                            │                    │             [View in Portfolio]
                            │ Checkbox required  │
                            └───────────────────┘
```

**Rules:**
- Step 1 (Ownership Path): Optional — skipped when user came from Plot Detail with Proceed to Allocation or Apply for EMI Allocation.
- Step 2: Checkbox must be checked to proceed.
- Step 3: Payment method selection.
- Step 4: Terminal state → CTA to Portfolio; next steps: KYC → Agreement → Registration → Ownership Completion.

---

## 4b. Pre-Booking Flow State Machine

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Campaigns    │───▶│ Pool         │───▶│ Request      │───▶│ Confirm      │───▶│ Priority     │
│ (Region+Area)│    │ Overview     │    │ (plot count) │    │ (payment)    │    │ Access       │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    │ Granted      │
                                                                                  └──────────────┘
                                                                                         │
                                                                                         ▼
                                                                                  [View Campaign Status]
```

**Rules:**
- Campaigns: Cards show Region · Area, status (Open / Closing Soon / Closed). CTA: Apply for Priority Allocation.
- Pool: Master layout map, info cards. CTA: Select Number of Plots.
- Request: Stepper 1–4 plots. CTA: Continue.
- Confirm: Summary + Priority Allocation Fee. CTA: Confirm Priority Allocation.
- Priority Access Granted: Timeline (Applied → Awaiting Release → Plot Selection → Allocation → Ownership). CTA: View Campaign Status.

---

## 4c. Normal Flow (Region → Area → Plot) State Machine

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Active       │───▶│ Areas in     │───▶│ Allocation   │───▶│ Plot List    │───▶│ Plot Detail  │
│ Regions      │    │ Region       │    │ Size         │    │ (by area)    │    │ (Plot·Area,   │
│ (cities)     │    │              │    │ (1–4 plots)  │    │              │    │  Region)      │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                                         │
                                                                                         ├─ Proceed to Allocation ──▶ Allocation Flow (type=full)
                                                                                         └─ Apply for EMI Allocation ──▶ Allocation Flow (type=emi)
```

**Rules:**
- Plot context displayed as **Plot number · Area, Region** (e.g. M-22 · Melur, Madurai) on Plot Detail, Portfolio, Records, Star Frame.
- Back navigation preserves Region → Area → Plot breadcrumb when using composite route.

---

## 4d. EMI Dashboard & Ownership Complete State Machine

```
┌──────────────┐    ┌──────────────┐
│ EMI          │───▶│ Ownership    │
│ Dashboard    │    │ Completed    │
│ (progress    │    │ (last payment│
│  ring, Make  │    │  processed)  │
│  Payment)    │    │              │
└──────────────┘    └──────────────┘
       │                    │
       │                    ▼
       │             [Customize Investor Star Frame]
       │
       └─ Make Payment (placeholder)
```

**Rules:**
- EMI Dashboard: Route /portfolio/emi/:plotId. Plot context: Plot number · Area, Region. Timeline: Allocation → EMI Active → Registration Eligible → Ownership Complete.
- Ownership Completed: When payments completed (e.g. 24/24). CTA: Customize Investor Star Frame → Star Frame flow.

---

## 4e. Star Frame Flow State Machine

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Customize    │───▶│ Delivery     │───▶│ Milestone    │
│ (recipient,  │    │ Details      │    │ Recorded     │
│  message,    │    │ (home/       │    │              │
│  plot ref)   │    │  registry)   │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
                                                    │
                                                    ▼
                                             [View in Records]
```

**Rules:**
- Customize: Recipient Name, Occasion (optional), Message, Plot Reference (auto-filled **Plot number · Area, Region**). Live preview. CTA: Confirm Design.
- Delivery: Home delivery | Registry day handover. CTA: Confirm Delivery.
- Milestone Recorded: Terminal state. CTA: View in Records.

---

## 5. Records Unlock State Machine

```
                    ┌─────────────────────┐
                    │   RECORDS ITEM      │
                    └──────────┬──────────┘
                               │
               ┌───────────────┴───────────────┐
               │                               │
               ▼                               ▼
        ┌─────────────┐                 ┌─────────────┐
        │   LOCKED    │                 │  UNLOCKED   │
        │             │────────────────▶│             │
        │ Milestone   │   Milestone     │ Accessible  │
        │ not met     │   met           │ Read-only   │
        └─────────────┘                 └─────────────┘
```

**Milestone mapping:**
- Allocation Certificate: Allocation confirmed
- EMI Completion Certificate: EMI fully paid
- Physical collectibles: Ownership Complete

---

## 6. User Journey Interaction Logic

```
ENTRY: Allocation Board (default)
   │
   ├─ View Pre-Booking ───────────────────▶ Pre-Booking Campaigns
   │
   └─ View Allocations ───────────────────▶ Active Regions (cities)
```

```
Pre-Booking: Campaigns → Pool → Request (plot count) → Confirm (payment) → Priority Access Granted
   └─ View Campaign Status ─────────────────▶ Pre-Booking Campaigns
```

```
Normal: Active Regions → Areas in Region → Allocation Size → Plot List → Plot Detail
   │
   └─ Plot Detail
        ├─ Proceed to Allocation ──────────▶ Allocation Flow (state: purchaseType=full, regionId, areaId)
        ├─ Apply for EMI Allocation ───────▶ Allocation Flow (state: purchaseType=emi, regionId, areaId)
        ├─ Tap Blueprint Tab ───────────────▶ Switch blueprint view
        └─ Back ───────────────────────────▶ Plot List (or Allocation Board if direct /plot/:id)
```

```
Allocation Flow (Normal Booking)
   │
   ├─ Step 1 (Ownership Path) Continue ────▶ Step 2 (skipped if purchaseType in state)
   ├─ Step 2 Confirm (checkbox) ───────────▶ Step 3
   ├─ Step 3 Proceed to Payment ───────────▶ Step 4 (Allocation Successful)
   ├─ Back (any step) ─────────────────────▶ Previous step or Plot Detail
   └─ Step 4 View in Portfolio ────────────▶ Portfolio
```

```
Portfolio
   │
   ├─ Tap EMI Active plot card ─────────────▶ EMI Dashboard (/portfolio/emi/:plotId)
   └─ Tap other plot card ─────────────────▶ Asset Page (ownership details)
```

```
EMI Dashboard
   │
   ├─ Make Payment ────────────────────────▶ (placeholder)
   ├─ Simulate completion (demo) ──────────▶ Ownership Completed
   └─ Ownership Completed: Customize Investor Star Frame ──▶ Star Frame Customize
```

```
Star Frame: Customize → Delivery Details → Milestone Recorded
   └─ View in Records ─────────────────────▶ Records
```

```
Records
   │
   ├─ Tap Plot (if multiple) ──────────────▶ Filter by plot
   └─ Tap Document ────────────────────────▶ View document (read-only)
```

```
Global: View Terms (floating) ──────────────▶ /terms
```

---

## 7. Gesture & Interaction Rules

| Element | Action | Result |
|---------|--------|--------|
| Plot Card | Tap | Navigate to Plot Detail |
| Filter Chip | Tap | Toggle filter, update grid |
| Blueprint Stack | Swipe / Tab | Switch view |
| Allocation Bar | — | Read-only, no interaction |
| Sticky CTA | Tap | Proceed to Allocation |
| Record Item | Tap | Open document view |
| Checkbox (Intent) | Tap | Toggle, enable Continue |
| Back | Tap | Previous screen |
| Pull-to-refresh | Pull | Refresh Market / Portfolio |

---

## 8. Animation & Motion Specs

| Transition | Duration | Easing |
|------------|----------|--------|
| Screen navigate | 300ms | ease-out |
| Modal appear | 250ms | ease-out |
| Chip toggle | 150ms | ease |
| Allocation bar fill | 500ms | ease-in-out |
| Status chip pulse (verified) | 1.5s loop | ease-in-out |
| Card tap feedback | 100ms | ease |

**Principle:** Slow, deliberate, formal — no bouncy or playful motion.
