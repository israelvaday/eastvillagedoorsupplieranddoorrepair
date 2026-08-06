import type { Metadata } from "next";
import Image from "next/image";
import { ClipboardCheck, Clock, DoorOpen, MapPin, Package, Phone, Sparkles } from "lucide-react";
import { BIZ } from "@/lib/business";
import { ContactCTA } from "@/components/site/ContactCTA";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LongFormFaq } from "@/components/site/LongFormFaq";

export const metadata: Metadata = {
  title: `About ${BIZ.name}`,
  description: `Learn how ${BIZ.name} approaches door supply, installation, structural repair, and hardware service across Manhattan & Brooklyn.`,
  alternates: { canonical: `${BIZ.url}/about` },
};

const APPROACH = [
  {
    Icon: ClipboardCheck,
    label: "Scope",
    value: "Written details",
    body: "Door type, hardware, framing adjustments, code requirements, and exclusions are discussed before work begins.",
  },
  {
    Icon: DoorOpen,
    label: "Measurement",
    value: "On-site accuracy",
    body: "We measure openings, verify swing, check jamb condition, and confirm hardware compatibility before ordering.",
  },
  {
    Icon: Package,
    label: "Supply",
    value: "Premium materials",
    body: "We source door slabs, frames, fire-rated assemblies, and commercial-grade hardware matched to your building.",
  },
  {
    Icon: Sparkles,
    label: "Closeout",
    value: "Testing & review",
    body: "The project concludes with latch alignment, hardware testing, cleanup, and a walkthrough against the scope.",
  },
] as const;

export default function AboutPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const inspiration = [
    { slug: "residential-door-installation", label: "Residential door project inspiration" },
    { slug: "commercial-door-installation", label: "Commercial door project inspiration" },
    { slug: "custom-door-fabrication", label: "Custom door fabrication inspiration" },
  ].map((item) => ({
    ...item,
    src: `${base}/photos/service-hero-${item.slug}.png`,
  }));

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={`${base}/photos/branding-generated--hero-east-village-door-nyc.png`}
            alt="Door supply and installation project inspiration for a NYC property"
            fill
            sizes="100vw"
            className="object-cover saturate-[1.04] contrast-[1.02]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-stone-100/95" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">About {BIZ.name}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Doors planned around <span className="text-accent-gradient">your opening</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-stone-100">
            We serve Manhattan &amp; Brooklyn with residential and commercial installation, custom fabrication,
            hardware supply, structural repair, fire-rated doors, storefront systems, and emergency service.
          </p>
          <div className="mt-7">
            <ContactCTA size="lg" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Our approach</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Measurement and code compliance come first.
            </h2>
            <p className="mt-4 text-stone-600">
              Door performance begins with accurate sizing and the right hardware. We organize the scope around opening
              condition, building type, security goals, access, and cleanup.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH.map(({ Icon, label, value, body }) => (
              <article key={label} className="rounded-sm border border-stone-300 bg-stone-50/50 p-5">
                <Icon className="h-5 w-5 text-indigo-600" />
                <div className="mt-3 text-sm text-stone-500">{label}</div>
                <h3 className="font-display font-bold text-white">{value}</h3>
                <p className="mt-2 text-sm text-stone-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-stone-300 bg-stone-100 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Project inspiration</p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Visualizing the kind of work we perform.
              </h2>
              <p className="mt-3 text-stone-600">
                These images are illustrative inspiration. They are not presented as photographs of completed customer
                projects.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {inspiration.map((photo) => (
                <div key={photo.slug} className="overflow-hidden rounded-sm border border-stone-300">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 to-stone-200/40 p-8 text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Discuss your project.</h2>
            <p className="mt-2 text-stone-600">
              Reach us during posted business hours or send a quote request whenever it is convenient.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-50/70 px-3 py-1.5">
                <Phone className="h-4 w-4 text-indigo-600" /> {BIZ.phone}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-50/70 px-3 py-1.5">
                <MapPin className="h-4 w-4 text-indigo-600" /> {BIZ.address.full}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-50/70 px-3 py-1.5">
                <Clock className="h-4 w-4 text-indigo-600" /> Mon–Fri 7–6 · Sat 8–2
              </span>
            </div>
            <div className="mt-6 flex justify-center">
              <ContactCTA size="lg" />
            </div>
          </div>
        </div>
      </section>

      <LongFormFaq subject="NYC Door Services" kind="service" />
      <FinalCTA />
    </>
  );
}
