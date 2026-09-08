# YouTube Quiz Generator

A browser-based quiz workspace for creating research prompts, importing reviewed quiz JSON, playing curated or custom quizzes, and exporting recording-ready HTML and printable cards.

## Use as a website

Open the public app at **https://redsaphircz.github.io/youtube-quiz-generator/**. Every push to `main` rebuilds and deploys it through GitHub Actions.

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
