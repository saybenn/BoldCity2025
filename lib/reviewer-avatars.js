// Avatar metadata must come from an authorized server-side source. Never infer a
// portrait from a name, reuse project photos, or commit API photo URLs as assets.
export const MAX_AVATAR_AGE_MS = 30 * 24 * 60 * 60 * 1000;
const SOURCES = new Set(["google_business_profile_api", "authorized_owner_export"]);
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function reviewerInitials(name = "") {
  return name.trim().split(/\s+/).filter(Boolean).map((word) => [...word][0]).slice(0, 2).join("");
}

export function safeReviewerPhotoUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "lh3.googleusercontent.com" || url.port || url.username || url.password || url.hash || url.pathname.length < 2) return null;
    // Keep the provider's URL intact. No arbitrary queries, tokens or resize
    // rewrites; add other hosts only after validating an actual API response.
    if ([...url.searchParams].some(([key, size]) => key !== "sz" || !/^\d{1,3}$/.test(size) || Number(size) > 128)) return null;
    return url.href;
  } catch { return null; }
}

function safeGoogleLink(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["www.google.com", "maps.google.com"].includes(url.hostname) || !url.pathname.startsWith("/maps") || url.port || url.username || url.password || url.hash) return null;
    if ([...url.searchParams.keys()].some((key) => /token|key|auth|code/i.test(key))) return null;
    return url.href;
  } catch { return null; }
}

const normalize = (value) => typeof value === "string" ? value.normalize("NFC").replace(/\s+/g, " ").trim() : "";

export function verifiedReviewerAvatar(review, source, now = Date.now()) {
  if (!review || !source || !SOURCES.has(source.source) || source.verified !== true || source.deliveryApproved !== true) return null;
  if (source.recordId !== review.id || !source.reviewId || source.reviewer?.isAnonymous !== false) return null;
  if (review.googleReviewId && review.googleReviewId !== source.reviewId) return null;
  const sameName = normalize(source.reviewer.displayName) === normalize(review.name);
  const sameRating = source.rating === review.rating;
  const exactId = Boolean(review.googleReviewId && review.googleReviewId === source.reviewId);
  const exactText = Boolean(review.text && normalize(source.comment) === normalize(review.text));
  if (!sameName || !sameRating || !(exactId || exactText)) return null;

  const verifiedAt = Date.parse(source.verifiedAt), expiresAt = Date.parse(source.expiresAt);
  if (![verifiedAt, expiresAt, now].every(Number.isFinite) || verifiedAt > now || expiresAt <= now || expiresAt <= verifiedAt || expiresAt - verifiedAt > MAX_AVATAR_AGE_MS) return null;
  const photoUrl = safeReviewerPhotoUrl(source.reviewer.profilePhotoUrl), validation = source.imageValidation;
  if (!photoUrl || validation?.url !== photoUrl || validation.valid !== true || !IMAGE_TYPES.has(validation.contentType)) return null;
  if (!(validation.bytes > 0 && validation.bytes <= 65536 && validation.width > 0 && validation.width <= 128 && validation.height > 0 && validation.height <= 128)) return null;
  const authorUrl = safeGoogleLink(source.attribution?.authorUrl), reviewUrl = safeGoogleLink(source.attribution?.reviewUrl);
  if ((source.attribution?.authorUrl && !authorUrl) || (source.attribution?.reviewUrl && !reviewUrl)) return null;
  if (source.attribution?.required && (!authorUrl || !reviewUrl)) return null;
  return { photoUrl, authorUrl, reviewUrl, expiresAt, matchedBy: exactId ? "exact_review_id" : "exact_text_rating_name" };
}
