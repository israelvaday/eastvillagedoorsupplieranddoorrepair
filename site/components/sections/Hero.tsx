"use client";

import Image from "next/image";
import { CheckCircle2, Clock, DoorOpen, MapPin, Sparkles } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { LogoMark } from "@/components/site/Logo";

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const poster = `${base}/photos/branding-generated--hero-east-village-door-nyc.png`;

  return (
    <section className="relative isolate overflow-hidden bg-stone-100">
      <div className="mx-auto grid max-w-7xl lg:min-h-[90vh] lg:grid-cols-[1fr_1.05fr]">
        <div className="relative flex flex-col items-center justify-center px-4 pb-16 pt-24 text-center lg:items-start lg:px-8 lg:pb-20 lg:pt-28 lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-indigo-500/30 bg-white/80 px-3 py-2 shadow-card">
            <LogoMark className="h-7 w-7" />
            <div className="flex flex-col leading-tight text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-700">{BIZ.name}</span>
              <span className="font-mono text-[10px] text-stone-600">Supply · Install · Repair</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Written project scopes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-amber-400/40 bg-amber-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-600">
              <Clock className="h-3.5 w-3.5" />
              Mon–Sat service
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-stone-300 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-700">
              <MapPin className="h-3.5 w-3.5 text-indigo-600" />
              Manhattan &amp; Brooklyn
            </span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600">{BIZ.tagline}</p>

          <h1 className="mt-4 max-w-xl font-display text-[2.35rem] font-extrabold leading-[1.04] tracking-tight text-indigo-950 sm:text-5xl lg:text-6xl">
            Door supply, installation &amp;{" "}
            <span className="text-accent-gradient">structural repair</span> across NYC.
          </h1>

          <p className="mt-5 max-w-xl text-base text-stone-700 sm:text-lg">
            From our Loisaida Ave shop, we measure, supply, and install premium doors for Manhattan and Brooklyn
            homes, storefronts, and multifamily buildings — with written scopes before work begins.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-stone-600 lg:justify-start">
            {["Residential", "Commercial", "Custom", "Hardware", "Fire-rated", "Emergency"].map((s) => (
              <li key={s} className="rounded-sm border border-stone-300 bg-white px-2.5 py-1 shadow-inset">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center lg:justify-start">
            <ContactCTA size="lg" />
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-stone-700 lg:justify-start">
            <li className="flex items-center gap-1.5">
              <DoorOpen className="h-4 w-4 text-indigo-600" />
              On-site measuring
            </li>
            <li className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Written estimates
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              Code-compliant installs
            </li>
          </ul>
        </div>

        <div className="relative min-h-[340px] border-t border-stone-300 lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src={poster}
            alt="Premium door installation in an East Village Manhattan property"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-l lg:from-stone-100/95 lg:via-stone-100/25 lg:to-transparent" />
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-sm border border-white/30 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <DoorOpen className="h-3.5 w-3.5" />
            East Village · NYC door projects
          </div>
        </div>
      </div>
    </section>
  );
}
