/* ============================================================================
   WORLD 3D
   Un seul renderer WebGL, une seule scène, une seule caméra.
   Le `Director` pilote les scènes par section et interpole la caméra entre
   elles → sentiment de continuité / voyage caméra pendant le scroll.
   ============================================================================ */

import * as THREE from 'three';
import { store, resizeViewport } from './store';
import { damp, clamp } from './utils';

class World {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !store.features.lowTier,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(store.features.pixelRatio);
    this.renderer.setSize(store.viewport.w, store.viewport.h, false);
    this.renderer.outputColorSpace = 'srgb';
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06060e, 0.035);

    this.camera = new THREE.PerspectiveCamera(55, store.viewport.aspect, 0.1, 120);
    this.camera.position.set(0, 0, 8);

    this.raycaster = new THREE.Raycaster();
    this.pickables = [];

    this.scenes = new Map(); // name -> scene
    this.activeScene = null;
    this._poseTarget = null;

    resizeViewport();
    window.addEventListener('resize', this._onResize, { passive: true });
  }

  _onResize = () => {
    resizeViewport();
    this.renderer.setSize(store.viewport.w, store.viewport.h, false);
    this.camera.aspect = store.viewport.aspect;
    this.camera.updateProjectionMatrix();
    store.emit('resize');
  };

  /** Enregistre une scène (nom == id de la section). */
  addScene(scene) {
    this.scenes.set(scene.name, scene);
    this.scene.add(scene.group);
    scene.group.visible = false;
    if (scene.mount) scene.mount();
  }

  /** Remplace une scène (ex: rebuild des étiquettes skills après changement de langue). */
  replaceScene(scene) {
    const old = this.scenes.get(scene.name);
    if (old) {
      this.scene.remove(old.group);
      if (old.dispose) old.dispose();
      if (this.activeScene === old) this.activeScene = null;
    }
    this.addScene(scene);
    if (this.activeName === scene.name) {
      this.activeScene = this.scenes.get(scene.name);
      if (this.activeScene) this.activeScene.group.visible = true;
    }
  }

  /** Retourne la scène active de la section `name`. */
  scene(name) {
    return this.scenes.get(name);
  }

  _active = (sections, centerY) => {
    let best = sections[0];
    let bestD = Infinity;
    for (const sec of sections) {
      const d = Math.abs(sec.center - centerY);
      if (d < bestD) {
        bestD = d;
        best = sec;
      }
    }
    return best;
  };

  /** Interpolation caméra vers la pose voulue par la scène active. */
  _cameraTo(pose, dt) {
    const k = damp(dt, 2.6);
    this.camera.position.x += (pose.pos[0] - this.camera.position.x) * k;
    this.camera.position.y += (pose.pos[1] - this.camera.position.y) * k;
    this.camera.position.z += (pose.pos[2] - this.camera.position.z) * k;
    const t = this._lookTarget;
    if (!t) return;
    t.x += (pose.target[0] - t.x) * k;
    t.y += (pose.target[1] - t.y) * k;
    t.z += (pose.target[2] - t.z) * k;
    this.camera.lookAt(t);
  }

  _lookTarget = new THREE.Vector3(0, 0, 0);

  /** Boucle de frame : director + rendu. */
  update(state) {
    const s = store;
    const centerY = s.scroll.y + s.viewport.h * 0.5;
    const active = this._active(s.sections, centerY);

    if (active && active.name !== this.activeName) {
      this.activeName = active.name;
      store.activeSection = active.name;
      store.emit('section:change', active.name);
      if (this.activeScene) this.activeScene.group.visible = false;
      this.activeScene = this.scenes.get(active.name);
      if (this.activeScene) this.activeScene.group.visible = true;
    }

    const scene = this.activeScene;
    if (!scene) return;

    // progression locale de la scène dans sa section
    const sec = s.sections.find((x) => x.name === scene.name);
    if (sec) {
      const local = clamp((centerY - sec.top) / (sec.height || 1), 0, 1);
      state.scrollLocal = local;
    }

    scene.update(state);

    const pose = scene.cameraPose(state);
    if (pose) this._cameraTo(pose, state.dt);

    this.renderer.render(this.scene, this.camera);
  }

  /** Raycast : délègue à la scène active. */
  onPointerMove(ndc) {
    if (this.activeScene && this.activeScene.pointerMove) this.activeScene.pointerMove(ndc, this.raycaster, this.camera);
  }
  onPointerDown(ndc) {
    if (this.activeScene && this.activeScene.pointerDown) this.activeScene.pointerDown(ndc, this.raycaster, this.camera);
  }
  onPointerUp() {
    if (this.activeScene && this.activeScene.pointerUp) this.activeScene.pointerUp();
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    this.renderer.dispose();
  }
}

export default World;
