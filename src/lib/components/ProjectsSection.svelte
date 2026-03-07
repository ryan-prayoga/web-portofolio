<script lang="ts">
  import { onMount } from 'svelte';
  import { projects } from '$lib/data/projects';
  import type { Project } from '$lib/data/projects';

  let sectionEl = $state<HTMLElement | null>(null);

  onMount(() => {
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = sectionEl.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<section
  id="projects"
  class="relative py-28 md:py-32 spotlight-cyan overflow-hidden"
  bind:this={sectionEl}
>
  <!-- Subtle grid overlay -->
  <div class="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

  <div class="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">

    <!-- Section heading -->
    <div class="reveal mb-16 md:mb-20">
      <div class="flex items-center gap-3 mb-4">
        <span class="block h-px w-10 bg-accent-cyan"></span>
        <span class="font-body text-sm tracking-widest uppercase text-accent-cyan">Portfolio</span>
      </div>
      <h2 class="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
        Featured <span class="text-accent-cyan">Projects</span>
      </h2>
      <p class="mt-4 max-w-2xl text-secondary font-body text-lg leading-relaxed">
        Case studies dari proyek-proyek enterprise yang telah saya kerjakan, mulai dari sistem pemerintahan hingga platform digital.
      </p>
    </div>

    <!-- Projects grid: 2 columns on desktop, 1 on mobile -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {#each projects as project, i}
        <div
          class="reveal reveal-delay-{(i % 4) + 1} group relative glass rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:glow-cyan hover:border-glow-cyan"
        >
          <!-- Placeholder Visual Area -->
          <div class="relative bg-surface-secondary h-52 overflow-hidden">
            <!-- Category badge (top-left) -->
            <div class="absolute top-3 left-3 z-10">
              <span class="inline-flex items-center gap-1.5 rounded-lg bg-surface/80 backdrop-blur-sm border border-border/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase text-accent-cyan">
                <span class="h-1.5 w-1.5 rounded-full bg-accent-cyan"></span>
                {project.category}
              </span>
            </div>

            <!-- Year badge (top-right) -->
            <div class="absolute top-3 right-3 z-10">
              <span class="inline-flex items-center rounded-lg bg-surface/80 backdrop-blur-sm border border-border/60 px-2.5 py-1 text-[10px] font-heading font-bold tracking-wider text-muted">
                {project.year}
              </span>
            </div>

            <!-- Placeholder visuals per type -->
            {#if project.placeholderType === 'dashboard'}
              <!-- Dashboard: header bar, chart bars, status indicators -->
              <div class="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
                <!-- Header bar with window dots -->
                <div class="flex items-center gap-2 bg-surface-elevated/60 rounded-lg px-3 py-2">
                  <div class="flex gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-accent-cyan/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-violet/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-success/40"></span>
                  </div>
                  <div class="h-1.5 w-20 bg-border/60 rounded-full ml-2"></div>
                  <div class="ml-auto h-1.5 w-8 bg-border/40 rounded-full"></div>
                </div>
                <!-- Stats row -->
                <div class="flex gap-2">
                  <div class="flex-1 bg-surface-elevated/40 rounded-lg p-2.5 border border-border/30">
                    <div class="h-1 w-8 bg-accent-cyan/30 rounded-full mb-2"></div>
                    <div class="h-3 w-10 bg-accent-cyan/20 rounded"></div>
                  </div>
                  <div class="flex-1 bg-surface-elevated/40 rounded-lg p-2.5 border border-border/30">
                    <div class="h-1 w-8 bg-accent-violet/30 rounded-full mb-2"></div>
                    <div class="h-3 w-10 bg-accent-violet/20 rounded"></div>
                  </div>
                  <div class="flex-1 bg-surface-elevated/40 rounded-lg p-2.5 border border-border/30">
                    <div class="h-1 w-8 bg-accent-success/30 rounded-full mb-2"></div>
                    <div class="h-3 w-10 bg-accent-success/20 rounded"></div>
                  </div>
                </div>
                <!-- Chart bars -->
                <div class="flex-1 bg-surface-elevated/30 rounded-lg p-3 border border-border/20 flex items-end gap-2">
                  <div class="w-4 bg-accent-cyan/25 rounded-t" style="height: 60%"></div>
                  <div class="w-4 bg-accent-cyan/35 rounded-t" style="height: 80%"></div>
                  <div class="w-4 bg-accent-cyan/20 rounded-t" style="height: 45%"></div>
                  <div class="w-4 bg-accent-violet/30 rounded-t" style="height: 90%"></div>
                  <div class="w-4 bg-accent-cyan/25 rounded-t" style="height: 55%"></div>
                  <div class="w-4 bg-accent-violet/20 rounded-t" style="height: 70%"></div>
                  <div class="w-4 bg-accent-cyan/30 rounded-t" style="height: 40%"></div>
                  <div class="w-4 bg-accent-success/25 rounded-t" style="height: 75%"></div>
                  <div class="w-4 bg-accent-cyan/20 rounded-t" style="height: 50%"></div>
                  <!-- Status indicators -->
                  <div class="ml-auto flex flex-col gap-1.5 self-center">
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-success/50"></span>
                      <span class="h-1 w-6 bg-border/40 rounded-full"></span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-cyan/50"></span>
                      <span class="h-1 w-8 bg-border/40 rounded-full"></span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent-violet/50"></span>
                      <span class="h-1 w-5 bg-border/40 rounded-full"></span>
                    </div>
                  </div>
                </div>
              </div>

            {:else if project.placeholderType === 'content-platform'}
              <!-- Content Platform: text blocks, sidebar, media areas -->
              <div class="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
                <!-- Top nav bar -->
                <div class="flex items-center gap-3 bg-surface-elevated/60 rounded-lg px-3 py-2">
                  <div class="flex gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-accent-blue/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-violet/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-success/40"></span>
                  </div>
                  <div class="flex gap-3 ml-3">
                    <div class="h-1.5 w-10 bg-border/50 rounded-full"></div>
                    <div class="h-1.5 w-8 bg-accent-cyan/30 rounded-full"></div>
                    <div class="h-1.5 w-12 bg-border/50 rounded-full"></div>
                  </div>
                </div>
                <!-- Main content area with sidebar -->
                <div class="flex-1 flex gap-2.5 min-h-0">
                  <!-- Sidebar -->
                  <div class="w-1/4 bg-surface-elevated/30 rounded-lg p-2.5 border border-border/20 flex flex-col gap-2">
                    <div class="h-1.5 w-full bg-accent-blue/20 rounded-full"></div>
                    <div class="h-1.5 w-3/4 bg-border/30 rounded-full"></div>
                    <div class="h-1.5 w-5/6 bg-border/30 rounded-full"></div>
                    <div class="h-px w-full bg-border/20 my-1"></div>
                    <div class="h-1.5 w-full bg-border/30 rounded-full"></div>
                    <div class="h-1.5 w-2/3 bg-accent-violet/20 rounded-full"></div>
                    <div class="h-1.5 w-4/5 bg-border/30 rounded-full"></div>
                  </div>
                  <!-- Content area -->
                  <div class="flex-1 flex flex-col gap-2">
                    <!-- Media area / hero image placeholder -->
                    <div class="h-14 bg-surface-elevated/40 rounded-lg border border-border/20 flex items-center justify-center">
                      <svg class="w-5 h-5 text-border/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                      </svg>
                    </div>
                    <!-- Text blocks -->
                    <div class="flex-1 bg-surface-elevated/20 rounded-lg p-2.5 border border-border/15 flex flex-col gap-1.5">
                      <div class="h-2 w-3/4 bg-border/40 rounded-full"></div>
                      <div class="h-1 w-full bg-border/20 rounded-full"></div>
                      <div class="h-1 w-5/6 bg-border/20 rounded-full"></div>
                      <div class="h-1 w-full bg-border/20 rounded-full"></div>
                      <div class="h-1 w-2/3 bg-border/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

            {:else if project.placeholderType === 'map-interface'}
              <!-- Map Interface: map view with location pins, legend panel -->
              <div class="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
                <!-- Top toolbar -->
                <div class="flex items-center gap-2 bg-surface-elevated/60 rounded-lg px-3 py-2">
                  <div class="flex gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-accent-success/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-cyan/40"></span>
                    <span class="w-2 h-2 rounded-full bg-accent-violet/40"></span>
                  </div>
                  <div class="ml-2 h-1.5 w-16 bg-border/50 rounded-full"></div>
                  <div class="ml-auto flex gap-2">
                    <div class="h-5 w-5 bg-surface-elevated/80 rounded border border-border/40 flex items-center justify-center">
                      <span class="text-[8px] text-muted">+</span>
                    </div>
                    <div class="h-5 w-5 bg-surface-elevated/80 rounded border border-border/40 flex items-center justify-center">
                      <span class="text-[8px] text-muted">-</span>
                    </div>
                  </div>
                </div>
                <!-- Map area with legend -->
                <div class="flex-1 flex gap-2.5 min-h-0">
                  <!-- Map canvas -->
                  <div class="flex-1 bg-surface-elevated/20 rounded-lg border border-border/20 relative overflow-hidden">
                    <!-- Abstract map grid lines -->
                    <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 200 120">
                      <!-- Grid/roads -->
                      <line x1="0" y1="30" x2="200" y2="30" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <line x1="0" y1="60" x2="200" y2="60" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <line x1="0" y1="90" x2="200" y2="90" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <line x1="50" y1="0" x2="50" y2="120" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <line x1="100" y1="0" x2="100" y2="120" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <line x1="150" y1="0" x2="150" y2="120" stroke="currentColor" class="text-border/20" stroke-width="0.5" />
                      <!-- Road-like diagonal -->
                      <path d="M 20 110 Q 60 70 120 50 T 190 20" stroke="currentColor" class="text-accent-cyan/15" stroke-width="2" fill="none" />
                      <path d="M 10 40 Q 80 80 160 100" stroke="currentColor" class="text-accent-violet/12" stroke-width="1.5" fill="none" />
                      <!-- Area fill / region -->
                      <rect x="65" y="35" width="45" height="30" rx="3" fill="currentColor" class="text-accent-cyan/8" />
                      <rect x="120" y="55" width="35" height="25" rx="3" fill="currentColor" class="text-accent-violet/6" />
                    </svg>
                    <!-- Location pins -->
                    <div class="absolute top-[25%] left-[30%]">
                      <div class="relative">
                        <svg class="w-4 h-5 text-accent-cyan/70" viewBox="0 0 16 20" fill="currentColor">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                        </svg>
                      </div>
                    </div>
                    <div class="absolute top-[45%] left-[55%]">
                      <svg class="w-4 h-5 text-accent-violet/60" viewBox="0 0 16 20" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                      </svg>
                    </div>
                    <div class="absolute top-[60%] left-[35%]">
                      <svg class="w-3.5 h-4.5 text-accent-success/50" viewBox="0 0 16 20" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                      </svg>
                    </div>
                    <div class="absolute top-[30%] left-[70%]">
                      <svg class="w-3.5 h-4.5 text-accent-cyan/50" viewBox="0 0 16 20" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/>
                      </svg>
                    </div>
                  </div>
                  <!-- Legend panel -->
                  <div class="w-[30%] bg-surface-elevated/40 rounded-lg p-2.5 border border-border/20 flex flex-col gap-2">
                    <div class="h-1.5 w-10 bg-accent-cyan/30 rounded-full"></div>
                    <div class="h-px w-full bg-border/20"></div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-accent-cyan/50"></span>
                      <span class="h-1 w-10 bg-border/40 rounded-full"></span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-accent-violet/50"></span>
                      <span class="h-1 w-8 bg-border/40 rounded-full"></span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-accent-success/50"></span>
                      <span class="h-1 w-12 bg-border/40 rounded-full"></span>
                    </div>
                    <div class="h-px w-full bg-border/20 mt-1"></div>
                    <div class="h-1 w-full bg-border/25 rounded-full"></div>
                    <div class="h-1 w-3/4 bg-border/25 rounded-full"></div>
                  </div>
                </div>
              </div>

            {:else if project.placeholderType === 'data-management'}
              <!-- Data Management: data table with rows, columns, action buttons -->
              <div class="absolute inset-0 p-4 pt-10 flex flex-col gap-3">
                <!-- Header bar -->
                <div class="flex items-center justify-between bg-surface-elevated/60 rounded-lg px-3 py-2">
                  <div class="flex items-center gap-2">
                    <div class="flex gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-accent-cyan/40"></span>
                      <span class="w-2 h-2 rounded-full bg-accent-blue/40"></span>
                      <span class="w-2 h-2 rounded-full bg-accent-success/40"></span>
                    </div>
                    <div class="h-1.5 w-14 bg-border/50 rounded-full ml-1"></div>
                  </div>
                  <div class="flex gap-1.5">
                    <div class="h-4 w-10 bg-accent-cyan/15 rounded border border-accent-cyan/20 flex items-center justify-center">
                      <span class="text-[6px] text-accent-cyan/60">+ Add</span>
                    </div>
                    <div class="h-4 w-8 bg-surface-elevated/80 rounded border border-border/40 flex items-center justify-center">
                      <svg class="w-2 h-2 text-muted/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <!-- Table -->
                <div class="flex-1 bg-surface-elevated/20 rounded-lg border border-border/20 overflow-hidden flex flex-col">
                  <!-- Table header -->
                  <div class="flex items-center gap-2 px-3 py-2 bg-surface-elevated/40 border-b border-border/20">
                    <div class="w-3 h-3 rounded border border-border/40"></div>
                    <div class="h-1.5 w-16 bg-border/50 rounded-full"></div>
                    <div class="h-1.5 w-12 bg-border/50 rounded-full ml-auto"></div>
                    <div class="h-1.5 w-14 bg-border/50 rounded-full"></div>
                    <div class="h-1.5 w-10 bg-border/50 rounded-full"></div>
                  </div>
                  <!-- Table rows -->
                  <div class="flex items-center gap-2 px-3 py-1.5 border-b border-border/10">
                    <div class="w-3 h-3 rounded border border-accent-cyan/30 bg-accent-cyan/10"></div>
                    <div class="h-1 w-20 bg-border/30 rounded-full"></div>
                    <div class="h-1 w-10 bg-accent-success/25 rounded-full ml-auto"></div>
                    <div class="h-1 w-12 bg-border/25 rounded-full"></div>
                    <div class="flex gap-1">
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1.5 border-b border-border/10 bg-surface-elevated/10">
                    <div class="w-3 h-3 rounded border border-border/30"></div>
                    <div class="h-1 w-16 bg-border/30 rounded-full"></div>
                    <div class="h-1 w-8 bg-accent-cyan/20 rounded-full ml-auto"></div>
                    <div class="h-1 w-14 bg-border/25 rounded-full"></div>
                    <div class="flex gap-1">
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1.5 border-b border-border/10">
                    <div class="w-3 h-3 rounded border border-border/30"></div>
                    <div class="h-1 w-24 bg-border/30 rounded-full"></div>
                    <div class="h-1 w-10 bg-accent-violet/20 rounded-full ml-auto"></div>
                    <div class="h-1 w-10 bg-border/25 rounded-full"></div>
                    <div class="flex gap-1">
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1.5 border-b border-border/10 bg-surface-elevated/10">
                    <div class="w-3 h-3 rounded border border-accent-cyan/30 bg-accent-cyan/10"></div>
                    <div class="h-1 w-18 bg-border/30 rounded-full"></div>
                    <div class="h-1 w-12 bg-accent-success/25 rounded-full ml-auto"></div>
                    <div class="h-1 w-11 bg-border/25 rounded-full"></div>
                    <div class="flex gap-1">
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 px-3 py-1.5">
                    <div class="w-3 h-3 rounded border border-border/30"></div>
                    <div class="h-1 w-14 bg-border/30 rounded-full"></div>
                    <div class="h-1 w-9 bg-accent-cyan/20 rounded-full ml-auto"></div>
                    <div class="h-1 w-13 bg-border/25 rounded-full"></div>
                    <div class="flex gap-1">
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                      <div class="w-3 h-3 rounded bg-surface-elevated/60 border border-border/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Bottom gradient fade into card body -->
            <div class="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface/80 to-transparent"></div>
          </div>

          <!-- Card Body -->
          <div class="p-6 pt-5 flex flex-col gap-4">
            <!-- Project name -->
            <h3 class="font-heading text-xl font-bold text-primary group-hover:text-accent-cyan transition-colors duration-300">
              {project.name}
            </h3>

            <!-- Summary -->
            <p class="text-sm text-secondary leading-relaxed font-body">
              {project.summary}
            </p>

            <!-- Role -->
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-accent-violet/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              <span class="text-xs font-heading font-semibold text-accent-violet tracking-wide">{project.role}</span>
            </div>

            <!-- Stack tags -->
            <div class="flex flex-wrap gap-1.5">
              {#each project.stack as tech}
                <span class="inline-flex items-center rounded-md bg-accent-cyan/8 border border-accent-cyan/15 px-2 py-0.5 text-[11px] font-medium text-accent-cyan/80 font-body">
                  {tech}
                </span>
              {/each}
            </div>

            <!-- Focus section -->
            <div class="border-l-2 border-accent-blue/30 pl-3">
              <p class="text-[11px] uppercase tracking-widest text-muted font-heading mb-1">Focus</p>
              <p class="text-xs text-secondary leading-relaxed font-body">
                {project.focus}
              </p>
            </div>

            <!-- Impact line -->
            <div class="flex items-start gap-2 bg-accent-success/5 rounded-lg px-3 py-2.5 border border-accent-success/10">
              <svg class="w-4 h-4 text-accent-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <p class="text-xs font-medium text-accent-success leading-relaxed">
                {project.impact}
              </p>
            </div>

            <!-- Tags row -->
            <div class="flex flex-wrap gap-1.5 pt-2 border-t border-border/30">
              {#each project.tags as tag}
                <span class="inline-flex items-center rounded-full bg-surface-elevated/60 border border-border/30 px-2.5 py-0.5 text-[10px] font-medium text-muted tracking-wide">
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <!-- Subtle accent line at bottom of card -->
          <div class="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-accent-cyan/15 to-transparent group-hover:via-accent-cyan/40 transition-all duration-500"></div>
        </div>
      {/each}
    </div>

  </div>
</section>
