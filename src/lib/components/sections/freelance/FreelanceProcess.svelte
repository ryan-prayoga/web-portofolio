<script lang="ts">
  import { localeStore } from '$lib/stores/locale.svelte';
  import { freelanceCopy } from '$lib/data/freelanceCopy';
  import { drawCard, drawBadge } from '$lib/actions/drawably';
  import SketchRule from '$lib/components/ui/SketchRule.svelte';

  const t = $derived(freelanceCopy[localeStore.value]);
</script>

<section id="process" class="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
  <SketchRule seed={163} class="text-ink/40 absolute inset-x-6 -top-1" />
  <div class="inline-block">
    <span
      use:drawBadge={{ variant: 'outline', resketchOnHover: true }}
      class="cursor-default px-3 py-1 font-display text-sm text-accent"
    >
      // {t.process.badge}
    </span>
  </div>

  <h2 class="mt-4 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-balance">
    {t.process.heading}
  </h2>
  <p class="mt-3 text-muted max-w-2xl text-sm sm:text-base leading-relaxed">
    {t.process.subheading}
  </p>

  <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {#each t.process.steps as step (step.step)}
      <div use:drawCard={{ resketchOnHover: true }} class="bg-paper p-6 flex flex-col justify-between">
        <div>
          <span class="font-display text-3xl font-bold text-accent/80 select-none block">
            {step.step}
          </span>
          <h3 class="mt-3 font-display text-lg font-semibold text-ink tracking-tight">
            {step.title}
          </h3>
          <p class="mt-2 text-sm text-muted leading-relaxed">
            {step.description}
          </p>
        </div>

        <div class="relative mt-6 pt-4 font-display text-sm text-accent font-semibold">
          <SketchRule seed={170} class="text-ink/35 absolute inset-x-0 -top-1" />
          <span class="text-muted block font-display text-sm">Deliverable:</span>
          {step.output}
        </div>
      </div>
    {/each}
  </div>
</section>
