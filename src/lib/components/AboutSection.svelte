<script lang="ts">
  import { profile } from '$lib/data/profile';

  let sectionRef = $state<HTMLElement | null>(null);

  $effect(() => {
    if (!sectionRef) return;

    const elements = sectionRef.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        }
      },
      { threshold: 0.1 }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<section bind:this={sectionRef} id="about" class="relative py-28 md:py-32 spotlight-violet overflow-hidden">
  <!-- Subtle grid overlay -->
  <div class="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>

  <div class="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">

    <!-- Section heading -->
    <div class="reveal mb-16 md:mb-20">
      <div class="flex items-center gap-3 mb-4">
        <span class="block h-px w-10 bg-accent-violet"></span>
        <span class="font-body text-sm tracking-widest uppercase text-accent-violet">Tentang</span>
      </div>
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Tentang Saya
      </h2>
    </div>

    <!-- Editorial layout: main content + sidebar -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

      <!-- Main bio content — takes 7 of 12 columns -->
      <div class="lg:col-span-7 space-y-6">
        {#each profile.bio as paragraph, i}
          <p
            class="reveal reveal-delay-{i + 1} text-lg leading-relaxed text-secondary font-body"
          >
            {paragraph}
          </p>
        {/each}
      </div>

      <!-- Sidebar info cards — takes 5 of 12 columns, slightly offset down -->
      <div class="lg:col-span-5 lg:mt-8 space-y-6">

        <!-- Education Card -->
        <div class="reveal reveal-delay-2 glass rounded-2xl p-6 glow-violet">
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-violet/10">
              <svg class="w-5 h-5 text-accent-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <h3 class="font-heading text-lg font-semibold text-primary">Pendidikan</h3>
          </div>
          <div class="space-y-4">
            <div class="border-l-2 border-accent-violet/30 pl-4">
              <p class="text-sm text-muted uppercase tracking-wide mb-1">SMK</p>
              <p class="text-base text-secondary leading-relaxed">{profile.education.smk}</p>
            </div>
            <div class="border-l-2 border-accent-cyan/30 pl-4">
              <p class="text-sm text-muted uppercase tracking-wide mb-1">Universitas</p>
              <p class="text-base text-secondary leading-relaxed">{profile.education.university}</p>
            </div>
          </div>
        </div>

        <!-- Company Card -->
        <div class="reveal reveal-delay-3 glass rounded-2xl p-6 glow-violet">
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-cyan/10">
              <svg class="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <h3 class="font-heading text-lg font-semibold text-primary">Perusahaan</h3>
          </div>
          <p class="text-base text-secondary leading-relaxed mb-1">{profile.company}</p>
          <p class="text-sm text-muted">{profile.experience} pengalaman profesional</p>
        </div>

        <!-- Location Card -->
        <div class="reveal reveal-delay-4 glass rounded-2xl p-6 glow-violet">
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-violet/10">
              <svg class="w-5 h-5 text-accent-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h3 class="font-heading text-lg font-semibold text-primary">Lokasi</h3>
          </div>
          <p class="text-base text-secondary leading-relaxed">{profile.location}</p>
        </div>

        <!-- Leadership Card -->
        <div class="reveal reveal-delay-5 glass rounded-2xl p-6 glow-violet">
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-accent-cyan/10">
              <svg class="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <h3 class="font-heading text-lg font-semibold text-primary">Leadership</h3>
          </div>
          <p class="text-base text-secondary leading-relaxed">
            Team Leader selama <span class="text-accent-cyan font-medium">{profile.leadershipDuration}</span>
            — memimpin tim <span class="text-accent-violet font-medium">{profile.teamSize} orang</span>
          </p>
        </div>

      </div>
    </div>
  </div>
</section>
