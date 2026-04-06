import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, BadgeDollarSign } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative min-h-[92svh] overflow-hidden text-white lg:pb-32">
      <div className="absolute inset-0">
        <Image
          src="/images/landing-min.webp"
          alt="Water damage restoration scene inside a residential property"
          fill
          priority
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl items-center px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/financing"
            className="inline-flex max-w-[320px] flex-col items-center justify-center rounded-2xl bg-green px-5 py-3 text-center text-white shadow-md transition hover:opacity-95"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white/85 sm:text-xs">
              <BadgeDollarSign className="h-5 w-5" />
              Financing Available
            </span>
            <span className="mt-1 text-sm font-semibold leading-5 sm:text-base">
              Get Restored Now, Pay Later
            </span>
          </Link>

          <h1 className="mt-6 text-4xl font-heading font-bold leading-tight text-lightText sm:text-5xl lg:text-6xl">
            24/7 Emergency Water Damage Cleanup & Mold Remediation in
            Jacksonville
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-lightText/90 sm:text-lg lg:text-xl">
            Fast local response for water intrusion, mold issues, storm damage,
            and urgent cleanup. Call now or request immediate service.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm text-white/90 sm:text-base">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <MapPin className="h-4 w-4 text-aqua" />
              Jacksonville & Northeast Florida
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <Phone className="h-4 w-4 text-aqua" />
              Available 24/7 for emergency response
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="tel:+19044346318"
              className="inline-flex min-w-[220px] items-center justify-center rounded-md bg-aqua px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.02] hover:bg-aqua-dark focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Call now for emergency service"
            >
              Call Now
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-w-[220px] items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.02] hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Request emergency service"
            >
              Request Emergency Service
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
