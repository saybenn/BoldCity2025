import Image from "next/image";

const logos = [
  {
    src: "/images/iicrc-certified.webp",
    alt: "IICRC Certified",
    width: 110,
    height: 42,
  },
  {
    src: "/images/normilogo.png",
    alt: "NORMI Certified",
    width: 120,
    height: 42,
  },
  {
    src: "/images/5-star-google.png",
    alt: "Google Reviews",
    width: 90,
    height: 42,
  },
];

const differentiators = [
  "Licensed & Insured",
  "Financing Available",
  "Free Estimates",
  "5-Star Reviews",
];

export default function ContactTrustStrip({ data }) {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1.1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Certified & Trusted
            </h2>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {logos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="h-auto w-auto object-contain"
                />
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-zinc-900">
              Fast, Local Support
            </h2>
            <div className="mt-3 space-y-1 text-sm text-zinc-700">
              <p className="font-semibold">{data.phoneDisplay}</p>
              <p>24/7 Emergency Response</p>
              <p>Call now for immediate help</p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold text-zinc-900">
              What Sets Us Apart
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-zinc-700">
              {differentiators.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-aqua">◌</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
