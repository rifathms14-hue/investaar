import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="max-w-lg mx-auto p-6 pb-24">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Terms</h1>
        <p className="text-gray-400 mt-1 text-sm">Purchase and ownership terms</p>
      </header>
      <div className="card p-6 space-y-4 text-gray-300 text-sm">
        <p>
          This is a placeholder for purchase and ownership terms. Legal copy will be provided separately.
        </p>
        <p>
          By using Investaar you agree to the purchase process, refund policy, and registration terms applicable to your region and phase.
        </p>
      </div>
      <div className="mt-6">
        <Link to="/" className="text-gold hover:underline text-sm font-medium">
          Back to Market
        </Link>
      </div>
    </div>
  )
}
