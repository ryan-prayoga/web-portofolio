// Angka menghitung naik saat masuk viewport. Format didukung: "4+", "11+", "5".
export function countUp(node: HTMLElement, opts: { duration?: number } = {}) {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  const original = node.textContent ?? '';
  const match = original.match(/^(\d+)(.*)$/);
  if (!match) return;
  const target = parseInt(match[1], 10);
  const suffix = match[2];
  const duration = opts.duration ?? 1400;

  let raf = 0;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      node.textContent = `0${suffix}`;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = `${Math.round(eased * target)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    { threshold: 0.6 }
  );
  io.observe(node);

  return {
    destroy() {
      io.disconnect();
      cancelAnimationFrame(raf);
    },
  };
}
