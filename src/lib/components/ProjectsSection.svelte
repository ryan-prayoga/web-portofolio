<script lang="ts">
  import { onMount } from 'svelte';
  import { enterpriseSystems, projects } from '$lib/data/projects';
  import type { ProjectVisual } from '$lib/data/projects';

  let sectionEl = $state<HTMLElement | null>(null);

  onMount(() => {
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    sectionEl.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });

  function visualRows(type: ProjectVisual) {
    if (type === 'tooling') return ['routes/api.php', 'OpenAPI schema', 'Bruno collection'];
    if (type === 'map') return ['Issue cluster', 'Heatmap severity', 'Admin moderation'];
    if (type === 'sync') return ['Android media scan', 'Thumbnail gallery', 'Original request'];
    if (type === 'operations') return ['Kas & anggota', 'WiFi & feed', 'Internal PWA'];
    if (type === 'bot') return ['Telegram command', 'SIMPEG session', 'Webview login'];
    return ['gas build', 'PM2 metadata', 'Nginx deploy'];
  }
</script>

<section id="projects" class="relative overflow-hidden bg-base py-28 md:py-32" bind:this={sectionEl}>
  <div class="absolute inset-0 bg-grid opacity-20"></div>
  <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div class="reveal mb-14 max-w-3xl">
      <p class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">
        Featured proof
      </p>
      <h2 class="font-heading text-4xl font-bold tracking-tight text-primary md:text-6xl">
        Project yang menunjukkan cara saya berpikir, bukan hanya stack yang saya pakai.
      </h2>
      <p class="mt-5 text-lg leading-relaxed text-secondary">
        Fokus portfolio ini diarahkan ke project yang punya bukti kuat: tooling, civic-tech, sync lintas device,
        automation, dan deployment workflow.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
      {#each projects as project, i}
        <article class="reveal reveal-delay-{(i % 5) + 1} group border-t border-border pt-6">
          <div class="mb-6 overflow-hidden rounded-xl border border-border bg-surface-secondary">
            <div class="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-accent-success"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-accent-cyan"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-border-light"></span>
              </div>
              <span class="text-xs font-semibold uppercase tracking-wider text-muted">{project.category}</span>
            </div>

            <div class="relative min-h-56 p-5">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(34,211,238,0.12),transparent_26%)]"></div>
              <div class="relative grid gap-3">
                {#each visualRows(project.visual) as row, rowIndex}
                  <div class="flex items-center gap-3 rounded-lg border border-border/70 bg-base/55 px-4 py-3 transition group-hover:border-accent-cyan/30">
                    <span class="flex h-7 w-7 items-center justify-center rounded-md bg-accent-cyan/10 text-xs font-bold text-accent-cyan">
                      {rowIndex + 1}
                    </span>
                    <span class="text-sm text-primary">{row}</span>
                    <span class="ml-auto h-1.5 w-16 rounded-full bg-accent-cyan/20"></span>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
            <span>{project.year}</span>
            <span class="h-px w-8 bg-border-light"></span>
            <span>{project.role}</span>
          </div>

          <h3 class="mt-4 font-heading text-2xl font-bold text-primary md:text-3xl">{project.name}</h3>
          <p class="mt-3 text-base leading-relaxed text-secondary">{project.summary}</p>

          <div class="mt-5 border-l border-accent-cyan/40 pl-4">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-accent-cyan">Focus</p>
            <p class="mt-2 text-sm leading-relaxed text-secondary">{project.focus}</p>
          </div>

          <p class="mt-5 rounded-lg border border-accent-success/20 bg-accent-success/10 px-4 py-3 text-sm leading-relaxed text-accent-success">
            {project.impact}
          </p>

          <div class="mt-5 flex flex-wrap gap-2">
            {#each project.stack as stack}
              <span class="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-secondary">{stack}</span>
            {/each}
          </div>

          {#if project.url}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              class="mt-6 inline-flex text-sm font-semibold text-accent-cyan transition hover:text-accent-blue"
            >
              Open repository
            </a>
          {/if}
        </article>
      {/each}
    </div>

    <div id="enterprise" class="reveal mt-28 border-t border-border pt-12">
      <div class="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent-success">
            Enterprise & government systems
          </p>
          <h2 class="font-heading text-3xl font-bold text-primary md:text-5xl">
            Pengalaman kerja tetap masuk sebagai bukti domain kompleks.
          </h2>
          <p class="mt-5 text-base leading-relaxed text-secondary">
            Bagian ini sengaja bukan galeri screenshot. Banyak sistem kerja memiliki konteks internal, jadi penekanannya
            ada pada scope, integrasi, dan tanggung jawab teknis.
          </p>
        </div>

        <div class="divide-y divide-border border-y border-border">
          {#each enterpriseSystems as system}
            <article class="py-6">
              <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{system.domain}</p>
                  <h3 class="mt-2 font-heading text-xl font-bold text-primary">{system.name}</h3>
                </div>
                <div class="flex max-w-lg flex-wrap gap-2 md:justify-end">
                  {#each system.stack as stack}
                    <span class="rounded-md border border-border bg-surface px-2 py-1 text-xs text-secondary">{stack}</span>
                  {/each}
                </div>
              </div>
              <p class="mt-4 text-sm leading-relaxed text-secondary">{system.summary}</p>
              <p class="mt-3 text-sm leading-relaxed text-primary/80">{system.proof}</p>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
