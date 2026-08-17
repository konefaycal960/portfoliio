import { LANGS, getLang, setLang } from '../core/i18n';

/* ============================================================================
   LANG SWITCHER — sélecteur desktop (dropdown dans la nav) + boutons dans le
   menu mobile. `onSelect(code)` est appelé après chaque changement.
   ============================================================================ */

export function initLangSwitcher({ onSelect } = {}) {
  const root = document.querySelector('[data-lang-switcher]');
  const menu = document.getElementById('langMenu');
  const current = document.getElementById('langCurrent');
  const btn = document.getElementById('langBtn');

  function labelOf(code) {
    const l = LANGS.find((x) => x.code === code);
    return l ? l.label : code.toUpperCase();
  }

  function update(code) {
    if (current) current.textContent = labelOf(code);
    if (menu) {
      menu.querySelectorAll('button[data-lang]').forEach((b) => {
        if (b.dataset.lang === code) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }
    const mobile = document.querySelector('[data-lang-mobile]');
    if (mobile) {
      mobile.querySelectorAll('button[data-lang]').forEach((b) => {
        if (b.dataset.lang === code) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }
  }

  function toggle(force) {
    if (!root) return;
    const open = typeof force === 'boolean' ? force : !root.classList.contains('open');
    root.classList.toggle('open', open);
    if (btn) btn.setAttribute('aria-expanded', String(open));
    if (menu) menu.setAttribute('aria-hidden', String(!open));
  }

  function select(code) {
    setLang(code);
    update(code);
    toggle(false);
    if (onSelect) onSelect(code);
  }

  function buildMenu() {
    if (!menu) return;
    menu.innerHTML = '';
    LANGS.forEach((l) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.lang = l.code;
      b.setAttribute('role', 'menuitem');
      b.textContent = `${l.name} (${l.label})`;
      b.addEventListener('click', () => select(l.code));
      menu.appendChild(b);
    });
  }

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
  }
  if (root) {
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) toggle(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggle(false);
  });

  // Boutons langue dans le menu mobile
  const mobile = document.querySelector('[data-lang-mobile]');
  if (mobile) {
    LANGS.forEach((l) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'lang-mobile-btn mono';
      b.dataset.lang = l.code;
      b.textContent = l.label;
      b.setAttribute('aria-label', l.name);
      b.addEventListener('click', () => select(l.code));
      mobile.appendChild(b);
    });
  }

  buildMenu();
  update(getLang());
}
