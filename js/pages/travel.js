import {
  card,
  choiceField,
  compactRequest,
  consentControl,
  faq,
  form,
  gallery,
  packageCard,
} from '../components.js';
import { cities, countries, findTour, shortTitle } from '../data.js';
import { notFound } from './company.js';
import { btn, crumb, cta, e, icon, masthead, photo, source, top } from '../util.js';

export function home() {
  return `<section class="hero">${photo('hero', '', 'Регистан на закате')}<div class="wrap hero-content"><span class="kicker">Путешествия с HAVAS</span><h1>Узбекистан,<br>который останется<br>с вами</h1><p>Древние города. Живые традиции. Ваш маршрут.</p>${btn('Выбрать путешествие', '/tours', 'light')}</div><span class="caption">Самарканд · Регистан</span></section><div class="wrap"><form class="searchbar" id="search"><label class="search-field">${icon('pin')}<select name="city" aria-label="Куда хотите поехать?"><option value="">Куда хотите поехать?</option>${cities.map((c) => `<option value="${c.id}">${c.name}</option>`).join('')}</select></label><label class="search-field search-date">${icon('clock')}<span id="search-date-label">Когда?</span><input type="date" name="date" aria-label="Когда поехать?"></label><label class="search-field">${icon('map')}<select name="category" aria-label="Формат отдыха"><option value="">Формат отдыха</option><option>История</option><option>Природа</option></select></label><button type="submit" aria-label="Найти путешествие">→</button></form><section class="section home-destinations"><div class="section-heading"><h2>Начните с места, которое зовёт</h2><a class="text-link" href="#/destinations">Все направления →</a></div><div class="grid destinations">${cities
    .slice(0, 3)
    .map(
      (c) =>
        `<a class="destination" href="#/city/${c.id}">${photo(c.id, '', c.name)}<h3>${c.name}<span>→</span></h3><div class="destination-meta"><span>◷ 1 день</span><span>Стоимость по запросу</span></div></a>`,
    )
    .join('')}</div><div class="destination-dots">${cities
    .slice(0, 3)
    .map(
      (c, i) =>
        `<button data-destination-index="${i}" class="${i === 0 ? 'active' : ''}" aria-label="Показать ${c.name}"></button>`,
    )
    .join(
      '',
    )}</div></section><section class="section home-tours"><div class="section-heading"><h2>Путешествия<br>в вашем ритме</h2><div class="tabs" id="home-tabs"><button class="chip active" data-home="История">История и культура</button><button class="chip" data-home="Природа">Природа</button><a class="chip" href="#/service/workshops">Мастер-классы</a></div></div><div class="grid two" id="home-tours">${cities
    .slice(0, 2)
    .map((c) => card(c, true))
    .join(
      '',
    )}</div></section></div><section class="feature home-feature">${photo('ceramics', '', 'Гиждуванская керамика')}<div class="feature-text"><h2>Не просто увидеть.<br>Почувствовать.</h2><p>Настоящий Узбекистан — в людях, традициях<br>и деталях, которые остаются в сердце.</p><div class="mini-values"><div>${icon('people')}<h3>Местные гиды</h3><p>Люди, которые любят<br>и знают свой край.</p></div><div>${icon('map')}<h3>Индивидуальные<br>маршруты</h3><p>Путешествия, созданные<br>под ваши интересы.</p></div><div>${icon('car')}<h3>Трансфер и размещение</h3><p>Комфортная организация<br>на всём пути.</p></div></div></div></section><section class="home-final-cta">${cta()}</section>`;
}

export function catalog(params) {
  return (
    `<section class="catalog-cover wrap">${photo('bukhara', '', 'Бухара')}<div class="catalog-heading">${crumb('Туры')}<h1>Найдите своё<br>путешествие</h1><p>Узбекистан и Центральная Азия</p></div></section>` +
    `<div class="wrap"><div class="tabs" id="country-tabs">${countries.map((c, i) => `<button class="chip ${(!params.get('country') && i === 0) || params.get('country') === c[0] ? 'active' : ''}" data-country="${c[0]}">${c[1]}</button>`).join('')}</div><div class="filters"><label>Город<select id="filter-city"><option value="">Все города</option>${cities.map((c) => `<option value="${c.id}" ${params.get('city') === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select></label><label>Длительность<select id="filter-duration"><option value="">Любая</option><option value="1">1 день</option><option value="multi">Несколько дней</option></select></label><label>Формат<select id="filter-category"><option value="">Все впечатления</option><option ${params.get('category') === 'История' ? 'selected' : ''}>История</option><option ${params.get('category') === 'Природа' ? 'selected' : ''}>Природа</option></select></label></div><div class="grid two" id="catalog-results"></div><section class="section">${cta('Хотите особенный маршрут?', 'Создадим путешествие по вашим интересам и мечтам.')}</section></div>`
  );
}

export function tour(id) {
  const c = findTour(id);
  if (!c) return notFound();
  return (
    top(
      shortTitle(c),
      'История и архитектура · Индивидуальный формат',
      `<a href="#/tours">Туры</a> / ${c.name}`,
    ) +
    `<div class="wrap tour-wrap">${gallery(c)}<div class="detail-layout"><div><h2>В сердце Шёлкового пути</h2><p>${c.desc}</p><div class="tabs text-tabs" id="tour-tabs"><button class="active" data-tab="route">Маршрут</button><button data-tab="included">Что включено</button><button data-tab="info">Важно знать</button></div><div id="route" class="tour-panel timeline">${(c.places.length ? c.places : [c.name]).map((p, i) => `<div class="timeline-item"><span class="number">${String(i + 1).padStart(2, '0')}</span><div><h3>${p}</h3><p>${['Начнём знакомство с архитектурой и историей города.', 'Продолжим прогулку и рассмотрим детали восточного зодчества.', 'Ещё одна остановка для знакомства с наследием и атмосферой города.'][Math.min(i, 2)]}</p></div>${photo(c.pics?.[i] || c.id, '', p)}</div>`).join('')}</div><div id="included" class="tour-panel hidden"><h3>Состав поездки</h3>${c.includes?.length ? `<ul class="editorial-list">${c.includes.map((p) => `<li>${e(p)}</li>`).join('')}</ul>` : '<p>Гид, транспорт и дополнительные посещения согласовываются при подготовке программы.</p>'}<p>Итоговый перечень услуг подтверждается перед бронированием.</p></div><div id="info" class="tour-panel hidden"><h3>Перед поездкой</h3><p>Продолжительность — ${c.duration || '1 день'}. Время встречи, программа и транспорт согласовываются индивидуально.</p>${c.maxParticipants ? `<p>Групповой формат: до ${c.maxParticipants} участников.</p>` : ''}</div>${faq()}</div><aside>${compactRequest(c)}</aside></div></div>`
  );
}

export function destinations() {
  return (
    masthead(
      'Куда зовёт<br>ваше сердце?',
      'Узбекистан и Центральная Азия',
      'destinations-hero',
      'destination-cover',
    ) +
    `<div class="wrap destinations-content"><a class="country-feature" href="#/tours/uzbekistan"><div><h2>Узбекистан</h2><p>${countries[0][3]}</p><span class="text-link">Открыть направление →</span></div>${photo('hero', '', 'Узбекистан')}</a><div class="grid two country-grid">${countries
      .slice(1)
      .map(
        (c) =>
          `<a class="country-tile" href="#/tours/${c[0]}">${photo(c[2], '', c[1])}<div><h3>${c[1]}</h3><p>${c[3]}</p><span class="text-link">Открыть направление →</span></div></a>`,
      )
      .join(
        '',
      )}</div><section class="section compact city-strip"><h2>Города, которые запоминаются</h2><div class="grid three">${cities
      .slice(0, 3)
      .map(
        (c) => `<a href="#/city/${c.id}">${photo(c.id, '', c.name)}<h3>${c.name}</h3><p>${c.short}</p></a>`,
      )
      .join(
        '',
      )}</div><div class="center">${btn('Поможем выбрать направление', '/custom', 'rust')}</div></section></div>`
  );
}

export function country(id) {
  const c = countries.find((c) => c[0] === id);
  if (!c) return notFound();
  const tours = id === 'uzbekistan' ? cities : source.countries[id];
  return (
    top(c[1], c[3], `<a href="#/destinations">Направления</a> / ${c[1]}`) +
    `<div class="wrap">${photo(id === 'uzbekistan' ? 'hero' : c[2], 'wide-photo', c[1])}<section class="section"><h2>Ваше знакомство со страной</h2><div class="grid three">${tours.map((c) => card(c)).join('')}</div></section>${cta()}</div>`
  );
}

export function city(id) {
  const c = cities.find((c) => c.id === id);
  if (!c) return notFound();
  return `<section class="masthead city-cover">${photo(c.id === 'samarkand' ? 'hero' : c.id, '', c.name)}<div class="wrap masthead-inner">${crumb(`<a href="#/destinations">Направления</a> / Узбекистан`)}<h1>${c.name}</h1><p>Город на перекрёстке эпох</p></div></section><div class="wrap"><section class="section city-introduction"><h2>Прикоснитесь к истории</h2><p>${c.desc}</p><div class="grid three attraction-grid">${c.places
    .slice(0, 3)
    .map(
      (p, i) =>
        `<div>${photo(c.pics[i], '', p)}<h3>${p}</h3><p>${['История и архитектура города.', 'Узоры, традиции и восточный колорит.', 'Одна из остановок вашего маршрута.'][i]}</p></div>`,
    )
    .join('')}</div>${
    c.places.length > 3
      ? `<details class="more-attractions"><summary>Ещё достопримечательности</summary><ul class="editorial-list">${c.places
          .slice(3)
          .map((p) => `<li>${p}</li>`)
          .join('')}</ul></details>`
      : ''
  }</section><section class="section compact"><h2>Как провести день</h2><p>Пример прогулки, чтобы увидеть главное и почувствовать атмосферу города.</p><div class="steps">${c.places
    .slice(0, 3)
    .map(
      (p, i) =>
        `<div><span class="step-number">${i + 1}</span><h3>${['Утро', 'День', 'Вечер'][i]}</h3><p>${p}</p></div>`,
    )
    .join(
      '',
    )}</div></section><section class="section compact"><h2>Популярные туры: ${c.name}</h2><div class="grid two related-cards">${card(c)}<a class="tour-card" href="#/custom">${photo('arch', '', c.name)}<div class="card-body"><h3>${c.name} и окрестности</h3><p>Добавьте к путешествию любимые места и новые впечатления.</p><span class="text-link">Подобрать маршрут →</span></div></a></div><div class="center">${btn(`Все туры: ${c.name}`, '/tours?city=' + c.id)}</div></section><section class="section city-guide"><h2>Перед путешествием</h2><div class="guide-layout"><div>${c.guide.map((s, i) => `<details ${i === 0 ? 'open' : ''}><summary>${s.title}</summary><p>${e(s.text)}</p></details>`).join('')}</div><aside><span class="kicker">Полезные детали</span><h3>${c.region}</h3><p>${c.season}</p><h3>Советы путешественникам</h3><ul class="editorial-list">${c.tips.map((t) => `<li>${e(t)}</li>`).join('')}</ul></aside></div></section><section class="section compact"><h2>Фотографии ${c.name}</h2>${gallery(c)}</section>${cta(`Добавим ${c.name} в ваш маршрут`)}</div>`;
}

export function custom() {
  return (
    masthead(
      'Путешествие<br>по вашим правилам',
      'Индивидуальные туры по Узбекистану<br>и Центральной Азии',
      'custom-hero',
      'custom-cover',
    ) +
    `<div class="wrap custom-layout"><div class="custom-intro"><h2>Расскажите о своей<br>идеальной поездке</h2><p>Подберём маршрут, который соответствует вашим интересам, стилю путешествия и пожеланиям. Оставьте детали — обсудим программу вместе.</p>${photo('arch', 'custom-portrait', 'Архитектура Самарканда')}</div><form class="form-panel inquiry custom-form" data-subject="Индивидуальное путешествие">${choiceField('destination', 'Куда хотите поехать?', ['Самарканд', 'Бухара', 'Хива', 'Другое'])}<label>Даты поездки<input type="date" name="date"></label><label>Количество гостей<span class="stepper-control"><button type="button" data-step="-1" aria-label="Меньше гостей">−</button><input type="number" name="guests" value="2" min="1" max="100" required><button type="button" data-step="1" aria-label="Больше гостей">+</button></span></label>${choiceField('interest', 'Что вам интересно?', ['История', 'Кухня', 'Природа', 'Ремёсла'])}<label>Пожелания<textarea name="message" placeholder="Расскажите о своих интересах и особых пожеланиях…"></textarea></label><div class="field-grid"><label>Ваше имя<input name="name" autocomplete="name" required placeholder="Как к вам обращаться?"></label><label>Телефон или email<input name="contact" required placeholder="+998 … или email"></label></div>${consentControl()}<p class="error" role="alert"></p><button type="submit" class="rust">Отправить пожелания <span>→</span></button><p class="form-note">Заявка придёт менеджеру HAVAS, мы ответим в рабочее время.</p></form></div><section class="wrap section compact"><h2>Как это работает</h2><div class="steps"><div><span class="step-number">1</span><h3>Расскажите о себе</h3><p>Ваши интересы, пожелания и темп путешествия.</p></div><div><span class="step-number">2</span><h3>Обсудим маршрут</h3><p>Подберём остановки и детали поездки.</p></div><div><span class="step-number">3</span><h3>Отправляйтесь в путь</h3><p>Навстречу новым впечатлениям.</p></div></div></section>`
  );
}

export function confirmation() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem('havas-last-inquiry'));
  } catch {}
  const sent = data?.sent;
  return `<div class="wrap empty"><div class="symbol">✓</div><span class="kicker">${sent ? 'Спасибо' : 'Заявка не отправлена'}</span><h1>${sent ? 'Заявка отправлена' : data ? 'Заявка сохранена' : 'Ваша заявка'}</h1><p>${sent ? 'Мы получили ваше обращение и свяжемся с вами в рабочее время.' : data ? 'Сейчас не удалось передать заявку компании, она сохранена в этом браузере. Отправьте её через WhatsApp.' : 'Заполните форму, чтобы подготовить обращение.'}</p>${data ? `<p><strong>${e(data.subject)}</strong> · ${e(data.name)}</p><div class="buttons"><a class="btn" href="https://wa.me/998915340888?text=${encodeURIComponent(`Здравствуйте! Меня интересует: ${data.subject}. Имя: ${data.name}. Контакт: ${data.contact}. Дата: ${data.date || 'обсудим'}. ${data.guests ? 'Гостей: ' + data.guests + '. ' : ''}${data.message || ''}`)}" target="_blank" rel="noopener">Открыть в WhatsApp ↗</a><button class="btn outline" id="download-inquiry">Скачать заявку</button></div>` : ''}<div class="buttons">${btn('Вернуться к турам', '/tours', 'outline')}${btn('На главную', '/', 'outline')}</div></div>`;
}

export function packagesPage() {
  return (
    top(
      'Больше городов.<br>Больше открытий.',
      'Многодневные маршруты по Узбекистану — от пяти до восьми дней.',
      'Турпакеты',
    ) +
    `<div class="wrap"><div class="grid two">${source.packages.map(packageCard).join('')}</div><section class="section">${cta('Путешествие в вашем ритме', 'Изменим длительность, подберём размещение и обсудим детали поездки.')}</section></div>`
  );
}

export function packagePage(id) {
  const p = source.packages.find((p) => p.id === id);
  if (!p) return notFound();
  return (
    top(p.title, p.duration, `<a href="#/packages">Турпакеты</a> / Программа`) +
    `<div class="wrap">${photo(p.photo, 'wide-photo', p.title)}<div class="detail-layout"><div><span class="kicker">Ваш маршрут</span><h2>Всё путешествие — по дням</h2><p class="intro">${p.desc}</p><div class="package-itinerary">${p.days.map((d, i) => `<details ${i === 0 ? 'open' : ''}><summary><span class="number">${String(i + 1).padStart(2, '0')}</span><span>${d.title}</span></summary><div>${d.items.map((t) => `<p>${e(t)}</p>`).join('')}</div>${d.sights.length ? `<ul class="editorial-list">${d.sights.map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}</details>`).join('')}</div><p class="form-note">Программа опубликована на исходном сайте HAVAS. Время, рейсы, порядок посещений и размещение необходимо уточнить на выбранные даты.</p><section class="section compact"><h2>Что входит в путешествие</h2><div class="grid two"><div><h3>Включено</h3><ul class="editorial-list">${p.includes.map((t) => `<li>${t}</li>`).join('')}</ul></div><div><h3>Дополнительно</h3><ul class="editorial-list">${p.excludes.map((t) => `<li>${t}</li>`).join('')}</ul></div></div></section><h2>Варианты размещения</h2><div class="grid two">${p.hotels.map((h) => `<div class="hotel-option"><h3>${h.city}</h3><p>${h.list.join(' · ')}</p></div>`).join('')}</div>${faq()}</div><aside>${form(p.title)}</aside></div><section class="section compact"><h2>Другие путешествия</h2><div class="grid three">${source.packages
      .filter((x) => x.id !== p.id)
      .map(packageCard)
      .join('')}</div></section></div>`
  );
}

export function bookingPage(params) {
  const c = findTour(params.get('tour')) || cities[0];
  return `<div class="wrap page-top">${crumb('Заявка на тур')}<h1>${c.name.endsWith('а') ? 'Ваша' : 'Ваш'} ${c.name}<br>начинается здесь</h1><p>Оставьте заявку, и мы предложим маршрут<br>с учётом ваших пожеланий.</p></div><div class="wrap booking-layout"><div class="tour-card booking-summary">${photo(c.id, '', c.name)}<div class="card-body"><h3>${c.name} · ${c.duration || '1 день'}</h3><p>${c.short || c.desc}</p></div></div>${form(shortTitle(c))}</div>`;
}
