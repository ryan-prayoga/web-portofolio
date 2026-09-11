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
  };

  // --- ERASER MOTION (Chalkboard wiping) ---
  // Constant-cadence sweeps across portrait
  function getEraserPoint(p: number, width: number, height: number) {
    const sweeps = 8;
    const clampedP = Math.min(1, Math.max(0, p));

    // Smooth sinusoidal descent from top to bottom
    const y = (0.5 - 0.5 * Math.cos(clampedP * Math.PI)) * height;

    // Steady back-and-forth cosine sweeps
    const sweepCos = Math.cos(clampedP * sweeps * Math.PI);
    const x = width / 2 + (width / 2 - 20) * sweepCos;

    // Natural tilt with horizontal movement
    const angle = -Math.sin(clampedP * sweeps * Math.PI) * 0.22;

    return { x, y, angle };
  }

  // --- PENCIL SKETCH MOTION (Catmull-Rom spline along facial landmarks) ---
  // Keypoints matching Ryan's exact curly hair, eyes, nose, smile, collar & shirt
  const portraitKeypoints = [
    { x: 0.38, y: 0.12 },
    { x: 0.5, y: 0.08 },
    { x: 0.65, y: 0.11 },
    { x: 0.74, y: 0.2 },
    { x: 0.73, y: 0.35 },
    { x: 0.67, y: 0.54 },
    { x: 0.5, y: 0.68 }, // chin
    { x: 0.33, y: 0.54 },
    { x: 0.27, y: 0.35 },
    { x: 0.33, y: 0.18 },
    { x: 0.44, y: 0.22 }, // bangs curl
    { x: 0.48, y: 0.28 },
    { x: 0.54, y: 0.23 },
    { x: 0.31, y: 0.31 }, // left brow
    { x: 0.37, y: 0.295 },
    { x: 0.43, y: 0.31 },
    { x: 0.33, y: 0.375 }, // left eye
    { x: 0.375, y: 0.375 }, // left pupil
    { x: 0.42, y: 0.375 },
    { x: 0.55, y: 0.31 }, // right brow
    { x: 0.615, y: 0.295 },
    { x: 0.67, y: 0.31 },
    { x: 0.56, y: 0.375 }, // right eye
    { x: 0.615, y: 0.375 }, // right pupil
    { x: 0.66, y: 0.375 },
    { x: 0.49, y: 0.36 }, // nose bridge
    { x: 0.47, y: 0.44 },
    { x: 0.49, y: 0.465 }, // nose tip
    { x: 0.53, y: 0.46 },
    { x: 0.4, y: 0.555 }, // left smile corner
    { x: 0.49, y: 0.54 }, // teeth
    { x: 0.58, y: 0.555 }, // right smile corner
    { x: 0.49, y: 0.595 }, // lower lip
    { x: 0.48, y: 0.72 }, // neck V
    { x: 0.32, y: 0.76 }, // left collar
    { x: 0.4, y: 0.83 },
    { x: 0.48, y: 0.8 }, // center placket
    { x: 0.58, y: 0.83 },
    { x: 0.65, y: 0.76 }, // right collar
    { x: 0.48, y: 0.9 }, // shirt buttons
    { x: 0.22, y: 0.48 }, // cheek & hair shading
    { x: 0.78, y: 0.48 },
    { x: 0.2, y: 0.7 }, // shoulder shading
    { x: 0.8, y: 0.7 },
  ];

  // Precompute chord lengths for uniform arc-length speed
  const segmentLengths: number[] = [];
  let totalSplineLength = 0;
  for (let i = 0; i < portraitKeypoints.length - 1; i++) {
    const dx = portraitKeypoints[i + 1].x - portraitKeypoints[i].x;
    const dy = (portraitKeypoints[i + 1].y - portraitKeypoints[i].y) * 1.25; // aspect weight
    const len = Math.hypot(dx, dy);
    segmentLengths.push(len);
    totalSplineLength += len;
  }

  function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const t2 = t * t;
    const t3 = t2 * t;
    return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
  }

  function catmullRomDerivative(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const t2 = t * t;
    return 0.5 * (-p0 + p2 + 2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t + 3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t2);
  }

  function getPencilPoint(p: number, width: number, height: number) {
    const clampedP = Math.min(1, Math.max(0, p));
    const targetDist = clampedP * totalSplineLength;

    let accumulated = 0;
    let seg = 0;
    for (let i = 0; i < segmentLengths.length; i++) {
      if (accumulated + segmentLengths[i] >= targetDist || i === segmentLengths.length - 1) {
        seg = i;
        break;
      }
      accumulated += segmentLengths[i];
    }

    const segLen = segmentLengths[seg] || 0.001;
    const localT = Math.min(1, Math.max(0, (targetDist - accumulated) / segLen));

    const p0 = portraitKeypoints[Math.max(0, seg - 1)];
    const p1 = portraitKeypoints[seg];
    const p2 = portraitKeypoints[Math.min(portraitKeypoints.length - 1, seg + 1)];
    const p3 = portraitKeypoints[Math.min(portraitKeypoints.length - 1, seg + 2)];

    const baseX = catmullRom(p0.x, p1.x, p2.x, p3.x, localT) * width;
    const baseY = catmullRom(p0.y, p1.y, p2.y, p3.y, localT) * height;

    const dx = catmullRomDerivative(p0.x, p1.x, p2.x, p3.x, localT) * width;
    const dy = catmullRomDerivative(p0.y, p1.y, p2.y, p3.y, localT) * height;
    const mag = Math.hypot(dx, dy) || 1;

    // Normal vector perpendicular to curve
    const nx = -dy / mag;
    const ny = dx / mag;

    // Transverse hatching motion (smooth sinusoidal oscillation along contour)
    const hatchOsc = Math.sin(clampedP * 70 * Math.PI * 2);
    const hatchAmp = 8;

    const x = baseX + nx * hatchOsc * hatchAmp;
    const y = baseY + ny * hatchOsc * hatchAmp;

    // Natural drawing tilt angle
    const tangentAngle = Math.atan2(dy, dx);
    const pencilAngle = tangentAngle - Math.PI / 4;

    return { x, y, angle: pencilAngle };
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

  // --- TOOL DRAWING (Classroom Chalkboard Eraser - NO RED/WHITE FLAG) ---
  function drawEraserTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const w = 48;
    const h = 24;

    // Soft drop shadow on chalkboard
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 3, -h / 2 + 4, w, h, 3);
    ctx.fill();

    // Solid hardwood handle (natural oak / golden amber)
    ctx.fillStyle = '#b45309'; // warm amber hardwood
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 5, w, 11, [4, 4, 0, 0]);
    ctx.fill();

    // Woodgrain highlight
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 3, -h / 2 - 3, w - 6, 3, 1);
    ctx.fill();

    // Dark grip groove
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 6, -h / 2 + 1);
    ctx.lineTo(w / 2 - 6, -h / 2 + 1);
    ctx.stroke();

    // Dark charcoal / black wool felt bottom pad (authentic classroom duster)
    ctx.fillStyle = '#1f2937'; // dark charcoal felt
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 + 6, w, h - 6, [0, 0, 3, 3]);
    ctx.fill();

    // Felt texture stripe (slate charcoal)
    ctx.fillStyle = '#374151';
    ctx.fillRect(-w / 2 + 2, -h / 2 + 8, w - 4, 3);

    // Chalk dust trace along bottom rubbing edge
    ctx.fillStyle = 'rgba(241, 245, 249, 0.45)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 2, h / 2 - 3, w - 4, 2.5, [0, 0, 2, 2]);
    ctx.fill();

    // Eraser outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 5, w, h + 5, 3);
    ctx.stroke();

    ctx.restore();
  }

  // --- TOOL DRAWING (Artist Cedar Pencil) ---
  function drawPencilTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const pw = 8;
    const ph = 36;

    // Soft graphite shadow under tip
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.beginPath();
    ctx.ellipse(2, 2, 5, 2.2, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Sharpened natural cedar cone
    ctx.fillStyle = '#fed7aa'; // light cedar wood
    ctx.beginPath();
    ctx.moveTo(0, 0); // graphite tip touches paper
    ctx.lineTo(-pw / 2, ph * 0.36);
    ctx.lineTo(pw / 2, ph * 0.36);
    ctx.closePath();
    ctx.fill();

    // Dark graphite core lead tip
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw * 0.2, ph * 0.13);
    ctx.lineTo(pw * 0.2, ph * 0.13);
    ctx.closePath();
    ctx.fill();

    // Hexagonal amber pencil barrel
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-pw / 2, ph * 0.36, pw, ph * 0.64, [0, 0, 2, 2]);
    ctx.fill();

    // Facet highlight stripe
    ctx.fillStyle = '#fde68a';
    ctx.fillRect(-pw * 0.18, ph * 0.36, pw * 0.36, ph * 0.64);

    // Pencil barrel ferrule / back band
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-pw / 2, ph - 3, pw, 3);

    // Pencil contour outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)';
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw / 2, ph * 0.36);
    ctx.lineTo(-pw / 2, ph);
    ctx.lineTo(pw / 2, ph);
    ctx.lineTo(pw / 2, ph * 0.36);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  function spawnParticles(x: number, y: number, isEraser: boolean, dirX: number) {
    const count = isEraser ? 2 : 1;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * (isEraser ? 26 : 10),
        y: y + (Math.random() - 0.5) * (isEraser ? 14 : 6),
        vx: dirX * (Math.random() * 1.2 + 0.4) + (Math.random() - 0.5) * 1.6,
        vy: isEraser ? Math.random() * 1.8 - 0.6 : Math.random() * 1.2 - 0.3,
        size: Math.random() * 1.8 + 0.7,
        opacity: 0.85,
        color: isEraser ? 'rgba(240, 245, 255, ALPHA)' : 'rgba(55, 65, 81, ALPHA)',
      });
    }
  }

  function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.025;
      p.vx *= 0.96;
      p.opacity -= 0.02;
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
        drawPencilTool(ctx, toolPos.x, toolPos.y, toolPos.angle);
      }
    }
  }

  function step(timestamp: number) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
    lastTimestamp = timestamp;

    if (!canvasEl || !maskCanvas || !maskCtx) return;
    const width = canvasEl.width;
    const height = canvasEl.height;

    // Calm, luxurious pacing:
    // Erase duration: ~2.4s (speed = 0.42)
    // Sketch duration: ~3.2s (speed = 0.31)
    const eraseSpeed = 0.42;
    const sketchSpeed = 0.31;

    if (targetProgress > currentVisualProgress) {
      // --- ERASING FORWARD (Sketch -> Photo) ---
      toolPos.type = 'eraser';
      toolPos.visible = true;

      const prevP = currentVisualProgress;
      currentVisualProgress = Math.min(targetProgress, currentVisualProgress + eraseSpeed * dt);

      // Smooth continuous eraser stroke sub-sampling
      const subSteps = 8;
      for (let s = 1; s <= subSteps; s++) {
        const p = prevP + ((currentVisualProgress - prevP) * s) / subSteps;
        const pt = getEraserPoint(p, width, height);

        // Broad felt eraser wipe (width ~46px)
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.lineWidth = Math.max(38, width * 0.23);
        maskCtx.lineCap = 'round';
        maskCtx.lineJoin = 'round';

        if (prevStrokePt) {
          maskCtx.beginPath();
          maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
          maskCtx.lineTo(pt.x, pt.y);
          maskCtx.stroke();
        }

        // Soft circular eraser head dab
        const brushR = Math.max(26, width * 0.15);
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

      const swipeDir = Math.cos(currentVisualProgress * 8 * Math.PI) < 0 ? -1 : 1;
      spawnParticles(finalPt.x, finalPt.y, true, swipeDir);

      if (currentVisualProgress >= 1) {
        toolPos.visible = false;
        particles = [];
        prevStrokePt = null;
      }
    } else if (targetProgress < currentVisualProgress) {
      // --- SKETCHING BACKWARD (Photo -> Sketch) ---
      toolPos.type = 'pencil';
      toolPos.visible = true;

      const prevP = currentVisualProgress;
      currentVisualProgress = Math.max(targetProgress, currentVisualProgress - sketchSpeed * dt);

      // In sketching mode, sketchPortion goes 0 -> 1
      const sketchPortion = 1 - currentVisualProgress;
      const prevSketchPortion = 1 - prevP;

      const subSteps = 8;
      for (let s = 1; s <= subSteps; s++) {
        const p = prevSketchPortion + ((sketchPortion - prevSketchPortion) * s) / subSteps;
        const pt = getPencilPoint(p, width, height);

        // Draw textured pencil lines tracing facial features onto mask
        maskCtx.globalCompositeOperation = 'source-over';
        const strokeW = p > 0.86 ? Math.max(32, width * 0.18) : Math.max(24, width * 0.13);
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

        const dabR = strokeW * 0.7;
        maskCtx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        maskCtx.beginPath();
        maskCtx.arc(pt.x, pt.y, dabR, 0, Math.PI * 2);
        maskCtx.fill();

        prevStrokePt = { x: pt.x, y: pt.y };
      }

      const finalPt = getPencilPoint(sketchPortion, width, height);
      toolPos.x = finalPt.x;
      toolPos.y = finalPt.y;
      toolPos.angle = finalPt.angle;

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
