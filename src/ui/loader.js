import { store } from '../core/store';

/**
 * LOADING SCREEN — court, ne bloque jamais.
 * Progress 0→100 puis transition vers le hero.
 */
export function initLoader({ onDone }) {
  const el = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  const ring = document.getElementById('loaderRing');
  const label = document.getElementById('loaderLabel');

  if (store.features.reducedMotion) {
    if (el) el.remove();
    onDone();
    return;
  }

  const labels = ['INITIALIZING EXPERIENCE…', 'CALIBRATING SCENE…', 'LOADING PARTICLES…', 'SHADING LIGHT…', 'WELCOME.'];
  let progress = 0;
  let labelIdx = 0;

  const fontReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const minTime = 1400;
  const t0 = performance.now();

  let done = false;
  function finish() {
    if (done) return;
    done = true;
    el.classList.add('done');
    setTimeout(() => {
      el.remove();
      onDone();
    }, 700);
  }

  // Messages progressifs
  const labelTimer = setInterval(() => {
    if (done) return;
    labelIdx = Math.min(labelIdx + 1, labels.length - 1);
    if (label.textContent) label.textContent = labels[labelIdx];
  }, 340);

  function step(now) {
    const elapsed = now - t0;
    // 70% pendant minTime, 30% restant attendu si fonts lentes
    const base = Math.min(elapsed / minTime, 1) * 100;
    progress = Math.max(progress, base);
    // accélération une fois la police prête
    const ease = base > 70 ? 100 : progress;
    progress = Math.max(progress, ease * (elapsed / minTime > 1 ? 1 : elapsed / minTime));

    pct.textContent = `${Math.round(progress)}%`;
    bar.style.width = `${progress}%`;
    if (ring) ring.style.transform = `rotate(${progress * 3.6}deg)`;

    if (progress >= 99.5 && elapsed > minTime) {
      clearInterval(labelTimer);
      fontReady.then(() => {
        pct.textContent = '100%';
        bar.style.width = '100%';
        setTimeout(finish, 350);
      });
      return;
    }
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
