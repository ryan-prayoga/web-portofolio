import { parseArchipelagoData, type ArchipelagoData } from './archipelagoData';

export type SceneStatus = 'loading' | 'ready' | 'error';
export type SceneStatusCallback = (status: SceneStatus) => void;

type Disposable = { dispose(): void };

export class HttpSceneDataError extends Error {
  readonly name = 'HttpSceneDataError';

  constructor(readonly status: number) {
    super(`archipelago request failed with HTTP ${status}`);
  }
}

export class SceneNetworkError extends Error {
  readonly name = 'SceneNetworkError';

  constructor(options: ErrorOptions) {
    super('archipelago network request failed', options);
  }
}

export class SceneJsonError extends Error {
  readonly name = 'SceneJsonError';

  constructor(options: ErrorOptions) {
    super('archipelago response contained invalid JSON', options);
  }
}

export class SceneResourceOwner implements Disposable {
  private readonly resources = new Set<Disposable>();
  private disposed = false;

  own<T extends Disposable>(resource: T): T {
    if (this.disposed) resource.dispose();
    else this.resources.add(resource);
    return resource;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    for (const resource of this.resources) resource.dispose();
    this.resources.clear();
  }
}

export async function loadArchipelagoData(fetcher: typeof fetch, signal: AbortSignal): Promise<ArchipelagoData> {
  let response: Response;
  try {
    response = await fetcher('/data/archipelago.json', { signal });
  } catch (error) {
    if (isAbortError(error)) throw error;
    throw new SceneNetworkError({ cause: error });
  }
  if (!response.ok) throw new HttpSceneDataError(response.status);
  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    throw new SceneJsonError({ cause: error });
  }
  return parseArchipelagoData(payload);
}

export function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError';
}
