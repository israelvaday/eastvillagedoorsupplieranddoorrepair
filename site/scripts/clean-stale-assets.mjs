/**
 * Remove obsolete generated assets after the complete painting image set has
 * been created. The script validates every required replacement first.
 */
import {
  existsSync,
  readdirSync,
  rmSync,
  statSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const serviceSlugs = [
  "interior-painting",
  "exterior-painting",
  "cabinet-painting",
  "commercial-painting",
  "deck-fence-staining",
  "trim-door-painting",
  "ceiling-painting",
  "rental-turnover-painting",
  "wallpaper-removal",
  "color-consultation",
];
const galleryFiles = [
  "painting-gallery--interior-living-room.png",
  "painting-gallery--exterior-brick-home.png",
  "painting-gallery--cabinet-finish.png",
  "painting-gallery--commercial-office.png",
  "painting-gallery--deck-staining.png",
  "painting-gallery--trim-detail.png",
  "painting-gallery--ceiling-rolling.png",
  "painting-gallery--rental-turnover.png",
  "painting-gallery--wallpaper-removal.png",
  "painting-gallery--color-sampling.png",
  "painting-gallery--exterior-siding.png",
  "painting-gallery--occupied-office.png",
  "painting-gallery--front-door.png",
  "painting-gallery--multifamily-hallway.png",
];
const blogSlugs = [
  "interior-paint-colors-metro-detroit",
  "exterior-paint-michigan-weather",
  "cabinet-painting-vs-replacement",
  "hire-painting-contractor-michigan",
  "commercial-painting-minimal-downtime",
  "deck-staining-michigan-climate",
];
const quoteFiles = [
  ...serviceSlugs.map((slug) => `${slug}.png`),
  "property-home.png",
  "property-business.png",
  "property-multifamily.png",
  "property-other.png",
];

const keep = new Set([
  "public/logo.png",
  "public/logo-256.png",
  "public/logo-512.png",
  "public/about/about-hero.png",
  "public/about/about-workshop.png",
  "public/photos/branding-generated--hero-painting-metro-detroit.png",
  "public/photos/branding-generated--metro-detroit-map.png",
  ...serviceSlugs.map((slug) => `public/photos/service-hero-${slug}.png`),
  ...galleryFiles.map((file) => `public/photos/${file}`),
  ...quoteFiles.map((file) => `public/photos/quote/${file}`),
  ...blogSlugs.flatMap((slug) => [
    `public/blog/${slug}-hero.png`,
    `public/blog/${slug}-secondary.png`,
  ]),
]);

const missing = [...keep].filter(
  (path) => !existsSync(join(ROOT, ...path.split("/")))
);
if (missing.length) {
  throw new Error(
    `Refusing cleanup; ${missing.length} painting assets are missing:\n${missing.join("\n")}`
  );
}

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const generatedRoots = [
  join(ROOT, "public/photos"),
  join(ROOT, "public/blog"),
  join(ROOT, "public/about"),
  join(ROOT, "public/faq"),
  join(ROOT, "public/video"),
];
let removed = 0;

for (const file of generatedRoots.flatMap(walk)) {
  const key = relative(ROOT, file).replaceAll("\\", "/");
  if (!keep.has(key)) {
    rmSync(file, { force: true });
    removed += 1;
  }
}

for (const stale of [
  "public/favicon.ico",
  "public/icon.png",
  "public/apple-icon.png",
  "public/opengraph-image.png",
]) {
  const path = join(ROOT, ...stale.split("/"));
  if (existsSync(path)) {
    rmSync(path, { force: true });
    removed += 1;
  }
}

console.log(`Removed ${removed} obsolete generated assets`);
