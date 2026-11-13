<script lang="ts">
  import { roughEllipse, roughLine } from 'drawably';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { skills } from '$lib/data/skills';
  import { reveal } from '$lib/actions/reveal';
  import HandDrawnUnderline from '$lib/components/ui/HandDrawnUnderline.svelte';

  const t = $derived(uiCopy[localeStore.value]);
  const groups = $derived(skills[localeStore.value]);

  // Lingkaran pena di sekeliling judul grup; viewBox diregangkan mengikuti
  // lebar teks, tebal goresan tetap (non-scaling-stroke).
  const loopPath = (index: number) => roughEllipse(100, 20, 96, 16, { seed: 73 + index * 13, roughness: 0.75 });
  const dashPath = (seed: number) => roughLine(1, 4, 11, 4, { seed, roughness: 0.4 });
</script>

<section id="skills" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="skills-heading">
  <div use:reveal>
    <div class="inline-block relative">
      <h2 id="skills-heading" class="text-2xl font-semibold tracking-tight sm:text-3xl">{t.skills.heading}</h2>
      <HandDrawnUnderline class="w-full mt-1" />
    </div>
  </div>

  <!-- Daftar catatan, bukan kartu berisi chip: judul grup dilingkari pena,
       teknologi utama distabilo, sisanya daftar bergaris strip. -->
  <dl class="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
    {#each groups as group, index (group.key)}
      {@const primary = index === 0}
      <div class={primary ? 'sm:col-span-2' : ''} use:reveal>
        <dt class="relative -ml-1 inline-block px-5 py-1.5 font-display text-lg leading-7 font-semibold">
          <svg
            class="text-accent pointer-events-none absolute -inset-x-1 inset-y-0 h-full w-[calc(100%+0.5rem)] overflow-visible"
            viewBox="0 0 200 40"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d={loopPath(index)}
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
            />
          </svg>
          <span class="relative">{group.title}</span>
        </dt>
        <dd class="mt-4">
          <ul class="flex flex-wrap gap-x-7 {primary ? 'gap-y-3' : 'gap-y-2'}">
            {#each group.items as item, itemIndex (item)}
              <li
                class="flex items-baseline gap-2 font-display {primary ? 'text-ink text-xl' : 'text-muted text-base'}"
              >
                {#if primary}
                  <span class="marker">{item}</span>
                {:else}
                  <svg
                    class="text-ink/55 shrink-0 self-center"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d={dashPath(index * 40 + itemIndex + 5)}
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                  </svg>
                  {item}
                {/if}
              </li>
            {/each}
          </ul>
        </dd>
      </div>
    {/each}
  </dl>
</section>

<style>
  /* Sapuan stabilo: tepi tak rata, sedikit miring, warna tinta aksen encer. */
  .marker {
    padding: 0.05em 0.45em;
    background: color-mix(in srgb, var(--color-accent) 20%, transparent);
    border-radius: 0.6em 0.2em 0.7em 0.25em / 0.3em 0.7em 0.25em 0.6em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
</style>
