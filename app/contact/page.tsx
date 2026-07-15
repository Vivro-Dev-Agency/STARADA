import type { Metadata } from "next";

import { InquiryForm } from "@/components/contact/inquiry-form";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

const { contact: CONTACT, geo: GEO } = siteConfig;

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Inquire about STARADA hypercar rentals in Monaco. Our private concierge responds within the hour — share your dates and preferred marque.",
  path: "/contact",
  keywords: [
    "hypercar rental inquiry Monaco",
    "luxury car hire contact Riviera",
    "STARADA concierge",
  ],
});

export default function ContactPage() {
  return (
    <div className="pt-20 md:pt-24">
      <section className="section-padding">
        <div className="container-luxury grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">
              Concierge Desk
            </p>
            <h1 className="font-display text-5xl text-champagne md:text-6xl">
              Private inquiry
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-champagne/70">
              Tell us when you wish to drive and which marque calls to you. We
              confirm availability and arrange delivery to your preferred
              address in Monaco or along the Riviera.
            </p>

            <div className="mt-12 flex flex-col gap-8 border-t border-gold/15 pt-10">
              <div>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">
                  Visit
                </p>
                <p className="mt-2 text-sm text-champagne/80">
                  {GEO.streetAddress}
                  <br />
                  {GEO.postalCode} {GEO.locality}, {GEO.countryName}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="mt-2 block text-sm text-champagne/80 transition-colors hover:text-gold"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.2em] text-gold uppercase">
                  Phone
                </p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  className="mt-2 block text-sm text-champagne/80 transition-colors hover:text-gold"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          <div className="border-subtle bg-charcoal p-8 md:p-10">
            <InquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
