import { describe, expect, it } from 'vitest';
import { reroute } from '../../src/hooks';

describe('SvelteKit universal reroute hook', () => {
  it('maps root / to /freelance for production subdomain freelance.ryanprayoga.dev', () => {
    const url = new URL('https://freelance.ryanprayoga.dev/');
    const result = reroute({ url, fetch });
    expect(result).toBe('/freelance');
  });

  it('maps root / to /freelance for local testing freelance.localhost', () => {
    const url = new URL('http://freelance.localhost:5173/');
    const result = reroute({ url, fetch });
    expect(result).toBe('/freelance');
  });

  it('leaves main domain ryanprayoga.dev untouched', () => {
    const url = new URL('https://ryanprayoga.dev/');
    const result = reroute({ url, fetch });
    expect(result).toBeUndefined();
  });

  it('leaves localhost:5173 untouched', () => {
    const url = new URL('http://localhost:5173/');
    const result = reroute({ url, fetch });
    expect(result).toBeUndefined();
  });

  it('leaves explicit /freelance path untouched on main domain', () => {
    const url = new URL('https://ryanprayoga.dev/freelance');
    const result = reroute({ url, fetch });
    expect(result).toBeUndefined();
  });

  it('leaves non-root path untouched on freelance domain', () => {
    const url = new URL('https://freelance.ryanprayoga.dev/some-asset.png');
    const result = reroute({ url, fetch });
    expect(result).toBeUndefined();
  });
});
