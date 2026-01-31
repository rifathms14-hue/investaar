import { Link, useParams } from 'react-router-dom'
import { getRegion, getArea, getPlotsByArea, formatPlotContext } from '../../data/locations'

const statusStyles = {
  Open: 'border-gray-500 text-gray-400',
  'High Interest': 'border-gold text-gold',
  Allocated: 'border-gray-600 text-gray-600',
}

export default function PlotList() {
  const { regionId, areaId } = useParams()
  const region = getRegion(regionId)
  const area = getArea(areaId)
  const plotList = getPlotsByArea(areaId || '')

  if (!region || !area) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Region or area not found.</p>
        <Link to="/regions" className="text-gold mt-4 inline-block">Back to regions</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to={`/regions/${regionId}/areas/${areaId}`} className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <p className="text-gray-500 text-xs uppercase tracking-wider">{region.name} · {area.name}</p>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Plots</h1>
      </header>
      <section className="px-6 pb-24">
        <div className="grid grid-cols-2 gap-4">
          {plotList.map((plot) => {
            const statusStyle = statusStyles[plot.status] || statusStyles.Open
            return (
              <Link
                key={plot.id}
                to={`/regions/${regionId}/areas/${areaId}/plot/${plot.id}`}
                state={{ plotCount: 1 }}
                className="card p-4 block overflow-hidden hover:border-gold/50 transition-colors"
              >
                <div className="aspect-[4/3] bg-surface-elevated border-b border-border flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-gold/60">{plot.id}</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold">{plot.id}</span>
                  <span className={`chip text-xs ${statusStyle}`}>{plot.status}</span>
                </div>
                <p className="text-gray-400 text-sm">{plot.size}</p>
                <p className="text-white font-medium text-sm">{plot.price}</p>
                <p className="text-gray-500 text-xs">EMI from {plot.emi}</p>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
