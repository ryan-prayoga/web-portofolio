<script lang="ts">
  import { onMount } from 'svelte';

  let scrollProgress = $state(0);
  let isMounted = $state(false);

  onMount(() => {
    isMounted = true;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      scrollProgress = 100;
      return;
    }

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollProgress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', updateScroll);
    };
  });
</script>

<!--
  Notebook Margin Line with visibly wavy hand-drawn sketch lines.
  Positioned safely below the header (top-20) to prevent any clipping.
  Removed the separate floating circle dot to eliminate any sync mismatch.
-->
<div
  class="pointer-events-none fixed top-20 bottom-8 z-20 select-none transition-opacity duration-500 {isMounted
    ? 'opacity-100'
    : 'opacity-0'}"
  style="left: max(10px, calc((100vw - 1060px) / 2));"
  aria-hidden="true"
>
  <svg
    class="w-7 h-full overflow-visible block"
    viewBox="0 0 32 1000"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Background draft pencil guide line (faint hand-drawn wavy rule) -->
    <path
      d="M 16 0
         C 8 60, 24 120, 11 180
         C 23 240, 7 300, 21 360
         C 9 420, 25 480, 12 540
         C 24 600, 8 660, 20 720
         C 10 780, 24 840, 13 900
         C 22 950, 10 980, 16 1000"
      stroke="var(--color-rule)"
      stroke-width="1.2"
      stroke-linecap="round"
      class="opacity-35"
      vector-effect="non-scaling-stroke"
    />

    <!-- Active primary hand-drawn ink stroke (draws down with scroll progress) -->
    <path
      d="M 16 0
         C 8 60, 24 120, 11 180
         C 23 240, 7 300, 21 360
         C 9 420, 25 480, 12 540
         C 24 600, 8 660, 20 720
         C 10 780, 24 840, 13 900
         C 22 950, 10 980, 16 1000"
      stroke="var(--color-accent)"
      stroke-width="2.5"
      stroke-linecap="round"
      pathLength="100"
      class="opacity-85 transition-[stroke-dashoffset] duration-150 ease-out"
      style="stroke-dasharray: 100; stroke-dashoffset: {Math.max(0, 100 - scrollProgress)};"
      vector-effect="non-scaling-stroke"
    />

    <!-- Companion subtle sketch stroke for rich notebook pencil feel -->
    <path
      d="M 17 0
         C 24 70, 9 130, 22 190
         C 8 250, 23 310, 11 370
         C 25 430, 10 490, 21 550
         C 7 610, 23 670, 12 730
         C 24 790, 9 850, 21 910
         C 12 960, 19 985, 17 1000"
      stroke="var(--color-accent)"
      stroke-width="1.2"
      stroke-linecap="round"
      pathLength="100"
      class="opacity-45 transition-[stroke-dashoffset] duration-150 ease-out"
      style="stroke-dasharray: 100; stroke-dashoffset: {Math.max(0, 100 - scrollProgress)};"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</div>
