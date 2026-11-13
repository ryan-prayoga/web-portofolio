<script lang="ts">
  import { roughCheckmark } from 'drawably';

  /** Centang pena tangan pengganti glyph "✓". Beda seed = beda goresan. */
  type Props = { seed?: number; class?: string };

  let { seed = 1, class: className = '' }: Props = $props();

  const d = $derived(roughCheckmark(3, 3, 12, 10, { seed, roughness: 0.55 }));
</script>

<svg
  class={className}
  width="18"
  height="16"
  viewBox="0 0 18 16"
  fill="none"
  stroke="currentColor"
  stroke-width="1.9"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
  focusable="false"
>
  <path {d} />
</svg>
