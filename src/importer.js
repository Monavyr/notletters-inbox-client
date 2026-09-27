const EMAIL_RE = /^[^@\s:]+@[^@\s:]+\.[^@\s:]+$/;

export function parseImportText(text) {
  const pairs = [];
  const errors = [];
  const seen = new Set();

  const lines = String(text || '').split(/\r?\n/);
  lines.forEach((rawLine, index) => {
    const lineNo = index + 1;
    const line = rawLine.trim();

    if (!line || line.startsWith('#')) return;

    const colonIndex = line.indexOf(':');
    if (colonIndex <= 0) {
      errors.push({ line: lineNo, reason: 'Expected email:password' });
      return;
    }

    const email = line.slice(0, colonIndex).trim().toLowerCase();
    const password = line.slice(colonIndex + 1);

    if (!EMAIL_RE.test(email)) {
      errors.push({ line: lineNo, reason: 'Invalid email address' });
      return;
    }

    if (!password) {
      errors.push({ line: lineNo, reason: 'Empty password' });
      return;
    }

    if (seen.has(email)) {
      errors.push({ line: lineNo, reason: 'Duplicate email in this import' });
      return;
    }

    seen.add(email);
    pairs.push({ email, password });
  });

  return { pairs, errors };
}
