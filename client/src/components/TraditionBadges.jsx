const TRADITION_LABELS = {
  catholic: 'Catholic',
  eastern_orthodox: 'Eastern Orthodox',
  protestant: 'Protestant'
}

const VERDICT_STYLES = {
  heresy: 'bg-red-900/40 text-red-300 border border-red-700/50',
  orthodox: 'bg-green-900/40 text-green-300 border border-green-700/50',
  disputed: 'bg-amber-900/40 text-amber-300 border border-amber-700/50'
}

export default function TraditionBadges({ consensus }) {
  if (!consensus) return null

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(consensus).map(([tradition, verdict]) => (
        <div
          key={tradition}
          className={`flex flex-col items-center px-3 py-2 rounded-lg text-xs ${VERDICT_STYLES[verdict] ?? VERDICT_STYLES.disputed}`}
        >
          <span className="font-semibold uppercase tracking-wider opacity-70 mb-0.5">
            {TRADITION_LABELS[tradition] ?? tradition}
          </span>
          <span className="font-bold capitalize">{verdict}</span>
        </div>
      ))}
    </div>
  )
}
