import { initLang } from './i18n.js';
import { closeLang, closeMega } from './layout.js';
import { render } from './router.js';

document.querySelector('.skip').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.querySelector('#main').setAttribute('tabindex', '-1');
  document.querySelector('#main').focus();
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && document.body.classList.contains('mega-open')) {
    const t = document.querySelector('.mega-trigger[aria-expanded=true]');
    closeMega();
    t?.focus();
  }
});

document.addEventListener('click', (ev) => {
  if (!ev.target.closest('.mega-item')) closeMega();
  if (!ev.target.closest('.lang')) closeLang();
});

window.addEventListener('resize', () => {
  if (innerWidth > 720) closeMega();
});

window.addEventListener('popstate', render);

window.addEventListener('hashchange', render);

await initLang();
render();
