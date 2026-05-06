import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { trackCallClick, trackCta } from "@/lib/analytics";
import type { CtaLink } from "@/lib/service-area-pages/types";

type TrackedCtaLinkProps = {
  cta: CtaLink;
  pagePath: string;
  className?: string;
  children?: ReactNode;
};

function isPhoneHref(href: string) {
  return href.startsWith("tel:");
}

function isInternalHref(href: string) {
  return href.startsWith("/");
}

function normalizePhoneNumber(href: string) {
  return href.replace("tel:", "");
}

export default function TrackedCtaLink({
  cta,
  pagePath,
  className,
  children,
}: TrackedCtaLinkProps) {
  function handleClick(_event: MouseEvent<HTMLAnchorElement>) {
    const ctaLabel = cta.analyticsLabel ?? cta.label;
    const ctaLocation = cta.analyticsLocation ?? "service_area_page";

    if (isPhoneHref(cta.href)) {
      trackCallClick({
        cta_location: ctaLocation,
        page: pagePath,
        phone_number: normalizePhoneNumber(cta.href),
        intent: cta.analyticsIntent,
      });

      return;
    }

    trackCta({
      cta_label: ctaLabel,
      cta_location: ctaLocation,
      intent: cta.analyticsIntent,
      page: pagePath,
      href: cta.href,
    });
  }

  if (isInternalHref(cta.href)) {
    return (
      <Link
        href={cta.href}
        onClick={handleClick}
        data-cta-label={cta.analyticsLabel ?? cta.label}
        data-cta-location={cta.analyticsLocation ?? "service_area_page"}
        data-cta-intent={cta.analyticsIntent}
        className={className}
      >
        {children ?? cta.label}
      </Link>
    );
  }

  return (
    <a
      href={cta.href}
      onClick={handleClick}
      data-cta-label={cta.analyticsLabel ?? cta.label}
      data-cta-location={cta.analyticsLocation ?? "service_area_page"}
      data-cta-intent={cta.analyticsIntent}
      className={className}
    >
      {children ?? cta.label}
    </a>
  );
}
