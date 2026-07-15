"use client";

import { useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

const MARQUEE_TEXT = "MOROCCO — CASABLANCA — EXCLUSIVITY — VELOCITY — STARADA — ";

export function BrandMarquee() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track || prefersReducedMotion()) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      gsap.to(tween, {
        timeScale: 2.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden border-y border-gold/10 py-10 md:py-14" aria-hidden>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="font-display pr-4 text-5xl tracking-[0.08em] text-transparent uppercase md:text-7xl lg:text-8xl"
            style={{
              WebkitTextStroke: "1px rgba(201, 169, 98, 0.35)",
            }}
          >
            {MARQUEE_TEXT}
            {MARQUEE_TEXT}
          </p>
        ))}
      </div>
    </section>
  );
}
