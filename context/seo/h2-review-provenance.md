# H2 review-source provenance and parsing QA

The owner approved the second-phase handoff on November 1, 2026. `lib/review-records.json` is the new editorial data asset parsed from the supplied `Google-reviews-user-supplied.txt`. It is an **owner-supplied Google review snapshot**, not a newly fetched Google API response and not evidence of a current review total.

## Source evidence

| Source | SHA-256 |
| --- | --- |
| Google-reviews-user-supplied.txt | `0bb7c5b4f75eee25fbc82c86780a8a5aca300b4855d4bce0d2d1483cfb8409c4` |
| Handoff/README_Prompt.md | `b5d7bd5d488094edaa37af185f9fe3d6862fbed89e0a68720906d8e5971623a5` |

The original archive remains in the owner's supplied downloads. The extracted source is retained locally under `.qa-lock/phase2-handoff/` and is ignored by Git. The data asset retains exact public display names and full reviewer body text, including original spelling, punctuation, paragraph breaks and capitalization. It does not silently substitute the older `lib/reviewsData.js` text.

Parsed result: **23 entries, each marked five stars; 22 have written reviewer text; Christine Lee is a rating-only entry with an empty text/excerpt**. All 23 are retained in the data asset. These are counts of this supplied file only. Never display “23 Google reviews,” infer a current aggregate from this subset or invent a quote for the rating-only record.

## Separation and editorial treatment

- Stripped the literal `open_in_new` UI marker from display names; it is not a supplied permalink. No individual review URL or reviewer photo exists in this source. Their fields are `null`.
- Removed reviewer contribution counts, Local Guide labels and photo counts from quote text. They are not business review totals.
- Separated the `Services` / `Positive` blocks as historical source metadata. They are customer/Google tags, not proof that every tagged adjacent service is currently advertised.
- Separated Denise Yarbrough's `Reasonable price` label as `sourcePriceTag`, rather than prepending it to the written review.
- Excluded every business-owner response. The last owner header after Kim Perry is truncated in the supplied file; Kim's full reviewer body ends before the service tags and is not truncated by that header.
- Preserved **“Rebecca BBrewer”** exactly and added `display_name_spelling_requires_confirmation`. Do not silently change it to Rebecca Brewer. Also retained `ryan patton`, `H C` and `N. J.` as supplied.
- Kept the original Google date label only in `sourceDateLabel` for provenance. `publicationDate` and capture date remain `null`; the first three labels are relative and cannot be converted to absolute dates. The application should omit these historical labels unless it expressly identifies them as snapshot metadata.
- Full body text may mention a customer's health, chemical fogging, unusually fast response, pricing or outcomes. These are historical customer statements, not current business promises. The curated Jon Mroz excerpt avoids the medical-history paragraph. The Tyler Sather excerpt emphasizes the actual communication/pricing statement without turning historical fogging into an advertised current service. Do not extract those statements into new service claims.
- `editorialServiceContext` is an editorial association based on the body/service tags for balancing the carousel. It is not new structured service evidence. Water reviews are prioritized first: Steve Sierra, Justin Andrade, Susan DuBow and Kim Perry, followed by mold experiences and Tyler Sather's duct-cleaning record.

## Excerpt audit

Every nonempty excerpt is an **exact contiguous substring** of that record's full body. No spelling or punctuation was rewritten inside quotations, no owner response was inserted, and no two non-contiguous passages were stitched together. `excerpted`, `omittedBefore` and `omittedAfter` permit the UI to show honest ellipsis marks outside the stored excerpt. Offsets below are zero-based characters; the end is exclusive. All 22 written records have usable excerpts, exceeding the requested twelve substantive reviews.

| Display name | Full body characters | Excerpt characters | Start–end | Selection |
| --- | --- | --- | --- | --- |
| Steve Sierra | 109 | 109 | 0–109 | Full text |
| Rachel | 750 | 174 | 428–602 | Contiguous excerpt |
| Denise Yarbrough | 225 | 208 | 0–208 | Contiguous excerpt |
| Jon Mroz | 571 | 245 | 326–571 | Contiguous excerpt |
| Rebecca BBrewer | 263 | 205 | 0–205 | Contiguous excerpt |
| ryan patton | 164 | 164 | 0–164 | Full text |
| Sierra Gibson | 240 | 164 | 0–164 | Contiguous excerpt |
| Chavis Gill | 171 | 171 | 0–171 | Full text |
| Alvaro Zuluaga | 302 | 198 | 104–302 | Contiguous excerpt |
| Alexandria Cole | 80 | 80 | 0–80 | Full text |
| Nate Hill | 282 | 174 | 0–174 | Contiguous excerpt |
| Tyler Sather | 441 | 76 | 326–402 | Contiguous excerpt |
| Justin Andrade | 1508 | 211 | 57–268 | Contiguous excerpt |
| Charles Miller | 188 | 188 | 0–188 | Full text |
| H C | 304 | 243 | 0–243 | Contiguous excerpt |
| Michael Armstrong | 210 | 72 | 0–72 | Contiguous excerpt |
| Betina Davids | 980 | 118 | 387–505 | Contiguous excerpt |
| Richard Wilcox | 170 | 170 | 0–170 | Full text |
| N. J. | 340 | 156 | 0–156 | Contiguous excerpt |
| Kelly Rosensweet | 270 | 116 | 0–116 | Contiguous excerpt |
| Christine Lee | 0 | 0 | —–— | No written text |
| Susan DuBow | 279 | 220 | 0–220 | Contiguous excerpt |
| Kim Perry | 520 | 244 | 0–244 | Contiguous excerpt |

## Data/UI contract and validation

Use `id` as the React/card key, not the shared Google profile URL. `displayPriority` provides the curated order. Preserve the known business-profile destination `https://www.google.com/maps?cid=13860030253406824266` in the presentation layer, label it as the business Google profile, and do not imply it is a unique review permalink. Initials are appropriate while source-backed photos are unavailable. The previously directly checked 5.0 average/check date remains a separate record in `lib/google-reviews.js`; the source-file entry count must never replace its unknown live count.

Executed checks: exactly 23 records, 23 unique stable IDs, every rating equals 5, exactly 22 nonempty texts/excerpts, Christine Lee remains empty, every nonempty excerpt is a contiguous exact substring, and no excerpt contains the separated owner-response header/UI markers. Source hashes were calculated from the actual supplied bytes. No live Google review API or individual review/author-photo retrieval occurred in this bounded source task.

Plain English: The file gives us real customer words we can use. We saved all the words carefully and picked shorter pieces for cards. We still do not know Google's current total or have verified customer photos.
