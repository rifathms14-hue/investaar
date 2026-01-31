import { Link, useParams, useNavigate } from 'react-router-dom'
import { getRegionById, getPlotsByRegionId } from '../../data/regionPlots'
import { getRegion, getPlotsByRegion } from '../../data/locations'

export default function RegionPlots() {
  const { regionId } = useParams()
  const navigate = useNavigate()
  const region = getRegionById(regionId) || getRegion(regionId)
  const plots = getPlotsByRegionId(regionId || '').length > 0
    ? getPlotsByRegionId(regionId || '')
    : getPlotsByRegion(regionId || '')

  if (!region) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Region not found.</p>
        <Link to="/" className="text-gold mt-4 inline-block">← Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto pb-8">
      <header className="px-6 pt-6 pb-4">
        <button type="button" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white text-sm mb-3 inline-block">
          ← Back
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Plots in {region.name}</h1>
        <p className="text-gray-400 text-sm mt-1">{plots.length} plots available</p>
      </header>

      <section className="px-6">
        <div className="grid grid-cols-2 gap-3">
          {plots.map((plot) => (
            <Link
              key={plot.id}
              to={`/plot/${plot.id}`}
              className="card overflow-hidden hover:border-gold/50 transition-colors"
            >
              <div className="aspect-[4/3] bg-surface-elevated overflow-hidden relative">
                <img
                  src={plot.image}
                  alt={`Plot ${plot.id}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {plot.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white">
                    NEW
                  </span>
                )}
                <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded">
                  <span className="text-xs font-bold text-gold">{plot.id}</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-gold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  {region.name} · {plot.area}
                </p>
                <p className="font-semibold text-sm mt-0.5">{plot.price}</p>
                <p className="text-gray-400 text-xs">{plot.size}</p>
              </div>
            </Link>
          ))}
        </div>

        {plots.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-12">No plots available in this region yet.</p>
        )}
      </section>
    </div>
  )
}
