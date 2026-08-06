import type { MetadataRoute } from "next";
import { BIZ } from "@/lib/business";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: `${BIZ.url}/sitemap.xml`,
    host: BIZ.url,
  };
}
