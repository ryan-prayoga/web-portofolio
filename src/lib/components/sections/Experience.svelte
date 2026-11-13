<script lang="ts">
  import { roughCircle } from 'drawably';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { experience } from '$lib/data/experience';
  import { reveal } from '$lib/actions/reveal';
  import HandDrawnUnderline from '$lib/components/ui/HandDrawnUnderline.svelte';
  import SketchTick from '$lib/components/ui/SketchTick.svelte';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const roles = $derived(experience[localeStore.value]);
  const isCurrent = (period: string) => /Present|Sekarang/.test(period);

  // Titik linimasa: lingkaran pena, satu goresan berbeda per peran.
  const nodePath = (index: number) => roughCircle(10, 10, 6, { seed: 41 + index * 7, roughness: 0.32 });
</script>

{#snippet node(index: number, current: boolean)}
  <svg
    class="shrink-0 {current ? 'text-accent' : 'text-ink'}"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d={nodePath(index)}
      fill={current ? 'currentColor' : 'var(--color-paper)'}
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
{/snippet}

<section id="experience" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="experience-heading">
  <div use:reveal>
    <div class="inline-block relative">
      <h2 id="experience-heading" class="text-2xl font-semibold tracking-tight sm:text-3xl">
        {t.experience.heading}
      </h2>
      <HandDrawnUnderline class="w-full mt-1" />
    </div>
  </div>

  <!-- Linimasa digambar tangan: rel vertikal + titik di ≥640px; di ponsel
       tiap peran dipisah garis pena supaya tidak berebut dengan garis margin. -->
  <div class="mt-10">
    {#each roles as role, index (role.title)}
      {@const current = isCurrent(role.period)}
      {@const last = index === roles.length - 1}
      {#if index > 0}
        <SketchRule seed={61 + index} class="text-ink/45 mb-8 sm:hidden" />
      {/if}
      <article class="grid sm:grid-cols-[minmax(0,10.5rem)_1.25rem_minmax(0,1fr)] sm:gap-x-6" use:reveal>
        <div class="flex items-center gap-2.5 sm:block sm:pt-0.5">
          <span class="sm:hidden">{@render node(index, current)}</span>
          <p class="font-display text-base leading-snug {current ? 'text-accent' : 'text-ink'}">{role.period}</p>
          <p class="text-muted ml-auto font-mono text-xs tracking-wide sm:mt-1 sm:ml-0">{role.duration}</p>
        </div>

        <div class="relative hidden sm:block">
          <SketchRule
            orientation="vertical"
            seed={17 + index * 5}
            class="rail text-ink/70 absolute left-1.5 {index === 0 ? 'top-3' : 'top-0'} {last
              ? 'rail--end bottom-6'
              : 'bottom-0'}"
          />
          <span class="relative block pt-1">{@render node(index, current)}</span>
        </div>

        <div class="mt-3 min-w-0 sm:mt-0 {last ? '' : 'pb-10 sm:pb-12'}">
          <h3 class="text-xl font-semibold tracking-tight">{role.title}</h3>
          <p class="text-muted mt-0.5 text-sm sm:text-base font-display">{role.company} — {role.location}</p>
          <p class="mt-3.5 max-w-prose leading-relaxed">{role.summary}</p>
          <ul class="mt-4 space-y-2.5">
            {#each role.bullets as bullet, bulletIndex (bullet)}
              <li class="text-muted flex max-w-prose gap-2.5 leading-relaxed">
                <SketchTick seed={index * 31 + bulletIndex + 3} class="text-accent mt-1 shrink-0" />
                {bullet}
              </li>
            {/each}
          </ul>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  /* Rel peran terakhir memudar: linimasa belum selesai, bukan terpotong. */
  :global(.rail--end) {
    mask-image: linear-gradient(to bottom, black 35%, transparent);
  }
</style>
