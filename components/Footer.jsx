import Link from "next/link";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

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
  { href: "/service-areas/ponte-vedra-beach", label: "Ponte Vedra Beach" },
  { href: "/service-areas/st-augustine", label: "St. Augustine" },
  { href: "/service-areas/orange-park", label: "Orange Park" },
  { href: "/service-areas/jacksonville-beach", label: "Jacksonville Beach" },
  { href: "/service-areas/neptune-beach", label: "Neptune Beach" },
  { href: "/service-areas/atlantic-beach", label: "Atlantic Beach" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <h3 className="font-heading text-3xl font-bold">Bold City IAQ</h3>
            <p className="mt-4 text-base leading-7 text-lightText/80">
              Emergency restoration and indoor air quality support for
              Jacksonville-area homes and businesses.
            </p>

            <div className="mt-5 space-y-2 text-sm leading-6 text-lightText/85">
              <p>
                14440 Normandy Blvd
                <br />
                Jacksonville, FL 32234
              </p>
              <p>
                <TrackedPhoneLink
                  href="tel:+19044346318"
                  phoneNumber="+19044346318"
                  ctaLabel="Footer Phone Number"
                  ctaLocation="Footer"
                  page={
                    typeof window !== "undefined"
                      ? window.location.pathname
                      : "/"
                  }
                  intent="call emergency restoration"
                  className="transition hover:text-aqua"
                >
                  (904) 434-6318
                </TrackedPhoneLink>
              </p>
              <p>Available 24/7 for emergency service</p>
            </div>

            <div className="mt-5">
              <TrackedPhoneLink
                href="tel:+19044346318"
                phoneNumber="+19044346318"
                ctaLabel="Footer Call Now"
                ctaLocation="Footer"
                page={
                  typeof window !== "undefined" ? window.location.pathname : "/"
                }
                intent="call emergency restoration"
                className="inline-flex rounded-full bg-aqua px-5 py-3 font-semibold text-navy transition hover:bg-aqua-dark"
              >
                Call Now
              </TrackedPhoneLink>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Services
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-lightText/85">
<li><Link href="/services/air-duct-cleaning" className="transition hover:text-aqua">Air Duct Cleaning</Link></li>
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
              Read a quick checklist to help you take the right first steps
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
          <p className="mb-3 text-xs">Jacksonville photo: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Jacksonville_skyline.jpg">Quintin Soloviev / Wikimedia Commons</a>, <a className="underline" href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Resized and cropped.</p>
          &copy; {new Date().getFullYear()} Bold City IAQ. All rights reserved.
        </div>
      </div>


    </footer>
  );
}
