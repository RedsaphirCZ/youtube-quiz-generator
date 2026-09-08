# YouTube Quiz Generator

A browser-based quiz workspace for creating research prompts, importing reviewed quiz JSON, playing curated or custom quizzes, and exporting recording-ready HTML and printable cards.

## Use as a website

Every push to `main` builds a browser-only website package in GitHub Actions. In a private repository on GitHub Free, open the latest successful **Build static website** run, download the `youtube-quiz-generator-website` artifact, extract it, and open `index.html` in a browser.

GitHub Pages cannot publish this private repository on the current account plan. If the repository is later made public or the account is upgraded to a plan that supports Pages for private source, the same workflow automatically adds the Pages deployment job.

The static website is designed for computers where you cannot install software:

- Get a downloadable or copyable research prompt.
- Import plain JSON or JSON inside a Markdown code fence.
- Browse curated quizzes and drafts saved in that browser.
- Play quizzes and create HTML, PDF, and nanDECK exports.
- Run local structure and quality checks.

Direct Gemini generation and online agent review are disabled on the public website because safely using them requires a private authenticated server. Use **Get prompt**, run it in ChatGPT or Gemini, and then use **Import**.

Browser storage is local to each computer and browser profile. Export anything you want to move between home and work, subject to workplace policy.

## Run the full private version locally

Prerequisite: Node.js 22 or newer.

1. Run `npm install`.
2. Copy `.env.example` to `.env` and set `GEMINI_API_KEY`.
3. Run `npm run dev`, or double-click `run.bat` on Windows.
4. Open `http://127.0.0.1:3000`.

The API key remains on the server and is never bundled into the browser code.

## Checks

```text
npm run lint
npm run check:agent-validator
npm run check:html-responsive
npm run check:prompt-import
npm run check:pdf-bleed
npm run build
npm run build:static
```

## Repository layout

- `src/` — React application and browser exporters
- `server.ts` — private Express/Gemini server
- `quizzes/` — source quiz catalog
- `factcheck/` — editorial and evidence records
- `scripts/` — checks, generators, exporters, and maintenance tools
- `davinci-resolve-quiz-builder/` — separate Resolve integration utility
- `migration/` — migration tooling; local database archives are excluded from Git

Generated folders such as `dist/`, `output/`, `tmp/`, `.playwright-cli/`, and `node_modules/` are excluded from Git and can be recreated.
