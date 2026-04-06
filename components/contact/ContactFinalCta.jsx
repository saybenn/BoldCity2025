import { trackCta, trackCallClick } from "@/lib/analytics";

export default function ContactFinalCta({ data }) {
  function handleCallClick() {
    trackCta({
      cta_label: "Final CTA Call Now",
      cta_location: "ContactFinalCta",
      intent: "call emergency restoration",
      page: "/contact",
      href: data.phoneHref,
    });

    trackCallClick({
      cta_location: "ContactFinalCta",
      page: "/contact",
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  function handleRequestClick() {
    trackCta({
      cta_label: "Final CTA Request Service",
      cta_location: "ContactFinalCta",
      intent: "request service",
      page: "/contact",
      href: "#request-service",
    });
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-blue-400 to-blue-700 p-6 text-white sm:p-8">
        <h2 className="text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
          Need help right now?
        </h2>

        <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-zinc-950/85">
          Call {data.phoneDisplay} for faster response, or submit the form above
          and we’ll follow up quickly.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={data.phoneHref}
            onClick={handleCallClick}
            className="inline-flex items-center justify-center rounded-full bg-aqua px-5 py-3 text-sm font-semibold text-navy transition hover:bg-aqua-dark"
          >
            Call Now
          </a>

          <a
            href="#request-service"
            onClick={handleRequestClick}
            className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-yellow-400"
          >
            Request Service
          </a>
        </div>
      </div>
    </section>
  );
}
