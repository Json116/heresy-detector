import { useState, useCallback } from 'react'

const STORAGE_KEY = 'hd_password'

function getSaved() {
  try { return localStorage.getItem(STORAGE_KEY) ?? '' } catch { return '' }
}

async function validateWithServer(password) {
  const res = await fetch('/api/auth', {
    method: 'POST',
    headers: { 'X-App-Password': password }
  })
  return res.ok
}

export default function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => getSaved().length > 0)
  const [inputValue, setInputValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [checking, setChecking] = useState(false)

  const handleUnauthorized = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
    setAuthed(false)
    setInputValue('')
    setError('Incorrect password — please try again')
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!inputValue || checking) return
    setChecking(true)
    setError(null)
    try {
      const ok = await validateWithServer(inputValue)
      if (ok) {
        try { localStorage.setItem(STORAGE_KEY, inputValue) } catch {}
        setAuthed(true)
      } else {
        setError('Incorrect password')
        setInputValue('')
      }
    } catch {
      setError('Could not connect — please try again')
    } finally {
      setChecking(false)
    }
  }

  if (authed) {
    return children(handleUnauthorized)
  }

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl" role="img" aria-label="cross">✝</span>
          <h1 className="mt-3 text-xl font-bold text-slate-100 tracking-tight">Heresy Detector</h1>
          <p className="mt-1 text-sm text-slate-500">Enter password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Password"
              autoFocus
              disabled={checking}
              className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/60 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-sm px-1"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={checking}
            className="rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-semibold py-3 transition-colors disabled:opacity-50"
          >
            {checking ? 'Checking…' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  )
}
