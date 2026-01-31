import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getRegion, getArea } from '../../data/locations'
import PlotCountStepper from '../../components/PlotCountStepper'
import { Link } from 'react-router-dom'

export default function AllocationSize() {
  const { regionId, areaId } = useParams()
  const navigate = useNavigate()
  const region = getRegion(regionId)
  const area = getArea(areaId)
  const [plotCount, setPlotCount] = useState(1)

  if (!region || !area) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Region or area not found.</p>
        <Link to="/regions" className="text-gold mt-4 inline-block">Back to regions</Link>
      </div>
    )
  }

  const handleContinue = () => {
    navigate(`/regions/${regionId}/areas/${areaId}/plots`, { state: { plotCount } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to={`/regions/${regionId}`} className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <p className="text-gray-500 text-xs uppercase tracking-wider">{region.name} · {area.name}</p>
        <h1 className="text-2xl font-bold tracking-tight mt-1">Number of Plots</h1>
      </header>
      <section className="px-6 space-y-6 pb-24">
        <div className="card p-6">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Number of plots</p>
          <PlotCountStepper value={plotCount} onChange={setPlotCount} />
        </div>
        <p className="text-gray-400 text-sm text-center">
          Multiple plots can be managed under a single ownership record.
        </p>
        <button onClick={handleContinue} className="btn-primary w-full py-4">
          Continue
        </button>
      </section>
    </div>
  )
}
