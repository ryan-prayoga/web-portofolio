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

    const updateFromWindow = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      }
    };

    let unbindLenis: (() => void) | undefined;
    const attachLenis = () => {
      const lenis = getLenis();
      if (lenis) {
        unbindLenis = lenis.on('scroll', (e: { progress: number }) => {
          scrollProgress = Math.min(100, Math.max(0, e.progress * 100));
        });
        return true;
      }
      return false;
    };

    if (!attachLenis()) {
      window.addEventListener('scroll', updateFromWindow, { passive: true });
      updateFromWindow();
      const timer = setTimeout(() => {
        if (attachLenis()) {
          window.removeEventListener('scroll', updateFromWindow);
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', updateFromWindow);
        unbindLenis?.();
      };
    }

    return () => {
      unbindLenis?.();
    };
  });
</script>

<!--
  Notebook Margin: EXACTLY ONE SINGLE hand-drawn line.
  Positioned safely away from card borders (no overlapping/mepet).
  Synchronized directly with Lenis scroll for buttery 60/120fps motion.
-->
<div
  class="pointer-events-none fixed top-20 bottom-8 z-20 select-none transition-opacity duration-500 {isMounted
    ? 'opacity-100'
    : 'opacity-0'}"
  style="left: max(6px, calc((100vw - 1080px) / 2));"
  aria-hidden="true"
>
  <svg
    class="w-3 sm:w-4 h-full overflow-visible block"
    viewBox="0 0 12 1000"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Single clean organic hand-drawn margin line -->
    <path
      d="M 6 0
         C 4 60, 8 120, 5 180
         C 8 240, 4 300, 7 360
         C 5 420, 8 480, 5 540
         C 8 600, 4 660, 7 720
         C 5 780, 8 840, 6 900
         C 4 950, 7 980, 6 1000"
      stroke="var(--color-accent)"
      stroke-width="2"
      stroke-linecap="round"
      pathLength="100"
      class="opacity-80"
      style="stroke-dasharray: 100; stroke-dashoffset: {Math.max(0, 100 - scrollProgress)};"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</div>
