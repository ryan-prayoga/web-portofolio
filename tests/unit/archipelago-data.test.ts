import { describe, expect, it } from 'vitest';
import {
  ArchipelagoDataError,
  parseArchipelagoData,
  parsePointBudget,
} from '../../src/lib/components/three/archipelagoData';

const validPayload = {
  bounds: [95.2, -10.9, 141, 5.9],
  step: 0.18,
  count: 2,
  points: [0, 32767, 0, 32767, 0, 255],
};

describe('parseArchipelagoData', () => {
  it('parses a valid quantized payload', () => {
    // Given / When
    const parsed = parseArchipelagoData(validPayload);

    // Then
    expect(parsed).toEqual(validPayload);
  });

  it.each([
    ['object', null, 'payload'],
    ['bounds array', { ...validPayload, bounds: 'invalid' }, 'bounds'],
    ['four bounds', { ...validPayload, bounds: [1, 2, 3] }, 'bounds'],
    ['finite bounds', { ...validPayload, bounds: [95.2, -10.9, Number.NaN, 5.9] }, 'bounds'],
    ['ordered longitude bounds', { ...validPayload, bounds: [141, -10.9, 95.2, 5.9] }, 'bounds'],
    ['ordered latitude bounds', { ...validPayload, bounds: [95.2, 5.9, 141, -10.9] }, 'bounds'],
    ['positive finite step', { ...validPayload, step: 0 }, 'step'],
    ['integer count', { ...validPayload, count: 1.5 }, 'count'],
    ['nonnegative count', { ...validPayload, count: -1 }, 'count'],
    ['points array', { ...validPayload, points: 'invalid' }, 'points'],
    ['exact points length', { ...validPayload, points: [0, 0, 0] }, 'points.length'],
    ['numeric points', { ...validPayload, points: [0, 0, 0, 1, '2', 3] }, 'points[4]'],
    ['finite points', { ...validPayload, points: [0, 0, 0, 1, Number.POSITIVE_INFINITY, 3] }, 'points[4]'],
    ['integer x coordinate', { ...validPayload, points: [0.5, 0, 0, 1, 2, 3] }, 'points[0]'],
    ['x coordinate range', { ...validPayload, points: [32768, 0, 0, 1, 2, 3] }, 'points[0]'],
    ['y coordinate range', { ...validPayload, points: [0, -1, 0, 1, 2, 3] }, 'points[1]'],
    ['integer brightness', { ...validPayload, points: [0, 0, 0.5, 1, 2, 3] }, 'points[2]'],
    ['brightness range', { ...validPayload, points: [0, 0, 256, 1, 2, 3] }, 'points[2]'],
  ])('rejects an invalid %s with a specific path', (_label, payload, path) => {
    // Given / When
    const parse = () => parseArchipelagoData(payload);

    // Then
    expect(parse).toThrow(ArchipelagoDataError);
    expect(parse).toThrow(path);
  });
});

describe('parsePointBudget', () => {
  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])('rejects invalid budget %s', (budget) => {
    // Given / When / Then
    expect(() => parsePointBudget(budget)).toThrow('pointBudget');
  });

  it('accepts a positive integer budget', () => {
    // Given / When / Then
    expect(parsePointBudget(2500)).toBe(2500);
  });
});
