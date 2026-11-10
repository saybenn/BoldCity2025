import { useEffect, useState } from "react";
import Image from "next/image";
import { reviewerInitials, safeReviewerPhotoUrl } from "@/lib/reviewer-avatars";

export default function ReviewerAvatar({ name, avatar, copy = false }) {
  const photoUrl = safeReviewerPhotoUrl(avatar?.photoUrl);
  const expiresAt = avatar?.expiresAt;
  const [failed, setFailed] = useState(null), [loaded, setLoaded] = useState(null);
  const [expired, setExpired] = useState(null);
  useEffect(() => {
    if (!photoUrl || !Number.isFinite(expiresAt)) return;
    let timer;
    function checkExpiry() {
      const remaining = expiresAt - Date.now();
      timer = setTimeout(() => {
        if (expiresAt <= Date.now()) setExpired(photoUrl);
        else checkExpiry();
      }, Math.min(Math.max(remaining, 0), 2147483647));
    }
    checkExpiry();
    return () => clearTimeout(timer);
  }, [photoUrl, expiresAt]);
  const active = photoUrl && Number.isFinite(expiresAt) && failed !== photoUrl && expired !== photoUrl;
  const visual = <span aria-hidden="true" data-avatar-state={active ? loaded === photoUrl ? "photo" : "loading" : "initials"} className="review-avatar relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-xs font-semibold text-white">
    {reviewerInitials(name)}
    {active && <Image src={photoUrl} alt="" width={40} height={40} unoptimized loading="lazy" decoding="async" referrerPolicy="no-referrer"
      className={`absolute inset-0 h-full w-full object-cover ${loaded === photoUrl ? "opacity-100" : "opacity-0"}`}
      onLoad={() => setLoaded(photoUrl)} onError={() => setFailed(photoUrl)} />}
  </span>;
  // Links are sourced, never invented. Decorative repeats stay noninteractive.
  const sourceUrl = avatar?.authorUrl || avatar?.reviewUrl;
  return sourceUrl && expired !== photoUrl && !copy
    ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer" aria-label={`View ${name}'s Google profile or review`} className="review-avatar-link shrink-0 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">{visual}</a>
    : visual;
}
