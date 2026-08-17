import * as THREE from 'three';
import { store } from '../core/store';
import { rand, damp } from '../core/utils';
import { COLORS, makePoints, makeRing, makeWire, makeGlow } from './_shared';

/** Scène ambiante très discrète (Projets / Contact). */
export default function createAmbientScene(opts = {}) {
  const { portal = false, dim = 0.55 } = opts;
  const group = new THREE.Group();
  const pf = store.features.particleFactor;
  const isMobile = store.features.isMobile;

  const dust = makePoints({
    count: Math.round(420 * pf),
    radius: 9,
    size: 0.02,
    color: 0x8f88ff,
    opacity: 0.45,
  });

  const cubes = [];
  for (let i = 0; i < (isMobile ? 3 : 6); i++) {
    const s = rand(0.1, 0.24);
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(s, s, s),
      new THREE.MeshBasicMaterial({ color: COLORS.muted, wireframe: true, transparent: true, opacity: 0.5 })
    );
    cube.position.set(rand(-6, 6), rand(-2.4, 2.4), rand(-3, -1));
    cube.userData = { s, phase: rand(0, Math.PI * 2) };
    group.add(cube);
    cubes.push(cube);
  }

  const extras = new THREE.Group();
  if (portal) {
    const ring = makeRing(2.6, COLORS.violet, { tube: 0.02, tilt: { x: Math.PI / 2 }, opacity: 0.7 });
    const ring2 = makeRing(3.3, COLORS.cyan, { tube: 0.012, tilt: { x: Math.PI / 2 }, opacity: 0.4 });
    const coreWire = makeWire(new THREE.OctahedronGeometry(1.1), COLORS.gold, 0.3);
    const glow = makeGlow(6, 'rgba(108,92,231,0.18)');
    glow.position.z = -0.8;
    extras.add(ring, ring2, coreWire, glow);
  } else {
    const coreWire = makeWire(new THREE.IcosahedronGeometry(1.0, 1), COLORS.violet, 0.24);
    extras.add(coreWire);
  }
  extras.position.set(2.4, 0, -1);
  group.add(extras, dust);

  const mouse = { x: 0, y: 0 };

  return {
    name: opts.name || 'ambient',
    group,
    update(state) {
      const t = state.t;
      mouse.x += (state.mouse.x - mouse.x) * damp(state.dt, 2);
      mouse.y += (state.mouse.y - mouse.y) * damp(state.dt, 2);

      extras.rotation.x = t * 0.08 + mouse.y * 0.06;
      extras.rotation.y = t * 0.1 + mouse.x * 0.12;
      dust.rotation.y = t * 0.012;

      for (const c of cubes) {
        c.rotation.x += state.dt * 0.3;
        c.rotation.y += state.dt * 0.22;
        c.position.y = Math.sin(t * 0.5 + c.userData.phase) * 0.2;
      }

      const sc = state.scrollLocal;
      group.position.y = -sc * 1.8;
      group.scale.setScalar(1 - sc * 0.12);
    },
    cameraPose(state) {
      const sc = state.scrollLocal;
      return {
        pos: [mouse.x * 0.6, mouse.y * 0.3 - sc * 0.7, 8 + sc * 2],
        target: [0.6, 0, 0],
      };
    },
    groupOpacity: dim,
  };
}
