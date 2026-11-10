# Revamp work and evidence ledger

**Current direction, November 8–9, 2026:** [GA4-only launch readiness](ga4-launch/README.md) supersedes historical Ads/photo blockers below. Working contact handling is preserved; certification mini-bands sit outside/beneath form cards. The owner additionally approved simple analytics opt-in: load GA4 only after Allow, keep declined forms usable. No merge, production deployment, GTM publication, live GA4 setting change or fresh real lead is authorized during preparation.

Approved scope: final addendum takes precedence over the original master specification. Work is on `codex/website-seo-revamp`; no merge, deployment, GBP edit or paid-account change is authorized by this branch. The owner confirmed the public Normandy Blvd address during this work and requested direct Google-profile review sourcing.

## Baseline and source confidence

GitHub connector confirms public repository `saybenn/BoldCity2025`, default branch `main`, current main commit `4b3c146d58fa759ae13a783f5a24a266dc575b5f`, matching the local base. Live homepage text, paths, duplicate canonical output, schema, GTM container and original address match this base. This provides reasonable production-source confidence; the hosting provider's deployment binding was not accessible and is not claimed as independently verified.

The initial checkout had ten modified files, chiefly the owner’s Normandy Blvd address changes and title changes. No reset/stash or destructive checkout was used. Address changes were incorporated and normalized; conflicting title/schema code was superseded by the approved service-first metadata architecture.

Live evidence: `baseline.json`, `baseline-robots-txt.txt`, `baseline-sitemap-xml.txt`, local `screenshots/baseline-home-375.png` and `screenshots/baseline-home-1440.png`. The tagged homepage returns HTTP 200 and the same clean declared canonical as the plain homepage. Both initially had duplicate canonical tags. A declared canonical does not establish Google's selected canonical.

Baseline build: TypeScript passed; restricted build failed to fetch the pre-existing Google fonts. A network-enabled build fetched fonts and exposed a route-config error in the implementation; this was corrected. Later build attempts and final results are recorded below after execution. Baseline lint script used removed `next lint` and was not runnable under Next 16; replaced with ESLint CLI. No baseline tests were present.

## Ticket register

| Ticket | Implementation and affected files | Verification / remaining dependency | Status |
| --- | --- | --- | --- |
| BC-00 | Feature branch; live baseline; Search Console analysis; source, tracking and media inventory | GitHub/main and live fingerprints match. Host deployment binding and GA4 administration unavailable | Partially completed — baseline complete; account checks pending |
| BC-00A | Shared service vocabulary; all form imports fixed; server Turnstile; origin validation; bounded throttle; Postmark retained; legacy API delegates to secured path | Mock API suite passes all service choices/actions/rejections/outages/delivery failures. Live delivery, edge rule and production host configuration require staging/account check | Partially completed — code tested; launch checks pending |
| BC-01 | Compact water-first homepage, licensed skyline trial and original-image fallback | Responsive browser QA passed; no short-term statistical experiment claim | Completed — local QA passed |
| BC-02 | Full registry and exact-path repairs; responsive images and source licenses | All 56 media files inspected; production source/optimized requests passed | Completed — 56 assets checked; no missing references |
| BC-03 | Curated company photos; honest in-progress comparison; native range and focus-managed gallery | Browser interaction and keyboard checks passed | Completed — local QA passed |
| BC-04 | Custom accessible review-card renderer immediately below hero; one verified data source; Google profile link | Direct Google 5.0 average verified. Google limited view did not expose a count or individual records; no invented excerpt, reviewer photo or count is published | Partially completed — 5.0 verified; individual cards blocked |
| BC-05 | Six distinct core service pages, including one new air duct cleaning route; supported scope, process, FAQs and related links | Production route/schema/media and browser checks passed | Completed — local QA passed |
| BC-06 | Seven hubs and fourteen retained water/mold routes; explicit local details and sources; invented case studies removed | All 21 evaluated in local-research.md; generated page matrix and browser checks passed | Completed — local QA passed |
| BC-07 | Real service/area collection indexes, air duct navigation/footer links, related service and area links; broken checklist destination repaired | Internal-link/sitemap scanner passed | Completed — local QA passed |
| BC-08 | Single metadata owner and one connected page graph, owner-confirmed NAP, no ratings or per-city offices | Initial HTML assertions for every route; external Rich Results/schema.org not run | Completed — automated structural validation passed |
| BC-09 | One dataLayer event contract, delegated calls/navigation, accepted-lead events, session first/latest attribution | API/browser mocks passed; GTM mapping, consent, GA4 key events and Ads deduplication not accessible | Partially completed — code tested; account configuration pending |
| BC-10 | Canonicals/social images/indexing/sitemap; no fake lastmod; keyboard controls; Next 16 security update | Build/lint/type/browser checks executed; no field Core Web Vitals claim | Completed — local QA passed |
| BC-11 | API regression tests, browser tests, production HTML/media/link/schema scanner and screenshots | Actual final commands/results recorded below | Completed locally; external launch checks remain |
| BC-12 | Shared SEO/media/analytics rules, inventories, event/schema contracts, local research and launch instructions | Evidence ledger complete; draft PR carries unresolved launch dependencies | Completed locally; external launch checks remain |

## Launch dependencies and genuine blockers

- GBP is awaiting owner reverification. Do not edit it. Recommended later changes: confirm current public address, website landing URL with existing tracking, advertised service categories, service scope, authentic project photos, review links and current business details. Do not add unverified services or create additional office locations.
- Current direct Google review text, photos and count require an accessible public profile or authorized export/API. Existing avatars and old review data are insufficient evidence of current information. The custom renderer supports verified records; it displays a source link when none are available.
- GTM/GA4/Ads administrative access is unavailable. Code changes do not constitute live event configuration. Follow `context/analytics/event-contract.md` and inspect DebugView/Preview before launch.
- Search Console URL inspection and query-to-page/search-appearance filters are unavailable. Follow `context/seo/search-baseline.md`; do not remove GBP tracking or infer ordinary organic rankings from average-position anomalies.
- Turnstile secret/site key/allowed hostnames must be configured in the actual preview/production environments. No secret values were changed. The API fails closed if verification is missing or unavailable.
- The in-process throttle is supplemental and resets across instances/restarts. Turnstile verification is single-use across instances. Apply a managed edge rule to POST `/api/contact` and `/api/lead` (e.g. 10 requests per IP per 10 minutes, tune after observing false positives) before enabling automatic visitor confirmation. No persistent external service was purchased or configured.
- Postmark notification acceptance is tested with mocks; one approved staging delivery to a test recipient remains necessary. Existing visitor confirmation remains opt-in; do not enable it before edge protection is verified.

## Evaluation after an approved deployment

Record deployment timestamp/version, hero variant, mobile screenshots, GSC clicks/impressions/CTR, GA4 landing sessions/engagement, accepted leads, telephone-link clicks and form-error categories. Compare the same periods/device/country filters and separate GBP-tagged landing traffic. Review approximately 7, 30 and 60 days after deployment. No future automation was created because deployment has not been approved or scheduled. Current traffic is too low for a short hero comparison to support a significance claim; use qualitative mobile review and cautiously interpreted conversion/engagement evidence.

Plain English: the code can be checked here, but Google account settings and real message delivery need their own checks before launch. A button click is not a completed phone call, and a preview is not a deployed website.


## Executed validation and observed results

| Check | Expected | Actual result | Status / evidence |
| --- | --- | --- | --- |
| npm run build | Production compile, type checking and static generation succeed | Next 16.4.3 compiled and generated 39 pages. Final visual corrections rebuilt before handoff | Pass; build output recorded in execution log |
| npm run typecheck | No TypeScript errors | Exit 0. Build also runs TypeScript | Pass |
| npm run lint | No lint errors | Exit 0; 0 errors, 11 warnings | Pass with warnings; lint-results.json |
| Undefined JS names | No missing runtime imports | Explicit no-undef scan: 0 errors. Rule now enabled for application JS | Pass; undefined-results.json |
| npm test | Mocked lead/security and schema regressions | 7 tests passed; no live email | Pass |
| Full browser suite | Responsive layout, gallery, calls/navigation, accepted-only leads, PII exclusion, attribution and ad redirect | 10 tests passed across requested widths and representative routes | Pass; named checks in tests/browser/site.spec.cjs |
| Affected browser rerun | Final image/copy changes preserve flows; native comparison responds to arrow key | 4 targeted tests passed after those changes | Pass; earlier targeted run recorded in execution log |
| Initial-HTML SEO/schema/media/link scan | One metadata owner, accurate entity, matching FAQs, valid links/images | 37 routes, 25 rendered assets, no issues | Pass; site-validation.json, schema-validation.md and page-matrix.md |
| Complete media refresh | Every source image decodes and all active referenced paths exist | 56 assets; missing=[]; 13 duplicate pairs retained intentionally | Pass; asset-inventory.json |
| Lockfile reproducibility | Package manifest and lockfile agree | npm ci --dry-run --ignore-scripts --offline: exit 0 | Pass; dependency installation repaired without deleting source |
| Dependency advisory audit | Identify real remaining advisories | 0 high, 0 critical; 4 low and 16 moderate remain | Documented; dependency-audit.json; no claim of zero advisories |
| Visual inspection | Readable mobile hero, review section visible, coherent photos/CTAs, no overflow | Inspected homepage top/proof/footer, core water mobile, Orange Park desktop and campaign desktop. Final captures packaged in evidence/ | Pass with known review-data limitation; visual-review.md |
| Google review source | Direct source for displayed average | Matching Google Maps profile visibly showed 5.0 on 2026-11-01 | Verified average only; reviews-verification.md |
| Live accounts/delivery | Actual receipt, GA4/GTM/Ads, GSC selected canonical | No administrative access or live test submission | Not verified; required before launch |
| External rich-result validators / field CWV | External validation and real-user performance | Not executed; no preview publication or deployed field data | Not verified; do not infer from build/tests |

Browser QA found and corrected a missing contact-form import, disappearing rejected-submission feedback caused by Turnstile reset, invalid legacy phone pattern, zero-height gallery dialog, two About links, unmatched campaign FAQ markup and a remounting/invisible-focus navigation pattern. Visual inspection also removed delayed trust-strip fading, corrected a local hero that inherited Jacksonville wording and limited the low-resolution hallway comparison to its native display size. These were targeted corrections, not unexplained test exclusions.

The new React optimization rule for synchronous browser-storage hydration remains advisory for the five existing forms and sticky call control. Other lint rules remain errors. The remaining warnings concern that hydration pattern, existing third-party images and hook dependency guidance; they are not hidden build failures.

Next.js and its matching ESLint package were updated within version 16 to 16.4.3 after the original 16.2.11 dependency tree reported published critical advisories. See the final online advisory report; the initial/offline audit is not substituted for it. The OneDrive lockfile write failure was repaired with npm-generated isolated lock output and atomic replacement; npm ci dry-run verified consistency.

## Ticket file map

| Ticket | Main affected files / artifacts |
| --- | --- |
| BC-00 | context/qa/baseline.json; baseline robots/sitemap snapshots; context/seo/search-baseline.md; work-ledger.md |
| BC-00A | lib/contact-services.js; lib/contact-security.js; pages/api/contact.ts; pages/api/lead.js; StandardContactForm, ContactRequestForm, AdContactForm, ModalContactForm, LeadForm, TurnstileField and AdsLeadFormSection; tests/contact.test.cjs |
| BC-01 | components/Hero.jsx; pages/index.js; public/images/jacksonville-skyline.webp; footer license credit |
| BC-02 | context/media/asset-registry.md; asset-inventory.json; audit-assets.cjs; repaired image paths in pages/components/service data |
| BC-03 | components/BeforeAfterSlider.jsx; components/service/ImageGrid.js; homepage ordering |
| BC-04 | lib/google-reviews.js; components/ReviewsCarousel.js; StaticTestimonials.jsx; pages/about/index.js; reviews-verification.md |
| BC-05 | lib/serviceData.js; pages/services/[slug].js; components/service/ServiceHero.jsx, Process.js, ImageGrid.js, TrustBar.jsx |
| BC-06 | data/service-area-pages/areas.ts, localDetails.ts, pageOverrides.ts; lib/service-area-pages/types.ts; both service-area templates and ServiceAreaHero.tsx; local-research.md |
| BC-07 | Navbar.jsx; Footer.jsx; ServicesOverview.jsx; service and area index routes; emergency-checklist.js; related service and nearby area links |
| BC-08 | lib/seo.js; Layout.jsx; MetaHead.js; SchemaMarkup.js; Footer.jsx; About metadata ownership; tests/seo.test.cjs |
| BC-09 | lib/analytics.ts, utm.js, gtm.js; AnalyticsLifecycle.tsx; TrackedPhoneLink.jsx; pages/_app.tsx; all contact forms; event-contract.md |
| BC-10 | sitemap.xml.ts; robots.txt; package.json/package-lock.json; tsconfig.json; Tailwind font variables; API, image and metadata repairs |
| BC-11 | tests/; scripts/; playwright.config.cjs; context/qa/evidence/; generated reports and visual-review.md |
| BC-12 | context/seo/ rules/contracts/research/matrix; context/media/; context/analytics/; context/qa/; README.md; ui-registry.md |

All tickets with account or source dependencies are explicitly partial. The revamp is not declared launch-complete while those checks and individual Google review content remain unresolved.


## Final handoff

Implementation branch: codex/website-seo-revamp, based on main at 4b3c146d58fa759ae13a783f5a24a266dc575b5f. Submitted as a draft PR because external source/account dependencies remain. No merge, production deployment, GBP mutation, new paid integration or credential change was performed. The PR records the implementation commit and review links.

Final visual refinement was followed by a successful production build and targeted lint check. The five affected homepage/service browser checks passed on the final build, and the 37-route scanner again reported zero issues for the final evidence captures. Latest targeted details are in browser-results.json. Earlier ten-check and accepted-lead/attribution runs remain the functional evidence for unchanged paths. No tests are represented as live account validation.

Remaining approval order: review the code and skyline trial; obtain authentic individual Google reviews; verify Turnstile/edge/Postmark and GTM/GA4/Ads on an approved preview; complete Search Console inspection; then separately approve merge and production launch. Perform the 7/30/60-day review relative to the actual launch date.

## Phase 2 update — November 3, 2026

The approved second handoff supersedes the remaining-review-content limitation above: all 23 supplied records are retained, with 22 genuine written excerpts displayed and no invented photos/dates/current total. Photography repetition, Netlify trusted IP and preview analytics have been corrected. Both real previews show the cards, noindex headers and zero Google tracking requests. Real invalid-request tests confirmed the selected preview's trusted-context retrieval, shared edge block, forged-header block and recovery; owner-only accepted-rule logs remain outstanding.

The real Cloudflare failure is diagnosed as **110200 — unauthorized preview hostname**. Preview-only account changes were approved in chat, but available access could not complete them. No successful real Siteverify/Postmark submission or email delivery is claimed. The updated application passed 12 unit tests and all 17 Chrome checks, two build contexts, type checking, lint (0 errors / 9 advisory warnings), the 37-route / 26-image scan and lockfile dry-run. Form delivery tests are mocked; real preview network/edge tests are separately recorded.

See [phase 2 launch review, six-ticket results and screenshots](h2-launch-review.md) and [exact owner account actions](h2-owner-actions.md). The recommendation remains **NO-GO for production**. Preserve the same branch and draft PR #1; no merge or production deployment is authorized.
