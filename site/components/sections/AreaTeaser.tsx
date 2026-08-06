import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { MAIN_AREAS, AREAS } from "@/lib/areas";

export function AreaTeaser() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Service Areas</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
            Serving Manhattan &amp; Brooklyn.
          </h2>
          <p className="mt-3 max-w-2xl text-cream-600">
            Door supply, installation, and repair across {AREAS.length}+ NYC neighborhoods and communities.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {MAIN_AREAS.map((a) => (
            <Link
              key={a.slug}
              href={`/service-areas/${a.slug}`}
              className="group flex items-center justify-between gap-3 rounded-sm border border-cream-300 bg-cream-50/50 p-4 transition-all hover:-translate-y-0.5 hover:border-teal-500/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-500/10 text-teal-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="font-semibold">{a.name}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-cream-900 transition-all group-hover:translate-x-1 group-hover:text-teal-600" />
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-5 py-2.5 text-sm font-semibold text-teal-600 transition-all hover:bg-teal-500/20"
          >
            Explore all {AREAS.length} service areas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
