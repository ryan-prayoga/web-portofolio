import { ArchipelagoDataError } from './archipelagoData';
import type * as THREE from 'three';
import { HttpSceneDataError, SceneJsonError, SceneNetworkError } from './sceneLifecycle';

export type SceneGenerationResult = {
  readonly archPoints: THREE.Points;
  readonly beaconPoints: THREE.Points;
  readonly hqWorld: readonly [number, number, number];
};

export type SceneGenerationEvent =
  | { readonly kind: 'ready'; readonly result: SceneGenerationResult }
  | { readonly kind: 'error'; readonly error: ExpectedSceneLoadError };

export type ExpectedSceneLoadError = HttpSceneDataError | SceneNetworkError | SceneJsonError | ArchipelagoDataError;

export function isExpectedSceneLoadError(error: unknown): error is ExpectedSceneLoadError {
  return (
    error instanceof HttpSceneDataError ||
    error instanceof SceneNetworkError ||
    error instanceof SceneJsonError ||
    error instanceof ArchipelagoDataError
  );
}

export class SceneGeneration {
  private active = true;

  constructor(
    private readonly controller: AbortController,
    private readonly publish: (event: SceneGenerationEvent) => void,
  ) {}

  async run(load: () => Promise<SceneGenerationResult>): Promise<void> {
    try {
      const result = await load();
      if (this.active && !this.controller.signal.aborted) this.publish({ kind: 'ready', result });
    } catch (error) {
      await new Promise<void>((resolve) => globalThis.setTimeout(resolve, 0));
      if (!this.active || this.controller.signal.aborted) return;
      if (isExpectedSceneLoadError(error)) {
        this.publish({ kind: 'error', error });
        return;
      }
      throw error;
    }
  }

  dispose(): void {
    if (!this.active) return;
    this.active = false;
    this.controller.abort();
  }
}
