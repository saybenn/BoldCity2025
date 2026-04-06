import { Phone, ArrowRight } from "lucide-react";
import { trackCta, trackCallClick } from "@/lib/analytics";

export default function ContactHero({ data }) {
  function handleCallClick() {
    trackCta({
      cta_label: "Call Now",
      cta_location: "ContactHero",
      intent: "call emergency restoration",
      page: "/contact",
      href: data.phoneHref,
    });

    trackCallClick({
      cta_location: "ContactHero",
      page: "/contact",
      phone_number: "+19044346318",
      intent: "call emergency restoration",
    });
  }

  function handleRequestClick() {
    trackCta({
      cta_label: "Request Service",
      cta_location: "ContactHero",
      intent: "request service",
      page: "/contact",
      href: "#request-service",
    });
  }

  return (
    <section className="bg-navy px-4 pb-10 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full bg-aqua/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-aqua ring-1 ring-aqua/20">
            24/7 Emergency Response
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Contact Bold City IAQ
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Live answer, fast response, and real local help across Jacksonville
            and Northeast Florida. Calling is the fastest path.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={data.phoneHref}
              onClick={handleCallClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:text-base"
            >
              <Phone className="h-4 w-4" />
              Call Now {data.phoneDisplay}
            </a>

            <a
              href="#request-service"
              onClick={handleRequestClick}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-yellow-400 sm:text-base"
            >
              Request Service
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            <span>On our way in 2 hours or less</span>
            <span>Jacksonville-based</span>
            <span>Certified restoration support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
