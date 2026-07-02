// Action scrub kata-per-kata: teks "menyala" dari redup ke terang saat discroll.
// Pasang di elemen yang di-recreate saat locale ganti ({#key locale}) supaya
// SplitText selalu split teks yang benar.
export function scrubWords(node: HTMLElement) {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  let split: { revert: () => void } | undefined;
  let trigger: { kill: () => void } | undefined;
  let cancelled = false;

  (async () => {
    const { gsap, SplitText } = await import('./gsap');
    if (cancelled) return;
    const s = SplitText.create(node, { type: 'words' });
    split = s;
    const tween = gsap.fromTo(
      s.words,
      { color: 'color-mix(in srgb, #a89d92 45%, transparent)' },
      {
        color: '#ece5da',
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top 82%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );
    trigger = tween.scrollTrigger ?? undefined;
  })();

  return {
    destroy() {
      cancelled = true;
      trigger?.kill();
      split?.revert();
    },
  };
}
