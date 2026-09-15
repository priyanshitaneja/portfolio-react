import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

/*
 * Unit tests only. Vitest cannot render async Server Components, but nothing
 * here is one — every component under test is either synchronous or a client
 * component. The behaviour that genuinely needs a browser (the loader actually
 * unmounting, a theme surviving a reload) is not faked here; CI covers the
 * rendered output through Lighthouse and axe instead.
 *
 * tsconfigPaths is what resolves the `@/` alias, so tests import components by
 * the same specifier the app does.
 */
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    restoreMocks: true,
  },
});
