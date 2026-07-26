import { error } from '@sveltejs/kit';
import { featuredProjects, type Project } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => featuredProjects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
  const project: Project | undefined = featuredProjects.find((candidate) => candidate.slug === params.slug);
  if (!project) error(404, 'Case study not found');
  return { project };
};
