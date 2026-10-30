// Interface language: pages are rendered in Russian, then their text is swapped
// using per-language dictionaries keyed by the Russian source text (js/i18n/*.js).
// scripts/i18n-extract.js collects every key with the same unit rules as below.

export const languages = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'uz', label: 'UZ', name: 'Oʻzbekcha' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];
const STORAGE_KEY = 'havas-lang';
const ATTRS = ['placeholder', 'aria-label', 'alt', 'title'];
const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'SVG']);

let current = 'ru';
let dict = null;
let observer = null;

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const hasLetters = (s) => /[А-Яа-яЁё]/.test(s);

// An element made only of text and <br> is translated as one unit ("line\nline").
function brUnit(el) {
  let br = false;
  for (const n of el.childNodes) {
    if (n.nodeType === 1 && n.tagName === 'BR') br = true;
    else if (n.nodeType !== 3) return null;
  }
  if (!br) return null;
  const lines = [];
  let line = '';
  for (const n of el.childNodes) {
    if (n.nodeType === 3) line += n.nodeValue;
    else {
      lines.push(norm(line));
      line = '';
    }
  }
  lines.push(norm(line));
  return lines.filter(Boolean).join('\n');
}

// Visits every translatable unit under root: cb(key, apply(translation)).
export function walkUnits(root, cb) {
  const visit = (el) => {
    for (const a of ATTRS) {
      const v = el.getAttribute?.(a);
      if (v && hasLetters(v)) cb(norm(v), (t) => el.setAttribute(a, t));
    }
    if (SKIP.has(el.tagName?.toUpperCase())) return;
    const unit = brUnit(el);
    if (unit !== null) {
      if (hasLetters(unit))
        cb(unit, (t) => {
          el.textContent = '';
          t.split('\n').forEach((line, i) => {
            if (i) el.append(el.ownerDocument.createElement('br'), ' ');
            el.append(line);
          });
        });
      return;
    }
    for (const n of [...el.childNodes]) {
      if (n.nodeType === 1) visit(n);
      else if (n.nodeType === 3 && hasLetters(n.nodeValue)) {
        const v = n.nodeValue;
        const lead = v.match(/^\s*/)[0];
        const trail = v.match(/\s*$/)[0];
        cb(norm(v), (t) => (n.nodeValue = lead + t + trail));
      }
    }
  };
  visit(root);
}

function lookup(key) {
  if (!dict) return null;
  if (Object.hasOwn(dict.strings, key)) return dict.strings[key];
  for (const [re, to] of dict.patterns || []) if (re.test(key)) return key.replace(re, to);
  return null;
}

export function translate(text) {
  return (current !== 'ru' && lookup(norm(text))) || text;
}

export function translateTree(root) {
  if (current === 'ru' || !dict) return;
  walkUnits(root, (key, apply) => {
    const t = lookup(key);
    if (t) apply(t);
  });
}

export function getLang() {
  return current;
}

export async function initLang() {
  let saved = new URLSearchParams(location.search).get('lang');
  try {
    saved ||= localStorage.getItem(STORAGE_KEY);
  } catch {}
  await setLang(languages.some((l) => l.code === saved) ? saved : 'ru', false);
}

export async function setLang(code, persist = true) {
  current = code;
  dict = code === 'ru' ? null : (await import(`./i18n/${code}.js`)).default;
  document.documentElement.lang = code;
  if (persist)
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  // Text inserted later (filters, form messages) is translated as it appears.
  observer?.disconnect();
  if (code !== 'ru') {
    observer = new MutationObserver((records) => {
      observer.disconnect();
      for (const r of records)
        for (const n of r.addedNodes)
          if (n.nodeType === 1) translateTree(n);
          else if (n.nodeType === 3 && n.parentElement) translateTree(n.parentElement);
      observer.observe(document.body, { childList: true, subtree: true });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}
