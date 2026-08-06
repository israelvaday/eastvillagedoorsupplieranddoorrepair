"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { BIZ } from "@/lib/business";
import { Logo } from "./Logo";
import { HoursBadge } from "./HoursBadge";
import { ContactCTA } from "./ContactCTA";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/services",       label: "Services" },
  { href: "/service-areas",  label: "Service Areas" },
  { href: "/gallery",        label: "Gallery" },
  { href: "/blog",           label: "Blog" },
  { href: "/faq",            label: "FAQ" },
  { href: "/reviews",        label: "Experience" },
  { href: "/about",          label: "About" },
  { href: "/contact",        label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-cream-300/80 glass">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0"
        >
          <Logo size="md" />
        </Link>
        {/* spacer to balance the menu button on mobile so the logo stays visually centered */}
        <span aria-hidden className="h-10 w-10 md:hidden" />
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm text-cream-700 transition-colors hover:bg-cream-200/60 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <HoursBadge />
          {BIZ.social.instagram && (
            <a
              href={BIZ.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-teal-500/40 bg-teal-500/10 text-teal-600 transition hover:scale-105 hover:border-teal-400 hover:text-teal-500"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          <ContactCTA size="sm" showLabels={false} className="gap-2" />
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-sm border border-cream-300 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-cream-300 transition-all duration-300",
          open ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base text-cream-700 hover:bg-cream-200/60 hover:text-white"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <HoursBadge />
            {BIZ.social.instagram && (
              <a
                href={BIZ.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-600"
              >
                <Instagram className="h-3.5 w-3.5" /> Instagram
              </a>
            )}
          </div>
          <div className="mt-3">
            <ContactCTA size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}
