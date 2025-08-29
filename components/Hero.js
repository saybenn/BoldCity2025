import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="relative h-[100dvh] min-h-screen text-white overflow-hidden">
      {/* Image background */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/hero-water-floor.png"
          alt="Flooded wood floor water restoration background"
          fill
          quality={100}
          priority
          className="object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/20"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 gap-y-4 flex flex-col justify-center items-center text-center px-4 pt-16 sm:pt-12 h-full max-w-2xl mx-auto">
        {/* Financing Badge */}
        <span className="text-lg font-semibold bg-green px-4 py-2 rounded-full mb-4">
          Financing Available — Get Restored Now, Pay Later
        </span>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight text-lightText">
          24/7 Emergency Water Damage <br /> & Mold Remediation
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg font-sans text-lightText">
          Rapid response in Jacksonville, FL for flood, mold, and storm cleanup.
        </p>

        {/* CTA */}
        <Link
          href="/contact"
          aria-label="Get Help Now"
          className="mt-6 inline-block bg-aqua hover:bg-aqua-dark transition px-6 py-3 rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Get Help Now
        </Link>
      </div>
    </header>
  );
}
