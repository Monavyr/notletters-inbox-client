const translations = {
  en: {
    'app.title': 'Inbox Client',
    'login.title': 'Client login',
    'login.hint': 'Enter the password from <code>APP_PASSWORD</code> in your <code>.env</code> file. It stays in memory until you close or reload this page.',
    'login.passwordPlaceholder': 'APP_PASSWORD',
    'login.button': 'Log in',
    'login.wrongPassword': 'Wrong APP_PASSWORD.',

    'actions.import': 'Import accounts',
    'actions.settings': 'Settings',
    'actions.settingsTitle': 'Reading mode and API settings',
    'actions.languageTitle': 'Language',
    'actions.refresh': 'Refresh',
    'actions.logout': 'Log out',
    'actions.back': 'Back to messages',
    'actions.delete': 'Delete account',
    'search.placeholder': 'Search accounts...',
    'sort.newest': 'Sort newest first',
    'sort.oldest': 'Sort oldest first',
    'accounts.title': 'Accounts',
    'current.select': 'Select an account',
    'toolbar.read': '✓ Read',
    'toolbar.selectAll': 'Select all messages',
    'toolbar.selectMessage': 'Select message',
    'reader.attachments': 'Attachments',
    'dialog.delete.title': 'Delete account?',
    'dialog.delete.prompt': 'Remove {email} from this client? The mailbox itself will not be deleted.',
    'dialog.delete.confirm': 'Delete',

    'empty.nothing': 'Nothing Here Yet',
    'empty.selectOrImport': 'Select an account or import mailboxes.',
    'empty.emptyInbox': 'There are no messages in this Inbox.',
    'empty.noMessage': 'No message selected',
    'empty.chooseEmail': 'Choose an email from Inbox to read it.',

    'dialog.import.title': 'Import accounts',
    'dialog.import.hint': 'Paste one mailbox per line in <code>email:password</code> format.',
    'dialog.import.placeholder': 'my@mail.com:password\nother@mail.com:password',
    'dialog.import.submit': 'Import',
    'dialog.settings.title': 'Settings',
    'dialog.settings.language': 'Interface language',
    'dialog.settings.readMode': 'Reading mode',
    'dialog.settings.messageLimit': 'Message limit',
    'dialog.settings.apiToken': 'NotLetters API token',
    'dialog.settings.apiTokenPlaceholderSaved': 'Saved token exists; leave empty to keep it',
    'dialog.settings.apiTokenPlaceholderEmpty': 'Paste NotLetters API token',
    'dialog.settings.clearApiToken': 'Clear saved API token',
    'dialog.settings.apiBaseUrl': 'API base URL',
    'dialog.settings.imapHost': 'IMAP host',
    'dialog.settings.imapPort': 'IMAP port',
    'dialog.settings.imapSecure': 'Use IMAP SSL/TLS',
    'dialog.settings.save': 'Save settings',
    'common.cancel': 'Cancel',

    'message.unknownSender': '(unknown sender)',
    'message.noSubject': '(no subject)',
    'message.read': 'Read',
    'message.unread': 'Unread',

    'reader.from': 'From:',
    'reader.to': 'To:',
    'reader.date': 'Date:',
    'reader.showHtml': 'Show HTML',
    'reader.showText': 'Show text',
    'reader.htmlAvailable': 'HTML version is available.',
    'reader.emptyMessage': '(empty message)',
    'reader.loadingTitle': 'Loading message',
    'reader.loadingText': 'Please wait.',
    'reader.cannotReadTitle': 'Cannot read message',
    'reader.cannotOpenTitle': 'Cannot open Inbox',

    'status.loading': 'Loading via {mode}...',
    'status.messages': '{count} messages · {source}',
    'status.error': 'Error',
    'status.apiReadUnavailable': 'Read status is unavailable in API mode',
    'status.markedRead': 'Marked as read',
    'status.markedReadCount': 'Marked as read: {count}',
    'status.deleted': 'Account removed.',
    'status.importing': 'Importing...',
    'status.importResult': 'Imported: {imported}, updated: {updated}, skipped: {skipped}. Total: {total}.',
    'status.saving': 'Saving...',
    'status.saved': 'Saved.',

    'error.APP_AUTH_FAILED': 'Wrong APP_PASSWORD.',
    'error.APP_PASSWORD_NOT_CONFIGURED': 'APP_PASSWORD is not configured. Set it in .env before running the app.',
    'error.IMPORT_EMPTY': 'No valid accounts found.',
    'error.ACCOUNT_NOT_FOUND': 'Account not found.',
    'error.API_MARK_READ_UNSUPPORTED': 'Mark as read is available only in IMAP mode.',
    'error.IMAP_BAD_CREDENTIALS': 'IMAP rejected this email/password: bad credentials. Re-import this mailbox with the exact current password, or use the NotLetters API mode if the web login works but IMAP does not.',
    'error.IMAP_TIMEOUT': 'IMAP connection timed out. Try again in a few seconds. If it repeats, NotLetters may be throttling or the IMAP server is not responding for this mailbox.',
    'error.IMAP_CONNECTION_FAILED': 'IMAP connection failed. Check IMAP host, port and your internet connection.',
    'error.IMAP_ERROR': 'Cannot open IMAP mailbox.',
    'error.NOTLETTERS_API_TOKEN_MISSING': 'NotLetters API token is missing. Add it in Settings or switch to IMAP mode.',
    'error.NOTLETTERS_API_ERROR': 'NotLetters API returned an error.',
    'error.INTERNAL_ERROR': 'Internal server error.'
  },
  ru: {
    'app.title': 'Почтовый клиент',
    'login.title': 'Вход в клиент',
    'login.hint': 'Введите пароль из <code>APP_PASSWORD</code> в файле <code>.env</code>. Он хранится в памяти до закрытия или обновления страницы.',
    'login.passwordPlaceholder': 'APP_PASSWORD',
    'login.button': 'Войти',
    'login.wrongPassword': 'Неверный APP_PASSWORD.',

    'actions.import': 'Импорт ящиков',
    'actions.settings': 'Настройки',
    'actions.settingsTitle': 'Режим чтения и настройки API',
    'actions.languageTitle': 'Язык интерфейса',
    'actions.refresh': 'Обновить',
    'actions.logout': 'Выйти',
    'actions.back': 'Назад к письмам',
    'actions.delete': 'Удалить ящик',
    'search.placeholder': 'Поиск аккаунтов...',
    'sort.newest': 'Сначала новые',
    'sort.oldest': 'Сначала старые',
    'accounts.title': 'Аккаунты',
    'current.select': 'Выберите ящик',
    'toolbar.read': '✓ Прочитано',
    'toolbar.selectAll': 'Выбрать все письма',
    'toolbar.selectMessage': 'Выбрать письмо',
    'reader.attachments': 'Вложения',
    'dialog.delete.title': 'Удалить ящик?',
    'dialog.delete.prompt': 'Убрать {email} из клиента? Сам почтовый ящик не будет удалён.',
    'dialog.delete.confirm': 'Удалить',

    'empty.nothing': 'Пока пусто',
    'empty.selectOrImport': 'Выберите аккаунт или импортируйте ящики.',
    'empty.emptyInbox': 'Во входящих нет писем.',
    'empty.noMessage': 'Письмо не выбрано',
    'empty.chooseEmail': 'Выберите письмо из входящих, чтобы прочитать его.',

    'dialog.import.title': 'Импорт ящиков',
    'dialog.import.hint': 'Вставьте по одному ящику на строку в формате <code>email:password</code>.',
    'dialog.import.placeholder': 'my@mail.com:password\nother@mail.com:password',
    'dialog.import.submit': 'Импортировать',
    'dialog.settings.title': 'Настройки',
    'dialog.settings.language': 'Язык интерфейса',
    'dialog.settings.readMode': 'Режим чтения',
    'dialog.settings.messageLimit': 'Лимит писем',
    'dialog.settings.apiToken': 'Токен NotLetters API',
    'dialog.settings.apiTokenPlaceholderSaved': 'Токен сохранён; оставьте пустым, чтобы не менять',
    'dialog.settings.apiTokenPlaceholderEmpty': 'Вставьте токен NotLetters API',
    'dialog.settings.clearApiToken': 'Удалить сохранённый API-токен',
    'dialog.settings.apiBaseUrl': 'Базовый URL API',
    'dialog.settings.imapHost': 'IMAP-хост',
    'dialog.settings.imapPort': 'IMAP-порт',
    'dialog.settings.imapSecure': 'Использовать IMAP SSL/TLS',
    'dialog.settings.save': 'Сохранить',
    'common.cancel': 'Отмена',

    'message.unknownSender': '(неизвестный отправитель)',
    'message.noSubject': '(без темы)',
    'message.read': 'Прочитано',
    'message.unread': 'Непрочитано',

    'reader.from': 'От:',
    'reader.to': 'Кому:',
    'reader.date': 'Дата:',
    'reader.showHtml': 'Показать HTML',
    'reader.showText': 'Показать текст',
    'reader.htmlAvailable': 'Доступна HTML-версия письма.',
    'reader.emptyMessage': '(пустое письмо)',
    'reader.loadingTitle': 'Загружаю письмо',
    'reader.loadingText': 'Подождите немного.',
    'reader.cannotReadTitle': 'Не удалось прочитать письмо',
    'reader.cannotOpenTitle': 'Не удалось открыть входящие',

    'status.loading': 'Загрузка через {mode}...',
    'status.messages': '{count} писем · {source}',
    'status.error': 'Ошибка',
    'status.apiReadUnavailable': 'Статус прочтения недоступен в API-режиме',
    'status.markedRead': 'Отмечено как прочитанное',
    'status.markedReadCount': 'Отмечено как прочитанное: {count}',
    'status.deleted': 'Ящик удалён из клиента.',
    'status.importing': 'Импортирую...',
    'status.importResult': 'Импортировано: {imported}, обновлено: {updated}, пропущено: {skipped}. Всего: {total}.',
    'status.saving': 'Сохраняю...',
    'status.saved': 'Сохранено.',

    'error.APP_AUTH_FAILED': 'Неверный APP_PASSWORD.',
    'error.APP_PASSWORD_NOT_CONFIGURED': 'APP_PASSWORD не настроен. Укажите его в файле .env перед запуском приложения.',
    'error.IMPORT_EMPTY': 'Не найдено ни одного корректного аккаунта.',
    'error.ACCOUNT_NOT_FOUND': 'Аккаунт не найден.',
    'error.API_MARK_READ_UNSUPPORTED': 'Отметка о прочтении доступна только в режиме IMAP.',
    'error.IMAP_BAD_CREDENTIALS': 'IMAP отклонил этот email/пароль: неверные учётные данные. Повторно импортируйте этот ящик с точным актуальным паролем или используйте режим NotLetters API, если вход через сайт работает, а через IMAP — нет.',
    'error.IMAP_TIMEOUT': 'Истекло время ожидания подключения к IMAP. Попробуйте ещё раз через несколько секунд. Если ошибка повторяется, NotLetters может ограничивать подключения или IMAP-сервер не отвечает для этого ящика.',
    'error.IMAP_CONNECTION_FAILED': 'Не удалось подключиться к IMAP. Проверьте IMAP-хост, порт и подключение к интернету.',
    'error.IMAP_ERROR': 'Не удалось открыть IMAP-ящик.',
    'error.NOTLETTERS_API_TOKEN_MISSING': 'Не указан токен NotLetters API. Добавьте его в настройках или переключитесь на режим IMAP.',
    'error.NOTLETTERS_API_ERROR': 'NotLetters API вернул ошибку.',
    'error.INTERNAL_ERROR': 'Внутренняя ошибка сервера.'
  }
};

const state = {
  accounts: [],
  settings: null,
  activeAccountId: null,
  activeMessageUid: null,
  activeMessage: null,
  sortNewestFirst: false,
  messages: [],
  htmlVisible: false,
  selectedUids: new Set(),
  accountRequestId: 0,
  messageRequestId: 0,
  deleteAccountId: null,
  authGeneration: 0,
  language: localStorage.getItem('inboxClientLanguage') || 'en',
  appPassword: ''
};

const $ = (selector) => document.querySelector(selector);
const accountsList = $('#accountsList');
const messagesList = $('#messagesList');
const reader = $('#reader');
const statusText = $('#statusText');

const avatarColors = ['#e91e63', '#1976d2', '#7e57c2', '#00897b', '#f4511e', '#546e7a', '#8e24aa', '#039be5', '#5e6772', '#43a047'];

function t(key, vars = {}) {
  const dictionary = translations[state.language] || translations.en;
  const template = dictionary[key] || translations.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? ''));
}

function localizedError(error) {
  const code = error?.code ? `error.${error.code}` : '';
  if (code) {
    const dictionary = translations[state.language] || translations.en;
    if (dictionary[code] || translations.en[code]) {
      return t(code);
    }
  }

  return error?.message || t('status.error');
}

function applyI18n() {
  document.documentElement.lang = state.language;
  document.title = t('app.title');
  $('#languageSelect').value = state.language;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((element) => {
    element.title = t(element.dataset.i18nTitle);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAriaLabel));
  });

  renderSortControl();
  renderModeBadge();

  if (!state.activeAccountId) {
    $('#currentAccount').textContent = t('current.select');
    renderMessages();
    renderEmptyReader();
  } else {
    renderMessages();
    if (state.activeMessage) {
      renderMessage(state.activeMessage);
    } else {
      renderEmptyReader();
    }
    setStatus(t('status.messages', { count: state.messages.length, source: currentMode().toUpperCase() }));
  }
}

async function api(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    'X-App-Password': state.appPassword,
    ...(options.headers || {})
  };

  const response = await fetch(path, { headers, ...options });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'object' ? payload.error : payload;
    const code = typeof payload === 'object' ? payload.code : '';

    if (code === 'APP_AUTH_FAILED') {
      ++state.authGeneration;
      ++state.accountRequestId;
      ++state.messageRequestId;
      state.appPassword = '';
      showLogin(t('error.APP_AUTH_FAILED'));
    }

    const error = new Error(message || `Request failed: ${response.status}`);
    error.code = code;
    error.status = response.status;
    throw error;
  }

  return payload;
}

function showLogin(message = '') {
  $('#loginOverlay').classList.remove('hidden');
  $('#loginError').textContent = message;
  $('#appPassword').focus();
}

function hideLogin() {
  $('#loginOverlay').classList.add('hidden');
  $('#loginError').textContent = '';
}

function setStatus(text) {
  statusText.textContent = text || '';
}

function currentMode() {
  return state.settings?.readMode || 'imap';
}


function renderSortControl() {
  $('#sortButton').title = state.sortNewestFirst ? t('sort.newest') : t('sort.oldest');
  $('#sortButton').textContent = state.sortNewestFirst ? '⌄' : '⌃';
}

function renderModeBadge() {
  const mode = currentMode();
  $('#modeBadge').textContent = mode === 'api' ? 'API' : 'IMAP';
  $('#modeBadge').className = `mode-badge ${mode === 'api' ? 'api' : 'imap'}`;
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(state.language === 'ru' ? 'ru-RU' : 'en-US', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function avatarFor(email) {
  const first = (email || '?')[0].toUpperCase();
  const sum = [...email].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return { label: first, color: avatarColors[sum % avatarColors.length] };
}

function sortedAccounts() {
  const term = $('#accountSearch').value.trim().toLowerCase();
  return [...state.accounts]
    .filter((account) => !term || account.email.includes(term))
    .sort((a, b) => {
      const left = new Date(a.createdAt).getTime();
      const right = new Date(b.createdAt).getTime();
      return state.sortNewestFirst ? right - left : left - right;
    });
}

function renderAccounts() {
  $('#accountCount').textContent = state.accounts.length ? `(${state.accounts.length})` : '';
  accountsList.innerHTML = '';

  for (const account of sortedAccounts()) {
    const avatar = avatarFor(account.email);
    const wrapper = document.createElement('div');
    wrapper.className = `account-item ${account.id === state.activeAccountId ? 'active' : ''}`;
    const open = document.createElement('button');
    open.className = 'account-row';
    open.title = account.email;
    const avatarElement = document.createElement('span');
    avatarElement.className = 'avatar';
    avatarElement.style.background = avatar.color;
    avatarElement.textContent = avatar.label;
    const label = document.createElement('span');
    label.className = 'account-email';
    label.textContent = account.email;
    open.append(avatarElement, label);
    open.addEventListener('click', () => selectAccount(account.id));
    const remove = document.createElement('button');
    remove.className = 'icon-btn delete-account';
    remove.type = 'button';
    remove.textContent = '×';
    remove.title = t('actions.delete');
    remove.setAttribute('aria-label', `${t('actions.delete')}: ${account.email}`);
    remove.addEventListener('click', () => openDelete(account));
    wrapper.append(open, remove);
    accountsList.appendChild(wrapper);
  }
}

function updateReadButton() {
  $('#readButton').disabled = currentMode() === 'api' || (!state.activeMessageUid && !state.selectedUids.size);
}

function updateSelectAll() {
  const selectAll = $('#selectAll');
  const selectable = currentMode() !== 'api' && state.messages.length > 0;
  selectAll.disabled = !selectable;
  selectAll.checked = selectable && state.selectedUids.size === state.messages.length;
  selectAll.indeterminate = selectable && state.selectedUids.size > 0 && !selectAll.checked;
  updateReadButton();
}

function renderMessages() {
  updateSelectAll();
  if (!state.activeAccountId) {
    messagesList.className = 'messages-list empty-state';
    messagesList.innerHTML = `<div class="empty-icon">▱</div><h2>${t('empty.nothing')}</h2><p>${t('empty.selectOrImport')}</p>`;
    return;
  }

  if (!state.messages.length) {
    messagesList.className = 'messages-list empty-state';
    messagesList.innerHTML = `<div class="empty-icon">▱</div><h2>${t('empty.nothing')}</h2><p>${t('empty.emptyInbox')}</p>`;
    return;
  }

  messagesList.className = 'messages-list';
  messagesList.innerHTML = '';

  for (const message of state.messages) {
    const uid = String(message.uid);
    const row = document.createElement('div');
    row.className = `message-row ${uid === String(state.activeMessageUid) ? 'active' : ''} ${message.seen ? '' : 'unseen'}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'message-select';
    checkbox.checked = state.selectedUids.has(uid);
    checkbox.disabled = currentMode() === 'api';
    checkbox.setAttribute('aria-label', `${t('toolbar.selectMessage')}: ${message.subject || t('message.noSubject')}`);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) state.selectedUids.add(uid);
      else state.selectedUids.delete(uid);
      updateSelectAll();
    });
    const open = document.createElement('button');
    open.className = 'message-open';
    open.innerHTML = `
      <div class="msg-line">
        <span class="msg-from"></span>
        <span class="msg-date">${formatDate(message.date)}</span>
      </div>
      <div class="msg-subject"></div>
      <div class="msg-meta">${message.source === 'api' ? 'API' : (message.seen ? t('message.read') : t('message.unread'))} · ${Math.round((message.size || 0) / 1024)} KB</div>
    `;
    open.querySelector('.msg-from').textContent = message.from || t('message.unknownSender');
    open.querySelector('.msg-subject').textContent = message.subject || t('message.noSubject');
    open.addEventListener('click', () => selectMessage(uid));
    row.append(checkbox, open);
    messagesList.appendChild(row);
  }
}

function renderEmptyReader() {
  reader.className = 'reader empty-reader';
  reader.innerHTML = `<div class="empty-icon">✉</div><h2>${t('empty.noMessage')}</h2><p>${t('empty.chooseEmail')}</p>`;
  updateReadButton();
}

function safeHtmlDocument(html) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:; base-uri 'none'; form-action 'none'"></head><body>${html}</body></html>`;
}

function renderMessage(message) {
  reader.className = 'reader';
  const hasHtml = Boolean(message.html);
  const bodyText = message.text || (hasHtml ? t('reader.htmlAvailable') : t('reader.emptyMessage'));

  reader.innerHTML = `
    <div class="reader-head">
      <h1 class="reader-subject"></h1>
      <div class="reader-meta">
        <div><strong>${t('reader.from')}</strong> <span data-field="from"></span></div>
        <div><strong>${t('reader.to')}</strong> <span data-field="to"></span></div>
        <div><strong>${t('reader.date')}</strong> <span data-field="date"></span></div>
      </div>
      <div class="reader-actions">
        ${hasHtml ? `<button class="secondary" id="toggleHtml" type="button">${t('reader.showHtml')}</button>` : ''}
      </div>
    </div>
    <div class="reader-body"></div>
    <div class="reader-attachments" hidden><strong>${t('reader.attachments')}</strong><div class="attachment-list"></div></div>
  `;

  reader.querySelector('.reader-subject').textContent = message.subject || t('message.noSubject');
  reader.querySelector('[data-field="from"]').textContent = message.from || '';
  reader.querySelector('[data-field="to"]').textContent = message.to || '';
  reader.querySelector('[data-field="date"]').textContent = message.date ? new Date(message.date).toLocaleString(state.language === 'ru' ? 'ru-RU' : 'en-US') : '';
  reader.querySelector('.reader-body').textContent = bodyText;

  if (message.attachments?.length && currentMode() === 'imap') {
    const area = reader.querySelector('.reader-attachments');
    area.hidden = false;
    message.attachments.forEach((attachment, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'secondary attachment-button';
      const size = attachment.size > 0 && attachment.size < 1024 ? '<1 KB' : `${Math.round((attachment.size || 0) / 1024)} KB`;
      button.textContent = `${attachment.filename || 'attachment'} (${size}) ↓`;
      button.addEventListener('click', () => downloadAttachment(index, attachment.filename || 'attachment'));
      area.querySelector('.attachment-list').appendChild(button);
    });
  }

  const toggle = $('#toggleHtml');
  if (toggle) {
    toggle.addEventListener('click', () => {
      state.htmlVisible = !state.htmlVisible;
      toggle.textContent = state.htmlVisible ? t('reader.showText') : t('reader.showHtml');
      const body = reader.querySelector('.reader-body');
      if (state.htmlVisible) {
        body.innerHTML = '<iframe class="reader-frame" sandbox=""></iframe>';
        body.querySelector('iframe').srcdoc = safeHtmlDocument(message.html);
      } else {
        body.textContent = bodyText;
      }
    });
  }

  updateReadButton();
}

async function loadSettings() {
  const result = await api('/api/settings');
  state.settings = result.settings;
  renderModeBadge();
}

async function loadAccounts() {
  const result = await api('/api/accounts');
  state.accounts = result.accounts || [];
  renderAccounts();
}

async function selectAccount(accountId) {
  const requestId = ++state.accountRequestId;
  ++state.messageRequestId;
  state.activeAccountId = accountId;
  state.activeMessageUid = null;
  state.activeMessage = null;
  state.htmlVisible = false;
  state.messages = [];
  state.selectedUids.clear();
  $('#mainPanel').classList.remove('is-reading');
  const account = state.accounts.find((item) => item.id === accountId);
  $('#currentAccount').textContent = account?.email || t('current.select');
  renderAccounts();
  renderMessages();
  renderEmptyReader();
  setStatus(t('status.loading', { mode: currentMode().toUpperCase() }));

  try {
    const result = await api(`/api/accounts/${accountId}/messages`);
    if (requestId !== state.accountRequestId || state.activeAccountId !== accountId) return;
    state.messages = result.messages || [];
    renderMessages();
    setStatus(t('status.messages', { count: state.messages.length, source: String(result.source || currentMode()).toUpperCase() }));
  } catch (error) {
    if (requestId !== state.accountRequestId) return;
    if (error.code === 'APP_AUTH_FAILED') return;
    setStatus(t('status.error'));
    messagesList.className = 'messages-list empty-state';
    messagesList.innerHTML = `<div class="empty-icon">!</div><h2>${t('reader.cannotOpenTitle')}</h2><p></p>`;
    messagesList.querySelector('p').textContent = localizedError(error);
  }
}

async function selectMessage(uid) {
  const accountId = state.activeAccountId;
  const requestId = ++state.messageRequestId;
  state.activeMessageUid = String(uid);
  state.activeMessage = null;
  state.htmlVisible = false;
  $('#mainPanel').classList.add('is-reading');
  renderMessages();
  reader.className = 'reader empty-reader';
  reader.innerHTML = `<div class="empty-icon">↻</div><h2>${t('reader.loadingTitle')}</h2><p>${t('reader.loadingText')}</p>`;

  try {
    const result = await api(`/api/accounts/${accountId}/messages/${encodeURIComponent(uid)}`);
    if (requestId !== state.messageRequestId || state.activeAccountId !== accountId) return;
    state.activeMessage = result.message;
    renderMessage(result.message);
  } catch (error) {
    if (requestId !== state.messageRequestId || state.activeAccountId !== accountId) return;
    if (error.code === 'APP_AUTH_FAILED') return;
    reader.className = 'reader empty-reader';
    reader.innerHTML = `<div class="empty-icon">!</div><h2>${t('reader.cannotReadTitle')}</h2><p></p>`;
    reader.querySelector('p').textContent = localizedError(error);
  }
}

async function markSelectedRead() {
  const accountId = state.activeAccountId;
  const uids = state.selectedUids.size ? [...state.selectedUids] : (state.activeMessageUid ? [state.activeMessageUid] : []);
  if (!accountId || !uids.length) return;
  if (currentMode() === 'api') {
    setStatus(t('status.apiReadUnavailable'));
    return;
  }

  $('#readButton').disabled = true;
  try {
    let count = 0;
    for (const uid of uids) {
      await api(`/api/accounts/${accountId}/messages/${encodeURIComponent(uid)}/seen`, { method: 'POST' });
      count++;
      if (state.activeAccountId === accountId) {
        const message = state.messages.find((item) => String(item.uid) === String(uid));
        if (message) message.seen = true;
        if (state.activeMessage && String(state.activeMessageUid) === String(uid)) state.activeMessage.seen = true;
      }
    }
    if (state.activeAccountId === accountId) {
      state.selectedUids.clear();
      renderMessages();
      setStatus(t('status.markedReadCount', { count }));
    }
  } catch (error) {
    if (state.activeAccountId === accountId) {
      renderMessages();
      setStatus(localizedError(error));
    }
  } finally {
    updateReadButton();
  }
}

async function downloadAttachment(index, filename) {
  const accountId = state.activeAccountId;
  const uid = state.activeMessageUid;
  try {
    const response = await fetch(`/api/accounts/${accountId}/messages/${encodeURIComponent(uid)}/attachments/${index}`, {
      headers: { 'X-App-Password': state.appPassword }
    });
    if (!response.ok) {
      const payload = await response.json();
      const error = new Error(payload.error || 'Cannot download attachment.');
      error.code = payload.code;
      throw error;
    }
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  } catch (error) {
    if (error.code === 'APP_AUTH_FAILED') {
      logout();
      showLogin(t('error.APP_AUTH_FAILED'));
    } else {
      setStatus(localizedError(error));
    }
  }
}

function openDelete(account) {
  state.deleteAccountId = account.id;
  $('#deletePrompt').textContent = t('dialog.delete.prompt', { email: account.email });
  $('#deleteDialog').showModal();
}

async function confirmDelete() {
  const accountId = state.deleteAccountId;
  if (!accountId) return;
  $('#confirmDelete').disabled = true;
  try {
    await api(`/api/accounts/${accountId}`, { method: 'DELETE' });
    $('#deleteDialog').close();
    state.deleteAccountId = null;
    if (state.activeAccountId === accountId) {
      ++state.accountRequestId;
      ++state.messageRequestId;
      state.activeAccountId = null;
      state.activeMessageUid = null;
      state.activeMessage = null;
      state.messages = [];
      state.selectedUids.clear();
      $('#mainPanel').classList.remove('is-reading');
      $('#currentAccount').textContent = t('current.select');
      renderMessages();
      renderEmptyReader();
    }
    await loadAccounts();
    setStatus(t('status.deleted'));
  } catch (error) {
    $('#deletePrompt').textContent = localizedError(error);
  } finally {
    $('#confirmDelete').disabled = false;
  }
}

function openImport() {
  $('#importResult').textContent = '';
  $('#importResult').className = 'import-result';
  $('#importDialog').showModal();
  $('#importText').focus();
}

async function submitImport() {
  const text = $('#importText').value;
  const resultEl = $('#importResult');
  resultEl.className = 'import-result';
  resultEl.textContent = t('status.importing');

  try {
    const result = await api('/api/accounts/import', {
      method: 'POST',
      body: JSON.stringify({ text })
    });
    resultEl.textContent = t('status.importResult', {
      imported: result.imported.length,
      updated: result.updated.length,
      skipped: result.errors.length,
      total: result.total
    });
    await loadAccounts();
    setTimeout(() => $('#importDialog').close(), 700);
  } catch (error) {
    resultEl.className = 'import-result error';
    resultEl.textContent = localizedError(error);
  }
}

function fillSettingsForm() {
  const settings = state.settings || {};
  $('#languageSelect').value = state.language;
  $('#readMode').value = settings.readMode || 'imap';
  $('#messageLimit').value = settings.messageLimit || 50;
  $('#apiToken').value = '';
  $('#apiToken').placeholder = settings.hasApiToken ? t('dialog.settings.apiTokenPlaceholderSaved') : t('dialog.settings.apiTokenPlaceholderEmpty');
  $('#clearApiToken').checked = false;
  $('#apiBaseUrl').value = settings.apiBaseUrl || 'https://api.notletters.com/v1';
  $('#imapHost').value = settings.imapHost || 'imap.notletters.com';
  $('#imapPort').value = settings.imapPort || 993;
  $('#imapSecure').checked = settings.imapSecure !== false;
  $('#settingsResult').textContent = '';
  $('#settingsResult').className = 'import-result';
}

function openSettings() {
  fillSettingsForm();
  $('#settingsDialog').showModal();
}

async function saveSettingsFromForm() {
  const resultEl = $('#settingsResult');
  resultEl.className = 'import-result';
  resultEl.textContent = t('status.saving');

  try {
    const selectedLanguage = $('#languageSelect').value;
    const result = await api('/api/settings', {
      method: 'PUT',
      body: JSON.stringify({
        readMode: $('#readMode').value,
        messageLimit: Number($('#messageLimit').value || 50),
        apiToken: $('#apiToken').value,
        clearApiToken: $('#clearApiToken').checked,
        apiBaseUrl: $('#apiBaseUrl').value,
        imapHost: $('#imapHost').value,
        imapPort: Number($('#imapPort').value || 993),
        imapSecure: $('#imapSecure').checked
      })
    });

    state.settings = result.settings;
    if (selectedLanguage !== state.language) {
      state.language = selectedLanguage;
      localStorage.setItem('inboxClientLanguage', state.language);
      applyI18n();
    } else {
      renderModeBadge();
    }
    resultEl.textContent = t('status.saved');
    setTimeout(() => $('#settingsDialog').close(), 500);
    if (state.activeAccountId) selectAccount(state.activeAccountId);
  } catch (error) {
    resultEl.className = 'import-result error';
    resultEl.textContent = localizedError(error);
  }
}

async function bootstrap() {
  const generation = ++state.authGeneration;
  try {
    const settings = await api('/api/settings');
    const accounts = await api('/api/accounts');
    if (generation !== state.authGeneration) return;
    state.settings = settings.settings;
    state.accounts = accounts.accounts || [];
    renderAccounts();
    renderModeBadge();
    hideLogin();
    $('#appPassword').value = '';
    applyI18n();
  } catch (error) {
    if (generation !== state.authGeneration) return;
    if (error.code !== 'APP_AUTH_FAILED') {
      showLogin(localizedError(error));
    }
  }
}

$('#loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const password = $('#appPassword').value;
  state.appPassword = password;
  await bootstrap();
});

function logout() {
  ++state.authGeneration;
  ++state.accountRequestId;
  ++state.messageRequestId;
  state.appPassword = '';
  state.settings = null;
  state.accounts = [];
  state.messages = [];
  state.selectedUids.clear();
  state.activeAccountId = null;
  state.activeMessageUid = null;
  state.activeMessage = null;
  state.deleteAccountId = null;
  $('#currentAccount').textContent = t('current.select');
  $('#mainPanel').classList.remove('is-reading');
  for (const dialog of document.querySelectorAll('dialog[open]')) dialog.close();
  renderAccounts();
  renderMessages();
  renderEmptyReader();
  setStatus('');
  $('#appPassword').value = '';
  showLogin();
}

$('#importButton').addEventListener('click', openImport);
$('#cancelImport').addEventListener('click', () => $('#importDialog').close());
$('#submitImport').addEventListener('click', submitImport);
$('#settingsButton').addEventListener('click', openSettings);
$('#cancelSettings').addEventListener('click', () => $('#settingsDialog').close());
$('#saveSettings').addEventListener('click', saveSettingsFromForm);
$('#sortButton').addEventListener('click', () => {
  state.sortNewestFirst = !state.sortNewestFirst;
  renderSortControl();
  renderAccounts();
});
$('#accountSearch').addEventListener('input', renderAccounts);
$('#refreshButton').addEventListener('click', () => {
  if (state.activeAccountId) selectAccount(state.activeAccountId);
});
$('#readButton').addEventListener('click', markSelectedRead);
$('#selectAll').addEventListener('change', (event) => {
  state.selectedUids = new Set(event.target.checked ? state.messages.map((message) => String(message.uid)) : []);
  renderMessages();
});
$('#logoutButton').addEventListener('click', logout);
$('#backButton').addEventListener('click', () => $('#mainPanel').classList.remove('is-reading'));
$('#cancelDelete').addEventListener('click', () => { state.deleteAccountId = null; $('#deleteDialog').close(); });
$('#confirmDelete').addEventListener('click', confirmDelete);

applyI18n();
localStorage.removeItem('inboxClientAppPassword');
showLogin();
