<script lang="ts">
  import { Canvas } from '@threlte/core';
  import Scene from './Scene.svelte';
  import type { SceneStatusCallback } from './sceneLifecycle';

  let {
    paused = false,
    scrollProgress = 0,
    pointBudget = 5000,
    onStatus,
  }: { paused?: boolean; scrollProgress?: number; pointBudget?: number; onStatus?: SceneStatusCallback } = $props();

  const dpr =
    typeof window === 'undefined'
      ? 1
      : Math.min(window.devicePixelRatio, window.matchMedia('(pointer: coarse)').matches ? 1.25 : 1.75);
</script>

<Canvas {dpr}>
  <Scene {paused} {scrollProgress} {pointBudget} {onStatus} />
</Canvas>
