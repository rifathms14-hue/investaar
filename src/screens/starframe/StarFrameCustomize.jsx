import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPlot } from '../../data/locations'

export default function StarFrameCustomize() {
  const { plotId } = useParams()
  const navigate = useNavigate()
  const plot = getPlot(plotId)
  const [recipientName, setRecipientName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [message, setMessage] = useState('')

  const plotReference = plot?.areaName && plot?.regionName
    ? `${plot?.id || plotId} · ${plot.areaName}, ${plot.regionName}`
    : plot?.id || plotId

  const handleConfirm = () => {
    navigate(`/star-frame/${plotId}/delivery`, {
      state: { recipientName, occasion, message },
    })
  }

  return (
    <div className="max-w-lg mx-auto pb-24">
      <header className="p-6 pb-4">
        <Link to="/portfolio" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create Your Investor Star Frame</h1>
        <p className="text-gray-400 mt-1 text-sm">Personalize your ownership milestone</p>
      </header>
      <section className="px-6 space-y-6">
        <div className="card p-5 space-y-4">
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">Recipient Name</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Enter name"
              className="w-full px-4 py-3 bg-surface-elevated border border-border text-white placeholder-gray-500 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">Occasion (Optional)</label>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. Registry day"
              className="w-full px-4 py-3 bg-surface-elevated border border-border text-white placeholder-gray-500 focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional message"
              rows={3}
              className="w-full px-4 py-3 bg-surface-elevated border border-border text-white placeholder-gray-500 focus:border-gold outline-none transition-colors resize-none"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-2">Plot Reference</label>
            <p className="font-medium text-gold">{plotReference}</p>
            <p className="text-gray-500 text-xs mt-1">Auto-filled</p>
          </div>
        </div>
        <div className="card p-5 aspect-video flex items-center justify-center bg-surface-elevated">
          <p className="text-gray-500 text-sm">Live preview (3D frame / door / plaque)</p>
        </div>
        <button
          onClick={handleConfirm}
          disabled={!recipientName.trim()}
          className="btn-primary w-full py-4 disabled:opacity-50 disabled:pointer-events-none"
        >
          Confirm Design
        </button>
      </section>
    </div>
  )
}
