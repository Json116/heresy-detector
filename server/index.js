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

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', heresies: 37 })
})

app.listen(PORT, () => {
  console.log(`Heresy Detector server running on http://localhost:${PORT}`)
})
