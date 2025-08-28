// components/FinalCTA.jsx

import Link from "next/link";
import { Phone } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-navy to-navy-dark border-y border-white text-white py-16 px-6 sm:px-12 lg:px-24 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-heading font-semibold mb-4">
          Don&apos;t Wait. Water Damage Gets Worse.
        </h2>

        <p className="text-lightText mb-8 text-lg lg:text-xl">
          Schedule your free inspection in under 60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="tel:+19044346318"
            onClick={() => {
              if (typeof window !== "undefined" && window.dataLayer) {
                window.dataLayer.push({ event: "final_cta_click" });
              }
            }}
            className="inline-flex items-center gap-2 bg-aqua text-navy font-semibold px-6 py-3 rounded-full shadow-md hover:bg-aqua-dark transition text-lg"
          >
            <Phone className="w-8 h-8" />
            Call Now
          </Link>

          <div className="bg-white text-navy font-semibold px-4 py-2 rounded-full text-lg shadow">
            Available 24/7 – Emergency Service
          </div>
        </div>
      </div>
    </section>
  );
}
