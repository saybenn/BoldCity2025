// components/BeforeAfterSlider.jsx
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the slider to avoid SSR issues
const CompareImage = dynamic(() => import("react-compare-image"), {
  ssr: false,
});

export default function BeforeAfterSlider() {
  return (
    <section className="bg-lightGray dark:bg-background py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-4 text-darkText dark:text-gray-900">
          Before & After Restoration
        </h2>
        <p className="text-lg dark:text-gray-900 mb-12 max-w-xl mx-auto font-semibold">
          See the difference our certified restoration specialists can make with
          just one visit. Swipe to compare real project results.
        </p>

        <div className="mx-auto max-w-3xl shadow-xl rounded-xl overflow-hidden">
          <CompareImage
            leftImage="/images/hallbefore.webp"
            rightImage="/images/hallafter.webp"
            alt="Before and after restoration"
            sliderLineColor="#27AE60"
          />
        </div>
      </div>
    </section>
  );
}
