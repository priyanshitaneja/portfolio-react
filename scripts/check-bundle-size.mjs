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
 * Measured at the time of writing, on the commit that added this file:
 *   client JS   205.7 kB gzip
 *   client CSS    8.5 kB gzip
 *   largest chunk 69.7 kB gzip  (react-dom)
 *   preloaded fonts 115 kB      (EB Garamond roman + italic, Cinzel)
 *
 * Headroom is roughly 7% — enough to absorb a dependency patch bump, tight
 * enough that adding a UI library or a second icon set trips it.
 */
const BUDGET = {
  jsGzipKB: 220,
  cssGzipKB: 14,
  largestChunkGzipKB: 76,
  preloadedFontKB: 130,
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
