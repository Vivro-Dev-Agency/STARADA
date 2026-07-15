import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";

const { contact: CONTACT, geo: GEO, name: SITE_NAME } = siteConfig;

const footerLinks = [
  { href: "/fleet", label: "Fleet" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/15 bg-obsidian">
      <div className="container-luxury section-padding py-16!">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="font-display text-2xl tracking-[0.2em] text-champagne uppercase">
              {SITE_NAME}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ultra-luxury hypercar experiences across Monaco and the French Riviera. Discretion, precision, exclusivity.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Navigate</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-champagne/70 transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Concierge</p>
            <div className="flex flex-col gap-2 text-sm text-champagne/70">
              <p>
                {GEO.streetAddress}
                <br />
                {GEO.postalCode} {GEO.locality}
              </p>
              <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-gold">
                {CONTACT.email}
              </a>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-gold">
                {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-gold/10" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs tracking-wide text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs tracking-wide text-muted-foreground">
            Crafted by{" "}
            <a
              href="https://youssef.vivro.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Youssef Aboulkaram
            </a>{" "}
            &{" "}
            <a
              href="https://vivro.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-champagne/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              VIVRO Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
