import { useEffect, useId, useRef, useState } from "react";
import { Star } from "lucide-react";
import { GOOGLE_PROFILE_URL, writtenReviews, verifiedRating } from "@/lib/google-reviews";
import { track } from "@/lib/analytics";

export default function ReviewsCarousel() {
  const headingId = useId();
  const instructionsId = useId();
  const viewport = useRef(null);
  const rows = useRef([]);
  const touchTimer = useRef(null);
  const directions = useRef([1, -1]);
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(false);
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
  useEffect(() => () => clearTimeout(touchTimer.current), []);
  useEffect(() => {
    if (desktop && rows.current[1]) rows.current[1].scrollLeft = rows.current[1].scrollWidth - rows.current[1].clientWidth;
  }, [desktop]);
  useEffect(() => {
    if (!desktop || reducedMotion || paused || hovered || focused || touching || !visible) return;
    let frame, last;
    const positions = rows.current.map((row) => row.scrollLeft);
    const advance = (now) => {
      if (last && !document.hidden) rows.current.forEach((row, i) => {
        const maximum = row.scrollWidth - row.clientWidth;
        if (maximum <= 0) return;
        if (positions[i] >= maximum - 1) directions.current[i] = -1;
        if (positions[i] <= 1) directions.current[i] = 1;
        positions[i] = Math.max(0, Math.min(maximum, positions[i] + directions.current[i] * Math.min(now - last, 50) * 0.02));
        row.scrollLeft = positions[i];
      });
      last = now; frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => cancelAnimationFrame(frame);
  }, [desktop, reducedMotion, paused, hovered, focused, touching, visible]);

  function sourceClick() { track("review_source_click", { review_source: "google", cta_location: "GoogleReviews", page_path: window.location.pathname }); }
  function move(direction, rowIndex = 0) {
    const target = desktop ? rows.current[rowIndex] : viewport.current;
    target?.scrollBy({ left: direction * Math.min(target.clientWidth * 0.85, 380), behavior: reducedMotion ? "auto" : "smooth" });
  }
  function keyboard(event, rowIndex) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Escape" || event.key === " ") {
      event.preventDefault();
      setPaused(event.key === "Escape");
      return;
    }
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1, rowIndex);
  }
  function releaseTouch() {
    clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setTouching(false), 700);
  }
  return <section data-google-reviews aria-labelledby={headingId} className="overflow-hidden bg-white px-5 py-7 text-darkText sm:py-12">
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-widest text-navy">From our customers</p>
          <h2 id={headingId} className="mt-2 font-heading text-2xl font-bold sm:text-3xl">Google reviews</h2>
          <p className="mt-2 font-semibold text-navy"><span aria-hidden="true" className="mr-2 text-amber-500">★★★★★</span>{verifiedRating.value.toFixed(1)} out of 5 on Google</p>
          <p className="mt-1 text-xs text-gray-600">Rating checked November 1, 2026 · <a href={GOOGLE_PROFILE_URL} onClick={sourceClick} className="underline" target="_blank" rel="noopener noreferrer">Google profile</a></p>
        </div>
      </div>
      <p id={instructionsId} className="sr-only">Reviews pause on hover, focus or touch. Use the left and right arrow keys to browse. Escape keeps motion paused; Space allows it again after focus leaves. Automatic motion is disabled when reduced motion is preferred.</p>
      <div ref={viewport} className="review-viewport mt-6" tabIndex={desktop ? -1 : 0} role="group" aria-label="Customer reviews" aria-describedby={instructionsId} onKeyDown={(event) => keyboard(event, 0)}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={(event) => { setHovered(false); if (event.pointerType !== "mouse") releaseTouch(); }}
        onPointerDown={(event) => { if (event.pointerType !== "mouse") { clearTimeout(touchTimer.current); setTouching(true); } }} onPointerUp={releaseTouch} onPointerCancel={releaseTouch}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {groups.map((reviews, rowIndex) => <div key={rowIndex} ref={(node) => { rows.current[rowIndex] = node; }} className="review-row" tabIndex={desktop ? 0 : -1} role="group" aria-label={`Review row ${rowIndex + 1}`} aria-describedby={instructionsId} onKeyDown={(event) => keyboard(event, rowIndex)}>
          {reviews.map((review) => <figure data-review-id={review.id} key={review.id} className="review-card rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <figcaption className="flex items-center gap-3">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-white">{review.name.split(/\s+/).map((word) => word[0]).slice(0, 2).join("")}</span>
              <div className="min-w-0"><p className="font-semibold">{review.name}</p><p className="text-xs text-gray-600">Google review</p></div>
            </figcaption>
            <div aria-label={`${review.rating} out of 5 stars`} className="review-stars flex gap-1 text-amber-500">{Array.from({ length: review.rating }, (_, i) => <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" />)}</div>
            <blockquote className="review-quote text-gray-700">“{review.omittedBefore && "… "}{review.excerpt}{review.omittedAfter && " …"}”</blockquote>
          </figure>)}
        </div>)}
      </div>
      <p className="mt-4 text-xs leading-5 text-gray-500">Selected customer reviews from Google. Excerpts shown; visit the profile above for current reviews.</p>
    </div>
  </section>;
}
