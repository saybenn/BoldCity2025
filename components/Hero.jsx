import Image from "next/image";
import Link from "next/link";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import { trackCta } from "@/lib/analytics";

// Set to "original" to reverse the skyline trial at build time.
export const HERO_VARIANT = process.env.NEXT_PUBLIC_HOME_HERO_VARIANT === "original" ? "original" : "skyline";
export default function Hero() {
  return <header data-hero-variant={HERO_VARIANT} className="relative overflow-hidden bg-navy text-white">
    <Image src={HERO_VARIANT === "skyline" ? "/images/jacksonville-skyline.webp" : "/images/landing-min.webp"}
      alt={HERO_VARIANT === "skyline" ? "Downtown Jacksonville and the Main Street Bridge above the St. Johns River" : "Bold City IAQ branded service pickup"}
      fill priority fetchPriority="high" sizes="100vw" quality={75} className="object-cover object-center" />
    <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/50" />
    <div className="relative mx-auto max-w-6xl px-5 pb-6 pt-20 sm:px-6 sm:pb-12 sm:pt-28 lg:pb-16 lg:pt-36">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-aqua sm:text-sm">24/7 emergency service</p>
        <h1 className="mt-2 font-heading text-[clamp(1.875rem,7.5vw,3.5rem)] font-bold leading-[1.1]">Water Damage Cleanup in Jacksonville, FL</h1>
        <p className="mt-4 max-w-xl text-sm leading-5 text-white/90 sm:text-lg sm:leading-7">24/7 emergency water removal, structural drying, and restoration for Jacksonville homes and businesses. From burst pipes to storm damage, we’re ready when you need us.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <TrackedPhoneLink ctaLabel="Call Now" ctaLocation="HomeHero" page="/" href="tel:+19044346318" className="inline-flex min-h-12 items-center justify-center rounded-md bg-aqua px-5 py-3 font-semibold text-navy hover:bg-aqua-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Call Now: (904) 434-6318</TrackedPhoneLink>
          <Link href="/contact" onClick={() => trackCta({ cta_label: "Request Emergency Service", cta_location: "HomeHero", href: "/contact", page: "/", hero_variant: HERO_VARIANT })} className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Request Emergency Service</Link>
        </div>
        <Link href="/financing" onClick={() => trackCta({ cta_label: "Financing options", cta_location: "HomeHero", href: "/financing", page: "/" })} className="mt-4 inline-block text-xs text-white/90 underline underline-offset-4 sm:text-sm">Financing options for qualified customers</Link>
      </div>

    </div>
  </header>;
}
