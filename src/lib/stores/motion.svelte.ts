import { SvelteSet } from 'svelte/reactivity';

type MediaQueryChangeListener = (event: MediaQueryListEvent) => void;
type MotionMediaQuery = {
  readonly matches: boolean;
  addEventListener(type: 'change', listener: MediaQueryChangeListener): void;
  removeEventListener(type: 'change', listener: MediaQueryChangeListener): void;
};
type MatchMedia = (query: string) => MotionMediaQuery;
type ReleaseMotionFlags = () => void;

export type MotionFlags = {
  readonly reduced: boolean;
  readonly coarse: boolean;
  readonly webgl: boolean | null;
  init(): ReleaseMotionFlags;
  subscribe(listener: () => void): ReleaseMotionFlags;
  probeWebgl(): boolean;
};

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_QUERY = '(pointer: coarse)';

export function createMotionFlags(matchMedia: MatchMedia): MotionFlags {
  let reduced = $state(false);
  let coarse = $state(false);
  let webgl = $state<boolean | null>(null);
  let clients = 0;
  let reducedMedia: MotionMediaQuery | undefined;
  let coarseMedia: MotionMediaQuery | undefined;
  const listeners = new SvelteSet<() => void>();

  const notify = () => {
    for (const listener of listeners) listener();
  };

  const readPreferences = () => {
    if (reducedMedia && coarseMedia) return;
    reducedMedia = matchMedia(REDUCED_QUERY);
    coarseMedia = matchMedia(COARSE_QUERY);
    reduced = reducedMedia.matches;
    coarse = coarseMedia.matches;
  };
  const snapshotClientPreferences = () => {
    if (typeof window !== 'undefined') readPreferences();
  };
  const onReducedChange = (event: MediaQueryListEvent) => {
    if (reduced === event.matches) return;
    reduced = event.matches;
    notify();
  };
  const onCoarseChange = (event: MediaQueryListEvent) => {
    if (coarse === event.matches) return;
    coarse = event.matches;
    notify();
  };

  return {
    get reduced(): boolean {
      snapshotClientPreferences();
      return reduced;
    },
    get coarse(): boolean {
      snapshotClientPreferences();
      return coarse;
    },
    get webgl(): boolean | null {
      return webgl;
    },
    init(): ReleaseMotionFlags {
      clients += 1;
      if (clients === 1) {
        readPreferences();
        reducedMedia?.addEventListener('change', onReducedChange);
        coarseMedia?.addEventListener('change', onCoarseChange);
      }

      let active = true;
      return () => {
        if (!active) return;
        active = false;
        clients -= 1;
        if (clients !== 0) return;
        reducedMedia?.removeEventListener('change', onReducedChange);
        coarseMedia?.removeEventListener('change', onCoarseChange);
        reducedMedia = undefined;
        coarseMedia = undefined;
      };
    },
    subscribe(listener: () => void): ReleaseMotionFlags {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    probeWebgl(): boolean {
      if (webgl !== null) return webgl;
      try {
        const canvas = document.createElement('canvas');
        webgl = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
      } catch (error) {
        if (error instanceof Error) {
          webgl = false;
        } else {
          throw error;
        }
      }
      return webgl;
    },
  };
}

const browserMatchMedia: MatchMedia = (query) => window.matchMedia(query);

export const motionFlags = createMotionFlags(browserMatchMedia);
