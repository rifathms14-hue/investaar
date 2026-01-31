// Region (city) → Area (locality) → Plot (number)
// Display: Plot number · Area, Region (e.g. M-22 · Melur, Madurai)

export const regions = [
  { id: 'madurai', name: 'Madurai', phasesSummary: 'Phase 1 · Phase 2', status: 'Open', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&h=200&fit=crop' },
  { id: 'chennai', name: 'Chennai', phasesSummary: 'Phase 1', status: 'Open', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&h=200&fit=crop' },
  { id: 'jaipur', name: 'Jaipur', phasesSummary: 'Phase 1', status: 'Final Bookings', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200&h=200&fit=crop' },
  { id: 'mumbai', name: 'Mumbai', phasesSummary: 'Phase 1 · Phase 2', status: 'Open', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=200&h=200&fit=crop' },
  { id: 'delhi', name: 'Delhi', phasesSummary: 'Phase 1', status: 'Open', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&h=200&fit=crop' },
  { id: 'rajkot', name: 'Rajkot', phasesSummary: 'Phase 1', status: 'Open', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200&h=200&fit=crop' },
  { id: 'haryana', name: 'Haryana', phasesSummary: 'Phase 1', status: 'Open', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=200&h=200&fit=crop' },
]

export const areas = [
  { id: 'melur', regionId: 'madurai', name: 'Melur', phase: 'Phase 1', plotCount: 32, status: 'Open' },
  { id: 'srivilliputhur', regionId: 'madurai', name: 'Srivilliputhur', phase: 'Phase 1', plotCount: 24, status: 'Open' },
  { id: 'greenfield', regionId: 'chennai', name: 'Greenfield', phase: 'Phase 1', plotCount: 40, status: 'Open' },
  { id: 'omr', regionId: 'chennai', name: 'OMR', phase: 'Phase 1', plotCount: 28, status: 'Final Bookings' },
  { id: 'jaipur-north', regionId: 'jaipur', name: 'North Zone', phase: 'Phase 1', plotCount: 20, status: 'Open' },
  { id: 'mumbai-central', regionId: 'mumbai', name: 'Central', phase: 'Phase 1', plotCount: 36, status: 'Open' },
  { id: 'delhi-ncr', regionId: 'delhi', name: 'NCR', phase: 'Phase 1', plotCount: 30, status: 'Open' },
]

const plotBase = (areaId, regionId, areaName, regionName) => ({
  areaId,
  regionId,
  areaName,
  regionName,
})

export const plots = [
  { id: 'M-22', ...plotBase('melur', 'madurai', 'Melur', 'Madurai'), size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open' },
  { id: 'M-23', ...plotBase('melur', 'madurai', 'Melur', 'Madurai'), size: '1500 sqft', price: '₹22,00,000', emi: '₹14,800/mo', status: 'Open' },
  { id: 'M-24', ...plotBase('melur', 'madurai', 'Melur', 'Madurai'), size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'High Interest' },
  { id: 'S-01', ...plotBase('srivilliputhur', 'madurai', 'Srivilliputhur', 'Madurai'), size: '1350 sqft', price: '₹20,00,000', emi: '₹13,500/mo', status: 'Open' },
  { id: 'S-02', ...plotBase('srivilliputhur', 'madurai', 'Srivilliputhur', 'Madurai'), size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open' },
  { id: 'GF-01', ...plotBase('greenfield', 'chennai', 'Greenfield', 'Chennai'), size: '1500 sqft', price: '₹24,00,000', emi: '₹16,200/mo', status: 'Open' },
  { id: 'GF-02', ...plotBase('greenfield', 'chennai', 'Greenfield', 'Chennai'), size: '1800 sqft', price: '₹28,00,000', emi: '₹18,900/mo', status: 'Open' },
  { id: 'OMR-01', ...plotBase('omr', 'chennai', 'OMR', 'Chennai'), size: '1200 sqft', price: '₹26,00,000', emi: '₹17,500/mo', status: 'Open' },
  { id: 'OMR-02', ...plotBase('omr', 'chennai', 'OMR', 'Chennai'), size: '1500 sqft', price: '₹32,00,000', emi: '₹21,600/mo', status: 'High Interest' },
  { id: 'JN-01', ...plotBase('jaipur-north', 'jaipur', 'North Zone', 'Jaipur'), size: '1200 sqft', price: '₹16,00,000', emi: '₹10,800/mo', status: 'Open' },
  { id: 'MC-01', ...plotBase('mumbai-central', 'mumbai', 'Central', 'Mumbai'), size: '1000 sqft', price: '₹45,00,000', emi: '₹30,400/mo', status: 'Open' },
  { id: 'DN-01', ...plotBase('delhi-ncr', 'delhi', 'NCR', 'Delhi'), size: '1200 sqft', price: '₹38,00,000', emi: '₹25,600/mo', status: 'Open' },
]

export function getRegion(id) {
  return regions.find(r => r.id === id) || null
}

export function getArea(id) {
  return areas.find(a => a.id === id) || null
}

export function getAreasByRegion(regionId) {
  return areas.filter(a => a.regionId === regionId)
}

export function getPlot(id) {
  return plots.find(p => p.id === id) || null
}

export function getPlotsByArea(areaId) {
  return plots.filter(p => p.areaId === areaId)
}

export function getPlotsByRegion(regionId) {
  const areaIds = areas.filter(a => a.regionId === regionId).map(a => a.id)
  return plots
    .filter(p => areaIds.includes(p.areaId))
    .map(p => ({
      id: p.id,
      area: p.areaName,
      size: p.size,
      price: p.price,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80',
      isNew: false,
    }))
}

export function formatPlotContext(plot) {
  if (!plot) return ''
  return `${plot.id} · ${plot.areaName}, ${plot.regionName}`
}
