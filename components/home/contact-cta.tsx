import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const { contact: CONTACT } = siteConfig;

export function ContactCta() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <div className="border-subtle relative overflow-hidden bg-charcoal px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 0%, #c9a962 0%, transparent 55%)",
            }}
          />
          <p className="relative mb-4 text-xs tracking-[0.3em] text-gold uppercase">Private Concierge</p>
          <h2 className="relative font-display text-4xl text-champagne md:text-5xl lg:text-6xl">Begin your inquiry</h2>
          <p className="relative mx-auto mt-6 max-w-xl text-base text-champagne/70">
            Share your preferred dates and marque. Our team responds within the hour —{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-gold transition-colors hover:text-champagne">
              {CONTACT.email}
            </a>
          </p>
          <Button
            asChild
            size="lg"
            className="relative mt-10 h-12 bg-gold px-10 text-obsidian hover:bg-gold/90 tracking-[0.15em] uppercase"
          >
            <Link href="/contact">Request Availability</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
