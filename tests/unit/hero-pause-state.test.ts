import { describe, expect, it } from 'vitest';
import { initialHeroPauseState, reduceHeroPauseState } from '../../src/lib/components/hero/heroPauseState';

describe('HeroCanvas pause state', () => {
  it.each([
    { name: 'intersecting and visible', pageHidden: false, offscreen: false, paused: false },
    { name: 'hidden while intersecting', pageHidden: true, offscreen: false, paused: true },
    { name: 'visible while offscreen', pageHidden: false, offscreen: true, paused: true },
  ])('derives paused for $name', ({ pageHidden, offscreen, paused }) => {
    // Given
    const initial = initialHeroPauseState(pageHidden);

    // When
    const state = reduceHeroPauseState(initial, { type: 'intersection-changed', offscreen });

    // Then
    expect(state).toEqual({ pageHidden, offscreen, paused });
  });

  it('resumes after visibility returns while intersecting', () => {
    // Given
    const hidden = reduceHeroPauseState(
      reduceHeroPauseState(initialHeroPauseState(false), { type: 'intersection-changed', offscreen: false }),
      { type: 'visibility-changed', pageHidden: true },
    );

    // When
    const visible = reduceHeroPauseState(hidden, { type: 'visibility-changed', pageHidden: false });

    // Then
    expect(visible.paused).toBe(false);
  });

  it('remains paused after visibility returns while offscreen', () => {
    // Given
    const hiddenOffscreen = reduceHeroPauseState(
      reduceHeroPauseState(initialHeroPauseState(false), { type: 'intersection-changed', offscreen: true }),
      { type: 'visibility-changed', pageHidden: true },
    );

    // When
    const visibleOffscreen = reduceHeroPauseState(hiddenOffscreen, {
      type: 'visibility-changed',
      pageHidden: false,
    });

    // Then
    expect(visibleOffscreen.paused).toBe(true);
  });

  it('resumes after re-entering the viewport', () => {
    // Given
    const offscreen = reduceHeroPauseState(initialHeroPauseState(false), {
      type: 'intersection-changed',
      offscreen: true,
    });

    // When
    const intersecting = reduceHeroPauseState(offscreen, { type: 'intersection-changed', offscreen: false });

    // Then
    expect(intersecting.paused).toBe(false);
  });

  it('initializes hidden documents paused and offscreen conservatively', () => {
    // Given / When
    const state = initialHeroPauseState(true);

    // Then
    expect(state).toEqual({ pageHidden: true, offscreen: true, paused: true });
  });
});
