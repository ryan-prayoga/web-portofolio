<script lang="ts">
  import { onMount } from 'svelte';

  let sectionEl = $state<HTMLElement | null>(null);

  const leadershipCards = [
    {
      title: 'Task Management',
      description: 'Mengatur prioritas dan distribusi task secara efektif',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>`,
    },
    {
      title: 'Quality Assurance',
      description: 'Review kode dan menjaga standar implementasi',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2L3 7v6c0 5.25 3.83 10.17 9 11.38C17.17 23.17 21 18.25 21 13V7l-9-5z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>`,
    },
    {
      title: 'Problem Solving',
      description: 'Membantu tim menyelesaikan tantangan teknis',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>`,
    },
    {
      title: 'Delivery',
      description: 'Memastikan project selesai sesuai timeline dan standar client',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12l5 5L20 7"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>`,
    },
  ];

  onMount(() => {
    if (!sectionEl) return;

    const revealElements = sectionEl.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section
  id="leadership"
  bind:this={sectionEl}
  class="relative py-28 bg-base spotlight-right overflow-hidden"
>
  <div class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

      <!-- Left Side: Narrative -->
      <div class="space-y-8">
        <!-- Section Heading -->
        <div class="reveal">
          <div class="flex items-center gap-3 mb-4">
            <span class="inline-block w-1.5 h-8 rounded-full bg-accent-violet glow-violet"></span>
            <h2 class="font-heading text-3xl md:text-4xl text-primary font-bold tracking-tight">
              Leadership
            </h2>
          </div>
        </div>

        <!-- Editorial Quote -->
        <div class="reveal">
          <blockquote class="relative pl-6 border-l-2 border-accent-violet/40">
            <p class="font-heading text-xl md:text-2xl text-primary/90 leading-relaxed italic">
              "Memimpin bukan hanya soal mengatur — tapi soal membangun ritme kerja yang solid dan menjaga kualitas bersama."
            </p>
          </blockquote>
        </div>

        <!-- Narrative Paragraphs -->
        <div class="reveal space-y-5">
          <p class="font-body text-secondary leading-relaxed">
            Saat ini saya memimpin tim yang terdiri dari 4 orang secara aktif. Bukan sekadar mendelegasikan pekerjaan, tapi terlibat langsung dalam mengatur distribusi task dan menentukan prioritas berdasarkan kebutuhan project serta kapasitas masing-masing anggota tim.
          </p>

          <p class="font-body text-secondary leading-relaxed">
            Kualitas implementasi menjadi perhatian utama. Setiap pull request melewati proses code review yang saya lakukan secara langsung — memastikan standar kode tetap terjaga, arsitektur konsisten, dan tidak ada technical debt yang menumpuk tanpa rencana penyelesaian.
          </p>

          <p class="font-body text-secondary leading-relaxed">
            Ketika tim menghadapi tantangan teknis, saya hadir untuk membantu problem solving secara langsung. Berdiskusi, mencari solusi bersama, dan memastikan setiap keputusan teknis diambil dengan pertimbangan yang matang. Delivery yang tepat waktu dan sesuai ekspektasi client adalah hasil dari ritme kerja yang dibangun bersama.
          </p>

          <p class="font-body text-muted leading-relaxed text-sm">
            Saya tetap hands-on secara teknis saat dibutuhkan — karena memahami kode secara langsung adalah fondasi untuk memimpin tim engineering dengan baik.
          </p>
        </div>
      </div>

      <!-- Right Side: Visual Cards -->
      <div class="space-y-5 lg:pt-12">
        {#each leadershipCards as card, i}
          <div
            class="reveal glass rounded-2xl p-6 border border-border-light/30 hover:border-accent-violet/30 transition-all duration-300 group"
            style="transition-delay: {(i + 1) * 120}ms;"
          >
            <div class="flex items-start gap-5">
              <!-- Icon -->
              <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-violet/10 border border-accent-violet/20 flex items-center justify-center text-accent-violet group-hover:bg-accent-violet/15 group-hover:border-accent-violet/30 transition-colors duration-300">
                {@html card.icon}
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h3 class="font-heading text-lg text-primary font-semibold mb-1.5 group-hover:text-accent-violet transition-colors duration-300">
                  {card.title}
                </h3>
                <p class="font-body text-secondary text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        {/each}

        <!-- Summary Stat -->
        <div class="reveal glass rounded-2xl p-5 border border-border/40 mt-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-2.5 h-2.5 rounded-full bg-accent-violet glow-violet"></div>
              <span class="font-body text-muted text-sm">Active team size</span>
            </div>
            <span class="font-heading text-2xl text-accent-violet font-bold">4</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
