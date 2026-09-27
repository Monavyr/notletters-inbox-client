import { decryptPassword, encryptPassword, readStore, updateStore } from './store.js';

const DEFAULT_API_BASE_URL = 'https://api.notletters.com/v1';
const VALID_MODES = new Set(['imap', 'api']);

function invalidSetting(message) {
  const error = new Error(message);
  error.status = 400;
  error.code = 'INVALID_SETTING';
  throw error;
}

function envBool(name, fallback) {
  const value = process.env[name];
  if (value === undefined) return fallback;
  return String(value).toLowerCase() !== 'false';
}

function envInt(name, fallback) {
  const value = Number.parseInt(process.env[name] || '', 10);
  return Number.isFinite(value) ? value : fallback;
}

function defaults() {
  const envMode = String(process.env.READ_MODE || 'imap').toLowerCase();
  return {
    readMode: VALID_MODES.has(envMode) ? envMode : 'imap',
    imapHost: process.env.IMAP_HOST || 'imap.notletters.com',
    imapPort: envInt('IMAP_PORT', 993),
    imapSecure: envBool('IMAP_SECURE', true),
    apiBaseUrl: process.env.NOTLETTERS_API_BASE_URL || DEFAULT_API_BASE_URL,
    apiTokenEncrypted: null,
    messageLimit: envInt('MESSAGE_LIMIT', 50)
  };
}

function normalizeSettings(raw = {}) {
  const base = defaults();
  const readMode = String(raw.readMode || raw.mode || base.readMode).toLowerCase();

  return {
    ...base,
    ...raw,
    readMode: VALID_MODES.has(readMode) ? readMode : base.readMode,
    imapHost: String(raw.imapHost || base.imapHost).trim() || base.imapHost,
    imapPort: Math.max(1, Math.min(Number(raw.imapPort || base.imapPort), 65535)),
    imapSecure: Boolean(raw.imapSecure ?? base.imapSecure),
    apiBaseUrl: String(raw.apiBaseUrl || base.apiBaseUrl).trim().replace(/\/+$/, '') || base.apiBaseUrl,
    messageLimit: Math.max(1, Math.min(Number(raw.messageLimit || base.messageLimit), 200)),
    apiTokenEncrypted: raw.apiTokenEncrypted || null
  };
}

export function publicSettings(settings) {
  return {
    readMode: settings.readMode,
    imapHost: settings.imapHost,
    imapPort: settings.imapPort,
    imapSecure: settings.imapSecure,
    apiBaseUrl: settings.apiBaseUrl,
    hasApiToken: Boolean(settings.apiTokenEncrypted),
    messageLimit: settings.messageLimit
  };
}

export async function getSettings() {
  const store = await readStore();
  if (store.settings) return normalizeSettings(store.settings);
  return updateStore((current) => {
    current.settings ??= normalizeSettings();
    return normalizeSettings(current.settings);
  });
}

export async function getPublicSettings() {
  return publicSettings(await getSettings());
}

export async function saveSettings(input = {}) {
  return updateStore((store) => {
    const current = normalizeSettings(store.settings || {});
    const next = { ...current };

    if (input.readMode !== undefined) {
      const mode = String(input.readMode).toLowerCase();
      if (!VALID_MODES.has(mode)) {
        const error = new Error('Read mode must be either imap or api.');
        error.status = 400;
        error.code = 'INVALID_READ_MODE';
        throw error;
      }
      next.readMode = mode;
    }

    if (input.imapHost !== undefined) next.imapHost = String(input.imapHost).trim() || current.imapHost;
    if (input.imapPort !== undefined) {
      const port = Number(input.imapPort);
      if (!Number.isInteger(port) || port < 1 || port > 65535) invalidSetting('IMAP port must be between 1 and 65535.');
      next.imapPort = port;
    }
    if (input.imapSecure !== undefined) next.imapSecure = Boolean(input.imapSecure);
    if (input.apiBaseUrl !== undefined) {
      let url;
      try { url = new URL(String(input.apiBaseUrl).trim()); } catch { invalidSetting('Enter a valid HTTPS API URL.'); }
      if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) invalidSetting('API URL must use HTTPS without credentials, query or fragment.');
      next.apiBaseUrl = url.toString().replace(/\/+$/, '');
    }
    if (input.messageLimit !== undefined) {
      const limit = Number(input.messageLimit);
      if (!Number.isInteger(limit) || limit < 1 || limit > 200) invalidSetting('Message limit must be between 1 and 200.');
      next.messageLimit = limit;
    }

    if (input.clearApiToken) {
      next.apiTokenEncrypted = null;
    } else if (typeof input.apiToken === 'string' && input.apiToken.trim()) {
      next.apiTokenEncrypted = encryptPassword(input.apiToken.trim());
    }

    store.settings = normalizeSettings(next);
    return publicSettings(store.settings);
  });
}

export async function getApiToken() {
  const settings = await getSettings();
  if (!settings.apiTokenEncrypted) return '';
  return decryptPassword(settings.apiTokenEncrypted);
}
