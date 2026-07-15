import { CinematicHero } from "@/components/home/cinematic-hero";
import { ContactCta } from "@/components/home/contact-cta";
import { ExperienceTeaser } from "@/components/home/experience-teaser";
import { FleetPreview } from "@/components/home/fleet-preview";
import { BrandMarquee } from "@/components/experience/brand-marquee";

export default function HomePage() {
  return (
    <>
      <CinematicHero />
      <BrandMarquee />
      <FleetPreview />
      <ExperienceTeaser />
      <ContactCta />
    </>
  );
}
