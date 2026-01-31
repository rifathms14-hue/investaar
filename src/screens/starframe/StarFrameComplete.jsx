import { Link, useParams } from 'react-router-dom'
import { getPlot } from '../../data/locations'

export default function StarFrameComplete() {
  const { plotId } = useParams()
  const plot = getPlot(plotId)

  const plotReference = plot?.areaName && plot?.regionName
    ? `${plot?.id || plotId} · ${plot.areaName}, ${plot.regionName}`
    : plot?.id || plotId

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-6 pb-24">
      <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-6 rounded-full">
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">Milestone Recorded</h2>
      <p className="text-gray-400 text-center mb-8">
        This ownership milestone has been added to your records.
      </p>
      <p className="text-gray-500 text-sm text-center mb-8">{plotReference}</p>
      <Link to="/records" className="btn-primary w-full text-center block py-4">
        View in Records
      </Link>
      <Link to="/portfolio" className="text-gray-400 text-sm mt-4 block text-center hover:text-white">
        Back to Portfolio
      </Link>
    </div>
  )
}
