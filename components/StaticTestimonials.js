// TestimonialsStatic.jsx — Static 3-up testimonials grid (no carousel)
// Usage: <TestimonialsStatic /> or pass your own items prop

import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

function Stars({ rating = 5 }) {
  const full = Math.round(rating);
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating ${full} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < full ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

const DEFAULT_ITEMS = [
  {
    name: "Rebecca BBrewer",
    date: "8 weeks ago",
    rating: 5,
    quote:
      "I would highly recommend Bold City IAQ for mold remediation. Andre is very knowledgeable and professional. He kept me informed and ran on schedule even as the scope of the project was larger than expected. Should I need further help, I will definitely call Andre.",
    photo: "/images/rebecca-review.png",
  },
  {
    name: "Jon Mroz",
    date: "2 days ago",
    rating: 5,
    quote:
      "I’ve been struggling with health issues for nearly three years before finally testing positive for mycotoxins. Finding the source was incredibly challenging, but after some positive results from my office and lots of research (plus a recommendation from a mold detective), I chose Bold City Remediation—and I’m so glad I did. They went above and beyond...",
    reviewCount: 18,
    photo: "/images/jon-review.png",
  },
  {
    name: "Chavis Gill",
    date: "Jun 6, 2024",
    rating: 5,
    quote:
      "Andre went out of his way to ensure we had an appointment and calmed my fears with sound knowledge and a game plan to clear and prevent mold. I absolutely would recommend.",
    photo: "/images/chavis-review.png",
  },
];

export default function StaticTestimonials({
  heading = "What Jacksonville Clients Are Saying",
  items = DEFAULT_ITEMS,
}) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="w-full bg-foreground dark:bg-dark py-16 border-t border-border px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold text-darkText dark:text-white mb-10 text-center"
        >
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((t, i) => (
            <figure
              key={i}
              className="bg-white dark:bg-navy rounded-xl shadow-md border border-lightGray dark:border-navy p-6 flex flex-col justify-between min-h-[260px]"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover mr-3"
                />
                <div>
                  <div className="text-sm font-semibold text-darkText dark:text-white">
                    {t.name}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Google Review
                  </span>
                </div>
              </div>
              <blockquote className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between">
                <Stars rating={t.rating} />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Bold+City+Indoor+Air+Quality+and+Emergency+Services+Jacksonville&oq=bold&gs_lcrp=EgZjaHJvbWUqCAgBEEUYJxg7MgYIABBFGDwyCAgBEEUYJxg7MgwIAhBFGDkYsQMYgAQyBggDECMYJzIQCAQQLhivARjHARiABBiOBTIKCAUQLhixAxiABDIGCAYQRRg8MgYIBxBFGDzSAQg0ODQ2ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-aqua hover:bg-aqua-dark text-white font-semibold px-6 py-3 rounded-md transition"
            aria-label="Read more Google reviews"
          >
            Read More Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
