// Flag kemampuan device — diisi sekali di client, aman dibaca dari mana saja.
let reduced = $state(false);
let coarse = $state(false);
let webgl = $state<boolean | null>(null);

export const motionFlags = {
  get reduced() {
    return reduced;
  },
  get coarse() {
    return coarse;
  },
  /** null = belum diprobe */
  get webgl() {
    return webgl;
  },
  init() {
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    coarse = window.matchMedia('(pointer: coarse)').matches;
  },
  probeWebgl(): boolean {
    if (webgl !== null) return webgl;
    try {
      const canvas = document.createElement('canvas');
      webgl = !!(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
    } catch {
      webgl = false;
    }
    return webgl;
  },
};
