<script lang="ts">
  import { roughLine } from 'drawably';

  /**
   * Garis pena tangan pengganti `border` CSS lurus. Path dihitung dari seed
   * tetap (fungsi murni), jadi hasil SSR identik dengan klien dan tetap
   * tampil tanpa JavaScript. Warna ikut `currentColor`.
   */
  type Props = {
    orientation?: 'horizontal' | 'vertical';
    seed?: number;
    roughness?: number;
    class?: string;
  };

  let { orientation = 'horizontal', seed = 7, roughness = 0.7, class: className = '' }: Props = $props();

  const LENGTH = 400;
  const THICKNESS = 8;
  const vertical = $derived(orientation === 'vertical');
  const d = $derived(
    vertical
      ? roughLine(THICKNESS / 2, 1, THICKNESS / 2, LENGTH - 1, { seed, roughness })
      : roughLine(1, THICKNESS / 2, LENGTH - 1, THICKNESS / 2, { seed, roughness }),
  );
</script>

<!-- Utility Tailwind (bukan CSS scoped) untuk display/ukuran, supaya pemanggil
     bisa menimpanya dengan `hidden`, `sm:block`, inset, dst. -->
<span
  class="sketch-rule pointer-events-none block select-none {vertical ? 'w-2' : 'h-2'} {className}"
  aria-hidden="true"
>
  <svg
    viewBox={vertical ? `0 0 ${THICKNESS} ${LENGTH}` : `0 0 ${LENGTH} ${THICKNESS}`}
    preserveAspectRatio="none"
    fill="none"
    focusable="false"
  >
    <path
      {d}
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</span>

<style>
  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
</style>
