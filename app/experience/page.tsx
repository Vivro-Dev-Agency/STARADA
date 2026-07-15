import type { Metadata } from "next";

import { BrandMarquee } from "@/components/experience/brand-marquee";
import { StorySection } from "@/components/experience/story-section";
import { ValuesGrid } from "@/components/experience/values-grid";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description:
    "Discover the STARADA ritual — private briefing, white-glove delivery, and curated Riviera routes. Discretion, precision, and exclusivity in Monaco.",
  path: "/experience",
  keywords: [
    "luxury car experience Monaco",
    "white glove hypercar delivery",
    "French Riviera supercar concierge",
    "exclusive car hire Monte Carlo",
  ],
});

export default function ExperiencePage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section-padding pb-12!">
        <div className="container-luxury max-w-3xl">
          <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">
            The Brand
          </p>
          <h1 className="font-display text-5xl text-champagne md:text-6xl lg:text-7xl">
            An experience beyond the drive
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-champagne/70">
            STARADA was founded for guests who expect hospitality at the same
            altitude as the machines they drive. Every detail — from briefing to
            return — is choreographed with quiet precision.
          </p>
        </div>
      </section>
      <BrandMarquee />
      <StorySection />
      <ValuesGrid />
      <ContactCta />
    </div>
  );
}
