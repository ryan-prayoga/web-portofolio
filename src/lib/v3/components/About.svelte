<script lang="ts">
  import { t } from '../i18n';
  import { scrollReveal } from '../actions/scrollReveal';
  import { profile } from '$lib/data/profile';
</script>

<section id="about" class="mx-auto max-w-5xl px-6 py-24 md:py-32">
  <h2
    class="mb-16 text-center font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl"
    use:scrollReveal
  >
    {$t.about.heading}
  </h2>

  <div class="grid gap-12 md:grid-cols-[1fr_0.6fr]">
    <div>
      {#each $t.about.paragraphs as p, i}
        <p
          class="mb-6 text-base leading-relaxed text-secondary md:text-lg"
          use:scrollReveal={{ delay: i * 0.15 }}
        >
          {p}
        </p>
      {/each}
    </div>

    <aside class="space-y-4">
      <div
        class="rounded-xl border border-border bg-surface p-6"
        use:scrollReveal={{ delay: 0.2 }}
      >
        <h3 class="mb-4 text-xs font-semibold tracking-widest text-accent-cyan uppercase">
          {$t.about.currently.label}
        </h3>
        <ul class="space-y-3 text-sm text-secondary">
          <li class="flex items-start gap-2">
            <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-success"></span>
            {$t.about.currently.status}
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue"></span>
            {$t.about.currently.thesis}
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-violet"></span>
            {$t.about.currently.schedule}
          </li>
        </ul>
      </div>

      <div
        class="grid grid-cols-2 gap-3 text-center"
        use:scrollReveal={{ delay: 0.35 }}
      >
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-2xl font-bold text-primary">{profile.experience}</p>
          <p class="text-xs text-muted">Experience</p>
        </div>
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-2xl font-bold text-primary">{profile.teamSize}</p>
          <p class="text-xs text-muted">Team Led</p>
        </div>
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-2xl font-bold text-primary">6+</p>
          <p class="text-xs text-muted">Projects</p>
        </div>
        <div class="rounded-lg border border-border bg-surface p-4">
          <p class="text-2xl font-bold text-primary">Tangerang</p>
          <p class="text-xs text-muted">Location</p>
        </div>
      </div>
    </aside>
  </div>
</section>
