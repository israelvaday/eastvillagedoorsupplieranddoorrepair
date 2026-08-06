# BH Painting Metro Detroit

Next.js site for interior, exterior, cabinet, commercial, trim, ceiling, and
wood-finishing services across Metro Detroit.

## Development

```powershell
npm install
npm run dev
```

Business details are centralized in `lib/business.ts`. Painting services and
service areas live in `content/`.

## Verification

```powershell
npx tsc --noEmit
npm run build
npm run build:pages
```

`build:pages` creates the GitHub Pages artifact in `out/` while preserving the
server-only quote API route.

## Generated assets

OpenRouter and Cloudflare credentials belong in the ignored `.env.local` file.
Never commit or print API keys.

```powershell
node scripts/openrouter-generate-site.mjs --test --force
node scripts/openrouter-generate-site.mjs --images-blog --images-gallery --images-brand --images-quote --force
node scripts/finalize-painting-assets.mjs
node scripts/clean-stale-assets.mjs
```

The site identifies generated images as project inspiration, not completed
customer work.

## Cloudflare

```powershell
node scripts/cloudflare-configure.mjs
node scripts/cloudflare-configure.mjs --apply
```

The apply command reconciles GitHub Pages DNS records and enables Email Routing.
Forwarding destinations must be verified in Cloudflare before the `info@` and
`quotes@` rules can be created.
