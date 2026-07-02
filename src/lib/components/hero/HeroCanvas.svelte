<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { motionFlags } from '$lib/stores/motion.svelte';

  let { scrollProgress = 0 }: { scrollProgress?: number } = $props();

  let SceneComponent = $state<Component<{
    paused?: boolean;
    scrollProgress?: number;
    pointBudget?: number;
  }> | null>(null);
  let wrapper: HTMLElement | undefined = $state();
  let paused = $state(false);
  let ready = $state(false);
  let pointBudget = $state(5000);

  onMount(() => {
    if (motionFlags.reduced) return;
    if (!motionFlags.probeWebgl()) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem = (nav.deviceMemory ?? 8) <= 4;
    pointBudget = motionFlags.coarse || lowMem ? 2500 : 5000;

    let cancelled = false;
    const load = async () => {
      try {
        const mod = await import('$lib/components/three/ArchipelagoScene.svelte');
        if (cancelled) return;
        SceneComponent = mod.default;
        // beri satu frame supaya canvas mount dulu, baru fade in
        requestAnimationFrame(() => (ready = true));
      } catch {
        /* poster tetap tampil */
      }
    };
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const idle = hasIdle
      ? window.requestIdleCallback(load, { timeout: 2000 })
      : window.setTimeout(load, 350);

    let io: IntersectionObserver | undefined;
    if (wrapper) {
      io = new IntersectionObserver(([entry]) => (paused = !entry.isIntersecting), {
        threshold: 0,
      });
      io.observe(wrapper);
    }
    const onVis = () => (paused = document.hidden || paused);
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  });
</script>

<div class="canvas-wrap" class:ready bind:this={wrapper} aria-hidden="true">
  <div class="poster"></div>
  {#if SceneComponent}
    <div class="scene">
      <SceneComponent {paused} {scrollProgress} {pointBudget} />
    </div>
  {/if}
</div>

<style>
  .canvas-wrap {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
  }
  .poster {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        ellipse 90% 60% at 65% 38%,
        color-mix(in srgb, var(--color-ember) 7%, transparent),
        transparent 70%
      ),
      radial-gradient(ellipse 120% 80% at 50% 100%, var(--color-navy) 0%, transparent 55%),
      var(--color-night);
  }
  .scene {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1.4s ease;
  }
  .ready .scene {
    opacity: 1;
  }
</style>
