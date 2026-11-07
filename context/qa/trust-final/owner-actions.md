# Current launch gates — November 6, 2026

This supersedes the old Cloudflare 110200/access diagnosis and widget-creation instructions in historical phase-two reports. Keep the existing widget. Production deployment, merge and GTM publication remain unapproved.

## Already saved in connected accounts

- Netlify project `sprightly-horse-c6240e`: production `CONTACT_EMAIL_TO` is the existing verified Bold City business inbox; no `CONTACT_RECEIVER_BACKUP` appeared in the project variable list. Its address is deliberately withheld from public evidence. Only production `CONTACT_TEST_RECIPIENT` was emptied; every nonproduction value was preserved. The Deploy Preview test address remains `saybencodes@gmail.com`.
- The existing public widget key `0x4AAAAAAD9ugfKlSGrNmQaa` matches production and selected-preview Netlify configuration and deployed public JavaScript. Private-secret **presence** was checked with values masked; the secret was never retrieved, copied, printed, rotated or rewritten.
- Cloudflare's existing Managed widget authorizes `boldcityiaq.com`, `www.boldcityiaq.com` and `deploy-preview-1--sprightly-horse-c6240e.netlify.app`; no pre-clearance. No Cloudflare settings changed.
- One real preview lead was accepted and delivered through Postmark to the approved test inbox. [Exact live scope](live-accepted.json). This validates selected-preview verification/delivery through the unchanged secured handler. It does not validate a production submission, genuine spent-token replay, live analytics counts or mailbox reading.
- GTM workspace 4 / Default Workspace in `GTM-55RZQMX7` was manually edited, as requested after the upload attempt failed. Its actual downloaded export matches the intended changes. **No import and no publication occurred.**

## Saved GTM migration

Existing names/IDs are retained; the Custom Event matching value and GA4 event name now use the standardized website contract.

| Trigger / ID | Matching event | Existing tag / ID | GA4 event name |
| --- | --- | --- | --- |
| CE - view page / 37 | `page_view` | GA4 - view page / 45 | `page_view` |
| CE - click call / 38 | `phone_click` | GA4 - click call / 42 | `phone_click` |
| CE - click cta / 39 | `cta_click` | GA4 - click cta / 44 | `cta_click` |
| CE - submit form / 40 | `generate_lead` | GA4 - submit form / 46 | `generate_lead` |

The actual CTA tag is named `GA4 - click cta`, rather than `click account`. Five new version-2 data-layer variables have no default: `DL - page_path`, `DL - page_location`, `DL - form_id`, `DL - service_requested`, `DL - hero_variant`.

| Tag | Saved event parameters → data-layer variable |
| --- | --- |
| page_view | page_path → page_path; page_location → page_location; page_title → page_title; page_type → page_type |
| phone_click | page_path → page_path; page_location → page_location; cta_location → cta_location; phone_number → phone_number; hero_variant → hero_variant |
| cta_click | page_path → page_path; page_location → page_location; cta_location → cta_location; cta_label → cta_label; href → href; hero_variant → hero_variant |
| generate_lead | page_path → **page**; page_location → page_location; form_id → form_id; form_location → form_location; form_name → form_name; service_requested → service_requested |

`GA4 - Base` / 41 retains `send_page_view:false`, Initialization–All Pages and destination `G-9G03529W5P`; its default `page_location` is now `https://{{Page Hostname}}{{Page Path}}`. No raw Page URL mapping remains in these event tags. The lead's `page_path` intentionally uses `DL - page`, matching existing accepted-form payloads. Optional form name/service are cleared to null when absent.

All five tags' consent settings remain `NOT_SET`; this is an observed setting, not proof of an appropriate consent policy. Firing IDs, existing variables, built-ins and folders were preserved. [Machine-readable exact mappings/export comparison](gtm-migration.json).

## Required owner/release steps

1. **Review the complete GTM workspace before approval.** There were 37 pre-existing changes, including legacy tag/trigger deletions; the five variables bring the workspace to 42. Do not publish those unrelated changes without review. The actual draft contains five GA4 tags, four triggers, twenty custom and ten built-in variables. Confirm the published container/destination independently; the draft export is not a published-version audit.
2. **Verify GA4 automatic measurements.** In the property's web stream, inspect Enhanced Measurement → Page views → advanced browser-history settings. The app supplies initial and route-change page views; prevent a second history-driven path. The draft Base's `send_page_view:false` is verified, but the GA4 stream setting is not. Inspect automatic form interaction collection; generic form submission must never become an accepted lead conversion.
3. **Verify consent and Ads conversion configuration.** Test granted/denied states with the actual consent setup. Inspect GA4 `generate_lead` key-event configuration and Google Ads imports/native conversion tags; choose the intended primary conversion path so one accepted form is not counted twice. `phone_click` records intent, not a connected call. No consent defaults, Ads settings or GA4 property settings were changed here.
4. **Complete genuine replay and live event-count checks without another unapproved email.** The one approved email has already been used. First inspect the still-open successful preview tab in the main-page DevTools Console: `(window.dataLayer || []).filter(e => e.event === 'generate_lead').length` should be **1**. This read-only check requires no new submission; if it is zero, investigate before publication. The successful regular-browser session did not capture the spent token; the automation session could not pass Cloudflare. A future separately approved QA submission should capture only in-memory token/request data, verify one accepted response and one data-layer `generate_lead`, replay that spent token once, require rejection and no additional message/event, then discard token data. Current mocked cases do not substitute for this. Mail-server delivery is verified; actual inbox receipt/read confirmation remains owner-side.
5. **Keep both preview protections.** Both hosted previews were checked with real Chrome: noindex headers/meta, zero production Google tracking requests, compact reviews and no page overflow. Do not enable production GTM on them to obtain DebugView evidence. The additional `boldcity2025` project did not serve the supplied key, and its hostname is absent from the existing widget allowlist. Its form integration is unqualified; do not submit there, remove the project, or broaden widget hosts without a separate decision.
6. **Finish the existing Netlify protection qualification.** Historical live tests established mixed `/api/contact` + `/api/lead` POST edge blocking, forged-header resistance and recovery from one egress IP. Owner-only accepted-rule/post-processing logs, adapter/runtime versions, GET-counting exclusion and alternative entry paths remain unverified. Keep visitor confirmations disabled until that gate passes. No new burst test or rule weakening occurred in this UI phase.
7. **Approve release separately.** The new recipient guard is in the PR build; it is not yet deployed to production. The dashboard's production test-recipient setting is empty, while the existing business recipient is retained. After release approval, qualify the deployed production context/recipient behavior and container/GA4 delivery, with separately authorized test leads. No production form request was made in this phase.
8. **Retain content/account follow-up.** Keep the owner-confirmed Normandy Boulevard address. GBP/citation reverification and the historical rating/source name flag remain owner work. No current review total, dates, photos, invented job claims or self-serving rating schema were added.

**Decision: GO for review/preview; NO-GO for production.** Remaining gates are genuine replay/live event counting, GA4/Ads/consent qualification, full Netlify rule/runtime qualification and explicit release/publication approval. Production secret pairing has only configuration-presence evidence, not an exercised production token.

Plain English: the practice form sent one message to the test mailbox. The review cards now take less room and move smoothly. Before the real site goes out, we still need to check that one message counts once and an old robot-check pass cannot be used again.
