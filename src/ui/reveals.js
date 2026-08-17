import { store } from '../core/store';

/**
 * REVEALS — apparition progressive des blocs au scroll.
 * Respecte prefers-reduced-motion (apparition immédiate).
 */
let io = null;

export function initReveals() {
  if (store.features.reducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
    return;
  }
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
  }
  observeReveals();
}

/* Observe les éléments ajoutés après coup (re-rendu i18n). Sans doublon :
   observer() sur un élément déjà observé est sans effet. */
export function observeReveals() {
  if (store.features.reducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in'));
    return;
  }
  if (!io) {
    initReveals();
    return;
  }
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
