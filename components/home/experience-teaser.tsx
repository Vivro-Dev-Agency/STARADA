import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function ExperienceTeaser() {
  return (
    <section className="section-padding">
      <div className="container-luxury grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-4/5 overflow-hidden md:aspect-3/4">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury coastal drive along the French Riviera"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-obsidian/60 to-transparent" />
          <p className="absolute bottom-8 left-8 font-display text-3xl text-champagne md:text-4xl">
            The Riviera,
            <br />
            <span className="text-gradient-gold">reimagined</span>
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">The Experience</p>
          <h2 className="font-display text-4xl leading-tight text-champagne md:text-5xl">
            Beyond rental.
            <br />A private ritual.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-champagne/70 md:text-lg">
            Every STARADA engagement begins with a dedicated concierge — itinerary design, hotel delivery, and seamless return.
            Your time on the road is uninterrupted; ours is invisible.
          </p>
          <ul className="mt-2 flex flex-col gap-4 text-sm text-champagne/80">
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              White-glove vehicle delivery
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Bespoke coastal & Alpine routes
            </li>
            <li className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              Absolute discretion guaranteed
            </li>
          </ul>
          <Button asChild className="mt-4 w-fit bg-gold text-obsidian hover:bg-gold/90 tracking-[0.15em] uppercase">
            <Link href="/experience">Discover the Ritual</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
