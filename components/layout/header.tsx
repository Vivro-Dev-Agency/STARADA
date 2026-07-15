"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-gold/15 bg-obsidian/90 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container-luxury flex h-16 items-center justify-between px-6 md:h-20 md:px-10 lg:px-16">
        <Link
          href="/"
          className="font-display text-xl tracking-[0.2em] text-champagne uppercase transition-colors hover:text-gold md:text-2xl"
        >
          STARADA
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs tracking-[0.18em] uppercase transition-colors",
                pathname === link.href ? "text-gold" : "text-champagne/70 hover:text-gold",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm" className="bg-gold text-obsidian hover:bg-gold/90 tracking-wider uppercase">
            <Link href="/contact">Inquire</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-champagne hover:bg-gold/10 hover:text-gold md:hidden"
              aria-label="Open menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-gold/15 bg-obsidian text-champagne">
            <SheetHeader>
              <SheetTitle className="font-display text-left text-2xl tracking-[0.2em] text-gold uppercase">STARADA</SheetTitle>
            </SheetHeader>
            <nav className="mt-10 flex flex-col gap-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-display text-2xl tracking-wide transition-colors",
                    pathname === link.href ? "text-gold" : "text-champagne/80 hover:text-gold",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-gold text-obsidian hover:bg-gold/90 tracking-wider uppercase">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Private Inquiry
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
