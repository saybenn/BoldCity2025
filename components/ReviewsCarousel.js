import { useEffect, useId, useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ChevronLeft, ChevronRight, Star, X } from "lucide-react";
import { GOOGLE_PROFILE_URL, writtenReviews, verifiedRating } from "@/lib/google-reviews";
import { track } from "@/lib/analytics";

export default function ReviewsCarousel() {
  const headingId = useId();
  const viewport = useRef(null);
  const rows = useRef([]);
  const directions = useRef([1, -1]);
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const split = Math.ceil(writtenReviews.length / 2);
  const groups = [writtenReviews.slice(0, split), writtenReviews.slice(split)];
  useEffect(() => {
    const wide = matchMedia("(min-width: 768px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setDesktop(wide.matches); setReducedMotion(reduced.matches); };
    update(); wide.addEventListener("change", update); reduced.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(viewport.current);
    return () => { wide.removeEventListener("change", update); reduced.removeEventListener("change", update); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (desktop && rows.current[1]) rows.current[1].scrollLeft = rows.current[1].scrollWidth - rows.current[1].clientWidth;
  }, [desktop]);
  useEffect(() => {
    if (!desktop || reducedMotion || paused || hovered || focused || !visible || selected) return;
    let frame, last;
    const positions = rows.current.map((row) => row.scrollLeft);
    const advance = (now) => {
      if (last && !document.hidden) rows.current.forEach((row, i) => {
        const maximum = row.scrollWidth - row.clientWidth;
        if (maximum <= 0) return;
        if (positions[i] >= maximum - 1) directions.current[i] = -1;
        if (positions[i] <= 1) directions.current[i] = 1;
        positions[i] = Math.max(0, Math.min(maximum, positions[i] + directions.current[i] * Math.min(now - last, 50) * 0.025));
        row.scrollLeft = positions[i];
      });
      last = now; frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [desktop, reducedMotion, paused, hovered, focused, visible, selected]);

  function sourceClick() { track("review_source_click", { review_source: "google", cta_location: "GoogleReviews", page_path: window.location.pathname }); }
  function move(direction, rowIndex = 0) {
    setPaused(true);
    const target = desktop ? rows.current[rowIndex] : viewport.current;
    target?.scrollBy({ left: direction * Math.min(target.clientWidth * 0.85, 380), behavior: reducedMotion ? "auto" : "smooth" });
  }
  function keyboard(event, rowIndex) {
    if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1, rowIndex);
  }
  return <section data-google-reviews aria-labelledby={headingId} className="overflow-hidden bg-white px-5 py-7 text-darkText sm:py-12">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-navy">From our customers</p>
          <h2 id={headingId} className="mt-2 font-heading text-2xl font-bold sm:text-3xl">Google reviews</h2>
          <p className="mt-2 font-semibold text-navy"><span aria-hidden="true" className="mr-2 text-amber-500">★★★★★</span>{verifiedRating.value.toFixed(1)} out of 5 on Google</p>
          <p className="mt-1 text-xs text-gray-600">Rating checked November 1, 2026 · <a href={GOOGLE_PROFILE_URL} onClick={sourceClick} className="underline" target="_blank" rel="noopener noreferrer">Google profile</a></p>
        </div>
        <a href={GOOGLE_PROFILE_URL} onClick={sourceClick} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-md border border-aqua px-4 py-2 text-sm font-semibold text-navy hover:bg-lightGray">Read reviews on Google ↗</a>
      </div>
      <div ref={viewport} className="review-viewport mt-6" tabIndex={desktop ? -1 : 0} aria-label="Customer reviews; use left and right arrow keys" onKeyDown={(event) => keyboard(event, 0)}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)}
        onPointerDown={(event) => { if (event.pointerType !== "mouse") setPaused(true); }}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {groups.map((reviews, rowIndex) => <div key={rowIndex} ref={(node) => { rows.current[rowIndex] = node; }} className="review-row" tabIndex={desktop ? 0 : -1} role="group" aria-label={`Review row ${rowIndex + 1}; use arrow keys to browse`} onKeyDown={(event) => keyboard(event, rowIndex)}>
          {reviews.map((review) => <figure data-review-id={review.id} key={review.id} className="review-card rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <figcaption className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">{review.name.split(/\s+/).map((word) => word[0]).slice(0, 2).join("")}</span>
              <div><p className="font-semibold">{review.name}</p><p className="text-xs text-gray-600">Google review</p></div>
            </figcaption>
            <div aria-label={`${review.rating} out of 5 stars`} className="my-3 flex gap-1 text-amber-500">{Array.from({ length: review.rating }, (_, i) => <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" />)}</div>
            <blockquote className="text-sm leading-6 text-gray-700">“{review.omittedBefore && "… "}{review.excerpt}{review.omittedAfter && " …"}”</blockquote>
            {review.excerpted && <button type="button" onClick={() => setSelected(review)} aria-label={`Read full review by ${review.name}`} className="mt-2 min-h-11 text-left text-sm text-navy underline">Read full review</button>}
            <a href={review.individualReviewUrl || GOOGLE_PROFILE_URL} onClick={sourceClick} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center text-sm text-navy underline">Google business profile ↗</a>
          </figure>)}
        </div>)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => move(-1)} aria-label="Previous reviews" className="rounded-full border p-3"><ChevronLeft size={20} /></button>
        <button type="button" onClick={() => move(1)} aria-label="Next reviews" className="rounded-full border p-3"><ChevronRight size={20} /></button>
        {desktop && !reducedMotion && <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="min-h-11 rounded-md border px-4 text-sm font-semibold">{paused ? "Resume automatic scrolling" : "Pause automatic scrolling"}</button>}
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-600">Customer review excerpts from an owner-supplied Google snapshot. Visit the Google profile for current reviews.</p>
    </div>
    <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto p-5"><DialogPanel className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 text-darkText">
        <button type="button" onClick={() => setSelected(null)} aria-label="Close review" className="absolute right-2 top-2 p-3"><X size={20} /></button>
        <DialogTitle className="pr-10 text-xl font-semibold">Google review by {selected?.name}</DialogTitle>
        <blockquote className="my-5 whitespace-pre-line text-sm leading-7">{selected?.text}</blockquote>
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" onClick={sourceClick} className="inline-flex min-h-11 items-center underline">Visit Google business profile ↗</a>
      </DialogPanel></div>
    </Dialog>
  </section>;
}
