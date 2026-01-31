import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getCampaign } from '../../data/campaigns'
import PlotCountStepper from '../../components/PlotCountStepper'
import { Link } from 'react-router-dom'

export default function AllocationRequest() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const campaign = getCampaign(campaignId)
  const [plotCount, setPlotCount] = useState(1)

  if (!campaign) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Campaign not found.</p>
        <Link to="/pre-booking" className="text-gold mt-4 inline-block">Back to campaigns</Link>
      </div>
    )
  }

  const handleContinue = () => {
    navigate(`/pre-booking/${campaignId}/confirm`, { state: { plotCount } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to={`/pre-booking/${campaignId}/pool`} className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Pre-Booking Request</h1>
        <p className="text-gray-400 mt-1 text-sm">{campaign.regionName} · {campaign.areaName}</p>
      </header>
      <section className="px-6 space-y-6 pb-24">
        <div className="card p-6">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Number of plots</p>
          <PlotCountStepper value={plotCount} onChange={setPlotCount} />
        </div>
        <div className="card p-4 bg-gold/5 border-gold/30">
          <p className="text-gray-300 text-sm">
            Priority pre-booking secures your spot. Final plot allocation occurs on phase release.
          </p>
        </div>
        <button onClick={handleContinue} className="btn-primary w-full py-4">
          Continue
        </button>
      </section>
    </div>
  )
}
