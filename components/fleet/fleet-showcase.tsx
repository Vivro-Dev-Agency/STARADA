"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { VehicleCard } from "@/components/fleet/vehicle-card";
import { Button } from "@/components/ui/button";
import { fleet } from "@/lib/fleet-data";
import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

registerGsap();

type FleetShowcaseProps = {
  title?: string;
  subtitle?: string;
};

export function FleetShowcase({
  title = "The Fleet",
  subtitle = "Six extraordinary machines. One uncompromising standard.",
}: FleetShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(fleet.length - 1);

  const getRawX = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const card = track.children[index] as HTMLElement | undefined;
    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!card || !firstCard) return 0;

    return firstCard.offsetLeft - card.offsetLeft;
  }, []);

  const getMinX = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return 0;

    return Math.min(0, viewport.clientWidth - track.scrollWidth);
  }, []);

  const getMaxIndex = useCallback(() => {
    const minX = getMinX();

    for (let i = 0; i < fleet.length; i++) {
      if (getRawX(i) <= minX + 0.5) return i;
    }

    return fleet.length - 1;
  }, [getMinX, getRawX]);

  const goTo = useCallback(
    (index: number) => {
      const limit = getMaxIndex();
      setMaxIndex(limit);

      const next = Math.max(0, Math.min(limit, index));
      activeIndexRef.current = next;
      setActiveIndex(next);

      const track = trackRef.current;
      if (!track) return;

      const minX = getMinX();
      const x = Math.max(minX, getRawX(next));

      tweenRef.current?.kill();
      tweenRef.current = gsap.to(track, {
        x,
        duration: prefersReducedMotion() ? 0 : 0.7,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          tweenRef.current = null;
        },
      });
    },
    [getMaxIndex, getMinX, getRawX],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".fleet-heading", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: containerRef },
  );

  useEffect(() => {
    goTo(activeIndexRef.current);

    const onResize = () => goTo(activeIndexRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tweenRef.current?.kill();
    };
  }, [goTo]);

  return (
    <section ref={containerRef} className="overflow-hidden py-24 md:py-32">
      <div className="container-luxury px-6 md:px-10 lg:px-16">
        <div className="fleet-heading mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">Hypercar Collection</p>
            <h2 className="font-display text-4xl text-champagne md:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-4 max-w-lg text-champagne/60">{subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-gold/30 text-champagne hover:bg-gold/10 hover:text-gold"
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous vehicle"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-gold/30 text-champagne hover:bg-gold/10 hover:text-gold"
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex >= maxIndex}
              aria-label="Next vehicle"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div ref={viewportRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="relative flex w-max gap-6 px-6 pb-4 will-change-transform md:gap-8 md:px-10 lg:px-[max(4rem,calc((100vw-80rem)/2+4rem))]"
        >
          {fleet.map((vehicle, i) => (
            <div
              key={vehicle.slug}
              className={cn(
                "w-[85vw] shrink-0 transition-[transform,opacity] duration-500 ease-out sm:w-[70vw] md:w-[520px] lg:w-[560px]",
                i === activeIndex ? "scale-100 opacity-100" : "scale-[0.97] opacity-75",
              )}
            >
              <VehicleCard vehicle={vehicle} active={i === activeIndex} />
            </div>
          ))}
        </div>
      </div>

      <div className="container-luxury mt-8 flex justify-center gap-2 px-6 md:px-10 lg:px-16">
        {fleet.slice(0, maxIndex + 1).map((vehicle, i) => (
          <button
            key={vehicle.slug}
            type="button"
            aria-label={`Go to ${vehicle.brand} ${vehicle.name}`}
            onClick={() => goTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-8 bg-gold" : "w-1.5 bg-gold/30 hover:bg-gold/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}
