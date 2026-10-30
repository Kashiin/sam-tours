import { cities, countries, services } from './data.js';
import { languages } from './i18n.js';
import { btn, chev, e, icon, logo, photo, source } from './util.js';

const megaLink = (path, text, sub = '') =>
  `<a class="mega-link" href="#${path}"><span>${e(text)}${sub ? `<small>${e(sub)}</small>` : ''}</span><i aria-hidden="true">↗</i></a>`;

const megaPanel = (id, kicker, title, more, body) =>
  `<div class="mega" id="mega-${id}" hidden><button class="mega-close" type="button" aria-label="Закрыть меню">×</button><div class="mega-head"><div><span class="kicker">${kicker}</span><h2>${title}</h2></div><a class="mega-more" href="#${more[0]}">${more[1]}<i aria-hidden="true">↗</i></a></div><div class="mega-body mega-${id}">${body}</div><div class="mega-foot"><span>Ваш Узбекистан начинается здесь</span><a href="#/sitemap">Все разделы сайта ↗</a><a class="mega-phone" href="tel:+998915340888">+998 91 534 08 88</a></div></div>`;

const megaItem = (id, label, panel) =>
  `<div class="mega-item"><button class="mega-trigger" type="button" aria-expanded="false" aria-controls="mega-${id}">${label}${chev}</button>${panel}</div>`;

export function closeMega() {
  document.querySelectorAll('.mega-trigger').forEach((b) => {
    b.setAttribute('aria-expanded', 'false');
    const p = document.getElementById(b.getAttribute('aria-controls'));
    if (p) p.hidden = true;
  });
  document.body.classList.remove('mega-open');
}

export const nav = () =>
  megaItem(
    'destinations',
    'Направления',
    megaPanel(
      'destinations',
      'Центральная Азия',
      'Куда отправимся?',
      ['/destinations', 'Все направления'],
      `<div class="mega-col"><span class="mega-label">Страны</span>${countries.map((c) => megaLink('/tours/' + c[0], c[1])).join('')}</div><div class="mega-col mega-cities"><span class="mega-label">Города Узбекистана</span><div>${cities.map((c) => megaLink('/city/' + c.originalId, c.name)).join('')}</div></div><a class="mega-feature" href="#/city/${cities[0].originalId}">${photo('samarkand', '', 'Самарканд')}<span><strong>Начните с Самарканда</strong>Регистан, голубые купола и живые традиции<em>Открыть город ↗</em></span></a>`,
    ),
  ) +
  megaItem(
    'tours',
    'Туры',
    megaPanel(
      'tours',
      'Ваш формат отдыха',
      'Путешествуйте в своём ритме',
      ['/tours', 'Смотреть все туры'],
      `<div class="mega-col"><span class="mega-label">Как вы хотите путешествовать?</span>${megaLink('/tours', 'Однодневные экскурсии', 'Знакомство с городом за один день')}${megaLink('/packages', 'Многодневные туры', 'Несколько городов в одном путешествии')}${megaLink('/custom', 'Индивидуальный маршрут', 'Программа под ваши интересы')}</div><div class="mega-col"><span class="mega-label">Готовые маршруты</span>${source.packages.map((p) => megaLink('/packages/' + p.id, p.title, p.duration)).join('')}</div><div class="mega-card"><span class="kicker">Составим вместе</span><h3>Ваше путешествие —&nbsp;ваши правила</h3><p>Расскажите о датах и интересах. Подберём маршрут и обсудим детали.</p>${btn('Подобрать путешествие', '/custom')}</div>`,
    ),
  ) +
  megaItem(
    'services',
    'Услуги',
    megaPanel(
      'services',
      'Забота о деталях',
      'Всё для вашей поездки',
      ['/services', 'Все услуги'],
      services
        .map(
          (s) =>
            `<a class="mega-service" href="#/service/${s[0]}">${photo(s[2], '', s[1])}<span><strong>${s[1]}</strong><small>${s[3]}</small></span><i aria-hidden="true">↗</i></a>`,
        )
        .join(''),
    ),
  ) +
  megaItem(
    'about',
    'О компании',
    megaPanel(
      'about',
      'Добро пожаловать в HAVAS',
      'Знакомим с настоящим Узбекистаном',
      ['/contacts', 'Связаться с нами'],
      `<div class="mega-col"><span class="mega-label">О компании</span>${[
        ['/about', 'Знакомство с HAVAS'],
        ['/reviews', 'Отзывы путешественников'],
        ['/journal', 'Путеводитель'],
        ['/contacts', 'Контакты'],
        ['/sitemap', 'Все страницы сайта'],
      ]
        .map(([p, t]) => megaLink(p, t))
        .join('')}</div><div class="mega-col"><span class="mega-label">Ответственный туризм</span>${[
        ['/mission', 'Наша миссия'],
        ['/sustainability', 'Устойчивое развитие'],
        ['/mission/professionalism', 'Профессионализм'],
        ['/mission/policies', 'Политики и документы'],
        ['/terms', 'Условия путешествия'],
      ]
        .map(([p, t]) => megaLink(p, t))
        .join(
          '',
        )}</div><div class="mega-card mega-contacts"><span class="kicker">Начнём с разговора</span><a class="mega-tel" href="tel:+998915340888">+998 91 534 08 88</a><a href="mailto:info@samarkand-tours.com">info@samarkand-tours.com</a><span class="mega-city">Самарканд, Узбекистан</span><span class="mega-hours">Пн–Пт: 09:00–18:00<br>Сб: 10:00–16:00</span>${btn('Обсудить маршрут', '/custom')}</div>`,
    ),
  ) +
  `<a class="nav-plain" href="#/contacts">Контакты</a>`;

export function siteFooter(page) {
  if (page === 'home')
    return `<div class="wrap home-footer">${logo()}<span>Туры по Центральной Азии</span><a href="mailto:info@samarkand-tours.com">${icon('mail')} info@samarkand-tours.com</a><a href="tel:+998915340888">${icon('phone')} +998 91 534 08 88</a><a href="#/sitemap" class="footer-all" aria-label="Все страницы сайта">↗</a></div>${btn('Подобрать путешествие', '/custom', 'mobile-cta')}`;
  return `<div class="wrap footer-main">${logo()}<nav aria-label="Навигация в подвале"><a href="#/tours">Туры</a><a href="#/destinations">Направления</a><a href="#/about">О нас</a><a href="#/journal">Полезное</a><a href="#/contacts">Контакты</a></nav><span>Вдохновляем<br>на настоящие путешествия</span></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} HAVAS</span><div><a href="#/sitemap">Все страницы</a><a href="#/privacy">Конфиденциальность</a><a href="#/terms">Условия</a><a href="#/credits">Фотографии</a></div></div>${!['custom', 'booking', 'thanks', 'contacts', 'service', 'tour', 'packages'].includes(page) ? btn('Подобрать путешествие', '/custom', 'mobile-cta') : ''}`;
}

export function langSwitch(code) {
  const cur = languages.find((l) => l.code === code);
  return `<div class="lang"><button class="lang-trigger" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Язык: ${cur.name}">${cur.label}${chev}</button><ul class="lang-menu" hidden>${languages.map((l) => `<li><button type="button" data-lang="${l.code}" lang="${l.code}"${l.code === code ? ' aria-current="true"' : ''}><span>${l.label}</span>${l.name}</button></li>`).join('')}</ul></div>`;
}

export function closeLang() {
  const t = document.querySelector('.lang-trigger');
  if (!t) return;
  t.setAttribute('aria-expanded', 'false');
  document.querySelector('.lang-menu').hidden = true;
}
