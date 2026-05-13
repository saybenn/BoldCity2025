"use client";

import { useState, useEffect } from "react";
import { Phone, X, PhoneCall } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export default function MobileStickyCallButton() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const stored = localStorage.getItem("callButtonHidden");
    if (stored === "true") {
      setVisible(false);
      setHide(true);
    }
  }, []);

  const handleDismiss = () => {
    setHide(true);
    localStorage.setItem("callButtonHidden", "true");
    setTimeout(() => setVisible(false), 300);
  };

  const handleRecall = () => {
    setVisible(true);
    setHide(false);
    localStorage.removeItem("callButtonHidden");
  };

  if (!isClient) return null;

  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out md:hidden ${
            hide ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between space-x-4 rounded-full bg-navy px-4 py-3 text-white shadow-lg">
            <TrackedPhoneLink
              href="tel:+19044346318"
              phoneNumber="+19044346318"
              ctaLabel="Mobile Sticky Call Now"
              ctaLocation="MobileStickyCallButton"
              page={
                typeof window !== "undefined" ? window.location.pathname : "/"
              }
              intent="call emergency restoration"
              className="flex items-center gap-2 font-semibold transition hover:text-aqua"
              ariaLabel="Call Bold City IAQ"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </TrackedPhoneLink>

            <button
              onClick={handleDismiss}
              className="text-white transition hover:text-gray-300"
              aria-label="Dismiss call CTA"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {!visible && (
        <button
          onClick={handleRecall}
          className="fixed bottom-4 right-4 z-40 rounded-full bg-navy p-3 text-white shadow-lg transition hover:bg-navy-dark md:hidden"
          aria-label="Recall call button"
        >
          <PhoneCall className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
