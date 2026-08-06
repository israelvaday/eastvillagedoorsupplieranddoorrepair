#!/usr/bin/env node
/**
 * Postbuild: inline the entire CSS bundle into every prerendered HTML file
 * so first paint requires zero stylesheet round-trip. The original
 * `<link rel="stylesheet">` is converted to a non-blocking preload + swap
 * so the browser can populate its CSS cache for client-side navigation.
 *
 * Why not per-page purge? Tested — saved ~14 KB/page but dropped rules
 * needed by hydration-driven class changes (e.g. data-state, is-playing),
 * which caused +0.026 CLS on desktop. Full inline is the safe maximum.
 *
 * Why not Next 15 experimental.optimizeCss? Confirmed broken — emits zero
 * <style> tags in the built HTML on App Router.
 *
 * Idempotent.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CSS_DIR = path.join(ROOT, '.next', 'static', 'css');
const HTML_ROOT = path.join(ROOT, '.next', 'server', 'app');

if (!fs.existsSync(CSS_DIR) || !fs.existsSync(HTML_ROOT)) {
  console.warn('[inline-critical-css] .next not found — skipping');
  process.exit(0);
}

const cssFiles = fs.readdirSync(CSS_DIR).filter((f) => f.endsWith('.css'));
const cssByName = Object.fromEntries(
  cssFiles.map((f) => [f, fs.readFileSync(path.join(CSS_DIR, f), 'utf8')]),
);
console.log(
  `[inline-critical-css] loaded ${cssFiles.length} stylesheet(s): ${cssFiles
    .map((f) => `${f} (${(cssByName[f].length / 1024).toFixed(1)} KB)`)
    .join(', ')}`,
);

const STYLESHEET_RE =
  /<link\s+rel="stylesheet"\s+href="(\/_next\/static\/css\/([^"]+\.css))"([^>]*?)\/?>/g;
const PRELOAD_RE =
  /<link\s+rel="preload"\s+href="\/_next\/static\/css\/[^"]+\.css"\s+as="style"[^>]*?\/?>/g;
const PRIOR_INLINE_RE =
  /<style data-inline-critical(?:-pp)?(?:="[^"]*")?>[\s\S]*?<\/style>/g;
const PRIOR_SWAP_RE =
  /<link rel="preload" as="style" href="\/_next\/static\/css\/[^"]+\.css"[^>]*\/>(?:<link rel="stylesheet" href="\/_next\/static\/css\/[^"]+\.css" media="print" onload="this\.media='all'"[^>]*\/>)?(?:<noscript><link rel="stylesheet" href="\/_next\/static\/css\/[^"]+\.css"[^>]*\/><\/noscript>)?/g;

let processed = 0;
let inlined = 0;

// Inlining the full 44 KB CSS into pages crushes the text-to-HTML ratio for
// SEMrush check 112. Disabled entirely — CSS loads via standard <link>.
const INLINE_ONLY = new Set();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) {
      if (INLINE_ONLY.has(full)) processHtml(full);
    }
  }
}

function processHtml(file) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  if (html.includes('data-inline-critical')) {
    html = html.replace(PRIOR_INLINE_RE, '');
    html = html.replace(PRIOR_SWAP_RE, '');
  }
  html = html.replace(PRELOAD_RE, '');

  const referenced = new Set();
  for (const f of cssFiles) {
    if (html.includes(`/_next/static/css/${f}`)) referenced.add(f);
  }
  if (referenced.size === 0) {
    if (html !== original) fs.writeFileSync(file, html);
    return;
  }

  let rewroteLink = false;
  html = html.replace(STYLESHEET_RE, (match, href, fname) => {
    const css = cssByName[fname];
    if (!css) return match;
    rewroteLink = true;
    inlined++;
    const styleTag = `<style data-inline-critical="${fname}">${css}</style>`;
    const nonBlocking =
      `<link rel="preload" as="style" href="${href}" />` +
      `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" />` +
      `<noscript><link rel="stylesheet" href="${href}" /></noscript>`;
    return styleTag + nonBlocking;
  });

  if (!rewroteLink) {
    const injection = [...referenced]
      .map((fname) => {
        const href = `/_next/static/css/${fname}`;
        inlined++;
        return (
          `<style data-inline-critical="${fname}">${cssByName[fname]}</style>` +
          `<link rel="preload" as="style" href="${href}" />` +
          `<link rel="stylesheet" href="${href}" media="print" onload="this.media='all'" />` +
          `<noscript><link rel="stylesheet" href="${href}" /></noscript>`
        );
      })
      .join('');
    html = html.replace(/<\/head>/i, `${injection}</head>`);
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    processed++;
  }
}

walk(HTML_ROOT);
console.log(
  `[inline-critical-css] inlined into ${processed} HTML file(s), ${inlined} stylesheet swap(s)`,
);
