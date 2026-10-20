import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/a0-human/",
        "/cases/",
        "/explore",
        "/guided",
        "/library",
        "/object",
        "/orient",
        "/orientation",
        "/request",
        "/the-eye",
        "/visitor-guide",
        "/wonder",
      ],
    },
    sitemap: "https://nexahedron.com/sitemap.xml",
    host: "https://nexahedron.com",
  };
}
