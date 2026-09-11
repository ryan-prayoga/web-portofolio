<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { experience } from '$lib/data/experience';
  import { reveal } from '$lib/actions/reveal';
  import { drawCard, drawBadge } from '$lib/actions/drawably';

  const t = $derived(uiCopy[localeStore.value]);
  const roles = $derived(experience[localeStore.value]);
</script>

<section id="experience" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="experience-heading">
  <div use:reveal>
    <span use:drawBadge={{ variant: 'outline' }} class="px-3 py-1 font-display text-sm tracking-wide uppercase">
      {t.experience.label}
    </span>
    <h2 id="experience-heading" class="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
      {t.experience.heading}
    </h2>
  </div>

  <div class="mt-8 space-y-6">
    {#each roles as role, i (role.title)}
      <article
        class="group cursor-pointer p-6 transition-transform hover:-translate-y-0.5 sm:p-8"
        use:reveal
        use:drawCard={{ resketchOnHover: true }}
      >
        <div class="grid gap-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-8">
          <div>
            <span
              use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
              class="inline-block px-3 py-1 font-display text-sm uppercase {i === 0 ? 'text-accent' : ''}"
            >
              {#if i === 0}
                <span class="text-accent font-bold mr-1" aria-hidden="true">●</span>
              {/if}
              {role.period}
            </span>
            <p class="text-muted mt-2 font-display text-xs sm:text-sm uppercase">{role.duration}</p>
          </div>
          <div>
            <h3 class="text-xl font-semibold tracking-tight">{role.title}</h3>
            <p class="text-muted mt-0.5 text-sm sm:text-base font-display">{role.company} — {role.location}</p>
            <p class="mt-3.5 max-w-prose leading-relaxed text-sm">{role.summary}</p>
            <ul class="mt-4 space-y-2.5">
              {#each role.bullets as bullet (bullet)}
                <li class="text-muted flex max-w-prose gap-3 text-sm leading-relaxed">
                  <span class="text-accent font-bold select-none" aria-hidden="true">✓</span>
                  {bullet}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>
