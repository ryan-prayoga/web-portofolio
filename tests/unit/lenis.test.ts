import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { getLenis, initLenis } from '../../src/lib/utils/lenis';

describe('lenis utility', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns null initially for getLenis', () => {
    expect(getLenis()).toBeNull();
  });

  it('respects prefers-reduced-motion', () => {
    const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    vi.stubGlobal('matchMedia', matchMediaMock);
    const cleanup = initLenis();
    expect(cleanup).toBeUndefined();
    expect(getLenis()).toBeNull();
  });
});
