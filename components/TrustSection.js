import ReviewsCarousel from "@/components/ReviewsCarousel";
import TrustBadges from "@/components/TrustBadges";
import StaticTestimonials from "./StaticTestimonials";

export default function TrustSection() {
  return (
    <section className="w-full bg-lightGray dark:bg-foreground py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-semibold text-darkText dark:text-lightText">
            Trusted by Jacksonville Residents
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Bold City IAQ is proud to be certified, reviewed, and recognized by
            leading organizations and our valued customers.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div>
          <StaticTestimonials />
          {/* Trust Badges */}
          <div>
            <TrustBadges />
          </div>
        </div>
      </div>
    </section>
  );
}
