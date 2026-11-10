# Focused review presentation pass

Baseline: `e953573` on `codex/website-seo-revamp`, existing draft PR #1. This pass changes the review section's presentation only. All 22 written excerpts, reviewer identities, ratings and ordering are retained.

## Result

- Cards contain initials, name, Google review label, five stars and the existing excerpt only. Both bottom links and the full-review dialog are removed. One understated Google profile attribution remains outside the cards.
- Wider rectangular panels replace the narrow boxes. Desktop panels are 500px wide at 1440px, versus 350px before. Mobile panels are 327px wide at 375px and 382px wide at 430px. Content stays readable without line clamping.
- No visible arrows, pause/resume buttons, other carousel buttons, scrollbars, tracks or scroll indicators. Standard scrollbar suppression plus WebKit/legacy fallbacks is scoped to review tracks; soft edge masks finish the band.
- Desktop rows retain gentle opposing motion and reverse at their ends without a loop jump. Hover, focus and touch pause movement; offscreen/hidden-page work is suspended. Keyboard arrows browse; Escape holds motion paused, and Space permits resuming after focus leaves. Reduced motion disables autoplay. Mobile retains native swipe browsing.

## Before and after

Real local Chrome captures, same dimensions and reduced-motion setting. Screenshots are taken from the rendered page and cropped to the section to avoid sticky-header overlap. Raw panel dimensions, button/link counts and page overflow results are retained in the measurement files.

| View | Before | After |
| --- | --- | --- |
| Desktop, 1440px | [Screenshot](before-1440.webp) | [Screenshot](after-1440.webp) |
| Mobile, 375px | [Screenshot](before-375.webp) | [Screenshot](after-375.webp) |
| Mobile, 430px | [Screenshot](before-430.webp) | [Screenshot](after-430.webp) |

The first desktop panel changed from **350×362px to 500×236px**. The mobile panel changed from **293×410px to 327×272px** at 375px, and **335×362px to 382×250px** at 430px. Every rendered panel is wider than tall at the tested sizes. There are zero card links and zero section buttons.

## Verification

- Production build and its TypeScript checks pass. Targeted ESLint passes.
- **11 focused Chrome checks pass**, covering clean panels and exact excerpts, hidden scrollbars, keyboard browsing, opposing motion, hover/focus/touch pause, keyboard persistent pause/resume, reduced motion, homepage layout/gallery and exactly-once attribution events.
- No horizontal page overflow at 375, 430, 768 or 1440px. An additional 320px case checks review boundaries, rectangular geometry and keyboard access. The pre-existing verification widget outside this section can exceed its form column at 320px; that unrelated form layout is unchanged and is not claimed fixed by this pass.
- The real local-network preview guard check observes no Google tracking requests or GTM elements and confirms noindex. Homepage smoke tests isolate the Turnstile widget; no form submission/email or production analytics transmission was performed.
- Only Chrome was executed; cross-browser scrollbar fallback declarations are implemented but are not represented as separate Firefox/Safari test runs.

Final browser results: [browser-results.json](browser-results.json). Dimensions and counts: [before-measurements.json](before-measurements.json), [after-measurements.json](after-measurements.json).

## Exact file list

Application files:

- `components/ReviewsCarousel.js`
- `styles/globals.css`

Supporting files:

- `tests/browser/phase2.spec.cjs`
- `scripts/capture-review-pass.cjs`
- `ui-registry.md`
- `context/qa/review-ui/README.md`
- `context/qa/review-ui/browser-results.json`
- `context/qa/review-ui/before-measurements.json`
- `context/qa/review-ui/after-measurements.json`
- `context/qa/review-ui/before-375.webp`
- `context/qa/review-ui/before-430.webp`
- `context/qa/review-ui/before-1440.webp`
- `context/qa/review-ui/after-375.webp`
- `context/qa/review-ui/after-430.webp`
- `context/qa/review-ui/after-1440.webp`

SEO, schema, review source records, analytics infrastructure, preview protections, forms and other homepage sections were not edited. Existing launch/account gates remain recorded in the prior phase-two report. This UI pass does not authorize merge or production deployment.

Plain English: the reviews are wider and cleaner, and the extra links, buttons and bars are gone. The desktop reviews still drift gently, and people who prefer less motion get a still display.
