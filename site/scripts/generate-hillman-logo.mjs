/**
 * Generate only the East Village Door logo and favicon set (no paint/BH branding).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { generateImage, getOpenRouterKey, loadEnvLocal, sleep } from "./openrouter-lib.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const LOGO_PROMPT =
  "Professional vector app icon for East Village Door Supplier NYC, centered stylized door panel with rectangular frame and round knob, subtle letter H integrated into door design, cream background #F8F6F3, teal #0D6E6E and coral #E07A5F accents, premium minimal geometric logo, absolutely no paint roller, no paint brush, no letters BH, no painting tools, no text words, square 1:1";

async function main() {
  loadEnvLocal();
  const key = getOpenRouterKey();
  if (!key) throw new Error("OPENROUTER_API_KEY required");

  const model = process.env.OPENROUTER_IMAGE_MODEL || "google/gemini-2.5-flash-image-preview";
  const out = join(ROOT, "public", "logo.png");
  mkdirSync(dirname(out), { recursive: true });

  console.log("Generating East Village Door door logo...");
  const buffer = await generateImage(key, LOGO_PROMPT, {
    model,
    aspect_ratio: "1:1",
    resolution: "1K",
    quality: "high",
  });
  writeFileSync(out, buffer);
  console.log("Wrote public/logo.png");

  await sleep(1200);
  execFileSync(process.execPath, [join(ROOT, "scripts/finalize-door-assets.mjs")], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
