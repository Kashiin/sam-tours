// Renders every page in jsdom, collects all Russian text units (same rules as js/i18n.js)
// and reports which of them are missing from each translation dictionary.
//   node scripts/i18n-extract.js            -> summary
//   node scripts/i18n-extract.js --missing  -> writes i18n-missing.json with untranslated keys
import { readFileSync, writeFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(
  '<!doctype html><body><a class="skip" href="#main">К содержимому</a><header id="header"></header><main id="main"></main><footer id="footer"></footer></body>',
  {
    url: 'http://localhost/',
  },
);
const { window } = dom;
for (const k of [
  'window',
  'document',
  'location',
  'localStorage',
  'navigator',
  'MutationObserver',
  'Node',
  'HTMLElement',
])
  Object.defineProperty(globalThis, k, { value: window[k], configurable: true, writable: true });
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};

const { render } = await import('../js/router.js');
const { walkUnits, languages } = await import('../js/i18n.js');
const dicts = {};
for (const { code } of languages)
  if (code !== 'ru') dicts[code] = (await import(`../js/i18n/${code}.js`)).default;

const keys = new Map(); // key -> first route seen
const collect = (route) => walkUnits(document.body, (k) => keys.has(k) || keys.set(k, route));
const go = (route) => {
  location.hash = route;
  render();
  collect(route);
};

// Crawl every internal link
const queue = ['/', '/thanks', '/booking?tour=samarkand&date=2030-05-01&guests=2', '/invalid-page'];
const seen = new Set();
while (queue.length) {
  const route = queue.shift();
  if (seen.has(route)) continue;
  seen.add(route);
  go(route);
  for (const a of document.querySelectorAll('a[href^="#/"]')) {
    const r = a.getAttribute('href').slice(1);
    if (!seen.has(r)) queue.push(r);
  }
}

// Thanks page in both delivery states
for (const sent of [true, false]) {
  localStorage.setItem(
    'havas-last-inquiry',
    JSON.stringify({ subject: 'Путешествие', name: 'x', contact: 'x', sent }),
  );
  go('/thanks');
}

// Catalog states: every country, all pages, multi-day and empty results
go('/tours');
const click = (el) => el?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const change = (sel, v) => {
  const s = document.querySelector(sel);
  s.value = v;
  s.dispatchEvent(new window.Event('change'));
};
for (const chip of document.querySelectorAll('[data-country]')) {
  chip.onclick();
  while (document.querySelector('#load-more')) click(document.querySelector('#load-more'));
  collect('/tours#' + chip.dataset.country);
}
change('#filter-duration', 'multi');
collect('/tours#multi');
change('#filter-duration', '');
for (const o of document.querySelectorAll('#filter-category option')) {
  change('#filter-category', o.value);
  collect('/tours#category');
}
change('#filter-city', document.querySelector('#filter-city option:last-child').value);
change('#filter-category', document.querySelector('#filter-category option:last-child').value);
collect('/tours#empty');

// Form subjects are shown back on the thanks page
for (const route of seen) {
  location.hash = route;
  render();
  for (const f of document.querySelectorAll('[data-subject]')) {
    const k = f.dataset.subject.replace(/\s+/g, ' ').trim();
    if (/[А-Яа-яЁё]/.test(k) && !keys.has(k)) keys.set(k, route + ' (subject)');
  }
}

// Messages set from scripts at runtime
for (const file of ['js/router.js', 'js/main.js']) {
  for (const [, s] of readFileSync(file, 'utf8').matchAll(/'([^'<>$]*[А-Яа-яЁё][^'<>$]*)'/g)) {
    const k = s.replace(/\s+/g, ' ').trim();
    if (!keys.has(k)) keys.set(k, file);
  }
}

const lookup = (d, k) => Object.hasOwn(d.strings, k) || (d.patterns || []).some(([re]) => re.test(k));
const missing = Object.fromEntries(Object.keys(dicts).map((c) => [c, []]));
for (const k of keys.keys()) {
  for (const c in dicts) if (!lookup(dicts[c], k)) missing[c].push(k);
}
const chars = [...keys.keys()].join('').length;
console.log(`pages: ${seen.size}, text units: ${keys.size} (${chars} chars)`);
console.log(
  'missing: ' +
    Object.entries(missing)
      .map(([c, l]) => `${c} ${l.length}`)
      .join(', '),
);
if (process.argv.includes('--missing')) {
  writeFileSync('i18n-missing.json', JSON.stringify(missing, null, 1));
  console.log('written i18n-missing.json');
}
