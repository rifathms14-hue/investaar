import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { getPlot } from '../data/locations'

const defaultPlotData = (id) => ({
  id: id || 'M-22',
  price: '₹18,50,000',
  emi: '₹12,400/mo',
  advance: '₹3,70,000',
  legal: '₹45,000',
  areaName: 'Melur',
  regionName: 'Madurai',
})

const nextSteps = [
  'KYC Verification',
  'Agreement Signing',
  'Registration Scheduling',
  'Ownership Completion',
]

export default function AllocationFlow() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const purchaseTypeFromState = location.state?.purchaseType
  const regionId = location.state?.regionId
  const areaId = location.state?.areaId

  const locationPlot = getPlot(id)
  const plot = locationPlot
    ? {
        ...defaultPlotData(id),
        ...locationPlot,
        price: locationPlot.price,
        emi: locationPlot.emi,
        advance: '₹3,70,000',
        legal: '₹45,000',
      }
    : defaultPlotData(id)

  const plotContextLabel = plot.areaName && plot.regionName
    ? `${plot.id} (${plot.areaName}, ${plot.regionName})`
    : plot.id

  const [step, setStep] = useState(1)
  const [purchaseType, setPurchaseType] = useState(purchaseTypeFromState || null)
  const [intentConfirmed, setIntentConfirmed] = useState(false)

  useEffect(() => {
    if (purchaseTypeFromState) {
      setPurchaseType(purchaseTypeFromState)
      setStep(2)
    }
  }, [purchaseTypeFromState])

  const totalSteps = purchaseTypeFromState ? 3 : 4

  const handleContinue = () => {
    if (step === 1 && purchaseType) setStep(2)
    else if (step === 2 && intentConfirmed) setStep(3)
    else if (step === 3) setStep(4)
  }

  const plotDetailUrl = regionId && areaId
    ? `/regions/${regionId}/areas/${areaId}/plot/${plot.id}`
    : `/plot/${plot.id}`

  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-lg mx-auto pb-24">
        <div className="w-16 h-16 border-2 border-success flex items-center justify-center mb-6 rounded-full">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">
          Purchase Successful
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Plot {plotContextLabel} is now part of your portfolio.
        </p>
        <div className="w-full card p-5 mb-8">
          <p className="text-gray-500 text-xs uppercase tracking-wider mb-3">Next steps</p>
          <ul className="space-y-2">
            {nextSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 flex items-center justify-center border border-border text-gray-500 text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-300">{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/portfolio" className="btn-primary w-full text-center block py-4">
          View in Portfolio
        </Link>
        <Link to="/" className="text-gray-400 text-sm mt-4 block text-center hover:text-white">
          Return to Market
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen pb-24">
      <header className="sticky top-0 bg-base/95 backdrop-blur border-b border-border z-10">
        <Link
          to={step === 1 && !purchaseTypeFromState ? plotDetailUrl : plotDetailUrl}
          className="flex items-center gap-2 p-4 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Link>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <p className="text-gray-500 text-sm uppercase tracking-wider">
            Step {step} of {totalSteps}
          </p>
          <h1 className="text-2xl font-bold mt-1">
            {step === 1 && 'Ownership Path'}
            {step === 2 && 'Confirm Purchase'}
            {step === 3 && 'Payment'}
          </h1>
        </div>

        {step === 1 && !purchaseTypeFromState && (
          <div className="space-y-6">
            <p className="text-gray-400 text-sm">Choose how you want to complete your purchase.</p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setPurchaseType('full')}
                className={`w-full card p-5 text-left transition-all ${
                  purchaseType === 'full' ? 'border-2 border-gold' : 'hover:border-gold/50'
                }`}
              >
                <p className="font-semibold text-lg">Full Payment</p>
                <p className="text-gray-400 text-sm mt-1">Immediate documentation process</p>
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('emi')}
                className={`w-full card p-5 text-left transition-all ${
                  purchaseType === 'emi' ? 'border-2 border-gold' : 'hover:border-gold/50'
                }`}
              >
                <p className="font-semibold text-lg">EMI</p>
                <p className="text-gray-400 text-sm mt-1">Monthly ownership progression</p>
              </button>
            </div>
            <button
              onClick={handleContinue}
              disabled={!purchaseType}
              className="btn-primary w-full py-4 disabled:opacity-50 disabled:pointer-events-none"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="card p-5 space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Plot(s)</p>
                <p className="font-semibold text-lg">{plotContextLabel}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Total cost</p>
                <p className="font-semibold text-xl">{plot.price}</p>
              </div>
              {purchaseType === 'emi' && (
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">EMI</p>
                  <p className="font-medium">{plot.emi}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Legal charges</p>
                <p className="font-medium">{plot.legal}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Registration fees</p>
                <p className="font-medium">Included</p>
              </div>
            </div>
            <div className="card p-5">
              <label className="flex items-start gap-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={intentConfirmed}
                  onChange={(e) => setIntentConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-gold bg-surface border-border"
                />
                <span className="text-gray-300 text-sm">
                  I understand this is a legal land purchase and registration process.
                </span>
              </label>
            </div>
            <button
              onClick={handleContinue}
              disabled={!intentConfirmed}
              className="btn-primary w-full py-4 disabled:opacity-50 disabled:pointer-events-none"
            >
              Complete Purchase
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
            <button onClick={handleContinue} className="btn-primary w-full py-4">
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
