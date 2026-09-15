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
   * /projects hot-links 15 of its 19 covers from imgur, and next/image will
   * only optimise a remote host that is explicitly allowed. Scoped to the
   * exact protocol, host and empty search rather than left to the implied
   * `**` wildcards, so this cannot be used to proxy arbitrary URLs.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },

  async redirects() {
    return [
      {
        // /about rendered the same component as / — two URLs, one page,
        // and duplicate content in the index. / is canonical.
        source: '/about',
        destination: '/',
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
