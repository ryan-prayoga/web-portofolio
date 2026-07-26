<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { experience } from '$lib/data/experience';
  import { reveal } from '$lib/actions/reveal';

  const t = $derived(uiCopy[localeStore.value]);
  const roles = $derived(experience[localeStore.value]);
</script>

<section id="experience" class="mx-auto max-w-5xl px-6 py-14" aria-labelledby="experience-heading">
  <div use:reveal>
    <p class="text-accent font-mono text-xs tracking-wider uppercase">{t.experience.label}</p>
    <h2 id="experience-heading" class="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
      {t.experience.heading}
    </h2>
  </div>

  <div class="border-rule mt-8 border-t">
    {#each roles as role (role.title)}
      <article class="border-rule grid gap-4 border-b py-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10" use:reveal>
        <div>
          <p class="font-mono text-xs text-nowrap">{role.period}</p>
          <p class="text-muted mt-1 font-mono text-[0.65rem] tracking-wider uppercase">{role.duration}</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold tracking-tight">{role.title}</h3>
          <p class="text-muted mt-0.5 text-sm">{role.company} — {role.location}</p>
          <p class="mt-3 max-w-prose leading-relaxed">{role.summary}</p>
          <ul class="mt-4 space-y-2">
            {#each role.bullets as bullet (bullet)}
              <li class="text-muted flex max-w-prose gap-3 text-sm leading-relaxed">
                <span class="text-accent select-none" aria-hidden="true">—</span>
                {bullet}
              </li>
            {/each}
          </ul>
        </div>
      </article>
    {/each}
  </div>
</section>
