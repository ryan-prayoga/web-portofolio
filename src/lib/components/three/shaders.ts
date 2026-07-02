// Shader point cloud kepulauan — glow di-fake di fragment (tanpa postprocessing).

export const archipelagoVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aBright;
  uniform float uTime;
  uniform float uSize;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.7 + 0.3 * sin(uTime * (0.5 + aSeed * 1.6) + aSeed * 43.0);
    vAlpha = aBright * twinkle;
    gl_PointSize = uSize * (0.8 + aSeed * 0.7) * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const archipelagoFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float disc = smoothstep(0.5, 0.06, d);
    gl_FragColor = vec4(uColor, disc * vAlpha);
  }
`;

export const beaconVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aScale;
  uniform float uTime;
  varying float vPulse;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vPulse = 0.5 + 0.5 * sin(uTime * 1.8 + aPhase);
    gl_PointSize = aScale * (1.0 + vPulse * 0.35) * (140.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const beaconFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vPulse;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float core = smoothstep(0.16, 0.02, d);
    float halo = smoothstep(0.5, 0.1, d) * (0.35 + vPulse * 0.4);
    float ring = smoothstep(0.03, 0.0, abs(d - (0.18 + vPulse * 0.24))) * (1.0 - vPulse) * 0.6;
    float a = min(core + halo + ring, 1.0);
    gl_FragColor = vec4(uColor, a);
  }
`;
