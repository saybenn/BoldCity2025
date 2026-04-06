import TrustBadges from "@/components/TrustBadges";
import StaticTestimonials from "./StaticTestimonials";

export default function TrustSection() {
  return (
    <section className="w-full bg-lightGray dark:bg-foreground py-16 px-4 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-heading font-bold text-white lg:text-5xl">
            Trusted by Jacksonville Residents
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-white/75">
            Local reviews, recognizable certifications, and visible restoration
            proof that help show the quality of our work.
          </p>
        </div>

        <StaticTestimonials />

        <div className="border-t border-white/10 pt-10">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
