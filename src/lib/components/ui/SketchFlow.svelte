<script lang="ts">
  import { roughArrow } from 'drawably';
  import { drawCard } from '$lib/actions/drawably';
  import type { CaseDiagram } from '$lib/data/caseDiagrams';

  /**
   * Diagram kotak-panah ala coretan arsitektur. Teks tetap DOM asli (bisa
   * dibaca layar, ikut bahasa); panah digambar pena dan hanya hiasan.
   * Mendatar di ≥768px, menurun di layar sempit.
   */
  type Props = { diagram: CaseDiagram; caption: string; class?: string };

  let { diagram, caption, class: className = '' }: Props = $props();

  const arrowAcross = (index: number, back: boolean) =>
    back
      ? roughArrow(52, 12, 4, 12, { seed: 91 + index * 9, roughness: 0.55 })
      : roughArrow(4, 12, 52, 12, { seed: 91 + index * 9, roughness: 0.55 });
  const arrowDown = (index: number, back: boolean) =>
    back
      ? roughArrow(12, 36, 12, 4, { seed: 91 + index * 9, roughness: 0.55 })
      : roughArrow(12, 4, 12, 36, { seed: 91 + index * 9, roughness: 0.55 });
</script>

<figure class={className}>
  <ol class="flex flex-col md:flex-row md:items-stretch">
    {#each diagram.nodes as node, index (node.label)}
      <li use:drawCard={{ seed: 5 + index * 3 }} class="min-w-0 px-4 py-3.5 md:flex-1">
        <p class="font-display text-base leading-snug font-semibold">{node.label}</p>
        <p class="text-muted mt-1 text-sm leading-snug">{node.note}</p>
      </li>
      {#if index < diagram.edges.length}
        {@const edge = diagram.edges[index]}
        {@const back = edge.dir === 'back'}
        <li
          class="text-muted flex shrink-0 items-center gap-2 py-1.5 pl-6 md:w-[5.25rem] md:flex-col md:justify-center md:px-1 md:py-0"
        >
          <svg
            class="text-ink shrink-0 md:hidden"
            width="24"
            height="40"
            viewBox="0 0 24 40"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={arrowDown(index, back)}
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="font-display text-sm leading-tight md:order-first md:text-center">{edge.label}</span>
          <svg
            class="text-ink hidden shrink-0 md:block"
            width="56"
            height="24"
            viewBox="0 0 56 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={arrowAcross(index, back)}
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </li>
      {/if}
    {/each}
  </ol>
  <figcaption class="text-muted mt-3 font-hand text-sm">{caption}</figcaption>
</figure>
