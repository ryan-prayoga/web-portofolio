// Flag kemampuan device — lazy init di akses pertama (client only).
// Catatan urutan mount Svelte: onMount anak jalan sebelum layout,
// jadi getter tidak boleh bergantung pada init() eksplisit dari layout.
let reduced = $state(false);
let coarse = $state(false);
let webgl = $state<boolean | null>(null);
let initialized = false;

function ensureInit() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  coarse = window.matchMedia('(pointer: coarse)').matches;
}

export const motionFlags = {
  get reduced() {
    ensureInit();
    return reduced;
  },
  get coarse() {
    ensureInit();
    return coarse;
  },
  /** null = belum diprobe */
  get webgl() {
    return webgl;
  },
  init() {
    ensureInit();
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
