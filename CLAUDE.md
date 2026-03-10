# Heresy Detector — Project Memory

## Project
PWA web app: users input a theological statement → AI verdict mapping against 37 Christian heresies.

## Tech Stack
- Frontend: React 19 + Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first, no `tailwind.config.js`)
- Backend: Node.js + Express 4 on port 5001 (port 5000 is taken by macOS AirPlay Receiver)
- Dev server: Vite 6 on port 3000 with `/api` proxy → `:5001`
- Hot reload: `node --watch` (built-in Node 18+)
- Concurrency: `concurrently` package
- PWA: `vite-plugin-pwa`

## Current Status
- Phase 1 complete: Foundation files created
- Mock API cycles through 4 scenarios (no real API key needed)
- Real Claude API wired in later with minimal changes

## Key Notes
- ESM JSON import: use `with { type: 'json' }` (not deprecated `assert`)
- Vite root is `client/` — `index.html` lives at `client/index.html`
- Tailwind v4 dark mode: uses `prefers-color-scheme` by default
- AboutPanel: inline flow (NOT fixed position — iOS keyboard covers it)
- Textarea: `resize-none` for iOS Safari
- `server/api.js` is the swap point for real LLM integration

## API Response Shape
```json
{
  "verdict": "heresy|caution|orthodox",
  "heresy_name": "string | null",
  "confidence": "high|moderate|low",
  "explanation": "2-4 sentences",
  "tradition_consensus": { "catholic": "...", "eastern_orthodox": "...", "protestant": "..." },
  "tradition_note": "string | null",
  "related_heresies": ["string"],
  "historical_note": "string | null"
}
```

## Mock Scenarios (server/mock.js)
- 0: Arianism (heresy, high, all traditions = heresy)
- 1: Arminianism (caution, moderate, protestant=disputed, tradition_note)
- 2: Orthodox (no match, clean bill of health)
- 3: Open Theism (caution, low, partial match)
