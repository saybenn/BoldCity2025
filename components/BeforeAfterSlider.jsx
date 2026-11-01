"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";

const proofImages = [
  {
    src: "/images/grid/carousel2.webp",
    alt: "Restoration equipment beside exposed wall framing and protection sheeting",
    title: "Equipment and exposed wall framing",
  },
  {
    src: "/images/moldprocess.webp",
    alt: "Air-handling equipment beside plastic containment and exposed framing",
    title: "Containment and air-handling equipment",
  },
  {
    src: "/images/grid/mold-hero.webp",
    alt: "Gloved hand holding removed building material with dark spotting",
    title: "Affected material removal",
  },
  {
    src: "/images/grid/emergencyGrid.webp",
    alt: "Removed cabinets and building materials collected outdoors",
    title: "Removal of Damaged Materials",
  },
  {
    src: "/images/sanitizationHero.webp",
    alt: "Tiled floor and exposed wall framing during restoration preparation",
    title: "Cleanup and Rebuild Preparation",
  },
];

export default function BeforeAfterSlider() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [position, setPosition] = useState(50);

  return (
    <section className="bg-lightGray py-20 px-4">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-heading font-bold text-darkText lg:text-5xl">
          Real Work. Real Restoration.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-7 text-gray-700 sm:text-lg">
          Company project photos show equipment, containment, and material removal. The comparison shows preparation in progress, rather than a completed repair.
        </p>

        <div className="mx-auto mt-12 max-w-[353px] overflow-hidden rounded-2xl shadow-xl">
          <div className="relative aspect-[353/235] bg-navy">
            <Image src="/images/hallbefore.webp" alt="Hallway before preparation" fill sizes="(max-width: 393px) 90vw, 353px" className="object-cover" />
            <div className="absolute inset-0" style={{clipPath:`inset(0 0 0 ${position}%)`}}><Image src="/images/hallafter.webp" alt="Hallway during restoration preparation" fill sizes="(max-width: 393px) 90vw, 353px" className="object-cover" /></div>
            <div aria-hidden="true" className="absolute bottom-0 top-0 w-1 bg-white" style={{left:`${position}%`}} />
          </div>
          <label className="block bg-white p-4 text-sm font-semibold text-navy">Compare restoration preparation
            <input type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} aria-label="Restoration preparation comparison" aria-valuetext={`${position}% before preparation visible`} className="mt-3 block w-full accent-green" />
          </label>
        </div>

        <p className="mt-3 text-sm text-gray-600">Before preparation / During restoration preparation. Move the slider or use arrow keys to compare.</p>

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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        <Dialog open={Boolean(selectedImage)} onClose={() => setSelectedImage(null)} className="fixed inset-0 z-[100]">
        <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
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
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
            </div>

            <div className="p-4 text-left">
              <DialogTitle className="text-lg font-semibold text-darkText">
                {selectedImage.title}
              </DialogTitle>
              <p className="mt-1 text-sm text-gray-600">
                Real restoration project photo.
              </p>
            </div>
          </DialogPanel>
        </div>
        </Dialog>
      )}
    </section>
  );
}
