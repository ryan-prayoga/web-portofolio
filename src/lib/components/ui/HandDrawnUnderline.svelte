<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    class?: string;
    strokeWidth?: number;
    color?: string;
    delay?: number; // ms
  }

  let { class: className = '', strokeWidth = 2.5, color = 'var(--color-accent)', delay = 150 }: Props = $props();

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
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' },
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
    class="w-full h-3 overflow-visible block"
    viewBox="0 0 200 12"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Organic hand-drawn pen/pencil stroke -->
    <path
      d="M 2 7 Q 55 12 110 5.5 Q 165 -0.5 198 6.5"
      stroke={color}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round"
      class="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] {isDrawn
        ? 'opacity-90 [stroke-dashoffset:0]'
        : 'opacity-0 [stroke-dashoffset:220]'}"
      style="stroke-dasharray: 220;"
    />
  </svg>
</span>
