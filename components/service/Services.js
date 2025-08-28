import React from "react";

export default function Services({ heading, bullets, paragraph }) {
  return (
    <section
      className="bg-white dark:bg-dark text-darkText dark:text-gray-900 border-b py-16 px-6 sm:px-12 lg:px-24"
      aria-labelledby="services-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="services-heading"
          className="lg:text-4xl text-4xl font-bold mb-6 text-center"
        >
          {heading}
        </h2>

        <ul className="font-bold space-y-3 text-lg text-center">
          {bullets?.map((item, index) => (
            <li
              key={index}
              className="leading-relaxed border-b border-1 border-zinc-400"
            >
              {item}
            </li>
          ))}
        </ul>

        {paragraph && (
          <p className="mt-6 text-base sm:text-lg leading-relaxed">
            {paragraph}
          </p>
        )}
      </div>
    </section>
  );
}
