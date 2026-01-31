import { Link } from 'react-router-dom'
import { regions } from '../../data/locations'

const statusStyles = {
  Open: 'border-gold text-gold',
  'Final Bookings': 'border-amber-500 text-amber-500',
}

function RegionCard({ region }) {
  const statusStyle = statusStyles[region.status] || 'border-gray-500 text-gray-400'
  return (
    <Link
      to={`/regions/${region.id}/plots`}
      className="card overflow-hidden flex flex-col hover:border-gold/50 transition-colors"
    >
      {/* City image - top, no padding/margin */}
      <div className="aspect-[4/3] bg-surface-elevated shrink-0">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      {/* Content - bottom */}
      <div className="p-3 flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm truncate">{region.name}</h3>
            <p className="text-gray-400 text-xs mt-0.5 truncate">{region.phasesSummary}</p>
          </div>
          <span className={`chip text-[10px] shrink-0 ${statusStyle}`}>{region.status}</span>
        </div>
        <span className="text-gold text-xs font-medium mt-2 inline-block">Enter →</span>
      </div>
    </Link>
  )
}

export default function ActiveRegions() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to="/" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Active Regions</h1>
        <p className="text-gray-400 mt-1 text-sm">Select a city to view areas and plots</p>
      </header>
      <section className="px-6 grid grid-cols-2 gap-3 pb-24">
        {regions.map((region) => (
          <RegionCard key={region.id} region={region} />
        ))}
      </section>
    </div>
  )
}
