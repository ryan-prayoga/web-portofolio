import { describe, expect, it, vi } from 'vitest';
import { createMotionFlags } from '../../src/lib/stores/motion.svelte';

class MediaQueryChangeEvent extends Event implements MediaQueryListEvent {
  readonly matches: boolean;
  readonly media: string;

  constructor(matches: boolean, media: string) {
    super('change');
    this.matches = matches;
    this.media = media;
  }
}

class MediaQueryHarness {
  readonly media: string;
  matches: boolean;
  readonly listeners = new Set<(event: MediaQueryListEvent) => void>();

  constructor(media: string, matches: boolean) {
    this.media = media;
    this.matches = matches;
  }

  addEventListener(_type: 'change', listener: (event: MediaQueryListEvent) => void): void {
    this.listeners.add(listener);
  }

  removeEventListener(_type: 'change', listener: (event: MediaQueryListEvent) => void): void {
    this.listeners.delete(listener);
  }

  emit(matches: boolean): void {
    this.matches = matches;
    const event = new MediaQueryChangeEvent(matches, this.media);
    for (const listener of this.listeners) listener(event);
  }
}

function createHarness(reduced = false, coarse = false) {
  const reducedQuery = new MediaQueryHarness('(prefers-reduced-motion: reduce)', reduced);
  const coarseQuery = new MediaQueryHarness('(pointer: coarse)', coarse);
  const matchMedia = vi.fn((query: string) => (query.includes('reduced-motion') ? reducedQuery : coarseQuery));
  return { coarseQuery, matchMedia, reducedQuery };
}

describe('motion flags lifecycle', () => {
  it('returns deterministic defaults without reading media queries during SSR', () => {
    // Given
    const harness = createHarness(true, true);
    vi.stubGlobal('window', undefined);
    const flags = createMotionFlags(harness.matchMedia);

    // When
    const initial = { reduced: flags.reduced, coarse: flags.coarse };

    // Then
    expect(initial).toEqual({ reduced: false, coarse: false });
    expect(harness.matchMedia).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it('snapshots both client preferences before init and reuses them for listener setup', () => {
    // Given
    const harness = createHarness(true, true);
    const flags = createMotionFlags(harness.matchMedia);

    // When
    const initial = { reduced: flags.reduced, coarse: flags.coarse };
    const release = flags.init();

    // Then
    expect(initial).toEqual({ reduced: true, coarse: true });
    expect(harness.matchMedia).toHaveBeenCalledTimes(2);
    expect(harness.reducedQuery.listeners.size).toBe(1);
    expect(harness.coarseQuery.listeners.size).toBe(1);
    release();
  });

  it('reads both initial media-query states', () => {
    // Given
    const harness = createHarness(true, true);
    const flags = createMotionFlags(harness.matchMedia);

    // When
    const release = flags.init();

    // Then
    expect({ reduced: flags.reduced, coarse: flags.coarse }).toEqual({ reduced: true, coarse: true });
    release();
  });

  it('propagates reduced-motion and coarse-pointer changes', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);
    const release = flags.init();

    // When
    harness.reducedQuery.emit(true);
    harness.coarseQuery.emit(true);

    // Then
    expect({ reduced: flags.reduced, coarse: flags.coarse }).toEqual({ reduced: true, coarse: true });
    release();
  });

  it('shares listeners across clients and releases them after the final lifecycle', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);

    // When
    const releaseFirst = flags.init();
    const releaseSecond = flags.init();

    // Then
    expect(harness.reducedQuery.listeners.size).toBe(1);
    expect(harness.coarseQuery.listeners.size).toBe(1);
    releaseFirst();
    expect(harness.reducedQuery.listeners.size).toBe(1);
    releaseFirst();
    releaseSecond();
    expect(harness.reducedQuery.listeners.size).toBe(0);
    expect(harness.coarseQuery.listeners.size).toBe(0);
  });

  it('does not duplicate callbacks after repeated complete mount cycles', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);

    // When
    for (let cycle = 0; cycle < 3; cycle += 1) {
      const release = flags.init();
      harness.coarseQuery.emit(cycle % 2 === 0);
      release();
    }

    // Then
    expect(harness.coarseQuery.listeners.size).toBe(0);
    expect(harness.matchMedia).toHaveBeenCalledTimes(6);
  });

  it('notifies subscribers only for changed values and stops after release', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);
    const listener = vi.fn();
    const releaseLifecycle = flags.init();
    const releaseSubscription = flags.subscribe(listener);

    // When
    harness.reducedQuery.emit(false);
    harness.reducedQuery.emit(true);
    harness.coarseQuery.emit(false);
    harness.coarseQuery.emit(true);
    releaseSubscription();
    harness.reducedQuery.emit(false);

    // Then
    expect(listener).toHaveBeenCalledTimes(2);
    releaseLifecycle();
  });

  it('probes WebGL with a fallback context and caches the result', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);
    const getContext = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(Object.create(null));

    // When
    const firstResult = flags.probeWebgl();
    const cachedResult = flags.probeWebgl();

    // Then
    expect(firstResult).toBe(true);
    expect(cachedResult).toBe(true);
    expect(flags.webgl).toBe(true);
    expect(getContext).toHaveBeenCalledTimes(2);
    getContext.mockRestore();
  });

  it('reports unavailable WebGL when canvas probing throws an Error', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw new Error('canvas unavailable');
    });

    // When
    const result = flags.probeWebgl();

    // Then
    expect(result).toBe(false);
    expect(flags.webgl).toBe(false);
    getContext.mockRestore();
  });

  it('rethrows unknown canvas failures', () => {
    // Given
    const harness = createHarness();
    const flags = createMotionFlags(harness.matchMedia);
    const unknownFailure = Object.create(null);
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      throw unknownFailure;
    });

    // When / Then
    expect(() => flags.probeWebgl()).toThrow(unknownFailure);
    getContext.mockRestore();
  });
});
