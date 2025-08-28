import React from "react";
import { Check } from "lucide-react";
export default function WhyItMatters({ heading, bullets, paragraph }) {
  return (
    <section
      className="bg-white dark:bg-dark py-16 px-6 sm:px-12 lg:px-24"
      aria-labelledby="why-it-matters"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          id="why-it-matters"
          className="lg:text-5xl text-4xl font-heading font-semibold text-darkText dark:text-gray-900 mb-6"
        >
          {heading}
        </h2>

        <ul className="text-xl text-gray-700 dark:text-gray-900 space-y-3 mb-8 text-left max-w-2xl mx-auto">
          {bullets.map((item, index) => (
            <li key={index} className="relative pl-6">
              <span className="absolute left-0 top-1 text-2xl text-aqua">
                <Check className="w-6 h-6" />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="text-xl text-darkText dark:text-gray-900 max-w-3xl mx-auto">
          {paragraph}
        </p>
      </div>
    </section>
  );
}
