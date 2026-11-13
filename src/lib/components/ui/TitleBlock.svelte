<script lang="ts">
  import { drawCard } from '$lib/actions/drawably';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';

  /**
   * Title block ala gambar teknik: satu bingkai sketsa, sekat digambar
   * tangan, label stensil monospace. Empat sel: 2×2 di ponsel, 1×4 di ≥640px.
   */
  export type TitleBlockItem = { readonly label: string; readonly value: string; readonly note: string };

  type Props = { items: readonly TitleBlockItem[]; title?: string; class?: string };

  let { items, title, class: className = '' }: Props = $props();
</script>

<div use:drawCard={{ resketchOnHover: true }} class="title-block p-1 sm:p-2 {className}" {title}>
  <dl class="grid grid-cols-2 sm:grid-cols-4">
    {#each items as item, index (item.label)}
      <div class="relative min-w-0 px-3 py-4 sm:px-5">
        {#if index > 0}
          <SketchRule
            orientation="vertical"
            seed={11 + index}
            class="text-ink/70 absolute inset-y-2 -left-1 {index === 2 ? 'hidden sm:block' : ''}"
          />
        {/if}
        {#if index >= 2}
          <SketchRule seed={31 + index} class="text-ink/70 absolute inset-x-2 -top-1 sm:hidden" />
        {/if}
        <dt class="text-muted min-h-8 font-mono text-[0.6875rem] leading-4 tracking-[0.04em] uppercase sm:min-h-0">
          {item.label}
        </dt>
        <dd class="mt-1.5">
          <span
            class="text-accent block font-display font-bold tracking-tight {item.value.length > 6
              ? 'text-lg leading-8 sm:text-xl sm:leading-9'
              : 'text-2xl leading-8 sm:text-3xl sm:leading-9'}"
          >
            {item.value}
          </span>
          <span class="text-muted mt-0.5 block font-display text-sm">{item.note}</span>
        </dd>
      </div>
    {/each}
  </dl>
</div>
