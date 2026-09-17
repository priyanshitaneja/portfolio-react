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
      /*
       * The site is one document now, so /work, /lab and /contact are
       * sections rather than routes. Each redirects to / permanently.
       *
       * They do NOT redirect to /#work and friends: a fragment never reaches
       * the server, so a redirect cannot preserve one. The browser lands at
       * the top of the document, which for a page this size is the honest
       * outcome rather than a broken-feeling jump.
       *
       * None of these may stay in lighthouserc.json or the axe URL list.
       * Lighthouse follows the redirect, the `redirects` audit fires, and SEO
       * drops below the minScore: 1 assertion — which reads as an unrelated
       * regression rather than as this.
       */
      { source: '/projects', destination: '/', permanent: true },
      { source: '/work', destination: '/', permanent: true },
      { source: '/lab', destination: '/', permanent: true },
      { source: '/contact', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
