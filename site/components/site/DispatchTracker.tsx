import Link from "next/link";
import { CalendarDays, MapPin, Phone } from "lucide-react";
import { BIZ } from "@/lib/business";

export function AreaAvailabilityChecker({
  areaName,
}: {
  areaName: string;
  areaSlug: string;
}) {
  return (
    <aside className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-cream-200 via-cream-100 to-cream-200 p-5 shadow-2xl shadow-black/40 md:p-7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,74,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,74,.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative inline-flex items-center gap-1.5 rounded-full border border-teal-500/40 bg-teal-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">
        <MapPin className="h-3 w-3" /> {areaName}, NY
      </div>
      <h2 className="relative mt-4 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
        Check project availability in {areaName}
      </h2>
      <p className="relative mt-2 text-sm leading-relaxed text-cream-600 md:text-base">
        {BIZ.name} serves {areaName} as part of our Manhattan &amp; Brooklyn coverage area. Dates depend on
        project scope, hardware lead times, building access, and the current schedule, so an instant checker cannot
        promise availability or arrival times.
      </p>
      <div className="relative mt-5 rounded-sm border border-cream-300 bg-cream-100/60 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-teal-600">
          <CalendarDays className="h-4 w-4" /> Get a real scheduling answer
        </div>
        <p className="mt-2 text-xs leading-relaxed text-cream-600">
          Share the address, door type, opening condition, hardware needs, and timing. We will confirm coverage and
          discuss the next appropriate step.
        </p>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-3">
        <Link
          href="/quote"
          className="inline-flex items-center rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-teal-400"
        >
          Request a quote
        </Link>
        <a
          href={BIZ.phoneHref}
          className="inline-flex items-center gap-2 rounded-full border border-teal-500/50 px-5 py-2.5 text-sm font-bold text-teal-600 transition hover:bg-teal-500/10"
        >
          <Phone className="h-4 w-4" /> Call {BIZ.phone}
        </a>
      </div>
    </aside>
  );
}
