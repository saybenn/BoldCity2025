import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { writtenReviews, verifiedRating } from "@/lib/google-reviews";
import { compactReviewExcerpt } from "@/lib/review-presentation";
import { verifiedReviewerAvatar } from "@/lib/reviewer-avatars";
import ReviewerAvatar from "@/components/ReviewerAvatar";

function cycleLength(track) {
  const original = track?.querySelector("[data-review-id]");
  const copy = track?.querySelector("[data-review-copy]");
  return original && copy ? copy.getBoundingClientRect().left - original.getBoundingClientRect().left : 0;
}

function ReviewCard({ review, avatarSource, copy = false }) {
  const excerpt = compactReviewExcerpt(review);
  const avatar = verifiedReviewerAvatar(review, avatarSource);
  return <figure data-review-id={copy ? undefined : review.id} data-review-copy={copy ? review.id : undefined} aria-hidden={copy ? true : undefined} inert={copy ? true : undefined} className="review-card rounded-2xl border border-slate-200/80 bg-white shadow-sm">
    <figcaption className="flex min-w-0 items-center gap-2.5">
      <ReviewerAvatar key={avatar ? `${avatar.photoUrl}:${avatar.expiresAt}` : "initials"} name={review.name} avatar={avatar} copy={copy} />
      <p className="min-w-0 text-sm font-semibold leading-5">{avatar?.reviewUrl && !copy ? <a href={avatar.reviewUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" className="rounded-sm hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy" aria-label={`View ${review.name}'s review on Google`}>{review.name}</a> : review.name}</p>
    </figcaption>
    <div aria-label={`${review.rating} out of 5 stars`} className="review-stars flex gap-0.5 text-amber-500">{Array.from({ length: review.rating }, (_, i) => <Star key={i} aria-hidden="true" className="h-3.5 w-3.5 fill-current" />)}</div>
    <blockquote className="review-quote text-gray-700">“{excerpt.omittedBefore && "… "}{excerpt.text}{excerpt.omittedAfter && " …"}”</blockquote>
  </figure>;
}

// Empty until an authorized, fresh server-side delivery supplies verified
// metadata. The approved 23 source records and 22-review order stay untouched.
export default function ReviewsCarousel({ reviewerAvatars = {} }) {
  const headingId = useId(), instructionsId = useId();
  const viewport = useRef(null), rows = useRef([]), touchTimer = useRef(null);
  const pointerActive = useRef(false), interacting = useRef(false);
  const [desktop, setDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [paused, setPaused] = useState(false), [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false), [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const split = Math.ceil(writtenReviews.length / 2);
  const groups = [writtenReviews.slice(0, split), writtenReviews.slice(split)];

  useEffect(() => {
    const wide = matchMedia("(min-width: 768px)"), reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setDesktop(wide.matches); setReducedMotion(reduced.matches); };
    const visibility = () => setPageVisible(!document.hidden);
    update(); visibility();
    wide.addEventListener("change", update); reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(viewport.current);
    return () => {
      wide.removeEventListener("change", update); reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility); observer.disconnect();
    };
  }, []);
  useEffect(() => () => clearTimeout(touchTimer.current), []);

  useEffect(() => {
    if (reducedMotion || paused || focused || touching || !visible || !pageVisible) return;
    const tracks = desktop ? rows.current : [viewport.current];
    let frame, last;
    let metrics = tracks.map((track) => ({ length: cycleLength(track), position: track.scrollLeft }));
    const resize = new ResizeObserver(() => {
      metrics = tracks.map((track) => ({ length: cycleLength(track), position: track.scrollLeft }));
    });
    tracks.forEach((track) => resize.observe(track));
    const advance = (now) => {
      if (last) tracks.forEach((track, i) => {
        const metric = metrics[i];
        if (!metric.length) return;
        const direction = i === 1 ? -1 : 1;
        // The decorative repeat is pixel-identical at either end of a cycle.
        // Fractional positions keep low-speed motion smooth on narrow screens.
        metric.position = (metric.position + direction * Math.min(now - last, 50) * .022 + metric.length) % metric.length;
        track.scrollLeft = metric.position;
      });
      last = now; frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); };
  }, [desktop, reducedMotion, paused, focused, touching, visible, pageVisible]);

  function move(direction, rowIndex = 0) {
    const target = desktop ? rows.current[rowIndex] : viewport.current;
    const length = cycleLength(target);
    if (!target || !length) return;
    let position = target.scrollLeft % length;
    if (direction < 0 && position < 1) position += length;
    target.scrollLeft = position;
    target.scrollBy({ left: direction * Math.min(target.clientWidth * .85, 340), behavior: reducedMotion ? "auto" : "smooth" });
  }
  function keyboard(event, rowIndex) {
    if (event.target !== event.currentTarget) return;
    if (event.key === "Escape" || event.key === " ") {
      event.preventDefault(); setPaused(event.key === "Escape"); return;
    }
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1, rowIndex);
  }
  function releaseInteraction() {
    clearTimeout(touchTimer.current);
    if (pointerActive.current) return;
    touchTimer.current = setTimeout(() => { interacting.current = false; setTouching(false); }, 1100);
  }

  return <section data-google-reviews aria-labelledby={headingId} className="reviews-section overflow-hidden bg-white px-5 text-darkText"
    onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="relative mx-auto max-w-6xl">
      <div className="review-heading">
        <div className="flex items-center gap-3">
          {/* Google's original file includes a broad transparent canvas. Frame
              that canvas without altering the mark's proportions or colors. */}
          <span aria-hidden="true" className="relative h-12 w-12 shrink-0 overflow-hidden">
            <Image src="/images/brands/google-g.png" alt="" width={108} height={108} className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" />
          </span>
          <h2 id={headingId} className="font-heading text-xl font-bold sm:text-2xl">Reviews on Google</h2>
        </div>
        <p className="flex items-center gap-3 text-navy" aria-label={`${verifiedRating.value.toFixed(1)} out of 5 on Google`}>
          <span className="text-3xl font-bold leading-none">{verifiedRating.value.toFixed(1)}</span>
          <span aria-hidden="true" className="text-xl tracking-wide text-amber-500">★★★★★</span>
          <span aria-hidden="true" className="text-xs font-medium">out of 5</span>
        </p>
      </div>
      <button type="button" className="review-motion-toggle" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>{paused ? "Resume review motion" : "Pause review motion"}</button>
      <p id={instructionsId} className="sr-only">Review excerpts scroll automatically. Focus pauses motion. Use left and right arrow keys to browse, Escape to keep motion paused, or Space to allow it again after focus leaves. A pause button appears when focused by keyboard. Automatic motion is disabled when reduced motion is preferred.</p>
      <div ref={viewport} className="review-viewport" tabIndex={desktop ? -1 : 0} role="group" aria-label="Customer review excerpts" aria-describedby={instructionsId} onKeyDown={(event) => keyboard(event, 0)}
        onPointerDown={(event) => { if (event.pointerType !== "mouse") { pointerActive.current = true; interacting.current = true; clearTimeout(touchTimer.current); setTouching(true); } }}
        onPointerUp={() => { pointerActive.current = false; releaseInteraction(); }} onPointerCancel={() => { pointerActive.current = false; releaseInteraction(); }}
        onScrollCapture={() => { if (interacting.current) releaseInteraction(); }}
        onWheel={() => { interacting.current = true; setTouching(true); releaseInteraction(); }}>
        {groups.map((reviews, rowIndex) => <div key={rowIndex} ref={(node) => { rows.current[rowIndex] = node; }} className="review-row" tabIndex={desktop ? 0 : -1} role="group" aria-label={`Review row ${rowIndex + 1}`} aria-describedby={instructionsId} onKeyDown={(event) => keyboard(event, rowIndex)}>
          {reviews.map((review) => <ReviewCard review={review} avatarSource={reviewerAvatars[review.id]} key={review.id} />)}
          {reviews.map((review) => <ReviewCard review={review} avatarSource={reviewerAvatars[review.id]} copy key={`copy-${review.id}`} />)}
        </div>)}
      </div>
    </div>
  </section>;
}
