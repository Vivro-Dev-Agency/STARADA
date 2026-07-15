import type { Metadata } from "next";

import { FleetShowcase } from "@/components/fleet/fleet-showcase";
import { ContactCta } from "@/components/home/contact-cta";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Fleet",
  description:
    "Explore STARADA's curated hypercar fleet in Monaco — Bugatti, Lamborghini, Ferrari, BMW, Porsche, and Rolls-Royce. Exclusive daily rentals on the French Riviera.",
  path: "/fleet",
  keywords: [
    "Bugatti rental Monaco",
    "Lamborghini hire French Riviera",
    "Ferrari rental Monte Carlo",
    "BMW M4 Competition hire Cannes",
    "Porsche GT3 RS hire Nice",
    "Rolls-Royce Spectre rental Monaco",
  ],
});

export default function FleetPage() {
  return (
    <div className="pt-20 md:pt-24">
      <FleetShowcase
        title="Extraordinary Machines"
        subtitle="Each vehicle is prepared to the highest standard and delivered with white-glove care across Monaco and the Riviera."
      />
      <ContactCta />
    </div>
  );
}
