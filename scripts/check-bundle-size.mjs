#!/usr/bin/env node
/**
 * Bundle size budget.
 *
 * Asserts gzipped client bundle sizes against committed thresholds, so later
 * visual work cannot silently regress performance. Thresholds are set from
 * measured values with deliberate headroom — see BUDGET below.
 *
 * Run after `next build`:  node scripts/check-bundle-size.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const CHUNKS = '.next/static/chunks';
const MEDIA = '.next/static/media';

/*
 * The header block here used to quote 205.7 kB of client JS and 8.5 kB of CSS.
 * Both were stale — dropping GSAP lowered the JS and nobody updated the
 * comment — which matters, because a budget nobody can reconcile against a
 * real measurement stops being read.
 *
 * Measured on origin/main immediately before the redesign:
 *   client JS     188.5 kB gzip
 *   client CSS      8.6 kB gzip
 *   largest chunk  69.7 kB gzip  (react-dom)
 *   preloaded fonts 115.1 kB     (EB Garamond roman + italic, Cinzel)
 *
 * Measured now:
 *   client JS     183.8 kB gzip
 *   client CSS      5.2 kB gzip
 *   largest chunk  69.7 kB gzip
 *   preloaded fonts 57.8 kB      (EB Garamond roman, Instrument Serif)
 *
 * Caveat worth knowing before spending the JS headroom: 42.3 kB of the client
 * JS total is the core-js polyfill bundle, which Next emits with `noModule`
 * and no module-supporting browser ever downloads, plus 3.6 kB reachable only
 * from _global-error. Real modern-browser JS is roughly 141 kB on / and
 * 146 kB on /projects. Summing the chunks directory overstates what ships by
 * about a quarter.
 */
const BUDGET = {
  jsGzipKB: 220,
  /* Tightened from 14. The design-token layer will add a few kB back; if this
     has to rise, raise it in the commit that spends it, with the measurement. */
  cssGzipKB: 12,
  largestChunkGzipKB: 76,
  /* One file preloads: Inter, 47.3 kB. Adding Inter Tight for the display
     role took it to 91.2 kB and tripped this check, which is how that
     decision got made rather than drifted into. A second family is now a
     deliberate act. */
  preloadedFontKB: 55,
};

function gzipKB(file) {
  return gzipSync(readFileSync(file)).length / 1024;
}

function walk(dir, ext, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, ext, out);
    else if (entry.name.endsWith(ext)) out.push(full);
  }
  return out;
}

if (!existsSync(CHUNKS)) {
  console.error(`✗ ${CHUNKS} not found — run \`next build\` first.`);
  process.exit(1);
}

const jsFiles = walk(CHUNKS, '.js');
const cssFiles = walk(CHUNKS, '.css');

const jsTotal = jsFiles.reduce((sum, f) => sum + gzipKB(f), 0);
const cssTotal = cssFiles.reduce((sum, f) => sum + gzipKB(f), 0);
const largest = jsFiles.reduce(
  (max, f) => Math.max(max, gzipKB(f)),
  0
);

/*
 * Only fonts declared preload: true are fetched on first paint. Everything
 * else in media/ ships @font-face rules but no request until something
 * actually renders in that family, so counting the whole directory would be
 * misleading. Next marks preloaded files with `.p.` in the filename.
 */
const preloadedFontKB = existsSync(MEDIA)
  ? readdirSync(MEDIA)
      .filter((f) => f.endsWith('.woff2') && f.includes('.p.'))
      .reduce((sum, f) => sum + statSync(join(MEDIA, f)).size / 1024, 0)
  : 0;

const checks = [
  ['client JS (gzip)', jsTotal, BUDGET.jsGzipKB],
  ['client CSS (gzip)', cssTotal, BUDGET.cssGzipKB],
  ['largest chunk (gzip)', largest, BUDGET.largestChunkGzipKB],
  ['preloaded fonts', preloadedFontKB, BUDGET.preloadedFontKB],
];

let failed = false;
console.log('Bundle size budget\n');
for (const [label, actual, limit] of checks) {
  const ok = actual <= limit;
  if (!ok) failed = true;
  const pct = ((actual / limit) * 100).toFixed(0);
  console.log(
    `  ${ok ? '✓' : '✗'} ${label.padEnd(22)} ${actual.toFixed(1).padStart(7)} kB  /  ${String(limit).padStart(4)} kB  (${pct}%)`
  );
}

if (failed) {
  console.error(
    '\n✗ Over budget. Either justify the increase and raise the threshold in\n' +
      '  scripts/check-bundle-size.mjs, or bring the size back down.'
  );
  process.exit(1);
}

console.log('\n✓ Within budget.');
