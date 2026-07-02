// Scroll-driven card stack — adaptasi dari Svelte Bits ScrollStack
// (https://sveltebits.xyz/components/scroll-stack), dimodifikasi:
// - TANPA instance Lenis sendiri (nebeng Lenis global dari layout; Lenis
//   window-mode tetap memicu event scroll native)
// - offset layout di-cache dan dikoreksi dari translateY yang sedang
//   diterapkan, supaya pengukuran rect tidak terkontaminasi transform
// - no-op saat prefers-reduced-motion (kartu jadi list statis)

export interface ScrollStackOptions {
  /** jarak antar kartu sebelum menumpuk (px) */
  itemDistance?: number;
  /** pengurang skala per-kedalaman kartu */
  itemScale?: number;
  /** offset tumpukan antar kartu (px) */
  itemStackDistance?: number;
  /** posisi pin dari atas viewport (fraksi tinggi viewport) */
  stackPosition?: number;
  /** posisi selesai mengecil (fraksi tinggi viewport) */
  scaleEndPosition?: number;
  /** skala kartu paling belakang */
  baseScale?: number;
  /** blur per-kedalaman kartu tertutup (px), 0 = mati */
  blurAmount?: number;
}

export function scrollStack(node: HTMLElement, options: ScrollStackOptions = {}) {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const {
    itemDistance = 48,
    itemScale = 0.035,
    itemStackDistance = 26,
    stackPosition = 0.16,
    scaleEndPosition = 0.08,
    baseScale = 0.86,
    blurAmount = 1,
  } = options;

  const cards = Array.from(node.querySelectorAll<HTMLElement>('.stack-card'));
  if (!cards.length) return;

  // step scale per kartu — dibatasi supaya kartu ke-N (terakhir) gak pernah
  // nembus scale 1 duluan. itemScale tetap (0.035) bikin kartu tengah/akhir
  // mentok di 1 kalau kartunya banyak (9 kartu → mentok dari kartu ke-5),
  // jadi yang numpuk di belakang gak ngecil lagi sama sekali pas discroll.
  const scaleStep = Math.min(itemScale, (1 - baseScale) / Math.max(1, cards.length - 1));

  const applied = new Map<number, { translateY: number; scale: number; blur: number }>();
  let raf = 0;
  let queued = false;

  cards.forEach((card, i) => {
    if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
    card.style.willChange = 'transform, filter';
    card.style.transformOrigin = 'top center';
    card.style.backfaceVisibility = 'hidden';
  });

  const layoutTop = (el: HTMLElement, i: number) =>
    el.getBoundingClientRect().top + window.scrollY - (applied.get(i)?.translateY ?? 0);

  const progress = (v: number, start: number, end: number) =>
    v < start ? 0 : v > end ? 1 : (v - start) / (end - start);

  function update() {
    queued = false;
    const scrollTop = window.scrollY;
    const vh = window.innerHeight;
    const stackPx = stackPosition * vh;
    const scaleEndPx = scaleEndPosition * vh;
    const endEl = node.querySelector<HTMLElement>('.stack-end');
    const endTop = endEl ? layoutTop(endEl, -1) : 0;
    const pinEnd = endTop - vh / 2;

    const tops = cards.map((c, i) => layoutTop(c, i));

    let topIdx = 0;
    for (let j = 0; j < cards.length; j++) {
      if (scrollTop >= tops[j] - stackPx - itemStackDistance * j) topIdx = j;
    }

    cards.forEach((card, i) => {
      const cardTop = tops[i];
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;

      const sp = progress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * scaleStep;
      const scale = 1 - sp * (1 - targetScale);
      const blur = blurAmount && i < topIdx ? (topIdx - i) * blurAmount : 0;

      let translateY = 0;
      if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }
      // clamp — pin-release freeze value (terutama di viewport pendek/mobile,
      // vh gede + itemStackDistance*i numpuk) bisa lebih gede dari sisa ruang
      // trailing, bikin kartu permanen nyerempet ke section berikutnya.
      // Jangan biarkan kartu (natural bottom + translateY) lewatin .stack-end.
      const maxTranslateY = endTop - (cardTop + card.offsetHeight);
      if (translateY > maxTranslateY) translateY = maxTranslateY;

      const next = {
        // dibulatkan ke integer px — nilai subpixel bikin sliver kartu
        // tertumpuk di belakang "bergetar" (shimmer AA) pas discroll
        translateY: Math.round(translateY),
        scale: Math.round(scale * 1000) / 1000,
        blur: Math.round(blur * 100) / 100,
      };
      const last = applied.get(i);
      const changed =
        !last ||
        last.translateY !== next.translateY ||
        Math.abs(last.scale - next.scale) > 0.001 ||
        Math.abs(last.blur - next.blur) > 0.1;
      if (changed) {
        card.style.transform = `translate3d(0, ${next.translateY}px, 0) scale(${next.scale})`;
        card.style.filter = next.blur > 0 ? `blur(${next.blur}px)` : '';
        applied.set(i, next);
      }
    });
  }

  function requestUpdate() {
    if (queued) return;
    queued = true;
    raf = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  // layout bisa bergeser saat font/gambar/pin-spacer hero masuk
  const ro = new ResizeObserver(requestUpdate);
  ro.observe(document.body);
  update();

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      ro.disconnect();
      applied.clear();
    },
  };
}
