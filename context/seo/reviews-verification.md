# Google review retrieval and verification

Attempted November 1, 2026. Status: **5.0 average rating directly verified on the matching public Google Maps profile**. Review count, individual review content, dates, authors and photos remain unverified. `lib/google-reviews.js` records the verified rating, unknown count as `null`, source URL and check date. `verifiedReviews` remains empty. Existing `lib/reviewsData.js` was left untouched by this research task. Existing website testimonials are historical source material, not proof of current Google records.

## Source identity and attempts

The existing Google map embed identifies:

- Business: Bold City Indoor Air Quality and Emergency Services Jacksonville.
- Maps feature identity: `0x88e5c10078d66fd9:0xc058b814f67b274a`.
- CID supplied for investigation: `13860030253406824266`.
- [Direct Google Maps CID link](https://www.google.com/maps?cid=13860030253406824266).

Public web retrieval attempts using the CID, feature identity, Google Search business name and direct Google review interface returned inaccessible responses, not a review payload. Google-domain searches did not yield directly inspectable individual Google reviews. These failures do not establish that the profile is removed or that reviews are unavailable to visitors.

Computer-use inventory exposed a native Chrome window but no browser-control surface. Selecting the native Chrome window timed out awaiting app approval. No Google profile UI, rating, individual review, reviewer photo or review date was read through that route. Do not repeat the same approval wait as a retrieval strategy.

An isolated headless Chrome inspection through the project's Playwright dependency subsequently succeeded after approval for public network access. The CID page returned HTTP 200 and the title `Bold City Indoor Air Quality and Emergency Services - Google Maps`. Visible profile details matched the business: `10066 103rd St #206, Jacksonville, FL 32210`, `boldcityiaq.com` and `(904) 434-6318`. Both the visible text and screenshot showed `5.0` with five stars. There was no review count. This establishes only the displayed average at this check date.

Google explicitly displayed `You're seeing a limited view of Google Maps`. Only Overview and About tabs were available; individual reviews were not exposed. One normal click on the visible `See more` button produced no further content or navigation. No access workaround was attempted. The read-only evidence is saved locally and ignored by Git under `test-results/google-review-source/`: `initial.txt`, `initial.html`, `initial.png`, `see-more.txt`, `see-more.html` and `see-more.png`. The screenshot was visually inspected in addition to reading the page text.

Third-party directories returned differing review totals. None was adopted as a verified current Google source. Names, excerpts, dates and avatar files already present in the repository were not upgraded to verified status. No CAPTCHA, login restriction or access barrier was bypassed. No credentials were read or created, no paid API was enabled, and no GBP information was edited.

## Supported routes to finish verification

1. Read the public Google profile in an available browser session. Record the current aggregate rating/count separately from each individual review's rating. For every published card, retain the exact displayed name, exact text or a clearly marked faithful excerpt, available publication date, direct review/profile source and the verification date. Use the reviewer's actual image only when its origin can be confirmed; otherwise show initials. Do not infer absolute dates from old relative-date strings in the repository.
2. If the owner provides an authorized existing Business Profile API integration, read reviews for the verified location. Google's review endpoint requires OAuth authorization and a verified location; pending GBP reverification may be an independent prerequisite. Do not create credentials or expand access merely to complete this website task. [Google review-data guide](https://developers.google.com/my-business/content/review-data), [specific review endpoint requirements](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/get).
3. An existing approved Places API integration can return review text, timestamps and author attribution, including `displayName`, `photoUri` and author/profile links. It returns at most five relevant reviews, not the full review archive. Google requires authorization and billing setup for Places; no such setup was authorized or added here. [Places response fields](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places), [Places setup](https://developers.google.com/maps/documentation/places/web-service/overview).

If Places data is used later, apply its attribution and storage rules. Include Google attribution and available author links/images; avoid creating an indefinite local cache of API review content. A static manually verified editorial file and an automated Places feed are different sourcing approaches. [Google Places policies](https://developers.google.com/maps/documentation/places/web-service/policies).

## Card data contract

Only directly verified records should populate the public custom Google cards. Suggested fields:

| Field | Meaning |
| --- | --- |
| `id` | Stable review ID or another source-backed stable identifier |
| `name` | Reviewer's exact public display name |
| `rating` | That review's numeric rating, separate from company aggregate |
| `quote` | Exact text or faithful clearly identified excerpt |
| `publishedAt` | Verified absolute publication date, otherwise omitted |
| `authorUrl` | Confirmed public reviewer profile URL where available |
| `photoUrl` | Confirmed reviewer profile-photo URL where available; no invented/stock portrait |
| `sourceUrl` | Direct review URL when available, otherwise the verified business Google review source |
| `verifiedAt` | Date that this record was checked against Google |

Store business aggregate in separate metadata only after verification, with its own `verifiedAt` and source URL. Do not calculate a purported Google average/count from the subset of reviews shown in the carousel. Keep `generate_lead` unrelated to review clicks, and track source links with `review_source_click`. Do not add `Review` or `AggregateRating` JSON-LD for self-serving local-business stars.

The custom card layout, accessible controls, mobile scrolling, review-source links and optional avatar support can be implemented independently. The directly verified 5.0 rating may be displayed with its check date and Google source link, without a review total or a live-sync claim. A neutral source-link presentation can remain until genuine individual records are verified; do not fill it with fabricated quotations or inferred totals.

Plain-English explanation: We can build the review cards now, but their words and pictures must come from the real Google reviews. Guessing a review count or reusing an old “two days ago” label would give visitors the wrong information.
