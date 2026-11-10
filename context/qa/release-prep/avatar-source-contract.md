# Genuine reviewer photos — source and delivery contract

November 8, 2026: **0 genuine reviewer photographs retrieved, verified or rendered.** The owner confirmed there is no existing approved GBP API project/connection or authorized owner export. Connector discovery found no installed authorized GBP reviews API. No authorized Places API project/key or review response was available either. The limited Places alternative was assessed, not queried without authorization. Public Maps access does not substitute for API permission. No Maps scraping, cookie extraction, internal endpoints, name/image searches, fabricated faces or project-photo substitutions were used.

The homepage still renders initials for all 22 approved written reviews. All 23 original records, their order, names, ratings, full text, excerpts, null photo URLs and existing identifiers are unchanged. [Per-record report](avatar-match-report.json) records **not retrieved/unknown**, rather than claiming that Google has no photo. The rating-only record remains excluded from the written carousel.

## Implemented boundary

`ReviewsCarousel` accepts an optional server-supplied `reviewerAvatars` map keyed by the existing record ID. The homepage intentionally passes no map: **there is no active API integration or approved photo feed yet**. A trusted future server adapter must retrieve, match, validate, expire and authorize each entry. Never put Google tokens or an API credential in a public environment variable, browser bundle or this map. No new client API call or image proxy was added.

`verifiedReviewerAvatar` fails closed unless all of the following hold:

- Authorized GBP API/owner-export provenance, explicit verification and delivery approval, record ID, nonanonymous reviewer and Google review ID.
- Exact known Google review ID when available, otherwise complete normalized review text; full display name and rating corroborate either match. A conflicting known ID cannot fall back to text. First-name and excerpt-only matches fail.
- Verified-at/expiry dates are valid, not future/stale and at most 30 days apart. An actual provider may require a shorter window. Runtime expiry hides a mounted photo.
- Provider URL is unmodified HTTPS on exact `lh3.googleusercontent.com`, without credentials, arbitrary query values, port or fragment. Only an optional numeric `sz` up to 128 is accepted. Additional Google image hosts require evidence and code review; do not broadly allow `*.googleusercontent.com`.
- Server validation matches that exact URL, MIME is JPEG/PNG/WebP, actual fetched body at most 64 KiB and dimensions at most 128×128. Fetch safely with redirect/host limits, no credential forwarding, MIME/body checks and bounded time/size. A metadata assertion alone is not a real network validation. If the provider supplies a larger image and resizing is not permitted, keep initials rather than rewriting a provider URL.
- Provided attribution URLs are HTTPS Google Maps author/review links without credential queries. When required, both author and review access must be present. Avatar and reviewer name supply unobtrusive source access only for verified entries; decorative repeats never contain interactive links. There are no repeated “Read full review” or business-profile buttons.

`ReviewerAvatar` reserves a 40×40 circle, lazy loads the exact URL using unoptimized Next Image (no Next optimizer cache), uses cover cropping and no-referrer, and keeps initials behind loading pixels. Failed, disallowed, missing or expired sources fall back to initials. The image is decorative beside the already accessible reviewer name; duplicates stay inert and aria-hidden. Direct loading still contacts Google's image host; owner review of delivery/privacy requirements is part of source approval. The host guard does not independently police redirect targets; the server validation must check the final image and redirect chain.

## Owner/source onboarding, still pending

1. Use an approved Google Cloud project and authorized account for the **existing verified Bold City listing**. Do not create a new listing or change ownership. Request only the needed official access. [GBP prerequisites](https://developers.google.com/my-business/content/prereqs).
2. Call authenticated [accounts.locations.reviews.list](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list), pageSize up to 50, following every `nextPageToken`. Read `reviewId`, rating, full comment, display name, anonymous flag and [`reviewer.profilePhotoUrl`](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews). Alternatively use an authorized owner export containing the same evidence and usage approval. Keep tokens and unmatched review payloads out of Git.
3. Match all existing records deterministically; send uncertain, anonymous or photo-less entries to initials. Validate the actual photo body and author/source links, record the policy/source date, choose expiry, and have the owner approve delivery. Do not rewrite names/text/ordering or invent URLs to force a match.
4. Deliver fresh sanitized metadata through a server boundary with bounded retention and cache expiry. Do not check the map, photo binaries or API response into `public/images`, this report or a permanent static build. Purge at expiry/revocation. The UI is prepared for this adapter; the adapter is **not** implemented without access.
5. Rerun real authorized load/failure/identity/attribution checks and six-width QA before enabling any actual photo. Current colored-image tests prove rendering behavior only.

GBP's [current policies](https://developers.google.com/my-business/content/policies) limit authorized content use and temporary storage to at most 30 calendar days and require retaining provided attribution. This is an upper bound, not blanket permission to redistribute owner-export images. Treat authorization, current terms and source attribution as mandatory. Do not assume an export waives Google's restrictions.

Places is a separate integration with a limited review subset and different [display, attribution and storage rules](https://developers.google.com/maps/documentation/places/web-service/policies?authuser=31&hl=en). It may require a Google logo, reviewer attribution/avatar/profile access and direct review/source access. The current helper intentionally does **not** admit a Places source under GBP retention rules. Add a separately reviewed adapter/policy before using it. Preserve the approved 22-review collection even if only a small subset can be matched.

## QA provenance

The development-only fixture is kept under `tests/fixtures`, outside routable `pages`. It is temporarily copied into `pages` only for isolated component testing, guarded to development plus `QA_AVATAR_FIXTURE=true`, then removed before production build. It labels every identity as a fixture and mocks a tiny solid-color PNG and one failed image request. No synthetic portrait or fixture review is shipped. The homepage test confirms **44 initials avatars, zero portrait requests, 22 accessible reviews and 22 inert repeats**.
