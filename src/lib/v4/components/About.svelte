<script lang="ts">
  import { t } from '$lib/v3/i18n';
  import { profile } from '$lib/data/profile';
  import { reveal } from '$lib/v4/actions/reveal';
</script>

<section id="about" class="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
  <div class="grid gap-12 md:grid-cols-12 md:gap-10">
    <div class="md:col-span-4">
      <div class="md:sticky md:top-28" use:reveal={{ selector: '[data-r]', stagger: 0.1 }}>
        <p data-r class="v4-mono mb-5 text-[0.7rem] tracking-[0.22em] text-[var(--color-clay)] uppercase">
          (01) &mdash; {$t.about.heading}
        </p>
        <h2 data-r class="v4-display text-[clamp(2.4rem,5vw,4rem)] leading-[1] text-[var(--color-ink)]">
          {profile.name}
        </h2>
        <p data-r class="mt-4 max-w-[34ch] text-sm leading-relaxed text-[var(--color-ink-faint)]">
          {profile.role}
        </p>
      </div>
    </div>

    <div class="md:col-span-8">
      <div class="space-y-7" use:reveal={{ selector: '[data-p]', stagger: 0.12 }}>
        {#each $t.about.paragraphs as para, i (i)}
          <p
            class="text-[var(--color-ink-soft)] {i === 0
              ? 'text-xl leading-relaxed md:text-2xl'
              : 'max-w-[62ch] text-base leading-relaxed'}"
            data-p
          >
            {para}
          </p>
        {/each}
      </div>

      <div
        class="mt-14 border border-[var(--color-rule)] bg-[var(--color-paper-raised)] p-7 md:p-9"
        use:reveal={{ y: 30 }}
      >
        <div class="mb-6 flex items-center gap-3">
          <span class="relative flex h-2.5 w-2.5">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-clay)] opacity-60"></span>
            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-clay)]"></span>
          </span>
          <p class="v4-mono text-[0.7rem] tracking-[0.2em] text-[var(--color-ink)] uppercase">
            {$t.about.currently.label}
          </p>
        </div>

        <div class="grid gap-px bg-[var(--color-rule)] md:grid-cols-3">
          {#each [
            $t.about.currently.status,
            $t.about.currently.thesis,
            $t.about.currently.schedule,
          ] as item, i (i)}
            <div class="bg-[var(--color-paper-raised)] pt-5 md:px-5 md:first:pl-0">
              <p class="v4-mono mb-2 text-[0.65rem] text-[var(--color-clay)]">0{i + 1}</p>
              <p class="text-sm leading-relaxed text-[var(--color-ink-soft)]">{item}</p>
            </div>
          {/each}
        </div>

        <div class="mt-7 flex flex-wrap gap-x-8 gap-y-2 border-t border-[var(--color-rule)] pt-5">
          <span class="v4-mono text-xs text-[var(--color-ink-faint)]">
            <span class="text-[var(--color-ink)]">{profile.company}</span>
          </span>
          <span class="v4-mono text-xs text-[var(--color-ink-faint)]">
            {profile.education.university}
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
