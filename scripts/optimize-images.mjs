#!/usr/bin/env node
/**
 * Optimize all images in site/public/{blog,faq,about,photos} in-place:
 *  - PNGs > 500 KB: resize to max 1600w, re-encode as compressed PNG
 *  - JPEGs > 500 KB: resize to max 1600w, re-encode at quality 78 mozjpeg
 * Keeps filenames the same so no code changes needed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIRS = [
  path.join(ROOT, "site", "public", "blog"),
  path.join(ROOT, "site", "public", "faq"),
  path.join(ROOT, "site", "public", "about"),
  path.join(ROOT, "site", "public", "photos"),
];
const MAX_W = 1600;
const THRESHOLD = 500 * 1024;

let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

async function process(file) {
  const stat = fs.statSync(file);
  if (stat.size < THRESHOLD) { skipped++; return; }
  totalBefore += stat.size;
  const ext = path.extname(file).toLowerCase();
  const tmp = file + ".tmp";
  let pipeline = sharp(file, { failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_W) {
    pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });
  }
  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: 80, effort: 8 });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
  } else {
    skipped++; return;
  }
  await pipeline.toFile(tmp);
  const newSize = fs.statSync(tmp).size;
  if (newSize < stat.size) {
    fs.renameSync(tmp, file);
    totalAfter += newSize;
    processed++;
    console.log(`  ${path.basename(file)}: ${(stat.size/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`);
  } else {
    fs.unlinkSync(tmp);
    totalAfter += stat.size;
    skipped++;
  }
}

(async () => {
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    console.log(`\n== ${dir} ==`);
    const files = fs.readdirSync(dir).map(f => path.join(dir, f));
    for (const f of files) {
      if (fs.statSync(f).isFile()) {
        try { await process(f); } catch (e) { console.error(`  err ${f}: ${e.message}`); }
      }
    }
  }
  console.log(`\nProcessed: ${processed}, Skipped: ${skipped}`);
  console.log(`Total: ${(totalBefore/1024/1024).toFixed(2)}MB -> ${(totalAfter/1024/1024).toFixed(2)}MB`);
})();
