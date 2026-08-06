# East Village Door Supplier and Door Repair

Static Next.js site for **East Village Door Supplier and Door Repair** — headquartered at 99 Loisaida Ave, New York, NY 10009.

The deployable application lives in `site/`.

## Local development

```powershell
cd site
npm install
npm run dev
```

## Build & deploy

GitHub Actions builds and deploys to GitHub Pages. Canonical domain: `https://eastvillagedoorsupplieranddoorrepair.com`.

```powershell
cd site
npm run build:pages
```

## Asset generation

```powershell
cd site
node scripts/openrouter-generate-site.mjs --all --force
```

## Cloudflare DNS

```powershell
cd site
node scripts/cloudflare-configure.mjs --apply
```
