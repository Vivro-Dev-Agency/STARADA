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
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const animatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCenteredOffset = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return 0;

    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return 0;

    return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(fleet.length - 1, index));
      setActiveIndex(next);

      const track = trackRef.current;
      if (!track) return;

      const offset = Math.max(0, getCenteredOffset(next));

      if (prefersReducedMotion()) {
        track.scrollLeft = offset;
        return;
      }

      tweenRef.current?.kill();
      animatingRef.current = true;
      track.style.scrollSnapType = "none";

      tweenRef.current = gsap.to(track, {
        scrollLeft: offset,
        duration: 0.75,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          animatingRef.current = false;
          track.style.scrollSnapType = "";
          tweenRef.current = null;
        },
      });
    },
    [getCenteredOffset],
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
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (event: WheelEvent) => {
      if (event.shiftKey) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      window.scrollBy({ top: event.deltaY });
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const onScroll = () => {
    if (animatingRef.current) return;

    const track = trackRef.current;
    if (!track) return;

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;

    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const mid = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });

    setActiveIndex((prev) => (prev === closest ? prev : closest));
  };

  return (
    <section ref={containerRef} className="section-padding overflow-hidden">
      <div className="container-luxury">
        <div className="fleet-heading mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">
              Hypercar Collection
            </p>
            <h2 className="font-display text-4xl text-champagne md:text-5xl lg:text-6xl">
              {title}
            </h2>
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
              disabled={activeIndex === fleet.length - 1}
              aria-label="Next vehicle"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="scrollbar-none flex snap-x snap-proximity gap-6 overflow-x-auto overscroll-x-contain px-6 pb-4 md:gap-8 md:px-10 lg:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]"
      >
        {fleet.map((vehicle, i) => (
          <div
            key={vehicle.slug}
            className={cn(
              "w-[85vw] shrink-0 snap-center transition-[transform,opacity] duration-500 ease-out will-change-transform sm:w-[70vw] md:w-[520px] lg:w-[560px]",
              i === activeIndex ? "scale-100 opacity-100" : "scale-[0.97] opacity-75",
            )}
          >
            <VehicleCard vehicle={vehicle} active={i === activeIndex} />
          </div>
        ))}
      </div>

      <div className="container-luxury mt-8 flex justify-center gap-2">
        {fleet.map((vehicle, i) => (
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
