import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'

const plotData = {
  S14: { id: 'S14', price: '₹18,50,000', emi: '₹12,400/mo', advance: '₹3,70,000', legal: '₹45,000' },
  N07: { id: 'N07', price: '₹22,00,000', emi: '₹14,800/mo', advance: '₹4,40,000', legal: '₹52,000' },
}

export default function AllocationFlow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const plot = plotData[id] || { id: id || 'S14', price: '₹18,50,000', emi: '₹12,400/mo', advance: '₹3,70,000', legal: '₹45,000' }

  const [step, setStep] = useState(1)
  const [intentConfirmed, setIntentConfirmed] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)

  const handleConfirm = () => {
    if (step === 1) setStep(2)
    else if (step === 2 && intentConfirmed) setStep(3)
    else if (step === 3) {
      setPaymentDone(true)
      setStep(4)
    }
  }

  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-lg mx-auto">
        <div className="w-16 h-16 border-2 border-success flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          Plot {plot.id} has been allocated to your portfolio.
        </h2>
        <p className="text-gray-400 text-center mb-8">
          You can view your allocation in Portfolio and access records in Records.
        </p>
        <Link
          to="/portfolio"
          className="btn-primary w-full text-center block"
          onClick={() => navigate('/portfolio')}
        >
          View in Portfolio
        </Link>
        <Link to="/" className="text-gray-400 text-sm mt-4 block text-center hover:text-white">
          Return to Market
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen">
      <header className="sticky top-0 bg-base/95 backdrop-blur border-b border-border z-10">
        <Link to={`/plot/${plot.id}`} className="flex items-center gap-2 p-4 text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <p className="text-gray-500 text-sm uppercase tracking-wider">Step {step} of 4</p>
          <h1 className="text-2xl font-bold mt-1">
            {step === 1 && 'Allocation Summary'}
            {step === 2 && 'Intent Confirmation'}
            {step === 3 && 'Payment'}
          </h1>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="card p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Plot</p>
                  <p className="font-semibold text-lg">{plot.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Total price</p>
                  <p className="font-semibold text-xl">{plot.price}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">EMI</p>
                  <p className="font-medium">{plot.emi}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Advance amount</p>
                  <p className="font-medium">{plot.advance}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Legal charges</p>
                  <p className="font-medium">{plot.legal}</p>
                </div>
              </div>
            </div>
            <button onClick={handleConfirm} className="btn-primary w-full">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="card p-5">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={intentConfirmed}
                  onChange={(e) => setIntentConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-gold bg-surface border-border"
                />
                <span className="text-gray-300">
                  I understand this is a legal land allocation and registration process.
                </span>
              </label>
            </div>
            <button
              onClick={handleConfirm}
              disabled={!intentConfirmed}
              className={`w-full py-3 font-semibold border ${
                intentConfirmed
                  ? 'bg-gold text-base border-gold hover:bg-gold-light'
                  : 'bg-surface-elevated text-gray-600 border-border cursor-not-allowed'
              }`}
            >
              Confirm & Continue
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="card p-5 space-y-3">
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold/50 transition-colors">
                <input type="radio" name="payment" defaultChecked className="accent-gold" />
                <span>UPI</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold/50 transition-colors">
                <input type="radio" name="payment" className="accent-gold" />
                <span>Net Banking</span>
              </label>
              <label className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-gold/50 transition-colors">
                <input type="radio" name="payment" className="accent-gold" />
                <span>Card</span>
              </label>
            </div>
            <button onClick={handleConfirm} className="btn-primary w-full">
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
