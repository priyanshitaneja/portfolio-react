import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /*
   * Pin the workspace root. Without this, Turbopack walks up and finds the
   * package-lock.json in the parent directory — outside this git repo — and
   * infers the wrong root.
   */
  turbopack: {
    root: path.join(__dirname),
  },

  /**
   * Deliberately NOT `output: 'export'`.
   *
   * Static export silently drops `redirects()`, which would take the
   * /about -> / canonicalisation with it, and it removes the real HTTP 404
   * status from not-found.tsx. Default output on Vercel still prerenders
   * every route at build time — confirm with `○ (Static)` in the build
   * output — while keeping the redirect and status layer.
   */

  /*
   * The on-screen route indicator, bottom-left by default. Dev-only — it is
   * never part of a production build — but it sits on top of the page while
   * working on layout. `false` hides it without suppressing compile or
   * runtime error overlays.
   */
  devIndicators: false,

  /*
   * No `images.remotePatterns`. It used to allow i.imgur.com, because the old
   * /projects grid hot-linked most of its covers from there. /lab renders no
   * images at all, so the allowlist is empty again and the image optimiser
   * cannot be pointed at a third-party host. Re-adding a host is now a
   * deliberate act rather than an inherited default.
   */

  async redirects() {
    return [
      {
        // /about rendered the same component as / — two URLs, one page,
        // and duplicate content in the index. / is canonical.
        source: '/about',
        destination: '/',
        permanent: true, // 308
      },
      {
        /*
         * /projects is now /lab. Permanent, so the link equity of anything
         * already pointing at /projects transfers.
         *
         * Note that /projects must NOT stay in lighthouserc.json or the axe
         * URL list: Lighthouse follows the redirect, the `redirects` audit
         * fires, and the SEO category drops below the minScore: 1 assertion.
         * The failure reads as an unrelated regression.
         */
        source: '/projects',
        destination: '/lab',
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
