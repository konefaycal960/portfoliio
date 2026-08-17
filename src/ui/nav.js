import { store } from '../core/store';

/** NAVIGATION — état scroll, section active, menu mobile plein écran. */
export function initNav({ scrollTo }) {
  const nav = document.getElementById('navbar');
  const burger = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  const links = nav.querySelectorAll('a[href^="#"]');
  const menuLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];
  const allLinks = [...links, ...menuLinks];

  const setScrolled = (y) => {
    if (nav) nav.classList.toggle('scrolled', y > 24);
  };

  store.on('section:change', (name) => {
    allLinks.forEach((a) => {
      const target = a.getAttribute('href');
      const active = target === `#${name}`;
      a.classList.toggle('active', active);
    });
  });

  // Clic liens → scroll doux
  allLinks.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      closeMenu();
      scrollTo(target);
    });
  });

  // Burger
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open);
      menu.setAttribute('aria-hidden', !open);
    });
  }

  function closeMenu() {
    if (!menu) return;
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  return { setScrolled, closeMenu };
}
