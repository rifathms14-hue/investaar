import { Link, useParams, useNavigate } from 'react-router-dom'
import { getCampaign } from '../../data/campaigns'

export default function AllocationPoolOverview() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const campaign = getCampaign(campaignId)

  if (!campaign) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Campaign not found.</p>
        <Link to="/pre-booking" className="text-gold mt-4 inline-block">Back to campaigns</Link>
      </div>
    )
  }

  const handleSelectPlots = () => {
    navigate(`/pre-booking/${campaignId}/request`)
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to="/pre-booking" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Pre-Booking Pool Overview</h1>
        <p className="text-gray-400 mt-1 text-sm">{campaign.regionName} · {campaign.areaName}</p>
      </header>
      <section className="px-6 space-y-6 pb-24">
        {/* Master layout map placeholder (blurred) */}
        <div className="card overflow-hidden aspect-video bg-surface-elevated flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-full h-32 bg-border/50 blur-sm rounded mb-4" />
            <p className="text-gray-500 text-sm">Master layout map</p>
            <p className="text-gray-600 text-xs mt-1">Plot zones highlighted on release</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total plots</p>
            <p className="font-semibold">{campaign.totalPlots}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Plot size range</p>
            <p className="font-semibold text-sm">{campaign.sizeRange}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Estimated price band</p>
            <p className="font-semibold text-sm">{campaign.priceBand}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">EMI availability</p>
            <p className="font-semibold">{campaign.emiAvailable ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <button onClick={handleSelectPlots} className="btn-primary w-full py-4">
          Select Number of Plots
        </button>
      </section>
    </div>
  )
}
