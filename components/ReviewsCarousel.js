import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GOOGLE_PROFILE_URL, verifiedReviews, verifiedRating } from "@/lib/google-reviews";
import { track } from "@/lib/analytics";

export default function ReviewsCarousel() {
  const row = useRef(null);
  const reviews = verifiedReviews.filter((review) => review.sourceUrl && review.verifiedAt);
  function sourceClick() { track("review_source_click", { review_source: "google", cta_location: "GoogleReviews", page_path: window.location.pathname }); }
  function move(direction) { row.current?.scrollBy({ left: direction * 340, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
  return <section aria-labelledby="google-reviews-heading" className="overflow-hidden bg-white px-5 py-7 text-darkText sm:py-12">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-navy">From our customers</p>
          <h2 id="google-reviews-heading" className="mt-2 font-heading text-2xl font-bold sm:text-3xl">Google reviews</h2>
          {verifiedRating && <div className="mt-3">
            <div className="flex gap-1 text-amber-500" aria-label={`${verifiedRating.value.toFixed(1)} out of 5 stars on Google`}>{Array.from({length:5},(_,i)=><Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />)}</div>
            <p className="mt-2 font-semibold">{verifiedRating.value.toFixed(1)} out of 5 on Google{verifiedRating.count !== null && ` · ${verifiedRating.count} reviews`}</p>
            <p className="mt-1 text-xs text-gray-600">Checked {new Date(`${verifiedRating.checkedAt}T12:00:00Z`).toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric", timeZone:"UTC" })} · <a href={verifiedRating.sourceUrl} onClick={sourceClick} className="underline" target="_blank" rel="noopener noreferrer">Google profile</a></p>
          </div>}
        </div>
        <a href={GOOGLE_PROFILE_URL} onClick={sourceClick} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md border border-aqua px-4 py-2 text-sm font-semibold text-navy hover:bg-lightGray">Read reviews on Google ↗</a>
      </div>
      {reviews.length ? <>
        <div ref={row} aria-label="Customer reviews" tabIndex={0} className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 focus-visible:outline-aqua">
          {reviews.map((review) => <figure key={review.sourceUrl} className="w-[min(85vw,360px)] shrink-0 snap-start rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <figcaption className="flex items-center gap-3">
              {review.photoUrl ? <img src={review.photoUrl} alt="" width="40" height="40" loading="lazy" referrerPolicy="no-referrer" className="rounded-full" /> : <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white">{review.name.slice(0,1)}</span>}
              <div><p className="font-semibold">{review.name}</p><p className="text-xs text-gray-600">Google review</p></div>
            </figcaption>
            <div aria-label={`${review.rating} out of 5 stars`} className="my-4 flex gap-1 text-amber-500">{Array.from({ length: review.rating }, (_, i) => <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" />)}</div>
            <blockquote className="text-sm leading-7 text-gray-700">“{review.quote}”</blockquote>
            <a href={review.sourceUrl} onClick={sourceClick} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-navy underline">View on Google</a>
          </figure>)}
        </div>
        <div className="mt-3 flex gap-2"><button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="rounded-full border p-3"><ChevronLeft size={20} /></button><button type="button" onClick={() => move(1)} aria-label="Next reviews" className="rounded-full border p-3"><ChevronRight size={20} /></button></div>
      </> : <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600">Read customer feedback and see the latest ratings on our Google profile.</p>}
    </div>
  </section>;
}
