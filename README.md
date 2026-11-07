# Bold City IAQ website

Next.js Pages Router website for Bold City Indoor Air Quality and Emergency Services in Jacksonville, Florida. Keep established service and area URLs and the shared Postmark contact endpoint.

Use Node 20.9 or newer. Run npm ci, npm run dev for local development, or npm run build followed by npm start for a production preview. The existing next/font Google fonts need internet during a clean build.

Checks: npm test, npm run typecheck, npm run lint, npm run validate:site and npm run test:browser. Browser/site checks need a running production server; default is http://127.0.0.1:3000, configurable through QA_BASE_URL. Playwright uses an installed Chrome channel. All automated form checks mock delivery.

Project contracts and handoff:

- [Work tickets, evidence and launch dependencies](context/qa/work-ledger.md)
- [Validation workflow](context/qa/site-validation.md)
- [Visual review](context/qa/visual-review.md)
- [SEO page matrix](context/seo/page-matrix.md)
- [Metadata/schema contract](context/seo/schema-contract.md)
- [Page quality](context/seo/page-quality-rules.md) and [local content](context/seo/local-content-standard.md)
- [Analytics event contract and required GTM setup](context/analytics/event-contract.md)
- [Media registry and skyline license](context/media/asset-registry.md)
- [Google review verification status](context/seo/reviews-verification.md)
- [UI patterns](ui-registry.md)

The skyline hero trial can be reversed at build time with NEXT_PUBLIC_HOME_HERO_VARIANT=original. Originals and established media paths are retained. Displayed Google aggregate data and individual review records are maintained separately and need direct source verification.

Required existing runtime configuration includes POSTMARK_SERVER_TOKEN, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO, NEXT_PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY and the actual TURNSTILE_ALLOWED_HOSTNAMES. Existing optional Postmark templates, backup recipient and GTM ID are preserved. Never put secret values in source control. See the work ledger before enabling visitor confirmations or changing GTM/GA4/Ads settings.

Work is prepared on codex/website-seo-revamp. Merge and production deployment require owner approval.
