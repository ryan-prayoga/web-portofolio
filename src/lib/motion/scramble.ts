// Teks "decrypt": karakter acak → tersingkap kiri-ke-kanan saat masuk viewport.
// Sekali jalan per mount; pasang di elemen ber-{#key locale} jika teksnya bilingual.
const GLYPHS = '█▓▒░<>/\\|=+*#01';

export function scramble(node: HTMLElement, opts: { duration?: number } = {}) {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const finalText = node.textContent ?? '';
  if (!finalText.trim()) return;
  const duration = opts.duration ?? 900;

  let raf = 0;
  const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const settled = Math.floor(p * finalText.length);
        let out = finalText.slice(0, settled);
        for (let i = settled; i < finalText.length; i++) {
          const ch = finalText[i];
          out += ch === ' ' ? ' ' : rand();
        }
        node.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
        else node.textContent = finalText;
      };
      raf = requestAnimationFrame(tick);
    },
    { threshold: 0.5 }
  );
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
      cancelAnimationFrame(raf);
    },
  };
}
