import { mockCheck } from '../../server/mock.js'

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

  const result = await mockCheck(statement.trim())
  return json(result, 200)
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
}
