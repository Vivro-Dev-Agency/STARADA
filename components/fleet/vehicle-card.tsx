"use client";

import Image from "next/image";
import { useState } from "react";

import { SpecCounter } from "@/components/fleet/spec-counter";
import { Skeleton } from "@/components/ui/skeleton";
import type { Vehicle } from "@/lib/fleet-data";
import { cn } from "@/lib/utils";

type VehicleCardProps = {
  vehicle: Vehicle;
  active?: boolean;
  className?: string;
  showCounters?: boolean;
};

export function VehicleCard({ vehicle, active = false, className, showCounters = true }: VehicleCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className={cn(
        "border-subtle flex h-full flex-col overflow-hidden bg-obsidian transition-all duration-500",
        active && "border-gold/50 shadow-[0_0_40px_-12px_rgba(201,169,98,0.35)]",
        className,
      )}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        {!imageLoaded && <Skeleton className="absolute inset-0 size-full rounded-none" aria-hidden />}
        <Image
          src={vehicle.image}
          alt={vehicle.imageAlt}
          fill
          className={cn(
            "object-cover opacity-0 transition-[opacity,transform] duration-700",
            imageLoaded && "opacity-100",
            active && "scale-105",
          )}
          sizes="(max-width: 768px) 90vw, 50vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-linear-to-t from-obsidian via-transparent to-transparent" />
        <span className="absolute top-4 left-4 border border-gold/40 bg-obsidian/70 px-3 py-1 text-[10px] tracking-[0.2em] text-gold uppercase backdrop-blur-sm">
          {vehicle.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div>
          <h3 className="font-display text-3xl text-champagne md:text-4xl">{vehicle.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{vehicle.tagline}</p>
        </div>

        {showCounters && (
          <div className="grid grid-cols-3 gap-4 border-y border-gold/10 py-5">
            <SpecCounter
              value={vehicle.specs.topSpeed}
              label="Top Speed"
              suffix={` ${vehicle.specs.topSpeedUnit}`}
              active={active}
            />
            <SpecCounter value={vehicle.specs.horsepower} label="Horsepower" suffix=" HP" active={active} />
            <div className="flex flex-col gap-1">
              <span className="font-display text-2xl text-champagne md:text-3xl">{vehicle.specs.acceleration}</span>
              <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">0–100 km/h</span>
            </div>
          </div>
        )}

        <p className="text-sm leading-relaxed text-champagne/60">{vehicle.description}</p>

        <p className="mt-auto pt-2 font-display text-xl text-gold">From {vehicle.priceFrom}</p>
      </div>
    </article>
  );
}
