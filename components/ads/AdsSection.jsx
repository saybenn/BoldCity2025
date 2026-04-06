export default function AdsSection({ id, className = "", children }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 md:px-6 ${className}`}>
      {children}
    </section>
  );
}
