import * as THREE from 'three';
import { disposeThree } from './disposer';

// Adaptive particle budget: phones get a lighter field for perf/battery,
// desktops get the full dense sphere. Resolved once at construction.
function resolveParticleCount(): number {
  if (typeof window === 'undefined') return 4000;
  const w = window.innerWidth;
  if (w < 480) return 1500;
  if (w < 768) return 2200;
  return 4000;
}
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

// GLSL: classic 3D simplex noise (Ashima Arts / Ian McEwan, MIT-licensed).
// Compact form. Used to add organic per-vertex displacement so the field
// doesn't feel like a rigid procedural sphere.
const SIMPLEX_GLSL = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const VERTEX_SHADER = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform float uPixelRatio;
uniform float uPointSize;
varying float vDepth;
varying float vNoise;
varying float vTwinkle;

${SIMPLEX_GLSL}

// Cheap deterministic pseudo-random per-particle from its base position.
float hash(vec3 p) {
  return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}

void main() {
  vec3 pos = position;

  // Slow, low-frequency noise = gentle breathing/swirl.
  float n = snoise(pos * 0.9 + vec3(0.0, uTime * 0.18, 0.0));
  vNoise = n;

  // Radial displacement scales with progress so the morph still reads,
  // but particles never sit perfectly on a smooth surface.
  float disp = n * (0.14 + uProgress * 0.22);
  pos += normalize(pos + 0.0001) * disp;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  // Depth (negative z in view space, normalised) drives the fragment gradient.
  vDepth = clamp((-mv.z - 2.0) / 4.0, 0.0, 1.0);

  gl_Position = projectionMatrix * mv;

  // Per-particle twinkle: phase shift via hash, used for alpha only so size
  // stays consistent and the field always reads as a coherent shape. The
  // shimmer comes from opacity, not scale.
  float seed = hash(position);
  float pulse = 0.7 + 0.3 * sin(uTime * 1.6 + seed * 6.2831);
  vTwinkle = pulse;

  // Size attenuation by view-space distance, multiplied by DPR so HiDPI
  // screens don't render tiny dots. Size is steady; only alpha pulses.
  float dist = -mv.z;
  gl_PointSize = uPointSize * uPixelRatio * (1.6 / max(dist, 0.0001));
}
`;

const FRAGMENT_SHADER = /* glsl */ `
uniform vec3 uColorNear;
uniform vec3 uColorFar;
uniform vec3 uColorAccent;
uniform float uOpacity;
varying float vDepth;
varying float vNoise;
varying float vTwinkle;

void main() {
  // Soft round sprite with bright core: distance from point center -> alpha
  // falloff with a sharper inner glow so points read as "stars" not flat dots.
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  float glow = pow(core, 2.2);

  // Three-stop gradient: near (cyan) -> far (violet) -> noise tint (magenta).
  vec3 col = mix(uColorNear, uColorFar, vDepth);
  col = mix(col, uColorAccent, smoothstep(0.2, 0.8, vNoise));

  // Brighten the core; combined with additive blending this gives the field
  // a glowing, atmospheric feel instead of looking like flat dots.
  col += glow * 0.4;

  // Alpha floor: even at twinkle minimum, particles stay visible. Without
  // this floor the sphere visually "deflates" and reads as half-empty.
  gl_FragColor = vec4(col, core * uOpacity * (0.7 + 0.3 * vTwinkle));
}
`;

export class HeroScene {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private points!: THREE.Points;
  private geo!: THREE.BufferGeometry;
  private material!: THREE.ShaderMaterial;
  private morphA: Float32Array;
  private morphB: Float32Array;
  private basePositions: Float32Array;
  private rafId = 0;
  private clock = new THREE.Clock();

  constructor() {
    const count = resolveParticleCount();
    this.morphA = sampleSphere(count, RADIUS);
    this.morphB = sampleTorus(count, RADIUS, RADIUS * 0.45);
    this.basePositions = new Float32Array(this.morphA);
  }

  init(canvas: HTMLCanvasElement) {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(w, h);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    this.camera.position.z = 4;

    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.basePositions, 3));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: dpr },
        uPointSize: { value: 14.0 },
        uColorNear: { value: new THREE.Color(0x22d3ee) }, // cyan-400
        uColorFar: { value: new THREE.Color(0x6366f1) }, // indigo-500
        uColorAccent: { value: new THREE.Color(0xec4899) }, // pink-500
        uOpacity: { value: 1.0 },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(this.geo, this.material);
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
    const dpr = Math.min(window.devicePixelRatio, 2);
    this.material.uniforms.uPixelRatio.value = dpr;
    this.renderer.setPixelRatio(dpr);
  };

  private tick = () => {
    this.rafId = requestAnimationFrame(this.tick);
    const t = this.clock.getElapsedTime();
    this.material.uniforms.uTime.value = t;
    this.points.rotation.y = t * 0.08;
    this.points.rotation.x = Math.sin(t * 0.05) * 0.1;
    this.renderer.render(this.scene, this.camera);
  };

  updateProgress(progress: number) {
    const p = Math.max(0, Math.min(1, progress));
    // Scroll only drives a uniform that adds subtle noise expansion in the
    // vertex shader (a gentle "breathing" as you scroll). We deliberately do
    // NOT morph the geometry to a torus: that collapsed the field into a ring
    // with an empty centre and pushed particles off-screen, which read as the
    // particles "disappearing" on scroll. The sphere stays persistent.
    this.material.uniforms.uProgress.value = p;
  }

  dispose() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.onResize);
    disposeThree(this.scene);
    this.material.dispose();
    this.renderer.dispose();
  }
}
