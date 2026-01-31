import { useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { getPlot } from '../../data/locations'

const deliveryOptions = [
  { id: 'home', label: 'Home delivery', description: 'Delivered to your address' },
  { id: 'registry', label: 'Registry day handover', description: 'Collect on registry day' },
]

export default function StarFrameDelivery() {
  const { plotId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const plot = getPlot(plotId)
  const [deliveryOption, setDeliveryOption] = useState('home')

  const handleConfirm = () => {
    navigate(`/star-frame/${plotId}/complete`, {
      state: { ...location.state, deliveryOption },
    })
  }

  return (
    <div className="max-w-lg mx-auto pb-24">
      <header className="p-6 pb-4">
        <Link to={`/star-frame/${plotId}`} className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Delivery Details</h1>
        <p className="text-gray-400 mt-1 text-sm">Choose how you want to receive your Star Frame</p>
      </header>
      <section className="px-6 space-y-6">
        <div className="space-y-3">
          {deliveryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDeliveryOption(opt.id)}
              className={`w-full card p-5 text-left transition-all ${
                deliveryOption === opt.id ? 'border-2 border-gold' : 'hover:border-gold/50'
              }`}
            >
              <p className="font-semibold">{opt.label}</p>
              <p className="text-gray-400 text-sm mt-1">{opt.description}</p>
            </button>
          ))}
        </div>
        <button onClick={handleConfirm} className="btn-primary w-full py-4">
          Confirm Delivery
        </button>
      </section>
    </div>
  )
}
