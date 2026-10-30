import { shortTitle } from './data.js';
import { e, icon, photo, photoFiles, requestedDate } from './util.js';

export function card(c, horizontal = false) {
  const preview =
    {
      samarkand:
        'Регистан, Биби-Ханым и Гур-Эмир. Атмосферные улочки, бирюзовые купола и история Великого шёлкового пути.',
      bukhara:
        'Древние мечети, медресе и торговые купола. Прогулка по старому городу, где каждый поворот хранит свою историю.',
    }[c.id] ||
    c.short ||
    c.desc;
  return `<a class="tour-card ${horizontal ? 'horizontal' : ''}" href="#/tour/${c.id}${requestedDate() ? '?date=' + requestedDate() : ''}">${photo(c.id, '', c.name)}<div class="card-body"><h3>${shortTitle(c)}</h3><div class="meta"><span>◷ ${c.duration || '1 день'}</span><span>${c.tag}</span></div>${horizontal ? `<p>${preview}</p>` : ''}<div class="card-bottom"><span>Стоимость по запросу</span><span class="circle" aria-hidden="true">↗</span></div></div></a>`;
}

export const faq = () =>
  `<div class="faq"><h2>Частые вопросы</h2><details><summary>Что входит в программу?</summary><p>Маршрут и состав услуг согласовываются перед поездкой. Укажите пожелания в заявке, чтобы обсудить гида, транспорт и дополнительные посещения.</p></details><details><summary>Можно ли изменить маршрут?</summary><p>Да, вы можете предложить свои места и темп поездки. Для этого выберите индивидуальное путешествие.</p></details><details><summary>Как узнать стоимость?</summary><p>Стоимость зависит от дат, количества гостей и выбранных услуг. Оставьте свои пожелания для расчёта.</p></details></div>`;

export function form(subject = 'Путешествие', full = false) {
  return `<form class="form-panel inquiry" data-subject="${e(subject)}"><h3>${full ? 'Расскажите о своей идеальной поездке' : 'Спланируем вашу поездку'}</h3><p>Стоимость и детали уточняются индивидуально.</p>${full ? `<label>Куда хотите поехать?<select name="destination"><option>Самарканд</option><option>Бухара</option><option>Хива</option><option>Несколько городов</option><option>Другое направление</option></select></label>` : ''}<div class="field-grid"><label>Дата поездки<input type="date" name="date" value="${requestedDate()}"></label><label>Количество гостей<input type="number" name="guests" value="2" min="1" max="100" required></label></div>${full ? `<label>Что вам интересно?<select name="interest"><option>История и культура</option><option>Кухня</option><option>Природа</option><option>Ремёсла</option></select></label>` : ''}<label>Ваше имя<input name="name" autocomplete="name" placeholder="Как к вам обращаться?" required maxlength="100"></label><label>Телефон или email<input name="contact" autocomplete="email" placeholder="+998 … или name@example.com" required maxlength="150"></label><label>Пожелания<textarea name="message" placeholder="Расскажите о ваших интересах" maxlength="2000"></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>Согласен на обработку данных. <a href="#/consent">Подробнее</a></span></label><p class="error" role="alert"></p><button type="submit">Отправить заявку <span>→</span></button><p class="form-note">Заявка придёт менеджеру HAVAS, мы ответим в рабочее время.</p></form>`;
}

export function articleCards(arr) {
  return arr
    .map(
      (a) =>
        `<a class="service-card" href="#/article/${a[0]}">${photo(a[2], '', a[1])}<span class="kicker" style="margin-top:18px">${a[3]}</span><h3>${a[1]}</h3><span class="text-link">Читать статью →</span></a>`,
    )
    .join('');
}

export function packageCard(p) {
  return `<a class="tour-card package-card" href="#/packages/${p.id}">${photo(p.photo, '', p.title)}<div class="card-body"><span class="kicker">${p.duration}</span><h3>${p.title}</h3><p>${p.desc}</p><div class="card-bottom"><span>Стоимость по запросу</span><span class="circle">↗</span></div></div></a>`;
}

export function choiceField(name, label, values) {
  return `<fieldset class="choice-field"><legend>${label}</legend><div class="choice-row">${values.map((v, i) => `<label class="choice"><input type="radio" name="${name}" value="${v}" ${i === 0 ? 'checked' : ''}><span>${v}</span></label>`).join('')}</div></fieldset>`;
}

export function consentControl() {
  return `<label class="consent"><input type="checkbox" name="consent" required><span>Согласен на <a href="#/consent">обработку персональных данных</a></span></label>`;
}

export function contactForm() {
  return `<form class="inquiry contact-form" data-subject="Сообщение через контакты"><h2>Напишите нам</h2><p>Оставьте сообщение — обсудим вашу поездку.</p><label>Ваше имя<input name="name" autocomplete="name" placeholder="Как к вам обращаться?" required></label><label>Телефон или email<input name="contact" placeholder="Ваш телефон или email" required></label><label>Сообщение<textarea name="message" placeholder="Расскажите, чем можем помочь" required></textarea></label>${consentControl()}<p class="error" role="alert"></p><button type="submit">Отправить сообщение <span>→</span></button><p class="form-note">Заявка придёт менеджеру HAVAS, мы ответим в рабочее время.</p></form>`;
}

export function gallery(c) {
  const pics = [...new Set([c.id, ...(c.pics || [])])].filter((k) => photoFiles[k]).slice(0, 6);
  return `<div class="gallery-layout"><div id="gallery-main">${photo(pics[0], 'wide-photo', c.name)}</div><div class="thumbs">${pics.map((p, i) => `<button data-gallery="${p}" class="${i === 0 ? 'active' : ''}" aria-label="Фотография ${i + 1}">${photo(p, '', c.name)}</button>`).join('')}</div></div>`;
}

export function compactRequest(c) {
  return `<form id="tour-request" class="form-panel compact-request" data-tour="${c.id}"><h3>Спланируем вашу<br>поездку</h3><p>Оставьте заявку, и мы подберём удобные даты и детали путешествия.</p><div class="request-price">${icon('clock')} Стоимость по запросу</div><label>Дата поездки<input type="date" name="date" value="${requestedDate()}"></label><label>Количество гостей<input type="number" name="guests" value="2" min="1" max="100" required></label><button type="submit">Отправить заявку <span>→</span></button><p class="form-note">Контакты можно оставить на следующем шаге.</p></form>`;
}
