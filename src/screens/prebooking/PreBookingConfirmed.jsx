import { useParams, Link } from 'react-router-dom'
import { getCampaign } from '../../data/campaigns'

const timelineSteps = [
  { label: 'Applied', done: true },
  { label: 'Awaiting Release', done: false },
  { label: 'Plot Selection', done: false },
  { label: 'Final Booking', done: false },
  { label: 'Ownership', done: false },
]

export default function PreBookingConfirmed() {
  const { campaignId } = useParams()
  const campaign = getCampaign(campaignId)

  if (!campaign) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Campaign not found.</p>
        <Link to="/pre-booking" className="text-gold mt-4 inline-block">Back to campaigns</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-6 pb-24">
      <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(212,175,55,0.3)]">
        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">Priority Access Granted</h2>
      <p className="text-gray-400 text-center mb-8">
        You're now part of {campaign.phase} pre-booking. You'll be notified when plot selection opens.
      </p>
      <div className="w-full card p-5 mb-8">
        <div className="space-y-3">
          {timelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${step.done ? 'bg-gold text-base' : 'bg-border text-gray-500'}`}>
                {step.done ? '✔' : i + 1}
              </span>
              <span className={step.done ? 'text-gold' : 'text-gray-400'}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
      <Link to="/portfolio" className="btn-primary w-full text-center py-4 block">
        View Campaign Status
      </Link>
    </div>
  )
}
