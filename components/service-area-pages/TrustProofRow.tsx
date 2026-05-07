import type { TrustItem } from "@/lib/service-area-pages/types";

type TrustProofRowProps = {
  items: TrustItem[];
};

export default function TrustProofRow({ items }: TrustProofRowProps) {
  if (!items.length) return null;

  return (
    <section className="bg-stone-50 px-5 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-3 rounded-[1.75rem] border border-[#d7ded9] bg-white p-3 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="rounded-[1.25rem] bg-slate-50 p-5">
              <p className="text-base font-black tracking-[-0.02em] text-[#16211f]">
                {item.label}
              </p>

              {item.description ? (
                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  {item.description}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
