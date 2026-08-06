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
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass shadow-nav">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="md:static md:translate-x-0 md:translate-y-0">
          <Logo size="md" variant="dark" />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="border border-transparent px-3 py-2 text-sm font-medium uppercase tracking-wide text-stone-200 transition hover:border-amber-500/40 hover:text-amber-300"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <HoursBadge variant="dark" />
          {BIZ.social.instagram && (
            <a
              href={BIZ.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center border border-stone-600 text-stone-300 transition hover:border-amber-500 hover:text-amber-400"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
          <ContactCTA size="sm" showLabels={false} className="gap-2" />
        </div>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center border border-stone-600 text-stone-100 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-stone-700 transition-all duration-300",
          open ? "max-h-[32rem]" : "max-h-0"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 bg-indigo-950 px-4 py-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border border-transparent px-3 py-3 text-base font-medium uppercase tracking-wide text-stone-200 hover:border-amber-500/40 hover:text-amber-300"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-3 flex items-center gap-2">
            <HoursBadge variant="dark" />
          </div>
          <div className="mt-3">
            <ContactCTA size="md" />
          </div>
        </div>
      </div>
    </header>
  );
}
