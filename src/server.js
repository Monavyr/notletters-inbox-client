import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseImportText } from './importer.js';
import {
  deleteAccount,
  getAccountWithPassword,
  listAccounts,
  touchAccount,
  upsertAccounts
} from './store.js';
import { downloadInboxAttachment, listInboxMessages, markMessageSeen, readInboxMessage } from './imapClient.js';
import { getApiToken, getPublicSettings, getSettings, saveSettings } from './settings.js';
import { listApiMessages, readApiMessage } from './notlettersApiClient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number.parseInt(process.env.PORT || '3000', 10);
const host = process.env.HOST || '127.0.0.1';

app.use(express.json({ limit: '3mb' }));
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store');
  res.set('X-Content-Type-Options', 'nosniff');
  next();
});
app.use(express.static(path.join(__dirname, '..', 'public')));

function extractBasicPassword(header = '') {
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Basic' || !token) return '';

  const decoded = Buffer.from(token, 'base64').toString('utf8');
  const splitAt = decoded.indexOf(':');
  return splitAt >= 0 ? decoded.slice(splitAt + 1) : '';
}

function requireAppAuth(req, res, next) {
  const expectedPassword = process.env.APP_PASSWORD;

  if (!expectedPassword || expectedPassword.includes('change-me')) {
    return res.status(500).json({
      error: 'APP_PASSWORD is not configured. Set it in .env before running the app.',
      code: 'APP_PASSWORD_NOT_CONFIGURED'
    });
  }

  const providedPassword = String(req.headers['x-app-password'] || '') || extractBasicPassword(req.headers.authorization || '');

  if (providedPassword !== expectedPassword) {
    return res.status(401).json({
      error: 'Enter the client password from APP_PASSWORD in .env.',
      code: 'APP_AUTH_FAILED'
    });
  }

  next();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api', requireAppAuth);

app.get('/api/settings', async (_req, res, next) => {
  try {
    res.json({ settings: await getPublicSettings() });
  } catch (error) {
    next(error);
  }
});

app.put('/api/settings', async (req, res, next) => {
  try {
    res.json({ settings: await saveSettings(req.body || {}) });
  } catch (error) {
    next(error);
  }
});

// Backward-compatible endpoint for older frontend builds.
app.get('/api/config', async (_req, res, next) => {
  try {
    res.json(await getPublicSettings());
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts', async (_req, res, next) => {
  try {
    res.json({ accounts: await listAccounts() });
  } catch (error) {
    next(error);
  }
});

app.post('/api/accounts/import', async (req, res, next) => {
  try {
    const { pairs, errors } = parseImportText(req.body?.text || '');

    if (!pairs.length) {
      return res.status(400).json({
        error: 'No valid accounts found.',
        code: 'IMPORT_EMPTY',
        errors
      });
    }

    const result = await upsertAccounts(pairs);
    res.json({ ...result, errors });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/accounts/:accountId', async (req, res, next) => {
  try {
    res.json(await deleteAccount(req.params.accountId));
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts/:accountId/messages', async (req, res, next) => {
  try {
    const account = await getAccountWithPassword(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found.', code: 'ACCOUNT_NOT_FOUND' });

    const settings = await getSettings();
    const limit = Number.parseInt(req.query.limit || settings.messageLimit || '50', 10);
    const apiToken = settings.readMode === 'api' ? await getApiToken() : '';
    const messages = settings.readMode === 'api'
      ? await listApiMessages(account, { ...settings, messageLimit: limit }, apiToken)
      : await listInboxMessages(account, limit, settings);

    await touchAccount(account.id);
    res.json({
      account: { id: account.id, email: account.email },
      source: settings.readMode,
      messages
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts/:accountId/messages/:uid', async (req, res, next) => {
  try {
    const account = await getAccountWithPassword(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found.', code: 'ACCOUNT_NOT_FOUND' });

    const settings = await getSettings();
    const apiToken = settings.readMode === 'api' ? await getApiToken() : '';
    const message = settings.readMode === 'api'
      ? await readApiMessage(account, req.params.uid, settings, apiToken)
      : await readInboxMessage(account, req.params.uid, settings);

    res.json({
      account: { id: account.id, email: account.email },
      source: settings.readMode,
      message
    });
  } catch (error) {
    next(error);
  }
});

app.get('/api/accounts/:accountId/messages/:uid/attachments/:index', async (req, res, next) => {
  try {
    const settings = await getSettings();
    if (settings.readMode !== 'imap') return res.status(405).json({ error: 'Attachments are available only in IMAP mode.', code: 'API_ATTACHMENTS_UNSUPPORTED' });
    const account = await getAccountWithPassword(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found.', code: 'ACCOUNT_NOT_FOUND' });
    const index = Number(req.params.index);
    if (!Number.isSafeInteger(index) || index < 0) return res.status(400).json({ error: 'Invalid attachment index.', code: 'INVALID_ATTACHMENT_INDEX' });
    const attachment = await downloadInboxAttachment(account, req.params.uid, index, settings);
    const filename = encodeURIComponent(attachment.filename).replace(/['()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename*=UTF-8''${filename}`);
    res.send(attachment.content);
  } catch (error) {
    next(error);
  }
});

app.post('/api/accounts/:accountId/messages/:uid/seen', async (req, res, next) => {
  try {
    const settings = await getSettings();
    if (settings.readMode === 'api') {
      return res.status(405).json({
        error: 'Mark as read is available only in IMAP mode. NotLetters API letters endpoint is read-only in this client.',
        code: 'API_MARK_READ_UNSUPPORTED'
      });
    }

    const account = await getAccountWithPassword(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found.', code: 'ACCOUNT_NOT_FOUND' });

    res.json(await markMessageSeen(account, req.params.uid, settings));
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  const status = Number.isInteger(error?.status) ? error.status : 500;
  console.error(error?.cause || error);
  res.status(status).json({
    error: error.message || 'Internal server error',
    code: error.code || 'INTERNAL_ERROR'
  });
});

process.on('unhandledRejection', (error) => {
  console.error('[process] Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
  console.error('[process] Uncaught exception:', error);
});

app.listen(port, host, () => {
  console.log(`Inbox client is running at http://${host}:${port}`);
});
