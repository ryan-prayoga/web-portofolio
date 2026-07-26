import { mount, tick, unmount } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroCanvas from '../../src/lib/components/hero/HeroCanvas.svelte';

vi.mock('../../src/lib/components/three/ArchipelagoScene.svelte', async () => {
  const { default: PausedScene } = await import('../fixtures/PausedScene.svelte');
  return { default: PausedScene };
});

let reduced = false;
const motionListeners = new Set<() => void>();

vi.mock('../../src/lib/stores/motion.svelte', () => ({
  motionFlags: {
    coarse: false,
    get reduced() {
      return reduced;
    },
    init() {
      return () => {};
    },
    probeWebgl: () => true,
    subscribe(listener: () => void) {
      motionListeners.add(listener);
      return () => motionListeners.delete(listener);
    },
  },
}));

type ObserverEntry = { readonly isIntersecting: boolean };
type ObserverCallback = (entries: readonly ObserverEntry[]) => void;

class IntersectionObserverHarness {
  static instances: IntersectionObserverHarness[] = [];

  readonly disconnect = vi.fn();
  readonly observe = vi.fn();

  constructor(private readonly callback: ObserverCallback) {
    IntersectionObserverHarness.instances.push(this);
  }

  emit(isIntersecting: boolean): void {
    this.callback([{ isIntersecting }]);
  }
}

describe('HeroCanvas visibility lifecycle', () => {
  beforeEach(() => {
    reduced = false;
    motionListeners.clear();
    IntersectionObserverHarness.instances.length = 0;
    vi.stubGlobal('IntersectionObserver', IntersectionObserverHarness);
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        addEventListener: vi.fn(),
        matches: false,
        media: query,
        removeEventListener: vi.fn(),
      })),
    );
    vi.stubGlobal(
      'requestIdleCallback',
      vi.fn((callback: IdleRequestCallback) => {
        callback({ didTimeout: false, timeRemaining: () => 50 });
        return 1;
      }),
    );
    vi.stubGlobal('cancelIdleCallback', vi.fn());
  });

  it('cancels pending idle scene loading when reduced motion turns on', async () => {
    // Given
    let idleCallback: IdleRequestCallback | undefined;
    const cancelIdle = vi.fn();
    vi.stubGlobal(
      'requestIdleCallback',
      vi.fn((callback: IdleRequestCallback) => {
        idleCallback = callback;
        return 9;
      }),
    );
    vi.stubGlobal('cancelIdleCallback', cancelIdle);
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await tick();

    // When
    reduced = true;
    for (const listener of motionListeners) listener();
    await tick();
    idleCallback?.({ didTimeout: false, timeRemaining: () => 50 });
    await tick();

    // Then
    expect(cancelIdle).toHaveBeenCalledOnce();
    expect(target.querySelector('[data-testid="scene-paused"]')).toBeNull();
    await unmount(component);
  });

  afterEach(() => {
    motionListeners.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    document.body.replaceChildren();
  });

  it('resumes the intersecting scene when document visibility returns', async () => {
    // Given
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await vi.waitFor(() => {
      expect(target.querySelector('[data-testid="scene-paused"]')).not.toBeNull();
    });
    const observer = IntersectionObserverHarness.instances[0];
    expect(observer).toBeDefined();

    // When
    observer?.emit(true);
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
    await tick();

    // Then
    expect(target.querySelector('[data-testid="scene-paused"]')?.textContent).toBe('false');
    await unmount(component);
  });

  it('keeps the scene paused when visibility returns while the hero remains offscreen', async () => {
    // Given
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await vi.waitFor(() => {
      expect(target.querySelector('[data-testid="scene-paused"]')).not.toBeNull();
    });
    const observer = IntersectionObserverHarness.instances[0];

    // When
    observer?.emit(true);
    await tick();
    const visibleIntersecting = target.querySelector('[data-testid="scene-paused"]')?.textContent;
    observer?.emit(false);
    await tick();
    const visibleOffscreen = target.querySelector('[data-testid="scene-paused"]')?.textContent;
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
    await tick();
    const hiddenOffscreen = target.querySelector('[data-testid="scene-paused"]')?.textContent;
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
    await tick();
    const restoredOffscreen = target.querySelector('[data-testid="scene-paused"]')?.textContent;
    observer?.emit(true);
    await tick();
    const reentered = target.querySelector('[data-testid="scene-paused"]')?.textContent;

    // Then
    expect([visibleIntersecting, visibleOffscreen, hiddenOffscreen, restoredOffscreen, reentered]).toEqual([
      'false',
      'true',
      'true',
      'true',
      'false',
    ]);
    await unmount(component);
  });

  it('initializes from document.hidden and cleans listener and observer exactly once', async () => {
    // Given
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    const removeListener = vi.spyOn(document, 'removeEventListener');
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await vi.waitFor(() => {
      expect(target.querySelector('[data-testid="scene-paused"]')?.textContent).toBe('true');
    });
    const observer = IntersectionObserverHarness.instances[0];

    // When
    await unmount(component);

    // Then
    expect(observer?.disconnect).toHaveBeenCalledOnce();
    expect(removeListener.mock.calls.filter(([type]) => type === 'visibilitychange')).toHaveLength(1);
  });

  it('cleans every observer and visibility listener across repeated mount cycles', async () => {
    // Given
    const removeListener = vi.spyOn(document, 'removeEventListener');

    // When
    for (let cycle = 0; cycle < 3; cycle += 1) {
      const target = document.body.appendChild(document.createElement('div'));
      const component = mount(HeroCanvas, { target });
      await vi.waitFor(() => {
        expect(IntersectionObserverHarness.instances).toHaveLength(cycle + 1);
      });
      await unmount(component);
      target.remove();
    }

    // Then
    expect(IntersectionObserverHarness.instances.every((observer) => observer.disconnect.mock.calls.length === 1)).toBe(
      true,
    );
    expect(removeListener.mock.calls.filter(([type]) => type === 'visibilitychange')).toHaveLength(3);
  });

  it('keeps the poster active until the scene reports ready', async () => {
    // Given
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await vi.waitFor(() => expect(target.querySelector('[data-testid="scene-ready"]')).not.toBeNull());

    // When
    const before = target.querySelector('.canvas-wrap')?.classList.contains('ready');
    target.querySelector<HTMLButtonElement>('[data-testid="scene-ready"]')?.click();
    await tick();

    // Then
    expect(before).toBe(false);
    expect(target.querySelector('.canvas-wrap')?.classList.contains('ready')).toBe(true);
    await unmount(component);
  });

  it('retains the poster when the scene reports error', async () => {
    // Given
    const target = document.body.appendChild(document.createElement('div'));
    const component = mount(HeroCanvas, { target });
    await vi.waitFor(() => expect(target.querySelector('[data-testid="scene-error"]')).not.toBeNull());

    // When
    target.querySelector<HTMLButtonElement>('[data-testid="scene-error"]')?.click();
    await tick();

    // Then
    expect(target.querySelector('.canvas-wrap')?.classList.contains('ready')).toBe(false);
    await unmount(component);
  });
});
