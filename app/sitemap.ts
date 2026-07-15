import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

const SITE_URL = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/fleet", "/experience", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
