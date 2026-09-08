# Security and deployment

The public GitHub Pages build is intentionally browser-only. It does not contain a Gemini API key and it does not expose the Express API routes.

Do not deploy `server.ts` publicly until the API routes have authentication, rate limiting, request-size limits, and a private server-side `GEMINI_API_KEY`. The legacy Firestore configuration and its permissive development rules are excluded from Git.

Imported quizzes and quiz progress are stored in the current browser. They are not synced between home and work automatically. Use the app's JSON/HTML export options to move a quiz between devices when permitted by workplace policy.
