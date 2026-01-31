import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPlot } from '../../data/locations'

const TOTAL_PAYMENTS = 24
const timelineSteps = [
  { label: 'Purchase', done: true },
  { label: 'EMI Active', done: true },
  { label: 'Registration Eligible', done: false },
  { label: 'Ownership Complete', done: false },
]

export default function EMIDashboard() {
  const { plotId } = useParams()
  const plot = getPlot(plotId)
  const [paymentsCompleted, setPaymentsCompleted] = useState(6)
  const isComplete = paymentsCompleted >= TOTAL_PAYMENTS

  const plotContextLabel = plot?.areaName && plot?.regionName
    ? `${plot.id} · ${plot.areaName}, ${plot.regionName}`
    : plot?.id || plotId

  if (!plot && !plotId) {
    return (
      <div className="max-w-lg mx-auto p-6">
        <p className="text-gray-400">Plot not found.</p>
        <Link to="/portfolio" className="text-gold mt-4 inline-block">Back to Portfolio</Link>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="max-w-lg mx-auto min-h-screen flex flex-col items-center justify-center p-6 pb-24">
        <div className="w-16 h-16 border-2 border-success flex items-center justify-center mb-6 rounded-full">
          <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Ownership Completed</h2>
        <p className="text-gray-400 text-center mb-8">
          Your plot is now fully registered and verified.
        </p>
        <Link
          to={`/star-frame/${plot?.id || plotId}`}
          className="btn-primary w-full text-center block py-4"
        >
          Customize Investor Star Frame
        </Link>
        <Link to="/portfolio" className="text-gray-400 text-sm mt-4 block text-center hover:text-white">
          Back to Portfolio
        </Link>
      </div>
    )
  }

  const progressPercent = (paymentsCompleted / TOTAL_PAYMENTS) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference

  return (
    <div className="max-w-lg mx-auto pb-24">
      <header className="p-6 pb-4">
        <Link to="/portfolio" className="text-gray-400 hover:text-white text-sm mb-2 inline-block">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Ownership Progress</h1>
        <p className="text-gray-400 mt-1 text-sm">{plotContextLabel}</p>
      </header>
      <section className="px-6 space-y-8">
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-border"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-gold transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gold">{paymentsCompleted}</span>
              <span className="text-gray-500 text-sm">/ {TOTAL_PAYMENTS}</span>
              <span className="text-gray-400 text-xs">payments</span>
            </div>
          </div>
        </div>
        <div className="card p-5 space-y-3">
          {timelineSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                step.done ? 'bg-gold text-base' : 'border border-border text-gray-500'
              }`}>
                {step.done ? '✔' : i + 1}
              </span>
              <span className={step.done ? 'text-gold' : 'text-gray-400'}>{step.label}</span>
            </div>
          ))}
        </div>
        <button className="btn-primary w-full py-4">
          Make Payment
        </button>
        <button
          type="button"
          onClick={() => setPaymentsCompleted(TOTAL_PAYMENTS)}
          className="w-full py-2 text-gray-500 text-sm hover:text-gold transition-colors"
        >
          Simulate completion (demo)
        </button>
      </section>
    </div>
  )
}
