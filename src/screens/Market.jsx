import { Link } from 'react-router-dom'

const headerState = {
  layout: 'Greenfield Layout · Phase 1',
  status: 'Allocation in Progress',
  plotsAvailable: 28,
  allocationProgress: 0.65,
}

const filters = ['Size', 'Price', 'Facing', 'Road Access', 'Availability']

const plots = [
  { id: 'S14', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80' },
  { id: 'N07', size: '1500 sqft', price: '₹22,00,000', emi: '₹14,800/mo', status: 'High Interest', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80&sat=-20' },
  { id: 'W09', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80&contrast=10' },
  { id: 'S18', size: '1800 sqft', price: '₹26,00,000', emi: '₹17,500/mo', status: 'High Interest', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80&hue=15' },
  { id: 'N12', size: '1200 sqft', price: '₹18,50,000', emi: '₹12,400/mo', status: 'Open', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80&sepia=20' },
  { id: 'E15', size: '1350 sqft', price: '₹20,00,000', emi: '₹13,500/mo', status: 'Open', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop&q=80' },
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
      className="card block overflow-hidden hover:border-gold/50 transition-colors"
    >
      <div className="aspect-[4/3] bg-surface-elevated border-b border-border overflow-hidden relative">
        <img 
          src={plot.image} 
          alt={`Plot ${plot.id}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-surface-elevated"><span class="text-2xl font-bold text-gold/40">${plot.id}</span></div>`;
          }}
        />
        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded">
          <span className="text-sm font-bold text-gold">{plot.id}</span>
        </div>
      </div>
      <div className="p-4 space-y-1">
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
  const totalPlots = 32
  // Use headerState for available plots (source of truth)
  const plotsAvailable = headerState.plotsAvailable
  // Calculate plots booked as total minus available
  const plotsBooked = totalPlots - plotsAvailable
  // Calculate progress percentage based on booked plots
  const allocationProgress = plotsBooked / totalPlots
  
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
          <p className="text-gray-400 text-sm">{plotsAvailable} plots currently available</p>
        </div>

        <div className="mt-6">
          <div className="h-1 bg-border overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{ 
                width: `${allocationProgress * 100}%`,
                background: 'linear-gradient(to right, #D4AF37, #7C3AED)'
              }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {plotsAvailable} plots available · {plotsBooked} plots booked
          </p>
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

      {/* Market Signals Ticker */}
      <section className="mt-8 pb-8 overflow-hidden">
        <div className="bg-violet/10 border-y border-violet/30 py-3">
          <div className="flex animate-ticker whitespace-nowrap">
            {[...marketSignals, ...marketSignals].map((signal, i) => (
              <div key={i} className="flex items-center px-6">
                <span className="w-1.5 h-1.5 bg-violet mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
