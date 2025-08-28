// components/service/ImageGrid.jsx
import React, { useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import Image from "next/image";

export default function ImageGrid({ heading, images = [], crop = true }) {
  const [index, setIndex] = useState(-1);

  // Normalize: allow string or { src, alt }
  const normalized = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "Project photo" } : img
  );

  const slides = normalized.map(({ src }) => ({ src }));

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };
  console.log(images);
  return (
    images.length > 1 && (
      <section
        className="w-full bg-white dark:bg-dark border-t border-border py-16 px-4 sm:px-6 lg:px-8"
        aria-labelledby="imagegrid-heading"
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="imagegrid-heading"
            className="lg:text-5xl text-4xl font-bold text-darkText dark:text-grey-900 mb-10 text-center"
          >
            {heading || "Work Gallery"}
          </h2>

          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {normalized.map(({ src, alt }, i) => (
              <button
                key={i}
                type="button"
                className="mb-4 block w-full cursor-zoom-in group"
                onClick={() => setIndex(i)}
              >
                {/* Wrapper controls cropping behavior */}
                <div
                  className={
                    crop
                      ? // Slightly variable heights for a mosaic feel
                        "relative w-full overflow-hidden rounded-lg shadow-xl hover:scale-[1.01] transition-transform"
                      : // Keep native 3:2, no cropping
                        "relative w-full overflow-hidden rounded-lg shadow-md"
                  }
                >
                  <Image
                    src={src}
                    alt={alt || "Restoration project photo"}
                    // Render target ~1200×800 (3:2). Next.js will still serve
                    // smaller/larger variants via sizes/srcset.
                    width={1200}
                    height={800}
                    quality={75}
                    loading={i < 3 ? "eager" : "lazy"}
                    className={
                      crop
                        ? "object-cover object-center"
                        : "w-full h-auto object-contain"
                    }
                    sizes="(max-width: 500px) 100vw, (max-width: 700px) 50vw, (max-width: 1100px) 33vw, 33vw"
                  />
                </div>
              </button>
            ))}
          </Masonry>

          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            index={index}
            slides={slides}
            plugins={[Zoom]}
          />
        </div>
      </section>
    )
  );
}
