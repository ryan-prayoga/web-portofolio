import { describe, expect, it } from 'vitest';
import { GET } from '../../src/routes/sitemap.xml/+server';
import { entries, load } from '../../src/routes/work/[slug]/+page';
import { featuredProjects, projects } from '../../src/lib/data/projects';

const asLoadEvent = (slug: string) => ({ params: { slug } }) as never;

describe('sitemap.xml endpoint', () => {
  it('serves well-formed XML with the correct content type and cache policy', async () => {
    const response = await GET({} as never);

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('application/xml');
    expect(response.headers.get('cache-control')).toBe('public, max-age=3600');

    const xml = await response.text();
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
    // <lastmod> palsu = sinyal freshness bohong; kontraknya memang absen.
    expect(xml).not.toContain('<lastmod>');
  });

  it('lists the home page, freelance page, and every featured case study exactly once', async () => {
    const xml = await (await GET({} as never)).text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

    expect(locs).toEqual([
      'https://ryanprayoga.dev/',
      'https://ryanprayoga.dev/freelance',
      ...featuredProjects.map((project) => `https://ryanprayoga.dev/work/${project.slug}`),
    ]);
    expect(new Set(locs).size).toBe(locs.length);
    for (const loc of locs) {
      expect(new URL(loc).origin).toBe('https://ryanprayoga.dev');
    }
  });

  it('never advertises a non-featured project that has no case study page', async () => {
    const xml = await (await GET({} as never)).text();
    const nonFeatured = projects.filter(
      (project) => !featuredProjects.some((featured) => featured.slug === project.slug),
    );

    expect(nonFeatured.length).toBeGreaterThan(0);
    for (const project of nonFeatured) {
      expect(xml).not.toContain(`/work/${project.slug}<`);
    }
  });
});

describe('work/[slug] page loader', () => {
  it('prerenders exactly one entry per featured project', () => {
    expect(entries()).toEqual(featuredProjects.map((project) => ({ slug: project.slug })));
  });

  it('resolves the matching project for every prerendered slug', () => {
    for (const project of featuredProjects) {
      expect(load(asLoadEvent(project.slug))).toEqual({ project });
    }
  });

  it('throws a 404 instead of rendering an empty shell for an unknown slug', () => {
    expect(() => load(asLoadEvent('slug-yang-tidak-ada'))).toThrowError();
    try {
      load(asLoadEvent('slug-yang-tidak-ada'));
    } catch (thrown) {
      expect((thrown as { status: number }).status).toBe(404);
    }
  });

  it('throws a 404 for a project that exists but is not featured', () => {
    const nonFeatured = projects.find(
      (project) => !featuredProjects.some((featured) => featured.slug === project.slug),
    );
    expect(nonFeatured).toBeDefined();

    try {
      load(asLoadEvent(nonFeatured!.slug));
      throw new Error('expected a 404');
    } catch (thrown) {
      expect((thrown as { status: number }).status).toBe(404);
    }
  });
});
