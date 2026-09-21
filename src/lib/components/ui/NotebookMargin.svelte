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

<!-- Notebook Margin Line with organic hand-drawn wobble, starting below header -->
<div
  class="pointer-events-none fixed top-[4.75rem] bottom-8 z-20 select-none transition-opacity duration-500 {isMounted
    ? 'opacity-100'
    : 'opacity-0'}"
  style="left: max(12px, calc((100vw - 1070px) / 2));"
  aria-hidden="true"
>
  <svg
    class="w-5 h-full overflow-visible block"
    viewBox="0 0 20 1000"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Background pencil draft guide (faint wobbly rule) -->
    <path
      d="M 10 0 C 9.2 70, 10.8 150, 10.1 230 C 9.4 310, 10.7 390, 9.8 470 C 9.1 550, 10.6 630, 10.2 710 C 9.5 790, 10.8 870, 10 1000"
      stroke="var(--color-rule)"
      stroke-width="1.2"
      stroke-linecap="round"
      class="opacity-35"
      vector-effect="non-scaling-stroke"
    />

    <!-- Active hand-drawn ink margin stroke (drawn down with scroll progress) -->
    <path
      d="M 10 0 C 9.2 70, 10.8 150, 10.1 230 C 9.4 310, 10.7 390, 9.8 470 C 9.1 550, 10.6 630, 10.2 710 C 9.5 790, 10.8 870, 10 1000"
      stroke="var(--color-accent)"
      stroke-width="1.75"
      stroke-linecap="round"
      pathLength="100"
      class="opacity-75 transition-[stroke-dashoffset] duration-150 ease-out"
      style="stroke-dasharray: 100; stroke-dashoffset: {Math.max(0, 100 - scrollProgress)};"
      vector-effect="non-scaling-stroke"
    />
  </svg>

  <!-- Hand-drawn pencil lead / ink tip dot at current scroll point -->
  <div
    class="absolute -left-[3px] h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent shadow-xs transition-[top,opacity] duration-150 ease-out {scrollProgress >
    0.5
      ? 'opacity-90 scale-100'
      : 'opacity-0 scale-50'}"
    style="top: {scrollProgress}%;"
  ></div>
</div>
