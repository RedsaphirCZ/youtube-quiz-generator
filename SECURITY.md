# Security and deployment

The GitHub Pages build is intentionally browser-only. It contains no service credentials and makes no private API calls.

The legacy Firestore configuration and its permissive development rules are excluded from Git.

Imported quizzes and quiz progress are stored in the current browser. They are not synced between home and work automatically. Use the app's JSON/HTML export options to move a quiz between devices when permitted by workplace policy.
