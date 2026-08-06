import Link from "next/link";
import { DoorOpen, Clock, Instagram, ChevronDown } from "lucide-react";
import { BIZ } from "@/lib/business";
import { MAIN_AREAS } from "@/lib/areas";
import { SERVICES } from "@/content/services";
import { Logo } from "./Logo";
import { ContactCTA } from "./ContactCTA";

export function Footer() {
  return (
    <footer className="border-t border-cream-300 bg-cream-100 pb-28 pt-12 md:pb-12 md:pt-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-4 md:gap-10 md:px-6">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Logo size="md" />
          <p className="mt-4 max-w-xs text-sm text-cream-600">
            Door supply, installation, and structural repair for residential and commercial properties across
            Manhattan &amp; Brooklyn — from our shop at {BIZ.address.street}.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-600">
              <DoorOpen className="h-3.5 w-3.5" /> Written scopes
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <Clock className="h-3.5 w-3.5" /> Mon–Sat service
            </span>
          </div>
          {BIZ.social.instagram ? (
            <a
              href={BIZ.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${BIZ.name} on Instagram`}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-600 transition hover:border-teal-400 hover:text-teal-500"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          ) : null}
        </div>

        <details className="group border-b border-cream-300 md:border-0" open>
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 md:cursor-default md:py-0">
            <h2 className="font-display text-sm font-semibold tracking-wide text-cream-800">Services</h2>
            <ChevronDown className="h-4 w-4 text-cream-500 transition-transform group-open:rotate-180 md:hidden" />
          </summary>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 pb-4 text-sm text-cream-600 md:mt-3 md:grid-cols-1 md:pb-0">
            {SERVICES.slice(0, 8).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-block py-1.5 hover:text-teal-600">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </details>

        <details className="group border-b border-cream-300 md:border-0" open>
          <summary className="flex cursor-pointer list-none items-center justify-between py-3 md:cursor-default md:py-0">
            <h2 className="font-display text-sm font-semibold tracking-wide text-cream-800">Top Areas</h2>
            <ChevronDown className="h-4 w-4 text-cream-500 transition-transform group-open:rotate-180 md:hidden" />
          </summary>
          <div className="pb-4 md:mt-3 md:pb-0">
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm text-cream-600">
              {MAIN_AREAS.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}`} className="inline-block py-1.5 hover:text-teal-600">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/service-areas"
              className="mt-3 inline-block text-sm font-semibold text-teal-600 hover:text-teal-600"
            >
              All service areas →
            </Link>
          </div>
        </details>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h2 className="font-display text-sm font-semibold tracking-wide text-cream-800">Plan a door project</h2>
          <p className="mt-3 max-w-xs text-sm text-cream-600">
            Share your opening, door type, hardware needs, property, and timing for a project-specific follow-up.
          </p>
          <div className="mt-4">
            <ContactCTA size="sm" showLabels />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-center text-xs text-cream-600 md:mt-10 md:px-6 md:text-left">
        © {new Date().getFullYear()} {BIZ.name}. All rights reserved. Serving Manhattan &amp; Brooklyn, New York.
      </div>
    </footer>
  );
}
