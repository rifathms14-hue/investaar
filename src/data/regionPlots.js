// Regions and plots for home page region entry points and region plot pages
// Plots with isNew: true show NEW badge on region plot page

export const homeRegions = [
  { id: 'bangalore', name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=100&h=100&fit=crop' },
  { id: 'hyderabad', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1572445271230-a78d4d184ec0?w=100&h=100&fit=crop&auto=format' },
  { id: 'chennai', name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=100&h=100&fit=crop' },
  { id: 'pune', name: 'Pune', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=100&h=100&fit=crop' },
  { id: 'mumbai', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=100&h=100&fit=crop' },
  { id: 'delhi', name: 'Delhi NCR', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=100&h=100&fit=crop' },
]

const plotImage = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80'

export const plotsByRegion = {
  bangalore: [
    { id: 'BLR-S14', area: 'Sarjapur', size: '1200 sqft', price: '₹18,50,000', image: plotImage, isNew: true },
    { id: 'BLR-S15', area: 'Sarjapur', size: '1500 sqft', price: '₹22,00,000', image: plotImage, isNew: false },
    { id: 'BLR-S16', area: 'Whitefield', size: '1200 sqft', price: '₹20,00,000', image: plotImage, isNew: false },
  ],
  hyderabad: [
    { id: 'HYD-N07', area: 'Shamshabad', size: '1500 sqft', price: '₹22,00,000', image: plotImage, isNew: true },
    { id: 'HYD-N08', area: 'Gachibowli', size: '1200 sqft', price: '₹19,50,000', image: plotImage, isNew: false },
    { id: 'HYD-N09', area: 'Shamshabad', size: '1800 sqft', price: '₹26,00,000', image: plotImage, isNew: false },
  ],
  chennai: [
    { id: 'CHN-E22', area: 'OMR', size: '1000 sqft', price: '₹15,20,000', image: plotImage, isNew: true },
    { id: 'CHN-E23', area: 'OMR', size: '1350 sqft', price: '₹18,50,000', image: plotImage, isNew: false },
    { id: 'CHN-GF01', area: 'Greenfield', size: '1500 sqft', price: '₹24,00,000', image: plotImage, isNew: false },
  ],
  pune: [
    { id: 'PUN-W09', area: 'Hinjewadi', size: '1200 sqft', price: '₹18,50,000', image: plotImage, isNew: true },
    { id: 'PUN-W10', area: 'Hinjewadi', size: '1500 sqft', price: '₹22,00,000', image: plotImage, isNew: false },
    { id: 'PUN-W11', area: 'Wakad', size: '1200 sqft', price: '₹19,00,000', image: plotImage, isNew: false },
  ],
  mumbai: [
    { id: 'MUM-MC01', area: 'Central', size: '1000 sqft', price: '₹45,00,000', image: plotImage, isNew: false },
    { id: 'MUM-MC02', area: 'Thane', size: '1200 sqft', price: '₹38,00,000', image: plotImage, isNew: false },
  ],
  delhi: [
    { id: 'DLH-DN01', area: 'NCR', size: '1200 sqft', price: '₹38,00,000', image: plotImage, isNew: true },
    { id: 'DLH-DN02', area: 'NCR', size: '1500 sqft', price: '₹45,00,000', image: plotImage, isNew: false },
  ],
}

export function getRegionById(id) {
  return homeRegions.find(r => r.id === id) || null
}

export function getPlotsByRegionId(regionId) {
  return plotsByRegion[regionId] || []
}
