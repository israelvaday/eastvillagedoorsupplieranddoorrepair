import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, DoorOpen, MapPin, Sparkles } from "lucide-react";
import { AREAS, AREAS_BY_SLUG, nearbyAreas } from "@/lib/areas";
import { SERVICES } from "@/content/services";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { ServiceMap } from "@/components/site/ServiceMap";
import { AreaAvailabilityChecker } from "@/components/site/DispatchTracker";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export function generateStaticParams() {
  return AREAS.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = AREAS_BY_SLUG[slug];
  if (!area) return {};
  return {
    title: `Door Services in ${area.name}, NY`,
    description: `${BIZ.name} provides residential and commercial door supply, installation, repair, hardware, and fire-rated door services in ${area.name}, NY.`,
    alternates: { canonical: `/service-areas/${area.slug}` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = AREAS_BY_SLUG[slug];
  if (!area) return notFound();

  const nearby = nearbyAreas(area, 6);
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const heroSrc = `${base}/photos/service-hero-residential-door-installation.png`;

  return (
    <>
      <section className="relative overflow-hidden border-b border-cream-300 bg-cream-100">
        <Image
          src={heroSrc}
          alt={`Door project inspiration for ${area.name}, New York`}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover opacity-40"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-cream-100 via-cream-100/85 to-cream-100/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_minmax(360px,440px)]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-cream-100/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-600 backdrop-blur">
                  <DoorOpen className="h-3.5 w-3.5" /> NYC door services
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 backdrop-blur">
                  <Clock className="h-3.5 w-3.5" /> Mon–Fri 7–6 · Sat 8–2
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-100/60 px-3 py-1.5 text-xs font-semibold text-cream-700 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-teal-600" /> {area.name}, NY
                </span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight md:text-6xl">
                Door services in <span className="text-accent-gradient">{area.name}</span>, NY
              </h1>
              <p className="mt-4 max-w-2xl text-base text-cream-700 md:text-lg">
                {BIZ.name} serves {area.name} with residential and commercial installation, custom fabrication,
                hardware supply, structural repair, fire-rated doors, storefront systems, and emergency service.
              </p>
              <div className="mt-7">
                <ContactCTA size="lg" />
              </div>
            </div>
            <AreaAvailabilityChecker areaName={area.name} areaSlug={area.slug} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">{area.name} coverage</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Map centered on {area.name}
            </h2>
            <p className="mt-2 text-sm text-cream-600">
              Coordinates retained for this service-area page: {area.lat.toFixed(3)}°, {area.lng.toFixed(3)}°.
            </p>
          </div>
          <ServiceMap
            lat={area.lat}
            lng={area.lng}
            zoom={area.kind === "city" ? 13 : 14}
            title={`${area.name}, NY`}
            height={460}
          />
        </div>
      </section>

      <section className="border-t border-cream-300 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">Door services</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Service options in {area.name}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex items-start gap-3 rounded-sm border border-cream-300 bg-cream-50/50 p-4 transition-all hover:-translate-y-0.5 hover:border-teal-500/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-sm bg-teal-500/10 text-teal-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-cream-800">
                      {service.shortName} in {area.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-cream-600">{service.tagline}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cream-900 transition-all group-hover:translate-x-1 group-hover:text-teal-600" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="border-t border-cream-300 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Nearby service areas</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {nearby.map((neighbor) => (
                <Link
                  key={neighbor.slug}
                  href={`/service-areas/${neighbor.slug}`}
                  className="group flex items-center justify-between rounded-sm border border-cream-300 bg-cream-50/50 p-4 hover:border-teal-500/40"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-teal-600" />
                    <span className="font-semibold">{neighbor.name}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-cream-900 group-hover:text-teal-600" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-cream-300 py-16">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-sm text-cream-700 md:px-6 md:text-base">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Planning door work in {area.name}
          </h2>
          <p>
            A useful estimate starts with the opening and its current condition. Tell us whether the project involves
            a residential entry, interior door, commercial suite, storefront, fire-rated assembly, or emergency repair.
          </p>
          <p>
            Framing prep may include jamb straightening, header adjustments, threshold replacement, and hardware
            alignment. The appropriate steps depend on the building type and should be described in the written scope
            rather than assumed.
          </p>
          <p>
            Hardware, fire rating, and code requirements can affect appearance, security, and schedule. Building access
            and lead times for custom or fire-rated assemblies should be confirmed before ordering.
          </p>
          <p className="flex items-start gap-2">
            <Sparkles className="mt-1 h-4 w-4 shrink-0 text-teal-600" />
            Share the project address and preferred timing through the quote form so we can confirm coverage in
            {` ${area.name}`} and discuss next steps.
          </p>
        </div>
      </section>

      <LongFormFaq subject={area.name} kind="area" />

      <section className="border-t border-cream-300 bg-aurora py-16 text-center">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Have a door project in {area.name}?
          </h2>
          <p className="mt-3 text-cream-700">Tell {BIZ.name} about your opening and door needs.</p>
          <div className="mt-6 flex justify-center">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>
    </>
  );
}
