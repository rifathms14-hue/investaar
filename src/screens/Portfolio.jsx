import { Link } from 'react-router-dom'

const holdings = [
  { id: 'M-22', areaName: 'Melur', regionName: 'Madurai', status: 'EMI Active', progress: 25, type: 'EMI Active', bookedOn: '10 Jan 2025', nextEmiDate: '15 Feb 2026', valuation: 1850000, emiTenureMonths: 36, emiRemainingMonths: 27, pendingEmiValue: 1387500 },
  { id: 'GF-01', areaName: 'Greenfield', regionName: 'Chennai', status: 'Reserved', progress: 15, type: 'EMI Active', bookedOn: '5 Dec 2025', nextEmiDate: '20 Feb 2026', valuation: 2200000, emiTenureMonths: 36, emiRemainingMonths: 33, pendingEmiValue: 1870000 },
  { id: 'OMR-02', areaName: 'OMR', regionName: 'Chennai', status: 'Ownership Complete', progress: 100, type: 'Full Payment', bookedOn: '1 Aug 2024', documentationDate: '15 Sep 2024', nextStepsSnippet: 'Claim your Star Frame or view records.', valuation: 1520000 },
]

// Summary derived from holdings
const totalValuation = holdings.reduce((sum, p) => sum + (p.valuation || 0), 0)
const emiHoldings = holdings.filter((p) => p.type === 'EMI Active')
const pendingEmiTenures = emiHoldings.length
const pendingEmiValue = emiHoldings.reduce((sum, p) => sum + (p.pendingEmiValue || 0), 0)
const starFramesCollected = holdings.filter((p) => p.status === 'Ownership Complete').length

function formatLakhs (n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`
  return `₹${(n / 1000).toFixed(0)}K`
}

function PortfolioSummary() {
  return (
    <div 
      className="card p-5 mb-6 relative overflow-hidden"
      style={{
        boxShadow: `
          inset 0 0 30px rgba(212, 175, 55, 0.08),
          inset 0 0 15px rgba(124, 58, 237, 0.05),
          0 0 20px rgba(212, 175, 55, 0.05),
          0 0 10px rgba(124, 58, 237, 0.03)
        `,
        position: 'relative'
      }}
    >
      {/* Holographic gradient overlay - very subtle */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15 animate-holographic"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(212, 175, 55, 0.04) 0%,
              transparent 25%,
              transparent 50%,
              rgba(124, 58, 237, 0.04) 75%,
              rgba(212, 175, 55, 0.02) 100%
            )
          `,
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Inner glow effect - very subtle */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.06) 0%, transparent 40%)
          `,
          mixBlendMode: 'screen',
          opacity: 0.5
        }}
      />
      
      <div className="relative z-10">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Portfolio at a glance</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total valuation</p>
            <p className="text-xl font-bold text-white mt-0.5">{formatLakhs(totalValuation)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Pending EMI</p>
            <p className="text-xl font-bold text-violet mt-0.5">{pendingEmiTenures} tenure{pendingEmiTenures !== 1 ? 's' : ''}</p>
            <p className="text-sm text-gray-400 mt-0.5">{formatLakhs(pendingEmiValue)} remaining</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Star frames</p>
            <p className="text-xl font-bold text-gold mt-0.5">{starFramesCollected} collected</p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  const contextLabel = plot.areaName && plot.regionName
    ? `${plot.id} · ${plot.areaName}, ${plot.regionName}`
    : plot.id
  const isEMIBased = plot.type === 'EMI Active'
  const isOwnershipComplete = plot.status === 'Ownership Complete'
  const isCompletedOrOneTime = isOwnershipComplete || plot.type === 'Full Payment'
  const Wrapper = isEMIBased ? Link : 'div'
  const wrapperProps = isEMIBased ? { to: `/portfolio/emi/${plot.id}` } : {}

  return (
    <Wrapper {...wrapperProps} className="card p-5 hover:border-gold/30 transition-colors block">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xl font-bold tracking-tight">{contextLabel}</span>
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

      {/* EMI-based: next EMI date + booked on */}
      {isEMIBased && (plot.nextEmiDate || plot.bookedOn) && (
        <div className="mt-3 pt-3 border-t border-border space-y-1 text-sm text-gray-400">
          {plot.bookedOn && <p>Booked on {plot.bookedOn}</p>}
          {plot.nextEmiDate && <p>Next EMI {plot.nextEmiDate}</p>}
        </div>
      )}
      {isEMIBased && (
        <p className="text-gold text-sm font-medium mt-3">View progress →</p>
      )}

      {/* Completed / one-time: booked on + documentation + next steps */}
      {isCompletedOrOneTime && (plot.bookedOn || plot.documentationDate) && (
        <div className="mt-3 pt-3 border-t border-border space-y-1 text-sm text-gray-400">
          {plot.bookedOn && <p>Booked on {plot.bookedOn}</p>}
          {plot.documentationDate && <p>Documentation {plot.documentationDate}</p>}
        </div>
      )}
      {isCompletedOrOneTime && plot.nextStepsSnippet && (
        <p className="mt-2 text-xs text-gold/90">{plot.nextStepsSnippet}</p>
      )}
      {isOwnershipComplete && (
        <Link
          to={`/star-frame/${plot.id}`}
          className="mt-3 block w-full py-2 px-3 rounded bg-gold/10 border border-gold/40 text-gold text-sm font-medium text-center hover:bg-gold/20 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Claim your customized Star Frame
        </Link>
      )}
    </Wrapper>
  )
}

export default function Portfolio() {
  return (
    <div className="max-w-lg mx-auto">
      <header className="p-6 pb-2">
        <h1 className="text-2xl font-bold tracking-tight">Portfolio</h1>
        <p className="text-gray-400 mt-1">Your Asset Holdings</p>
      </header>
      <section className="px-6 pt-2 space-y-4 pb-8">
        <PortfolioSummary />
        <p className="text-gray-400 text-sm -mt-2">Holdings</p>
        {holdings.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </section>
    </div>
  )
}
