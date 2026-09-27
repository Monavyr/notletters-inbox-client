# NotLetters Inbox Client

[Русский](#ru) · [English](#en)

<a id="ru"></a>

## Русский

**NotLetters Inbox Client** — локальное веб-приложение для просмотра входящих писем нескольких ящиков NotLetters. Оно не отправляет письма и не открывает другие папки.

### Возможности

- Импорт нескольких ящиков в формате `email:password`; поиск, сортировка и удаление ящиков из клиента. Удаление из клиента не удаляет сам почтовый ящик.
- Просмотр входящих через IMAP или NotLetters API.
- В режиме IMAP: отметка одного или нескольких писем как прочитанных и скачивание вложений.
- Интерфейс на русском и английском языках, адаптированный для телефона.
- Просмотр текста письма или его HTML-версии в изолированном окне. Загрузка внешних изображений в HTML-версии заблокирована.

### Запуск на компьютере

Требуется **Node.js 20 или новее**. Скопируйте `.env.example` в `.env` с помощью файлового менеджера или терминала. Откройте `.env` и задайте собственные надёжные значения `APP_PASSWORD` и `APP_SECRET`. Затем выполните в терминале из папки проекта:

```
npm install
npm start
```

Откройте [http://127.0.0.1:3000](http://127.0.0.1:3000), войдите с `APP_PASSWORD` и импортируйте ящики по одному на строку в формате `email:password`. Пустые строки и строки, начинающиеся с `#`, пропускаются; повторный импорт ящика обновляет сохранённый пароль.

### Режимы чтения

**IMAP** используется по умолчанию. Адрес `imap.notletters.com:993` и другие параметры можно изменить в настройках.

Для режима **NotLetters API** выберите его в настройках и добавьте API-токен. В этом режиме письма доступны только для чтения: отметка о прочтении и скачивание вложений не поддерживаются.

### Данные и ограничения

- `APP_PASSWORD` хранится только в памяти открытой страницы: после обновления страницы или выхода его нужно ввести снова. Выбранный язык сохраняется в браузере.
- Пароли ящиков и API-токен шифруются при сохранении с помощью `APP_SECRET` в `data/accounts.json`. Не меняйте `APP_SECRET` после импорта: ранее сохранённые данные перестанут расшифровываться.
- Файлы `.env` и `data/accounts.json` исключены из Git. Не добавляйте в репозиторий реальные пароли, токены или письма.
- По умолчанию сервер доступен только на `127.0.0.1`. Хранилище рассчитано на один процесс приложения.
- Для работы нужен Node.js-сервер. **GitHub Pages не может запустить это приложение**; исходный код можно хранить на GitHub.

### Проверки

Команда `npm test` проверяет одновременное сохранение данных и обработку ответа API. Интерфейс проверен с учебными ответами API. Подключение к реальным ящикам через IMAP и NotLetters API требует отдельной проверки с собственными учётными данными.

---

<a id="en"></a>

## English

**NotLetters Inbox Client** is a local web application for reading the inboxes of multiple NotLetters mailboxes. It does not send mail or open other folders.

### Features

- Import multiple mailboxes in `email:password` format; search, sort, and remove mailboxes from the client. Removing a mailbox from the client does not delete the mailbox itself.
- Read inbox messages through IMAP or the NotLetters API.
- In IMAP mode: mark one or several messages as read and download attachments.
- An English and Russian interface adapted for phones.
- View message text or its HTML version in a sandboxed frame. External images are blocked in the HTML version.

### Run on your computer

**Node.js 20 or newer** is required. Copy `.env.example` to `.env` using your file manager or terminal. Open `.env` and set your own strong values for `APP_PASSWORD` and `APP_SECRET`. Then run the following in a terminal from the project directory:

```
npm install
npm start
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000), sign in with `APP_PASSWORD`, and import one mailbox per line in `email:password` format. Blank lines and lines beginning with `#` are skipped; importing the same mailbox again updates its saved password.

### Reading modes

**IMAP** is the default. You can change `imap.notletters.com:993` and other connection settings in Settings.

For **NotLetters API** mode, select it in Settings and add an API token. Messages are read-only in this mode: marking them as read and downloading attachments are not supported.

### Data and limitations

- `APP_PASSWORD` stays only in the memory of the open page: you must enter it again after reloading the page or signing out. The selected language is saved in the browser.
- Mailbox passwords and the API token are encrypted at rest with `APP_SECRET` in `data/accounts.json`. Do not change `APP_SECRET` after importing: previously saved data will no longer decrypt.
- `.env` and `data/accounts.json` are excluded from Git. Do not commit real passwords, tokens, or messages.
- By default, the server is accessible only on `127.0.0.1`. The data store is designed for one application process.
- The application requires a Node.js server. **GitHub Pages cannot run this application**; its source code can be stored on GitHub.

### Checks

Run `npm test` to check concurrent data updates and API response handling. The interface was checked with mock API responses. Connections to real mailboxes through IMAP and the NotLetters API require separate testing with your own credentials.
