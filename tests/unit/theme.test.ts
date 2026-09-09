import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStoredTheme, getResolvedTheme, setTheme, toggleTheme, withThemeTransition } from '$lib/theme';

describe('theme store & transitions', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    delete document.documentElement.dataset.themeTransition;
  });

  it('defaults to system theme when localStorage is empty', () => {
    expect(getStoredTheme()).toBe('system');
  });

  it('sets and retrieves explicit light and dark themes', () => {
    setTheme('dark');
    expect(getStoredTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    setTheme('light');
    expect(getStoredTheme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    setTheme('system');
    expect(getStoredTheme()).toBe('system');
  });

  it('toggles theme between light and dark', () => {
    setTheme('light');
    expect(getResolvedTheme()).toBe('light');

    toggleTheme();
    expect(getResolvedTheme()).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    toggleTheme();
    expect(getResolvedTheme()).toBe('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('executes callback directly when startViewTransition is unsupported', () => {
    const callback = vi.fn();
    withThemeTransition(callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('uses startViewTransition when available', async () => {
    let finishedResolver: () => void = () => {};
    const finishedPromise = new Promise<void>((resolve) => {
      finishedResolver = resolve;
    });

    const mockTransition: Partial<ViewTransition> & { finished: Promise<void> } = {
      finished: finishedPromise,
      ready: Promise.resolve(),
      updateCallbackDone: Promise.resolve(),
      skipTransition: vi.fn(),
    };

    const originalStartViewTransition = document.startViewTransition;
    const mockStartViewTransition = vi.fn((cb?: ViewTransitionUpdateCallback | StartViewTransitionOptions) => {
      if (typeof cb === 'function') cb();
      return mockTransition as ViewTransition;
    });

    document.startViewTransition = mockStartViewTransition;

    const callback = vi.fn();
    withThemeTransition(callback);

    expect(mockStartViewTransition).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(document.documentElement.dataset.themeTransition).toBe('true');

    finishedResolver();
    await finishedPromise;
    expect(document.documentElement.dataset.themeTransition).toBeUndefined();

    document.startViewTransition = originalStartViewTransition;
  });
});
