import Image from "next/image";

export default function Process({ heading, steps, note, image }) {
  return (
    <section className="bg-foreground text-darkText dark:text-zinc-100 py-16">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative w-full h-80 sm:h-96 lg:h-[28rem] rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={heading}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content Section */}
        <div>
          <h2 className="text-4xl font-bold mb-6">{heading}</h2>

          <ol className="list-decimal list-inside space-y-4 text-xl">
            {steps.map((step, index) => (
              <li className="text-aqua font-semibold" key={index}>
                {step.head}{" "}
                <span className="text-white font-normal">{step.tail}</span>
              </li>
            ))}
          </ol>

          {note && (
            <p className="mt-6 text-base text-muted dark:text-gray-300">
              {note}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
