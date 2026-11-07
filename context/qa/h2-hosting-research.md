# H2 hosting and Netlify security research

Evidence collected 2026-11-02 UTC (2026-11-01 evening, America/New_York). Read-only investigation against the reviewed PR baseline `95496769f76fd267d36700df856058e947cc9efb`; implementation and later deployment checks are recorded separately. The complete approved `Handoff/README_Prompt.md` was read before this investigation. No hosting settings, environment variables, secrets, production deployments, or email recipients were changed.

## Authoritative project and duplicate previews — verified live

**The production Netlify project is `sprightly-horse-c6240e`. Use its PR preview for acceptance testing.**

| Public Netlify API GET | Site ID | `custom_domain` | `ssl_url` |
| --- | --- | --- | --- |
| [sprightly-horse-c6240e](https://api.netlify.com/api/v1/sites/sprightly-horse-c6240e.netlify.app) | `88d5e992-153d-4dff-8387-1794473fa980` | `boldcityiaq.com` | `https://boldcityiaq.com` |
| [boldcity2025](https://api.netlify.com/api/v1/sites/boldcity2025.netlify.app) | `8303e132-465a-44f7-b01b-31dd667a2e63` | `null` | `https://boldcity2025.netlify.app` |

Both unauthenticated API reads returned HTTP 200. Production and the `sprightly-horse-c6240e.netlify.app` alias also returned byte-identical homepage HTML: SHA-256 `6fc1a7c79b8b005ca684272aa7790874957c25d93d2351ac1671679a6fa6f84f`, Next build ID `xCFELcu_h5TXLF3OspIph`. `boldcity2025.netlify.app` returned a different build ID, `L4CE3NYPEvH-ch1AqZKiF`, and HTML hash. This independently supports the public API domain binding.

[PR #1](https://github.com/saybenn/BoldCity2025/pull/1) was open and draft at investigation time. [Commit statuses](https://api.github.com/repos/saybenn/BoldCity2025/commits/95496769f76fd267d36700df856058e947cc9efb/status) contained two successful Netlify preview statuses. The [check runs](https://api.github.com/repos/saybenn/BoldCity2025/commits/95496769f76fd267d36700df856058e947cc9efb/check-runs) identified separate deploys:

| Project | Preview | Baseline deploy / dashboard |
| --- | --- | --- |
| **sprightly-horse-c6240e — production project** | [Selected preview](https://deploy-preview-1--sprightly-horse-c6240e.netlify.app) | [6ae758914200681ab85d3a13](https://app.netlify.com/projects/sprightly-horse-c6240e/deploys/6ae758914200681ab85d3a13) |
| boldcity2025 — additional project | [Additional preview](https://deploy-preview-1--boldcity2025.netlify.app) | [6ae75891b95cf5ae84a12226](https://app.netlify.com/projects/boldcity2025/deploys/6ae75891b95cf5ae84a12226) |

Both projects processed three redirect rules and one header rule successfully. These are two independent Netlify projects responding to the same PR, not two URL labels for one deploy. Why the second project was created, whether it remains intentionally connected, and whether its environment values match are **unknown** without owner/account inspection. Do not delete either automatically. Successful deployment does not prove working Turnstile or email.

## HTTP observations — verified live, GET only

All six tested homepages/aliases/previews returned HTTP 200 with `Server: Netlify` and `X-Powered-By: Next.js`. The public production `/api/contact` returned GET 405 with a Netlify request ID. This verifies that Netlify serves the production API path; it does not verify a production POST or delivery.

| URL / path | Result | Evidence |
| --- | --- | --- |
| `https://boldcityiaq.com/` | 200, Netlify | `x-nf-request-id: 01M6D4PK4T81MF1SJ1WRQF6B1K` |
| `https://boldcityiaq.com/api/contact` | GET 405, Netlify | `01M6D4BQQEB2A10HX7KDDWK238` |
| Selected preview homepage | 200; `X-Robots-Tag: noindex` | `01M6D4BW8VRPEE55XGTMHTR58G` |
| Additional preview homepage | 200; `X-Robots-Tag: noindex` | `01M6D4BVDPJ9M74SWZSWQVT1HX` |
| Selected preview `/api/contact` | GET 405; `noindex` | `01M6D4SCASDESWA7C8VSQ1P6ZR` |
| Selected preview `/api/lead` | GET 405; `noindex` | `01M6D4SFAN57KV8S88326HE7G6` |
| Selected preview `/.netlify/functions/___netlify-server-handler` | GET 404; `noindex` | `01M6D4SFEH11EGH4HAP2ZBDH3P` |
| Same internal prefix plus `/api/contact` | GET 404; `noindex` | `01M6D4SJ9Q8EF0TQ5TN77NSGZ0` |
| Same internal prefix plus `/api/lead` | GET 404; `noindex` | `01M6D4SJFN8WEKDRRX1EWRKCWM` |

No POST, Turnstile token, Siteverify request, Postmark call, or rate-limit burst was performed by this investigation. DNS resolution through the local Node resolver failed with `ECONNREFUSED`; the public API and actual HTTP evidence above establish the provider/domain binding without relying on that failed DNS check. GET checks of obvious internal aliases are not proof against every alternate POST/header route.

## Baseline handler findings and trusted IP recommendation

Read-only inspection found `pages/api/lead.js` delegates to `pages/api/contact.ts`, forcing `formType: "lead"`. Both routes therefore share validation, strict Turnstile verification, Postmark handling, and the module-level throttle. Baseline IP selection only accepts `x-forwarded-for` on Vercel; otherwise it uses the adapted socket address or a shared `"unknown"` value. That is unsuitable for a Netlify adapter whose socket can represent a proxy rather than the visitor. The current in-memory throttle is supplemental: ten attempts per ten minutes per hash, bounded to 10,000 active keys. It cannot coordinate independent serverless instances.

Prefer **Netlify request Context** over an arbitrary header. The [Functions API](https://docs.netlify.com/build/functions/api/#getcontext) documents `getContext()` for framework abstractions; `Context.ip` represents the client address. Its [implementation](https://github.com/netlify/primitives/blob/main/packages/functions/prod/src/lib/get_context.ts) retrieves active request storage, and the [shared store](https://github.com/netlify/primitives/blob/main/packages/functions/prod/src/lib/context_store.ts) uses a global symbol so separately bundled packages and Netlify's runtime resolve the same storage. This avoids inventing a supposedly unforgeable custom request header.

The [current official Next adapter template](https://github.com/opennextjs/opennextjs-netlify/blob/main/src/build/templates/handler.tmpl.js) receives Netlify Context. Its [server handler](https://github.com/opennextjs/opennextjs-netlify/blob/main/src/run/handlers/server.ts) converts the web request through `toReqRes(request)` before invoking Next.js. This is source-level support for using the platform helper instead of the synthetic socket, **not a live confirmation that the deployed adapter/runtime supports the selected helper version**.

Recommended behavior: only on a recognized Netlify runtime, obtain `getContext().ip`, validate one IPv4/IPv6 address, and retain the shared per-instance limiter. If the context/helper/IP is missing or malformed, return 503 with a working call alternative before verification/email. Do not create an `unknown` bucket, silently bypass throttling, or fall back to user-supplied `X-Forwarded-For`. Keep direct local-server socket handling separate. A unit mock of Context verifies branches but cannot prove production header provenance.

Netlify staff [identify `x-nf-client-connection-ip` as the supported connecting-IP header](https://answers.netlify.com/t/upcoming-change-stripping-exposed-netlify-headers-from-function-and-proxy-requests/52665). That source does **not** establish a complete spoof-resistance guarantee for this deployed Next adapter. If a header-based fallback is chosen, owner/deployment testing must demonstrate replacement of forged incoming values; an environment flag by itself does not authenticate a header.

The [Edge API](https://docs.netlify.com/build/edge-functions/api/#ip) also exposes platform `context.ip` and permits a modified Request through `context.next(request)`. Sanitizing a custom forwarded header is insufficient unless every handler entry passes that edge function. Prefer the direct server Context helper; do not claim a private header is secret.

## Free path-level protection and exact configuration

[Netlify's current rate-limit documentation](https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/) supports code-based rules on all plans. Free/Starter/Personal permits two rules per project. Use per-domain-and-IP aggregation, a window no greater than 180 seconds, and the default 429 action. No paid store is required. Function rules belong in exported code configuration, not `netlify.toml`. Deployment post-processing logs must confirm the rule: invalid or undetected configuration need not fail deployment. Enforcement can lag ten seconds. The documentation describes code-rule targeting as path-based, so POST-only counting must not be claimed without verification.

[Edge declaration documentation](https://docs.netlify.com/build/edge-functions/declarations/) confirms `method: "POST"` and a path string or array. A single function with one URLPattern covering both routes is preferable to independent rules. Suggested conservative starting values, subject to the live preview test:

```js
export const config = {
  path: "/api/:endpoint(contact|lead)",
  method: "POST",
  onError: "fail",
  rateLimit: {
    action: "rate_limit",
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
  },
};
```

The Edge handler must pass legitimate requests onward, without reading/consuming the body unnecessarily, and fail closed if required context is absent. Do not enable response caching for the security middleware. [Optional Edge configuration](https://docs.netlify.com/build/edge-functions/optional-configuration/) explains fail-closed `onError` handling and why middleware should run for every request.

The [official config type](https://github.com/netlify/primitives/blob/main/packages/edge-functions/prod/src/lib/config.ts) supports the fields above. [Bundler declaration creation](https://github.com/netlify/edge-bundler/blob/main/node/declaration.ts) expands path arrays into routes; [manifest generation](https://github.com/netlify/edge-bundler/blob/main/node/manifest.ts) stores a single `traffic_rules` object per function name and separate method conditions on routes. A shared counter across the two paths is a reasonable inference from that representation; actual counter aggregation and POST-only counting require a deployed test. Built-in 429 has no documented custom JSON-body field. Ensure the browser handles a non-JSON 429. A rewrite action can provide custom content, but its status and retry semantics require separate verification.

## Owner/deployment actions and remaining verification

1. In Netlify, open **sprightly-horse-c6240e**, verify Domain management lists `boldcityiaq.com`, and verify its repository/production branch settings. Inspect **boldcity2025** separately and explain its intended purpose; keep it connected until the owner decides otherwise.
2. After the PR preview rebuilds, inspect the selected deploy's **post-processing log** for exact accepted path/method/aggregation/threshold configuration. Record the deployed adapter and runtime versions. Confirm `getContext().ip` works by logging only a safe success/failure diagnostic, never the IP itself, headers, tokens, keys, or form content.
3. Run a bounded preview-only test using invalid, non-personal payloads that cannot reach email. Alternate `/api/contact` and `/api/lead`; show that both become limited together, allow the documented counting delay, verify 429 behavior and recovery, and verify an unrelated page remains available. Inspect the accepted rule and response evidence; a mocked handler limit is not an edge integration check. Confirm forged `X-Forwarded-For` and `x-nf-client-connection-ip` do not create a new allowance. Do not test by sending legitimate lead emails repeatedly.
4. With explicit owner approval for account changes, use a dedicated preview Turnstile widget and matching client/secret pair. Authorize the exact selected preview hostname `deploy-preview-1--sprightly-horse-c6240e.netlify.app`; set the corresponding server allowed-host list in **Deploy Preview** context. If the additional preview remains used, authorize it deliberately with its own scoped configuration. Preserve production widget/hosts and strict action matching. Never put secrets in public/build-output variables.
5. In the selected project's preview context, configure an approved Postmark test server/template/sender and **test-only recipient**, with backup recipient cleared and visitor confirmations disabled. Rebuild when public client configuration changes. Only then perform the separately supervised legitimate challenge/Siteverify/submission and verify receipt. No successful external integration is claimed here.
6. Check both previews and any active branch URLs for noindex and absent production analytics network requests after the code change. The baseline preview noindex header is verified above; GTM isolation is not verified by those header checks. Owner-only GTM/GA4/Ads configuration still needs its own evidence.

**Readiness from this bounded investigation: NO-GO until real Turnstile + approved test-recipient delivery and deployed edge/IP verification pass.** Public hosting and preview noindex checks passed; those operational dependencies remain unverified.

Plain-English explanation: two copies of the website are connected to GitHub. The copy named `sprightly-horse-c6240e` owns the real website address. The form needs the hosting company's real visitor label, so a stranger cannot make up a new label to dodge its limit. We also need to watch a real robot check succeed and a test message arrive before saying the form works.
