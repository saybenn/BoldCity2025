import Image from "next/image";
import AdsSection from "./AdsSection";
import AdsButton from "./AdsButton";

export default function AdsHero() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <AdsSection className="py-12 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300 ring-1 ring-emerald-400/20">
              24/7 Emergency Restoration
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Emergency Restoration
              <span className="block text-amber-400">
                On Our Way in 2 Hours or Less
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-200 md:text-lg">
              Water, fire, mold, and storm-related cleanup with rapid
              stabilization, documentation support, and real local response
              across Jacksonville and Northeast Florida.
            </p>

            <div className="mt-5 rounded-2xl bg-zinc-800/90 px-4 py-3 ring-1 ring-zinc-700">
              <p className="text-sm text-zinc-100">
                <span className="font-semibold text-white">
                  No upfront cost for eligible financing paths.
                </span>{" "}
                We can also help document covered losses for insurance.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <AdsButton
                href="tel:+19044346318"
                variant="primary"
                ctaLocation="AdsHero"
                intent="call emergency restoration"
                className="min-w-[190px]"
              >
                Call Now (904) 434-6318
              </AdsButton>

              <AdsButton
                href="#request-service"
                variant="secondary"
                ctaLocation="AdsHero"
                intent="request emergency service"
                className="min-w-[190px]"
              >
                Request Emergency Service
              </AdsButton>

              <AdsButton
                href="#finance"
                variant="ghost"
                ctaLocation="AdsHero"
                intent="view financing"
                className="min-w-[170px]"
              >
                Get Financing
              </AdsButton>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-zinc-200 md:grid-cols-4">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                Live Answer 24/7
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                IICRC & NORMI Aware
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                Insurance Documentation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400">●</span>
                Local Jacksonville Team
              </li>
            </ul>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-zinc-700">
            <Image
              src="/images/fireprocess.webp"
              alt="Bold City IAQ emergency restoration technician"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </AdsSection>
    </header>
  );
}
