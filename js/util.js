import source from './data/content.js';
import photoFiles from './data/photos.js';

export { source, photoFiles };

export const e = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

export function photo(key, cls = '', label = '') {
  const item =
    photoFiles[key] ||
    photoFiles[key.replace(/-sight-\d+$/, '')] ||
    photoFiles[key.split('-')[0]] ||
    photoFiles.registan;
  return (
    '<div class="photo ' +
    cls +
    '"><img src="assets/' +
    item.file +
    '" alt="' +
    e(label || item.label || 'Узбекистан') +
    '" width="' +
    item.width +
    '" height="' +
    item.height +
    '" ' +
    (key === 'hero' ? 'fetchpriority="high"' : 'loading="lazy"') +
    ' decoding="async"></div>'
  );
}

export const requestedDate = () => {
  const d = new URLSearchParams(location.hash.split('?')[1] || location.search).get('date') || '';
  return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : '';
};

export const btn = (text, path = '/tours', kind = '') =>
  `<a class="btn ${kind}" href="#${path}">${text}<span aria-hidden="true">↗</span></a>`;

export const logo = () =>
  `<a class="logo" href="#/" aria-label="Havas Tour Service — главная"><img class="logo-img" src="assets/havas-logo.png" alt="Havas Tour Service" width="516" height="137"></a>`;

export const chev =
  '<svg class="chev" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';

export const cta = (
  title = 'Ваше путешествие<br>начинается с разговора',
  text = 'Расскажите о своих идеях — мы предложим маршрут.',
  path = '/custom',
) =>
  `<div class="cta"><div><h2>${title}</h2><p>${text}</p></div>${btn('Обсудить маршрут', path, 'light')}</div>`;

export const crumb = (text) => `<div class="breadcrumb"><a href="#/">Главная</a> / ${text}</div>`;

export function top(title, sub = '', bread = '') {
  return `<div class="wrap page-top">${bread ? crumb(bread) : ''}<h1>${title}</h1>${sub ? `<p class="intro">${sub}</p>` : ''}</div>`;
}

export function masthead(title, subtitle, key, cls = '') {
  return `<section class="masthead ${cls}">${photo(key, '', (subtitle || title).replace(/\s*<[^>]+>\s*/g, ' '))}<div class="wrap masthead-inner"><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div></section>`;
}

export function icon(name) {
  const paths = {
    phone: 'M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C9 21 3 15 3 5a2 2 0 0 1 2-2Z',
    mail: 'M3 5h18v14H3ZM3 6l9 7 9-7',
    pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM9 10a3 3 0 1 0 6 0 3 3 0 0 0-6 0',
    clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2',
    people:
      'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8M18 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.9',
    map: 'm9 18-6 3V6l6-3 6 3 6-3v15l-6 3-6-3ZM9 3v15M15 6v15',
    car: 'm5 5-3 7v7h3v-3h14v3h3v-7l-3-7ZM2 12h20M6 13v2M18 13v2',
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.map}"/></svg>`;
}
