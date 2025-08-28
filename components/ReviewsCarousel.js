import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import reviewsData from "@/lib/reviewsData.js";
import StarRating from "./StarRating";

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const review = reviewsData[currentIndex];

  if (!review) return null;
  return (
    <div className="relative w-full max-w-3xl mx-auto text-center bg-white dark:bg-darkText rounded-xl shadow-lg p-8 px-12 transition-all duration-500">
      <div className="min-h-[250px] flex flex-col justify-center">
        <StarRating rating={review.rating} />
        <p className="text-lg md:text-xl text-gray-700 dark:text-lightText italic mb-4">
          “{review.content}”
        </p>
        <div className="text-md text-gray-600 dark:text-gray-300 font-semibold">
          — {review.name}
        </div>

        {review.positives.length > 0 && (
          <div className="mt-4 text-sm text-green-700 dark:text-green-400">
            <strong>Positive:</strong> {review.positives.join(", ")}
          </div>
        )}

        {review.services.length > 0 && (
          <div className="mt-1 text-sm text-navy dark:text-aqua">
            <strong>Services:</strong> {review.services.join(", ")}
          </div>
        )}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous review"
        className="absolute top-1/2 left-4 -translate-y-1/2 text-navy dark:text-aqua opacity-40 hover:opacity-80 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next review"
        className="absolute top-1/2 right-4 -translate-y-1/2 text-navy dark:text-aqua opacity-40 hover:opacity-80 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
