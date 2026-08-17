import * as THREE from 'three';
import { store } from '../../core/store';
import createParticleSphere from './particles';
import createNeuralNet from './neural';
import createCodeSpace from './code';
import createArchitecture from './architecture';

/**
 * LAB SCENE — conteneur des 4 expériences 3D manipulables.
 * L'onglet actif est stocké dans `store.labTab`. L'UI émet 'lab:tab'.
 */
export default function createLabScene() {
  const group = new THREE.Group();

  const experiments = [createParticleSphere(), createNeuralNet(), createCodeSpace(), createArchitecture()];
  experiments.forEach((e) => {
    e.group.visible = false;
    group.add(e.group);
  });

  let active = experiments[0];
  active.group.visible = true;

  function selectTab(i) {
    const next = experiments[i];
    if (next === active) return;
    active.group.visible = false;
    if (active.reset) active.reset();
    active = next;
    active.group.visible = true;
    store.labTab = i;
  }

  store.on('lab:tab', (i) => selectTab(i));

  return {
    name: 'lab',
    group,
    mount() {},
    setTab: selectTab,
    get activeExperiment() {
      return active;
    },
    pointerMove(ndc, raycaster, camera) {
      if (active.pointerMove) active.pointerMove(ndc, raycaster, camera);
    },
    pointerDown(ndc, raycaster, camera) {
      if (active.pointerDown) active.pointerDown(ndc, raycaster, camera);
    },
    pointerUp() {
      if (active.pointerUp) active.pointerUp();
    },
    update(state) {
      if (active.update) active.update(state);
    },
    cameraPose(state) {
      const m = state.mouse;
      const sc = state.scrollLocal;
      const zoom = state.viewport.w < 640 ? 8.8 : 8.0;
      return {
        pos: [m.x * 0.5, m.y * 0.35 - sc * 0.8, zoom + sc * 1.6],
        target: [m.x * 0.15, m.y * 0.1, 0],
      };
    },
  };
}
