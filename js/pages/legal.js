import { notFound } from './company.js';
import { crumb, cta, e, icon, photo, photoFiles, source, top } from '../util.js';

export function legal(consent = false) {
  return `<div class="wrap"><article class="legal">${crumb('Документы')}<h1>${consent ? 'Согласие на обработку данных' : 'Конфиденциальность'}</h1><h2>Какие данные мы получаем</h2><p>Имя, телефон или email, выбранные даты, количество гостей и пожелания, которые вы указали в форме.</p><h2>Зачем они нужны</h2><p>Только чтобы связаться с вами, подобрать маршрут и подготовить предложение. Мы не передаём данные третьим лицам для рекламы.</p><h2>Как передаётся заявка</h2><p>Форма отправляет заявку менеджеру HAVAS через защищённый канал. Копия последней заявки также хранится в вашем браузере, чтобы её можно было повторно отправить через WhatsApp.</p><h2>Удаление данных</h2><p>Удалить копию заявки из браузера можно кнопкой ниже. Чтобы удалить данные, полученные компанией, напишите нам на email.</p><button id="delete-data" class="btn outline">Удалить копию заявки</button><p id="delete-status" role="status"></p><h2>Контакты</h2><a href="mailto:info@samarkand-tours.com">info@samarkand-tours.com</a></article></div>`;
}

export function missionPage(section, id) {
  if (section === 'policies') return policiesPage(id);
  if (section === 'professionalism')
    return (
      top(
        'Профессионализм<br>в устойчивости',
        'Ответственные решения в путешествии и повседневной работе.',
        'Миссия / Профессионализм',
      ) +
      `<div class="wrap"><div class="mission-tabs"><a href="#/mission">Миссия</a><a class="active" href="#/mission/professionalism">Профессионализм</a><a href="#/mission/policies">Политики</a></div><div class="journal-feature">${photo('wood', '', 'Местные ремёсла')}<div><span class="kicker">Люди и местные сообщества</span><h2>Путешествия<br>с положительным влиянием</h2><p>HAVAS рассказывает о сотрудничестве с семейными производителями, поддержке ремесленников и обучении сотрудников принципам устойчивого туризма.</p></div></div><div class="grid three principle-grid"><div><span class="number">01</span><h3>Экологические решения</h3><p>На исходном сайте компания описывает использование газобаллонного оборудования и электромобилей, диспенсеров для многоразовых бутылок и электронного документооборота.</p></div><div><span class="number">02</span><h3>Местная экономика</h3><p>Прямые закупки у семейных производителей и ремесленников помогают сохранять традиции и поддерживать местные предприятия.</p></div><div><span class="number">03</span><h3>Обучение команды</h3><p>Сотрудник команды прошёл обучение и получил персональный сертификат менеджера по устойчивости Travelife.</p></div></div>${source.certificate ? `<section class="certificate-block"><div><span class="kicker">Профессиональное развитие</span><h2>Персональный сертификат Travelife</h2><p>Документ сотрудника опубликован на исходном сайте HAVAS.</p><a class="btn outline" href="${source.certificate}" target="_blank" rel="noopener">Открыть сертификат PDF ↗</a></div><div class="certificate-symbol">${icon('map')}<span>Travelife</span><small>SUSTAINABILITY MANAGEMENT</small></div></section>` : ''}<section class="section">${cta('Путешествие с заботой о месте', 'Познакомьтесь с документами компании.', '/mission/policies')}</section></div>`
    );
  const principles = [
    ['Сохранять наследие', 'Беречь биоразнообразие, природные ландшафты и историко-культурные памятники.'],
    ['Уважать людей', 'С уважением относиться к традициям, религиям и культурному разнообразию.'],
    ['Снижать воздействие', 'Сокращать отходы и внимательнее выбирать транспорт и размещение.'],
    ['Поддерживать женщин', 'Сотрудничать с женскими инициативами и социальными предприятиями.'],
    [
      'Развивать ответственный бизнес',
      'Работать прозрачно и поддерживать местные малые и средние предприятия.',
    ],
    [
      'Разделять общие ценности',
      'Объединять путешественников и партнёров вокруг ответственности и уважения.',
    ],
    ['Обучать и вдохновлять', 'Знакомить сотрудников, партнёров и гостей с принципами устойчивого туризма.'],
    ['Внедрять новые решения', 'Использовать технологии, помогающие беречь ресурсы.'],
    ['Поддерживать сообщества', 'Создавать возможности для местных жителей и предприятий.'],
    ['Продвигать этичный туризм', 'Уважать права работников и справедливое распределение доходов.'],
  ];
  return (
    top(
      'Оставлять впечатления.<br>Беречь наследие.',
      'Миссия HAVAS — туризм с заботой о природе, культуре и людях.',
      'Устойчивое развитие',
    ) +
    `<div class="wrap"><div class="mission-tabs"><a class="active" href="#/mission">Миссия</a><a href="#/mission/professionalism">Профессионализм</a><a href="#/mission/policies">Политики</a></div>${photo('zaamin', 'wide-photo', 'Природа Узбекистана')}<section class="section"><h2>Наши принципы</h2><div class="grid two principle-grid">${principles.map((p, i) => `<div><span class="number">${String(i + 1).padStart(2, '0')}</span><h3>${p[0]}</h3><p>${p[1]}</p></div>`).join('')}</div></section>${cta('Путешествуйте осознанно', 'Познакомьтесь с подходом компании на практике.', '/mission/professionalism')}</div>`
  );
}

function policiesPage(id) {
  const titles = {
      accommodation: 'Размещение',
      emergency: 'Экстренные ситуации',
      energy: 'Энергосбережение',
      hr: 'Кадровая политика',
      privacy: 'Конфиденциальность',
      purchasing: 'Закупки',
      excursion: 'Устойчивые экскурсии',
      transportation: 'Транспорт',
      conduct: 'Кодекс путешественника',
    },
    selected = source.documents.find((d) => d.id === id);
  if (id && !selected) return notFound();
  return (
    top(
      'Ответственность,<br>закреплённая в правилах',
      'Библиотека документов HAVAS об устойчивом туризме.',
      'Миссия / Политики',
    ) +
    `<div class="wrap policy-layout"><aside class="policy-nav"><h3>Документы</h3>${source.documents.map((d) => `<a class="${d.id === id ? 'active' : ''}" href="#/mission/policies/${d.id}">${titles[d.id]} <span>↗</span></a>`).join('')}</aside><article class="policy-document">${selected ? `<div class="document-toolbar"><div><span class="kicker">Документ HAVAS</span><h2>${selected.title}</h2></div><a class="btn outline" href="${selected.local}" download>Скачать DOCX ↓</a></div>${selected.paragraphs.map((p) => (p.type === 'heading' ? `<h3>${e(p.text)}</h3>` : `<p class="${p.type === 'list' ? 'document-list-item' : ''}">${e(p.text)}</p>`)).join('')}` : `<span class="kicker">Принципы нашей работы</span><h2>Библиотека политик</h2><p>Здесь собраны документы о размещении, транспорте, экскурсиях, закупках и ответственном поведении в путешествии.</p><p>Выберите документ слева, чтобы прочитать его на сайте или скачать оригинал.</p>${photo('street', 'wide-photo', 'Исторический город')}`}</article></div>`
  );
}

export function creditsPage() {
  const unique = [...new Map(Object.values(photoFiles).map((p) => [p.file, p])).values()];
  return (
    top('Фотографии и источники', 'Фотографии направлений, их авторы и лицензии.', 'Источники') +
    `<div class="wrap"><div class="grid three">${unique.map((p) => `<div class="credit-item"><img src="assets/${p.file}" alt="${e(p.label || 'Фото направления')}" loading="lazy"><p>${e(p.license)}${p.author ? ' · ' + e(p.author) : ''}</p>${p.source.startsWith('https://') ? `<a class="text-link" href="${e(p.source)}" target="_blank" rel="noopener">Источник изображения ↗</a>` : `<span>${e(p.source)}</span>`}</div>`).join('')}</div><section class="section"><p>Типографика: Playfair Display и Golos Text. Файлы шрифтов и лицензии OFL находятся в папке assets/fonts.</p></section></div>`
  );
}

export function originalLegal(kind) {
  const doc = source.legal[kind];
  return `<div class="wrap legal-page"><aside class="legal-toc"><span class="kicker">${kind === 'privacy' ? 'Конфиденциальность' : 'Условия'}</span>${doc.sections.map((s, i) => `<a href="#section-${i}" data-section="section-${i}">${s.title}</a>`).join('')}<a href="#/consent">Как мы обрабатываем заявки ↗</a></aside><article><h1>${doc.title}</h1><p class="document-meta">Редакция исходного сайта HAVAS · ${doc.updated}</p>${doc.sections.map((s, i) => `<section id="section-${i}"><h2>${s.title}</h2>${s.paragraphs.map((t) => `<p>${e(t)}</p>`).join('')}</section>`).join('')}<a class="text-link" href="${doc.source}" target="_blank" rel="noopener">Документ на исходном сайте ↗</a></article></div>`;
}
