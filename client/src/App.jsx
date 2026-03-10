import { useState } from 'react'
import SearchBar from './components/SearchBar.jsx'
import ResultCard from './components/ResultCard.jsx'
import LoadingState from './components/LoadingState.jsx'
import AboutPanel from './components/AboutPanel.jsx'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(statement) {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statement })
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `Server error ${res.status}`)
      }

      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="cross">✝</span>
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-tight tracking-tight">
              Heresy Detector
            </h1>
            <p className="text-xs text-slate-500">
              37 heresies · 20 centuries · 3 traditions
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Input */}
        <section aria-label="Statement input">
          <SearchBar onSubmit={handleSubmit} loading={loading} />
        </section>

        {/* Result area */}
        <section aria-label="Analysis result" aria-live="polite">
          {loading && <LoadingState />}

          {error && !loading && (
            <div className="rounded-xl border border-red-700/50 bg-red-950/30 px-5 py-4">
              <p className="text-red-300 text-sm">
                <span className="font-semibold">Error: </span>{error}
              </p>
            </div>
          )}

          {result && !loading && <ResultCard result={result} />}
        </section>

        {/* About */}
        <section aria-label="About">
          <AboutPanel />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-4">
        <p className="text-center text-xs text-slate-600 max-w-2xl mx-auto">
          For educational purposes only · Not a substitute for theological counsel
        </p>
      </footer>
    </div>
  )
}
