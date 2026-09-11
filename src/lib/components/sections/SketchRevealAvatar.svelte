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
    isLifting: false,
  };

  // --- ERASER MOTION (Natural diagonal chalkboard wiping) ---
  function getEraserPoint(p: number, width: number, height: number) {
    const clampedP = Math.min(1, Math.max(0, p));
    const sweeps = 8;

    // Steady top-to-bottom progression from slightly above (-15) to past the bottom (height + 35)
    const y = -15 + (height + 50) * Math.pow(clampedP, 1.05);

    // Natural rhythmic sweeping across canvas width
    const sweepPhase = clampedP * sweeps * Math.PI;
    const sweepCos = Math.cos(sweepPhase);
    const x = width / 2 + (width / 2 + 10) * sweepCos;

    // Organic eraser tilt leaning into the swipe direction
    const angle = -Math.sin(sweepPhase) * 0.16;

    return { x, y, angle };
  }

  // --- PENCIL SKETCH MOTION (13 Natural Facial Feature Strokes with Pen-Up Glides) ---
  const portraitStrokes: { x: number; y: number }[][] = [
    // 1. Hair outline & crown curls
    [
      { x: 0.28, y: 0.24 },
      { x: 0.31, y: 0.16 },
      { x: 0.4, y: 0.1 },
      { x: 0.52, y: 0.08 },
      { x: 0.66, y: 0.1 },
      { x: 0.76, y: 0.16 },
      { x: 0.78, y: 0.28 },
    ],
    // 2. Forehead bangs & curls
    [
      { x: 0.74, y: 0.25 },
      { x: 0.64, y: 0.23 },
      { x: 0.54, y: 0.25 },
      { x: 0.47, y: 0.22 },
      { x: 0.4, y: 0.26 },
      { x: 0.34, y: 0.25 },
    ],
    // 3. Left Eyebrow
    [
      { x: 0.31, y: 0.33 },
      { x: 0.37, y: 0.31 },
      { x: 0.44, y: 0.33 },
    ],
    // 4. Left Eye & Iris
    [
      { x: 0.34, y: 0.395 },
      { x: 0.39, y: 0.385 },
      { x: 0.44, y: 0.395 },
      { x: 0.39, y: 0.405 },
      { x: 0.39, y: 0.395 },
    ],
    // 5. Right Eyebrow
    [
      { x: 0.58, y: 0.33 },
      { x: 0.65, y: 0.31 },
      { x: 0.71, y: 0.33 },
    ],
    // 6. Right Eye & Iris
    [
      { x: 0.59, y: 0.385 },
      { x: 0.65, y: 0.375 },
      { x: 0.7, y: 0.385 },
      { x: 0.65, y: 0.395 },
      { x: 0.65, y: 0.385 },
    ],
    // 7. Nose Bridge & Tip
    [
      { x: 0.51, y: 0.34 },
      { x: 0.5, y: 0.42 },
      { x: 0.52, y: 0.48 },
      { x: 0.47, y: 0.48 },
      { x: 0.54, y: 0.48 },
    ],
    // 8. Smile & Lips
    [
      { x: 0.42, y: 0.54 },
      { x: 0.48, y: 0.555 },
      { x: 0.54, y: 0.545 },
      { x: 0.61, y: 0.55 },
      { x: 0.53, y: 0.58 },
      { x: 0.45, y: 0.565 },
    ],
    // 9. Jawline & Chin
    [
      { x: 0.29, y: 0.44 },
      { x: 0.33, y: 0.55 },
      { x: 0.43, y: 0.635 },
      { x: 0.53, y: 0.66 },
      { x: 0.63, y: 0.635 },
      { x: 0.71, y: 0.55 },
      { x: 0.74, y: 0.44 },
    ],
    // 10. Shirt Collar & Placket
    [
      { x: 0.33, y: 0.73 },
      { x: 0.42, y: 0.81 },
      { x: 0.52, y: 0.75 },
      { x: 0.62, y: 0.81 },
      { x: 0.7, y: 0.73 },
      { x: 0.52, y: 0.75 },
      { x: 0.52, y: 0.85 },
      { x: 0.52, y: 0.94 },
    ],
    // 11. Left hair dark shading
    [
      { x: 0.25, y: 0.28 },
      { x: 0.35, y: 0.18 },
      { x: 0.28, y: 0.34 },
      { x: 0.37, y: 0.22 },
    ],
    // 12. Right hair dark shading
    [
      { x: 0.7, y: 0.18 },
      { x: 0.79, y: 0.26 },
      { x: 0.68, y: 0.24 },
      { x: 0.77, y: 0.32 },
    ],
    // 13. Shoulder & chest shading
    [
      { x: 0.2, y: 0.8 },
      { x: 0.35, y: 0.88 },
      { x: 0.22, y: 0.88 },
      { x: 0.34, y: 0.96 },
      { x: 0.66, y: 0.86 },
      { x: 0.8, y: 0.82 },
      { x: 0.68, y: 0.94 },
      { x: 0.82, y: 0.9 },
    ],
  ];

  interface SplineSegment {
    isDrawing: boolean;
    p0: { x: number; y: number };
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    p3: { x: number; y: number };
    len: number;
    startDist: number;
  }

  const pencilSegments: SplineSegment[] = [];
  let totalPencilLength = 0;

  for (let sIdx = 0; sIdx < portraitStrokes.length; sIdx++) {
    const stroke = portraitStrokes[sIdx];
    for (let i = 0; i < stroke.length - 1; i++) {
      const p0 = stroke[Math.max(0, i - 1)];
      const p1 = stroke[i];
      const p2 = stroke[i + 1];
      const p3 = stroke[Math.min(stroke.length - 1, i + 2)];
      const dx = p2.x - p1.x;
      const dy = (p2.y - p1.y) * 1.25;
      const len = Math.hypot(dx, dy);

      pencilSegments.push({
        isDrawing: true,
        p0,
        p1,
        p2,
        p3,
        len,
        startDist: totalPencilLength,
      });
      totalPencilLength += len;
    }

    // Air reposition segment between strokes
    if (sIdx < portraitStrokes.length - 1) {
      const p1 = stroke[stroke.length - 1];
      const p2 = portraitStrokes[sIdx + 1][0];
      const dx = p2.x - p1.x;
      const dy = (p2.y - p1.y) * 1.25;
      const len = Math.max(0.04, Math.hypot(dx, dy) * 0.65);

      pencilSegments.push({
        isDrawing: false,
        p0: p1,
        p1,
        p2,
        p3: p2,
        len,
        startDist: totalPencilLength,
      });
      totalPencilLength += len;
    }
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
    const targetDist = clampedP * totalPencilLength;

    let seg = pencilSegments[0];
    for (let i = 0; i < pencilSegments.length; i++) {
      const s = pencilSegments[i];
      if (targetDist <= s.startDist + s.len || i === pencilSegments.length - 1) {
        seg = s;
        break;
      }
    }

    const localT = Math.min(1, Math.max(0, (targetDist - seg.startDist) / (seg.len || 0.001)));

    let xNorm: number;
    let yNorm: number;
    let dxNorm: number;
    let dyNorm: number;

    if (seg.isDrawing) {
      xNorm = catmullRom(seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x, localT);
      yNorm = catmullRom(seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y, localT);
      dxNorm = catmullRomDerivative(seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x, localT);
      dyNorm = catmullRomDerivative(seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y, localT);
    } else {
      // Smooth hermite air glide
      const st = localT * localT * (3 - 2 * localT);
      xNorm = seg.p1.x + (seg.p2.x - seg.p1.x) * st;
      yNorm = seg.p1.y + (seg.p2.y - seg.p1.y) * st;
      dxNorm = (seg.p2.x - seg.p1.x) * 6 * localT * (1 - localT);
      dyNorm = (seg.p2.y - seg.p1.y) * 6 * localT * (1 - localT);
    }

    const x = xNorm * width;
    const y = yNorm * height;

    // Organic hand tilt: comfortably anchored around -45° (right-handed artist grip)
    // with gentle dynamic response to drawing direction
    const strokeAngle = Math.atan2(dyNorm * height, dxNorm * width);
    let angleDev = 0;
    if (Math.hypot(dxNorm, dyNorm) > 0.001) {
      angleDev = Math.sin(strokeAngle) * 0.16;
    }
    const angle = -0.75 + angleDev; // ~ -43° ± 9°

    return {
      x,
      y,
      angle,
      isDrawing: seg.isDrawing,
    };
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

  // --- TOOL DRAWING (Classroom Chalkboard Eraser - Authentic Warm Hardwood) ---
  function drawEraserTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    const w = 54;
    const h = 26;

    // Soft drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    ctx.beginPath();
    ctx.ellipse(2, 6, w * 0.46, h * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Solid hardwood handle (natural carved amber oak)
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 5, w, 12, [5, 5, 0, 0]);
    ctx.fill();

    // Woodgrain highlight
    ctx.fillStyle = '#d97706';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 4, -h / 2 - 3, w - 8, 3.5, 1.5);
    ctx.fill();

    // Dark grip groove
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-w / 2 + 8, -h / 2 + 2);
    ctx.lineTo(w / 2 - 8, -h / 2 + 2);
    ctx.stroke();

    // Dark charcoal wool felt bottom pad
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 + 7, w, h - 7, [0, 0, 4, 4]);
    ctx.fill();

    // Felt texture stripe (slate charcoal)
    ctx.fillStyle = '#374151';
    ctx.fillRect(-w / 2 + 2, -h / 2 + 9, w - 4, 3.5);

    // Chalk dust trace along bottom rubbing edge
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.roundRect(-w / 2 + 2, h / 2 - 3, w - 4, 2.5, [0, 0, 2, 2]);
    ctx.fill();

    // Eraser outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.45)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h / 2 - 5, w, h + 5, 4);
    ctx.stroke();

    ctx.restore();
  }

  // --- TOOL DRAWING (Artist Cedar Pencil with Lift Dynamic) ---
  function drawPencilTool(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number, isLifting: boolean) {
    ctx.save();
    const liftOffset = isLifting ? -3.5 : 0;
    ctx.translate(x, y + liftOffset);
    ctx.rotate(angle);

    const pw = 8;
    const ph = 38;

    // Shadow under tip (detaches when lifted)
    const shadowDist = isLifting ? 5.5 : 2;
    ctx.fillStyle = isLifting ? 'rgba(0, 0, 0, 0.12)' : 'rgba(0, 0, 0, 0.24)';
    ctx.beginPath();
    ctx.ellipse(shadowDist, shadowDist, isLifting ? 4 : 5, 2.2, 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Natural sharpened cedar cone
    ctx.fillStyle = '#fed7aa';
    ctx.beginPath();
    ctx.moveTo(0, 0); // lead tip touches the page
    ctx.lineTo(-pw / 2, ph * 0.35);
    ctx.lineTo(pw / 2, ph * 0.35);
    ctx.closePath();
    ctx.fill();

    // Dark graphite core tip
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-pw * 0.18, ph * 0.12);
    ctx.lineTo(pw * 0.18, ph * 0.12);
    ctx.closePath();
    ctx.fill();

    // Hexagonal amber pencil barrel
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(-pw / 2, ph * 0.35, pw, ph * 0.65, [0, 0, 2, 2]);
    ctx.fill();

    // Facet highlight stripe
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(-pw * 0.16, ph * 0.35, pw * 0.32, ph * 0.65);

    // Metal ferrule ring
    ctx.fillStyle = '#64748b';
    ctx.fillRect(-pw / 2, ph - 3, pw, 3);

    // Thin crisp outline
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.38)';
    ctx.lineWidth = 0.9;
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
        drawPencilTool(ctx, toolPos.x, toolPos.y, toolPos.angle, toolPos.isLifting);
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
    // Erase duration: ~2.4s (speed = 0.41)
    // Sketch duration: ~3.4s (speed = 0.29)
    const eraseSpeed = 0.41;
    const sketchSpeed = 0.29;

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

        // Broad felt eraser wipe (width ~ 36% of canvas, approx 58px)
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.lineWidth = Math.max(48, width * 0.36);
        maskCtx.lineCap = 'round';
        maskCtx.lineJoin = 'round';

        if (prevStrokePt) {
          maskCtx.beginPath();
          maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
          maskCtx.lineTo(pt.x, pt.y);
          maskCtx.stroke();
        }

        // Soft rounded felt head dab along path
        const brushR = Math.max(30, width * 0.2);
        const grad = maskCtx.createRadialGradient(pt.x, pt.y, brushR * 0.4, pt.x, pt.y, brushR);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(0.85, 'rgba(0,0,0,0.95)');
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

        if (pt.isDrawing) {
          maskCtx.globalCompositeOperation = 'source-over';

          // 1. Crisp pencil stroke
          const strokeW = Math.max(12, width * 0.075);
          maskCtx.lineWidth = strokeW;
          maskCtx.lineCap = 'round';
          maskCtx.lineJoin = 'round';
          maskCtx.strokeStyle = 'rgba(255, 255, 255, 0.96)';

          if (prevStrokePt) {
            maskCtx.beginPath();
            maskCtx.moveTo(prevStrokePt.x, prevStrokePt.y);
            maskCtx.lineTo(pt.x, pt.y);
            maskCtx.stroke();
          }

          // 2. Soft colored pencil bloom around drawn feature
          const bloomR = Math.max(34, width * 0.22);
          const grad = maskCtx.createRadialGradient(pt.x, pt.y, bloomR * 0.2, pt.x, pt.y, bloomR);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
          grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.22)');
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          maskCtx.fillStyle = grad;
          maskCtx.beginPath();
          maskCtx.arc(pt.x, pt.y, bloomR, 0, Math.PI * 2);
          maskCtx.fill();

          prevStrokePt = { x: pt.x, y: pt.y };
        } else {
          // Pen lifted in air: break stroke line
          prevStrokePt = null;
        }
      }

      const finalPt = getPencilPoint(sketchPortion, width, height);
      toolPos.x = finalPt.x;
      toolPos.y = finalPt.y;
      toolPos.angle = finalPt.angle;
      toolPos.isLifting = !finalPt.isDrawing;

      if (finalPt.isDrawing && Math.random() < 0.25) {
        spawnParticles(finalPt.x, finalPt.y, false, 0);
      }

      // Progressive tonal wash smoothly builds up as drawing nears completion
      if (sketchPortion > 0.7) {
        const washAlpha = Math.pow((sketchPortion - 0.7) / 0.3, 1.8) * 0.22;
        maskCtx.globalCompositeOperation = 'source-over';
        maskCtx.fillStyle = `rgba(255, 255, 255, ${washAlpha})`;
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

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const isRetina = dpr > 1;
    const img = new Image();
    img.src = isRetina ? '/photo/ryan-sketch-700.webp' : '/photo/ryan-sketch-480.webp';
    img.onerror = () => {
      img.src = isRetina ? '/photo/ryan-sketch-700.jpg' : '/photo/ryan-sketch-480.jpg';
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
      <!-- Base Layer: Real Photo (Authentic original full-color portrait) -->
      <picture class="block h-full w-full overflow-hidden">
        <source type="image/avif" srcset="/photo/ryan-480.avif 1x, /photo/ryan-700.avif 2x" />
        <source type="image/webp" srcset="/photo/ryan-480.webp 1x, /photo/ryan-700.webp 2x" />
        <img
          src="/photo/ryan-480.jpg"
          srcset="/photo/ryan-480.jpg 1x, /photo/ryan-700.jpg 2x"
          alt={t.hero.photoAlt}
          width="480"
          height="600"
          class="block h-full w-full object-cover"
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
