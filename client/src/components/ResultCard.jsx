import TraditionBadges from './TraditionBadges.jsx'

const VERDICT_CONFIG = {
  heresy: {
    label: 'Heresy',
    bg: 'bg-red-950/60',
    border: 'border-red-700/60',
    badge: 'bg-red-700 text-white',
    headerText: 'text-red-300'
  },
  caution: {
    label: 'Caution',
    bg: 'bg-amber-950/40',
    border: 'border-amber-700/60',
    badge: 'bg-amber-600 text-white',
    headerText: 'text-amber-300'
  },
  orthodox: {
    label: 'Orthodox',
    bg: 'bg-green-950/40',
    border: 'border-green-700/60',
    badge: 'bg-green-700 text-white',
    headerText: 'text-green-300'
  }
}

const CONFIDENCE_LABEL = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Low confidence'
}

export default function ResultCard({ result }) {
  if (!result) return null

  const config = VERDICT_CONFIG[result.verdict] ?? VERDICT_CONFIG.caution

  return (
    <div className={`rounded-xl border ${config.bg} ${config.border} overflow-hidden`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${config.badge} w-fit`}>
            {config.label}
          </span>
          {result.heresy_name && (
            <h2 className={`text-xl font-bold mt-1 ${config.headerText}`}>
              {result.heresy_name}
            </h2>
          )}
        </div>
        {result.confidence && (
          <span className="text-xs text-slate-500 italic mt-1">
            {CONFIDENCE_LABEL[result.confidence]}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-5">
        {/* Explanation */}
        <p className="text-slate-300 leading-relaxed text-sm">
          {result.explanation}
        </p>

        {/* Tradition consensus */}
        {result.tradition_consensus && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Tradition Consensus
            </h3>
            <TraditionBadges consensus={result.tradition_consensus} />
          </div>
        )}

        {/* Tradition note */}
        {result.tradition_note && (
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg px-4 py-3">
            <p className="text-amber-200/80 text-sm leading-relaxed">
              <span className="font-semibold text-amber-300">Note: </span>
              {result.tradition_note}
            </p>
          </div>
        )}

        {/* Related heresies */}
        {result.related_heresies && result.related_heresies.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Related Heresies
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.related_heresies.map(h => (
                <span
                  key={h}
                  className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Historical note */}
        {result.historical_note && (
          <div className="border-t border-white/10 pt-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Historical Context
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              {result.historical_note}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
