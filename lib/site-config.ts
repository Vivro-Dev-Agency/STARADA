export const siteConfig = {
  name: "STARADA",
  tagline: "Ultra-Luxury Hypercar Rentals in Morocco",
  description:
    "STARADA offers exclusive hypercar and supercar rentals in Morocco. White-glove delivery, concierge service, and the world's most coveted marques.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starada.com",
  locale: "en_MA",
  keywords: [
    "hypercar rental Morocco",
    "luxury car hire Morocco",
    "Bugatti rental Monaco",
    "Lamborghini hire Nice",
    "Ferrari rental Cannes",
    "supercar rental Tangier",
    "premium car rental Agadir",
    "exclusive hypercar experience Morocco",
    "white glove car delivery Morocco",
    "STARADA luxury rentals",
  ],
  contact: {
    email: "vivro.dev@gmail.com",
    phone: "+212 666 66 66 66",
    phoneDisplay: "+212 666 66 66 66",
  },
  geo: {
    locality: "Casablanca",
    region: "Morocco",
    country: "MA",
    countryName: "Morocco",
    postalCode: "20250",
    streetAddress: "Avenue des Spélugues, Casablanca, Morocco",
    latitude: 33.5586,
    longitude: -7.5796,
    areaServed: ["Morocco", "Casablanca", "Rabat", "Tangier", "Agadir"],
  },
  pages: {
    home: {
      path: "/",
      og: {
        alt: "STARADA — Ultra-Luxury Hypercar Rentals in Monaco",
        eyebrow: "STARADA",
        title: "Ultra-Luxury Hypercar Rentals in Morocco",
          subtitle: "Morocco · Casablanca",
        footer: "Discretion · Precision · Exclusivity · Morocco",
      },
    },
    fleet: {
      path: "/fleet",
      og: {
        alt: "STARADA Fleet — Hypercars in Morocco",
        eyebrow: "STARADA · FLEET",
        title: "Extraordinary Machines in Morocco",
        subtitle: "Bugatti · Lamborghini · Ferrari · BMW · Porsche · Rolls-Royce",
      },
    },
    experience: {
      path: "/experience",
      og: {
        alt: "STARADA Experience — Luxury Ritual in Morocco",
        eyebrow: "STARADA · EXPERIENCE",
        title: "Beyond rental. A private ritual. in Morocco",
        subtitle: "Morocco · Casablanca",
      },
    },
    contact: {
      path: "/contact",
      og: {
        alt: "Contact STARADA Concierge — Morocco",
        eyebrow: "STARADA · CONTACT",
        title: "Begin your inquiry",
        subtitle: "vivro.dev@gmail.com · Morocco",
      },
    },
  },
} as const;

export type SiteOgImage = {
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  footer?: string;
};

export type SitePageKey = keyof typeof siteConfig.pages;

export function getPageByPath(path: string): (typeof siteConfig.pages)[SitePageKey] {
  const normalized = path === "" ? "/" : path;
  const page = Object.values(siteConfig.pages).find((p) => p.path === normalized);
  return page ?? siteConfig.pages.home;
}
