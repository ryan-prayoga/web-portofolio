import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

export class ArtifactError extends Error {
  /** @param {string} message */
  constructor(message) {
    super(message);
    this.name = 'ArtifactError';
  }
}

/** @param {string} buildRoot */
export async function inspectBuildArtifact(buildRoot) {
  const root = resolve(buildRoot);
  const requiredFiles = ['index.js', 'handler.js', 'env.js'];
  const requiredDirectories = ['client', 'server', 'prerendered'];

  for (const file of requiredFiles) {
    const path = resolve(root, file);
    const info = await stat(path).catch(() => undefined);
    if (!info?.isFile()) {
      throw new ArtifactError(`Missing build artifact: ${file}`);
    }
  }

  for (const directory of requiredDirectories) {
    const path = resolve(root, directory);
    const info = await stat(path).catch(() => undefined);
    if (!info?.isDirectory()) {
      throw new ArtifactError(`Missing build directory: ${directory}`);
    }
  }

  return { root, requiredFiles, requiredDirectories };
}

/** @typedef {{ file: string, imports?: string[], dynamicImports?: string[], src?: string }} ManifestEntry */

/**
 * @param {string} htmlPath
 * @param {string} manifestPath
 */
export async function inspectLazySceneBoundary(htmlPath, manifestPath) {
  const html = await readFile(resolve(htmlPath), 'utf8');
  /** @type {Record<string, ManifestEntry>} */
  const manifest = JSON.parse(await readFile(resolve(manifestPath), 'utf8'));
  const entries = Object.entries(manifest);
  const keyByFile = new Map(entries.map(([key, entry]) => [entry.file, key]));
  const initialFiles = [
    ...[...html.matchAll(/href=["']\.?\/?([^"']+\.js)["']/g)].map((match) => match[1]),
    ...[...html.matchAll(/import\(["']\.?\/?([^"']+\.js)["']\)/g)].map((match) => match[1]),
  ];
  const initialKeys = initialFiles.map((file) => keyByFile.get(file)).filter((key) => key !== undefined);
  const sceneKey = entries.find(([, entry]) => entry.src?.endsWith('/ArchipelagoScene.svelte'))?.[0];
  if (!sceneKey) {
    throw new ArtifactError('Missing dynamic ArchipelagoScene manifest entry');
  }

  /** @param {string[]} roots */
  const staticClosure = (roots) => {
    const visited = new Set();
    const pending = [...roots];
    while (pending.length > 0) {
      const key = pending.pop();
      if (!key || visited.has(key)) continue;
      visited.add(key);
      pending.push(...(manifest[key]?.imports ?? []));
    }
    return visited;
  };

  const initialClosure = staticClosure(initialKeys);
  const sceneClosure = staticClosure([sceneKey]);
  const forbiddenSceneKeys = new Set(
    [...sceneClosure].filter((key) => {
      const entry = manifest[key];
      return (
        key === sceneKey ||
        key.includes('three') ||
        entry?.src?.includes('node_modules/three') ||
        entry?.src?.includes('@threlte')
      );
    }),
  );
  const forbiddenInitialKeys = [...initialClosure].filter((key) => forbiddenSceneKeys.has(key));
  if (forbiddenInitialKeys.length > 0) {
    throw new ArtifactError(
      `Initial HTML reaches lazy Scene graph: ${forbiddenInitialKeys.map((key) => manifest[key]?.file ?? key).join(', ')}`,
    );
  }

  /** @param {string} root */
  const reachesScene = (root) => {
    const visited = new Set();
    const pending = [root];
    while (pending.length > 0) {
      const key = pending.pop();
      if (!key || visited.has(key)) continue;
      if (key === sceneKey) return true;
      visited.add(key);
      const entry = manifest[key];
      pending.push(...(entry?.imports ?? []), ...(entry?.dynamicImports ?? []));
    }
    return false;
  };
  if (!initialKeys.some(reachesScene)) {
    throw new ArtifactError('Initial application graph has no dynamic path to ArchipelagoScene');
  }

  return {
    initialFiles,
    initialKeys,
    initialClosure: [...initialClosure],
    sceneKey,
    sceneClosure: [...sceneClosure],
    forbiddenSceneKeys: [...forbiddenSceneKeys],
  };
}
