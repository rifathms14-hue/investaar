import { Link } from 'react-router-dom'

const headerState = {
  layout: 'Greenfield Layout · Phase 1',
  status: 'Allocation in Progress',
  plotsAvailable: 28,
  allocationProgress: 0.65,
}

const filters = ['Size', 'Price', 'Facing', 'Road Access', 'Availability']

const plots = [
  { id: 'S14', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open' },
  { id: 'N07', size: '1500 sqft', price: '₹22,00,000', emi: '₹14,800/mo', status: 'High Interest' },
  { id: 'E22', size: '1000 sqft', price: '₹15,20,000', emi: '₹10,200/mo', status: 'Allocated' },
  { id: 'W09', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open' },
  { id: 'S18', size: '1800 sqft', price: '₹26,00,000', emi: '₹17,500/mo', status: 'High Interest' },
  { id: 'N12', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open' },
]

const marketSignals = [
  '3 plots were allocated today',
  'Road-facing plots are seeing higher interest',
  'Phase 1 nearing full allocation',
]

function StatusChip({ status }) {
  const styles = {
    Open: 'border-gray-500 text-gray-400',
    'High Interest': 'border-gold text-gold',
    Allocated: 'border-gray-600 text-gray-600',
  }
  return (
    <span className={`chip ${styles[status] || styles.Open}`}>{status}</span>
  )
}

function PlotCard({ plot }) {
  return (
    <Link
      to={`/plot/${plot.id}`}
      className="card block p-4 hover:border-gold/50 transition-colors"
    >
      <div className="aspect-[4/3] bg-surface-elevated border border-border mb-4 flex items-center justify-center">
        <span className="text-2xl font-bold text-gold/40">{plot.id}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg tracking-tight">{plot.id}</span>
          <StatusChip status={plot.status} />
        </div>
        <p className="text-gray-400 text-sm">{plot.size}</p>
        <p className="text-white font-medium">{plot.price}</p>
        <p className="text-gray-500 text-xs">EMI from {plot.emi}</p>
      </div>
    </Link>
  )
}

export default function Market() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-4">
        <h1 className="text-2xl font-bold tracking-tight">Market</h1>
      </header>

      <section className="px-6">
        <div className="card p-5 border-l-4 border-l-gold">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">
            {headerState.layout}
          </p>
          <h2 className="text-xl font-semibold mb-1">{headerState.status}</h2>
          <p className="text-gray-400 text-sm">{headerState.plotsAvailable} plots currently available</p>
        </div>

        <div className="mt-6">
          <div className="h-1 bg-border overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${headerState.allocationProgress * 100}%` }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">Inventory updates in real time</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {filters.map((f) => (
            <button
              key={f}
              className="chip border-border text-gray-400 hover:border-gold hover:text-gold transition-colors"
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 mt-8">
        <div className="grid grid-cols-2 gap-4">
          {plots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} />
          ))}
        </div>
      </section>

      <section className="px-6 mt-8 pb-8">
        <div className="space-y-3">
          {marketSignals.map((signal, i) => (
            <div key={i} className="card p-4 border-l border-l-violet/50">
              <p className="text-gray-400 text-sm">{signal}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
