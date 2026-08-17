import { store } from '../core/store';

/**
 * TILT 3D + SPOTLIGHT — cartes projets.
 * La carte s'incline selon la souris, se soulève, une lumière suit le
 * curseur (via variables CSS --mx / --my), l'image zoom légèrement.
 */
export function initTilt() {
  const isTouch = store.features.isTouch || store.features.reducedMotion;
  observeTilt();
  if (isTouch) return;
}

/* Relie le tilt aux cartes présentes dans le DOM (re-lié après re-rendu i18n). */
export function observeTilt() {
  const isTouch = store.features.isTouch || store.features.reducedMotion;
  const cards = document.querySelectorAll('.card[data-project]:not([data-tilt-bound])');

  cards.forEach((card) => {
    if (isTouch) return;
    card.dataset.tiltBound = 'true';

    // Cartes compactes du rail : spotlight seulement (pas de tilt, ça gênerait le drag)
    if (card.dataset.rail) {
      const onSpot = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
        card.classList.add('hover');
      };
      const onLeave = () => card.classList.remove('hover');
      card.addEventListener('pointermove', onSpot, { passive: true });
      card.addEventListener('pointerleave', onLeave, { passive: true });
      return;
    }

    const maxTilt = 10;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * maxTilt;
      const ry = (px - 0.5) * maxTilt;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-10px) scale(1.02)`;
      card.classList.add('hover');
    };
    const onLeave = () => {
      card.style.transform = '';
      card.classList.remove('hover');
    };

    card.addEventListener('pointermove', onMove, { passive: true });
    card.addEventListener('pointerleave', onLeave, { passive: true });
  });
}
