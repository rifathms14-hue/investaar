import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

// Plot-centric records: each plot has its own documents
// status: 'Booked' = in progress, 'Owned' = registration complete
const plotRecords = [
  {
    id: 'S14',
    label: 'Plot S14',
    subtitle: 'OMR, Chennai',
    status: 'Owned',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=240&fit=crop&q=80',
    documents: [
      { label: 'Approvals', verified: true },
      { label: 'Agreements', verified: true },
      { label: 'Payments', verified: true },
      { label: 'EMI Records', verified: true },
      { label: 'Registration Proof', verified: true },
    ],
    digitalCerts: [
      { label: 'Purchase Certificate', unlocked: true },
      { label: 'EMI Completion Certificate', unlocked: false },
    ],
    physicalCollectibles: [
      { label: 'Mini Frame', unlocked: true },
      { label: 'Plot Keychain', unlocked: false },
      { label: 'Registry Day Photo', unlocked: false },
    ],
  },
  {
    id: 'M-22',
    label: 'M-22',
    subtitle: 'Melur, Madurai',
    status: 'Booked',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=240&fit=crop&q=80',
    documents: [
      { label: 'Approvals', verified: true },
      { label: 'Agreements', verified: true },
      { label: 'Payments', verified: true },
      { label: 'EMI Records', verified: true },
      { label: 'Registration Proof', verified: false },
    ],
    digitalCerts: [
      { label: 'Purchase Certificate', unlocked: true },
      { label: 'EMI Completion Certificate', unlocked: false },
    ],
    physicalCollectibles: [
      { label: 'Mini Frame', unlocked: false },
      { label: 'Plot Keychain', unlocked: false },
      { label: 'Registry Day Photo', unlocked: false },
    ],
  },
  {
    id: 'OMR-02',
    label: 'OMR-02',
    subtitle: 'OMR, Chennai',
    status: 'Owned',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=240&fit=crop&q=80',
    documents: [
      { label: 'Approvals', verified: true },
      { label: 'Agreements', verified: true },
      { label: 'Payments', verified: true },
      { label: 'Registration Proof', verified: true },
    ],
    digitalCerts: [
      { label: 'Purchase Certificate', unlocked: true },
      { label: 'EMI Completion Certificate', unlocked: true },
    ],
    physicalCollectibles: [
      { label: 'Mini Frame', unlocked: true },
      { label: 'Plot Keychain', unlocked: true },
      { label: 'Registry Day Photo', unlocked: false },
    ],
  },
  {
    id: 'GF-01',
    label: 'GF-01',
    subtitle: 'Greenfield, Chennai',
    status: 'Booked',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=240&fit=crop&q=80',
    documents: [
      { label: 'Approvals', verified: true },
      { label: 'Agreements', verified: true },
      { label: 'Payments', verified: true },
      { label: 'EMI Records', verified: true },
      { label: 'Registration Proof', verified: false },
    ],
    digitalCerts: [
      { label: 'Purchase Certificate', unlocked: true },
      { label: 'EMI Completion Certificate', unlocked: false },
    ],
    physicalCollectibles: [
      { label: 'Mini Frame', unlocked: false },
      { label: 'Plot Keychain', unlocked: false },
      { label: 'Registry Day Photo', unlocked: false },
    ],
  },
]

function RecordPlotGrid() {
  const [activeFilter, setActiveFilter] = useState('all')

  const bookedCount = plotRecords.filter(p => p.status === 'Booked').length
  const ownedCount = plotRecords.filter(p => p.status === 'Owned').length

  const filterOptions = [
    { id: 'all', label: 'All', count: plotRecords.length },
    { id: 'booked', label: 'Booked', count: bookedCount },
    { id: 'owned', label: 'Owned', count: ownedCount },
  ]

  const filteredPlots = plotRecords.filter((plot) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'booked') return plot.status === 'Booked'
    if (activeFilter === 'owned') return plot.status === 'Owned'
    return true
  })

  return (
    <div className="max-w-lg mx-auto">
      <section className="px-6 pt-2 pb-8">
        <p className="text-gray-400 text-sm mb-4">Legal Ground</p>
        
        {/* Filter Tags */}
        <div className="flex gap-2 mb-4">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`chip transition-all ${
                activeFilter === filter.id
                  ? 'border-gold text-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'border-border text-gray-400 hover:border-gold/50'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredPlots.map((plot) => (
            <Link
              key={plot.id}
              to={`/records/${plot.id}`}
              className="card overflow-hidden p-0 flex flex-col min-h-0 hover:border-gold/40 transition-colors"
            >
              <div className="aspect-[5/3] w-full bg-border shrink-0 overflow-hidden relative">
                <img
                  src={plot.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded ${
                  plot.status === 'Owned' 
                    ? 'bg-success/90 text-white' 
                    : 'bg-violet/90 text-white'
                }`}>
                  {plot.status}
                </span>
              </div>
              <div className="p-3 flex flex-col flex-1 min-w-0">
                <span className="font-bold text-white text-sm">{plot.label}</span>
                <span className="text-xs text-gray-400 mt-0.5 truncate">{plot.subtitle}</span>
                <span className="text-gold text-xs font-medium mt-1.5">View documents →</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredPlots.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-8">No plots found for this filter.</p>
        )}
      </section>
    </div>
  )
}

function RecordPlotDetail({ plot }) {
  const navigate = useNavigate()
  if (!plot) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Plot not found.</p>
        <button type="button" onClick={() => navigate('/records')} className="text-gold mt-2">
          ← Back to Records
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link
          to="/records"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gold text-sm font-medium mb-3"
        >
          ← Back to Records
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">{plot.label} — {plot.subtitle}</h1>
        <p className="text-gray-400 mt-1">All related documents</p>
      </header>

      <section className="px-6 space-y-6 pb-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Verified Documents
          </h2>
          <div className="space-y-2">
            {plot.documents.map((item) => (
              <div
                key={item.label}
                className="card p-4 flex items-center justify-between border-l-2 border-l-success"
              >
                <span className="font-medium">{item.label}</span>
                {item.verified ? (
                  <span className="text-success text-sm">✓</span>
                ) : (
                  <span className="text-gray-500 text-sm">Pending</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Digital Certificates
          </h2>
          <div className="space-y-2">
            {plot.digitalCerts.map((item) => (
              <div
                key={item.label}
                className={`card p-4 flex items-center justify-between ${
                  item.unlocked ? 'border-l-2 border-l-gold' : 'opacity-60'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ${item.unlocked ? 'text-gold' : 'text-gray-500'}`}>
                  {item.unlocked ? 'Unlocked' : 'Complete EMI to unlock'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Physical Collectibles
          </h2>
          <div className="space-y-2">
            {plot.physicalCollectibles.map((item) => (
              <div
                key={item.label}
                className={`card p-4 flex items-center justify-between ${
                  item.unlocked ? 'border-l-2 border-l-violet' : 'opacity-60'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ${item.unlocked ? 'text-violet' : 'text-gray-500'}`}>
                  {item.unlocked ? 'Unlocked' : 'Ownership Complete to unlock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default function Records() {
  const { plotId } = useParams()
  const plot = plotId ? plotRecords.find((p) => p.id === plotId) : null

  if (plotId) {
    return <RecordPlotDetail plot={plot} />
  }
  return <RecordPlotGrid />
}
