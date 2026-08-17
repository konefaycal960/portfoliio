import * as THREE from 'three';
import { store } from '../core/store';
import { damp } from '../core/utils';
import { COLORS, makePoints, makeWire, makeRing, makeGlow } from './_shared';

/**
 * ABOUT — décor ambiant derrière la composition « mots flottants ».
 * Cœur doux, anneaux et poussière lumineuse. Discret : le texte reste roi.
 */
export default function createAboutScene() {
  const group = new THREE.Group();
  const pf = store.features.particleFactor;

  const core = makeWire(new THREE.IcosahedronGeometry(1.3, 1), COLORS.violet, 0.32);
  const inner = makeWire(new THREE.OctahedronGeometry(0.8), COLORS.cyan, 0.3);
  const glow = makeGlow(4.5, 'rgba(108,92,231,0.22)');
  glow.position.z = -0.6;

  const rings = [
    makeRing(2.3, COLORS.violet, { tube: 0.005, tilt: { x: 1.5, y: 0.1 }, opacity: 0.35 }),
    makeRing(3.0, COLORS.cyan, { tube: 0.004, tilt: { x: -0.6, y: 0.9, z: 0.4 }, opacity: 0.28 }),
  ];

  const dust = makePoints({
    count: Math.round(450 * pf),
    radius: 8,
    size: 0.02,
    color: 0xa79fd0,
    opacity: 0.5,
  });

  group.add(core, inner, glow, ...rings, dust);
  group.position.set(2.2, 0, -1.2);

  const mouse = { x: 0, y: 0 };

  return {
    name: 'about',
    group,
    update(state) {
      const t = state.t;
      mouse.x += (state.mouse.x - mouse.x) * damp(state.dt, 2);
      mouse.y += (state.mouse.y - mouse.y) * damp(state.dt, 2);

      core.rotation.x = t * 0.14 + mouse.y * 0.1;
      core.rotation.y = t * 0.18 + mouse.x * 0.2;
      inner.rotation.y = -t * 0.28;
      rings[0].rotation.z = t * 0.08;
      rings[1].rotation.z = -t * 0.06;
      dust.rotation.y = t * 0.015;

      const sc = state.scrollLocal;
      group.position.y = -sc * 1.4;
      group.scale.setScalar(1 - sc * 0.12);
    },
    cameraPose(state) {
      const sc = state.scrollLocal;
      return {
        pos: [mouse.x * 0.7 - 0.4, mouse.y * 0.3 - sc * 0.6, 7.8 + sc * 2],
        target: [1.6, 0, 0],
      };
    },
  };
}
