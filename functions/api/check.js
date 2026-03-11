import { SYSTEM_PROMPT } from '../../prompt.js'
import heresies from '../../data/MasterHeresyList.json'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-App-Password',
}

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  })
}

export async function onRequestPost(context) {
  const { request, env } = context
  const appPassword = env.APP_PASSWORD ?? 'changeme'

  const provided = request.headers.get('X-App-Password')
  if (provided !== appPassword) {
    return json({ error: 'Unauthorised' }, 401)
  }

  const { statement } = await request.json()
  if (!statement?.trim()) return json({ error: 'statement is required' }, 400)
  if (statement.length > 2000) return json({ error: 'statement exceeds 2000 characters' }, 400)

  const apiKey = env.ANTHROPIC_API_KEY
  if (!apiKey) return json({ error: 'ANTHROPIC_API_KEY not configured' }, 500)

  const userMessage =
    `Statement submitted for analysis: "${statement.trim()}"\n\n` +
    `Top candidate heresies from semantic search:\n${JSON.stringify(heresies, null, 2)}`

  const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!apiResponse.ok) {
    const err = await apiResponse.text()
    return json({ error: 'Claude API error', detail: err }, 502)
  }

  const data = await apiResponse.json()
  const text = data.content[0].text

  let result
  try {
    result = JSON.parse(text)
  } catch {
    return json({ error: 'Failed to parse Claude response', raw: text }, 502)
  }

  return json(result, 200)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
}
