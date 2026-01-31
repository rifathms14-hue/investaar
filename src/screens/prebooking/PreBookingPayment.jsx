import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getCampaign } from '../../data/campaigns'
import { Link } from 'react-router-dom'

export default function PreBookingPayment() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const campaign = getCampaign(campaignId)
  const plotCount = location.state?.plotCount ?? 1

  if (!campaign) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Campaign not found.</p>
        <Link to="/pre-booking" className="text-gold mt-4 inline-block">Back to campaigns</Link>
      </div>
    )
  }

  const handleConfirm = () => {
    navigate(`/pre-booking/${campaignId}/success`, { state: { plotCount } })
  }

  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to={`/pre-booking/${campaignId}/request`} className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Confirm Pre-Booking</h1>
        <p className="text-gray-400 mt-1 text-sm">{campaign.regionName} · {campaign.areaName}</p>
      </header>
      <section className="px-6 space-y-6 pb-24">
        <div className="card p-5 space-y-3">
          <p className="text-gray-500 text-xs uppercase tracking-wider">Summary</p>
          <p><span className="text-gray-400">Campaign:</span> {campaign.layout} · {campaign.phase}</p>
          <p><span className="text-gray-400">Region:</span> {campaign.regionName} · {campaign.areaName}</p>
          <p><span className="text-gray-400">Plots requested:</span> {plotCount}</p>
          <p className="text-gray-400 text-sm mt-2">Refund policy and priority window access apply as per terms.</p>
        </div>
        <div className="card p-5 border-l-4 border-l-gold">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Pre-Booking Fee</p>
          <p className="text-xl font-bold text-gold">{campaign.priorityFee}</p>
          <p className="text-gray-500 text-xs mt-1">Non-refundable</p>
        </div>
        <button onClick={handleConfirm} className="btn-primary w-full py-4">
          Confirm Pre-Booking
        </button>
      </section>
    </div>
  )
}
