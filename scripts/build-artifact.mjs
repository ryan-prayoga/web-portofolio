import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

export class ArtifactError extends Error {
  /** @param {string} message */
  constructor(message) {
    super(message);
    this.name = 'ArtifactError';
  }
}

/**
 * Artefak adapter-static: build/ berisi halaman prerender + _app/ + salinan static/.
 * @param {string} buildRoot
 */
export async function inspectBuildArtifact(buildRoot) {
  const root = resolve(buildRoot);
  const requiredFiles = ['index.html', '404.html', 'sitemap.xml', 'robots.txt', 'freelance.html'];
  const requiredDirectories = ['_app'];

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

/**
 * Regression guard: artefak tidak boleh membawa sisa scene 3D / library motion
 * yang sudah dihapus pada redesign v4.
 * @param {string} buildRoot
 * @param {readonly string[]} [forbidden]
 */
export async function inspectForbiddenRemnants(buildRoot, forbidden = ['archipelago.json', 'ArchipelagoScene']) {
  const root = resolve(buildRoot);
  /** @type {string[]} */
  const scanned = [];

  /** @param {string} directory */
  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        await walk(path);
        continue;
      }
      if (!/\.(?:html|js|css|json)$/.test(entry.name)) continue;
      scanned.push(path);
      const contents = await readFile(path, 'utf8');
      for (const needle of forbidden) {
        if (contents.includes(needle)) {
          throw new ArtifactError(`Forbidden remnant "${needle}" found in ${path}`);
        }
      }
    }
  }

  await walk(root);
  if (scanned.length === 0) {
    throw new ArtifactError('No scannable files found in build artifact');
  }
  return { root, scanned: scanned.length, forbidden: [...forbidden] };
}
