import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

test('concurrent imports and settings changes keep every update', async () => {
  const cwd = process.cwd();
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'inbox-client-test-'));
  process.chdir(directory);
  process.env.APP_SECRET = 'local-test-secret-for-encryption-only';
  try {
    const { upsertAccounts, listAccounts, deleteAccount, getAccountWithPassword } = await import('../src/store.js');
    const { saveSettings, getPublicSettings } = await import('../src/settings.js');
    await Promise.all([
      upsertAccounts([{ email: 'first@example.com', password: 'first-secret' }]),
      upsertAccounts([{ email: 'second@example.com', password: 'second-secret' }]),
      saveSettings({ messageLimit: 75 })
    ]);
    const accounts = await listAccounts();
    assert.deepEqual(accounts.map((account) => account.email), ['first@example.com', 'second@example.com']);
    assert.equal((await getPublicSettings()).messageLimit, 75);
    assert.equal((await getAccountWithPassword(accounts[0].id)).password, 'first-secret');
    assert.doesNotMatch(await fs.readFile('data/accounts.json', 'utf8'), /first-secret|second-secret/);
    await assert.rejects(saveSettings({ apiBaseUrl: 'http://example.com/v1' }), { code: 'INVALID_SETTING' });
    assert.equal((await getPublicSettings()).messageLimit, 75);
    await deleteAccount(accounts[0].id);
    assert.deepEqual((await listAccounts()).map((account) => account.email), ['second@example.com']);
  } finally {
    process.chdir(cwd);
    await fs.rm(directory, { recursive: true, force: true });
  }
});
