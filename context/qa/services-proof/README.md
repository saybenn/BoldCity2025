# Homepage photograph and review-copy correction

Continuation of `codex/website-seo-revamp`, draft PR #1. Baseline: `c7bc014`. The approved pasted homepage enhancement brief is implemented alongside the direct request to remove both review-section boilerplate lines.

## Result

- The restoration overview uses the existing approved `worker-at-protected-kitchen.webp`. All three candidate assets were inspected. This photograph gives the strongest view of an actual worker, protected kitchen, exposed framing and equipment. No project location, method, completion status or additional jobs are inferred.
- A full-width navy gradient protects white headings, light copy and aqua accents. Translucent navy panels retain the six service names, descriptions, order and destinations. Each entire card is a semantic link with a visible keyboard outline.
- A native CSS sticky image layer anchors behind the scrolling content on fine-pointer desktop at 1024px and wider. The parent clips its own painted overflow. There are no scroll listeners, animation libraries, transforms or zoom effects.
- Mobile, tablet, touch-pointer and reduced-motion layouts use an absolute, static image covering the section. No fixed-background behavior is forced. The taller static crop uses a larger responsive source to avoid stretching a small viewport-width rendition. The worker and equipment are clearest in the desktop composition; the long mobile card stack necessarily gives a tighter crop and obscures more of the photograph.
- Remove the complete “Rating checked November 1, 2026 · Google profile” line, its external link, and the complete “Selected customer reviews…” disclaimer. All 22 accepted excerpts, identities, ratings, ordering and carousel motion remain unchanged. Cards and section have no links/buttons, visible controls or scrollbars.

## Screenshots

Real Chrome viewport captures from the production build, with normal motion enabled. Top/middle/bottom frames show actual sticky painting rather than a misleading full-page screenshot of an offscreen sticky layer.

| Width | Top | Middle | Bottom |
| --- | --- | --- | --- |
| 375px | [View](services-375-top.webp) | [View](services-375-middle.webp) | [View](services-375-bottom.webp) |
| 430px | [View](services-430-top.webp) | [View](services-430-middle.webp) | [View](services-430-bottom.webp) |
| 768px | [View](services-768-top.webp) | [View](services-768-middle.webp) | [View](services-768-bottom.webp) |
| 1440px | [View](services-1440-top.webp) | [View](services-1440-middle.webp) | [View](services-1440-bottom.webp) |

Review copy after removal: [375px](reviews-375.webp), [1440px](reviews-1440.webp). The previous pass's before/after evidence remains in [review-ui](../review-ui/README.md) as historical evidence; its statement about retained attribution is superseded by this change.

## Verification

- `npm run build`: pass, including TypeScript and all 39 generated pages.
- Targeted ESLint on both components and both edited/new test files: pass.
- **18 focused Chrome checks pass**, results in [browser-results.json](browser-results.json). Coverage includes four restoration-section sizes, top/middle/bottom image coverage, desktop anchoring, static reduced-motion/touch fallbacks, six real internal navigations, keyboard focus, review removal and retained excerpts, hidden scrollbars, opposing review motion and pause behavior, gallery/dialog/range interaction, navigation/mobile call controls and exactly-once phone/CTA/page events.
- No horizontal page overflow or runtime errors at 375/430/768/1440px. Section height stayed unchanged across observed image loading/decoding. The additional 320px review test qualifies only review geometry and keyboard access; the existing unrelated form-widget minimum remains outside this pass.
- Actual rendered-background pixel sampling at all twelve scroll frames meets AA thresholds for sampled visible text. Foreground text is temporarily hidden without moving layout; fixed navigation/call-chip pixels are excluded because they occlude the text. Minimum normal-text ratios: **6.63:1** at 375px, **6.54:1** at 430/768px, **6.85:1** at 1440px. Large-text minima are 7.16:1 or better. This is a focused contrast check, not a full accessibility audit.
- Each sampled optimized image response is **157,423 bytes**. It is lazy-loaded, decorative and absolutely positioned; no new dependency or scroll-animation JavaScript was introduced. Field Core Web Vitals and Safari/Firefox performance were not measured, so no field-performance score is claimed.
- The real local-network guard test confirms retained noindex and zero production Google tracking requests. Homepage gallery/navigation/event smoke tests isolate the Turnstile script; no form requests or emails were submitted. This pass is not a live Siteverify/Postmark delivery test.

Initial contrast-sampler failures came from a text-color transition and the persistent call chip's white lettering being counted as card-background pixels. The sampler was corrected; no contrast thresholds were relaxed. The final retained report is the passing run.

Per-width measurements: [375px](coverage-375.json), [430px](coverage-430.json), [768px](coverage-768.json), [1440px](coverage-1440.json).

## Files changed in this pass

Application:

- `components/ReviewsCarousel.js`
- `components/ServicesOverview.jsx`
- `styles/globals.css`

Supporting code and documentation:

- `tests/browser/site.spec.cjs`
- `tests/browser/services-proof.spec.cjs`
- `ui-registry.md`
- `context/qa/services-proof/README.md`
- `context/qa/services-proof/browser-results.json`
- `context/qa/services-proof/coverage-375.json`
- `context/qa/services-proof/coverage-430.json`
- `context/qa/services-proof/coverage-768.json`
- `context/qa/services-proof/coverage-1440.json`
- The twelve service screenshots and two review screenshots linked above.

No asset source, review records, SEO/schema, analytics implementation, forms, hosting configuration or preview protections were changed.

## Release decision

**GO for this focused UI correction; production remains NO-GO.** Keep the PR draft. Cloudflare preview-host authorization, real Siteverify acceptance, test-recipient Postmark receipt, owner-side Netlify qualification and analytics/GBP launch requirements remain in [owner actions](../h2-owner-actions.md). No merge or production deployment is authorized or performed.

Plain English: the services now sit over a real work photo. The photo stays still while desktop cards slide past it, and mobile gets a simple still background. The two extra review sentences are gone.
