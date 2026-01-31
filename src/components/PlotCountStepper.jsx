const MIN_PLOTS = 1
const MAX_PLOTS = 4

export default function PlotCountStepper({ value, onChange, min = MIN_PLOTS, max = MAX_PLOTS }) {
  const count = Math.max(min, Math.min(max, value))

  const decrement = () => {
    if (count > min) onChange(count - 1)
  }

  const increment = () => {
    if (count < max) onChange(count + 1)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={decrement}
        disabled={count <= min}
        className="w-10 h-10 flex items-center justify-center border border-border bg-surface text-gray-400 hover:text-gold hover:border-gold disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Decrease plot count"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>
      <span className="text-2xl font-bold text-gold min-w-[2rem] text-center">{count}</span>
      <button
        type="button"
        onClick={increment}
        disabled={count >= max}
        className="w-10 h-10 flex items-center justify-center border border-border bg-surface text-gray-400 hover:text-gold hover:border-gold disabled:opacity-40 disabled:pointer-events-none transition-colors"
        aria-label="Increase plot count"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}
