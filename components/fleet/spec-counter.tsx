"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type SpecCounterProps = {
  value: number;
  label: string;
  suffix?: string;
  active?: boolean;
};

export function SpecCounter({ value, label, suffix = "", active = true }: SpecCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const obj = useRef({ n: 0 });

  useGSAP(
    () => {
      if (!active || prefersReducedMotion()) {
        if (numberRef.current) {
          numberRef.current.textContent = `${value.toLocaleString()}${suffix}`;
        }
        return;
      }

      obj.current.n = 0;
      gsap.to(obj.current, {
        n: value,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = `${Math.round(obj.current.n).toLocaleString()}${suffix}`;
          }
        },
      });
    },
    { dependencies: [value, active, suffix], revertOnUpdate: true },
  );

  useEffect(() => {
    if (!active && numberRef.current) {
      numberRef.current.textContent = `${value.toLocaleString()}${suffix}`;
    }
  }, [active, value, suffix]);

  return (
    <div className="flex flex-col gap-1">
      <span ref={numberRef} className="font-display text-2xl text-champagne md:text-3xl">
        {value.toLocaleString()}
        {suffix}
      </span>
      <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</span>
    </div>
  );
}
