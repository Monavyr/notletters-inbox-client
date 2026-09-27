# NotLetters Inbox Client

Local Inbox client for bulk imported `email:password` accounts. It reads mail and can mark IMAP messages as read; it cannot send mail.

## What it does

- Bulk import accounts in `email:password` format.
- Show all imported accounts in a searchable/sortable sidebar. Default order is oldest first, so newly imported mailboxes appear at the bottom.
- Open one account at a time.
- Read only the Inbox.
- Select several messages and mark them as read in IMAP mode.
- Download IMAP attachments and remove imported accounts from this client.
- No SMTP, no Sent folder, no sending.
- Two reading modes: IMAP and NotLetters API.
- Settings are available inside the UI next to **Import accounts**.
- Interface language switcher: English/Russian, saved per browser.
- Mailbox passwords and the optional NotLetters API token are encrypted at rest with `APP_SECRET`.
- Message HTML is shown only inside a sandboxed iframe; plain text is preferred. Remote images are blocked in HTML view.
- On small screens, tap a message to open the reader and use **Back** to return to the list.

## Run

```bash
cp .env.example .env
# edit .env and set APP_PASSWORD + APP_SECRET
npm install
npm start
```

Open: http://127.0.0.1:3000

Login: enter the `APP_PASSWORD` from `.env`. It stays in browser memory for this page only. Reloading or closing the tab signs you out; **Log out** clears it immediately. Older versions stored it in localStorage; this version removes that saved value when opened.

Language: use the compact **EN/RU** selector next to **Settings**. The chosen language is saved in this browser's localStorage.

## Import format

Paste lines like:

```text
my@mail.com:password
other@mail.com:another-password
```

Lines beginning with `#` and blank lines are ignored. Re-importing the same email updates the saved password.

## Reading modes

### IMAP mode

Default mode. Uses SSL IMAP on `imap.notletters.com:993` unless changed in Settings.

### NotLetters API mode

Open **Settings** next to **Import accounts**, select **NotLetters API**, paste your API token, and save.

This mode calls:

```text
POST https://api.notletters.com/v1/letters
Authorization: Bearer <your-api-token>
```

with the selected mailbox `email` and `password`. API mode is useful when the NotLetters website/API accepts a mailbox but IMAP returns `bad credentials`.

Limitations in API mode:

- The current client treats API letters as read-only.
- The **Read** button is disabled because the public SDK exposes a `/letters` read endpoint, not an IMAP-style mark-as-read operation.
- Attachments are not implemented for API mode unless NotLetters returns them in the letters response.

## Notes

- Keep `HOST=127.0.0.1` unless you understand the security implications.
- Run one server process against a given `data/accounts.json`. Concurrent writes are serialized within that process, not across several processes or machines.
- Do not change `APP_SECRET` after importing accounts or saving an API token, otherwise existing encrypted secrets cannot be decrypted.
- For thousands of accounts, the app does not keep permanent IMAP connections. It connects only to the mailbox you open.
- Run `npm test` for store concurrency and API response checks. Testing live IMAP and NotLetters API requires your own credentials.


## v4

Language switching was moved from the accounts toolbar into Settings so long translated button labels do not break the top layout.


## v6

- Changed the default account order to oldest first, so newly imported accounts are added to the bottom of the list.

## v0.4.0 fixes

- Serialized account and settings writes to prevent lost updates.
- Ignored stale responses when switching accounts and messages rapidly.
- Added account deletion, multiple message selection, IMAP attachment downloads, and a mobile reader.
- Kept the app password in memory and blocked remote images in the HTML reader.
- Rejects unexpected successful API responses and validates settings inputs.
