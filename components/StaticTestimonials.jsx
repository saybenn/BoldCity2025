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
          className={`h-4 w-4 ${
            i < full ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
          }`}
        />
      ))}
    </div>
  );
}

const DEFAULT_ITEMS = [
  {
    name: "Rebecca Brewer",
    rating: 5,
    quote:
      "I would highly recommend Bold City IAQ for mold remediation. Andre is very knowledgeable and professional, kept me informed, and stayed on schedule even as the project became larger than expected.",
    photo: "/images/rebecca-review.png",
  },
  {
    name: "Jon Mroz",
    rating: 5,
    quote:
      "After years of health issues and a long search for the source, Bold City Remediation went above and beyond. The team was thorough, responsive, and gave me confidence in the process.",
    photo: "/images/jon-review.png",
  },
  {
    name: "Chavis Gill",
    rating: 5,
    quote:
      "Andre went out of his way to make sure we had an appointment, calm my fears, and lay out a clear plan to address and prevent mold. I would absolutely recommend them.",
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
      className="w-full px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <h3
          id="testimonials-heading"
          className="mb-10 text-center text-3xl font-heading font-bold text-white sm:text-4xl"
        >
          {heading}
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.slice(0, 3).map((t) => (
            <figure
              key={t.name}
              className="flex min-h-[300px] flex-col justify-between rounded-2xl border border-white/10 bg-navy p-6 shadow-md"
            >
              <div className="mb-4 flex items-center">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="mr-3 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {t.name}
                  </div>
                  <span className="text-xs text-white/60">Google Review</span>
                </div>
              </div>

              <blockquote className="flex-1 text-sm leading-7 text-white/80 sm:text-base">
                “{t.quote}”
              </blockquote>

              <figcaption className="mt-5 flex items-center justify-between">
                <Stars rating={t.rating} />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/search?q=Bold+City+Indoor+Air+Quality+and+Emergency+Services+Jacksonville"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-aqua px-6 py-3 font-semibold text-white transition hover:bg-aqua-dark"
            aria-label="Read more Google reviews"
          >
            Read More Reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
