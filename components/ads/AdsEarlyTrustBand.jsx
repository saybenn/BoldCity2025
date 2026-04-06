import Image from "next/image";
import AdsSection from "./AdsSection";
import { adLandingPageData } from "@/lib/adLandingPage";

export default function AdsEarlyTrustBand() {
  const trustBar = adLandingPageData.trustBar;
  const serviceAreas = [
    "Jacksonville",
    "Orange Park",
    "Ponte Vedra",
    "Fleming Island",
    "St. Augustine",
    "Jacksonville Beach",
  ];

  return (
    <AdsSection className="py-8 md:py-10">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-200 md:p-8">
        <p className="text-center text-sm font-medium text-zinc-600">
          {trustBar.heading}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-5">
          {trustBar.badges.map((badge) => (
            <div key={badge.name} className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src={badge.image}
                  alt={badge.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-semibold text-zinc-700">
                {badge.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1 ring-zinc-200">
            <Image
              src={trustBar.testimonial.avatar}
              alt={trustBar.testimonial.author}
              fill
              className="object-cover"
            />
          </div>

          <blockquote className="text-center md:text-left">
            <p className="text-base font-medium leading-7 text-zinc-800 md:text-lg">
              &ldquo;{trustBar.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-2 text-sm text-zinc-500">
              — {trustBar.testimonial.author}
            </footer>
          </blockquote>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-600">
          {trustBar.subtext}
        </p>

        <div className="mt-6 border-t border-zinc-200 pt-6">
          <p className="text-center text-sm font-medium text-zinc-700">
            Proudly serving Jacksonville & nearby Northeast Florida areas
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 ring-1 ring-zinc-200"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AdsSection>
  );
}
