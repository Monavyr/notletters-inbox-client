import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const DATA_DIR = path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'accounts.json');
const ENC_VERSION = 1;
let pendingMutation = Promise.resolve();

function keyFromSecret() {
  const secret = process.env.APP_SECRET;
  if (!secret || secret.includes('change-me')) {
    throw new Error('Set a strong APP_SECRET in .env before importing accounts.');
  }
  return crypto.scryptSync(secret, 'notletters-inbox-client-v1', 32);
}

function accountId(email) {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex').slice(0, 24);
}

export function encryptPassword(password) {
  const iv = crypto.randomBytes(12);
  const key = keyFromSecret();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    v: ENC_VERSION,
    iv: iv.toString('base64url'),
    tag: tag.toString('base64url'),
    data: ciphertext.toString('base64url')
  };
}

export function decryptPassword(payload) {
  if (!payload || payload.v !== ENC_VERSION) {
    throw new Error('Unsupported password encryption payload.');
  }

  const key = keyFromSecret();
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(payload.iv, 'base64url')
  );
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64url'));

  return Buffer.concat([
    decipher.update(Buffer.from(payload.data, 'base64url')),
    decipher.final()
  ]).toString('utf8');
}

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify({ accounts: [] }, null, 2), { flag: 'wx', mode: 0o600 });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

async function loadStore() {
  await ensureStore();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  const parsed = JSON.parse(raw || '{"accounts":[]}');
  parsed.accounts ??= [];
  return parsed;
}

export async function readStore() {
  await pendingMutation;
  return loadStore();
}

async function writeStore(store) {
  await ensureStore();
  const tmp = `${DATA_FILE}.${crypto.randomUUID()}.tmp`;
  try {
    await fs.writeFile(tmp, JSON.stringify(store, null, 2), { flag: 'wx', mode: 0o600 });
    await fs.rename(tmp, DATA_FILE);
  } finally {
    await fs.unlink(tmp).catch((error) => { if (error.code !== 'ENOENT') throw error; });
  }
}

// All read-modify-write operations in this server process run in one queue.
export function updateStore(change) {
  const operation = pendingMutation.then(async () => {
    const store = await loadStore();
    const result = await change(store);
    await writeStore(store);
    return result;
  });
  pendingMutation = operation.catch(() => {});
  return operation;
}

export function publicAccount(account) {
  return {
    id: account.id,
    email: account.email,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    lastOpenedAt: account.lastOpenedAt ?? null
  };
}

export async function listAccounts() {
  const store = await readStore();
  return store.accounts.map(publicAccount);
}

export async function upsertAccounts(pairs) {
  return updateStore((store) => {
    const byId = new Map(store.accounts.map((account) => [account.id, account]));
    const now = new Date().toISOString();
    const imported = [];
    const updated = [];

    for (const pair of pairs) {
      const email = pair.email.trim().toLowerCase();
      const id = accountId(email);
      const existing = byId.get(id);
      const encryptedPassword = encryptPassword(pair.password);

      if (existing) {
        existing.email = email;
        existing.password = encryptedPassword;
        existing.updatedAt = now;
        updated.push(publicAccount(existing));
      } else {
        const account = {
          id,
          email,
          password: encryptedPassword,
          createdAt: now,
          updatedAt: now
        };
        store.accounts.push(account);
        byId.set(id, account);
        imported.push(publicAccount(account));
      }
    }

    return { imported, updated, total: store.accounts.length };
  });
}

export async function deleteAccount(id) {
  return updateStore((store) => {
    const before = store.accounts.length;
    store.accounts = store.accounts.filter((account) => account.id !== id);
    return { deleted: before - store.accounts.length };
  });
}

export async function getAccountWithPassword(id) {
  const store = await readStore();
  const account = store.accounts.find((item) => item.id === id);
  if (!account) return null;

  return {
    ...publicAccount(account),
    password: decryptPassword(account.password)
  };
}

export async function touchAccount(id) {
  return updateStore((store) => {
    const account = store.accounts.find((item) => item.id === id);
    if (account) account.lastOpenedAt = new Date().toISOString();
  });
}
