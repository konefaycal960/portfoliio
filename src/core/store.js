/* ============================================================================
   STORE GLOBAL
   État partagé entre les modules : souris, scroll, viewport, appareil.
   + mini bus d'événements.
   ============================================================================ */

import { detectFeatures } from './utils';

export const store = {
  features: detectFeatures(),

  // Souris (normalisée -1..1) + position écran pour le raycasting
  mouse: { x: 0, y: 0 },
  pointer: { x: 0, y: 0 }, // pixels, relatif viewport
  down: false,

  // Scroll (valeur lissée = celle utilisée par le 3D et les parallaxes)
  scroll: {
    y: 0, // lissée
    target: 0, // cible (custom scroll)
    raw: 0, // scroll natif (touch)
    progress: 0, // 0..1 global
    velocity: 0,
    max: 1,
    centerY: window.innerHeight / 2, // position du centre du viewport dans le document
  },

  // Viewport
  viewport: { w: window.innerWidth, h: window.innerHeight, aspect: window.innerWidth / window.innerHeight },

  // Temps
  time: 0,
  dt: 0,

  // Sections mesurées (ordre = ordre du DOM)
  sections: [],
  activeSection: 'hero',

  // Événements
  _events: new Map(),

  on(name, fn) {
    if (!this._events.has(name)) this._events.set(name, []);
    this._events.get(name).push(fn);
    return () => this.off(name, fn);
  },
  off(name, fn) {
    const list = this._events.get(name);
    if (list) this._events.set(name, list.filter((f) => f !== fn));
  },
  emit(name, payload) {
    const list = this._events.get(name);
    if (list) for (const fn of list) fn(payload);
  },
};

/* Met à jour la taille du viewport. */
export function resizeViewport() {
  store.viewport.w = window.innerWidth;
  store.viewport.h = window.innerHeight;
  store.viewport.aspect = store.viewport.w / store.viewport.h;
}

export function setPointer(clientX, clientY) {
  const { w, h } = store.viewport;
  store.pointer.x = clientX;
  store.pointer.y = clientY;
  store.mouse.x = (clientX / w) * 2 - 1;
  store.mouse.y = -((clientY / h) * 2 - 1);
}
