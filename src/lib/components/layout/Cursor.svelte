<script lang="ts">
  import { onMount } from 'svelte';

  let ringEl: HTMLElement | undefined = $state();
  let enabled = $state(false);
  let hovering = $state(false);
  let visible = $state(false);

  onMount(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    enabled = true;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const { gsap } = await import('$lib/motion/gsap');
      if (cancelled || !ringEl) return;
      const qx = gsap.quickTo(ringEl, 'x', { duration: 0.35, ease: 'power3.out' });
      const qy = gsap.quickTo(ringEl, 'y', { duration: 0.35, ease: 'power3.out' });

      const onMove = (e: PointerEvent) => {
        visible = true;
        qx(e.clientX);
        qy(e.clientY);
        const target = (e.target as Element | null)?.closest?.('a, button, [data-cursor]');
        hovering = !!target;
      };
      const onLeave = () => (visible = false);

      window.addEventListener('pointermove', onMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      cleanup = () => {
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  });
</script>

{#if enabled}
  <div
    class="ring"
    class:hovering
    class:visible
    bind:this={ringEl}
    aria-hidden="true"
  ></div>
{/if}

<style>
  .ring {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 90;
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border: 1px solid color-mix(in srgb, var(--color-ember) 70%, transparent);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.25s, transform 0.25s ease, background-color 0.25s;
  }
  .ring.visible {
    opacity: 1;
  }
  .ring.hovering {
    transform: scale(1.6);
    background: color-mix(in srgb, var(--color-ember) 10%, transparent);
    border-color: var(--color-ember);
  }
</style>
