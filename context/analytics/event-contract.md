# Analytics event contract

One transport: `lib/analytics.ts` pushes one object to `window.dataLayer`. GTM owns consent and GA4 delivery. There is no parallel `gtag` dispatch and no hardcoded Google Ads conversion label. `AnalyticsLifecycle` owns initial and client navigation page views, telephone clicks, meaningful service/financing CTA clicks and genuine first form focus. Individual accepted forms own `generate_lead`.

| Event | Trigger | Non-sensitive parameters | Code verification | Account verification |
| --- | --- | --- | --- | --- |
| page_view | Initial page and pathname changes, once | page_path, query-free page_location, page_title, page_type | Browser regression | GTM draft saved/export verified; GA4 delivery pending |
| phone_click | Click a telephone link | cta_location, page_path, business phone_number, hero_variant | Browser regression | GTM draft saved/export verified; GA4 delivery pending |
| generate_lead | API explicitly returns ok:true and accepted:true, after Postmark accepts notification | form_id, form_location, service_requested, page | API mocks + browser mocks; see current live-test report separately | GTM draft saved/export verified; live GA4 delivery pending |
| cta_click | Contact/financing/request anchor click | cta_location, cta_label, page_path, href, hero_variant | Browser regression | GTM draft saved/export verified; GA4 delivery pending |
| form_start | First focus inside a form, once per mounted form | form_id, page_path | Browser regression | QA data layer only; no account tag added in this pass |
| form_error | Native invalid input or caught validation/submission failure | form_id/form_location where known, error_category | Browser regression | QA data layer only; no account tag added in this pass |
| review_source_click | Reserved contract; current review band has no source links | review_source, cta_location, page_path | No current UI emits it | No tag added; do not create links to generate this event |

No names, customer phone numbers, email addresses, free-text messages, full campaign query strings or raw error strings enter this API. Payload keys are allowlisted. Service values are constrained to the shared service vocabulary. Only the business telephone number is sent. UTMs and ad click IDs remain in the lead-delivery payload, not in custom analytics events.

Legacy mapping: `view page` to `page_view`; `click call` to `phone_click`; `click cta` to `cta_click`; `submit form` and `lead_submit` to accepted `generate_lead`. `lead_success_view` describes a confirmation-page visit and is never a lead key event. Reloading or directly visiting a success URL cannot create `generate_lead`.

## Required GTM/GA4 configuration before launch

1. Container `GTM-55RZQMX7`, workspace 4, was inspected and manually updated as an **unpublished draft** on November 6, 2026. Five tags, four triggers and five new data-layer variables were verified against the actual downloaded workspace export. Destination `G-9G03529W5P` and consent settings were preserved. See [exact saved mappings and remaining owner actions](../qa/trust-final/owner-actions.md). No container version was published.
2. The four existing Custom Event triggers now match `page_view`, `phone_click`, `cta_click` and `generate_lead`; their GA4 tags use the same event names. Existing trigger/tag names and IDs were preserved. No legacy website emissions were added. Review all 42 workspace changes, including the owner's 37 pre-existing changes/deletions, before approving publication. Optional diagnostics (`form_start`/`form_error`) remain data-layer events; this pass adds no account tags for them.
3. The explicit `page_view` contract requires the Google tag to have `send_page_view:false` and automatic history-based page views disabled. Do not publish both automatic and explicit navigation tags. Confirm using Preview before publishing the container.
4. Disable enhanced-measurement form interactions for these forms if they would generate a competing form_start/form_submit path. Do not map generic form_submit to an accepted lead.
5. Mark `generate_lead` as a GA4 key event. Assess `phone_click` separately as call intent, never as a completed call. Inspect Ads imports before selecting conversions so direct Ads tags and GA4 imports do not duplicate counting.
6. Apply the existing consent policy to Google/GA4 tags. Do not bypass a denied consent state; verify both consent states in Preview. This change does not invent a consent banner or alter consent defaults in the account.
7. Validate unpublished mappings and consent using a separately isolated QA setup before publication. Both public deploy previews deliberately load no production GTM/GA4, even in ordinary QA use; do not defeat that guard to obtain DebugView evidence. After an explicitly approved release, use Tag Assistant/GA4 DebugView to confirm exactly one initial/navigation page view and one accepted lead, with none for validation, rejected Turnstile or Postmark failure. Never send repeated test leads to the live business.

Accepted-lead tracking clears omitted `form_name` and `service_requested` to `null`. GTM's version-2 data-layer model therefore cannot reuse those optional values from a previous form. Customer values are excluded by the allowlist; no form field values are mapped into the GA4 draft.

## Attribution

`lib/utm.js` keeps immutable first-touch landing/referrer and latest campaign-touch values in sessionStorage. Direct navigation does not overwrite the original landing page. Captures include UTM keys, GCLID, GBRAID and WBRAID. Storage failure is caught and forms continue. Form payloads include the original landing/referrer plus current conversion page and campaign context. Existing local-storage compatibility fields remain, but new central values take precedence. No credentials or customer data are stored in the attribution record.

## Interpreting results

A telephone-link click does not prove a connected call. A Postmark-accepted lead does not prove the recipient read the message. Confirm delivery in Postmark after an approved staging/live smoke test. GA4 engagement, landing sessions, engaged sessions, accepted leads and phone clicks are the post-launch measures; Search Console cannot measure bounce rate.
