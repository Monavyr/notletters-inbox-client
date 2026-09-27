const DEFAULT_TIMEOUT = Number.parseInt(process.env.API_TIMEOUT_MS || '20000', 10);

function makePublicError(message, status = 500, code = 'NOTLETTERS_API_ERROR', cause) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.cause = cause;
  return error;
}

function textSize(text) {
  return Buffer.byteLength(String(text || ''), 'utf8');
}

function formatSender(letter) {
  const sender = letter.sender || letter.from || '';
  const name = letter.sender_name || letter.senderName || '';
  if (name && sender) return `${name} <${sender}>`;
  return sender || name || '(unknown sender)';
}

function extractLetters(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.letters)) return payload.letters;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.letters)) return payload.data.letters;
  if (Array.isArray(payload?.data?.data?.letters)) return payload.data.data.letters;
  throw makePublicError('Unexpected NotLetters API response format.', 502, 'NOTLETTERS_API_INVALID_RESPONSE');
}

function normalizeApiError(error, status = 500, payload = null) {
  const messageFromPayload = typeof payload?.error === 'string'
    ? payload.error
    : typeof payload?.message === 'string'
      ? payload.message
      : '';

  if (status === 401 || status === 403) {
    return makePublicError(
      messageFromPayload || 'NotLetters API rejected the API token or mailbox credentials.',
      status,
      'NOTLETTERS_API_AUTH_FAILED',
      error
    );
  }

  if (error?.name === 'AbortError') {
    return makePublicError('NotLetters API request timed out.', 504, 'NOTLETTERS_API_TIMEOUT', error);
  }

  return makePublicError(
    messageFromPayload || error?.message || 'NotLetters API request failed.',
    status,
    'NOTLETTERS_API_ERROR',
    error
  );
}

async function fetchLetters(account, settings, apiToken) {
  if (!apiToken) {
    throw makePublicError(
      'API mode is selected, but NotLetters API token is not set. Open Settings and paste your API token.',
      400,
      'NOTLETTERS_API_TOKEN_MISSING'
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${settings.apiBaseUrl}/letters`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: account.email,
        password: account.password,
        filters: {}
      }),
      signal: controller.signal,
      redirect: 'error'
    });

    const text = await response.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = { message: text };
    }

    if (!response.ok) {
      throw normalizeApiError(new Error(`HTTP ${response.status}`), response.status, payload);
    }

    return extractLetters(payload);
  } catch (error) {
    if (String(error?.code || '').startsWith('NOTLETTERS_API_')) {
      throw error;
    }
    throw normalizeApiError(error, error?.status || 500);
  } finally {
    clearTimeout(timeout);
  }
}

function toSummary(letter, account) {
  const body = letter.letter || letter.body || {};
  const uid = String(letter.id || letter.uuid || `${letter.date || ''}:${letter.subject || ''}`);

  return {
    uid,
    subject: letter.subject || '(no subject)',
    from: formatSender(letter),
    to: account.email,
    date: letter.date || null,
    seen: true,
    flagged: Boolean(letter.star),
    size: textSize(body.text) + textSize(body.html),
    source: 'api',
    canMarkSeen: false
  };
}

function toFullMessage(letter, account) {
  const body = letter.letter || letter.body || {};
  const summary = toSummary(letter, account);

  return {
    ...summary,
    cc: '',
    text: body.text || '',
    html: body.html || '',
    attachments: []
  };
}

export async function listApiMessages(account, settings, apiToken) {
  const letters = await fetchLetters(account, settings, apiToken);
  const limit = Math.max(1, Math.min(Number(settings.messageLimit) || 50, 200));

  return letters
    .map((letter) => toSummary(letter, account))
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
    .slice(0, limit);
}

export async function readApiMessage(account, uid, settings, apiToken) {
  const letters = await fetchLetters(account, settings, apiToken);
  const wanted = String(uid);
  const letter = letters.find((item) => String(item.id || item.uuid || `${item.date || ''}:${item.subject || ''}`) === wanted);

  if (!letter) {
    throw makePublicError('Message not found in NotLetters API response.', 404, 'NOTLETTERS_API_MESSAGE_NOT_FOUND');
  }

  return toFullMessage(letter, account);
}
