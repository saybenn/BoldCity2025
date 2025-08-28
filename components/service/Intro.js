export default function Intro({ heading, content }) {
  return (
    <section
      className="bg-foreground text-darkText dark:text-zinc-100 py-16 px-6 sm:px-8 lg:px-16"
      aria-label="Introduction"
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="lg:text-5xl text-4xl font-bold mb-6 leading-tight">
          {heading}
        </h2>
        <div className="space-y-4 text-xl">
          {content.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
