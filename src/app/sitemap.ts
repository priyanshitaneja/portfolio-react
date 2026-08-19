import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.priyanshitaneja.com';

/*
 * Lists the four real routes only.
 *
 * Not /about — it 308s to / and listing a redirect in a sitemap is a crawl
 * error. Not /products — the route no longer exists. Not the 404.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-19');

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/work`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
