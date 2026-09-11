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

  // Eraser path: broad, rhythmic chalkboard sweeps from top to bottom
  function getEraserPoint(p: number, width: number, height: number) {
    const sweeps = 11;
    const easedP = easeInOutCubic(Math.min(1, Math.max(0, p)));
    const y = easedP * height;

    const s = easedP * sweeps;
    // Cosine sweep creates natural deceleration at edges
    const sweepCos = Math.cos(s * Math.PI);
    const x = width / 2 + (width / 2 - 16) * sweepCos;

    // Angle tilts with direction of horizontal movement
    const angle = -Math.sin(s * Math.PI) * 0.35;

    return { x, y, angle };
  }

  // Portrait landmark keyframes matched to Ryan's exact facial features
  // Normalized to [0..1] in 480x600 coordinate space
  const sketchKeyframes = [
    // 1. Crown & Hair volume curls (0.00 -> 0.18)
    { p: 0.0, x: 0.42, y: 0.11 },
    { p: 0.03, x: 0.52, y: 0.08 },
    { p: 0.06, x: 0.68, y: 0.12 },
    { p: 0.09, x: 0.74, y: 0.22 },
    { p: 0.12, x: 0.72, y: 0.38 },
    { p: 0.15, x: 0.65, y: 0.56 },
    { p: 0.18, x: 0.49, y: 0.68 }, // chin contour
    // 2. Left jaw, temple & forehead bangs curls (0.18 -> 0.30)
    { p: 0.21, x: 0.33, y: 0.56 },
    { p: 0.24, x: 0.27, y: 0.38 },
    { p: 0.27, x: 0.32, y: 0.18 },
    { p: 0.3, x: 0.46, y: 0.23 }, // bangs curl over forehead
    // 3. Left Eyebrow & Left Eye + Pupil (0.30 -> 0.44)
    { p: 0.33, x: 0.31, y: 0.31 },
    { p: 0.36, x: 0.37, y: 0.295 },
    { p: 0.38, x: 0.43, y: 0.31 },
    { p: 0.4, x: 0.33, y: 0.375 },
    { p: 0.42, x: 0.375, y: 0.375 }, // left pupil
    { p: 0.44, x: 0.42, y: 0.375 },
    // 4. Right Eyebrow & Right Eye + Pupil (0.44 -> 0.58)
    { p: 0.47, x: 0.55, y: 0.31 },
    { p: 0.5, x: 0.615, y: 0.295 },
    { p: 0.52, x: 0.67, y: 0.31 },
    { p: 0.54, x: 0.56, y: 0.375 },
    { p: 0.56, x: 0.615, y: 0.375 }, // right pupil
    { p: 0.58, x: 0.66, y: 0.375 },
    // 5. Nose & Smile (0.58 -> 0.72)
    { p: 0.6, x: 0.49, y: 0.36 }, // nose bridge
    { p: 0.62, x: 0.47, y: 0.44 },
    { p: 0.64, x: 0.49, y: 0.465 }, // nose tip
    { p: 0.66, x: 0.53, y: 0.46 },
    { p: 0.68, x: 0.4, y: 0.555 }, // left smile corner
    { p: 0.7, x: 0.49, y: 0.54 }, // smile teeth
    { p: 0.71, x: 0.58, y: 0.555 }, // right smile corner
    { p: 0.72, x: 0.49, y: 0.595 }, // lower lip curve
    // 6. Collar & Shirt (0.72 -> 0.86)
    { p: 0.74, x: 0.48, y: 0.72 }, // neck V
    { p: 0.77, x: 0.32, y: 0.76 }, // left collar
    { p: 0.79, x: 0.4, y: 0.83 },
    { p: 0.81, x: 0.48, y: 0.8 }, // center placket
    { p: 0.83, x: 0.58, y: 0.83 },
    { p: 0.85, x: 0.65, y: 0.76 }, // right collar
    { p: 0.86, x: 0.48, y: 0.9 }, // buttons
    // 7. Full Shading & Cross-hatching (0.86 -> 1.00)
    { p: 0.89, x: 0.25, y: 0.45 },
    { p: 0.93, x: 0.75, y: 0.45 },
    { p: 0.97, x: 0.2, y: 0.65 },
    { p: 1.0, x: 0.8, y: 0.65 },
  ];

  // Interpolate along feature keyframes with high-frequency sketching hatch vibration
  function getPencilPoint(p: number, timeSec: number, width: number, height: number) {
    const clampedP = Math.min(1, Math.max(0, p));

    // Find keyframe interval
    let idx = 0;
    while (idx < sketchKeyframes.length - 2 && sketchKeyframes[idx + 1].p < clampedP) {
      idx++;
    }

    const k1 = sketchKeyframes[idx];
    const k2 = sketchKeyframes[idx + 1];
    const span = Math.max(0.0001, k2.p - k1.p);
    const fraction = (clampedP - k1.p) / span;
    const smoothF = easeInOutCubic(Math.min(1, Math.max(0, fraction)));

    const baseX = (k1.x + (k2.x - k1.x) * smoothF) * width;
    const baseY = (k1.y + (k2.y - k1.y) * smoothF) * height;

    // Fast hatching oscillation (~8 Hz) simulating rapid artist hand strokes
    const hatchFreq = 50;
    const hatchPhase = timeSec * hatchFreq;
    const hatchAmp = 12;

    const dx = Math.sin(hatchPhase) * hatchAmp * 0.75;
    const dy = Math.sin(hatchPhase) * hatchAmp * 0.75;

    const x = baseX + dx;
    const y = baseY + dy;

    return { x, y, angle: -0.72 + Math.cos(hatchPhase) * 0.15 };
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

    const w = 48;
    const h = 26;

    // Drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, 4);
    ctx.fill();

    // Wooden handle back
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 4, w, 10, [4, 4, 0, 0]);
    ctx.fill();

    // Wood detail line
    ctx.strokeStyle = '#92400e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 5, -h / 2 + 1);
    ctx.lineTo(w / 2 - 5, -h / 2 + 1);
    ctx.stroke();

    // Thick felt eraser body
    ctx.fillStyle = '#f1f5f9';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 + 6, w, h - 6, [0, 0, 4, 4]);
    ctx.fill();

    // Felt chalky bottom edge
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 2, h / 2 - 5, w - 4, 4, [0, 0, 3, 3]);
    ctx.fill();

    // Outline
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

    // Shadow under pencil lead tip
    ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
    ctx.beginPath();
    ctx.ellipse(3, 3, 6, 2.5, 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Sharpened wooden cone
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw / 2, ph * 0.38);
    ctx.lineTo(pw / 2, ph * 0.38);
    ctx.closePath();
    ctx.fill();

    // Graphite lead tip
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw * 0.22, ph * 0.14);
    ctx.lineTo(pw * 0.22, ph * 0.14);
    ctx.closePath();
    ctx.fill();

    // Hexagonal pencil body (amber / golden rod)
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-pw / 2, ph * 0.38, pw, ph * 0.62, [0, 0, 2, 2]);
    ctx.fill();

    // Facet stripe
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(-pw * 0.2, ph * 0.38, pw * 0.4, ph * 0.62);

    // Outline
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
      p.vy += 0.035;
      p.vx *= 0.96;
      p.opacity -= 0.024;
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
      ctx.drawImage(sketchImg, 0, 0, width, height);
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

    // Pacing tuned for deliberate artistic appreciation:
    // Erase duration: ~2.4s (speed = 0.42)
    // Sketch duration: ~3.3s (speed = 0.30)
    const eraseSpeed = 0.42;
    const sketchSpeed = 0.3;

    if (targetProgress > currentVisualProgress) {
      // ERASING FORWARD (Sketch -> Photo)
      toolPos.type = 'eraser';
      toolPos.visible = true;

      const prevP = currentVisualProgress;
      currentVisualProgress = Math.min(targetProgress, currentVisualProgress + eraseSpeed * dt);

      // Smooth continuous eraser strokes
      const subSteps = 6;
      for (let s = 1; s <= subSteps; s++) {
        const p = prevP + ((currentVisualProgress - prevP) * s) / subSteps;
        const pt = getEraserPoint(p, width, height);

        // Broad chalkboard wipe
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

      const swipeDir = Math.cos(currentVisualProgress * 11 * Math.PI) < 0 ? -1 : 1;
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

        // Draw textured pencil lines tracing facial features onto mask
        maskCtx.globalCompositeOperation = 'source-over';
        // Feature line width: crisp for details, broader for shading
        const strokeW = p > 0.85 ? Math.max(30, width * 0.18) : Math.max(22, width * 0.12);
        maskCtx.lineWidth = strokeW;
        maskCtx.lineCap = 'round';
        maskCtx.lineJoin = 'round';
        maskCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';

        if (prevStrokePt) {
          maskCtx.beginPath();
          maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
          maskCtx.lineTo(pt.x, pt.y);
          maskCtx.stroke();
        }

        // Soft graphite brush dab at pencil tip
        const dabR = strokeW * 0.7;
        maskCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        maskCtx.beginPath();
        maskCtx.arc(pt.x, pt.y, dabR, 0, Math.PI * 2);
        maskCtx.fill();

        prevStrokePt = { x: pt.x, y: pt.y };
      }

      const finalPt = getPencilPoint(sketchPortion, timestamp / 1000, width, height);
      toolPos.x = finalPt.x;
      toolPos.y = finalPt.y;
      toolPos.angle = finalPt.angle;
      toolPos.jitter = (Math.random() - 0.5) * 1.5;

      spawnParticles(finalPt.x, finalPt.y, false, 0);

      // In final stage, expand full mask opacity smoothly
      if (sketchPortion > 0.88) {
        const fadeAlpha = (sketchPortion - 0.88) / 0.12;
        maskCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.25})`;
        maskCtx.fillRect(0, 0, width, height);
      }

      if (currentVisualProgress <= 0) {
        toolPos.visible = false;
        particles = [];
        prevStrokePt = null;
        initMask(true);
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

    if (targetProgress === 1 && currentVisualProgress <= 0.01) {
      initMask(true);
      prevStrokePt = null;
    } else if (targetProgress === 0 && currentVisualProgress >= 0.99) {
      initMask(false);
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
