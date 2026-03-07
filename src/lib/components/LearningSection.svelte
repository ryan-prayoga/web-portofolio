<script>
  import { onMount } from 'svelte';

  const courses = [
    {
      icon: 'book',
      title: 'BuildWith Angga',
      description: 'Multiple courses on web development — dari fundamentals hingga advanced full-stack project dengan real-world case studies.',
      platform: 'BWA Platform',
      accent: 'text-accent-cyan',
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/10',
    },
    {
      icon: 'code',
      title: 'Self-Learning & Open Source',
      description: 'Belajar langsung dari dokumentasi resmi, source code open source, dan membangun project untuk memperdalam pemahaman.',
      platform: 'Docs & GitHub',
      accent: 'text-accent-blue',
      border: 'border-sky-500/20',
      bg: 'bg-sky-500/10',
    },
    {
      icon: 'cpu',
      title: 'AI Tools & Prompt Engineering',
      description: 'Eksplorasi AI tools untuk produktivitas development — dari code generation hingga teknik prompt engineering yang efektif.',
      platform: 'Hands-on Practice',
      accent: 'text-accent-violet',
      border: 'border-violet-500/20',
      bg: 'bg-violet-500/10',
    },
    {
      icon: 'users',
      title: 'Leadership & Project Management',
      description: 'Mengembangkan kemampuan memimpin tim, mengelola project dengan agile methodology, dan komunikasi teknis yang efektif.',
      platform: 'Work Experience',
      accent: 'text-accent-success',
      border: 'border-emerald-500/20',
      bg: 'bg-emerald-500/10',
    },
  ];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('#learning .reveal');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section id="learning" class="relative py-28 bg-base overflow-hidden">
  <!-- Background glow -->
  <div class="spotlight-left"></div>

  <div class="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16 reveal">
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="h-px w-8 bg-accent-cyan"></span>
        <span class="text-accent-cyan font-heading text-sm tracking-widest uppercase">Continuous Learning</span>
        <span class="h-px w-8 bg-accent-cyan"></span>
      </div>
      <h2 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
        Continuous <span class="text-accent-cyan">Learning</span>
      </h2>
      <p class="text-secondary font-body max-w-2xl mx-auto text-base leading-relaxed">
        Belajar adalah investasi yang tidak pernah rugi. Saya terus mengikuti course dan mengembangkan skill untuk tetap relevan.
      </p>
    </div>

    <!-- Courses Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
      {#each courses as course, i}
        <div class="reveal reveal-delay-{i + 1} glass rounded-xl p-6 border border-border-light hover:border-{course.accent === 'text-accent-cyan' ? 'cyan' : course.accent === 'text-accent-blue' ? 'sky' : course.accent === 'text-accent-violet' ? 'violet' : 'emerald'}-500/30 transition-all duration-300 group hover:-translate-y-1">
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="{course.bg} {course.border} border rounded-lg p-3 shrink-0 transition-colors duration-300">
              {#if course.icon === 'book'}
                <svg class="w-5 h-5 {course.accent}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                </svg>
              {:else if course.icon === 'code'}
                <svg class="w-5 h-5 {course.accent}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
              {:else if course.icon === 'cpu'}
                <svg class="w-5 h-5 {course.accent}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5M4.5 15.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              {:else if course.icon === 'users'}
                <svg class="w-5 h-5 {course.accent}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              {/if}
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="font-heading font-semibold text-primary text-base group-hover:{course.accent} transition-colors duration-300">
                  {course.title}
                </h3>
                <span class="{course.bg} {course.accent} text-xs font-medium px-2.5 py-0.5 rounded-full border {course.border}">
                  {course.platform}
                </span>
              </div>
              <p class="text-muted font-body text-sm leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Growth Mindset Statement -->
    <div class="reveal reveal-delay-5 text-center">
      <div class="inline-block glass rounded-2xl px-8 py-6 border border-border-light">
        <div class="flex items-center justify-center gap-3 mb-3">
          <span class="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/50"></span>
          <svg class="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>
          <span class="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/50"></span>
        </div>
        <p class="text-lg md:text-xl font-heading font-medium text-accent-cyan leading-relaxed">
          "Dunia teknologi bergerak cepat — dan saya memilih untuk bergerak bersamanya."
        </p>
      </div>
    </div>
  </div>
</section>
