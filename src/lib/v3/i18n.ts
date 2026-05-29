import { writable, derived } from 'svelte/store';
import { translations, type Locale, type Translations } from './translations';

export const locale = writable<Locale>('id');

export const t = derived(locale, ($locale): Translations => translations[$locale]);

export function cycleLocale(current: Locale): Locale {
  const order: Locale[] = ['id', 'en', 'fr'];
  const idx = order.indexOf(current);
  return order[(idx + 1) % order.length];
}
