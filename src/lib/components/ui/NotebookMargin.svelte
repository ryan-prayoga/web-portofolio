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
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      } else {
        scrollProgress = 0;
      }
    };

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
        window.removeEventListener('scroll', updateProgress);
        window.removeEventListener('resize', updateProgress);
        unbindLenis?.();
      };
    }

    return () => {
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
  class="pointer-events-none fixed top-20 bottom-8 z-20 select-none transition-opacity duration-500 {isMounted
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
    <!-- Single clean organic hand-drawn margin line -->
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
      pathLength="100"
      class="opacity-80"
      style="stroke-dasharray: 100; stroke-dashoffset: {Math.max(0, 100 - scrollProgress)};"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</div>
