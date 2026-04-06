"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { X } from "lucide-react";

const CompareImage = dynamic(() => import("react-compare-image"), {
  ssr: false,
});

const proofImages = [
  {
    src: "/images/proof1.webp",
    alt: "Water restoration equipment set up inside a property",
    title: "Water Extraction Setup",
  },
  {
    src: "/images/moldprocess.webp",
    alt: "Exposed framing during structural drying work",
    title: "Structural Drying in Progress",
  },
  {
    src: "/images/grid/mold-hero.webp",
    alt: "Containment area during mold remediation work",
    title: "Containment During Remediation",
  },
  {
    src: "/images/sanitizationHero.webp",
    alt: "Damaged material removal inside a project site",
    title: "Removal of Damaged Materials",
  },
  {
    src: "/images/grid/emergencyGrid.webp",
    alt: "Restoration cleanup and rebuild preparation",
    title: "Cleanup and Rebuild Preparation",
  },
];

export default function BeforeAfterSlider() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <section className="bg-lightGray py-20 px-4">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-heading font-bold text-darkText lg:text-5xl">
          Before & After Restoration
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-gray-700 sm:text-lg">
          See real project transformation, plus additional field photos that
          show the process, care, and job-site execution behind the result.
        </p>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl shadow-xl">
          <CompareImage
            leftImage="/images/hallbefore.webp"
            rightImage="/images/hallafter.webp"
            alt="Before and after restoration"
            sliderLineColor="#27AE60"
          />
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <h3 className="text-2xl font-heading font-bold text-darkText">
            More Project Photos
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Additional restoration images to help show the work behind the
            outcome.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {proofImages.map((image) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setSelectedImage(image)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                aria-label={`Open image: ${image.title}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="font-semibold text-darkText">{image.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-4 text-left">
              <p className="text-lg font-semibold text-darkText">
                {selectedImage.title}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Real restoration project photo.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
