import type { Metadata } from "next";

import {
  getPageByPath,
  siteConfig,
  type SiteOgImage,
} from "@/lib/site-config";

const OG_SIZE = { width: 1200, height: 630 } as const;

export const SITE_NAME = siteConfig.name;
export const SITE_TAGLINE = siteConfig.tagline;
export const SITE_URL = siteConfig.url;
export const GEO = siteConfig.geo;
export const CONTACT = siteConfig.contact;

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  og?: SiteOgImage;
};

export function buildOgImagePath(og: SiteOgImage): string {
  const params = new URLSearchParams({
    eyebrow: og.eyebrow,
    title: og.title,
    subtitle: og.subtitle,
    alt: og.alt,
  });
  if (og.footer) params.set("footer", og.footer);
  return `/api/og?${params.toString()}`;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  keywords = [...siteConfig.keywords],
  noIndex = false,
  og,
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline} in Monaco`;
  const url = new URL(path, siteConfig.url).toString();
  const ogImage = og ?? getPageByPath(path).og;
  const imageUrl = buildOgImagePath(ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    other: {
      "geo.region": siteConfig.geo.country,
      "geo.placename": siteConfig.geo.locality,
      "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    },
  };
}

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRental", "LocalBusiness"],
    name: siteConfig.name,
    description:
      "Ultra-luxury hypercar and supercar rentals in Monaco and the French Riviera.",
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.geo.streetAddress,
      addressLocality: siteConfig.geo.locality,
      postalCode: siteConfig.geo.postalCode,
      addressCountry: siteConfig.geo.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.geo.areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    priceRange: "€€€€",
    currenciesAccepted: "EUR",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "22:00",
    },
  };
}
