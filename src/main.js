/* ============================================================================
   ENTRY POINT — orchestration de l'expérience.
   Le CSS est chargé en direct (fichier public/styles.css) pour un premier
   rendu sans JS. Ce bundle JS est chargé en différé (defer).
   ============================================================================ */

import { getLang } from './core/i18n';
import { store, setPointer } from './core/store';
import { clamp } from './core/utils';
import World from './core/world';
import { initSections, renderLang, dataForLang } from './sections';
import { initSmoothScroll } from './smoothscroll';
import { initLoader } from './ui/loader';
import { initCursor } from './ui/cursor';
import { initNav } from './ui/nav';
import { initReveals, observeReveals } from './ui/reveals';
import { initTilt, observeTilt } from './ui/tilt';
import { initParallax } from './ui/parallax';
import { initCardDeck } from './ui/cardDeck';
import { initLangSwitcher } from './ui/lang';
import { initContactForm } from './ui/contact';
import { initCv } from './ui/cv';

import createHeroScene from './scenes/hero';
import createAboutScene from './scenes/about';
import createSkillsScene from './scenes/skills';
import createLabScene from './scenes/lab';
import createAmbientScene from './scenes/ambient';

function boot() {
  if (store.features.reducedMotion) document.body.classList.add('no-3d');
  if (import.meta.env.DEV) window.__store = store;
  if (import.meta.env.DEV) window.__setScroll = (t) => smooth.setTarget(t);
  // 1. DOM dynamique
  initSections();
  initCardDeck();
  initReveals();
  initParallax();
  initTilt();
  initContactForm();
  initCv();

  // 2. Scroll (smooth sur desktop, natif ailleurs)
  const smooth = initSmoothScroll({});

  // 3. Navigation
  const nav = initNav({ scrollTo: smooth.scrollTo });

  // 3b. Langue : re-rend du DOM + rebuild de la scène 3D des compétences
  initLangSwitcher({
    onSelect: (code) => {
      renderLang(code);
      initCardDeck();
      if (world) world.replaceScene(createSkillsScene(dataForLang(code)));
      observeTilt();
      observeReveals();
    },
  });

  // 4. Monde 3D (désactivé si prefers-reduced-motion)
  let world = null;
  if (!store.features.reducedMotion) {
    world = new World(document.getElementById('sceneCanvas'));
    world.addScene(createHeroScene());
    world.addScene(createAboutScene());
    world.addScene(createSkillsScene(dataForLang(getLang())));
    world.addScene(createLabScene());
    world.addScene(createAmbientScene({ name: 'projects', portal: false }));
    world.addScene(createAmbientScene({ name: 'contact', portal: true }));
    world.camera.position.set(0, 0.35, 7.6);
    world.camera.lookAt(0.3, 0, 0);
  }
  if (import.meta.env.DEV) window.__world = world;

  // 5. Curseur personnalisé (desktop)
  const cursor = initCursor();

  // 6. Pointer → store + raycast 3D
  window.addEventListener(
    'pointermove',
    (e) => {
      setPointer(e.clientX, e.clientY);
      if (world) world.onPointerMove({ x: store.mouse.x, y: store.mouse.y });
    },
    { passive: true }
  );
  window.addEventListener(
    'pointerdown',
    (e) => {
      store.down = true;
      if (world) world.onPointerDown({ x: store.mouse.x, y: store.mouse.y });
    },
    { passive: true }
  );
  window.addEventListener('pointerup', () => {
    store.down = false;
    if (world) world.onPointerUp();
  });

  // 7. Ancres globales (boutons hero, liens footer…)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    const el = document.querySelector(a.getAttribute('href'));
    if (el) smooth.scrollTo(el);
  });

  // 8. Loader
  initLoader({
    onDone: () => {
      document.body.classList.add('loaded');
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => measureLater());
      }
      function measureLater() {
        if (smooth && typeof smooth.remeasure === 'function') smooth.remeasure();
      }
    },
  });

  // 9. Boucle principale
  let last = performance.now();
  function loop(now) {
    const dt = clamp((now - last) / 1000, 0, 0.05);
    last = now;
    store.dt = dt;
    store.time += dt;

    nav.setScrolled(store.scroll.y);
    if (world) {
      world.update({
        t: store.time,
        dt,
        mouse: store.mouse,
        pointer: store.pointer,
        viewport: store.viewport,
        features: store.features,
      });
    }
    if (cursor) cursor.update(dt);

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Perf : suspendre le rendu quand l'onglet est caché
  document.addEventListener('visibilitychange', () => {
    last = performance.now();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
