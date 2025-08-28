// components/WhyChooseUs.jsx
import Image from "next/image";
import { ShieldCheck, Users, Handshake } from "lucide-react";
import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: ShieldCheck,
    title: "Certified Professionals",
    description:
      "Our technicians are IICRC-certified and equipped with the knowledge to handle any restoration challenge.",
  },
  {
    icon: Users,
    title: "Local Experts",
    description:
      "We're a Jacksonville-based team, dedicated to serving our local community with tailored solutions and personal care.",
  },
  {
    icon: Handshake,
    title: "Compassionate Help",
    description:
      "From financing to insurance coordination, we guide you through every step of your restoration journey.",
  },
];

export default function WhyChooseUs() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative  w-full overflow-hidden py-20">
      <Image
        src="/images/why-us.png"
        alt="Storm approaching Jacksonville"
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-lightText text-center">
        <Transition
          show={show}
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-8">
            Why Choose Bold City IAQ
          </h2>
        </Transition>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {features.map(({ icon: Icon, title, description }) => (
            <Transition
              key={title}
              show={show}
              enter="transition-all ease-out duration-700 delay-[400ms]"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              className="px-4"
            >
              <div className="flex flex-col items-center text-center">
                <Icon className="w-12 h-12 text-aqua mb-3" />
                <h3 className="text-xl font-semibold mb-2 font-heading">
                  {title}
                </h3>
                <p className="text-md max-w-xs text-gray-200">{description}</p>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
}
