import express from 'express'
import { checkStatement } from './api.js'

const app = express()
const PORT = 5001

app.use(express.json())

app.post('/api/check', async (req, res) => {
  const { statement } = req.body

  if (!statement || typeof statement !== 'string') {
    return res.status(400).json({ error: 'statement is required' })
  }

  const trimmed = statement.trim()
  if (trimmed.length === 0) {
    return res.status(400).json({ error: 'statement cannot be empty' })
  }
  if (trimmed.length > 2000) {
    return res.status(400).json({ error: 'statement exceeds 2000 character limit' })
  }

  try {
    const result = await checkStatement(trimmed)
    res.json(result)
  } catch (err) {
    console.error('API check error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/auth', (req, res) => {
  const appPassword = process.env.APP_PASSWORD ?? 'changeme'
  const provided = req.headers['x-app-password']
  if (provided !== appPassword) {
    return res.status(401).json({ error: 'Unauthorised' })
  }
  res.json({ ok: true })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', heresies: 37 })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Heresy Detector server running on http://localhost:${PORT}`)
})
