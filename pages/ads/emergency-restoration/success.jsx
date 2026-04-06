import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Layout from "@/components/Layout";
import {
  track,
  trackPageView,
  trackCta,
  trackCallClick,
} from "@/lib/analytics";

export default function EmergencyRestorationSuccessPage() {
  const router = useRouter();

  const service =
    typeof router.query.service === "string" && router.query.service.trim()
      ? router.query.service
      : "Emergency Restoration Request";

  useEffect(() => {
    const pagePath =
      router.asPath?.split("?")[0] || "/ads/emergency-restoration/success";

    trackPageView(pagePath, {
      page_title: "Emergency Restoration Request Received",
      page_type: "ad landing page success",
      intent: "request emergency restoration service",
      service_requested: service,
    });

    track("lead success view", {
      page: pagePath,
      page_type: "ad landing page success",
      intent: "request emergency restoration service",
      service_requested: service,
    });
  }, [router.asPath, service]);

  function handleCallClick() {
    trackCta({
      cta_label: "Call Now for Faster Response",
      cta_location: "AdsSuccessPage",
      intent: "call emergency restoration",
      page: "/ads/emergency-restoration/success",
      href: "tel:+19044346318",
    });

    trackCallClick({
      cta_location: "AdsSuccessPage",
      page: "/ads/emergency-restoration/success",
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  function handleFinancingClick() {
    trackCta({
      cta_label: "View Financing Options",
      cta_location: "AdsSuccessPage",
      intent: "view financing",
      page: "/ads/emergency-restoration/success",
      href: "/financing",
    });
  }

  function handleHomeClick() {
    trackCta({
      cta_label: "Return to Main Site",
      cta_location: "AdsSuccessPage",
      intent: "return to site",
      page: "/ads/emergency-restoration/success",
      href: "/",
    });
  }

  return (
    <Layout
      meta={{
        title: "Request Received | Bold City IAQ",
        description:
          "Your emergency restoration request was received. Call now for faster response or review financing options.",
        canonical: "https://boldcityiaq.com/ads/emergency-restoration/success",
        image: "/images/andre-truck.webp",
      }}
      schema={{
        schemaType: "LocalBusiness",
        schemaOverrides: {
          telephone: "+19044346318",
          address: {
            streetAddress: "10066 103rd St #206",
            addressLocality: "Jacksonville",
            addressRegion: "FL",
            postalCode: "32210",
            addressCountry: "US",
          },
          name: "Bold City IAQ",
          url: "https://boldcityiaq.com/ads/emergency-restoration/success",
        },
        faq: [
          {
            question: "What happens after I submit the request form?",
            answer:
              "Your request is received for review and the team follows up as quickly as possible based on the information submitted.",
          },
          {
            question: "What should I do if the situation is urgent?",
            answer:
              "If the situation is active or worsening, calling right away is the fastest option.",
          },
        ],
      }}
      showNavbar={false}
      showFooter={false}
      showMobileStickyCallButton={false}
      mainClassName="bg-zinc-50 text-zinc-900"
    >
      <div className="min-h-screen px-4 py-10 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-zinc-200">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-8 text-white md:px-10 md:py-10">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">
                Request Received
              </p>

              <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">
                We got your emergency service request.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50 md:text-lg">
                A member of the team will review your request and follow up as
                quickly as possible.
              </p>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
                  Service Requested
                </p>
                <p className="mt-2 text-xl font-semibold text-zinc-900">
                  {service}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold text-blue-700">
                    Step 1
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    Your request is in the queue for review.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold text-blue-700">
                    Step 2
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    We use your details to determine the fastest response path.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-5 ring-1 ring-zinc-200">
                  <div className="text-sm font-semibold text-blue-700">
                    Step 3
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    If this is urgent, calling now is still the fastest option.
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-700">
                  Need Faster Response?
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-800 md:text-base">
                  For active water intrusion, urgent mold concerns, storm
                  damage, or immediate cleanup needs, call now instead of
                  waiting for a callback.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="tel:+19044346318"
                    onClick={handleCallClick}
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Call Now for Faster Response
                  </a>

                  <Link
                    href="/financing"
                    onClick={handleFinancingClick}
                    className="inline-flex items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
                  >
                    View Financing Options
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  onClick={handleHomeClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-zinc-200 transition hover:bg-zinc-50"
                >
                  Return to Main Site
                </Link>
              </div>

              <p className="mt-6 text-xs leading-6 text-zinc-500">
                If you submitted this by mistake or need to update details,
                calling the office is the fastest way to clarify your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
