import Link from "next/link";
import { Phone } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackCta } from "@/lib/analytics";

export default function FinalCTA() {
  function handleRequestServiceClick() {
    trackCta({
      cta_label: "Request Service",
      cta_location: "FinalCTA",
      intent: "request service",
      page: "/",
      href: "/contact",
    });
  }

  return (
    <section className="border-y border-white/10 bg-gradient-to-b from-navy to-navy-dark px-6 py-16 text-center text-white sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-4xl font-bold lg:text-5xl">
          Don&apos;t Wait. Water Damage Gets Worse.
        </h2>

        <p className="mt-4 text-lg leading-8 text-lightText/85 lg:text-xl">
          Call now for emergency response or request service online in under a
          minute.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <TrackedPhoneLink
            href="tel:+19044346318"
            phoneNumber="+19044346318"
            ctaLabel="Call Now"
            ctaLocation="FinalCTA"
            page="/"
            intent="call emergency restoration"
            className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 text-lg font-semibold text-navy shadow-md transition hover:bg-aqua-dark"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </TrackedPhoneLink>

          <Link
            href="/contact"
            onClick={handleRequestServiceClick}
            className="inline-flex items-center rounded-full border border-white/15 bg-white px-6 py-3 text-lg font-semibold text-navy shadow transition hover:bg-white/90"
          >
            Request Service
          </Link>
        </div>

        <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm sm:text-base">
          Available 24/7 for emergency service
        </div>
      </div>
    </section>
  );
}
