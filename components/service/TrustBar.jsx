// components/TrustBar.js

import { Phone, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export default function TrustBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      className={`w-full border-b border-zinc-200 bg-white shadow-sm transition-all duration-700 ease-out dark:border-zinc-800 dark:bg-dark ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      aria-label="Trust Information"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 text-center md:grid-cols-3 md:text-left">
        <div>
          <h3 className="mb-4 text-3xl font-semibold text-navy dark:text-gray-900">
            Certified & Trusted
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
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

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-navy dark:text-gray-900">
            Fast, Local Support
          </h3>
          <div className="text-base text-zinc-700 dark:text-gray-800">
            <p className="mb-2 flex items-center justify-center gap-2 md:justify-start">
              <Phone className="h-5 w-5 text-aqua" />

              <TrackedPhoneLink
                href="tel:+19044346318"
                phoneNumber="+19044346318"
                ctaLabel="TrustBar Phone Number"
                ctaLocation="TrustBar"
                page={
                  typeof window !== "undefined" ? window.location.pathname : "/"
                }
                intent="call emergency restoration"
                className="font-semibold hover:underline"
              >
                (904) 434-6318
              </TrackedPhoneLink>
            </p>

            <p>24/7 Emergency Response</p>
            <p className="mt-1 font-medium">Call Now for Immediate Help</p>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-3xl font-semibold text-navy dark:text-gray-900">
            What Sets Us Apart
          </h3>
          <ul className="grid grid-cols-2 space-y-2 text-zinc-700 dark:text-gray-800">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-aqua" />
              Licensed & Insured
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-aqua" />
              Free Estimates
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-aqua" />
              Financing Available
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-aqua" />
              5-Star Reviews
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
