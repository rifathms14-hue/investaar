const records = [
  { label: 'Approvals', verified: true, plot: 'S14' },
  { label: 'Agreements', verified: true, plot: 'S14' },
  { label: 'Payments', verified: true, plot: 'S14' },
  { label: 'EMI Records', verified: true, plot: 'S14' },
  { label: 'Registration Proof', verified: true, plot: 'S14' },
]

const digitalCerts = [
  { label: 'Allocation Certificate', unlocked: true },
  { label: 'EMI Completion Certificate', unlocked: false },
]

const physicalCollectibles = [
  { label: 'Mini Frame', unlocked: true },
  { label: 'Plot Keychain', unlocked: false },
  { label: 'Registry Day Photo', unlocked: false },
]

export default function Records() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Records</h1>
        <p className="text-gray-400 mt-1">Legal Ground</p>
      </header>

      <section className="px-6 space-y-6 pb-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Plot S14 — Verified Documents
          </h2>
          <div className="space-y-2">
            {records.map((item) => (
              <div
                key={item.label}
                className="card p-4 flex items-center justify-between border-l-2 border-l-success"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-success text-sm">✓</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Digital Certificates
          </h2>
          <div className="space-y-2">
            {digitalCerts.map((item) => (
              <div
                key={item.label}
                className={`card p-4 flex items-center justify-between ${
                  item.unlocked ? 'border-l-2 border-l-gold' : 'opacity-60'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ${item.unlocked ? 'text-gold' : 'text-gray-500'}`}>
                  {item.unlocked ? 'Unlocked' : 'Complete EMI to unlock'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
            Physical Collectibles
          </h2>
          <div className="space-y-2">
            {physicalCollectibles.map((item) => (
              <div
                key={item.label}
                className={`card p-4 flex items-center justify-between ${
                  item.unlocked ? 'border-l-2 border-l-violet' : 'opacity-60'
                }`}
              >
                <span className="font-medium">{item.label}</span>
                <span className={`text-xs ${item.unlocked ? 'text-violet' : 'text-gray-500'}`}>
                  {item.unlocked ? 'Unlocked' : 'Ownership Complete to unlock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
