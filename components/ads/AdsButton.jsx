import Link from "next/link";
import { trackCta, trackCallClick } from "@/lib/analytics";

export default function AdsButton({
  href = "#",
  children,
  variant = "primary",
  className = "",
  ctaLocation,
  intent,
  page = "/ads/emergency-restoration",
  phoneNumber = "+19044346318",
}) {
  const styles = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
    secondary:
      "bg-amber-500 text-zinc-900 hover:bg-amber-400 focus-visible:ring-amber-500",
    ghost:
      "bg-transparent text-emerald-300 ring-1 ring-emerald-300 hover:bg-emerald-50/10 focus-visible:ring-emerald-300",
    outline:
      "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-50 focus-visible:ring-zinc-300",
  };

  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const handleClick = () => {
    const label = typeof children === "string" ? children : "CTA";

    trackCta({
      cta_label: label,
      cta_location: ctaLocation || "unknown",
      intent,
      page,
      href,
    });

    if (href.startsWith("tel:")) {
      trackCallClick({
        cta_location: ctaLocation || "unknown",
        page,
        phone_number: phoneNumber,
        intent,
      });
    }
  };

  const content = (
    <span className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );

  if (href.startsWith("tel:") || href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={handleClick}
        aria-label={typeof children === "string" ? children : "CTA"}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick}>
      {content}
    </Link>
  );
}
