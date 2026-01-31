import { Link, useParams } from 'react-router-dom'
import { getRegion, getAreasByRegion } from '../../data/locations'

const statusStyles = {
  Open: 'border-gold text-gold',
  'Final Bookings': 'border-amber-500 text-amber-500',
}

export default function AreaList() {
  const { regionId } = useParams()
  const region = getRegion(regionId)
  const areas = getAreasByRegion(regionId || '')

  if (!region) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Region not found.</p>
        <Link to="/regions" className="text-gold mt-4 inline-block">Back to regions</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to="/regions" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Areas in {region.name}</h1>
        <p className="text-gray-400 mt-1 text-sm">Select an area to view plots</p>
      </header>
      <section className="px-6 space-y-4 pb-24">
        {areas.map((area) => {
          const statusStyle = statusStyles[area.status] || 'border-gray-500 text-gray-400'
          return (
            <Link
              key={area.id}
              to={`/regions/${regionId}/areas/${area.id}`}
              className="card p-5 block hover:border-gold/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{area.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{area.phase} · {area.plotCount} plots</p>
                </div>
                <span className={`chip text-xs ${statusStyle}`}>{area.status}</span>
              </div>
              <span className="text-gold text-sm font-medium mt-3 inline-block">View Plots →</span>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
