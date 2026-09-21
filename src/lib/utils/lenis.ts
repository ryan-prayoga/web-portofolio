import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Initialize Lenis smooth scroll for SvelteKit.
 * Automatically respects `prefers-reduced-motion` and handles anchor links.
 */
export function initLenis(): (() => void) | undefined {
  if (typeof window === 'undefined') return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Clean up any existing instance
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.0,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  // Smooth scroll handler for anchor links (e.g. href="#work", href="#top")
  function onAnchorClick(event: MouseEvent) {
    const link = (event.target as HTMLElement)?.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Anchor on same page
    if (href === '#' || href === '#top') {
      event.preventDefault();
      lenisInstance?.scrollTo(0, { duration: 1.2 });
      return;
    }

    if (href.startsWith('#')) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        event.preventDefault();
        lenisInstance?.scrollTo(targetElement as HTMLElement, {
          offset: -72, // header height offset
          duration: 1.2,
        });
      }
    }
  }

  document.addEventListener('click', onAnchorClick);

  return () => {
    document.removeEventListener('click', onAnchorClick);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lenisInstance?.destroy();
    lenisInstance = null;
  };
}
