# YouTube Quiz Generator

A browser-based quiz workspace for creating research prompts, importing reviewed quiz JSON, playing curated or custom quizzes, and exporting recording-ready HTML and printable cards.

## Use as a website

Open the public app at **https://redsaphircz.github.io/youtube-quiz-generator/**. Every push to `main` rebuilds and deploys it through GitHub Actions.

The landing page also includes **Flag Card Studio** at `flag-card-studio/`, with Poker/Tarot card and A4/A5 write-under PDF workflows. It shares the bundled 195-country flag and silhouette library used by Picture Quiz.

The static website is designed for computers where you cannot install software:

- Get a downloadable or copyable research prompt.
- Import plain JSON or JSON inside a Markdown code fence.
- Browse curated quizzes and drafts saved in that browser.
- Play quizzes and create HTML, PDF, and nanDECK exports.
- Run local structure and quality checks.

No API key, account, server, or software installation is required. Use **Get prompt**, run the downloaded prompt in your preferred AI chat, and then use **Import**.

Browser storage is local to each computer and browser profile. Export anything you want to move between home and work, subject to workplace policy.

## Run locally for development

Prerequisite: Node.js 22 or newer.

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local address printed by Vite.

## Checks

```text
npm run lint
npm run check:quiz-validator
npm run check:html-responsive
npm run check:prompt-import
npm run check:pdf-bleed
npm run build
npm run build:static
```

## Repository layout

- `src/` — React application and browser exporters
- `quizzes/` — source quiz catalog
- `factcheck/` — editorial and evidence records
- `scripts/` — checks, generators, exporters, and maintenance tools
- `migration/` — migration tooling; local database archives are excluded from Git

Generated folders such as `dist/`, `output/`, `tmp/`, `.playwright-cli/`, and `node_modules/` are excluded from Git and can be recreated.

## Subdivision maps

Open **Subdivision Atlas** from the mode chooser to export first-level divisions as SVG or PNG. Choose a country and export a black-and-white map with English names (the default) or just the region outlines. Edit individual map labels in the editor; those edits are saved in the browser and project JSON. Small divisions use numbered margin labels. The 193 bundled country files are loaded only when selected; they need no third-party map API. A local copy served from this repository can work without internet. The hosted site still needs access to uncached files. Monaco and Vatican City have no usable multi-area ADM1 map in this dataset. The US map includes the 50 states and omits DC and overseas territories.

Boundaries come from [geoBoundaries gbOpen ADM1](https://www.geoboundaries.org/api.html). English labels are reconciled with [Natural Earth](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/) and [Unicode CLDR](https://github.com/unicode-org/cldr/blob/main/common/subdivisions/en.xml), with selected manual corrections. Czech map labels use short English forms such as Central Bohemia; the underlying source name is preserved. When no English equivalent is matched, the source spelling is retained and flagged in the editor. The original boundary license varies by country; a small credit remains on each export. Refresh the catalog and geometry with `node scripts/build-subdivision-catalog.mjs` and `node scripts/build-subdivision-geometry.mjs`, then run `node scripts/enrich-subdivision-names.mjs` in a network-enabled environment. Run `npm run check:subdivision-map` after refreshing data.


## Reliable picture quizzes

Choose **Picture Quiz → Get prompt**. For **Flags** and **Country shapes**, the prompt asks for ISO country codes, and the app supplies local pictures for 195 countries. No AI-generated image URLs are needed. The Library includes flag and country-shape starters.

For other categories, the prompt asks for picture descriptions and filenames. Import the JSON, then use **Upload / replace picture** on each review card. You can also select JSON and matching image files together. Old image URLs are copied into the project only if they can be fetched and decoded; inaccessible links stay blocked for replacement.

Review every picture against the displayed correct answer, confirm the review, and choose **Save & play**. Saved pictures live in IndexedDB in this browser. **Download project + pictures** creates a portable JSON backup with embedded images and bundled-asset credits; import that file on another computer. Clearing browser data removes local projects, so keep a downloaded backup. Saved/prepared rounds play without image-network access once the app is open; the hosted app shell is not an offline-installed PWA.

Individual uploaded images may be up to 12 MB. Assets are retained at their original resolution. The country artwork and license are in `public/picture-assets/`.

Additional checks:

```text
npm run check:picture-quiz
npm run check:picture-assets
npm run check:studio-settings
```

Browser regression: run the asset check above to prepare its corrupt-file fixture, start the app or production preview, open it using Playwright CLI, then run:

```text
npx --yes --package @playwright/cli playwright-cli run-code --filename scripts/browser-picture-assets.cjs
```

This creates QA-only drafts in that test browser and covers review gating, mismatched countries, embedded downloads/reimport, offline playback, persistence, broken/corrupt image replacement, storage-failure recovery, and narrow-screen layout.
