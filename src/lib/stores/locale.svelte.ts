import type { Locale } from '$lib/data/uiCopy';
export type { Locale } from '$lib/data/uiCopy';

const STORAGE_KEY = 'locale';

function readSaved(): Locale | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'id' ? saved : null;
  } catch {
    return null;
  }
}

function mirrorToDocument(value: Locale) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = value;
  document.documentElement.classList.toggle('locale-id', value === 'id');
}

/** Pilihan eksplisit pengunjung; null = belum pernah memilih. */
let chosen = $state<Locale | null>(readSaved());
/** Bahasa bawaan route aktif (lihat defaultLocaleFor). */
let routeDefault = $state<Locale>('en');

export const localeStore = {
  get value(): Locale {
    return chosen ?? routeDefault;
  },
  set(value: Locale) {
    chosen = value;
    mirrorToDocument(value);
    if (typeof document !== 'undefined') localStorage.setItem(STORAGE_KEY, value);
  },
  /**
   * Bahasa bawaan route — dipanggil layout sebelum child dirender (SSR,
   * hidrasi, dan tiap navigasi). Kalah oleh pilihan eksplisit pengunjung.
   */
  setRouteDefault(value: Locale) {
    routeDefault = value;
    if (chosen === null) mirrorToDocument(value);
  },
  /** Restore persisted locale — panggil sekali dari layout onMount. */
  init() {
    const saved = readSaved();
    if (saved) chosen = saved;
    mirrorToDocument(chosen ?? routeDefault);
  },
};
