<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import { motionFlags } from '$lib/stores/motion.svelte';
  import type { SceneStatus, SceneStatusCallback } from '$lib/components/three/sceneLifecycle';
  import { initialHeroPauseState, reduceHeroPauseState } from './heroPauseState';

  let { scrollProgress = 0 }: { scrollProgress?: number } = $props();

  let SceneComponent = $state<Component<{
    paused?: boolean;
    scrollProgress?: number;
    pointBudget?: number;
    onStatus?: SceneStatusCallback;
  }> | null>(null);
  let wrapper: HTMLElement | undefined = $state();
  let pauseState = $state(initialHeroPauseState(false));
  let sceneStatus = $state<SceneStatus>('loading');
  let pointBudget = $state(5000);

  onMount(() => {
    if (motionFlags.reduced) return;
    if (!motionFlags.probeWebgl()) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMem = (nav.deviceMemory ?? 8) <= 4;
    pointBudget = motionFlags.coarse || lowMem ? 2500 : 5000;
    pauseState = initialHeroPauseState(document.hidden);

    let cancelled = false;
    const load = async () => {
      if (cancelled) return;
      try {
        const mod = await import('$lib/components/three/ArchipelagoScene.svelte');
        if (cancelled) return;
        SceneComponent = mod.default;
      } catch (error) {
        console.error('Failed to load the archipelago scene module', error);
      }
    };
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const idle = hasIdle ? window.requestIdleCallback(load, { timeout: 4000 }) : window.setTimeout(load, 1200);

    let io: IntersectionObserver | undefined;
    if (wrapper) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          pauseState = reduceHeroPauseState(pauseState, {
            type: 'intersection-changed',
            offscreen: !entry.isIntersecting,
          });
        },
        { threshold: 0 },
      );
      io.observe(wrapper);
    }
    const onVis = () => {
      pauseState = reduceHeroPauseState(pauseState, {
        type: 'visibility-changed',
        pageHidden: document.hidden,
      });
    };
    document.addEventListener('visibilitychange', onVis);

    let active = true;
    const stop = () => {
      if (!active) return;
      active = false;
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      SceneComponent = null;
      sceneStatus = 'loading';
    };
    const unsubscribe = motionFlags.subscribe(() => {
      if (motionFlags.reduced) stop();
    });

    return () => {
      unsubscribe();
      stop();
    };
  });

  const onStatus = (status: SceneStatus) => {
    sceneStatus = status;
  };
</script>

<div
  class="canvas-wrap"
  class:ready={sceneStatus === 'ready'}
  data-scene-status={sceneStatus}
  bind:this={wrapper}
  aria-hidden="true"
>
  <div class="poster"></div>
  {#if SceneComponent}
    <div class="scene">
      <SceneComponent paused={pauseState.paused} {scrollProgress} {pointBudget} {onStatus} />
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
      radial-gradient(ellipse 120% 80% at 50% 100%, var(--color-navy) 0%, transparent 55%), var(--color-night);
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
