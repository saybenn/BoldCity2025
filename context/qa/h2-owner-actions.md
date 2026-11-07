# Phase 2 account actions and real acceptance gate

> Historical report. The November 6 phase supersedes the old 110200/access blocker and preview-widget creation instructions below: the existing widget now permits the selected preview, and a real test notification was delivered. Do not recreate/rotate it. See [current account changes, exact unpublished GTM mappings and remaining launch gates](trust-final/owner-actions.md).

Production merge/deploy is not authorized. The owner approved preview-only Cloudflare/Netlify configuration and one staging email to a supplied test inbox in chat. No production setting has been changed. Keep the actual approved recipient in the hosting secret/configuration interface, not this public repository.

## Selected project

Use **sprightly-horse-c6240e**, site ID `88d5e992-153d-4dff-8387-1794473fa980`. Its custom domain is `boldcityiaq.com`. Acceptance URL: `https://deploy-preview-1--sprightly-horse-c6240e.netlify.app`.

The separate `boldcity2025` project is also connected to this PR but has no custom domain. Its purpose and environment parity require owner inspection. Do not delete it or assume it owns production. See [hosting evidence](h2-hosting-research.md).

## Cloudflare and Netlify — blocking

**Confirmed live on the updated preview:** the widget reports `110200` with action `contact_standard`, and the challenge request returns HTTP 400. Cloudflare identifies this as an unauthorized domain in its [official error table](https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/). The script loads successfully; this observation identifies hostname authorization rather than a generic script-load failure. See [safe diagnostics](h2-live-turnstile.json). Secret pairing, server Siteverify acceptance and email delivery remain unverified because no legitimate token could be obtained.

1. Open Cloudflare Turnstile for the correct account. Create/select a dedicated **preview** widget with the exact hostname `deploy-preview-1--sprightly-horse-c6240e.netlify.app`. Preserve the production widget and its `boldcityiaq.com` / `www.boldcityiaq.com` host authorization. Do not use wildcard hosts or test/dummy keys for real acceptance.
2. In the selected Netlify project's environment variables, scope the following to **Deploy Previews**. Do not overwrite production values:
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: preview widget public key (build scope).
   - `TURNSTILE_SECRET_KEY`: matching preview widget secret (Functions runtime scope; never public).
   - `TURNSTILE_ALLOWED_HOSTNAMES`: exactly `deploy-preview-1--sprightly-horse-c6240e.netlify.app` (Functions runtime scope).
   - `CONTACT_TEST_RECIPIENT`: the single inbox approved in chat (Functions runtime scope). The handler rejects missing/multiple recipients in nonproduction and ignores business/backup recipients there.
   - Approved preview Postmark server token, sender, message stream and existing template aliases: `POSTMARK_SERVER_TOKEN`, `CONTACT_EMAIL_FROM`, `POSTMARK_MESSAGE_STREAM`, `POSTMARK_CONTACT_TEMPLATE_ALIAS`, `POSTMARK_AD_TEMPLATE_ALIAS` as needed. Do not change the production server/template settings.
   - Keep `SEND_VISITOR_CONFIRMATION=false` and `CONTACT_EDGE_VERIFIED=false` until actual edge protection is verified. Nonproduction confirmations are always disabled in code regardless of those flags.
3. Rebuild this PR preview because the public widget key is compiled into the browser. If the second project remains used, configure it separately with its exact host; otherwise treat it as an additional unqualified preview.
4. Inspect console/network without recording tokens or secrets. The widget action must match its form: `contact_standard`, `contact_ad`, `contact_modal`, or `contact_lead`. The API binds the Siteverify result to both the allowlist and the actual request hostname, then checks the exact action. A matching key pair and host authorization must be demonstrated, not inferred from a successful deploy.
5. Complete a legitimate challenge with any required at-action human CAPTCHA confirmation. Submit **one** clearly labeled staging request to the approved test inbox. Verify real Siteverify acceptance, one accepted API response, one local `generate_lead` event, one Postmark message/delivery event and actual receipt. No additional business/backup/visitor email may be generated. No real staging submission has been sent during repository implementation.

Account configuration could not be completed through available access: plugin search returned no Netlify/Cloudflare/Postmark connector; no corresponding CLI session was available. Computer Use stopped because it could not establish the Windows browser URL confidently enough to enforce its policy. This is an access/verification blocker, not a need for broader owner approval or permission to weaken verification.

## Netlify IP and edge verification — blocking

**Verified live at application commit `2453899`:** a JSON request with no name/token reached validation and returned 400, so the deployed Netlify context helper supplied a valid client IP. A bounded mixed-path burst followed by the documented enforcement delay produced non-JSON 429 on **both** endpoints; forged forwarding headers remained blocked; an unrelated page returned 200. Both endpoints later recovered to the expected 415 for invalid content type. No challenge tokens or email were involved. [Raw request IDs and responses](h2-live-edge.json) retain the evidence. This qualifies the observed preview behavior from one real egress IP, not independent-client isolation or every alternate entry point.

The API uses the official Netlify Functions `getContext().ip` helper, validates one IP address, and never falls back to arbitrary forwarded headers or a global unknown bucket on Netlify. Missing context returns 503 with a call alternative. The memory throttle is supplemental only. The legacy endpoint delegates to the same handler.

The repository adds one free code-based Edge rule for POST `/api/contact` and `/api/lead`, via one URLPattern, per IP/domain: **20 requests per 60 seconds**. Confirm the deployed post-processing log accepted the rule, available plan rule capacity, selected adapter/runtime, URLPattern matching and method behavior. Invalid rules may not fail a deploy. Deployment success alone is insufficient.

The preview-only script `scripts/h2-check-edge.cjs` sends invalid requests and accounts for Netlify's up-to-ten-second enforcement delay. Its live behavior checks passed as recorded above. **Still required:** inspect the owner-only post-processing log for accepted rule details and exact adapter/runtime versions; qualify GET-only counting exclusion and any alternative function entry paths before declaring protection fully accepted. The browser handles Netlify's non-JSON 429 safely. Leave visitor confirmations disabled until the full review passes; any production enablement requires a separately authorized release.

## Analytics and indexing

Production GTM now requires **production build context plus the canonical public hostname**. Preview/local pages retain QA dataLayer events but load neither GTM script nor noscript iframe. Netlify context/provider is compiled into the application so runtime detection does not depend solely on build-only variables. Unknown context fails closed for analytics and email routing. Preview builds emit noindex headers and metadata; production public pages retain index/follow, and campaign/success pages remain noindex.

Both rebuilt previews were checked in real Chrome with no tracking interception: 22 cards each, one initial QA page-view event, zero Google tracking requests, zero GTM elements, no page errors, and actual noindex response headers. See [live preview evidence](h2-live-preview.json). The separate local production build retained public index/follow and campaign noindex; its canonical-host GTM test explicitly mocked Google responses to avoid production analytics transmission ([test scope](h2-production-config.json)).

In GTM/GA4/Google Ads accounts (not accessible/verified here):

1. Confirm the canonical public container ID `GTM-55RZQMX7` and GA4 destination, then use Tag Assistant on production only after a separately authorized release.
2. In GA4 web stream Enhanced Measurement settings, inspect **Page views → Show advanced settings → Page changes based on browser history events**. The application supplies its own exactly-once SPA `page_view`; prevent a second automatic history page view. If the Google tag also auto-sends its initial page view, set its `send_page_view` behavior consistently with that custom event. Do not mark this configuration verified from local dataLayer tests.
3. Map one `generate_lead` to the chosen conversion mechanism. Audit GA4-imported versus native Google Ads conversion actions and primary/secondary settings to avoid counting both as primary. Phone clicks remain intent events and never become accepted form leads automatically.
4. Verify no PII in event parameters and no production GA4/Ads requests from either preview or branch aliases. Review/phone/CTA/form QA events may exist locally without being transmitted.

## GBP and content

Keep the owner-confirmed public address **14440 Normandy Blvd, Jacksonville, FL 32234**. Reverify/update GBP and other citations through the owner account; do not revert the site to the older address still visible in external sources. The supplied 23-record snapshot is historical source material, not the current Google review total. One record has no written review. No reviewer photos or individual review URLs were supplied; initials and a correctly labeled business-profile link are used. `Rebecca BBrewer` is preserved and flagged for owner confirmation. No self-serving Review/AggregateRating markup was added.

GO requires real challenge/Siteverify + approved inbox receipt + deployed trusted-IP/edge proof + final preview analytics/indexing evidence. Until then the recommendation is **NO-GO for production**.

Plain English: the new form rules are written and tested with practice messages. The owner still needs to connect the preview's real robot checker and test mailbox. We must watch a real check succeed and a test email arrive before launch.
