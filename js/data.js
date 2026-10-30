import { source } from './util.js';

export const cities = [
  {
    id: 'samarkand',
    name: 'Самарканд',
    tag: 'История',
    title: 'Самарканд за один день',
    desc: 'Регистан, голубые купола и история Великого шёлкового пути.',
    places: ['Регистан', 'Мечеть Биби-Ханым', 'Мавзолей Гур-Эмир'],
    pics: ['registan', 'bibi', 'gur'],
  },
  {
    id: 'bukhara',
    name: 'Бухара',
    tag: 'История',
    title: 'Бухара: по следам караванов',
    desc: 'Древние мечети, торговые купола и неспешные прогулки по старому городу.',
    places: ['Ансамбль Пои-Калян', 'Торговые купола', 'Крепость Арк'],
  },
  {
    id: 'khiva',
    name: 'Хива',
    tag: 'История',
    title: 'Хива — город под открытым небом',
    desc: 'Глиняные стены, узкие улочки и бирюзовая мозаика древнего города.',
    places: ['Ичан-Кала', 'Кальта-Минор', 'Улицы старого города'],
  },
  {
    id: 'tashkent',
    name: 'Ташкент',
    tag: 'История',
    title: 'Знакомство с Ташкентом',
    desc: 'Современная столица, восточный базар и архитектурные открытия.',
    places: ['Базар Чорсу', 'Комплекс Хаст-Имам', 'Центр города'],
  },
  {
    id: 'fergana',
    name: 'Фергана',
    tag: 'Природа',
    title: 'Краски Ферганской долины',
    desc: 'Зелёная долина, традиции и путешествие в собственном ритме.',
    places: ['Знакомство с долиной', 'Местные ремёсла', 'Прогулка по городу'],
  },
];

export const countries = [
  [
    'uzbekistan',
    'Узбекистан',
    'samarkand',
    'Страна великих городов, шёлкового пути и тёплого гостеприимства.',
  ],
  ['kazakhstan', 'Казахстан', 'kazakhstan', 'Бескрайние степи, величественные горы и современные города.'],
  ['kyrgyzstan', 'Кыргызстан', 'kyrgyzstan', 'Горы, озёра и кочевые традиции в сердце Тянь-Шаня.'],
  ['tajikistan', 'Таджикистан', 'tajikistan', 'Горные маршруты и неспешные открытия.'],
  ['turkmenistan', 'Туркменистан', 'turkmenistan', 'Древние города и наследие Шёлкового пути.'],
];

for (const info of source.cities) {
  let c = cities.find((c) => c.id === info.id);
  if (!c) {
    c = {
      id: info.id,
      name: info.name,
      title: info.name + ' за один день',
      tag: ['zaamin', 'chimgan', 'fergana'].includes(info.id) ? 'Природа' : 'История',
    };
    cities.push(c);
  }
  Object.assign(c, info, { country: 'uzbekistan', duration: '1 день' });
}

const international = Object.values(source.countries).flat();

export function findTour(id) {
  return cities.find((c) => c.id === id) || international.find((c) => c.id === id);
}

export function shortTitle(c) {
  return c.title || c.name;
}

export const services = [
  ['hotels', 'Отели', 'hotel', 'Размещение в отелях от 3 до 5 звёзд: подберём вариант под ваш маршрут.'],
  ['transfers', 'Трансферы', 'transfer', 'Встреча в аэропорту и переезды между городами.'],
  ['excursions', 'Экскурсии', 'excursion', 'История и культура с местными гидами.'],
  ['conferences', 'Конференции', 'conference', 'Организация деловых мероприятий в Узбекистане.'],
  [
    'mountains',
    'Горный отдых',
    'mountains',
    'Чимган и Бельдерсай: горные прогулки, активный отдых и время на природе.',
  ],
  ['workshops', 'Мастер-классы', 'craft', 'Знакомство с ремёслами и местной кухней.'],
];

export const articles = [
  ['first-trip', 'Первое путешествие в Узбекистан', 'tea', 'Маршруты'],
  ['taste', 'Вкус Узбекистана', 'plov', 'Кухня'],
  ['samarkand-day', 'Один день в Самарканде', 'registan', 'Маршруты'],
  ['crafts', 'Искусство ремесла', 'wood', 'Культура'],
  ['packing', 'Что взять с собой', 'market', 'Маршруты'],
];
