import Image from "next/image";
import { Clock3, MapPin, ShieldCheck, Star } from "lucide-react";

const trustChips = [
  {
    icon: Clock3,
    label: "24/7 Emergency Response",
  },
  {
    icon: MapPin,
    label: "Jacksonville-Based",
  },
  {
    icon: ShieldCheck,
    label: "Certified Restoration Team",
  },
];

const trustLogos = [
  {
    src: "/images/5-star-google.png",
    alt: "Google reviews",
    width: 120,
    height: 40,
  },
  {
    src: "/images/iicrc-certified.webp",
    alt: "IICRC certified",
    width: 132,
    height: 48,
  },
  {
    src: "/images/normilogo.png",
    alt: "NORMI certification",
    width: 132,
    height: 48,
  },
];

export default function EarlyTrustBand() {
  return (
    <section className="bg-white py-10 text-darkText sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-8 shadow-[0_12px_40px_rgba(15,23,42,0.08)] sm:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-aqua/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-aqua">
              <Star className="h-3.5 w-3.5 fill-current" />
              Trusted Early
            </p>

            <h2 className="mt-4 text-3xl font-heading font-bold text-darkText sm:text-4xl">
              Trusted by Jacksonville Residents
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              Highly rated by local customers, backed by recognized
              certifications, and ready to respond when damage cannot wait.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {trustChips.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-gray-800"
              >
                <Icon className="h-4 w-4 text-aqua" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10">
              {trustLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="relative flex h-12 items-center justify-center opacity-95"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-auto w-auto max-h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
