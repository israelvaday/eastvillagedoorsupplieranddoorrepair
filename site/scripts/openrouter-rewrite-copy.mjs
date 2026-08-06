/**
 * Rewrite site marketing copy via OpenRouter for unique, SEO-focused text.
 *
 * Usage:
 *   node scripts/openrouter-rewrite-copy.mjs
 *   node scripts/openrouter-rewrite-copy.mjs --services --faq --blog --meta
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chatJson, getOpenRouterKey, loadEnvLocal, sleep } from "./openrouter-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUSINESS = "East Village Door Supplier and Door Repair";
const ADDRESS = "99 Loisaida Ave, New York, NY 10009";
const PHONE = "(212) 505-8847";
const REGION = "Manhattan and Brooklyn";
const DOMAIN = "eastvillagedoorsupplieranddoorrepair.com";

const SERVICE_SLUGS = [
  { slug: "residential-door-installation", name: "Residential Door Installation", shortName: "Residential" },
  { slug: "commercial-door-installation", name: "Commercial Door Installation", shortName: "Commercial" },
  { slug: "custom-door-fabrication", name: "Custom Door Fabrication", shortName: "Custom" },
  { slug: "door-hardware-supply", name: "Door Hardware Supply", shortName: "Hardware" },
  { slug: "structural-door-repair", name: "Structural Door Repair", shortName: "Structural" },
  { slug: "fire-rated-doors", name: "Fire-Rated Doors", shortName: "Fire-Rated" },
  { slug: "storefront-glass-doors", name: "Storefront & Glass Doors", shortName: "Storefront" },
  { slug: "emergency-door-repair", name: "Emergency Door Repair", shortName: "Emergency" },
  { slug: "door-frame-jamb-repair", name: "Door Frame & Jamb Repair", shortName: "Frames" },
  { slug: "security-access-doors", name: "Security & Access Doors", shortName: "Security" },
];

const ICONS = `import {
  DoorOpen,
  Home,
  Building2,
  Wrench,
  Shield,
  Lock,
  Hammer,
  Package,
  Settings,
  AlertTriangle,
} from "lucide-react";`;

const ICON_MAP = {
  "residential-door-installation": "Home",
  "commercial-door-installation": "Building2",
  "custom-door-fabrication": "Settings",
  "door-hardware-supply": "Package",
  "structural-door-repair": "Hammer",
  "fire-rated-doors": "Shield",
  "storefront-glass-doors": "DoorOpen",
  "emergency-door-repair": "AlertTriangle",
  "door-frame-jamb-repair": "Wrench",
  "security-access-doors": "Lock",
};

const INTENT_MAP = {
  "emergency-door-repair": "emergency",
  "security-access-doors": "trust",
};

function esc(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function rewriteServices(key, model) {
  const system = `You write original, high-converting SEO copy for ${BUSINESS}, headquartered at ${ADDRESS}, serving ${REGION}. Return JSON keyed by service slug. Each value: tagline (max 16 words), description (2-3 sentences, mention East Village HQ or Loisaida Ave once across all services total—not every service), bullets (5 concise strings), keywords (6 lowercase local search phrases). Do not claim licenses, awards, or ratings. Unique wording—no generic filler.`;
  const generated = await chatJson(
    key,
    model,
    system,
    JSON.stringify(SERVICE_SLUGS, null, 2),
    0.65
  );

  const blocks = SERVICE_SLUGS.map(({ slug, name, shortName }) => {
    const item = generated[slug];
    if (!item) throw new Error(`Missing generated copy for ${slug}`);
    const intent = INTENT_MAP[slug] ?? "service";
    const bullets = item.bullets.map((b) => `      "${esc(b)}",`).join("\n");
    const keywords = item.keywords.map((k) => `      "${esc(k)}",`).join("\n");
    return `  {
    slug: "${slug}",
    name: "${name}",
    shortName: "${shortName}",
    icon: ${ICON_MAP[slug]},
    tagline: "${esc(item.tagline)}",
    description:
      "${esc(item.description)}",
    bullets: [
${bullets}
    ],
    intent: "${intent}",
    keywords: [
${keywords}
    ],
  }`;
  });

  const file = `${ICONS}

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  icon: typeof DoorOpen;
  tagline: string;
  description: string;
  bullets: string[];
  intent: "emergency" | "service" | "trust";
  keywords: string[];
};

export const SERVICES: Service[] = [
${blocks.join(",\n")},
];

export const SERVICES_BY_SLUG: Record<string, Service> = Object.fromEntries(
  SERVICES.map((service) => [service.slug, service])
);
`;
  writeFileSync(join(ROOT, "content/services.ts"), file);
  console.log("Wrote content/services.ts");
}

async function rewriteFaq(key, model) {
  const system = `Write original FAQ content for ${BUSINESS} at ${ADDRESS}, serving ${REGION}. Return JSON with key "sections": array of 5 sections. Each section: id (pricing|process|products|preparation|nyc-buildings), title, emoji, description (one sentence), items (array of 4 {q,a}). Answers should be practical, 2-4 sentences, SEO-friendly with natural keywords (door installation NYC, East Village door repair, fire-rated doors Manhattan, etc.). No duplicate questions. Do not claim licensing.`;
  const generated = await chatJson(key, model, system, "Generate full FAQ sections.", 0.6);

  const sections = generated.sections;
  if (!Array.isArray(sections) || sections.length !== 5) {
    throw new Error("FAQ generation returned invalid sections");
  }

  const body = sections
    .map((section) => {
      const items = section.items
        .map((item) => `      {
        q: "${esc(item.q)}",
        a: "${esc(item.a)}",
      }`)
        .join(",\n");
      return `  {
    id: "${section.id}",
    title: "${esc(section.title)}",
    emoji: "${section.emoji}",
    description: "${esc(section.description)}",
    items: [
${items},
    ],
  }`;
    })
    .join(",\n");

  const file = `export type FAQ = { q: string; a: string };

export type FAQSection = {
  id: string;
  title: string;
  emoji: string;
  description: string;
  items: FAQ[];
};

export const FAQ_HERO_IMAGE = "/photos/branding-generated--hero-east-village-door-nyc.png";
export const FAQ_HERO_ALT =
  "East Village Door Supplier technician installing a premium entry door in a Manhattan walk-up";

export const FAQ_SECTIONS: FAQSection[] = [
${body},
];
`;
  writeFileSync(join(ROOT, "content/faq.ts"), file);
  console.log("Wrote content/faq.ts");
}

async function rewriteBlog(key, model) {
  const posts = [
    "choosing-entry-door-brooklyn-brownstone",
    "fire-rated-doors-nyc-multifamily",
    "storefront-door-repair-nyc-retail",
    "interior-door-replacement-nyc-apartment",
    "door-hardware-guide-nyc-buildings",
    "structural-door-repair-vs-replacement",
  ];

  const system = `Rewrite blog metadata for ${BUSINESS} (${ADDRESS}). Return JSON keyed by slug. Each: title, metaTitle, excerpt (1-2 sentences, unique), category (Residential|Commercial|Hardware|Repair|Planning), readMinutes (5-8), heroAlt, secondaryAlt. Focus East Village, Lower East Side, Manhattan walk-ups, NYC code context. Slugs stay unchanged.`;
  const generated = await chatJson(key, model, system, JSON.stringify(posts), 0.65);

  const existing = readFileSync(join(ROOT, "content/blog.ts"), "utf8");
  let updated = existing;
  for (const slug of posts) {
    const item = generated[slug];
    if (!item) continue;
    updated = updated.replace(
      new RegExp(`slug: "${slug}",\\s*title: "[^"]*",`, "s"),
      `slug: "${slug}",\n    title: "${esc(item.title)}",`
    );
    updated = updated.replace(
      new RegExp(`(slug: "${slug}"[\\s\\S]*?metaTitle: )"[^"]*"`, "m"),
      `$1"${esc(item.metaTitle)}"`
    );
    updated = updated.replace(
      new RegExp(`(slug: "${slug}"[\\s\\S]*?excerpt:\\s*\\n\\s*")([^"]*)"`, "m"),
      `$1${esc(item.excerpt)}"`
    );
    updated = updated.replace(
      new RegExp(`(slug: "${slug}"[\\s\\S]*?heroAlt: )"[^"]*"`, "m"),
      `$1"${esc(item.heroAlt)}"`
    );
    updated = updated.replace(
      new RegExp(`(slug: "${slug}"[\\s\\S]*?secondaryAlt: )"[^"]*"`, "m"),
      `$1"${esc(item.secondaryAlt)}"`
    );
  }
  writeFileSync(join(ROOT, "content/blog.ts"), updated);
  console.log("Updated content/blog.ts metadata");
}

async function rewriteMeta(key, model) {
  const system = `Write unique SEO homepage and business metadata for ${BUSINESS}, ${ADDRESS}, phone ${PHONE}, serving ${REGION}. Return JSON: tagline (max 14 words), homepageTitle, homepageDescription (155 chars max), llmsSummary (3 sentences for AI crawlers), footerBlurb (2 sentences). Mention East Village / Loisaida naturally once.`;
  const meta = await chatJson(key, model, system, "Generate metadata.", 0.55);

  const businessPath = join(ROOT, "lib/business.ts");
  let business = readFileSync(businessPath, "utf8");
  business = business.replace(/tagline: "[^"]*",/, `tagline: "${esc(meta.tagline)}",`);
  writeFileSync(businessPath, business);

  const pagePath = join(ROOT, "app/page.tsx");
  let page = readFileSync(pagePath, "utf8");
  page = page.replace(/title: "[^"]*",/, `title: "${esc(meta.homepageTitle)}",`);
  page = page.replace(
    /description:\s*\n\s*`[^`]*`/,
    `description:\n    \`${esc(meta.homepageDescription)}\``
  );
  writeFileSync(pagePath, page);

  const llms = `# ${BUSINESS}

${meta.llmsSummary}

- Name: ${BUSINESS}
- Website: https://${DOMAIN}
- Phone: ${PHONE}
- Email: info@${DOMAIN}
- Address: ${ADDRESS}
- Service region: ${REGION}

## Services
Residential and commercial door supply, custom installation, hardware, fire-rated doors, storefront systems, structural repair, and emergency service.

## Service areas
100 neighborhoods across Manhattan and Brooklyn from East Village HQ (10009).

## Key pages
- https://${DOMAIN}/
- https://${DOMAIN}/services
- https://${DOMAIN}/service-areas
- https://${DOMAIN}/quote
- https://${DOMAIN}/contact
`;
  writeFileSync(join(ROOT, "public/llms.txt"), llms);
  console.log("Updated business tagline, homepage meta, llms.txt");
}

const args = process.argv.slice(2);
const all = !args.length;
const run = (flag) => all || args.includes(flag);

loadEnvLocal();
const key = getOpenRouterKey();
if (!key) throw new Error("OPENROUTER_API_KEY required in .env.local");
const model = process.env.OPENROUTER_CHAT_MODEL || "google/gemini-2.5-flash";

if (run("--services")) {
  await rewriteServices(key, model);
  await sleep(800);
}
if (run("--faq")) {
  await rewriteFaq(key, model);
  await sleep(800);
}
if (run("--blog")) {
  await rewriteBlog(key, model);
  await sleep(800);
}
if (run("--meta")) {
  await rewriteMeta(key, model);
}

if (all) {
  await rewriteServices(key, model);
  await sleep(1000);
  await rewriteFaq(key, model);
  await sleep(1000);
  await rewriteBlog(key, model);
  await sleep(1000);
  await rewriteMeta(key, model);
}

console.log("Copy rewrite complete");
