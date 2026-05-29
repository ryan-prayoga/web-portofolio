<script lang="ts">
  import { onMount } from 'svelte';

  let sectionEl = $state<HTMLElement | null>(null);

  const primaryStack = [
    'Go Fiber',
    'Laravel',
    'SvelteKit',
    'Nuxt',
    'PostgreSQL',
    'Android',
    'Nginx',
    'PM2',
  ];

  const stackRows = [
    {
      area: 'Backend',
      use: 'API, auth, business workflow, integrasi service, dan data processing.',
      tools: ['Go Fiber', 'Laravel', 'Lumen', 'PostgreSQL', 'REST API'],
    },
    {
      area: 'Frontend',
      use: 'Dashboard, portal publik, back office, PWA, dan interface operasional.',
      tools: ['SvelteKit', 'Nuxt 3', 'Nuxt 2', 'TypeScript', 'Tailwind'],
    },
    {
      area: 'Mobile',
      use: 'Aplikasi field, webview, upload media, dan workflow lintas device.',
      tools: ['Android', 'React Native', 'Flutter', 'WebView'],
    },
    {
      area: 'Delivery',
      use: 'Deploy VPS, process manager, reverse proxy, automation, dan review workflow.',
      tools: ['Nginx', 'PM2', 'CI/CD', 'Bash', 'AI-assisted workflow'],
    },
  ];

  const workingStyle = [
    'Biasa masuk dari requirement yang belum rapi, lalu memecahnya jadi flow dan modul yang bisa dikerjakan.',
    'Nyaman bekerja di sistem existing: membaca pola lama, menjaga compatibility, lalu melakukan improvement bertahap.',
    'Tetap hands-on di code sambil menjaga prioritas, review, dan delivery tim.',
  ];

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
</script>

<section id="tech-journey" class="relative overflow-hidden bg-base py-24 md:py-28" bind:this={sectionEl}>
  <div class="absolute inset-0 bg-grid opacity-20"></div>

  <div class="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div class="reveal max-w-3xl">
      <p class="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.18em] text-accent-cyan">
        Stack
      </p>
      <h2 class="font-heading text-4xl font-bold tracking-tight text-primary md:text-5xl">
        Teknologi yang saya pakai saat membangun sistem.
      </h2>
      <p class="mt-5 text-base leading-relaxed text-secondary md:text-lg">
        Ini bukan daftar semua tools yang pernah dicoba. Ini stack yang paling sering muncul di project kerja dan personal: dari API, UI, mobile, sampai deployment.
      </p>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside class="reveal reveal-delay-1 border-t border-border pt-6">
        <p class="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          Primary stack
        </p>
        <div class="mt-5 flex flex-wrap gap-2 lg:flex-col">
          {#each primaryStack as item}
            <span class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary">
              {item}
            </span>
          {/each}
        </div>
      </aside>

      <div class="reveal reveal-delay-2 border-y border-border">
        {#each stackRows as row}
          <article class="grid gap-4 border-b border-border py-6 last:border-b-0 md:grid-cols-[160px_1fr] md:items-start">
            <div>
              <h3 class="font-heading text-xl font-bold text-primary">{row.area}</h3>
            </div>
            <div>
              <p class="text-sm leading-relaxed text-secondary md:text-base">{row.use}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                {#each row.tools as tool}
                  <span class="rounded-md border border-accent-cyan/15 bg-accent-cyan/5 px-2.5 py-1 text-xs text-secondary">
                    {tool}
                  </span>
                {/each}
              </div>
            </div>
          </article>
        {/each}
      </div>
    </div>

    <div class="reveal reveal-delay-3 mt-12 grid gap-4 md:grid-cols-3">
      {#each workingStyle as item, i}
        <div class="border-t border-border pt-5">
          <p class="font-heading text-sm font-semibold text-accent-cyan">0{i + 1}</p>
          <p class="mt-3 text-sm leading-relaxed text-secondary">{item}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
