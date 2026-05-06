import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/service-area-pages/types";

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <section className="bg-[#f7f3eb] px-5 pt-6">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#667085]">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-2"
                >
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-[#0f766e]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={
                        isLast ? "font-medium text-[#1f2933]" : "text-[#667085]"
                      }
                    >
                      {item.label}
                    </span>
                  )}

                  {!isLast ? (
                    <span aria-hidden="true" className="text-[#98a2b3]">
                      /
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
