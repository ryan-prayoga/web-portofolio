// Action magnetic hover: elemen tertarik ke pointer, balik elastis saat leave.
export function magnetic(node: HTMLElement, strength = 0.32) {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  ) {
    return;
  }

  let cancelled = false;
  let cleanup: (() => void) | undefined;

  (async () => {
    const { gsap } = await import('./gsap');
    if (cancelled) return;

    const qx = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power3.out' });
    const qy = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      qx(dx * strength);
      qy(dy * strength);
    };
    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' });
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    cleanup = () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      gsap.set(node, { x: 0, y: 0 });
    };
  })();

  return {
    destroy() {
      cancelled = true;
      cleanup?.();
    },
  };
}
