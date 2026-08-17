import { store } from '../core/store';

/**
 * CUSTOM CURSOR — Desktop uniquement (pointeur fin + hover).
 * Dot instantané + anneau lissé. États : normal, interactif (grossi),
 * "VIEW" sur les cartes projets. Boutons magnétiques.
 */
export function initCursor() {
  const f = store.features;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!fine.matches || f.reducedMotion) return null;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return null;

  document.body.classList.add('has-cursor');

  let rx = innerWidth / 2;
  let ry = innerHeight / 2;
  let tx = rx;
  let ty = ry;
  let visible = false;
  let hover = false;
  let labelMode = false;
  let labelText = 'VIEW';

  const update = (dt) => {
    const k = 1 - Math.exp(-dt * (hover ? 16 : 11));
    rx += (tx - rx) * k;
    ry += (ty - ry) * k;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%) scale(${labelMode ? 3.4 : hover ? 1.9 : 1})`;
    ring.textContent = labelMode ? labelText : '';
    ring.classList.toggle('label', labelMode);
  };

  const show = () => {
    if (!visible) {
      visible = true;
      dot.style.opacity = ring.style.opacity = 1;
    }
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      show();
    },
    { passive: true }
  );

  // États survolés
  const interactiveSel = 'a, button, [data-hover], .card, .skill-chip, .lab-tab, input, textarea, .magnet, select';
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest ? e.target.closest(interactiveSel) : null;
    hover = !!t;
    labelMode = !!e.target.closest('.card[data-project]');
    labelText = 'VIEW';
    if (labelMode && e.target.closest('a')) labelText = 'OPEN';
  });
  document.addEventListener('mouseout', () => {
    hover = false;
    labelMode = false;
  });
  document.addEventListener('mousedown', () => ring.classList.add('pressed'));
  document.addEventListener('mouseup', () => ring.classList.remove('pressed'));

  // Effet magnétique sur les boutons
  const magnets = [];
  document.addEventListener('pointermove', (e) => {
    const target = e.target.closest('.magnet');
    if (!target || !target.isConnected) return;
    const rect = target.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.24;
    const dy = (e.clientY - cy) * 0.24;
    target.style.transform = `translate(${dx}px, ${dy}px)`;
    if (!magnets.includes(target)) {
      magnets.push(target);
      const release = () => {
        target.style.transform = '';
        target.removeEventListener('mouseleave', release);
        const i = magnets.indexOf(target);
        if (i >= 0) magnets.splice(i, 1);
      };
      target.addEventListener('mouseleave', release, { once: true });
    }
  });

  return { update };
}
