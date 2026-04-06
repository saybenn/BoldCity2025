import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import {
  track,
  trackPageView,
  trackCta,
  trackCallClick,
} from "@/lib/analytics";

export default function ContactSuccessPage() {
  const router = useRouter();
  const service =
    typeof router.query.service === "string" && router.query.service.trim()
      ? router.query.service
      : "General Contact Request";

  useEffect(() => {
    trackPageView("/contact/success", {
      page_title: "Contact Request Received",
      page_type: "contact success page",
      intent: "request service",
      service_requested: service,
    });

    track("lead success view", {
      page: "/contact/success",
      page_type: "contact success page",
      intent: "request service",
      service_requested: service,
    });
  }, [service]);

  function handleCallClick() {
    trackCta({
      cta_label: "Call Now for Faster Response",
      cta_location: "ContactSuccessPage",
      intent: "call emergency restoration",
      page: "/contact/success",
      href: "tel:+19044346318",
    });

    trackCallClick({
      cta_location: "ContactSuccessPage",
      page: "/contact/success",
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  return (
    <Layout
      meta={{
        title: "Request Received | Bold City IAQ",
        description:
          "Your contact request was received. Call now for faster response.",
        canonical: "https://boldcityiaq.com/contact/success",
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
        },
      }}
      mainClassName="bg-zinc-50 text-zinc-900"
    >
      <section className="min-h-[70vh] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-zinc-200">
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-6 py-8 text-white sm:px-10 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-100">
              Request Received
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
              We got your request.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50">
              A member of the team will review it and follow up as quickly as
              possible.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Service Requested
              </p>
              <p className="mt-2 text-xl font-semibold text-zinc-900">
                {service}
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-amber-700">
                Need Faster Response?
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-800 sm:text-base">
                If the situation is urgent or actively getting worse, calling is
                still the fastest option.
              </p>

              <div className="mt-5">
                <a
                  href="tel:+19044346318"
                  onClick={handleCallClick}
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Call Now for Faster Response
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
