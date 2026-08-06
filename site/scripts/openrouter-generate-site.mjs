/**
 * Generate East Village Door Supplier image assets and local door-service insights.
 *
 * Usage:
 *   node scripts/openrouter-generate-site.mjs --test [--force]
 *   node scripts/openrouter-generate-site.mjs --images-blog [--force]
 *   node scripts/openrouter-generate-site.mjs --images-gallery [--force]
 *   node scripts/openrouter-generate-site.mjs --images-brand [--force]
 *   node scripts/openrouter-generate-site.mjs --images-quote [--force]
 *   node scripts/openrouter-generate-site.mjs --areas [--force]
 *   node scripts/openrouter-generate-site.mjs --all [--force]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  chatJson,
  generateImage,
  getOpenRouterKey,
  loadEnvLocal,
  sleep,
} from "./openrouter-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUSINESS_NAME = "East Village Door Supplier and Door Repair";
const PHONE = "(212) 505-8847";
const PHOTO_STYLE =
  "Ultra photorealistic architectural photography, Sony A7R IV 35mm lens, accurate wood grain and metal hardware textures, East Village or Lower East Side Manhattan NYC interior or street-level entry, crisp natural window light, professional real estate photography, realistic proportions, no CGI look";
const NO_TEXT =
  "No visible words, letters, numbers, street signs, store signs, logos, watermarks, captions, UI overlays, or artificial render artifacts";

const SERVICE_HEROES = [
  {
    slug: "residential-door-installation",
    prompt:
      "Installer fitting a premium solid oak entry door in a pre-war East Village walk-up apartment, clean casing and satin nickel hardware, tidy job site",
  },
  {
    slug: "commercial-door-installation",
    prompt:
      "Two technicians installing a commercial hollow metal door in a bright Manhattan office corridor, level frame and organized tools",
  },
  {
    slug: "custom-door-fabrication",
    prompt:
      "Craftsman hand-sanding a custom panel wood door in a small NYC workshop, visible grain and mortise lock prep, warm task lighting",
  },
  {
    slug: "door-hardware-supply",
    prompt:
      "Macro photo of premium brushed nickel lockset, heavy hinges, and door closer on a newly installed Manhattan apartment door",
  },
  {
    slug: "structural-door-repair",
    prompt:
      "Technician shimming and squaring a damaged door jamb in a Lower East Side pre-war apartment, level and wood shims visible",
  },
  {
    slug: "fire-rated-doors",
    prompt:
      "Fire-rated corridor door with metal label and self-closing hardware in a NYC apartment building hallway, realistic institutional finish",
  },
  {
    slug: "storefront-glass-doors",
    prompt:
      "Aluminum and glass storefront entrance on an East Village retail shop, polished pull hardware and clean threshold",
  },
  {
    slug: "emergency-door-repair",
    prompt:
      "Emergency technician reinforcing a damaged entry door frame in a Manhattan building at night, portable work lights, professional tools",
  },
  {
    slug: "door-frame-jamb-repair",
    prompt:
      "Carpenter replacing a rotted pine door jamb in a NYC brick opening, new casing and square frame, realistic construction detail",
  },
  {
    slug: "security-access-doors",
    prompt:
      "Reinforced steel security entry door with multi-point lock in a Manhattan multifamily lobby, clean modern hardware",
  },
];

const BLOG_IMAGES = [
  {
    slug: "choosing-entry-door-brooklyn-brownstone",
    hero: "Premium solid wood entry door on a classic Brooklyn brownstone facade, warm natural light",
    secondary: "Door technician measuring a historic Brooklyn entry opening with professional tools",
  },
  {
    slug: "fire-rated-doors-nyc-multifamily",
    hero: "Fire-rated corridor door with visible UL label in a NYC apartment building hallway",
    secondary: "Self-closing door closer hardware on a fire-rated door assembly",
  },
  {
    slug: "storefront-door-repair-nyc-retail",
    hero: "Aluminum and glass storefront entrance door on a NYC retail shop at street level",
    secondary: "Technician adjusting floor closer on a commercial glass entrance door",
  },
  {
    slug: "interior-door-replacement-nyc-apartment",
    hero: "New solid-core interior door installed in a renovated NYC apartment with clean white trim",
    secondary: "Stack of pre-hung interior doors ready for apartment installation in Brooklyn",
  },
  {
    slug: "door-hardware-guide-nyc-buildings",
    hero: "Commercial-grade lockset and door closer installed on a modern NYC office door",
    secondary: "Assortment of heavy-duty hinges and locksets for door hardware upgrade",
  },
  {
    slug: "structural-door-repair-vs-replacement",
    hero: "Technician repairing a damaged door jamb and strike plate in a NYC building",
    secondary: "Realigned door frame with fresh hardware and smooth door swing",
  },
];

const GALLERY_IMAGES = [
  {
    file: "door-gallery--brooklyn-entry.png",
    prompt: "Premium walnut entry door with sidelite installed on an East Village Manhattan townhouse stoop, brass hardware",
  },
  {
    file: "door-gallery--commercial-corridor.png",
    prompt: "Pair of commercial hollow metal doors in a sunlit Midtown Manhattan office corridor",
  },
  {
    file: "door-gallery--custom-wood-door.png",
    prompt: "Custom six-panel stained wood door in a Greenwich Village apartment entry with white trim",
  },
  {
    file: "door-gallery--storefront-glass.png",
    prompt: "Ground-floor aluminum glass storefront doors on a Lower East Side retail space",
  },
  {
    file: "door-gallery--fire-rated-hallway.png",
    prompt: "Fire-rated apartment corridor doors with closers in a Manhattan multifamily building",
  },
  {
    file: "door-gallery--interior-slabs.png",
    prompt: "Freshly installed white solid-core interior doors in a renovated East Village apartment",
  },
  {
    file: "door-gallery--hardware-detail.png",
    prompt: "Close-up of premium door hardware: lever lockset, ball bearing hinges, and hydraulic closer",
  },
  {
    file: "door-gallery--jamb-repair.png",
    prompt: "Door jamb rebuild in progress on a pre-war Manhattan masonry opening with new pine stock",
  },
  {
    file: "door-gallery--security-entry.png",
    prompt: "Reinforced security entry door with electronic lock in a NYC apartment lobby",
  },
  {
    file: "door-gallery--warehouse-supply.png",
    prompt: "Clean door supply showroom with stacked slabs, hardware bins, and samples under bright lighting",
  },
  {
    file: "door-gallery--double-entry.png",
    prompt: "Double commercial entry doors with ADA hardware on a Manhattan mixed-use building",
  },
  {
    file: "door-gallery--apartment-interior.png",
    prompt: "Hallway with multiple new pre-hung interior doors in a NYC apartment renovation",
  },
  {
    file: "door-gallery--emergency-repair.png",
    prompt: "Technician repairing a damaged storefront door after hours on an NYC retail block",
  },
  {
    file: "door-gallery--historic-restoration.png",
    prompt: "Historic wood door profile restoration on an East Village tenement with matching casing",
  },
];

const QUOTE_IMAGES = [
  ...SERVICE_HEROES.map(({ slug, prompt }) => ({
    file: `${slug}.png`,
    prompt: `Square website selection image, ${prompt}`,
  })),
  {
    file: "property-home.png",
    prompt: "Square view of a premium residential entry door installation on a Brooklyn home",
  },
  {
    file: "property-business.png",
    prompt: "Square view of commercial door installation in a NYC office or retail space",
  },
  {
    file: "property-multifamily.png",
    prompt: "Square view of fire-rated corridor door replacement in a NYC apartment building",
  },
  {
    file: "property-other.png",
    prompt: "Square view of custom door fabrication and installation in a unique NYC opening",
  },
];

const BRAND_IMAGES = [
  {
    path: "public/logo.png",
    logo: true,
    aspectRatio: "1:1",
    prompt:
      "Minimal vector logo mark for East Village Door Supplier, stylized door silhouette with subtle EV letterforms, teal #0D6E6E and warm coral #E07A5F on cream #F8F6F3 background, crisp edges, premium trade mark, no text words",
  },
  {
    path: "public/photos/branding-generated--hero-east-village-door-nyc.png",
    aspectRatio: "16:9",
    prompt:
      "Wide hero photograph of a craftsman installing a premium wood entry door inside a bright East Village Manhattan apartment, full door visible, natural window light, editorial composition with negative space on left",
  },
  {
    path: "public/photos/branding-generated--nyc-service-map.png",
    aspectRatio: "16:9",
    prompt:
      "Elegant tabletop flat lay of Manhattan and Brooklyn map outline with teal pin markers and door hardware samples, soft studio lighting, no readable map labels",
  },
  {
    path: "public/about/about-hero.png",
    aspectRatio: "16:9",
    prompt:
      "Wide editorial portrait of professional door installation team at work inside a bright East Village Manhattan property with door slabs and tools",
  },
  {
    path: "public/about/about-workshop.png",
    aspectRatio: "16:9",
    prompt:
      "Professional door supply workshop with organized door slabs, hardware racks, and installation tools in a clean Manhattan warehouse near the East Village",
  },
];

function absolutePath(relativePath) {
  return join(ROOT, ...relativePath.split("/"));
}

function writeBuffer(outPath, buffer) {
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  console.log("Wrote", outPath.replace(ROOT, ""));
}

function doorPrompt(prompt) {
  return `${prompt}. Brand context: ${BUSINESS_NAME}, headquartered at 99 Loisaida Ave New York NY 10009, serving Manhattan and Brooklyn. ${PHOTO_STYLE}. ${NO_TEXT}.`;
}

async function generateAsset(key, imageModel, job, force) {
  const outPath = absolutePath(job.path);
  if (existsSync(outPath) && !force) {
    console.log("Skip existing", job.path);
    return false;
  }

  const prompt = job.logo ? job.prompt : doorPrompt(job.prompt);
  const buffer = await generateImage(key, prompt, {
    model: imageModel,
    aspect_ratio: job.aspectRatio ?? "16:9",
    resolution: job.resolution ?? "2K",
    quality: job.quality ?? "high",
  });
  writeBuffer(outPath, buffer);
  return true;
}

async function runAssetJobs(key, imageModel, jobs, force) {
  for (const job of jobs) {
    try {
      const generated = await generateAsset(key, imageModel, job, force);
      if (generated) await sleep(1400);
    } catch (error) {
      console.error(`Failed ${job.path}:`, error instanceof Error ? error.message : error);
    }
  }
}

async function generateBlogImages(key, imageModel, force) {
  const jobs = BLOG_IMAGES.flatMap(({ slug, hero, secondary }) => [
    { path: `public/blog/${slug}-hero.png`, prompt: hero, aspectRatio: "16:9" },
    { path: `public/blog/${slug}-secondary.png`, prompt: secondary, aspectRatio: "16:9" },
  ]);
  await runAssetJobs(key, imageModel, jobs, force);
}

async function generateGalleryImages(key, imageModel, force) {
  const jobs = GALLERY_IMAGES.map(({ file, prompt }) => ({
    path: `public/photos/${file}`,
    prompt,
    aspectRatio: "16:9",
  }));
  await runAssetJobs(key, imageModel, jobs, force);
}

async function generateQuoteImages(key, imageModel, force) {
  const jobs = QUOTE_IMAGES.map(({ file, prompt }) => ({
    path: `public/photos/quote/${file}`,
    prompt,
    aspectRatio: "1:1",
  }));
  await runAssetJobs(key, imageModel, jobs, force);
}

async function refreshLogoCopies(force) {
  const logoPath = absolutePath("public/logo.png");
  if (!existsSync(logoPath)) return;

  const logo = readFileSync(logoPath);
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    console.warn("Image resizer unavailable; logo copies will retain source dimensions");
  }

  for (const size of [256, 512]) {
    const file = `logo-${size}.png`;
    const outPath = absolutePath(`public/${file}`);
    if (existsSync(outPath) && !force) continue;
    if (sharp) {
      await sharp(logoPath).resize(size, size, { fit: "contain" }).png().toFile(outPath);
      console.log("Wrote", outPath.replace(ROOT, ""));
    } else {
      writeBuffer(outPath, logo);
    }
  }
}

async function generateBrandImages(key, imageModel, force) {
  await runAssetJobs(key, imageModel, BRAND_IMAGES, force);
  await refreshLogoCopies(force);

  const serviceJobs = SERVICE_HEROES.map(({ slug, prompt }) => ({
    path: `public/photos/service-hero-${slug}.png`,
    prompt: `Wide service-page hero, ${prompt}`,
    aspectRatio: "16:9",
  }));
  await runAssetJobs(key, imageModel, serviceJobs, force);
}

async function generateTestImage(key, imageModel, force) {
  await runAssetJobs(
    key,
    imageModel,
    [
      {
        path: "public/photos/openrouter-test.png",
        prompt: "Close professional detail of premium door hardware being installed on a solid wood door",
        aspectRatio: "1:1",
      },
    ],
    force
  );
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, "utf8"));
}

function stringList(value, maxItems = Number.MAX_SAFE_INTEGER) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => typeof item === "string" && item.trim())
    .map((item) => item.trim())
    .slice(0, maxItems);
}

function normalizeAreaInsight(area, candidate, previous) {
  const priorLandmarks = stringList(previous?.landmarks);
  const generatedLandmarks = stringList(candidate?.landmarks, 3);
  const tagline = typeof candidate?.tagline === "string" ? candidate.tagline.trim() : "";
  let neighborhoodNotes =
    typeof candidate?.neighborhood_notes === "string" ? candidate.neighborhood_notes.trim() : "";

  const exactName = area.name;
  const combined = `${tagline} ${neighborhoodNotes}`.toLocaleLowerCase();
  if (exactName && !combined.includes(exactName.toLocaleLowerCase())) {
    neighborhoodNotes = `${exactName} door projects benefit from measurement suited to the property's age, frame condition, and code requirements. ${neighborhoodNotes}`.trim();
  }

  return {
    tagline,
    landmarks: priorLandmarks.length ? priorLandmarks : generatedLandmarks,
    common_calls: stringList(candidate?.common_calls, 3),
    neighborhood_notes: neighborhoodNotes,
    keywords: stringList(candidate?.keywords, 7).map((keyword) => keyword.toLocaleLowerCase()),
  };
}

async function refreshAreaInsights(key, chatModel, force) {
  const areasPath = absolutePath("content/service-areas.json");
  const outputPath = absolutePath("content/area-insights.json");
  const areas = readJson(areasPath, []);
  const previous = readJson(outputPath, {});
  const output = force ? {} : { ...previous };

  if (!Array.isArray(areas) || !areas.length) {
    throw new Error("No service areas found");
  }

  if (force) {
    writeFileSync(outputPath, "{}\n");
    console.log("Started area insights from a clean output");
  }

  const system = `Write original local SEO data for ${BUSINESS_NAME}, a door supply, installation, and repair business headquartered at 99 Loisaida Ave New York NY 10009 serving Manhattan and Brooklyn. Return only a JSON object keyed by the supplied slug. Each value must contain: tagline (14 words maximum), landmarks (exactly the supplied landmarks in the same order; only generate three accurate landmarks when none are supplied), common_calls (three concise door service requests), neighborhood_notes (two or three useful sentences about local building types, door conditions, hardware, or code requirements), and keywords (six or seven lowercase local door search phrases). Keep every supplied place name exact. Do not claim ratings, awards, or licensing. Discuss doors only.`;
  const batchSize = 8;

  for (let index = 0; index < areas.length; index += batchSize) {
    const batch = areas.slice(index, index + batchSize);
    const request = batch.map((area) => ({
      slug: area.slug,
      name: area.name,
      city: area.city,
      kind: area.kind,
      landmarks: stringList(previous[area.slug]?.landmarks),
    }));

    try {
      console.log(`Area batch ${Math.floor(index / batchSize) + 1}`);
      const generated = await chatJson(
        key,
        chatModel,
        system,
        `Create door service insights for this exact JSON input:\n${JSON.stringify(request, null, 2)}`,
        0.55
      );

      for (const area of batch) {
        const candidate = generated?.[area.slug];
        if (!candidate || typeof candidate !== "object") {
          console.error(`Missing generated insight for ${area.slug}`);
          continue;
        }
        output[area.slug] = normalizeAreaInsight(area, candidate, previous[area.slug]);
      }

      writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
      await sleep(800);
    } catch (error) {
      console.error(
        `Failed area batch ${Math.floor(index / batchSize) + 1}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log(`Area insights: ${Object.keys(output).length}/${areas.length}`);
}

function printUsage() {
  console.log(
    "Pass --test, --images-blog, --images-gallery, --images-brand, --images-quote, --areas, or --all. Add --force to replace existing output."
  );
}

async function main() {
  const args = process.argv.slice(2);
  const validFlags = new Set([
    "--test",
    "--images-blog",
    "--images-gallery",
    "--images-brand",
    "--images-quote",
    "--areas",
    "--all",
    "--force",
  ]);
  const unknownFlags = args.filter((arg) => !validFlags.has(arg));
  if (unknownFlags.length) {
    throw new Error(`Unknown flag${unknownFlags.length > 1 ? "s" : ""}: ${unknownFlags.join(", ")}`);
  }

  const hasMode = args.some((arg) => arg !== "--force");
  if (!hasMode) {
    printUsage();
    return;
  }

  loadEnvLocal();
  const key = getOpenRouterKey();
  if (!key) {
    throw new Error("Set OPENROUTER_API_KEY in .env.local");
  }

  const force = args.includes("--force");
  const all = args.includes("--all");
  const chatModel = process.env.OPENROUTER_CHAT_MODEL || "google/gemini-2.5-flash";
  const imageModel =
    process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image-preview";
  let productionImagesChanged = false;

  if (args.includes("--test")) {
    await generateTestImage(key, imageModel, force);
  }
  if (all || args.includes("--images-blog")) {
    await generateBlogImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-gallery")) {
    await generateGalleryImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-brand")) {
    await generateBrandImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--images-quote")) {
    await generateQuoteImages(key, imageModel, force);
    productionImagesChanged = true;
  }
  if (all || args.includes("--areas")) {
    await refreshAreaInsights(key, chatModel, force);
  }

  if (productionImagesChanged) {
    console.log("Rebuilding door photo catalog");
    execFileSync(process.execPath, [absolutePath("scripts/rebuild-photos-gallery.mjs")], {
      cwd: ROOT,
      stdio: "inherit",
    });
    execFileSync(process.execPath, [absolutePath("scripts/finalize-door-assets.mjs")], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
