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

## 4. Allocation Flow State Machine

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Step 1       │    │ Step 2       │    │ Step 3       │    │ Step 4       │
│ Summary      │───▶│ Intent       │───▶│ Payment      │───▶│ Confirmed    │
│              │    │ Confirmation │    │              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                    │                    │                    │
       │◀───────────────────┘                    │                    │
       │              Back                       │                    │
       └─────────────────────────────────────────┘                    │
                         Back                                          │
                                                                       │
                                                                       ▼
                                                              [View in Portfolio]
```

**Rules:**
- Step 2: Checkbox must be checked to proceed
- Step 3: Payment method must be selected
- Step 4: Terminal state → CTA to Portfolio

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
ENTRY: Market (default)
   │
   ├─ Tap Plot Card ──────────────────────▶ Plot Detail
   │
   ├─ Tap Filter Chip ────────────────────▶ Filter Asset Grid (in-place)
   │
   └─ Tap Market Signal ──────────────────▶ (Optional: scroll to relevant plots)
```

```
Plot Detail
   │
   ├─ Tap "Proceed to Allocation (Full)" ──▶ Allocation Flow (Step 1)
   │
   ├─ Tap "Apply for EMI Allocation" ──────▶ EMI Application Flow
   │
   ├─ Tap Blueprint Tab ───────────────────▶ Switch blueprint view
   │
   └─ Back ────────────────────────────────▶ Market
```

```
Allocation Flow
   │
   ├─ Step 1 Continue ─────────────────────▶ Step 2
   ├─ Step 2 Confirm & Continue ───────────▶ Step 3
   ├─ Step 3 Proceed to Payment ───────────▶ Step 4 (on success)
   ├─ Back (any step) ─────────────────────▶ Previous step or Plot Detail
   └─ Step 4 View in Portfolio ────────────▶ Portfolio
```

```
Portfolio
   │
   └─ Tap Plot Card ───────────────────────▶ Asset Page (ownership details)
```

```
Records
   │
   ├─ Tap Plot (if multiple) ──────────────▶ Filter by plot
   └─ Tap Document ────────────────────────▶ View document (read-only)
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
