import Link from "next/link";
import type { AreaLinkItem } from "@/lib/service-area-pages/types";

type ServiceAreaLinksProps = {
  heading: string;
  items: AreaLinkItem[];
};

export default function ServiceAreaLinks({
  heading,
  items,
}: ServiceAreaLinksProps) {
  if (!items.length) return null;

  return (
    <section className="bg-white px-5 py-14 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-[#d7ded9] bg-stone-50 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0f766e]">
                Service areas
              </p>

              <h2 className="mt-3 text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1] tracking-[-0.045em] text-[#16211f]">
                {heading}
              </h2>

              <p className="mt-4 text-base leading-7 text-[#5f6f69]">
                Choose your area to view this service with local context.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={item.isCurrent ? "page" : undefined}
                  className={
                    item.isCurrent
                      ? "rounded-full bg-[#0f766e] px-5 py-3 text-sm font-bold text-white shadow-sm"
                      : "rounded-full border border-[#d7ded9] bg-white px-5 py-3 text-sm font-bold text-[#344054] transition hover:border-[#0f766e] hover:text-[#0f766e]"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
