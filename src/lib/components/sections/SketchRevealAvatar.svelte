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

  // Safe client-side media query states
  let isCoarse = $state(false);
  let isReduced = $state(false);

  let containerEl: HTMLElement | null = $state(null);
  let canvasEl: HTMLCanvasElement | null = $state(null);

  // Target reveal state: 0 = sketch, 1 = photo
  let targetProgress = $state(0);
  const isRevealed = $derived(targetProgress === 1);

  // Internal animation state
  let currentVisualProgress = 0; // 0 = 100% sketch, 1 = 100% photo
  let animId: number | null = null;
  let lastTimestamp = 0;
  let sketchImg: HTMLImageElement | null = null;
  let isSketchLoaded = false;

  // Offscreen canvas for cumulative stroke masking
  let maskCanvas: HTMLCanvasElement | null = null;
  let maskCtx: CanvasRenderingContext2D | null = null;

  // Previous stroke point for continuous lines
  let prevStrokePt: { x: number; y: number } | null = null;

  // Particle dust system
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

  // Active tool state for rendering
  let toolPos = {
    x: -100,
    y: -100,
    angle: 0,
    visible: false,
    type: 'eraser' as 'eraser' | 'pencil',
    jitter: 0,
  };

  // Easing function for organic motion
  function easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  // Eraser path calculation (sinusoidal sweeps back and forth across portrait)
  function getEraserPoint(p: number, width: number, height: number) {
    const sweeps = 9;
    const easedP = easeInOutCubic(Math.min(1, Math.max(0, p)));
    const y = easedP * height;

    const s = easedP * sweeps;
    // Cosine sweep creates natural deceleration at edges and smooth reversal
    const sweepCos = Math.cos(s * Math.PI);
    const x = width / 2 + (width / 2 - 18) * sweepCos;

    // Angle tilts with direction of horizontal movement
    const angle = -Math.sin(s * Math.PI) * 0.32;

    return { x, y, angle };
  }

  // Pencil hatching path calculation (rapid rhythmic diagonal sketching strokes)
  function getPencilPoint(p: number, timeSec: number, width: number, height: number) {
    const sweeps = 8;
    const easedP = easeInOutCubic(Math.min(1, Math.max(0, p)));
    const baseY = easedP * height;

    const s = easedP * sweeps;
    const baseX = width / 2 + (width / 2 - 22) * Math.sin(s * Math.PI);

    // Rapid diagonal hatching oscillation (~7.5 Hz)
    const hatchFreq = 46;
    const hatchPhase = timeSec * hatchFreq;
    const hatchAmp = 20;

    // 45-degree diagonal stroke vector
    const dx = Math.sin(hatchPhase) * hatchAmp * 0.75;
    const dy = Math.sin(hatchPhase) * hatchAmp * 0.75;

    const x = baseX + dx;
    const y = baseY + dy;

    return { x, y, angle: -0.72 + Math.cos(hatchPhase) * 0.12 };
  }

  function initMask(fillWithWhite: boolean) {
    if (!maskCanvas || !maskCtx) return;
    maskCtx.setTransform(1, 0, 0, 1, 0, 0);
    maskCtx.globalCompositeOperation = 'source-over';
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    if (fillWithWhite) {
      maskCtx.fillStyle = '#ffffff';
      maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    }
  }

  function drawEraserTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // Chalkboard / artist felt eraser block (wider, more realistic proportions)
    const w = 48;
    const h = 26;

    // Soft drop shadow on board
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, 4);
    ctx.fill();

    // Wooden handle back
    ctx.fillStyle = '#b45309'; // warm walnut / amber wood
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 4, w, 10, [4, 4, 0, 0]);
    ctx.fill();

    // Woodgrain detail line
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 5, -h / 2 + 1);
    ctx.lineTo(w / 2 - 5, -h / 2 + 1);
    ctx.stroke();

    // Thick felt eraser body (layered grey/cream felt)
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 + 6, w, h - 6, [0, 0, 4, 4]);
    ctx.fill();

    // Felt chalky bottom edge
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 2, h / 2 - 5, w - 4, 4, [0, 0, 3, 3]);
    ctx.fill();

    // Clean outer outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 4, w, h + 4, 4);
    ctx.stroke();

    ctx.restore();
  }

  function drawPencilTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, jitter: number) {
    ctx.save();
    ctx.translate(x + jitter, y + jitter);
    ctx.rotate(angle);

    const pw = 8;
    const ph = 34;

    // Soft shadow under pencil tip
    ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
    ctx.beginPath();
    ctx.ellipse(3, 3, 6, 2.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Wooden cone collar
    ctx.fillStyle = '#fed7aa'; // sharpened wood
    ctx.beginPath();
    ctx.moveTo(0, 0); // graphite tip on paper
    ctx.lineTo(-pw / 2, ph * 0.38);
    ctx.lineTo(pw / 2, ph * 0.38);
    ctx.closePath();
    ctx.fill();

    // Graphite core lead tip
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw * 0.22, ph * 0.14);
    ctx.lineTo(pw * 0.22, ph * 0.14);
    ctx.closePath();
    ctx.fill();

    // Hexagonal pencil barrel (classic drafting gold/yellow)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-pw / 2, ph * 0.38, pw, ph * 0.62, [0, 0, 2, 2]);
    ctx.fill();

    // Facet highlight stripe
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-pw * 0.2, ph * 0.38, pw * 0.4, ph * 0.62);

    // Crisp pencil outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw / 2, ph * 0.38);
    ctx.lineTo(-pw / 2, ph);
    ctx.lineTo(pw / 2, ph);
    ctx.lineTo(pw / 2, ph * 0.38);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  function spawnParticles(x: number, y: number, isEraser: boolean, dirX: number) {
    const count = isEraser ? 3 : 2;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * (isEraser ? 30 : 12),
        y: y + (Math.random() - 0.5) * (isEraser ? 16 : 8),
        vx: dirX * (Math.random() * 1.5 + 0.5) + (Math.random() - 0.5) * 2,
        vy: isEraser ? Math.random() * 2.2 - 0.8 : Math.random() * 1.6 - 0.4,
        size: Math.random() * 2.2 + 0.8,
        opacity: 0.9,
        color: isEraser ? 'rgba(240, 245, 255, ALPHA)' : 'rgba(55, 65, 81, ALPHA)',
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04; // subtle gravity
      p.vx *= 0.96; // air resistance
      p.opacity -= 0.028;
      if (p.opacity <= 0) {
        particles.splice(i, 1);
      }
    }
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

    if (currentVisualProgress <= 0.0001) {
      // 100% full sketch
      ctx.drawImage(sketchImg, 0, 0, width, height);
      return;
    }

    if (currentVisualProgress >= 0.9999) {
      // 100% photo revealed: canvas completely clear
      return;
    }

    // Draw masked sketch
    if (maskCanvas) {
      // Draw sketch image
      ctx.drawImage(sketchImg, 0, 0, width, height);
      // Mask with cumulative offscreen mask
      ctx.globalCompositeOperation = 'destination-in';
      ctx.drawImage(maskCanvas, 0, 0, width, height);
    }

    // Draw active dust particles
    ctx.globalCompositeOperation = 'source-over';
    for (const part of particles) {
      ctx.fillStyle = part.color.replace('ALPHA', String(Math.max(0, part.opacity)));
      ctx.beginPath();
      ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw active tool on top
    if (toolPos.visible) {
      if (toolPos.type === 'eraser') {
        drawEraserTool(ctx, toolPos.x, toolPos.y, toolPos.angle);
      } else {
        drawPencilTool(ctx, toolPos.x, toolPos.y, toolPos.angle, toolPos.jitter);
      }
    }
  }

  function step(timestamp: number) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.06);
    lastTimestamp = timestamp;

    if (!canvasEl || !maskCanvas || !maskCtx) return;
    const width = canvasEl.width;
    const height = canvasEl.height;

    // Refined pacing:
    // Erase duration: ~1.6s
    // Sketch duration: ~2.0s
    const eraseSpeed = 0.62;
    const sketchSpeed = 0.5;

    if (targetProgress > currentVisualProgress) {
      // ERASING FORWARD (Sketch -> Photo)
      toolPos.type = 'eraser';
      toolPos.visible = true;

      const prevP = currentVisualProgress;
      currentVisualProgress = Math.min(targetProgress, currentVisualProgress + eraseSpeed * dt);

      // Interpolate smooth continuous eraser strokes
      const subSteps = 6;
      for (let s = 1; s <= subSteps; s++) {
        const p = prevP + ((currentVisualProgress - prevP) * s) / subSteps;
        const pt = getEraserPoint(p, width, height);

        // Broad chalkboard eraser sweep (width ~52px)
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.lineWidth = Math.max(38, width * 0.24);
        maskCtx.lineCap = 'round';
        maskCtx.lineJoin = 'round';

        if (prevStrokePt) {
          maskCtx.beginPath();
          maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
          maskCtx.lineTo(pt.x, pt.y);
          maskCtx.stroke();
        }

        // Soft circular eraser head
        const brushR = Math.max(26, width * 0.16);
        const grad = maskCtx.createRadialGradient(pt.x, pt.y, brushR * 0.3, pt.x, pt.y, brushR);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.8, 'rgba(0,0,0,0.9)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(pt.x, pt.y, brushR, 0, Math.PI * 2);
        maskCtx.fill();

        prevStrokePt = { x: pt.x, y: pt.y };
      }

      const finalPt = getEraserPoint(currentVisualProgress, width, height);
      toolPos.x = finalPt.x;
      toolPos.y = finalPt.y;
      toolPos.angle = finalPt.angle;

      const swipeDir = Math.cos(currentVisualProgress * 9 * Math.PI) < 0 ? -1 : 1;
      spawnParticles(finalPt.x, finalPt.y, true, swipeDir);

      if (currentVisualProgress >= 1) {
        toolPos.visible = false;
        particles = [];
        prevStrokePt = null;
      }
    } else if (targetProgress < currentVisualProgress) {
      // SKETCHING BACKWARD (Photo -> Sketch)
      toolPos.type = 'pencil';
      toolPos.visible = true;

      const prevP = currentVisualProgress;
      currentVisualProgress = Math.max(targetProgress, currentVisualProgress - sketchSpeed * dt);

      // In sketching mode, sketchPortion goes 0 -> 1 as currentVisualProgress goes 1 -> 0
      const sketchPortion = 1 - currentVisualProgress;
      const prevSketchPortion = 1 - prevP;

      const subSteps = 6;
      for (let s = 1; s <= subSteps; s++) {
        const p = prevSketchPortion + ((sketchPortion - prevSketchPortion) * s) / subSteps;
        const timeSec = timestamp / 1000 + (s / subSteps) * dt;
        const pt = getPencilPoint(p, timeSec, width, height);

        // Draw dense textured pencil hatching strokes on mask
        maskCtx.globalCompositeOperation = 'source-over';
        maskCtx.lineWidth = Math.max(26, width * 0.15);
        maskCtx.lineCap = 'round';
        maskCtx.lineJoin = 'round';
        maskCtx.strokeStyle = '#ffffff';

        if (prevStrokePt) {
          maskCtx.beginPath();
          maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
          maskCtx.lineTo(pt.x, pt.y);
          maskCtx.stroke();
        }

        prevStrokePt = { x: pt.x, y: pt.y };
      }

      const finalPt = getPencilPoint(sketchPortion, timestamp / 1000, width, height);
      toolPos.x = finalPt.x;
      toolPos.y = finalPt.y;
      toolPos.angle = finalPt.angle;
      toolPos.jitter = (Math.random() - 0.5) * 2; // micro hand jitter

      spawnParticles(finalPt.x, finalPt.y, false, 0);

      if (currentVisualProgress <= 0) {
        toolPos.visible = false;
        particles = [];
        prevStrokePt = null;
        initMask(true); // reset mask to full solid
      }
    } else {
      toolPos.visible = false;
      prevStrokePt = null;
    }

    updateParticles();
    redrawCanvas();

    if (Math.abs(targetProgress - currentVisualProgress) > 0.001 || particles.length > 0) {
      animId = requestAnimationFrame(step);
    } else {
      currentVisualProgress = targetProgress;
      animId = null;
      redrawCanvas();
    }
  }

  function startAnimation() {
    if (isReduced) {
      currentVisualProgress = targetProgress;
      initMask(targetProgress === 0);
      redrawCanvas();
      return;
    }

    // Setup mask buffer state if starting fresh
    if (targetProgress === 1 && currentVisualProgress <= 0.01) {
      initMask(true); // start erasing from full white mask
      prevStrokePt = null;
    } else if (targetProgress === 0 && currentVisualProgress >= 0.99) {
      initMask(false); // start sketching from blank transparent mask
      prevStrokePt = null;
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

    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    canvasEl.width = w;
    canvasEl.height = h;

    if (!maskCanvas) {
      maskCanvas = document.createElement('canvas');
    }
    maskCanvas.width = w;
    maskCanvas.height = h;
    maskCtx = maskCanvas.getContext('2d');

    initMask(currentVisualProgress === 0);
    redrawCanvas();
  }

  onMount(() => {
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
