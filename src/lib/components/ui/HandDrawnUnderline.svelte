<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    class?: string;
    strokeWidth?: number;
    color?: string;
    delay?: number; // ms
    duration?: number; // ms
  }

  let {
    class: className = '',
    strokeWidth = 2.5,
    color = 'var(--color-accent)',
    delay = 250,
    duration = 1200,
  }: Props = $props();

  let isDrawn = $state(false);
  let containerEl: HTMLElement | null = $state(null);

  onMount(() => {
    if (!containerEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isDrawn = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              isDrawn = true;
            }, delay);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  });
</script>

<span
  bind:this={containerEl}
  class="relative inline-block w-full pointer-events-none select-none overflow-visible {className}"
  aria-hidden="true"
>
  <svg
    class="w-full h-3.5 overflow-visible block"
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Organic hand-drawn pen/pencil stroke with natural handwritten wave -->
    <path
      d="M 2 7 C 45 11, 75 4.5, 115 7.5 C 145 9.5, 175 4, 198 6.5"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      class="opacity-90"
      style="stroke-dasharray: 240; stroke-dashoffset: {isDrawn
        ? 0
        : 240}; transition: stroke-dashoffset {duration}ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease;"
    />
  </svg>
</span>
