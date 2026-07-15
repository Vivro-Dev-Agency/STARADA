"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { getFeaturedFleet } from "@/lib/fleet-data";

registerGsap();

export function FleetPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const vehicles = getFeaturedFleet(3);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".preview-card", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="section-padding bg-charcoal">
      <div className="container-luxury">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">The Collection</p>
            <h2 className="font-display text-4xl text-champagne md:text-5xl lg:text-6xl">Icons of the Riviera</h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-gold/40 text-champagne hover:bg-gold/10 hover:text-gold tracking-wider uppercase"
          >
            <Link href="/fleet">View Full Fleet</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {vehicles.map((vehicle) => (
            <Link
              key={vehicle.slug}
              href="/fleet"
              className="preview-card group border-subtle overflow-hidden bg-obsidian transition-colors hover:border-gold/40"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-obsidian/80 to-transparent" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <p className="text-xs tracking-[0.2em] text-gold uppercase">{vehicle.brand}</p>
                <h3 className="font-display text-2xl text-champagne">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vehicle.specs.horsepower.toLocaleString()} HP · {vehicle.specs.topSpeed} {vehicle.specs.topSpeedUnit}
                </p>
                <p className="mt-2 text-sm text-champagne/80">{vehicle.priceFrom}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
