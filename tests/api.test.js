import test from 'node:test';
import assert from 'node:assert/strict';
import { listApiMessages, readApiMessage } from '../src/notlettersApiClient.js';

test('API response is parsed, unknown responses are reported, and IDs are not decoded twice', async () => {
  const originalFetch = globalThis.fetch;
  const account = { email: 'test@example.com', password: 'example' };
  const settings = { apiBaseUrl: 'https://api.notletters.com/v1', messageLimit: 50 };
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({ data: { letters: [{ id: 'letter%value', subject: 'Hello', date: '2026-01-01', letter: { text: 'Text', html: '' } }] } }), { status: 200 });
    assert.equal((await listApiMessages(account, settings, 'token')).length, 1);
    assert.equal((await readApiMessage(account, 'letter%value', settings, 'token')).text, 'Text');
    globalThis.fetch = async () => new Response(JSON.stringify({ result: [] }), { status: 200 });
    await assert.rejects(listApiMessages(account, settings, 'token'), { code: 'NOTLETTERS_API_INVALID_RESPONSE' });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
