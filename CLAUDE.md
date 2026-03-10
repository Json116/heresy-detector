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
- Phase 2 complete: Cloudflare Pages + password gate implemented
- Mock API cycles through 4 scenarios (no real API key needed)
- Real Claude API wired in later with minimal changes

## Deployment (Cloudflare Pages)
- `functions/api/check.js` = Cloudflare Pages Function (replaces Express in prod)
- `wrangler.toml` — pages_build_output_dir = `client/dist`
- Dashboard env vars: `APP_PASSWORD` (worker) + `VITE_APP_PASSWORD` (build-time)
- `npm run pages:dev` — test with Cloudflare runtime locally

## Password Gate
- `PasswordGate.jsx` — wraps app, checks localStorage vs `VITE_APP_PASSWORD`
- Layer 1: frontend (localStorage + VITE_APP_PASSWORD baked at build time)
- Layer 2: Worker reads `X-App-Password` header vs `APP_PASSWORD` env var
- 401 response → `onUnauthorized()` → clears localStorage, re-shows gate
- Default password locally: `changeme` (falls back when env var not set)

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
