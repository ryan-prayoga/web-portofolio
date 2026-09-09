import { flushSync } from 'svelte';

const STORAGE_KEY = 'theme';

export type Theme = 'light' | 'dark' | 'system';

function systemPrefersDark(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function isDarkFor(theme: Theme): boolean {
  return theme === 'system' ? systemPrefersDark() : theme === 'dark';
}

/** Preferensi tersimpan — "system" jika belum pernah diatur secara manual. */
export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage tidak dapat diakses (private browsing) */
  }
  return 'system';
}

/** Tema aktif yang sedang diterapkan ("system" di-resolve ke mode OS). */
export function getResolvedTheme(): 'light' | 'dark' {
  return isDarkFor(getStoredTheme()) ? 'dark' : 'light';
}

function applyClass(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('dark', isDarkFor(theme));
}

type DocWithViewTransition = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

/**
 * Menjalankan perubahan tema dengan animasi View Transition circular reveal
 * persis seperti di kasbadminton.com.
 */
export function withThemeTransition(apply: () => void) {
  if (typeof document === 'undefined') {
    apply();
    return;
  }

  const doc = document as DocWithViewTransition;
  const reduceMotion =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  if (typeof doc.startViewTransition !== 'function' || reduceMotion) {
    apply();
    return;
  }

  document.documentElement.dataset.themeTransition = 'true';
  const vt = doc.startViewTransition(() => flushSync(apply));
  vt.finished.finally(() => {
    delete document.documentElement.dataset.themeTransition;
  });
}

/** Mengatur tema eksplisit dan menyimpannya di localStorage */
export function setTheme(theme: Theme) {
  withThemeTransition(() => applyClass(theme));
  try {
    if (theme === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    /* Simpan ke storage opsional */
  }
}

/** Flip tema antara light dan dark */
export function toggleTheme() {
  setTheme(getResolvedTheme() === 'dark' ? 'light' : 'dark');
}
