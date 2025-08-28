import React from "react";
import { Star } from "lucide-react";
import ReviewsCarousel from "../ReviewsCarousel";
const Testimonials = ({
  heading = "What Our Customers Are Saying",
  testimonials = [
    {
      name: "Jane D.",
      location: "Jacksonville, FL",
      quote:
        "Bold City IAQ was fast, professional, and completely removed our mold problem. I feel safe in my home again!",
      stars: 5,
    },
    {
      name: "Carlos M.",
      location: "St. Augustine, FL",
      quote:
        "After the flood, we were overwhelmed. These guys showed up within the hour and got to work. Amazing service!",
      stars: 5,
    },
    {
      name: "Emily R.",
      location: "Ponte Vedra Beach, FL",
      quote:
        "They helped us deal with the insurance and walked us through everything. Super knowledgeable and kind team.",
      stars: 4,
    },
  ],
}) => {
  return (
    <section
      className="w-full bg-foreground dark:bg-dark border-t border-border py-16 px-4 sm:px-6 lg:px-8 min-h-screen max-h-screen"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2
          id="testimonials-heading"
          className="text-3xl sm:text-4xl font-bold text-darkText dark:text-zinc-100 mb-10"
        >
          {heading}
        </h2>

        <ReviewsCarousel />
      </div>
    </section>
  );
};

export default Testimonials;
