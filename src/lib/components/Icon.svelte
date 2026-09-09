<script lang="ts">
  import { iconPaths, type IconName } from '$lib/data/icons';

  type Props = {
    name: IconName;
    /** Ukuran sisi dalam px; ikut alur teks lewat `em` bila perlu. */
    size?: number | string;
    strokeWidth?: number;
    class?: string;
    /**
     * Isi hanya bila ikon berdiri sendiri tanpa teks pendamping. Ikon yang
     * cuma memperkuat label di sebelahnya harus tetap `aria-hidden`, agar
     * pembaca layar tidak membacakan label ganda.
     */
    label?: string;
  };

  let { name, size = 16, strokeWidth = 1.75, class: className = '', label }: Props = $props();

  const dimension = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<svg
  class={className}
  width={dimension}
  height={dimension}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? 'img' : 'presentation'}
  aria-hidden={label ? undefined : 'true'}
  aria-label={label}
  focusable="false"
>
  {#each iconPaths[name] as d (d)}
    <path {d} />
  {/each}
</svg>
