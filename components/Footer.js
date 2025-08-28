export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Business Info */}
        <div>
          <h3 className="text-4xl font-heading mb-2">Bold City IAQ</h3>
          <p className="text-lg leading-relaxed">
            10066 103rd St #206
            <br />
            Jacksonville, FL 32210
            <br />
            <a href="tel:+19044346318" className="underline hover:text-aqua">
              (904) 434-6318
            </a>
            <br />
            IICRC Certified: WRT #123456
          </p>
          <p className="text-md mt-2 text-lightText">
            Emergency Services Available 24/7
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-md">
            <li>
              <a
                href="/services/water-damage-restoration"
                className="hover:text-aqua"
              >
                Water Damage
              </a>
            </li>
            <li>
              <a href="/services/mold-remediation" className="hover:text-aqua">
                Mold Remediation
              </a>
            </li>
            <li>
              <a
                href="/services/emergency-services"
                className="hover:text-aqua"
              >
                Emergency Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-aqua">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-aqua">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter or Lead Magnet Opt-in */}
        <div>
          <h4 className="text-lg font-semibold mb-2">
            Free Emergency Checklist
          </h4>
          <p className="text-md mb-2">
            Download our free PDF to be prepared before water damage strikes.
          </p>
          <form className="space-y-2">
            {/* <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded text-navy"
                required
              /> */}
            <button
              type="submit"
              className="bg-aqua hover:bg-aqua-dark text-navy font-semibold px-4 py-2 rounded w-full"
            >
              Get My Checklist
            </button>
          </form>
        </div>
      </div>

      {/* Legal / Copyright */}
      <div className="mt-12 border-t border-white/10 pt-6 text-sm text-center text-lightText">
        &copy; {new Date().getFullYear()} Bold City IAQ. All rights reserved.
      </div>

      {/* SchemaOverrides */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Bold City IAQ",
            image: "https://boldcityiaq.com/images/logo.png",
            url: "https://boldcityiaq.com",
            telephone: "+19044346318",
            address: {
              "@type": "PostalAddress",
              streetAddress: "10066 103rd St #206",
              addressLocality: "Jacksonville",
              addressRegion: "FL",
              postalCode: "32210",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 00:00-23:59",
            priceRange: "$$",
            sameAs: [],
          }),
        }}
      />
    </footer>
  );
}
