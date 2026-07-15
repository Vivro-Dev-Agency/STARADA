import { createOgImage } from "@/lib/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const defaults = siteConfig.pages.home.og;

  return createOgImage({
    eyebrow: searchParams.get("eyebrow") ?? defaults.eyebrow,
    title: searchParams.get("title") ?? defaults.title,
    subtitle: searchParams.get("subtitle") ?? defaults.subtitle,
    footer: searchParams.get("footer") || undefined,
  });
}
