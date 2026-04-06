import Image from "next/image";

export default function TrustBadges() {
  return (
    <section className="py-16 bg-darkText">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl lg:text-5xl font-heading text-lightText mb-8">
          Certified & Trusted by Industry Leaders
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {/* Google Reviews */}
          <div className="relative  w-auto">
            <Image
              src="/images/googlelogo.png"
              alt="Google Verified Reviews"
              height={48}
              width={160}
              priority
              className="object-contain"
            />
          </div>

          {/* IICRC Certified */}
          <div className="relative  w-auto">
            <Image
              src="/images/iicrc-certified.webp"
              alt="IICRC Certified"
              height={72}
              width={240}
              priority
              className="object-contain"
            />
          </div>

          {/* NORMI Certified */}
          <div className="relative  w-auto">
            <Image
              src="/images/normilogo.png"
              alt="NORMI Certified - National Organization of Remediators & Microbial Inspectors"
              height={72}
              width={240}
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
