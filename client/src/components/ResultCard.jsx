import TraditionBadges from './TraditionBadges.jsx'

const VERDICT_CONFIG = {
  heresy: {
    bg: 'bg-red-950/60',
    border: 'border-red-700/60',
    badge: 'bg-red-700 text-white',
    headerText: 'text-red-300'
  },
  caution: {
    bg: 'bg-amber-950/40',
    border: 'border-amber-700/60',
    badge: 'bg-amber-600 text-white',
    headerText: 'text-amber-300'
  },
  orthodox: {
    bg: 'bg-green-950/40',
    border: 'border-green-700/60',
    badge: 'bg-green-700 text-white',
    headerText: 'text-green-300'
  },
  partial: {
    bg: 'bg-slate-800/60',
    border: 'border-slate-600/60',
    badge: 'bg-slate-600 text-white',
    headerText: 'text-slate-300'
  }
}

const CONFIDENCE_LABEL = {
  high: 'High confidence',
  moderate: 'Moderate confidence',
  low: 'Low confidence'
}

const EXPLANATION_SECTIONS = [
  { key: 'why_it_matches',        label: 'Why It Matches' },
  { key: 'historical_context',    label: 'Historical Context' },
  { key: 'why_condemned',         label: 'Why It Was Condemned' },
  { key: 'orthodox_alternative',  label: 'The Orthodox Alternative' },
]

export default function ResultCard({ result }) {
  if (!result) return null

  const config = VERDICT_CONFIG[result.verdict] ?? VERDICT_CONFIG.caution
  const match = result.primary_match
  const exp = result.explanation ?? {}

  return (
    <div className={`rounded-xl border ${config.bg} ${config.border} overflow-hidden`}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold tracking-wide ${config.badge} w-fit`}>
            {result.display_verdict}
          </span>
          {match?.name && (
            <h2 className={`text-xl font-bold mt-1 ${config.headerText}`}>
              {match.name}
              {match.period && (
                <span className="text-sm font-normal text-slate-400 ml-2">· {match.period}</span>
              )}
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

        {/* What the statement claims — intro sentence */}
        {exp.what_the_statement_claims && (
          <p className="text-slate-300 leading-relaxed text-sm italic border-l-2 border-slate-600 pl-3">
            {exp.what_the_statement_claims}
          </p>
        )}

        {/* Explanation sub-sections */}
        {EXPLANATION_SECTIONS.map(({ key, label }) =>
          exp[key] ? (
            <div key={key}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                {label}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{exp[key]}</p>
            </div>
          ) : null
        )}

        {/* Scripture + Council references */}
        {(exp.scripture_reference || exp.council_reference) && (
          <div className="flex flex-col gap-1 pt-1">
            {exp.council_reference && (
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Council: </span>
                {exp.council_reference}
              </p>
            )}
            {exp.scripture_reference && (
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-400">Scripture: </span>
                {exp.scripture_reference}
              </p>
            )}
          </div>
        )}

        {/* Tradition consensus */}
        {match?.consensus && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Tradition Consensus
            </h3>
            <TraditionBadges consensus={match.consensus} />
          </div>
        )}

        {/* Tradition notes */}
        {match?.tradition_notes && (
          <div className="bg-amber-950/30 border border-amber-800/40 rounded-lg px-4 py-3">
            <p className="text-amber-200/80 text-sm leading-relaxed">
              <span className="font-semibold text-amber-300">Note: </span>
              {match.tradition_notes}
            </p>
          </div>
        )}

        {/* Ambiguous readings */}
        {result.ambiguous_readings?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Ambiguous Readings
            </h3>
            <div className="space-y-2">
              {result.ambiguous_readings.map((r, i) => (
                <div key={i} className="bg-slate-800/60 rounded-lg px-4 py-3">
                  <span className={`text-xs font-bold uppercase tracking-wider ${r.reading === 'orthodox' ? 'text-green-400' : 'text-amber-400'}`}>
                    {r.reading === 'orthodox' ? '🟢 Orthodox reading' : '🟡 Heretical reading'}
                  </span>
                  <p className="text-slate-300 text-sm leading-relaxed mt-1">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Secondary matches */}
        {result.secondary_matches?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">
              Related Heresies
            </h3>
            <div className="flex flex-col gap-2">
              {result.secondary_matches.map(m => (
                <div key={m.id} className="flex items-baseline gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold shrink-0">
                    {m.name}
                  </span>
                  <span className="text-slate-500 text-xs">{m.brief_note}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
