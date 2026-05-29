import * as THREE from 'three';
import { disposeThree } from './disposer';

const PARTICLE_COUNT = 4000;
const RADIUS = 1.6;

function sampleSphere(n: number, r: number): Float32Array {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const j = i * 3;
    pos[j] = r * Math.sin(phi) * Math.cos(theta);
    pos[j + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[j + 2] = r * Math.cos(phi);
  }
  return pos;
}

function sampleTorus(n: number, R: number, tube: number): Float32Array {
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random() * 2 * Math.PI;
    const v = Math.random() * 2 * Math.PI;
    const j = i * 3;
    pos[j] = (R + tube * Math.cos(v)) * Math.cos(u);
    pos[j + 1] = (R + tube * Math.cos(v)) * Math.sin(u);
    pos[j + 2] = tube * Math.sin(v);
  }
  return pos;
}

function makeDotTexture(size = 64): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d')!;
  const r = size / 2;
  const g = ctx.createRadialGradient(r, r, 0, r, r, r);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.8)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export class HeroScene {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private points!: THREE.Points;
  private geo!: THREE.BufferGeometry;
  private morphA: Float32Array;
  private morphB: Float32Array;
  private basePositions: Float32Array;
  private rafId = 0;
  private clock = new THREE.Clock();

  constructor() {
    this.morphA = sampleSphere(PARTICLE_COUNT, RADIUS);
    this.morphB = sampleTorus(PARTICLE_COUNT, RADIUS, RADIUS * 0.45);
    this.basePositions = new Float32Array(this.morphA);
  }

  init(canvas: HTMLCanvasElement) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    this.camera.position.z = 4;

    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.basePositions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.035,
      color: new THREE.Color(0x22d3ee),
      map: makeDotTexture(),
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geo, mat);
    this.scene.add(this.points);

    window.addEventListener('resize', this.onResize);
    this.onResize();
    this.tick();
  }

  private onResize = () => {
    const canvas = this.renderer.domElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    this.camera.aspect = w / h;
    // Push camera back on narrow/tall viewports so sphere doesn't clip at top
    this.camera.position.z = Math.max(4, 4 + (1 - w / h) * 1.2);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private tick = () => {
    this.rafId = requestAnimationFrame(this.tick);
    const t = this.clock.getElapsedTime();
    this.points.rotation.y = t * 0.08;
    this.points.rotation.x = Math.sin(t * 0.05) * 0.1;
    this.renderer.render(this.scene, this.camera);
  };

  updateProgress(progress: number) {
    const p = Math.max(0, Math.min(1, progress));
    const pos = this.geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = this.morphA[i] + (this.morphB[i] - this.morphA[i]) * p;
    }
    pos.needsUpdate = true;
  }

  dispose() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    disposeThree(this.scene);
    this.renderer.dispose();
  }
}
