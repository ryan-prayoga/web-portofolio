import { describe, expect, it, vi } from 'vitest';
import {
  HttpSceneDataError,
  SceneJsonError,
  SceneNetworkError,
  SceneResourceOwner,
  loadArchipelagoData,
} from '../../src/lib/components/three/sceneLifecycle';

const payload = {
  bounds: [95.2, -10.9, 141, 5.9],
  step: 0.18,
  count: 1,
  points: [0, 32767, 255],
};

describe('loadArchipelagoData', () => {
  it('loads and parses a successful response', async () => {
    // Given
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(payload)));

    // When
    const data = await loadArchipelagoData(fetcher, new AbortController().signal);

    // Then
    expect(data).toEqual(payload);
  });

  it('rejects a non-success response with typed HTTP context', async () => {
    // Given
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('failure', { status: 500 }));

    // When
    const request = loadArchipelagoData(fetcher, new AbortController().signal);

    // Then
    await expect(request).rejects.toMatchObject({ status: 500 });
    await expect(request).rejects.toBeInstanceOf(HttpSceneDataError);
  });

  it('rejects malformed JSON', async () => {
    // Given
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response('{'));

    // When
    const request = loadArchipelagoData(fetcher, new AbortController().signal);

    // Then
    await expect(request).rejects.toBeInstanceOf(SceneJsonError);
    await expect(request).rejects.toMatchObject({ cause: expect.any(SyntaxError) });
  });

  it('wraps a network rejection while preserving its cause', async () => {
    // Given
    const cause = new TypeError('network unavailable');
    const fetcher = vi.fn<typeof fetch>().mockRejectedValue(cause);

    // When
    const request = loadArchipelagoData(fetcher, new AbortController().signal);

    // Then
    await expect(request).rejects.toBeInstanceOf(SceneNetworkError);
    await expect(request).rejects.toMatchObject({ cause });
  });

  it('rejects malformed schema', async () => {
    // Given
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({ count: 1 })));

    // When / Then
    await expect(loadArchipelagoData(fetcher, new AbortController().signal)).rejects.toThrow('bounds');
  });

  it('forwards the cancellation signal and preserves AbortError', async () => {
    // Given
    const controller = new AbortController();
    const fetcher = vi.fn<typeof fetch>().mockImplementation((_input, init) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
      });
    });

    // When
    const request = loadArchipelagoData(fetcher, controller.signal);
    controller.abort();

    // Then
    await expect(request).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetcher.mock.calls[0]?.[1]?.signal).toBe(controller.signal);
  });
});

describe('SceneResourceOwner', () => {
  it('disposes every owned resource exactly once across repeated cleanup', () => {
    // Given
    const disposals = Array.from({ length: 7 }, () => vi.fn());
    const owner = new SceneResourceOwner();
    disposals.forEach((dispose) => owner.own({ dispose }));

    // When
    owner.dispose();
    owner.dispose();

    // Then
    expect(disposals.every((dispose) => dispose.mock.calls.length === 1)).toBe(true);
  });

  it('disposes a late replacement immediately without double-disposal', () => {
    // Given
    const dispose = vi.fn();
    const owner = new SceneResourceOwner();
    owner.dispose();

    // When
    owner.own({ dispose });
    owner.dispose();

    // Then
    expect(dispose).toHaveBeenCalledOnce();
  });
});
