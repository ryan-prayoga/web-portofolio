import type { Locale } from '$lib/data/uiCopy';
export type { Locale } from '$lib/data/uiCopy';

let current = $state<Locale>('en');

export const localeStore = {
  get value(): Locale {
    return current;
  },
  set(value: Locale) {
    current = value;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
      localStorage.setItem('locale', value);
    }
  },
  /** Restore persisted locale — panggil sekali dari layout onMount. */
  init() {
    const saved = localStorage.getItem('locale');
    if (saved === 'en' || saved === 'id') {
      current = saved;
      document.documentElement.lang = saved;
    }
  },
};
