// pages/about/index.js
import Layout from "@/components/Layout";
import MapEmbed from "@/components/MapEmbed";
import MetaHead from "@/components/MetaHead";
import SchemaMarkup from "@/components/SchemaMarkup";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const PHONE_DISPLAY = "(904) 434-6318";
const PHONE_TEL = "19044346318";
const FOUNDING_YEAR = "2018";

export default function AboutPage() {
  const data = {
    meta: {
      title:
        "About Bold City IAQ | Jacksonville Restoration Experts (IICRC & NORMI Certified)",
      description:
        "Locally owned restoration company serving Jacksonville & NE Florida. IICRC & NORMI certified technicians. 24/7 emergency response for water, fire, smoke, mold, and sanitization.",
      canonical: "https://www.boldcityiaq.com/about",
      og: {
        title: "About Bold City IAQ",
        description:
          "Jacksonville’s 24/7 certified restoration pros. IICRC & NORMI certified. Locally owned & operated.",
        image: "https://www.boldcityiaq.com/images/team-or-vehicle-hero.webp",
      },
    },
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Bold City Indoor Air Quality and Emergency Services",
      image: "https://www.boldcityiaq.com/images/logo.webp",
      "@id": "https://www.boldcityiaq.com/#about",
      url: "https://www.boldcityiaq.com/about",
      telephone: "+19044346318",
      address: {
        "@type": "PostalAddress",
        streetAddress: "10066 103rd St. Unit #206",
        addressLocality: "Jacksonville",
        addressRegion: "FL",
        postalCode: "32210",
        addressCountry: "US",
      },
      areaServed: [
        "Jacksonville FL",
        "Orange Park FL",
        "St. Augustine FL",
        "Ponte Vedra FL",
        "Fleming Island FL",
        "Duval County FL",
        "Clay County FL",
        "Flagler County FL",
      ],
      description:
        "Locally owned restoration company serving Jacksonville & NE Florida. IICRC & NORMI certified technicians. 24/7 emergency response for water, fire, smoke, mold & sanitization.",
      foundingDate: FOUNDING_YEAR,
      knowsAbout: [
        "Water Damage Restoration",
        "Fire Damage Restoration",
        "Smoke Damage Cleanup",
        "Mold Remediation",
        "Cleaning and Sanitization",
        "Emergency Restoration",
      ],
    },
  };

  return (
    <Layout>
      <MetaHead meta={data.meta} />
      <SchemaMarkup schema={data.schema} />

      <main>
        {/* HERO */}
        <section className=" pt-24 bg-navy relative text-white">
          {/* Brand gradient + subtle texture */}

          <div className="mx-auto max-w-[1120px] px-5 py-10">
            <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
              {/* copy */}
              <div>
                <span className="mb-2 inline-block rounded-full border border-white/25 bg-green px-2.5 py-1 text-[12px] font-bold tracking-wide backdrop-blur-sm">
                  Financing Available
                </span>

                <h1 className="mb-3 text-3xl leading-tight md:text-[clamp(2rem,2.6vw+1.2rem,3rem)]">
                  About Bold City IAQ — Jacksonville’s 24/7 Certified
                  Restoration Pros
                </h1>

                <p className="mb-5 max-w-[42ch] text-[#EAF6FF]">
                  <strong>Locally owned &amp; operated.</strong> On our way in{" "}
                  <strong>2 hours or less</strong>. Insurance‑ready
                  documentation.
                </p>

                {/* badges */}
                <div className="rounded-[14px] border border-white/15 bg-white/10 p-3 backdrop-blur">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="grid place-items-center gap-1 text-white/90">
                      <Image
                        src="/images/badges/iicrc.webp"
                        alt="IICRC Certified"
                        width={88}
                        height={88}
                      />
                      <span className="text-xs">IICRC Certified</span>
                    </div>
                    <div className="grid place-items-center gap-1 text-white/90">
                      <Image
                        src="/images/badges/normi.png"
                        alt="NORMI Certified"
                        width={88}
                        height={88}
                      />
                      <span className="text-xs">NORMI Certified</span>
                    </div>
                    <div className="grid place-items-center gap-1 text-white/90">
                      <Image
                        src="/images/badges/google5.png"
                        alt="Google Reviews 5 Stars"
                        width={88}
                        height={88}
                      />
                    </div>
                    <div className="grid place-items-center gap-1 text-white/90">
                      <Image
                        src="/images/badges/since.webp"
                        alt={`Serving NE Florida since ${FOUNDING_YEAR}`}
                        width={88}
                        height={88}
                      />
                      <span className="text-xs">Since {FOUNDING_YEAR}</span>
                    </div>
                  </div>
                </div>

                {/* ctas */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    className="inline-flex items-center justify-center rounded-[14px] bg-aqua px-5 py-3 font-bold text-navy shadow-[0_10px_22px_rgba(27,201,208,.25),_0_2px_6px_rgba(0,0,0,.12)] transition hover:-translate-y-[1px] hover:bg-aqua-dark"
                    href={`tel:${PHONE_TEL}`}
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                  <Link
                    className="inline-flex items-center justify-center rounded-[14px] border-2 border-white px-5 py-3 font-bold text-white transition hover:bg-white hover:text-navy"
                    href="/contact#lead-form"
                  >
                    Request Service
                  </Link>
                </div>
              </div>

              {/* media */}
              <div>
                <div className="relative h-[340px] w-full overflow-hidden rounded-2xl  shadow-[0_20px_60px_rgba(0,0,0,.30),inset_0_0_0_1px_rgba(255,255,255,.2)]">
                  <Image
                    src="/images/about-hero.webp"
                    alt="Bold City IAQ team and service vehicle"
                    fill
                    priority
                    sizes="(min-width:1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story & Mission */}
        <section className="mx-auto max-w-[1120px] px-5 py-8">
          <h2 className="mb-3 text-4xl lg:text-5xl text-darkText">
            Our Story &amp; Mission
          </h2>
          <p className="text-[#2a2a2a] text-lg">
            Bold City Indoor Air Quality and Emergency Services was built right
            here in Northeast Florida to bring fast, certified restoration to
            our neighbors when it matters most. From the first call to the final
            walkthrough, our focus is your family’s health, your property’s
            safety, and getting life back to normal—quickly and professionally.
          </p>
          <p className="mt-3 text-[#2a2a2a]">
            Our mission is simple: deliver <strong>prompt</strong>,{" "}
            <strong>professional</strong>, and <strong>insurance‑ready</strong>{" "}
            restoration with clear communication every step of the way.
          </p>
        </section>

        {/* Certifications & Training */}
        <section className="border-y border-[#E6EDF5] bg-[#EEF6FB]">
          <div className="mx-auto max-w-[1120px] px-5 py-8">
            <h2 className="mb-3 text-4xl lg:text-5xl text-darkText">
              Certifications &amp; Training
            </h2>
            <ul className="grid gap-3 md:grid-cols-2 text-darkText">
              <li>
                <strong>IICRC Certified Firm</strong> — water, fire/smoke, and
                microbial remediation standards.
              </li>
              <li>
                <strong>NORMI Certified</strong> — mold assessment &amp;
                remediation best practices.
              </li>
              <li>
                Insured, background‑checked technicians; OSHA‑aligned safety.
              </li>
              <li>
                Standard operating procedures: moisture mapping, photo logs,
                documentation for claims.
              </li>
            </ul>
          </div>
        </section>

        {/* What We Do */}
        <section className="mx-auto max-w-[1120px] px-5 py-8">
          <h2 className="mb-3 text-4xl lg:text-5xl text-darkText">
            What We Do
          </h2>
          <ul className="grid gap-3">
            <li>
              <Link
                href="/services/water-damage-restoration"
                className="text-navy hover:underline"
              >
                <strong>Water Damage Restoration</strong>
              </Link>
              <span className="text-darkText">
                {" "}
                — rapid extraction, structural drying, insurance support.
              </span>
            </li>
            <li>
              <Link
                href="/services/fire-smoke-restoration"
                className="text-navy hover:underline"
              >
                <strong>Fire &amp; Smoke Restoration</strong>
              </Link>
              <span className="text-darkText">
                — soot/smoke cleanup, odor removal, repairs.
              </span>
            </li>
            <li>
              <Link
                href="/services/mold-remediation"
                className="text-navy hover:underline"
              >
                <strong>Mold Remediation</strong>
              </Link>
              <span className="text-darkText">
                — containment, HEPA filtration, safe removal.
              </span>
            </li>
            <li>
              <Link
                href="/services/cleaning-sanitization"
                className="text-navy hover:underline"
              >
                <strong>Cleaning &amp; Sanitization</strong>
              </Link>
              <span className="text-darkText">
                — contents cleaning, disinfection, odor control.
              </span>
            </li>
            <li>
              <Link
                href="/services/emergency-services"
                className="text-navy hover:underline"
              >
                <strong>Emergency Services</strong>
              </Link>
              <span className="text-darkText">
                — 24/7 response, board‑up/tarping, storm support.
              </span>
            </li>
          </ul>
        </section>

        {/* Service Area */}
        <section className="border-y border-[#eee]  px-5 py-8 bg-navy">
          <div className="  mx-auto max-w-[1120px] px-5 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              {" "}
              <h2 className="mb-3 text-4xl lg:text-5xl text-white">
                Proudly Serving Jacksonville &amp; Northeast Florida
              </h2>
              <p className="text-gray-300 text-xl">
                We respond across the Jacksonville metro and surrounding
                communities, including Orange Park, St. Augustine, Ponte Vedra,
                Fleming Island, Duval County, and Clay County. View our coverage
                map below or{" "}
                <Link className="text-yellow-300 underline" href="/contact">
                  contact us
                </Link>{" "}
                to confirm availability.
              </p>
              <a
                className="inline-flex items-center justify-center rounded-[14px] bg-yellow-600 px-5 py-3 font-bold text-white transition hover:-translate-y-[1px] hover:bg-yellow-500 mt-4"
                href={`tel:${PHONE_TEL}`}
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E0E4EA] shadow-[0_10px_30px_rgba(12,35,64,.08)] max-w-sm mx-auto">
              <Image
                src="/images/ads/map.png"
                alt="Bold City IAQ service area map: Jacksonville & Northeast Florida"
                width={400}
                height={250}
                className="h-auto w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className=" px-5 py-8 bg-navy">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-3 text-4xl lg:text-5xl text-white">
              Why Choose Bold City IAQ
            </h2>
            <ul className="grid gap-3 md:grid-cols-2 text-gray-300 text-xl">
              <li>Fast dispatch &amp; live answer 24/7</li>
              <li>Insurance‑ready documentation &amp; photo logs</li>
              <li>Clean work zones: barriers &amp; negative air</li>
              <li>Transparent estimates &amp; daily updates</li>
              <li>Financing options available ($0 down / low monthly)</li>
            </ul>
          </div>
        </section>

        {/* Reviews */}
        <section className="border-y border-[#E6EDF5] bg-[#EEF6FB]">
          <div className="mx-auto max-w-[1120px] px-5 py-8">
            <h2 className="mb-4 lg:text-5xl text-4xl ] text-darkText">
              What Our Customers Say
            </h2>
            <div className="grid gap-4">
              <blockquote className="relative rounded-lg border border-[#e6edf5] bg-white p-4 pl-10 shadow-[0_8px_24px_rgba(12,35,64,0.06)]">
                <span className="absolute left-3 top-1 text-3xl text-aqua-dark/70">
                  “
                </span>
                <p className="text-[15px] text-darkText font-semibold">
                  I’d been struggling with health issues for nearly three years
                  before finally finding the source of mold. Bold City IAQ
                  identified the problem, remediated it thoroughly, and gave me
                  peace of mind. Professional, caring, and highly recommended.
                </p>
                <cite className="mt-2 block text-[13px] text-[#4a4a4a] not-italic">
                  — Jon M., Jacksonville
                </cite>
              </blockquote>

              <blockquote className="relative rounded-lg border border-[#e6edf5] bg-white p-4 pl-10 shadow-[0_8px_24px_rgba(12,35,64,0.06)]">
                <span className="absolute left-3 top-1 text-3xl text-aqua-dark/70">
                  “
                </span>
                <p className="text-[15px] text-darkText font-semibold">
                  I would highly recommend Bold City IAQ for mold remediation.
                  Andre was very knowledgeable and professional, kept me
                  informed, and stayed on schedule even as the project grew
                  larger than expected.
                </p>
                <cite className="mt-2 block text-[13px] text-[#4a4a4a] not-italic">
                  — Rebecca B., Jacksonville
                </cite>
              </blockquote>

              <blockquote className="relative rounded-lg border border-[#e6edf5] bg-white p-4 pl-10 shadow-[0_8px_24px_rgba(12,35,64,0.06)]">
                <span className="absolute left-3 top-1 text-3xl text-aqua-dark/70">
                  “
                </span>
                <p className="text-[15px] text-darkText font-semibold">
                  Andre was one of the nicest people I’ve ever dealt with. After
                  water damage from a broken valve, he came recommended—and I
                  couldn’t be more grateful. Honest, professional, and went
                  above and beyond to help.
                </p>
                <cite className="mt-2 block text-[13px] text-[#4a4a4a] not-italic">
                  — Justin A., Jacksonville
                </cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        {/* <section className="mx-auto max-w-[1120px] px-5 py-8">
          <h2 className="mb-3 text-[clamp(1.5rem,1.2vw+1rem,2rem)] text-darkText">
            Meet the Team
          </h2>
          <p className="text-[#2a2a2a]">
            Our certified technicians bring years of field experience to every
            project. From the first assessment to final repairs, you’ll get
            straight answers, clean work, and a dedicated point of contact.
          </p>
        </section> */}

        {/* Final CTA */}
        <section className="mx-auto max-w-[1120px] px-5 py-10">
          <div className="text-center">
            <h2 className="mb-2 text-4xl lg:text-5xl text-darkText">
              Need Help Now?
            </h2>
            <p className="text-[#2a2a2a]">
              Call{" "}
              <a
                className="font-semibold text-navy underline decoration-aqua/40 underline-offset-4"
                href={`tel:${PHONE_TEL}`}
              >
                {PHONE_DISPLAY}
              </a>{" "}
              or request service online. We’re ready 24/7 across Northeast
              Florida.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                className="inline-flex items-center justify-center rounded-[14px] bg-aqua px-5 py-3 font-bold text-navy shadow-[0_10px_22px_rgba(27,201,208,.25),_0_2px_6px_rgba(0,0,0,.12)] transition hover:-translate-y-[1px] hover:bg-aqua-dark"
                href={`tel:${PHONE_TEL}`}
              >
                Call {PHONE_DISPLAY}
              </a>
              <Link
                className="inline-flex items-center justify-center rounded-[14px] border-2 border-navy px-5 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
                href="/contact#lead-form"
              >
                Request Service
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-[14px] px-5 py-3 font-bold text-navy transition hover:text-aqua-dark"
                href="/ads/finance#lead-form"
              >
                Check Financing Options
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
