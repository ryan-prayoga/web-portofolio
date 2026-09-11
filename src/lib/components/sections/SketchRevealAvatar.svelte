<script lang="ts">
  import { onMount } from 'svelte';
  import { localeStore } from '$lib/stores/locale.svelte';
  import { uiCopy } from '$lib/data/uiCopy';
  import { drawCard } from '$lib/actions/drawably';

  interface Props {
    class?: string;
  }

  const { class: className = '' }: Props = $props();

  const t = $derived(uiCopy[localeStore.value]);

  // Safe client-side media query states (never mutate during SSR or derived)
  let isCoarse = $state(false);
  let isReduced = $state(false);

  let containerEl: HTMLElement | null = $state(null);
  let canvasEl: HTMLCanvasElement | null = $state(null);

  // Target reveal state: 0 = sketch, 1 = photo
  let targetProgress = $state(0);
  const isRevealed = $derived(targetProgress === 1);

  // Internal animation state (non-reactive for 60fps performance and zero Svelte overhead)
  let currentProgress = 0;
  let animId: number | null = null;
  let lastTimestamp = 0;
  let sketchImg: HTMLImageElement | null = null;
  let isSketchLoaded = false;

  // Dust particles for erasing and sketching
  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
  }
  let particles: Particle[] = [];

  // Active tool position for rendering
  let toolPos = { x: -100, y: -100, angle: 0, visible: false, type: 'eraser' as 'eraser' | 'pencil' };

  // Calculate tool path coordinates given progress [0, 1]
  function getPathPoint(p: number, width: number, height: number) {
    const sweeps = 7;
    const progressSweep = Math.min(sweeps - 0.0001, Math.max(0, p * sweeps));
    const sweepIndex = Math.floor(progressSweep);
    const sweepFraction = progressSweep - sweepIndex;

    const y = ((sweepIndex + sweepFraction) / sweeps) * height;
    const isEven = sweepIndex % 2 === 0;

    const xFraction = isEven ? sweepFraction : 1 - sweepFraction;
    const x = xFraction * width;

    const angle = isEven ? 0.35 : -0.35;

    return { x, y, angle };
  }

  function drawEraserTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const w = 34;
    const h = 20;

    // Soft drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 2, -h / 2 + 3, w, h, 3);
    ctx.fill();

    // Eraser white/chalk felt body
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 3);
    ctx.fill();

    // Eraser pink rubber stripe
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, 5, [3, 3, 0, 0]);
    ctx.fill();

    // Stroke border
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2, w, h, 3);
    ctx.stroke();

    ctx.restore();
  }

  function drawPencilTool(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 4);

    const pw = 7;
    const ph = 26;

    // Wood cone
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw / 2, ph * 0.35);
    ctx.lineTo(pw / 2, ph * 0.35);
    ctx.closePath();
    ctx.fill();

    // Graphite lead tip
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw * 0.2, ph * 0.12);
    ctx.lineTo(pw * 0.2, ph * 0.12);
    ctx.closePath();
    ctx.fill();

    // Golden pencil body
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-pw / 2, ph * 0.35, pw, ph * 0.65, [0, 0, 2, 2]);
    ctx.fill();

    // Pencil outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.3)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw / 2, ph * 0.35);
    ctx.lineTo(-pw / 2, ph);
    ctx.lineTo(pw / 2, ph);
    ctx.lineTo(pw / 2, ph * 0.35);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  function redrawCanvas() {
    if (!canvasEl || !sketchImg || !isSketchLoaded) return;
    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    const width = canvasEl.width;
    const height = canvasEl.height;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    if (currentProgress <= 0.001) {
      // 100% Sketch
      ctx.drawImage(sketchImg, 0, 0, width, height);
      return;
    }

    if (currentProgress >= 0.999) {
      // 100% Photo revealed: canvas is clear
      return;
    }

    // Intermediate state: draw sketch base
    ctx.drawImage(sketchImg, 0, 0, width, height);

    if (toolPos.type === 'eraser') {
      // Chalkboard eraser effect: destination-out wipe
      ctx.globalCompositeOperation = 'destination-out';

      const steps = Math.max(15, Math.floor(currentProgress * 80));
      for (let i = 0; i <= steps; i++) {
        const p = (i / steps) * currentProgress;
        const pt = getPathPoint(p, width, height);

        const brushR = Math.max(26, width * 0.16);
        const grad = ctx.createRadialGradient(pt.x, pt.y, brushR * 0.2, pt.x, pt.y, brushR);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.7, 'rgba(0,0,0,0.9)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, brushR, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      // Pencil sketching effect: reveal sketch portion progressively
      const sketchPortion = 1 - currentProgress;
      ctx.globalCompositeOperation = 'destination-in';

      ctx.beginPath();
      const pt = getPathPoint(sketchPortion, width, height);
      ctx.rect(0, 0, width, pt.y + 15);
      ctx.fill();

      // Pencil hatching strokes
      ctx.lineWidth = Math.max(16, width * 0.12);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      const hatchSteps = 25;
      for (let i = 0; i < hatchSteps; i++) {
        const hp = Math.max(0, sketchPortion - (i / hatchSteps) * 0.15);
        const hpt = getPathPoint(hp, width, height);
        ctx.beginPath();
        ctx.moveTo(hpt.x - 20, hpt.y - 12);
        ctx.lineTo(hpt.x + 20, hpt.y + 12);
        ctx.stroke();
      }

      // Faint graphite guide strokes
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgba(70, 70, 80, 0.35)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 6; i++) {
        const hp = Math.max(0, sketchPortion - (i / 6) * 0.08);
        const hpt = getPathPoint(hp, width, height);
        ctx.beginPath();
        ctx.moveTo(hpt.x - 18, hpt.y - 10);
        ctx.lineTo(hpt.x + 18, hpt.y + 10);
        ctx.stroke();
      }
    }

    // Chalk / graphite dust particles
    ctx.globalCompositeOperation = 'source-over';
    for (const part of particles) {
      ctx.fillStyle = part.color.replace('ALPHA', String(part.opacity));
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Active tool cursor
    if (toolPos.visible) {
      if (toolPos.type === 'eraser') {
        drawEraserTool(ctx, toolPos.x, toolPos.y, toolPos.angle);
      } else {
        drawPencilTool(ctx, toolPos.x, toolPos.y);
      }
    }
  }

  function spawnParticles(x: number, y: number, isEraser: boolean) {
    const count = isEraser ? 2 : 1;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 15,
        vx: (Math.random() - 0.5) * 2.5,
        vy: isEraser ? Math.random() * 2 - 0.5 : Math.random() * 1.5 - 0.5,
        size: Math.random() * 1.8 + 0.8,
        opacity: 0.85,
        color: isEraser ? 'rgba(230, 230, 240, ALPHA)' : 'rgba(80, 80, 90, ALPHA)',
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.opacity -= 0.04;
      if (p.opacity <= 0) {
        particles.splice(i, 1);
      }
    }
  }

  function step(timestamp: number) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
    lastTimestamp = timestamp;

    if (!canvasEl) return;
    const width = canvasEl.width;
    const height = canvasEl.height;

    const speed = 1.45;

    if (targetProgress > currentProgress) {
      // Erasing forward
      toolPos.type = 'eraser';
      toolPos.visible = true;
      currentProgress = Math.min(targetProgress, currentProgress + speed * dt);

      const pt = getPathPoint(currentProgress, width, height);
      toolPos.x = pt.x;
      toolPos.y = pt.y;
      toolPos.angle = pt.angle;
      spawnParticles(pt.x, pt.y, true);

      if (currentProgress >= 1) {
        toolPos.visible = false;
        particles = [];
      }
    } else if (targetProgress < currentProgress) {
      // Sketching backward
      toolPos.type = 'pencil';
      toolPos.visible = true;
      currentProgress = Math.max(targetProgress, currentProgress - speed * dt);

      const sketchPortion = 1 - currentProgress;
      const pt = getPathPoint(sketchPortion, width, height);
      toolPos.x = pt.x;
      toolPos.y = pt.y;
      spawnParticles(pt.x, pt.y, false);

      if (currentProgress <= 0) {
        toolPos.visible = false;
        particles = [];
      }
    } else {
      toolPos.visible = false;
    }

    updateParticles();
    redrawCanvas();

    if (Math.abs(targetProgress - currentProgress) > 0.001 || particles.length > 0) {
      animId = requestAnimationFrame(step);
    } else {
      currentProgress = targetProgress;
      animId = null;
      redrawCanvas();
    }
  }

  function startAnimation() {
    if (isReduced) {
      currentProgress = targetProgress;
      redrawCanvas();
      return;
    }

    lastTimestamp = 0;
    if (animId !== null) cancelAnimationFrame(animId);
    animId = requestAnimationFrame(step);
  }

  function handleMouseEnter() {
    if (isCoarse) return;
    targetProgress = 1;
    startAnimation();
  }

  function handleMouseLeave() {
    if (isCoarse) return;
    targetProgress = 0;
    startAnimation();
  }

  function handleToggle() {
    targetProgress = targetProgress === 1 ? 0 : 1;
    startAnimation();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  }

  function initCanvas() {
    if (!canvasEl || !containerEl) return;
    const rect = containerEl.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvasEl.width = Math.round(rect.width * dpr);
    canvasEl.height = Math.round(rect.height * dpr);

    redrawCanvas();
  }

  onMount(() => {
    // Media query listeners initialized safely inside onMount (client-only)
    const coarseMedia = window.matchMedia('(pointer: coarse)');
    const reducedMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    isCoarse = coarseMedia.matches;
    isReduced = reducedMedia.matches;

    const onCoarseChange = (e: MediaQueryListEvent) => {
      isCoarse = e.matches;
    };
    const onReducedChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
    };

    coarseMedia.addEventListener('change', onCoarseChange);
    reducedMedia.addEventListener('change', onReducedChange);

    // Preload sketch image
    const img = new Image();
    img.src = '/photo/ryan-sketch-480.webp';
    img.onerror = () => {
      img.src = '/photo/ryan-sketch-480.jpg';
    };
    img.onload = () => {
      sketchImg = img;
      isSketchLoaded = true;
      initCanvas();
    };

    const resizeObserver = new ResizeObserver(() => {
      initCanvas();
    });

    if (containerEl) {
      resizeObserver.observe(containerEl);
    }

    return () => {
      coarseMedia.removeEventListener('change', onCoarseChange);
      reducedMedia.removeEventListener('change', onReducedChange);
      resizeObserver.disconnect();
      if (animId !== null) cancelAnimationFrame(animId);
    };
  });
</script>

<div class="flex flex-col items-center {className}">
  <!-- Outer Card with Drawably Sketch Border -->
  <div
    use:drawCard={{ resketchOnHover: true }}
    class="w-36 shrink-0 cursor-pointer overflow-hidden p-2 sm:w-44"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onclick={handleToggle}
    onkeydown={handleKeyDown}
    role="button"
    tabindex="0"
    aria-label="{t.hero.photoAlt} - {isRevealed
      ? t.hero.sketchHintReset
      : isCoarse
        ? t.hero.sketchHintTap
        : t.hero.sketchHintHover}"
    title={isRevealed
      ? isCoarse
        ? t.hero.sketchHintReset
        : 'Hover out to re-sketch'
      : isCoarse
        ? t.hero.sketchHintTap
        : t.hero.sketchHintHover}
  >
    <!-- Interactive Avatar Inner Frame -->
    <div
      bind:this={containerEl}
      class="group relative block aspect-4/5 w-full overflow-hidden select-none outline-none"
    >
      <!-- Base Layer: Real Photo (Semantic <picture> for SEO and Performance) -->
      <picture class="block h-full w-full overflow-hidden">
        <source type="image/avif" srcset="/photo/ryan-480.avif" />
        <source type="image/webp" srcset="/photo/ryan-480.webp" />
        <img
          src="/photo/ryan-480.jpg"
          alt={t.hero.photoAlt}
          width="480"
          height="600"
          class="block h-full w-full object-cover grayscale contrast-105 transition-all duration-700 group-hover:grayscale-0"
          fetchpriority="high"
        />
      </picture>

      <!-- Canvas Layer: Chalkboard Eraser & Pencil Sketch Rendering -->
      <canvas
        bind:this={canvasEl}
        class="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 {isReduced &&
        isRevealed
          ? 'opacity-0'
          : 'opacity-100'}"
        aria-hidden="true"
      ></canvas>
    </div>
  </div>

  <!-- Interactive Hint Badge -->
  <button
    type="button"
    onclick={handleToggle}
    class="no-print text-muted hover:text-accent hover:border-accent/40 bg-paper/90 border-ink/15 mt-2.5 inline-flex max-w-full cursor-pointer items-center justify-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[0.62rem] tracking-wider uppercase shadow-xs transition-colors active:scale-95 sm:text-[0.65rem]"
    title={isRevealed
      ? isCoarse
        ? t.hero.sketchHintReset
        : 'Hover out to re-sketch'
      : isCoarse
        ? t.hero.sketchHintTap
        : t.hero.sketchHintHover}
  >
    {#if isRevealed}
      <span class="inline-block transition-transform duration-300" aria-hidden="true">↺</span>
      <span class="truncate">{t.hero.sketchHintReset}</span>
    {:else}
      <span class="text-accent inline-block animate-pulse font-bold" aria-hidden="true">✎</span>
      <span class="truncate">{isCoarse ? t.hero.sketchHintTap : t.hero.sketchHintHover}</span>
    {/if}
  </button>
</div>
