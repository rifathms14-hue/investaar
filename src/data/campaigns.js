// Pre-booking campaigns: Region + Area, layout/phase, release window, benefits, status

export const campaigns = [
  {
    id: 'camp-melur-1',
    regionId: 'madurai',
    regionName: 'Madurai',
    areaId: 'melur',
    areaName: 'Melur',
    layout: 'Greenfield Layout',
    phase: 'Phase 1',
    releaseWindow: 'Q2 2025',
    benefits: ['Early pre-booking window', 'EMI priority', 'Gifting eligibility'],
    status: 'Open',
    totalPlots: 32,
    sizeRange: '1200 – 1800 sqft',
    priceBand: '₹18L – ₹26L',
    emiAvailable: true,
    priorityFee: '₹25,000',
  },
  {
    id: 'camp-greenfield-1',
    regionId: 'chennai',
    regionName: 'Chennai',
    areaId: 'greenfield',
    areaName: 'Greenfield',
    layout: 'OMR Layout',
    phase: 'Phase 1',
    releaseWindow: 'Q3 2025',
    benefits: ['Early pre-booking window', 'EMI priority'],
    status: 'Closing Soon',
    totalPlots: 40,
    sizeRange: '1200 – 2000 sqft',
    priceBand: '₹24L – ₹32L',
    emiAvailable: true,
    priorityFee: '₹30,000',
  },
  {
    id: 'camp-omr-1',
    regionId: 'chennai',
    regionName: 'Chennai',
    areaId: 'omr',
    areaName: 'OMR',
    layout: 'Coastal Layout',
    phase: 'Phase 1',
    releaseWindow: 'Q4 2025',
    benefits: ['Early pre-booking window', 'EMI priority', 'Gifting eligibility'],
    status: 'Closed',
    totalPlots: 28,
    sizeRange: '1200 – 1500 sqft',
    priceBand: '₹26L – ₹34L',
    emiAvailable: true,
    priorityFee: '₹35,000',
  },
]

export function getCampaign(id) {
  return campaigns.find(c => c.id === id) || null
}
