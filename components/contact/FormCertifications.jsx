import Image from "next/image";

export default function FormCertifications({ className = "" }) {
  return (
    <div data-form-certifications role="group" aria-label="Industry certifications" className={`rounded-xl border border-slate-200 bg-white px-3 py-2 ${className}`}>
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-3">
        <div className="flex h-12 min-w-0 items-center justify-center rounded-md bg-navy px-2 py-1.5">
          <Image
            src="/images/iicrc-certified.webp"
            alt="IICRC Certified"
            width={533}
            height={224}
            sizes="144px"
            className="h-auto max-h-9 w-full object-contain"
          />
        </div>
        <div className="flex h-12 min-w-0 items-center justify-center rounded-md bg-white px-2 py-1.5">
          <Image
            src="/images/normilogo.png"
            alt="NORMI Certified"
            width={250}
            height={84}
            sizes="144px"
            className="h-auto max-h-9 w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
