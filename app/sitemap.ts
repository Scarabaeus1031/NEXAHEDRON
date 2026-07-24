import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/accessibility",
  "/cases",
  "/cases/plate-tectonics",
  "/cases/what-is-a-map",
  "/cases/what-is-a-scientific-model",
  "/cases/what-is-evidence",
  "/cases/what-is-scale",
  "/contact",
  "/explore",
  "/imprint",
  "/library",
  "/orient",
  "/privacy",
  "/visitor-guide",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://nexahedron.com${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/orient" ? 0.9 : 0.7,
  }));
}
