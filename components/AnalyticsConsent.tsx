import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { getAnalyticsConsent, serverAnalyticsConsent, setAnalyticsConsent, subscribeAnalyticsConsent } from "@/lib/analytics-consent";

export default function AnalyticsConsent() {
  const choice = useSyncExternalStore(subscribeAnalyticsConsent, getAnalyticsConsent, serverAnalyticsConsent);
  const [editing, setEditing] = useState(false);
  const choose = (value: "granted" | "denied") => { setEditing(false); setAnalyticsConsent(value); };
  return <>
    <div className="bg-navy-dark px-4 py-3 text-center text-xs text-white/80">
      <Link href="/privacy" className="rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua">Privacy</Link>
      <span aria-hidden="true" className="px-3">·</span>
      <button type="button" onClick={() => setEditing(true)} className="min-h-11 rounded underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aqua">Analytics choices</button>
    </div>
    {choice === "unknown" || editing ? <section data-analytics-consent aria-labelledby="analytics-consent-heading"
      className="fixed inset-x-3 bottom-20 z-[90] mx-auto max-h-[70dvh] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 text-navy shadow-xl sm:inset-x-auto sm:bottom-5 sm:left-5">
      <h2 id="analytics-consent-heading" className="text-lg font-semibold">Your analytics choice</h2>
      <p className="mt-2 text-sm leading-6 text-slate-700">May we use Google Analytics to understand visits and service enquiries? It is optional. You can contact us either way.</p>
      <p className="mt-2 text-xs leading-5 text-slate-600">This choice controls analytics only. <Link href="/privacy" className="rounded underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">Privacy details</Link></p>
      {choice === "granted" ? <p className="mt-2 text-xs leading-5 text-slate-600">Declining reloads this page to stop analytics. Unsent form text will not be saved.</p> : null}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("denied")} className="min-h-11 rounded-md border border-navy px-3 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">Decline analytics</button>
        <button type="button" onClick={() => choose("granted")} className="min-h-11 rounded-md border border-navy bg-navy px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">Allow analytics</button>
      </div>
    </section> : null}
  </>;
}
