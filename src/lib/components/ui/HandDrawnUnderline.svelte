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
    strokeWidth = 2.2,
    color = 'var(--color-accent)',
    delay = 300,
    duration = 1400,
  }: Props = $props();

  let isDrawn = $state(false);
  let containerEl: HTMLElement | null = $state(null);

  onMount(() => {
    if (!containerEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isDrawn = true;
      return;
    }

    // Trigger only when heading is comfortably inside the viewport (20% above bottom)
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
      { threshold: 0.3, rootMargin: '0px 0px -20% 0px' },
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  });
</script>

<span
  bind:this={containerEl}
  class="relative block w-full pointer-events-none select-none overflow-visible {className}"
  aria-hidden="true"
>
  <svg
    class="w-full h-3 overflow-visible block"
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Single clean organic hand-drawn pencil/ink stroke -->
    <path
      d="M -1 7 C 35 10, 75 4.5, 115 7.5 C 150 9.5, 180 4.5, 202 6.5"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      class="opacity-95"
      style="stroke-dasharray: 230; stroke-dashoffset: {isDrawn
        ? 0
        : 230}; transition: stroke-dashoffset {duration}ms cubic-bezier(0.2, 0.8, 0.25, 1), opacity 300ms ease;"
    />
  </svg>
</span>
