import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-aurora py-32">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="font-display text-5xl font-extrabold">404</h1>
        <p className="mt-3 text-cream-700">That page doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-block rounded-sm bg-teal-500 px-5 py-3 font-semibold text-white">
          Back home
        </Link>
      </div>
    </section>
  );
}
