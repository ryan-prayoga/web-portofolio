import { beforeEach, describe, expect, it } from 'vitest';
import { localeStore } from '../../src/lib/stores/locale.svelte';

describe('locale store', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
    localeStore.set('en');
    localStorage.clear();
  });

  it('defaults to English so recruiters land on the international copy', () => {
    expect(localeStore.value).toBe('en');
  });

  it('persists the chosen locale and mirrors it onto <html lang> for screen readers', () => {
    localeStore.set('id');

    expect(localeStore.value).toBe('id');
    expect(document.documentElement.lang).toBe('id');
    expect(localStorage.getItem('locale')).toBe('id');
  });

  it('restores a persisted locale on init', () => {
    localStorage.setItem('locale', 'id');

    localeStore.init();

    expect(localeStore.value).toBe('id');
    expect(document.documentElement.lang).toBe('id');
  });

  it('ignores an empty or corrupted persisted value instead of rendering a broken locale', () => {
    for (const corrupted of ['', 'jp', 'null', '{"locale":"id"}']) {
      localeStore.set('en');
      localStorage.setItem('locale', corrupted);

      localeStore.init();

      expect(localeStore.value).toBe('en');
    }
  });

  it('survives a first visit with no persisted locale at all', () => {
    localeStore.set('id');
    localStorage.removeItem('locale');

    localeStore.init();

    expect(localeStore.value).toBe('id');
  });
});
