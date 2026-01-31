import { Link } from 'react-router-dom'

const holdings = [
  { id: 'M-22', areaName: 'Melur', regionName: 'Madurai', status: 'EMI Active', progress: 25, type: 'EMI Active', bookedOn: '10 Jan 2025', nextEmiDate: '15 Feb 2026' },
  { id: 'GF-01', areaName: 'Greenfield', regionName: 'Chennai', status: 'Reserved', progress: 15, type: 'EMI Active', bookedOn: '5 Dec 2025', nextEmiDate: '20 Feb 2026' },
  { id: 'OMR-02', areaName: 'OMR', regionName: 'Chennai', status: 'Ownership Complete', progress: 100, type: 'Full Payment', bookedOn: '1 Aug 2024', documentationDate: '15 Sep 2024', nextStepsSnippet: 'Claim your Star Frame or view records.' },
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
      <section className="px-6 pt-2 space-y-4 pb-8">
        <p className="text-gray-400 text-sm">Your Asset Holdings</p>
        {holdings.map((plot) => (
          <PlotCard key={plot.id} plot={plot} />
        ))}
      </section>
    </div>
  )
}
