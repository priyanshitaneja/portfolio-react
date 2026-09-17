import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.priyanshitaneja.com';

/*
 * One URL, because there is one page.
 *
 * /about, /projects, /work, /lab and /contact all 308 here. Listing a
 * redirect in a sitemap is a crawl error, so none of them belong. The 404
 * does not either.
 *
 * Case study pages get added here as they are published; they are the only
 * routes planned beyond this one.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date('2026-09-17'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
