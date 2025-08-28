"use client";

import { useState, useEffect } from "react";
import { Phone, X, PhoneCall } from "lucide-react";

export default function MobileStickyCallButton() {
  const [visible, setVisible] = useState(true); // is call button visible
  const [hide, setHide] = useState(false); // controls exit animation
  const [isClient, setIsClient] = useState(false);

  // read localStorage on mount
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
      {/* Sticky Call Now Button */}
      {visible && (
        <div
          className={`md:hidden fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out ${
            hide ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="flex items-center justify-between bg-navy text-white rounded-full shadow-lg px-4 py-3 space-x-4">
            <a
              href="tel:+19044346318"
              className="flex items-center gap-2 font-semibold hover:text-aqua transition"
              aria-label="Call Bold City IAQ"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <button
              onClick={handleDismiss}
              className="text-white hover:text-gray-300 transition"
              aria-label="Dismiss call CTA"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Recall Button */}
      {!visible && (
        <button
          onClick={handleRecall}
          className="md:hidden fixed bottom-4 right-4 bg-navy text-white p-3 rounded-full shadow-lg z-40 hover:bg-navy-dark transition"
          aria-label="Recall call button"
        >
          <PhoneCall className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
