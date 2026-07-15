"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { fleet } from "@/lib/fleet-data";

registerGsap();

const heroVehicle = fleet[0];

export function CinematicHero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".hero-word", ".hero-sub", ".hero-cta", ".hero-image", ".hero-meta"], {
          clearProps: "all",
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
        return;
      }

      gsap.set([".hero-word", ".hero-sub", ".hero-cta", ".hero-image", ".hero-meta"], {
        autoAlpha: 0,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-word",
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.1, stagger: 0.12, immediateRender: false },
      )
        .fromTo(
          ".hero-sub",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, immediateRender: false },
          "-=0.55",
        )
        .fromTo(
          ".hero-image",
          { scale: 1.15, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.4, ease: "power2.out", immediateRender: false },
          "-=1.1",
        )
        .fromTo(
          ".hero-meta",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, immediateRender: false },
          "-=0.7",
        )
        .fromTo(
          ".hero-cta",
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, immediateRender: false },
          "-=0.45",
        );

      gsap.to(".hero-image", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh items-end overflow-x-clip pb-20 pt-32 md:min-h-screen md:items-center md:pb-0 md:pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-image absolute inset-0 scale-105">
          <Image
            src={heroVehicle.image}
            alt={heroVehicle.imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-obsidian via-obsidian/80 to-obsidian/30" />
        <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-obsidian/50" />
      </div>

      <div className="container-luxury relative z-10 px-6 md:px-10 lg:px-16">
        <div className="max-w-3xl">
          <p className="hero-meta mb-6 text-xs tracking-[0.3em] text-gold uppercase">Morocco · Casablanca</p>

          <h1 className="font-display text-5xl leading-[0.95] text-champagne md:text-7xl lg:text-8xl">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Drive the</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word text-gradient-gold inline-block">Extraordinary</span>
            </span>
          </h1>

          <p className="hero-sub mt-6 max-w-lg text-base leading-relaxed text-champagne/70 md:text-lg">
            Private hypercar experiences curated for discerning clients. From Tangier to Agadir — white-glove delivery,
            absolute discretion.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 bg-gold px-8 tracking-[0.15em] text-obsidian uppercase hover:bg-gold/90"
            >
              <Link href="/fleet">Explore Fleet</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-gold/40 bg-transparent px-8 tracking-[0.15em] text-champagne uppercase hover:bg-gold/10 hover:text-gold"
            >
              <Link href="/contact">Private Inquiry</Link>
            </Button>
          </div>

          <div className="hero-meta mt-14 flex flex-wrap gap-8 border-t border-gold/15 py-8 md:gap-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Collection</p>
              <p className="mt-1 font-display text-2xl text-champagne">{fleet.length} Marques</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">From</p>
              <p className="mt-1 font-display text-2xl text-champagne">€4,900/day</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Service</p>
              <p className="mt-1 font-display text-2xl text-champagne">24/7 Concierge</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
