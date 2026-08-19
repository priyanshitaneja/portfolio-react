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
