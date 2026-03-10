const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-App-Password',
}

export async function onRequestPost(context) {
  const { request, env } = context
  const appPassword = env.APP_PASSWORD ?? 'changeme'
  const provided = request.headers.get('X-App-Password')

  if (provided !== appPassword) {
    return new Response(JSON.stringify({ error: 'Unauthorised' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders }
  })
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: corsHeaders })
}
