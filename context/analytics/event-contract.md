# Analytics event contract

One transport: `lib/analytics.ts` pushes one object to `window.dataLayer`. GTM owns consent and GA4 delivery. There is no parallel `gtag` dispatch and no hardcoded Google Ads conversion label. `AnalyticsLifecycle` owns initial and client navigation page views, telephone clicks, meaningful service/financing CTA clicks and genuine first form focus. Individual accepted forms own `generate_lead`.

| Event | Trigger | Non-sensitive parameters | Code verification | Account verification |
| --- | --- | --- | --- | --- |
| page_view | Initial page and pathname changes, once | page_path, query-free page_location, page_title, page_type | Browser regression | Pending GTM/GA4 access |
| phone_click | Click a telephone link | cta_location, page_path, business phone_number, hero_variant | Browser regression | Pending |
| generate_lead | API explicitly returns ok:true and accepted:true, after Postmark accepts notification | form_id, form_location, service_requested, page | API mocks + browser mocks | Pending |
| cta_click | Contact/financing/request anchor click | cta_location, cta_label, page_path, href, hero_variant | Browser regression | Pending |
| form_start | First focus inside a form, once per mounted form | form_id, page_path | Browser regression | Pending |
| form_error | Native invalid input or caught validation/submission failure | form_id/form_location where known, error_category | Browser regression | Pending |
| review_source_click | Open a Google profile/review source | review_source, cta_location, page_path | Browser regression | Pending |

No names, customer phone numbers, email addresses, free-text messages, full campaign query strings or raw error strings enter this API. Payload keys are allowlisted. Service values are constrained to the shared service vocabulary. Only the business telephone number is sent. UTMs and ad click IDs remain in the lead-delivery payload, not in custom analytics events.

Legacy mapping: `view page` to `page_view`; `click call` to `phone_click`; `click cta` to `cta_click`; `submit form` and `lead_submit` to accepted `generate_lead`. `lead_success_view` describes a confirmation-page visit and is never a lead key event. Reloading or directly visiting a success URL cannot create `generate_lead`.

## Required GTM/GA4 configuration before launch

1. Inspect container `GTM-55RZQMX7` (or the existing environment override), confirm the real GA4 destination and existing consent initialization. The application loads the container once. No account settings were changed in this task.
2. Use Custom Event triggers for the seven events above, with corresponding GA4 event names. Define data-layer variables for the listed parameters. Remove/disable overlapping legacy triggers and form-click conversion tags after checking reporting consumers.
3. The explicit `page_view` contract requires the Google tag to have `send_page_view:false` and automatic history-based page views disabled. Do not publish both automatic and explicit navigation tags. Confirm using Preview before publishing the container.
4. Disable enhanced-measurement form interactions for these forms if they would generate a competing form_start/form_submit path. Do not map generic form_submit to an accepted lead.
5. Mark `generate_lead` as a GA4 key event. Assess `phone_click` separately as call intent, never as a completed call. Inspect Ads imports before selecting conversions so direct Ads tags and GA4 imports do not duplicate counting.
6. Apply the existing consent policy to Google/GA4 tags. Do not bypass a denied consent state; verify both consent states in Preview. This change does not invent a consent banner or alter consent defaults in the account.
7. In GTM Preview and GA4 DebugView, perform one approved staging submission with a test destination. Confirm exactly one lead; validation, rejected Turnstile and Postmark failure must produce none. Never send repeated test leads to the live business.

## Attribution

`lib/utm.js` keeps immutable first-touch landing/referrer and latest campaign-touch values in sessionStorage. Direct navigation does not overwrite the original landing page. Captures include UTM keys, GCLID, GBRAID and WBRAID. Storage failure is caught and forms continue. Form payloads include the original landing/referrer plus current conversion page and campaign context. Existing local-storage compatibility fields remain, but new central values take precedence. No credentials or customer data are stored in the attribution record.

## Interpreting results

A telephone-link click does not prove a connected call. A Postmark-accepted lead does not prove the recipient read the message. Confirm delivery in Postmark after an approved staging/live smoke test. GA4 engagement, landing sessions, engaged sessions, accepted leads and phone clicks are the post-launch measures; Search Console cannot measure bounce rate.
