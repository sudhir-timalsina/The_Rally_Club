import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getUpcomingEvents } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/why-we-started",
    "/founder",
    "/events",
    "/community",
    "/faq",
    "/partners",
    "/contact",
    "/legal/privacy",
    "/legal/cookies",
    "/legal/terms",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const events = await getUpcomingEvents();
  const eventRoutes = events.map((event) => ({
    url: `${siteConfig.url}/events/${event.slug}`,
    lastModified: new Date(event.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...eventRoutes];
}
