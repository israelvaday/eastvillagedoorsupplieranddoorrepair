#!/usr/bin/env node
/**
 * Postbuild: minify every prerendered HTML file under .next/server/app.
 *
 * Runs AFTER inline-critical-css so the inlined <style> block is also minified.
 * Reduces total HTML size dramatically by collapsing whitespace, dropping
 * comments, and minifying any inline CSS/JS — which raises text-to-HTML ratio
 * for SEO audits (SEMrush check 112) without affecting visible content.
 *
 * Skips <pre>, <textarea>, <code> contents (preserveLineBreaks).
 */
import fs from 'node:fs';
import path from 'node:path';
import { minify } from 'html-minifier-terser';

const ROOT = process.cwd();
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app');

if (!fs.existsSync(HTML_ROOT)) {
  console.warn('[minify-html] .next/server/app not found — skipping');
  process.exit(0);
}

const OPTS = {
  collapseWhitespace: true,
  conservativeCollapse: false,
  collapseInlineTagWhitespace: false,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  // Disabled: minifyJS — Next.js RSC payload uses `self.__next_f.push(...)`
  // which terser sometimes mangles in edge cases. Compression gain is small.
  minifyJS: false,
  decodeEntities: false,
  sortAttributes: false,
  sortClassName: false,
  ignoreCustomComments: [/^\s*more$/, /^!\s*Next\.js/],
  // Preserve text-significant whitespace in these elements
  preserveLineBreaks: false,
};

let processed = 0;
let beforeTotal = 0;
let afterTotal = 0;

async function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.name.endsWith('.html')) {
      const original = fs.readFileSync(full, 'utf8');
      try {
        const out = await minify(original, OPTS);
        if (out && out.length > 0 && out.length < original.length) {
          fs.writeFileSync(full, out);
          beforeTotal += original.length;
          afterTotal += out.length;
          processed++;
        }
      } catch (err) {
        console.warn(`[minify-html] skipped ${path.relative(ROOT, full)}: ${err.message}`);
      }
    }
  }
}

await walk(HTML_ROOT);

const saved = beforeTotal - afterTotal;
const pct = beforeTotal > 0 ? ((saved / beforeTotal) * 100).toFixed(1) : '0.0';
console.log(
  `[minify-html] minified ${processed} file(s): ${(beforeTotal / 1024).toFixed(1)} KB → ${(afterTotal / 1024).toFixed(1)} KB (saved ${(saved / 1024).toFixed(1)} KB, ${pct}%)`,
);
