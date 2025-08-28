import React from "react";

export default function ServiceAreas({ heading, paragraph, areas }) {
  return (
    <section
      className="w-full bg-white dark:bg-dark border-t border-border py-16 px-4 sm:px-6 lg:px-8 border-zinc-700"
      aria-labelledby="service-areas-heading"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          id="service-areas-heading"
          className="lg:text-5xl text-4xl font-bold text-darkText dark:text-gray-900 mb-6"
        >
          {heading}
        </h2>
        {paragraph && (
          <p className="text-lg text-mutedText dark:text-gray-800 mb-8 max-w-3xl mx-auto">
            {paragraph}
          </p>
        )}
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4  text-darkText dark:text-gray-800 text-lg">
          {areas.map((area, index) => (
            <li key={index} className="font-bold text-center">
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
