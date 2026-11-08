import Image from "next/image";

export default function FormCertifications({ className = "" }) {
  return (
    <div data-form-certifications className={`border-t border-slate-200 pt-4 ${className}`}>
      <p className="text-center text-xs font-semibold tracking-wide text-navy">
        Industry certifications
      </p>
      <div className="mx-auto mt-3 grid max-w-sm grid-cols-2 gap-3">
        <div className="flex h-16 min-w-0 items-center justify-center rounded-lg bg-navy px-3 py-2">
          <Image
            src="/images/iicrc-certified.webp"
            alt="IICRC Certified"
            width={533}
            height={224}
            sizes="144px"
            className="h-auto max-h-12 w-full object-contain"
          />
        </div>
        <div className="flex h-16 min-w-0 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Image
            src="/images/normilogo.png"
            alt="NORMI Certified"
            width={250}
            height={84}
            sizes="144px"
            className="h-auto max-h-12 w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
