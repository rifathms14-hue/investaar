const holdings = [
  { id: 'S14', status: 'Registered', progress: 95, type: 'EMI Active' },
  { id: 'N07', status: 'Reserved', progress: 15, type: 'EMI Active' },
  { id: 'E22', status: 'Ownership Complete', progress: 100, type: 'Full Payment' },
]

function StatusChip({ status }) {
  const styles = {
    Reserved: 'border-gold text-gold',
    'EMI Active': 'border-violet text-violet',
    Registered: 'border-success text-success',
    'Ownership Complete': 'border-success text-success bg-success/5',
  }
  return (
    <span className={`chip ${styles[status] || 'border-gray-500 text-gray-400'}`}>
      {status}
    </span>
  )
}

function PlotCard({ plot }) {
  return (
    <div className="card p-5 hover:border-gold/30 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xl font-bold tracking-tight">{plot.id}</span>
        <StatusChip status={plot.status} />
      </div>
      <div className="flex justify-between text-sm text-gray-400 mb-3">
        <span>{plot.progress}% complete</span>
        <span>{plot.type}</span>
      </div>
      <div className="h-1 bg-border overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-500"
          style={{ width: `${plot.progress}%` }}
        />
      </div>
    </div>
  )
}

export default function Portfolio() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-gray-400 mt-1">Your Asset Holdings</p>
      </header>

      <section className="px-6 space-y-4 pb-8">
        {holdings.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </section>
    </div>
  )
}
