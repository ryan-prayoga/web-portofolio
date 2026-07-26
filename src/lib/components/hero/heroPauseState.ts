export type HeroPauseState = {
  readonly pageHidden: boolean;
  readonly offscreen: boolean;
  readonly paused: boolean;
};

export type HeroPauseEvent =
  | { readonly type: 'visibility-changed'; readonly pageHidden: boolean }
  | { readonly type: 'intersection-changed'; readonly offscreen: boolean };

const deriveState = (pageHidden: boolean, offscreen: boolean): HeroPauseState => ({
  pageHidden,
  offscreen,
  paused: pageHidden || offscreen,
});

export const initialHeroPauseState = (pageHidden: boolean): HeroPauseState => deriveState(pageHidden, true);

export const reduceHeroPauseState = (state: HeroPauseState, event: HeroPauseEvent): HeroPauseState => {
  switch (event.type) {
    case 'visibility-changed':
      return deriveState(event.pageHidden, state.offscreen);
    case 'intersection-changed':
      return deriveState(state.pageHidden, event.offscreen);
    default:
      throw new TypeError(`Unhandled HeroCanvas pause event: ${JSON.stringify(event satisfies never)}`);
  }
};
