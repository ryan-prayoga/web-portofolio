import { beforeEach, describe, expect, it, vi } from 'vitest';

const { destroy, on, raf, tickerAdd, tickerRemove } = vi.hoisted(() => ({
  destroy: vi.fn(),
  on: vi.fn(),
  raf: vi.fn(),
  tickerAdd: vi.fn(),
  tickerRemove: vi.fn(),
}));

vi.mock('lenis', () => ({
  default: class LenisHarness {
    readonly destroy = destroy;
    readonly on = on;
    readonly raf = raf;
  },
}));

vi.mock('../../src/lib/motion/gsap', () => ({
  gsap: {
    ticker: {
      add: tickerAdd,
      lagSmoothing: vi.fn(),
      remove: tickerRemove,
    },
  },
  ScrollTrigger: { update: vi.fn() },
}));

import { createLenis } from '../../src/lib/motion/lenis';

describe('Lenis lifecycle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('registers one ticker and destroys it exactly once', () => {
    // Given
    const lifecycle = createLenis();

    // When
    lifecycle.destroy();
    lifecycle.destroy();

    // Then
    expect(tickerAdd).toHaveBeenCalledOnce();
    expect(tickerRemove).toHaveBeenCalledOnce();
    expect(destroy).toHaveBeenCalledOnce();
  });
});
