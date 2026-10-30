import { articleCards, consentControl, contactForm, faq } from '../components.js';
import { articles, cities, countries, services } from '../data.js';
import { btn, cta, e, icon, photo, source, top } from '../util.js';

export function servicesPage() {
  return `<div class="wrap"><div class="split-hero"><div><span class="kicker">Услуги</span><h1>Позаботимся<br>о деталях</h1><p class="intro">Всё, что делает путешествие комфортным, насыщенным и по-настоящему особенным.</p></div>${photo('hotel', '', 'Атмосферный отель')}</div><div class="grid two">${services.map((s) => `<a href="#/service/${s[0]}" class="service-card">${photo(s[2], '', s[1])}<h3>${s[1]} <span>↗</span></h3><p>${s[3]}</p></a>`).join('')}</div><section class="section">${cta('Что организовать для вас?')}</section></div>`;
}

export function service(id) {
  const s = services.find((s) => s[0] === id);
  if (!s) return notFound();
  return (
    top(
      id === 'workshops' ? 'Прикоснитесь<br>к живой традиции' : s[1],
      s[3],
      `<a href="#/services">Услуги</a> / ${s[1]}`,
    ) +
    `<div class="wrap service-detail">${photo(id === 'workshops' ? 'pottery' : s[2], 'wide-photo', s[1])}${id === 'workshops' ? `<div class="tabs service-tabs">${['Керамика', 'Кулинария', 'Ремёсла'].map((t, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-service-topic="${t}">${t}</button>`).join('')}</div>` : ''}<section class="service-description"><div><h2>${id === 'workshops' ? 'Создайте своё воспоминание' : 'Комфорт в каждой детали'}</h2><p>${id === 'workshops' ? 'Под руководством мастера познакомьтесь с материалами, узорами и традициями. Обсудим формат встречи и включим её в ваше путешествие.' : s[3]}</p></div>${photo(id === 'workshops' ? 'arch' : s[2], '', 'Впечатления Узбекистана')}</section><h2>Как проходит встреча</h2><div class="steps"><div><span class="step-number">1</span><h3>Знакомство</h3><p>Расскажите, что вам интересно.</p></div><div><span class="step-number">2</span><h3>Программа</h3><p>Согласуем даты и детали.</p></div><div><span class="step-number">3</span><h3>Впечатления</h3><p>Насладитесь путешествием.</p></div></div><form class="form-panel inquiry service-form" data-subject="${s[1]}"><h3>${id === 'workshops' ? 'Подберём мастер-класс' : 'Обсудим вашу поездку'}</h3><p>Оставьте заявку — предложим доступные варианты.</p><div class="field-grid"><label>Ваш интерес<select name="interest"><option>${s[1]}</option>${id === 'workshops' ? '<option>Керамика</option><option>Кулинария</option><option>Ремёсла</option>' : ''}</select></label><label>Ваше имя<input name="name" required placeholder="Как к вам обращаться?"></label><label>Дата<input type="date" name="date"></label><label>Телефон или email<input name="contact" required placeholder="+998 … или email"></label><label>Количество гостей<input type="number" name="guests" min="1" max="100" value="2" required></label><div>${consentControl()}</div></div><div class="service-form-bottom"><span>Стоимость по запросу</span><button type="submit">Уточнить программу <span>→</span></button></div><p class="error" role="alert"></p><p class="form-note">Заявка придёт менеджеру HAVAS, мы ответим в рабочее время.</p></form><section class="section compact">${cta('Больше впечатлений<br>в вашем путешествии', 'Добавьте услуги и новые остановки в свой маршрут.', '/services')}</section></div>`
  );
}

export function about() {
  return `<div class="wrap"><div class="split-hero"><div><span class="kicker">О компании</span><h1>Знакомим<br>с Узбекистаном<br>по-настоящему</h1><p>Через людей, культуру, традиции и живые впечатления.</p></div>${photo('samarkand', '', 'Самарканд')}</div><div class="split-hero"><div><h2>HAVAS — путешествия<br>с вниманием к вам</h2><p>Компания работает с 2010 года и организует индивидуальные и групповые поездки по Узбекистану.</p><p class="intro">Тёплая встреча, искренние открытия и забота о деталях. Поможем познакомиться с Узбекистаном и собрать маршрут вокруг ваших интересов.</p></div>${photo('hospitality', '', 'Восточное чаепитие')}</div><h2>Наши ценности</h2><div class="steps"><div><span class="number">01</span><h3>Местные знания</h3><p>Знакомство с историей, культурой и традициями.</p></div><div><span class="number">02</span><h3>Личный подход</h3><p>Ваши интересы и ваш ритм путешествия.</p></div><div><span class="number">03</span><h3>Продуманные детали</h3><p>Маршрут, впечатления и комфорт.</p></div></div><section class="section"><h2>Как мы создаём путешествия</h2><div class="steps"><div><h3>01 · Слушаем</h3><p>Узнаём ваши идеи и ожидания.</p></div><div><h3>02 · Планируем</h3><p>Обсуждаем маршрут и детали.</p></div><div><h3>03 · Сопровождаем</h3><p>Помогаем на протяжении поездки.</p></div></div><div class="grid two">${photo('craft', 'wide-photo', 'Ремёсла')}${photo('market', 'wide-photo', 'Восточный базар')}</div></section>${cta('Давайте познакомимся')}<section class="section"><div class="section-heading"><h2>Путешествовать с заботой</h2><a class="text-link" href="#/mission">Наша миссия ↗</a></div><p class="intro">Поддержка местных мастеров, уважение к традициям и внимание к природе — принципы ответственного путешествия.</p><div class="grid three">${source.reviews
    .slice(0, 3)
    .map(
      (r) =>
        `<blockquote class="review"><p>«${e(r.text.slice(0, 180))}…»</p><cite>${e(r.name)}</cite><a href="https://www.samarkand-tours.com/" target="_blank" rel="noopener">Отзыв на исходном сайте ↗</a></blockquote>`,
    )
    .join('')}</div></section></div>`;
}

export function journal() {
  return (
    top(
      'Узбекистан ближе,<br>чем кажется',
      'Вдохновляющие истории, полезные идеи и живые маршруты ещё до поездки.',
      'Путеводитель',
    ) +
    `<div class="wrap"><a class="journal-feature" href="#/article/first-trip">${photo('tea', '', 'Узбекское чаепитие')}<div><span class="kicker">Главная статья</span><h2>Первое путешествие<br>в Узбекистан</h2><p>Города, традиции и детали, с которых начинается знакомство.</p><span class="text-link">Читать статью →</span></div></a><div class="tabs" id="journal-tabs">${['Все статьи', 'Культура', 'Кухня', 'Маршруты'].map((s, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-journal="${s}">${s}</button>`).join('')}</div><div class="grid two" id="journal-results">${articleCards(articles.slice(1))}</div><section class="section">${cta('От вдохновения — к путешествию', 'Выберите свой маршрут и отправляйтесь навстречу открытиям.', '/tours')}</section></div>`
  );
}

export function article(id) {
  const a = articles.find((a) => a[0] === id);
  if (!a) return notFound();
  const bodies = {
    'first-trip': [
      [
        'Не спешите',
        'Начните с нескольких городов, оставляя время на прогулки. Самарканд, Бухара и Хива раскрываются не только через памятники, но и через небольшие дворы, мастерские и разговоры.',
      ],
      [
        'Загляните в мастерскую',
        'Рассмотрите узоры керамики и работу мастера. Такие встречи помогают увидеть традиции в повседневной жизни.',
      ],
      [
        'Разделите чаепитие',
        'Сделайте паузу за чашкой чая. Иногда именно простые моменты становятся самым тёплым воспоминанием о поездке.',
      ],
    ],
    taste: [
      [
        'Знакомство начинается со стола',
        'Плов, самса, манты и свежая лепёшка — отправные точки для знакомства с местной кухней.',
      ],
      [
        'Прогуляйтесь по базару',
        'Посмотрите на сезонные продукты, сухофрукты и пряности. Выберите то, что хочется попробовать.',
      ],
      [
        'Попробуйте приготовить сами',
        'Кулинарный мастер-класс может стать частью индивидуального путешествия. Уточните доступную программу перед поездкой.',
      ],
    ],
    'samarkand-day': [
      [
        'Утро у Регистана',
        'Начните день с площади и знакомства с её архитектурой. Оставьте время, чтобы рассмотреть узоры.',
      ],
      [
        'Прогулка продолжается',
        'Добавьте Биби-Ханым и остановку на обед. Расстояния и порядок посещений обсудите с гидом.',
      ],
      ['Гур-Эмир', 'Завершите знакомство с городом посещением одного из его самых узнаваемых памятников.'],
    ],
    crafts: [
      [
        'Руки, которые хранят традицию',
        'Керамика, резьба и текстиль позволяют увидеть культуру через материалы, цвет и орнамент.',
      ],
      [
        'Замечайте детали',
        'Спросите мастера о процессе работы и значении узоров. С разрешения можно сохранить впечатления на фотографиях.',
      ],
      ['Создайте своё воспоминание', 'Обсудите возможность мастер-класса и выберите интересующее ремесло.'],
    ],
    packing: [
      ['Для прогулок', 'Возьмите удобную обувь, небольшую сумку и вещи, подходящие погоде на даты поездки.'],
      [
        'Для впечатлений',
        'Пригодятся заряженный телефон, зарядное устройство и свободное место для фотографий.',
      ],
      [
        'Для вашего маршрута',
        'Уточните особенности программы у организатора: городская прогулка и поездка в горы требуют разной подготовки.',
      ],
    ],
  };
  return (
    top(a[1], 'Истории, люди и места', `<a href="#/journal">Путеводитель</a> / ${a[3]}`) +
    `<div class="wrap"><article class="article">${photo(a[2], '', a[1])}${bodies[id].map((b, i) => `<h2>${b[0]}</h2><p>${b[1]}</p>${i === 0 ? '<blockquote>Самые яркие воспоминания часто рождаются между пунктами маршрута.</blockquote>' : ''}${i === 1 ? photo('workshop', '', 'Работа мастера') : ''}`).join('')}<h2>Ещё статьи по теме</h2><div class="grid two">${articleCards(articles.filter((x) => x[0] !== id).slice(0, 2))}</div></article>${cta('Создадим ваш маршрут')}</div>`
  );
}

export function contacts() {
  return `<div class="wrap"><section class="split-hero contact-cover"><div><span class="kicker">Контакты</span><h1>Начнём<br>с разговора</h1><p>Ответим на ваши вопросы и поможем спланировать<br>путешествие по Узбекистану.</p><div class="contact-lines"><a href="tel:+998915340888">${icon('phone')} +998 91 534 08 88</a><a href="mailto:info@samarkand-tours.com">${icon('mail')} info@samarkand-tours.com</a><span>${icon('pin')} Самарканд, Узбекистан</span></div><div class="tabs contact-social"><a class="btn outline" href="https://wa.me/998915340888" target="_blank" rel="noopener">WhatsApp ↗</a><a class="btn outline" href="https://t.me/havas_tours" target="_blank" rel="noopener">Telegram ↗</a></div></div>${photo('samarkand', '', 'Самарканд')}</section><div class="contact-content">${photo('arch', 'contact-portrait', 'Арка и купол')}${contactForm()}</div><div class="visit-card">${icon('pin')}<div><h3>Планируете визит?</h3><p>Самарканд, бульвар. Пн–Пт 09:00–18:00, Сб 10:00–16:00.<br>Свяжитесь с нами, чтобы уточнить адрес и время встречи.</p><a class="text-link" href="https://www.openstreetmap.org/?mlat=39.6547&mlon=66.9597#map=15/39.6547/66.9597" target="_blank" rel="noopener">Открыть карту ↗</a></div><div class="visit-map"><iframe title="Карта: Самарканд" loading="lazy" referrerpolicy="no-referrer" src="https://www.openstreetmap.org/export/embed.html?bbox=66.9400%2C39.6460%2C66.9800%2C39.6640&amp;layer=mapnik&amp;marker=39.6547%2C66.9597"></iframe></div></div>${faq()}</div>`;
}

export function notFound() {
  return `<div class="wrap empty"><div class="symbol">404</div><h1>Кажется, мы свернули<br>с маршрута</h1><p>Страница не найдена, но впереди ещё много интересных направлений.</p><div class="buttons">${btn('На главную', '/')}${btn('Посмотреть туры', '/tours', 'outline')}</div></div>`;
}

export function sitemapPage() {
  return (
    top('Все дороги<br>начинаются здесь', 'Все разделы и страницы HAVAS.', 'Карта сайта') +
    `<div class="wrap sitemap-grid"><section><h2>О путешествии</h2>${[
      ['/', 'Главная'],
      ['/tours', 'Все туры'],
      ['/destinations', 'Направления'],
      ['/packages', 'Турпакеты'],
      ['/custom', 'Индивидуальная поездка'],
      ['/services', 'Услуги'],
      ['/journal', 'Путеводитель'],
    ]
      .map(([p, t]) => `<a href="#${p}">${t} →</a>`)
      .join(
        '',
      )}</section><section><h2>Страны</h2>${countries.map((c) => `<a href="#/tours/${c[0]}">${c[1]} →</a>`).join('')}<h3>Города Узбекистана</h3>${cities.map((c) => `<a href="#/city/${c.originalId}">${c.name} →</a>`).join('')}</section><section><h2>О компании</h2>${[
      ['/about', 'О нас'],
      ['/reviews', 'Отзывы путешественников'],
      ['/contacts', 'Контакты'],
      ['/mission', 'Миссия'],
      ['/sustainability', 'Устойчивый туризм'],
      ['/mission/professionalism', 'Профессионализм'],
      ['/mission/policies', 'Политики и документы'],
      ['/privacy', 'Конфиденциальность'],
      ['/terms', 'Условия использования'],
      ['/credits', 'Источники фотографий'],
    ]
      .map(([p, t]) => `<a href="#${p}">${t} →</a>`)
      .join(
        '',
      )}<h3>Программы</h3>${source.packages.map((p) => `<a href="#/packages/${p.id}">${p.title} →</a>`).join('')}</section></div>`
  );
}

export function reviewsPage() {
  return (
    top(
      'Истории наших гостей',
      'Отзывы путешественников, опубликованные на исходном сайте HAVAS.',
      'О компании / Отзывы',
    ) +
    `<div class="wrap"><div class="grid two reviews-grid">${source.reviews.map((r) => `<blockquote class="review"><span class="review-stars" aria-label="${r.rating} из 5">★★★★★</span><h3>${e(r.name)}</h3><p>${e(r.text)}</p><a href="https://www.samarkand-tours.com/" target="_blank" rel="noopener">Источник: сайт HAVAS ↗</a></blockquote>`).join('')}</div><section class="section">${cta('Ваше путешествие — ваша история')}</section></div>`
  );
}
