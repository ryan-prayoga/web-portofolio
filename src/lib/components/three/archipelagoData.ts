export type ArchipelagoData = {
  readonly bounds: readonly [number, number, number, number];
  readonly step: number;
  readonly count: number;
  readonly points: readonly number[];
};

export class ArchipelagoDataError extends Error {
  readonly name = 'ArchipelagoDataError';

  constructor(
    readonly path: string,
    detail: string,
  ) {
    super(`${path}: ${detail}`);
  }
}

function finiteNumber(value: unknown, path: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new ArchipelagoDataError(path, 'expected a finite number');
  }
  return value;
}

function quantizedInteger(value: unknown, path: string, maximum: number): number {
  const number = finiteNumber(value, path);
  if (!Number.isInteger(number) || number < 0 || number > maximum) {
    throw new ArchipelagoDataError(path, `expected an integer from 0 to ${maximum}`);
  }
  return number;
}

export function parseArchipelagoData(value: unknown): ArchipelagoData {
  if (typeof value !== 'object' || value === null) {
    throw new ArchipelagoDataError('payload', 'expected an object');
  }
  if (!('bounds' in value) || !Array.isArray(value.bounds) || value.bounds.length !== 4) {
    throw new ArchipelagoDataError('bounds', 'expected exactly four numbers');
  }
  const minLon = finiteNumber(value.bounds[0], 'bounds[0]');
  const minLat = finiteNumber(value.bounds[1], 'bounds[1]');
  const maxLon = finiteNumber(value.bounds[2], 'bounds[2]');
  const maxLat = finiteNumber(value.bounds[3], 'bounds[3]');
  if (minLon >= maxLon || minLat >= maxLat) {
    throw new ArchipelagoDataError('bounds', 'minimums must be less than maximums');
  }
  if (!('step' in value)) throw new ArchipelagoDataError('step', 'expected a positive finite number');
  const step = finiteNumber(value.step, 'step');
  if (step <= 0) throw new ArchipelagoDataError('step', 'expected a positive finite number');
  if (!('count' in value)) throw new ArchipelagoDataError('count', 'expected a nonnegative integer');
  const count = finiteNumber(value.count, 'count');
  if (!Number.isInteger(count) || count < 0) {
    throw new ArchipelagoDataError('count', 'expected a nonnegative integer');
  }
  if (!('points' in value) || !Array.isArray(value.points)) {
    throw new ArchipelagoDataError('points', 'expected an array');
  }
  if (value.points.length !== count * 3) {
    throw new ArchipelagoDataError('points.length', `expected ${count * 3}`);
  }
  const points = value.points.map((point, index) => {
    const channel = index % 3;
    return quantizedInteger(point, `points[${index}]`, channel === 2 ? 255 : 32767);
  });
  return { bounds: [minLon, minLat, maxLon, maxLat], step, count, points };
}

export function parsePointBudget(value: unknown): number {
  const budget = finiteNumber(value, 'pointBudget');
  if (!Number.isInteger(budget) || budget <= 0) {
    throw new ArchipelagoDataError('pointBudget', 'expected a positive integer');
  }
  return budget;
}
