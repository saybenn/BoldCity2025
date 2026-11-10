# Phase 2 launch review

Reviewed November 3, 2026 (America/New_York). **NO-GO for production.** Repository corrections and both deploy previews are updated; no merge or production deployment was performed. The real form cannot complete until the preview's Cloudflare hostname is authorized and one approved staging email is received.

Application commit: [`2453899`](https://github.com/saybenn/BoldCity2025/commit/2453899222ea63724fcce3477c1527f56ca50499). Later evidence/QA-helper changes do not alter the application. Continue [draft PR #1](https://github.com/saybenn/BoldCity2025/pull/1) on `codex/website-seo-revamp`.

## Corrective tickets

| Ticket | Result | Evidence / remaining acceptance |
| --- | --- | --- |
| H2-01 — Genuine reviews | Implemented and browser-verified | All 23 supplied records retained, 22 written exact excerpts displayed; four water reviews lead. Two opposing desktop rows, mobile peeking swipe row, pause/reduced-motion/keyboard controls, full-text dialogs, initials where photos were unavailable. No clones, invented dates, individual permalinks, live total or review schema. [Provenance](../seo/h2-review-provenance.md) |
| H2-02 — Photography | Implemented and verified | Three optimized supplied views were matched to existing scenes, not claimed as separate jobs. Photo-free process steps and smaller galleries remove within-route repetition. [Comparison](../media/h2-photo-audit.md), [final DOM image map](../media/h2-route-image-final.json): 37 photo placements, no repeated image URL within a route. Legacy originals retained. |
| H2-03 — Cloudflare / real submission | Diagnosed; account blocker remains | Real selected-preview error **110200**, action `contact_standard`: hostname unauthorized. Script and challenge requests were observed live; no legitimate token, real Siteverify acceptance or Postmark delivery is claimed. Strict hostname/action checks, retry/call fallback and test-only nonproduction recipients are implemented. [Diagnostics](h2-live-turnstile.json), [exact owner steps](h2-owner-actions.md) |
| H2-04 — Netlify IP / edge | Implemented; substantial live verification passed | Official trusted Context IP reached API validation. Mixed endpoint burst → edge 429 on both paths after enforcement delay; forged forwarding headers stayed blocked; unrelated page 200; later both paths recovered. [Raw responses](h2-live-edge.json). Owner-only post-processing log, exact runtime/adapter and alternative-entry/method qualification remain required. Visitor confirmations remain disabled. |
| H2-05 — Preview analytics / indexing | Implemented and verified live | Both actual previews: 22 review cards, noindex header, no Google tracking requests or GTM elements, no page errors, one initial QA page view. [Live network scope](h2-live-preview.json). Separate local production build preserved public indexing and the canonical-host tracking gate; that Google response was mocked. [Production-mode test](h2-production-config.json) |
| H2-06 — Integration / readiness | Checks complete within available access; launch blocked | Automated checks and screenshots below pass. Real challenge + approved test-inbox receipt and owner-account configuration/log checks remain open. |

## Validation scope

| Check | Result | Real vs simulated |
| --- | --- | --- |
| Preview and separate production-mode builds | PASS; 39 generated pages each | Local builds; no production deployment |
| TypeScript | PASS | Actual checker |
| Unit/security/schema suite | 12 PASS | Postmark, Siteverify and Netlify Context mocked for API branches; canonical/schema and record checks run locally |
| Chrome suite | 17 PASS at 375 / 430 / 768 / 1440 | Actual browser layout, focus, motion, swipe, overflow, dialogs and QA events. Form success/failure delivery and challenge responses are mocked. Local analytics network-suppression test has no tracking interception. |
| Initial HTML, metadata, schema, links and images | 37 routes / 26 rendered assets; zero issues | Local preview and production-context builds; source and optimized image HTTP responses checked. No Google Rich Results or field Core Web Vitals claim. |
| Media inventory | 59 assets; zero missing references | Actual files; optimized variants preserve source provenance |
| ESLint | 0 errors, 9 existing advisory warnings | Actual linter; generated build folders excluded |
| Dependency audit | 0 high/critical; 4 low, 16 moderate | Online audit retained in [JSON](h2-dependency-audit.json); remaining advisories are not claimed fixed |
| Dependency lockfile | PASS | `npm ci --dry-run --ignore-scripts --offline`; no packages installed or lifecycle scripts run |
| Both hosted previews | PASS for reviews, network suppression, noindex and no page errors | Real external Chrome GET/navigation checks; no network mocks |
| Selected hosted API/edge | Observed Context retrieval, mixed-path block, spoof resistance and recovery PASS | Real invalid requests only; no token, lead or email |
| Cloudflare + Postmark end to end | BLOCKED | Actual client error 110200; **no real accepted submission or email sent** |

The final 17-test run used Chrome with two renderer processes and GPU disabled to fit this machine's memory. An earlier 16-test run passed before the final card-width/error-recovery additions; a resource-stalled rerun was interrupted and is not counted as passing. The complete 17-test result is [retained separately](h2-browser-results.json).

## Deployment evidence

Production belongs to **sprightly-horse-c6240e**, Netlify site `88d5e992-153d-4dff-8387-1794473fa980`; its PR preview is the acceptance target. The additional **boldcity2025** project has no custom domain and independently builds the same PR. Its intended purpose requires owner inspection; neither project was removed.

- [Selected preview](https://deploy-preview-1--sprightly-horse-c6240e.netlify.app): deploy `6aea8f80fa9df58077f8c647`, observed Next build `fxGceOzykRDyGLwOrDTgj`.
- [Additional preview](https://deploy-preview-1--boldcity2025.netlify.app): deploy `6aea8f80eb5c48789039269b`, observed Next build `pOf6kmgw8GpKn4pAGyjgD`.
- Both commit statuses succeeded for the application commit. The selected public deploy metadata reports one function and one edge function deployed. GitGuardian reported no detected secrets. These facts do not replace owner-only accepted rate-rule logs or real form delivery.

## Screenshots

Captures below are local final-application renders with loaded photos. The form failure is from the actual selected hosted preview. No review text or project scene was generated.

| View | Evidence |
| --- | --- |
| Mobile first fold | [375px](h2-evidence/home-top-375.png), [430px](h2-evidence/home-top-430.png) |
| Genuine reviews | [375px swipe](h2-evidence/reviews-375.webp), [430px swipe](h2-evidence/reviews-430.webp), [1440px two rows](h2-evidence/reviews-1440.webp) |
| Full homepage | [375px](h2-evidence/home-375.webp), [1440px](h2-evidence/home-1440.webp) |
| Emergency service | [375px](h2-evidence/emergency-375.webp), [1440px](h2-evidence/emergency-1440.webp) |
| Cloudflare failure + working call alternative | [Real preview](h2-evidence/live-form-domain-error.webp), [owner-supplied original failure](h2-evidence/owner-supplied-form-failure.webp) |

## Remaining owner work and release decision

Follow [the exact account checklist](h2-owner-actions.md) for the approved preview-only Cloudflare widget/Netlify scopes and test recipient. Then complete one legitimate challenge, real Siteverify validation, accepted API response and approved Postmark inbox delivery. Inspect Netlify post-processing logs and qualify remaining method/entry cases. GTM/GA4/Ads enhanced-measurement and conversion deduplication settings still need account review. GBP reverification and external citation correction must retain the owner-confirmed Normandy Boulevard address.

**NO-GO** until those real acceptance gates pass. No further broad discovery questionnaire or new PR is needed.

Plain English: the reviews and photos now work, the test websites no longer send visits to real customer tracking, and the form's traffic guard works in a real test. Cloudflare still does not recognize the test website address. That setting and a received test email must be checked before launch.
