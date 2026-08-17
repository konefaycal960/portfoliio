import * as THREE from 'three';
import { store } from '../core/store';
import { rand, damp } from '../core/utils';
import { COLORS, makePoints, makeWire, makeRing, makeGlow } from './_shared';

/**
 * HERO — "univers du développeur" : noyau géométrique, anneaux orbitaux,
 * blocs de code, particules. Réagit à la souris (parallaxe + rotation) et
 * s'éloigne au scroll.
 */
export default function createHeroScene() {
  const group = new THREE.Group();
  const pf = store.features.particleFactor;
  const isMobile = store.features.isMobile;

  const core = makeWire(new THREE.OctahedronGeometry(1.15), COLORS.gold, 0.6);
  const inner = makeWire(new THREE.IcosahedronGeometry(0.55, 1), COLORS.cyan, 0.55);
  const nucleus = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 20, 20),
    new THREE.MeshBasicMaterial({ color: COLORS.gold })
  );

  const rings = [
    makeRing(2.1, COLORS.violet, { tube: 0.006, tilt: { x: 1.25, y: 0.2, z: 0 }, opacity: 0.55 }),
    makeRing(2.5, COLORS.cyan, { tube: 0.005, tilt: { x: -0.9, y: 0.6, z: 0.3 }, opacity: 0.45 }),
    makeRing(1.65, COLORS.coral, { tube: 0.006, tilt: { x: 0.4, y: -0.5, z: 0.7 }, opacity: 0.45 }),
    makeRing(3.0, COLORS.gold, { tube: 0.004, tilt: { x: 0.9, y: 1.15, z: 0.4 }, opacity: 0.28 }),
  ];

  const coreGlow = makeGlow(isMobile ? 3.5 : 4.6, 'rgba(108,92,231,0.42)');
  coreGlow.position.z = -0.5;
  const halo = makeGlow(isMobile ? 5 : 7, 'rgba(34,211,238,0.10)');
  halo.position.z = -1;

  // Satellites en orbite autour du noyau
  const satellites = [];
  for (let i = 0; i < (isMobile ? 4 : 6); i++) {
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(i % 2 ? 0.07 : 0.09, 12, 12),
      new THREE.MeshBasicMaterial({ color: i % 2 ? COLORS.cyan : COLORS.coral })
    );
    sat.userData = { angle: rand(0, Math.PI * 2), radius: rand(2.2, 3.1), speed: rand(0.35, 0.75), y: rand(-0.7, 0.7), phase: rand(0, Math.PI * 2) };
    group.add(sat);
    satellites.push(sat);
  }

  // Petits blocs de code flottants
  const codeCubes = [];
  const cubeColors = [COLORS.cyan, COLORS.gold, COLORS.coral, COLORS.violet];
  for (let i = 0; i < (isMobile ? 4 : 8); i++) {
    const s = rand(0.14, 0.3);
    const mat = new THREE.MeshBasicMaterial({
      color: cubeColors[i % cubeColors.length],
      transparent: true,
      opacity: 0.85,
      wireframe: i % 3 === 0,
    });
    const cube = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), mat);
    const phi = (i / (isMobile ? 4 : 8)) * Math.PI * 2;
    const rad = rand(1.5, 3);
    cube.position.set(Math.cos(phi) * rad, rand(-1.8, 1.8), Math.sin(phi) * rad - 0.5);
    cube.userData = { speed: rand(0.4, 1.2), phase: rand(0, Math.PI * 2), base: cube.position.clone() };
    group.add(cube);
    codeCubes.push(cube);
  }

  // Particules
  const dust = makePoints({
    count: Math.round((isMobile ? 300 : 700) * pf),
    radius: 7,
    size: isMobile ? 0.02 : 0.025,
    color: 0x9f97ff,
    opacity: 0.6,
  });
  const spark = makePoints({
    count: Math.round(120 * pf),
    radius: 3.2,
    size: 0.03,
    color: 0x22d3ee,
    opacity: 0.9,
  });

  group.add(core, inner, nucleus, ...rings, coreGlow, halo, dust, spark, ...codeCubes);

  // Grille au sol
  const grid = new THREE.GridHelper(16, 20, 0x3a3599, 0x241f63);
  grid.material.transparent = true;
  grid.material.opacity = 0.22;
  grid.position.y = -3.1;
  group.add(grid);

  const mouse = { x: 0, y: 0 };

  return {
    name: 'hero',
    group,
    mount() {
      // rien
    },
    update(state) {
      const t = state.t;
      mouse.x += (state.mouse.x - mouse.x) * damp(state.dt, 2.4);
      mouse.y += (state.mouse.y - mouse.y) * damp(state.dt, 2.4);

      core.rotation.x = t * 0.28 + mouse.y * 0.25;
      core.rotation.y = t * 0.34 + mouse.x * 0.4;
      inner.rotation.x = -t * 0.4;
      inner.rotation.y = t * 0.5 - mouse.x * 0.3;
      nucleus.scale.setScalar(1 + Math.sin(t * 2.2) * 0.15);

      rings[0].rotation.z = t * 0.12;
      rings[1].rotation.z = -t * 0.09;
      rings[2].rotation.z = t * 0.15;
      rings[3].rotation.z = -t * 0.06;

      for (const sat of satellites) {
        const u = sat.userData;
        u.angle += state.dt * u.speed;
        sat.position.set(Math.cos(u.angle) * u.radius, u.y + Math.sin(t * 0.6 + u.phase) * 0.3, Math.sin(u.angle) * u.radius);
        sat.scale.setScalar(1 + Math.sin(t * 2 + u.phase) * 0.2);
      }

      for (let i = 0; i < codeCubes.length; i++) {
        const c = codeCubes[i];
        c.rotation.x += state.dt * c.userData.speed;
        c.rotation.y += state.dt * c.userData.speed * 0.7;
        c.position.y = c.userData.base.y + Math.sin(t * c.userData.speed + c.userData.phase) * 0.25;
      }

      dust.rotation.y = t * 0.02;
      spark.rotation.y = -t * 0.03;

      // fuite au scroll
      const sc = state.scrollLocal;
      group.position.y = -sc * 2.4;
      group.scale.setScalar(1 - sc * 0.18);
      group.rotation.z = sc * 0.06;
    },
    cameraPose(state) {
      const sc = state.scrollLocal;
      return {
        pos: [mouse.x * 0.9, 0.4 + mouse.y * 0.35 - sc * 0.8, 7.2 + sc * 3],
        target: [mouse.x * 0.35, mouse.y * 0.12, 0],
      };
    },
  };
}
