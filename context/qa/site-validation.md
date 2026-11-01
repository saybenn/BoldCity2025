# Validation workflow

Use Node 20.9+ and install from the committed lockfile with npm ci. Keep the Next.js Pages Router and existing Postmark delivery path.

1. `npm test` — mocked API/Turnstile/Postmark coverage and schema entity contracts. No live mail is sent. The API suite tests every shared selection, legacy aliases, all four form actions, validation, origin, honeypot, too-fast submissions, missing/expired/wrong-host/wrong-action tokens, verification outage, mail failure and throttling.
2. `npm run typecheck` and `npm run lint` — project code checks. Generated/local QA directories are excluded from lint.
3. `npm run build`, then `npm start` — production-like local server. The existing next/font Google fonts require internet at build time. Tests do not change environment secrets.
4. `npm run validate:site` — crawls the sitemap and noindex campaign/success pages from initial HTML, checks one H1/title/description/canonical/graph, stable owner-confirmed identity, service/area pairing, FAQ text parity, internal links, source/optimized image responses and unique indexable metadata. Generates `context/seo/page-matrix.md`, `schema-validation.md` and `site-validation.json`.
5. `npm run test:browser` — isolated headless Chrome at 375, 430, 768 and 1440 pixels plus representative service/area routes. Blocks GTM and mocks Turnstile and the contact API. Tests never send a real lead. Checks layout, keyboard comparison/gallery, navigation, event counts, accepted-only leads, campaign confirmation redirect and first-touch attribution. Screenshots remain local under `context/qa/screenshots/`; JSON results are retained.
6. `node context/media/audit-assets.cjs` — refreshes inventory/reference paths. Inspect new images visually before adding descriptions. Originals and existing paths are preserved.

The test browser uses the installed Chrome channel rather than a user browser profile. Start a local server separately, or set QA_BASE_URL to an approved preview. For screenshots capture a successful production build; do not equate development-server performance with field Core Web Vitals. Do not connect mocked local tests to the real email destination.

## Manual and account checks

Before merge/deploy approval, review mobile/desktop screenshots, Google source attribution and the user-facing page flow. Check menu, gallery focus/Escape, compare range with arrows, sticky call link and contact links. Account owners must verify actual Turnstile host configuration, edge rate rule, one approved Postmark delivery, GTM Preview/consent, GA4 DebugView/key events and Ads conversion deduplication. External schema.org and Google Rich Results tools remain separate checks once an approved preview is reachable.

Inspect all requested visuals and record actual findings in work-ledger.md. A missing account check remains unverified, even when local tests pass. Never claim a statistically significant hero result from this small traffic baseline.
