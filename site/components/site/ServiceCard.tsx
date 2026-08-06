import Image from "next/image";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/site/Logo";
import { cn } from "@/lib/cn";
import { BIZ } from "@/lib/business";

export type ServiceCardProps = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  photoSrc: string;
  photoAlt: string;
  photoW: number;
  photoH: number;
  city?: string;
  priority?: boolean;
};

export function ServiceCard({
  slug, name, shortName, tagline, Icon, photoSrc, photoAlt, photoW, photoH, city, priority,
}: ServiceCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative block overflow-hidden rounded-sm border border-stone-300 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-indigo-500/50 hover:shadow-lift"
    >
      {/* Photo */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={photoSrc}
          alt={photoAlt}
          width={photoW}
          height={photoH}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] saturate-[1.05] contrast-[1.03]"
        />
        {/* Bottom gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" />

        {/* Logo watermark, top-left */}
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-sm border border-white/25 bg-black/50 px-2.5 py-1.5 backdrop-blur-sm">
          <LogoMark className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
            {BIZ.name}
          </span>
        </div>

        {/* Map / location pill, top-right */}
        {city && (
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-sm border border-white/20 bg-black/45 px-2.5 py-1 backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-indigo-300" />
            <span className="text-[10px] font-semibold text-white/90">{city}</span>
          </div>
        )}

        {/* Title overlay, bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5 text-indigo-600")} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-600">
              {shortName}
            </span>
          </div>
          <h3 className="mt-1.5 font-display text-2xl font-extrabold leading-tight text-white">
            {name}
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 p-5">
        <p className="text-sm text-stone-600">{tagline}</p>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-stone-900 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600" />
      </div>
    </Link>
  );
}
