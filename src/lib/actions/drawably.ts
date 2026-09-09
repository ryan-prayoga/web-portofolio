import type { Action } from 'svelte/action';
import {
  drawablyButton,
  drawablyCard,
  drawablyBadge,
  drawablyDivider,
  drawablyCheckbox,
  drawablyCircle,
  drawablyUnderline,
  type DrawablyButtonOptions,
  type DrawablyBadgeOptions,
  type DrawablyOptions,
  type Sketch,
} from 'drawably';

export interface DrawActionOptions extends DrawablyOptions {
  readonly resketchOnHover?: boolean;
}

export interface DrawButtonOptions extends DrawablyButtonOptions {
  readonly resketchOnHover?: boolean;
}

export interface DrawBadgeOptions extends DrawablyBadgeOptions {
  readonly resketchOnHover?: boolean;
}

function attachHoverResketch(node: HTMLElement, sketch: Sketch, enabled: boolean | undefined): () => void {
  if (!enabled) return () => {};
  const onMouseEnter = () => {
    sketch.resketch();
  };
  node.addEventListener('mouseenter', onMouseEnter, { passive: true });
  return () => {
    node.removeEventListener('mouseenter', onMouseEnter);
  };
}

export const drawCard: Action<HTMLElement, DrawActionOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const { resketchOnHover, ...opts } = options;
  const sketch = drawablyCard(node, opts);
  const detachHover = attachHoverResketch(node, sketch, resketchOnHover);

  return {
    update(newOptions) {
      if (!newOptions) return;
      sketch.resketch(newOptions.seed);
    },
    destroy() {
      detachHover();
      sketch.destroy();
    },
  };
};

export const drawButton: Action<HTMLElement, DrawButtonOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const { resketchOnHover, ...opts } = options;
  const sketch = drawablyButton(node, opts);
  const detachHover = attachHoverResketch(node, sketch, resketchOnHover);

  return {
    update(newOptions) {
      if (!newOptions) return;
      if (newOptions.state) {
        sketch.setState(newOptions.state);
      }
      if (newOptions.seed !== undefined) {
        sketch.resketch(newOptions.seed);
      }
    },
    destroy() {
      detachHover();
      sketch.destroy();
    },
  };
};

export const drawBadge: Action<HTMLElement, DrawBadgeOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const { resketchOnHover, ...opts } = options;
  const sketch = drawablyBadge(node, opts);
  const detachHover = attachHoverResketch(node, sketch, resketchOnHover);

  return {
    update(newOptions) {
      if (!newOptions) return;
      sketch.resketch(newOptions.seed);
    },
    destroy() {
      detachHover();
      sketch.destroy();
    },
  };
};

export const drawDivider: Action<HTMLElement, DrawActionOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const sketch = drawablyDivider(node, options);

  return {
    destroy() {
      sketch.destroy();
    },
  };
};

export const drawCheckbox: Action<HTMLElement, DrawActionOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const sketch = drawablyCheckbox(node, options);

  return {
    destroy() {
      sketch.destroy();
    },
  };
};

export const drawCircle: Action<HTMLElement, DrawActionOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const sketch = drawablyCircle(node, options);

  return {
    destroy() {
      sketch.destroy();
    },
  };
};

export const drawUnderline: Action<HTMLElement, DrawActionOptions | undefined> = (node, options = {}) => {
  if (typeof window === 'undefined') return;

  const sketch = drawablyUnderline(node, options);

  return {
    destroy() {
      sketch.destroy();
    },
  };
};
