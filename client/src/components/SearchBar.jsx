import { useState, useRef } from 'react'

const MAX_CHARS = 2000

export default function SearchBar({ onSubmit, loading }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleSubmit() {
    const trimmed = text.trim()
    if (!trimmed || loading) return
    onSubmit(trimmed)
  }

  const remaining = MAX_CHARS - text.length
  const nearLimit = remaining < 200

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={MAX_CHARS}
          rows={4}
          disabled={loading}
          placeholder="Enter a theological statement to analyze… e.g. 'Jesus was the first and greatest of God's creations.'"
          className="w-full resize-none rounded-xl bg-slate-800/70 border border-slate-600/60 text-slate-100 placeholder-slate-500 px-4 py-3 text-sm leading-relaxed focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        />
        <span
          className={`absolute bottom-3 right-3 text-xs tabular-nums transition-colors ${
            nearLimit ? 'text-amber-500' : 'text-slate-600'
          }`}
        >
          {remaining}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-slate-600 hidden sm:block">
          ⌘ Enter to submit
        </p>
        <button
          onClick={handleSubmit}
          disabled={loading || text.trim().length === 0}
          className="ml-auto px-6 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </div>
    </div>
  )
}
