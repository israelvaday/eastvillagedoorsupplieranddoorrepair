"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type Photo = { id: string; src: string; alt: string; width: number; height: number };
type Group = { key: string; label: string; photos: Photo[] };

export function GalleryClient({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(groups[0]?.key ?? "all");
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const current = groups.find((g) => g.key === active) ?? groups[0];

  return (
    <>
      <div className="sticky top-[64px] z-30 border-b border-cream-300 bg-cream-100/80 backdrop-blur">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 md:px-6">
          <div className="flex gap-2 py-3">
            {groups.map((g) => (
              <button
                key={g.key}
                onClick={() => setActive(g.key)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-all",
                  active === g.key
                    ? "border-teal-500/60 bg-teal-500/15 text-teal-600"
                    : "border-cream-300 bg-cream-50/50 text-cream-600 hover:border-cream-400 hover:text-cream-800"
                )}
              >
                {g.label}
                <span className="ml-1.5 text-xs text-cream-900">{g.photos.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
            {current?.photos.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setLightbox(p)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-3 block w-full overflow-hidden rounded-sm border border-cream-300 bg-cream-50/40 outline-none transition-all hover:border-teal-500/40 focus-visible:border-teal-500/60"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="h-auto w-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-cream-100/95 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-cream-300 bg-cream-50 text-cream-800 hover:bg-cream-200"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-h-[88vh] max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                width={lightbox.width}
                height={lightbox.height}
                sizes="100vw"
                className="max-h-[88vh] w-auto rounded-sm object-contain"
              />
              <p className="mt-3 text-center text-sm text-cream-600">{lightbox.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
