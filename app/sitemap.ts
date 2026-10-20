import type { MetadataRoute } from "next";

const routes = [
  "",
  "/accessibility",
  "/contact",
  "/imprint",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://nexahedron.com${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.5,
  }));
}
