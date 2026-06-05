<script lang="ts">
  import { t } from '../i18n';
  import { scrollReveal } from '../actions/scrollReveal';
</script>

<!-- The particle backdrop + canvas now live at page level (see +page.svelte)
     as a fixed sibling of <main>, so it persists across all sections without
     the negative-z-index scroll repaint bug. This component is text only. -->
<section
  class="relative flex min-h-screen items-center justify-center overflow-hidden"
  id="hero"
>
  <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
    <p class="mb-3 text-sm tracking-widest text-secondary uppercase" use:scrollReveal={{ delay: 0 }}>
      {$t.hero.greeting}
    </p>
    <h1
      class="mb-2 font-heading text-4xl leading-tight font-bold tracking-tight text-primary md:text-7xl"
      use:scrollReveal={{ delay: 0.1 }}
    >
      {$t.hero.name}
    </h1>
    <p class="mb-6 text-xl text-secondary md:text-2xl" use:scrollReveal={{ delay: 0.2 }}>
      {$t.hero.role}
    </p>
    <span
      class="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-success/30 bg-accent-success/10 px-4 py-1.5 text-sm font-medium text-accent-success"
      use:scrollReveal={{ delay: 0.3 }}
    >
      <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-accent-success"></span>
      {$t.hero.openToWork}
    </span>
    <div class="mt-4" use:scrollReveal={{ delay: 0.4 }}>
      <a
        href="#projects"
        class="inline-block rounded-lg border border-border bg-surface-elevated px-6 py-3 text-sm font-medium text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
      >
        {$t.hero.cta} ↓
      </a>
    </div>
  </div>
</section>
