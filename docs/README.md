# BH Painting Metro Detroit

The deployable Next.js application lives in `site/`.

## Local development

```powershell
cd site
npm install
npm run dev
```

Business identity, phone, hours, service area, and email addresses are defined in
`site/lib/business.ts`. Painting services are defined in
`site/content/services.ts`.

## Generated painting assets

The OpenRouter generator loads credentials from the ignored
`site/.env.local` file. Never commit or print API keys.

```powershell
cd site
node scripts/openrouter-generate-site.mjs --test --force
node scripts/openrouter-generate-site.mjs --images-blog --images-gallery --images-brand --images-quote --force
node scripts/openrouter-generate-site.mjs --areas --force
```

The generator refreshes `site/content/photos.json` after production image runs.
`site/scripts/rebuild-area-insights.mjs` provides an offline painting-copy
fallback while preserving the existing Metro Detroit locations and landmarks.

## Build and deployment

```powershell
cd site
npm run build
```

GitHub Actions exports the static site and deploys it to GitHub Pages. The
canonical domain is `https://bhpaintingmetrodetroit.com`.

Cloudflare DNS and Email Routing can be inspected or reconciled without exposing
credentials:

```powershell
node scripts/cloudflare-configure.mjs
node scripts/cloudflare-configure.mjs --apply
```

The deployment keeps the apex domain and `www` DNS-only while GitHub provisions
HTTPS. Email Routing forwards the public `info@` and `quotes@` addresses to the
business notification recipients.
