import { articleCards, card, packageCard } from './components.js';
import { articles, cities, countries } from './data.js';
import { getLang, setLang, translate, translateTree } from './i18n.js';
import { closeMega, langSwitch, nav, siteFooter } from './layout.js';
import {
  about,
  article,
  contacts,
  journal,
  notFound,
  reviewsPage,
  service,
  servicesPage,
  sitemapPage,
} from './pages/company.js';
import { creditsPage, legal, missionPage, originalLegal } from './pages/legal.js';
import {
  bookingPage,
  catalog,
  city,
  confirmation,
  country,
  custom,
  destinations,
  home,
  packagePage,
  packagesPage,
  tour,
} from './pages/travel.js';
import { btn, logo, photo, source } from './util.js';

function resolveRoute() {
  const raw = location.hash.startsWith('#/') ? location.hash.slice(1) : location.pathname + location.search,
    [route, query = ''] = raw.split('?');
  let path;
  try {
    path = decodeURIComponent(route).replace(/\/$/, '') || '/';
  } catch {
    path = '/invalid';
  }
  const params = new URLSearchParams(query),
    parts = path.split('/').filter(Boolean);
  if (parts[0] === 'tours' && parts[1]) {
    if (!countries.some((c) => c[0] === parts[1])) return { path: '/invalid', params, parts: ['invalid'] };
    params.set('country', parts[1]);
    return { path: '/tours', params, parts: ['tours'] };
  }
  if (parts[0] === 'city' && parts[1]) {
    const c = cities.find((c) => c.id === parts[1] || c.originalId === parts[1]);
    if (c) {
      parts[1] = c.id;
      path = '/city/' + c.id;
    }
  }
  return { path, params, parts };
}

export function render() {
  const { path, params, parts } = resolveRoute();
  document.body.dataset.page = parts[0] || 'home';
  let html;
  switch (parts[0]) {
    case undefined:
      html = home();
      break;
    case 'tours':
      html = catalog(params);
      break;
    case 'packages':
      html = parts[1] ? packagePage(parts[1]) : packagesPage();
      break;
    case 'mission':
      html = missionPage(parts[1], parts[2]);
      break;
    case 'sustainability':
      html = missionPage();
      break;
    case 'sitemap':
      html = sitemapPage();
      break;
    case 'reviews':
      html = reviewsPage();
      break;
    case 'credits':
      html = creditsPage();
      break;
    case 'terms':
      html = originalLegal('terms');
      break;
    case 'tour':
      html = tour(parts[1]);
      break;
    case 'destinations':
      html = destinations();
      break;
    case 'country':
      html = country(parts[1]);
      break;
    case 'city':
      html = city(parts[1]);
      break;
    case 'custom':
      html = custom();
      break;
    case 'services':
      html = servicesPage();
      break;
    case 'service':
      html = service(parts[1]);
      break;
    case 'about':
      html = about();
      break;
    case 'journal':
      html = journal();
      break;
    case 'article':
      html = article(parts[1]);
      break;
    case 'contacts':
      html = contacts();
      break;
    case 'booking':
      html = bookingPage(params);
      break;
    case 'thanks':
      html = confirmation();
      break;
    case 'privacy':
      html = parts[1] === 'local' ? legal() : originalLegal('privacy');
      break;
    case 'consent':
      html = legal(true);
      break;
    default:
      html = notFound();
  }
  document.body.classList.remove('mega-open');
  document.querySelector('#header').innerHTML =
    `<div class="mega-backdrop" aria-hidden="true"></div><div class="wrap header-inner">${logo()}<nav aria-label="Главная навигация" id="nav">${nav()}</nav>${langSwitch(getLang())}${btn('Подобрать тур', '/custom')}<button class="menu" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav">☰</button></div>`;
  document.querySelector('#main').innerHTML = html.replace(/<br\s*\/?>/g, '<br> ');
  document.querySelector('#footer').innerHTML = siteFooter(parts[0] || 'home');

  translateTree(document.body);
  document.title =
    (document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() ||
      translate('Путешествия по Узбекистану')) + ' — HAVAS';
  document.querySelectorAll('#nav a').forEach((a) => {
    if (a.hash === '#' + path) a.setAttribute('aria-current', 'page');
  });
  bind(params);
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

function bind(params) {
  document.querySelectorAll('[data-destination-index]').forEach((b) =>
    b.addEventListener('click', () => {
      const list = document.querySelector('.destinations');
      list.scrollTo({
        left: Number(b.dataset.destinationIndex) * (list.clientWidth + 15),
        behavior: 'smooth',
      });
    }),
  );
  document.querySelector('.destinations')?.addEventListener('scroll', (ev) => {
    const list = ev.currentTarget,
      index = Math.round(list.scrollLeft / (list.clientWidth + 15));
    document
      .querySelectorAll('[data-destination-index]')
      .forEach((b) => b.classList.toggle('active', Number(b.dataset.destinationIndex) === index));
  });
  document.querySelectorAll('[data-step]').forEach((b) =>
    b.addEventListener('click', () => {
      const field = b.closest('.stepper-control').querySelector('input');
      field.value = Math.max(1, Math.min(100, Number(field.value || 1) + Number(b.dataset.step)));
    }),
  );
  document.querySelectorAll('[data-section]').forEach((a) =>
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      document.getElementById(a.dataset.section)?.scrollIntoView({ behavior: 'smooth' });
    }),
  );
  document.querySelectorAll('[data-service-topic]').forEach((b) =>
    b.addEventListener('click', () => {
      document.querySelectorAll('[data-service-topic]').forEach((x) => x.classList.toggle('active', x === b));
      document.querySelector('[name=interest]').value = b.dataset.serviceTopic;
    }),
  );
  document.querySelector('#search [name=date]')?.addEventListener('change', (ev) => {
    document.querySelector('#search-date-label').textContent = ev.target.value
      ? new Date(ev.target.value + 'T12:00:00').toLocaleDateString(
          { ru: 'ru-RU', uz: 'uz-Latn-UZ', en: 'en-GB', de: 'de-DE' }[getLang()],
        )
      : 'Когда?';
  });
  document.querySelector('#tour-request')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget,
      q = new URLSearchParams(new FormData(form));
    q.set('tour', form.dataset.tour);
    location.hash = '/booking?' + q.toString();
  });
  if (params.get('guests')) {
    const guests = document.querySelector('.inquiry [name=guests]');
    if (guests) guests.value = Math.min(100, Math.max(1, Number(params.get('guests')) || 1));
  }
  document.querySelector('.lang-trigger').onclick = function () {
    const open = this.getAttribute('aria-expanded') !== 'true';
    this.setAttribute('aria-expanded', String(open));
    document.querySelector('.lang-menu').hidden = !open;
  };
  document.querySelectorAll('[data-lang]').forEach(
    (b) =>
      (b.onclick = async () => {
        await setLang(b.dataset.lang);
        render();
      }),
  );
  document.querySelector('.menu').onclick = function () {
    const open = document.querySelector('#nav').classList.toggle('open');
    this.setAttribute('aria-expanded', String(open));
    this.textContent = open ? '×' : '☰';
  };
  document.querySelectorAll('.mega-trigger').forEach(
    (b) =>
      (b.onclick = () => {
        const open = b.getAttribute('aria-expanded') !== 'true';
        closeMega();
        if (!open) return;
        const r = document.querySelector('.header-inner').getBoundingClientRect(),
          s = document.body.style;
        s.setProperty('--mega-top', Math.max(0, r.bottom) + 'px');
        // Widen the card past the header content, but keep it inside the viewport
        const pad = Math.max(16, Math.min(36, r.left - 8));
        s.setProperty('--mega-pad', pad + 'px');
        s.setProperty('--mega-left', r.left - pad + 'px');
        s.setProperty('--mega-width', r.width + 2 * pad + 'px');
        b.setAttribute('aria-expanded', 'true');
        document.getElementById(b.getAttribute('aria-controls')).hidden = false;
        document.body.classList.add('mega-open');
      }),
  );
  document.querySelectorAll('.mega-close').forEach((b) => (b.onclick = closeMega));
  document.querySelector('#search')?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const d = new FormData(ev.target),
      q = new URLSearchParams();
    for (const key of ['city', 'category', 'date']) if (d.get(key)) q.set(key, d.get(key));
    location.hash = '/tours?' + q.toString();
  });
  document.querySelectorAll('[data-home]').forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelectorAll('[data-home]').forEach((x) => x.classList.toggle('active', x === b));
        document.querySelector('#home-tours').innerHTML = cities
          .filter((c) => c.tag === b.dataset.home)
          .slice(0, 2)
          .map((c) => card(c, true))
          .join('');
      }),
  );
  if (document.querySelector('#catalog-results')) {
    let country = params.get('country') || 'uzbekistan',
      visible = 8;
    const citySelect = document.querySelector('#filter-city');
    function updateCities(value = '') {
      const pool = country === 'uzbekistan' ? cities : source.countries[country];
      citySelect.innerHTML =
        '<option value="">Все города</option>' +
        pool.map((c) => '<option value="' + c.id + '">' + c.name + '</option>').join('');
      citySelect.value = value;
    }
    function filter() {
      const city = citySelect.value,
        category = document.querySelector('#filter-category').value,
        duration = document.querySelector('#filter-duration').value,
        pool = country === 'uzbekistan' ? cities : source.countries[country],
        isPackage = duration === 'multi' && country === 'uzbekistan';
      const list = isPackage
        ? source.packages.filter(
            (p) => !city || p.title.includes(cities.find((c) => c.id === city)?.name || ''),
          )
        : pool.filter(
            (c) => (!city || c.id === city) && (!category || c.tag === category) && duration !== 'multi',
          );
      document.querySelector('#catalog-results').innerHTML = list.length
        ? list
            .slice(0, visible)
            .map((c) => (isPackage ? packageCard(c) : card(c)))
            .join('') +
          (list.length > visible
            ? '<div class="load-more"><button id="load-more" class="btn outline">Показать ещё</button><p>' +
              Math.min(visible, list.length) +
              ' из ' +
              list.length +
              '</p></div>'
            : '')
        : '<div class="empty"><h2>Пока нет подходящих туров</h2><p>Измените фильтры или расскажите нам о вашем маршруте.</p><button id="reset-filters">Сбросить фильтры</button></div>';
      document.querySelector('#load-more')?.addEventListener('click', () => {
        visible += 8;
        filter();
      });
      document.querySelector('#reset-filters')?.addEventListener('click', () => {
        country = 'uzbekistan';
        visible = 8;
        updateCities();
        document.querySelectorAll('.filters select').forEach((s) => (s.value = ''));
        document
          .querySelectorAll('[data-country]')
          .forEach((b) => b.classList.toggle('active', b.dataset.country === country));
        filter();
      });
    }
    updateCities(params.get('city') || '');
    document.querySelectorAll('.filters select').forEach((s) =>
      s.addEventListener('change', () => {
        visible = 8;
        filter();
      }),
    );
    document.querySelectorAll('[data-country]').forEach(
      (b) =>
        (b.onclick = () => {
          country = b.dataset.country;
          visible = 8;
          updateCities();
          document.querySelectorAll('[data-country]').forEach((x) => x.classList.toggle('active', x === b));
          filter();
        }),
    );
    filter();
  }

  document.querySelectorAll('[data-gallery]').forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelector('#gallery-main').innerHTML = photo(
          b.dataset.gallery,
          'wide-photo',
          'Фотография маршрута',
        );
        document.querySelectorAll('[data-gallery]').forEach((x) => x.classList.toggle('active', x === b));
      }),
  );
  document.querySelectorAll('[data-tab]').forEach(
    (b) =>
      (b.onclick = () => {
        document
          .querySelectorAll('.tour-panel')
          .forEach((p) => p.classList.toggle('hidden', p.id !== b.dataset.tab));
        document.querySelectorAll('[data-tab]').forEach((x) => x.classList.toggle('active', x === b));
      }),
  );
  document.querySelectorAll('[data-journal]').forEach(
    (b) =>
      (b.onclick = () => {
        document.querySelectorAll('[data-journal]').forEach((x) => x.classList.toggle('active', x === b));
        document.querySelector('#journal-results').innerHTML = articleCards(
          articles.filter((a) => b.dataset.journal === 'Все статьи' || a[3] === b.dataset.journal),
        );
      }),
  );
  document.querySelectorAll('.inquiry').forEach((f) => {
    const date = f.querySelector('[name=date]');
    if (date) date.min = new Date().toLocaleDateString('en-CA');
    f.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const d = Object.fromEntries(new FormData(f));
      const error = f.querySelector('.error');
      if (!/^\S+@\S+\.\S+$/.test(d.contact) && d.contact.replace(/\D/g, '').length < 7) {
        error.textContent = 'Укажите корректный телефон или email для связи.';
        f.querySelector('[name=contact]').focus();
        return;
      }
      d.subject = f.dataset.subject;
      const submit = f.querySelector('[type=submit]');
      submit.disabled = true;
      // Deliver to the company through the server; if it is unavailable, keep the local copy only.
      try {
        const res = await fetch('api/inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(d),
        });
        d.sent = res.ok;
      } catch {
        d.sent = false;
      }
      submit.disabled = false;
      try {
        localStorage.setItem('havas-last-inquiry', JSON.stringify(d));
        location.hash = '/thanks';
      } catch {
        error.textContent = 'Браузер не разрешил сохранение. Свяжитесь с нами через страницу контактов.';
      }
    });
  });
  document.querySelector('#delete-data')?.addEventListener('click', () => {
    try {
      localStorage.removeItem('havas-last-inquiry');
      document.querySelector('#delete-status').textContent = 'Копия заявки удалена из браузера.';
    } catch {
      document.querySelector('#delete-status').textContent =
        'Не удалось получить доступ к хранилищу браузера.';
    }
  });
  document.querySelector('#download-inquiry')?.addEventListener('click', () => {
    const d = localStorage.getItem('havas-last-inquiry');
    if (!d) return;
    const url = URL.createObjectURL(new Blob([d], { type: 'application/json' })),
      a = document.createElement('a');
    a.href = url;
    a.download = 'havas-inquiry.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
}
