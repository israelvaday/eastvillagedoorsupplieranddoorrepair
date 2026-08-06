import { MapPin } from "lucide-react";

export function ServiceMap({
  query,
  lat,
  lng,
  zoom = 13,
  title,
  height = 360,
  className,
}: {
  query?: string;
  lat?: number;
  lng?: number;
  zoom?: number;
  title?: string;
  height?: number;
  className?: string;
}) {
  // Prefer exact coordinates when given so the map is centered on the
  // specific service area rather than a generic search result.
  const src =
    typeof lat === "number" && typeof lng === "number"
      ? `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&t=m&ie=UTF8&iwloc=&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(query ?? "")}&output=embed`;
  return (
    <div className={`overflow-hidden rounded-3xl border border-stone-300 bg-stone-50/50 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-2 border-b border-stone-300 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
          <MapPin className="h-4 w-4 text-indigo-600" />
          {title ?? "Service area map"}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
          Coverage map
        </span>
      </div>
      <iframe
        src={src}
        title={title ?? "Service area map"}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ width: "100%", height, border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
