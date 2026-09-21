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

<!-- Notebook Margin Ruler Line that draws down with scroll -->
<div
  class="pointer-events-none fixed top-0 bottom-0 z-10 select-none transition-opacity duration-500 {isMounted
    ? 'opacity-100'
    : 'opacity-0'}"
  style="left: max(12px, calc((100vw - 1080px) / 2));"
  aria-hidden="true"
>
  <!-- Background guide line (faint rule) -->
  <div class="absolute top-0 bottom-0 w-[1px] bg-[var(--color-rule)] opacity-40"></div>

  <!-- Active drawn ink margin line (drawn with scroll progress) -->
  <div
    class="absolute top-0 w-[1.5px] bg-accent/60 transition-[height] duration-75 ease-out"
    style="height: {scrollProgress}%;"
  >
    <!-- Little pencil lead dot indicator at the active drawing tip -->
    <div
      class="absolute -bottom-1 -left-[2px] h-2 w-2 rounded-full bg-accent shadow-xs transition-opacity duration-300 {scrollProgress >
      0.5
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-50'}"
    ></div>
  </div>
</div>
