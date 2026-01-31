# Investaar — UI Copy & Microcopy

## Language Rules

**Use:** Allocate | Record | Verify | Register | Portfolio | Asset | Ownership  
**Avoid:** Deal | Offer | Discount | Hurry | Limited time | Sale | Buy Now

---

## Navigation Labels

| Screen | Label | Alt |
|--------|-------|-----|
| Market | Market | — |
| Portfolio | Portfolio | Holdings |
| Records | Records | Documents |
| Account | Account | Profile |

---

## Global UX

- **Progress indicator:** Allocation → Ownership → Record (highlight current by route).
- **Floating View Terms:** Label: "View Terms". Link to /terms.

---

## Allocation Board (Entry)

- **Screen title:** Allocation Board
- **Banner:** Phase X · Status: Pre-Booking | Open | Final Allocation
- **Microcopy:** Pre-Booking and direct allocation available across regions.
- **Primary CTA:** View Pre-Booking
- **Secondary CTA:** View Allocations
- **Optional summary:** Current phase summary — Plot discovery is available by region and area. Use View Allocations to choose a city and area, then browse plots.

---

## Pre-Booking Flow

- **Pre-Booking Campaigns:** Screen title: Pre-Booking Campaigns. Cards: Region · Area (e.g. Madurai · Melur), Layout/Phase, release window, benefits, status (Open / Closing Soon / Closed). CTA: Apply for Priority Allocation.
- **Allocation Pool Overview:** Screen title: Allocation Pool Overview. Context: Region · Area. CTA: Select Number of Plots.
- **Allocation Request:** Screen title: Allocation Request. Stepper 1–4. Microcopy: Priority allocation allows requesting multiple plots. Final assignment occurs on phase release. CTA: Continue.
- **Confirm Priority Allocation:** Screen title: Confirm Priority Allocation. Summary: campaign, region, area, plots requested, refund policy, priority window. Priority Allocation Fee (non-refundable). CTA: Confirm Priority Allocation.
- **Priority Access Granted:** Screen title: Priority Access Granted. Message: You're now part of Phase X allocation. You'll be notified when plot selection opens. Timeline: Applied → Awaiting Release → Plot Selection → Allocation → Ownership. CTA: View Campaign Status.

---

## Normal Flow (Region → Area → Plot)

- **Active Regions:** Screen title: Active Regions. Subhead: Select a city to view areas and plots. Cards: Region (city) name, phases summary, status (Open / Final Allocation). CTA: Enter Region.
- **Areas in Region:** Screen title: Areas in [Region name]. Cards: Area name, phase, plot count, status. CTA: View Plots.
- **Allocation Size:** Screen title: Allocation Size. Stepper 1–4. Microcopy: Multiple plots can be managed under a single ownership record. CTA: Continue.
- **Plot List:** Screen title: Plots. Breadcrumb: Region · Area. Cards: Plot number, size, price, status (Open / High Interest). Tap → Plot Detail.
- **Plot context (all screens):** Use **Plot number · Area, Region** (e.g. M-22 · Melur, Madurai) consistently.

---

## Market (Reference)

### Plot Card Copy
- **Plot ID:** M-22, S14, N07 (with context: Plot number · Area, Region)
- **Size:** 1200 sqft
- **Price:** ₹18,50,000
- **EMI line:** EMI from ₹12,400/month
- **Status chips:** Open | High Interest | Allocated

---

## Plot Detail (Asset Allocation Page)

### Asset Header
- **Plot ID:** S14
- **Context:** Greenfield Layout · Phase 1
- **Price:** ₹18,50,000
- **EMI:** EMI from ₹12,400/month
- **Status:** Open | High Interest | Allocated

### Blueprint Stack Tabs
- Master layout
- Plot boundary
- Road access
- Satellite view

### Key Metrics Labels
- Size
- Facing
- Road width
- Distance to main road
- Zone type

### Trust Snapshot
- Layout approval ✔
- Ownership chain ✔
- Booking terms ✔
- Registration sample ✔

### CTAs
- **Primary:** Proceed to Allocation (Full Payment)
- **Secondary:** Apply for EMI Allocation

### Legal Micro-line
"Allocation initiates a legal land ownership process, not an instant transfer."

---

## Allocation Flow (Normal Booking)

### Step 1 — Ownership Path (optional if chosen from Plot Detail)
- **Screen title:** Ownership Path
- **Cards:** Full Allocation (Immediate registration process) | EMI Allocation (Monthly ownership progression)
- **CTA:** Continue

### Step 2 — Confirm Allocation
- **Screen title:** Confirm Allocation
- **Labels:** Plot(s) with Region · Area · Plot number | Total cost | EMI (if EMI) | Legal charges | Registration fees
- **Checkbox:** "I understand this is a legal land allocation and registration process."
- **CTA:** Complete Allocation

### Step 3 — Payment
- **Screen title:** Payment
- **CTA:** Proceed to Payment

### Step 4 — Allocation Successful
- **Success line:** "Plot [Plot number] ([Area], [Region]) is now part of your portfolio."
- **Next steps:** KYC Verification → Agreement Signing → Registration Scheduling → Ownership Completion
- **CTA:** View in Portfolio

---

## Portfolio

### Screen Header
- "Portfolio"
- **Subhead:** "Your Asset Holdings"

### Plot Card Labels
- **Plot context:** Plot number · Area, Region (e.g. M-22 · Melur, Madurai)
- **Status chips:** Reserved | EMI Active | Registered | Ownership Complete
- **Completion:** 95% complete · EMI Active
- **Ownership type:** Full Payment | EMI Active
- **EMI Active:** Link to EMI Dashboard — "View progress →"

### Empty State
- "No allocations yet"
- "Proceed to Market to explore available plots."

---

## Records

### Screen Header
- "Records"
- **Subhead:** "Verified Documents" or "Legal Ground"

### Section Labels
- Approvals
- Agreements
- Payments
- EMI Records
- Registration Proof
- Digital Certificates
- Physical Collectibles Tracking

### EMI Dashboard (Ownership Progress)
- **Screen title:** Ownership Progress
- **Plot context:** Plot number · Area, Region
- **Content:** Circular progress (e.g. 6/24 payments), timeline: Allocation → EMI Active → Registration Eligible → Ownership Complete
- **CTA:** Make Payment
- **Ownership Completed:** Screen title: Ownership Completed. Message: Your plot is now fully registered and verified. CTA: Customize Investor Star Frame

### Star Frame Flow
- **Create Your Investor Star Frame:** Recipient Name, Occasion (optional), Message, Plot Reference (auto-filled **Plot number · Area, Region**). Live preview (3D frame / door / plaque). CTA: Confirm Design.
- **Delivery Details:** Options: Home delivery, Registry day handover. CTA: Confirm Delivery.
- **Milestone Recorded:** Message: This ownership milestone has been added to your records. CTA: View in Records.

### Digital Certificates (Unlock Labels)
- Investor Star Frame
- Allocation Certificate
- EMI Completion Certificate

### Physical Collectibles (Unlock Labels)
- Mini Frame
- Plot Keychain
- Registry Day Photo Frame

### Verification Copy
- "Verified" (on each item)
- "Unlocked at [milestone]"
- "Locked — complete [milestone] to unlock"

---

## Error & Edge States

### Network Error
- "Connection unavailable. Please retry."
- **CTA:** Retry

### Payment Failed
- "Payment could not be completed."
- **CTA:** Try Again

### Allocation Unavailable
- "This plot has been allocated."
- **CTA:** View other plots

### Empty Filters
- "No plots match your filters."
- **CTA:** Clear filters

---

## Toast / Inline Feedback

- "Allocation intent recorded."
- "Document verified."
- "Saved to Records."
- "Portfolio updated."

---

## Tone Guidelines

| Context | Tone |
|---------|------|
| Headlines | Calm, factual |
| CTAs | Confident, action-oriented |
| Legal copy | Formal, precise |
| Market signals | Whisper, observational |
| Success | Confident, not celebratory |
| Errors | Neutral, helpful |
