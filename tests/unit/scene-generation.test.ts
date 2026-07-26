import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { SceneGeneration, type SceneGenerationResult } from '../../src/lib/components/three/sceneGeneration';
import { HttpSceneDataError } from '../../src/lib/components/three/sceneLifecycle';

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  let reject: (reason: unknown) => void = () => undefined;
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  return { promise, reject, resolve };
}

describe('SceneGeneration', () => {
  it('prevents stale successful completion from publishing ready or state', async () => {
    // Given
    const load = deferred<SceneGenerationResult>();
    const publish = vi.fn();
    const generation = new SceneGeneration(new AbortController(), publish);
    const run = generation.run(() => load.promise);

    // When
    generation.dispose();
    load.resolve({
      archPoints: new THREE.Points(),
      beaconPoints: new THREE.Points(),
      hqWorld: [1, 0, 2],
    });
    await run;

    // Then
    expect(publish).not.toHaveBeenCalled();
  });

  it('handles expected load errors as error status', async () => {
    // Given
    const publish = vi.fn();
    const generation = new SceneGeneration(new AbortController(), publish);

    // When
    await generation.run(() => Promise.reject(new HttpSceneDataError(500)));

    // Then
    expect(publish).toHaveBeenCalledWith({ kind: 'error', error: expect.any(HttpSceneDataError) });
  });

  it('does not publish error for AbortError after disposal', async () => {
    // Given
    const load = deferred<SceneGenerationResult>();
    const publish = vi.fn();
    const generation = new SceneGeneration(new AbortController(), publish);
    const run = generation.run(() => load.promise);

    // When
    generation.dispose();
    load.reject(new DOMException('aborted', 'AbortError'));
    await run;

    // Then
    expect(publish).not.toHaveBeenCalled();
  });

  it('propagates unexpected programmer errors while cleanup stays idempotent', async () => {
    // Given
    const controller = new AbortController();
    const publish = vi.fn();
    const generation = new SceneGeneration(controller, publish);
    const defect = new RangeError('factory defect');

    // When / Then
    await expect(generation.run(() => Promise.reject(defect))).rejects.toBe(defect);
    generation.dispose();
    generation.dispose();
    expect(controller.signal.aborted).toBe(true);
    expect(publish).not.toHaveBeenCalled();
  });
});
