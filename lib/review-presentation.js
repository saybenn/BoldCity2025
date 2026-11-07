// Shorten only the accepted verbatim excerpt, at a word boundary. Source records
// stay untouched, and omitted text is visibly marked by the renderer.
export function compactReviewExcerpt(review, limit = 128) {
  const original = review.excerpt.trim();
  const end = original.length > limit ? original.lastIndexOf(" ", limit) : original.length;
  const text = original.slice(0, end > 0 ? end : limit);
  return { text, omittedBefore: review.omittedBefore, omittedAfter: review.omittedAfter || text.length < original.length };
}
