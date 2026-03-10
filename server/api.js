// api.js — thin wrapper around the AI backend.
// Currently delegates to mock.js for local development.
// To wire in real Claude API:
//   1. npm install @anthropic-ai/sdk
//   2. Replace the import below with your real implementation
//   3. Set ANTHROPIC_API_KEY in .env

import { mockCheck } from './mock.js'

export async function checkStatement(statement) {
  // Swap this line to use real LLM:
  return mockCheck(statement)
}
