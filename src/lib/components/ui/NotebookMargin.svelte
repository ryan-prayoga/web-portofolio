<script lang="ts">
  import { onMount } from 'svelte';
  import { getLenis } from '$lib/utils/lenis';

  let scrollProgress = $state(0);
  let isMounted = $state(false);

  onMount(() => {
    isMounted = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      scrollProgress = 100;
      return;
    }

    const updateProgress = () => {
      const scrollingEl = document.scrollingElement || document.documentElement;
      const scrollHeight = Math.max(
        scrollingEl.scrollHeight,
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
        document.documentElement.offsetHeight,
      );

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const maxScroll = Math.max(1, scrollHeight - viewportHeight);
      const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop || 0);

      scrollProgress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
    };

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      ro = new ResizeObserver(() => {
        updateProgress();
      });
      ro.observe(document.body);
    }

    let unbindLenis: (() => void) | undefined;
    const attachLenis = () => {
      const lenis = getLenis();
      if (lenis) {
        unbindLenis = lenis.on('scroll', updateProgress);
        return true;
      }
      return false;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    if (!attachLenis()) {
      const timer = setTimeout(() => {
        attachLenis();
        updateProgress();
      }, 100);
      return () => {
        clearTimeout(timer);
        ro?.disconnect();
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
        unbindLenis?.();
      };
    }

    return () => {
      ro?.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      unbindLenis?.();
    };
  });
</script>

<!--
  Notebook Margin: EXACTLY ONE SINGLE hand-drawn line.
  Positioned safely away from card borders (no overlapping/mepet).
  Synchronized directly with scroll for buttery 60/120fps motion.
-->
<div
  class="notebook-margin pointer-events-none fixed top-18 z-20 select-none transition-opacity duration-500 {isMounted
    ? 'opacity-100'
    : 'opacity-0'}"
  style="left: max(10px, calc((100vw - 1024px) / 2 + 8px)); transform: translateX(-50%);"
  aria-hidden="true"
>
  <svg
    class="w-4 h-full overflow-visible block"
    viewBox="0 0 16 1000"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Single clean organic hand-drawn margin line (1000 unit stroke with 2000 gap prevents wrap-around artifacts in WebKit/Blink) -->
    <path
      d="M 8 0
         C 6 60, 10 120, 7 180
         C 10 240, 6 300, 9 360
         C 7 420, 10 480, 7 540
         C 10 600, 6 660, 9 720
         C 7 780, 10 840, 8 900
         C 6 950, 9 980, 8 1000"
      stroke="var(--color-accent)"
      stroke-width="2"
      stroke-linecap="round"
      pathLength="1000"
      class="opacity-80"
      style="stroke-dasharray: 1000 2000; stroke-dashoffset: {Math.max(0, 1000 - (scrollProgress / 100) * 1000)};"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</div>

<style>
  .notebook-margin {
    bottom: max(0.5rem, env(safe-area-inset-bottom, 0.5rem));
  }

  @media (min-width: 640px) {
    .notebook-margin {
      bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem));
    }
  }
</style>
