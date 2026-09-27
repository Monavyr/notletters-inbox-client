import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

const DEFAULT_LIMIT = Number.parseInt(process.env.MESSAGE_LIMIT || '50', 10);
const DEFAULT_TIMEOUT = Number.parseInt(process.env.IMAP_TIMEOUT_MS || '15000', 10);

function makePublicError(message, status = 500, code = 'IMAP_ERROR', cause) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  error.cause = cause;
  return error;
}

function isAuthError(error) {
  const text = [
    error?.message,
    error?.response,
    error?.responseText,
    error?.executedCommand
  ].filter(Boolean).join(' ').toLowerCase();

  return Boolean(error?.authenticationFailed) ||
    text.includes('bad credentials') ||
    text.includes('authentication failed') ||
    text.includes('invalid credentials');
}

function normalizeImapError(error) {
  if (error?.code === 'ATTACHMENT_NOT_FOUND') return error;
  if (isAuthError(error)) {
    return makePublicError(
      'IMAP rejected this email/password: bad credentials. Re-import this mailbox with the exact current password, or use the NotLetters API mode if the web login works but IMAP does not.',
      401,
      'IMAP_BAD_CREDENTIALS',
      error
    );
  }

  if (error?.code === 'ETIMEOUT' || String(error?.message || '').toLowerCase().includes('timeout')) {
    return makePublicError(
      'IMAP connection timed out. Try again in a few seconds; if it repeats, NotLetters may be throttling or the IMAP server is not responding for this mailbox.',
      504,
      'IMAP_TIMEOUT',
      error
    );
  }

  if (error?.code === 'ECONNRESET' || error?.code === 'ECONNREFUSED' || error?.code === 'ENOTFOUND') {
    return makePublicError(
      `IMAP connection failed: ${error.code}. Check IMAP_HOST/IMAP_PORT and your internet connection.`,
      502,
      'IMAP_CONNECTION_FAILED',
      error
    );
  }

  return makePublicError(
    error?.message || 'Cannot open IMAP mailbox.',
    500,
    'IMAP_ERROR',
    error
  );
}

function createClient(account, settings = {}) {
  const client = new ImapFlow({
    host: settings.imapHost || process.env.IMAP_HOST || 'imap.notletters.com',
    port: Number.parseInt(settings.imapPort || process.env.IMAP_PORT || '993', 10),
    secure: settings.imapSecure ?? (String(process.env.IMAP_SECURE || 'true').toLowerCase() !== 'false'),
    auth: {
      user: account.email,
      pass: account.password
    },
    logger: false,
    connectionTimeout: DEFAULT_TIMEOUT,
    greetingTimeout: DEFAULT_TIMEOUT,
    socketTimeout: DEFAULT_TIMEOUT,
    emitLogs: false
  });

  // ImapFlow can emit asynchronous socket errors after a request has already
  // been rejected. Without a listener Node treats that as fatal and stops the app.
  client.on('error', (error) => {
    const normalized = normalizeImapError(error);
    console.warn(`[imap] ${account.email}: ${normalized.message}`);
  });

  return client;
}

async function closeClient(client) {
  if (!client) return;
  try {
    if (client.usable) {
      await client.logout();
      return;
    }
  } catch {
    // Fall through to force close.
  }

  try {
    client.close?.();
  } catch {
    // Ignore close errors.
  }
}

async function withInboxLock(account, settings, action) {
  const client = createClient(account, settings);
  let lock;

  try {
    await client.connect();
    lock = await client.getMailboxLock('INBOX');
    return await action(client);
  } catch (error) {
    throw normalizeImapError(error);
  } finally {
    try {
      lock?.release?.();
    } catch {
      // Ignore lock release errors.
    }
    await closeClient(client);
  }
}

function normalizeAddress(addressObject) {
  if (!addressObject?.value?.length) return '';
  return addressObject.value
    .map((item) => item.name ? `${item.name} <${item.address}>` : item.address)
    .join(', ');
}

function flagsToArray(flags) {
  if (!flags) return [];
  return Array.isArray(flags) ? flags : [...flags];
}

function messageSummary(message) {
  const flags = flagsToArray(message.flags);
  return {
    uid: String(message.uid),
    subject: message.envelope?.subject || '(no subject)',
    from: normalizeAddress(message.envelope?.from),
    to: normalizeAddress(message.envelope?.to),
    date: message.envelope?.date?.toISOString?.() || message.internalDate?.toISOString?.() || null,
    seen: flags.includes('\\Seen'),
    flagged: flags.includes('\\Flagged'),
    size: message.size || 0
  };
}

export async function listInboxMessages(account, limit = DEFAULT_LIMIT, settings = {}) {
  return withInboxLock(account, settings, async (client) => {
    const exists = client.mailbox.exists || 0;
    if (!exists) return [];

    const safeLimit = Math.max(1, Math.min(Number(limit) || DEFAULT_LIMIT, 200));
    const fromSeq = Math.max(1, exists - safeLimit + 1);
    const range = `${fromSeq}:*`;
    const messages = [];

    for await (const message of client.fetch(
      range,
      { uid: true, envelope: true, flags: true, internalDate: true, size: true },
      { uid: false }
    )) {
      messages.push(messageSummary(message));
    }

    return messages.sort((a, b) => Number(b.uid) - Number(a.uid));
  });
}

export async function readInboxMessage(account, uid, settings = {}) {
  return withInboxLock(account, settings, async (client) => {
    const { content } = await client.download(String(uid), null, { uid: true });
    const parsed = await simpleParser(content);

    return {
      uid: String(uid),
      subject: parsed.subject || '(no subject)',
      from: parsed.from?.text || '',
      to: parsed.to?.text || '',
      cc: parsed.cc?.text || '',
      date: parsed.date?.toISOString?.() || null,
      text: parsed.text || '',
      html: typeof parsed.html === 'string' ? parsed.html : '',
      attachments: (parsed.attachments || []).map((attachment) => ({
        filename: attachment.filename || 'attachment',
        contentType: attachment.contentType,
        size: attachment.size
      }))
    };
  });
}

export async function downloadInboxAttachment(account, uid, index, settings = {}) {
  return withInboxLock(account, settings, async (client) => {
    const { content } = await client.download(String(uid), null, { uid: true });
    const parsed = await simpleParser(content);
    const attachment = parsed.attachments?.[index];
    if (!attachment) {
      throw makePublicError('Attachment not found.', 404, 'ATTACHMENT_NOT_FOUND');
    }
    return {
      filename: attachment.filename || 'attachment',
      content: attachment.content,
      contentType: attachment.contentType || 'application/octet-stream'
    };
  });
}

export async function markMessageSeen(account, uid, settings = {}) {
  return withInboxLock(account, settings, async (client) => {
    await client.messageFlagsAdd(String(uid), ['\\Seen'], { uid: true });
    return { ok: true };
  });
}
