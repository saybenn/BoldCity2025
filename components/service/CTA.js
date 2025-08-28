import React from "react";
import Link from "next/link";
export default function CTA({
  heading,
  paragraph,
  phone,
  primaryLabel,
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section
      className="w-full bg-aqua/10 dark:bg-navy-dark text-darkText dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-border"
      aria-labelledby="cta-section"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-section" className="text-3xl sm:text-4xl font-bold mb-4">
          {heading}
        </h2>
        <p className="text-lg text-mutedText dark:text-gray-300 mb-6">
          {paragraph}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={`tel:${phone}`}
            className="bg-aqua text-navy font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-aqua-dark transition"
          >
            {primaryLabel}
          </a>
          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="bg-transparent border border-aqua text-aqua font-semibold px-6 py-3 rounded-lg hover:bg-aqua hover:text-navy transition"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
