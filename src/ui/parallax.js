import { store } from '../core/store';

/** Parallaxe de profondeur sur la composition « mots flottants » (About). */
export function initParallax() {
  const root = document.querySelector('.about-visual');
  if (!root || store.features.isTouch || store.features.reducedMotion) return;

  const words = root.querySelectorAll('[data-depth]');
  const maxTilt = 7;
  let mx = 0;
  let my = 0;

  window.addEventListener(
    'pointermove',
    (e) => {
      const r = root.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      mx += (px - mx) * 0.06;
      my += (py - my) * 0.06;
      root.style.transform = `rotateY(${(-mx * maxTilt).toFixed(2)}deg) rotateX(${(my * maxTilt).toFixed(2)}deg)`;
      words.forEach((w) => {
        const d = parseFloat(w.dataset.depth) || 1;
        w.style.transform = `translate3d(${(mx * d * -64).toFixed(2)}px, ${(my * d * -44).toFixed(2)}px, 0)`;
      });
    },
    { passive: true }
  );
}
