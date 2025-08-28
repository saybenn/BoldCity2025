// components/TrustBar.js

import { Phone, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrustBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200); // slight delay for animation
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={`w-full bg-white dark:bg-dark border-b border-zinc-200 dark:border-zinc-800 shadow-sm transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      aria-label="Trust Information"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Column 1: Certifications */}
        <div>
          <h3 className="text-3xl font-semibold text-navy dark:text-gray-900 mb-4">
            Certified & Trusted
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-4 flex-wrap">
            <Image
              src="/images/iicrc-certified.webp"
              alt="IICRC Certified"
              width={90}
              height={60}
              className="object-contain"
            />
            <Image
              src="/images/normilogo.png"
              alt="NORMI Certified"
              width={90}
              height={60}
              className="object-contain"
            />
            <Image
              src="/images/googlelogo.png"
              alt="Google 5 Star Reviews"
              width={90}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        {/* Column 2: Contact Info */}
        <div>
          <h3 className="text-3xl font-semibold text-navy dark:text-gray-900 mb-4">
            Fast, Local Support
          </h3>
          <div className="text-base text-zinc-700 dark:text-gray-800">
            <p className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Phone className="w-5 h-5 text-aqua" />
              <a
                href="tel:9044346318"
                className="font-semibold hover:underline"
                data-gtm-event="trustbar_cta_click"
              >
                (904) 434-6318
              </a>
            </p>
            <p>24/7 Emergency Response</p>
            <p className="font-medium mt-1">Call Now for Immediate Help</p>
          </div>
        </div>

        {/* Column 3: Value Props */}
        <div>
          <h3 className="text-3xl font-semibold text-navy dark:text-gray-900 mb-4">
            What Sets Us Apart
          </h3>
          <ul className="space-y-2 text-zinc-700 dark:text-gray-800 grid-cols-2 grid">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aqua" />
              Licensed & Insured
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aqua" />
              Free Estimates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aqua" />
              Financing Available
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-aqua" />
              5-Star Reviews
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
