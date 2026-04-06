import Image from "next/image";
import { ShieldCheck, Users, Handshake } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Restoration Work",
    description:
      "Qualified restoration service focused on mitigation, cleanup, and protecting the property from further damage.",
  },
  {
    icon: Users,
    title: "Jacksonville-Based Team",
    description:
      "Local service means faster response, area familiarity, and support tailored to homes and businesses in Northeast Florida.",
  },
  {
    icon: Handshake,
    title: "Clear Help Through the Process",
    description:
      "From emergency response to financing and insurance documentation, we help keep the next steps understandable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      <Image
        src="/images/why-us.png"
        alt="Storm clouds over a Jacksonville skyline"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center text-lightText sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold sm:text-4xl lg:text-5xl">
          Why Choose Bold City IAQ
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-lightText/85 sm:text-lg">
          Fast response matters, but so does doing the work correctly. These are
          the signals clients look for when deciding who to trust with urgent
          restoration.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm"
            >
              <Icon className="mx-auto mb-4 h-12 w-12 text-aqua" />
              <h3 className="text-xl font-heading font-bold text-white">
                {title}
              </h3>
              <p className="mt-3 text-base leading-7 text-lightText/80">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
