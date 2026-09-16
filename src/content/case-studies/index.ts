import type { CaseStudy } from '../types';

/*
 * The published case studies.
 *
 * Empty deliberately. Both planned studies — the AI agent platform and the
 * Claude Code engineering guidelines — describe internal infrastructure and
 * internal engineering process at a fintech, and what is publishable about
 * either has not been settled yet. Writing them first and checking later is
 * the wrong order.
 *
 * companies.ts already carries `caseStudy` slugs on the two highlights they
 * will hang off. Timeline consults isPublished() before rendering a link, so
 * the data can be true ahead of the route existing without producing a 404.
 * Adding the entry here is what turns the link on.
 */
export const CASE_STUDIES: readonly CaseStudy[] = [];

const SLUGS = new Set(CASE_STUDIES.map((c) => c.slug));

export const isPublished = (slug: string): boolean => SLUGS.has(slug);

export const bySlug = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);
