import Link from "next/link";

const serviceLinks = [
  { href: "/services/water-damage-restoration", label: "Water Damage" },
  { href: "/services/mold-remediation", label: "Mold Remediation" },
  { href: "/services/fire-and-smoke-restoration", label: "Fire & Smoke" },
  {
    href: "/services/cleaning-and-sanitization",
    label: "Cleaning & Sanitization",
  },
  { href: "/services/emergency-services", label: "Emergency Services" },
];

const serviceAreaLinks = [
  { href: "/service-areas/jacksonville", label: "Jacksonville" },
  { href: "/service-areas/orange-park", label: "Orange Park" },
  { href: "/service-areas/fleming-island", label: "Fleming Island" },
  { href: "/service-areas/jacksonville-beach", label: "Jacksonville Beach" },
  { href: "/service-areas/ponte-vedra", label: "Ponte Vedra" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="text-3xl font-heading font-bold">Bold City IAQ</h3>
            <p className="mt-4 text-base leading-7 text-lightText/80">
              Emergency restoration and indoor air quality support for
              Jacksonville-area homes and businesses.
            </p>

            <div className="mt-5 space-y-2 text-sm leading-6 text-lightText/85">
              <p>
                10066 103rd St #206
                <br />
                Jacksonville, FL 32210
              </p>
              <p>
                <a
                  href="tel:+19044346318"
                  className="transition hover:text-aqua"
                >
                  (904) 434-6318
                </a>
              </p>
              <p>Available 24/7 for emergency service</p>
            </div>

            <div className="mt-5">
              <a
                href="tel:+19044346318"
                className="inline-flex rounded-full bg-aqua px-5 py-3 font-semibold text-navy transition hover:bg-aqua-dark"
              >
                Call Now
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Services
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-lightText/85">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-aqua">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Service Areas
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-lightText/85">
              {serviceAreaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-aqua">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Free Emergency Checklist
            </h4>
            <p className="mt-4 text-sm leading-7 text-lightText/80">
              Download a quick checklist to help you take the right first steps
              before damage gets worse.
            </p>

            <div className="mt-5">
              <Link
                href="/resources/emergency-checklist"
                className="inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-center font-semibold text-navy transition hover:bg-slate-100"
              >
                Get the Checklist
              </Link>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <h5 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
                Company
              </h5>
              <ul className="mt-4 space-y-3 text-sm text-lightText/85">
                <li>
                  <Link href="/about" className="transition hover:text-aqua">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition hover:text-aqua">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/financing"
                    className="transition hover:text-aqua"
                  >
                    Financing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-lightText/70">
          &copy; {new Date().getFullYear()} Bold City IAQ. All rights reserved.
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Bold City IAQ",
            image: "https://boldcityiaq.com/images/logo.png",
            url: "https://boldcityiaq.com",
            telephone: "+19044346318",
            address: {
              "@type": "PostalAddress",
              streetAddress: "10066 103rd St #206",
              addressLocality: "Jacksonville",
              addressRegion: "FL",
              postalCode: "32210",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 00:00-23:59",
            priceRange: "$$",
            sameAs: [],
          }),
        }}
      />
    </footer>
  );
}
