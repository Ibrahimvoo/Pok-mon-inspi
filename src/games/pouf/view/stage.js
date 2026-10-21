// Renderer, lights, sky and camera rig shared by every course.
import * as THREE from 'three';
import { skyDome } from './world.js';

export function createStage(canvas, { quality = 'high' } = {}) {
  const lowEnd = quality === 'low' || /iPhone|Android/.test(navigator.userAgent);
  const testLow = /[?&]pflow/.test(location.search);   // automated tests on software rendering
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: false });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = !testLow;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 16 / 9, .3, 1500);
  const hemi = new THREE.HemisphereLight('#e6f6ff', '#f2c3a0', 1.55);
  const sun = new THREE.DirectionalLight('#fff4e2', 1.75);
  sun.castShadow = true;
  const sm = lowEnd ? 1024 : 2048;
  sun.shadow.mapSize.set(sm, sm);
  Object.assign(sun.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 140 });
  sun.shadow.bias = -.0006; sun.shadow.normalBias = .04;
  scene.add(hemi, sun, sun.target);
  const sunDir = new THREE.Vector3(.45, .85, .35).normalize();
  let sky = null;

  const stage = {
    renderer, scene, camera, sun, hemi,
    pixelRatio: testLow ? .3 : Math.min(devicePixelRatio || 1, lowEnd ? 1.5 : 2),
    setTheme(theme) {
      if (sky) scene.remove(sky);
      sky = skyDome(theme); scene.add(sky);
      scene.fog = new THREE.Fog(theme.fog, theme.fogNear, theme.fogFar);
      scene.background = new THREE.Color(theme.sky[1]);
    },
    // keep the sun's shadow box centred on what the camera looks at
    focus(x, y, z) {
      sun.position.set(x + sunDir.x * 60, y + sunDir.y * 60, z + sunDir.z * 60);
      sun.target.position.set(x, y, z);
      if (sky) sky.position.set(camera.position.x, 0, camera.position.z);
    },
    resize(w, h) {
      renderer.setPixelRatio(stage.pixelRatio);
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.fov = camera.aspect < 1.2 ? 68 : 55;
      camera.updateProjectionMatrix();
    },
    render() { renderer.render(scene, camera); },
    dispose() {
      scene.traverse(o => { if (o.geometry) o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach(x => { x.map?.dispose(); x.dispose(); }); });
      renderer.dispose();
      renderer.forceContextLoss?.();
    },
  };
  return stage;
}
