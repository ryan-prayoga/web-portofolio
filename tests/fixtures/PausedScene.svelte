<script lang="ts">
  import type { SceneStatus } from '../../src/lib/components/three/sceneLifecycle';

  let { paused = false, onStatus }: { paused?: boolean; onStatus?: (status: SceneStatus) => void } = $props();
</script>

<output data-testid="scene-paused">{paused}</output>
<button data-testid="scene-ready" onclick={() => onStatus?.('ready')}>ready</button>
<button data-testid="scene-error" onclick={() => onStatus?.('error')}>error</button>
