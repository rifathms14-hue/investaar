import { Link } from 'react-router-dom'
import { campaigns } from '../../data/campaigns'

const statusStyles = {
  Open: 'border-gold text-gold',
  'Closing Soon': 'border-amber-500 text-amber-500',
  Closed: 'border-gray-600 text-gray-500',
}

function CampaignCard({ campaign }) {
  const statusStyle = statusStyles[campaign.status] || statusStyles.Open
  return (
    <Link
      to={`/pre-booking/${campaign.id}/pool`}
      className="card p-5 block hover:border-gold/50 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          {campaign.regionName} · {campaign.areaName}
        </span>
        <span className={`chip text-xs ${statusStyle}`}>{campaign.status}</span>
      </div>
      <h3 className="text-lg font-semibold mb-1">{campaign.layout} · {campaign.phase}</h3>
      <p className="text-gray-400 text-sm mb-3">Expected release: {campaign.releaseWindow}</p>
      <ul className="text-gray-300 text-sm space-y-1 mb-4">
        {campaign.benefits.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <span className="text-gold text-sm font-medium">Apply for Priority Pre-Booking →</span>
    </Link>
  )
}

export default function PreBookingCampaigns() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <Link to="/" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Pre Book Your Plots</h1>
        <p className="text-gray-400 mt-1 text-sm">Priority access before plot selection opens</p>
      </header>
      <section className="px-6 space-y-4 pb-24">
        {campaigns
          .filter((campaign) => campaign.status !== 'Closed')
          .map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
      </section>
    </div>
  )
}
