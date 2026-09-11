import type { Locale } from '$lib/data/uiCopy';
export type { Locale } from '$lib/data/uiCopy';

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('locale');
      if (saved === 'en' || saved === 'id') return saved;
    } catch {
      return 'en';
    }
  }
  return 'en';
}

let current = $state<Locale>(getInitialLocale());

export const localeStore = {
  get value(): Locale {
    return current;
  },
  set(value: Locale) {
    current = value;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
      document.documentElement.classList.toggle('locale-id', value === 'id');
      localStorage.setItem('locale', value);
    }
  },
  /** Restore persisted locale — panggil sekali dari layout onMount. */
  init() {
    const saved = localStorage.getItem('locale');
    if (saved === 'en' || saved === 'id') {
      current = saved;
      document.documentElement.lang = saved;
      document.documentElement.classList.toggle('locale-id', saved === 'id');
    }
  },
};
