// HAVAS local server: static files + POST /api/inquiry forwarded to Telegram.
// Configure TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the environment or in a .env file next to this script.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || '127.0.0.1';

loadEnv(path.join(root, '.env'));

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};
// Only these top-level entries are public; tooling and secrets stay private.
const publicRoots = new Set(['index.html', 'assets', 'css', 'js']);

function loadEnv(file) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    return;
  }
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  res.end(body);
}

function serveStatic(req, res) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    return send(res, 400, 'Bad request');
  }
  let file = path.resolve(root, '.' + pathname);
  if (file !== root && !file.startsWith(root + path.sep)) return send(res, 403, 'Forbidden');
  // Extension-less paths are client-side routes.
  if (!path.extname(file)) file = path.join(root, 'index.html');
  const top = path.relative(root, file).split(path.sep)[0];
  if (!publicRoots.has(top)) return send(res, 404, 'Not found');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    send(res, 200, data, mime[path.extname(file)] || 'application/octet-stream');
  });
}

const fieldNames = {
  subject: 'Тема',
  name: 'Имя',
  contact: 'Контакт',
  date: 'Дата',
  guests: 'Гостей',
  destination: 'Направление',
  interest: 'Интерес',
  message: 'Сообщение',
};
const recent = new Map(); // ip -> timestamps, simple rate limit

function readJson(req, limit = 16 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > limit) {
        reject(new Error('too large'));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

async function handleInquiry(req, res) {
  const json = (status, body) => send(res, status, JSON.stringify(body), mime['.json']);
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env;
  if (!token || !chatId) return json(503, { ok: false, error: 'not_configured' });

  const ip = req.socket.remoteAddress;
  const now = Date.now();
  const times = (recent.get(ip) || []).filter((t) => now - t < 60_000);
  if (times.length >= 5) return json(429, { ok: false, error: 'rate_limited' });
  recent.set(ip, [...times, now]);

  let data;
  try {
    data = await readJson(req);
  } catch {
    return json(400, { ok: false, error: 'invalid_body' });
  }
  if (!data || typeof data.name !== 'string' || typeof data.contact !== 'string' || !data.contact.trim()) {
    return json(400, { ok: false, error: 'missing_fields' });
  }

  const lines = ['Новая заявка с сайта HAVAS'];
  for (const [key, label] of Object.entries(fieldNames)) {
    const value = String(data[key] ?? '')
      .trim()
      .slice(0, 1500);
    if (value) lines.push(`${label}: ${value}`);
  }
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
    });
    if (!r.ok) throw new Error('telegram ' + r.status);
    json(200, { ok: true });
  } catch (err) {
    console.error('Inquiry delivery failed:', err.message);
    json(502, { ok: false, error: 'delivery_failed' });
  }
}

http
  .createServer((req, res) => {
    if (req.url.split('?')[0] === '/api/inquiry') {
      if (req.method !== 'POST') return send(res, 405, 'Method not allowed');
      return handleInquiry(req, res);
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed');
    serveStatic(req, res);
  })
  .listen(port, host, () => {
    const tg = process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID ? 'включена' : 'не настроена';
    console.log(`HAVAS: http://${host}:${port}  (отправка заявок в Telegram ${tg})`);
  });
