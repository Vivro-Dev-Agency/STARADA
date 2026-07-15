import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Private Briefing",
    body: "Share your dates, preferred marques, and itinerary. A dedicated advisor crafts a tailored proposal within the hour.",
  },
  {
    number: "02",
    title: "White-Glove Delivery",
    body: "Your vehicle arrives at your hotel, villa, or yacht berth — detailed, fueled, and ready. Keys presented with ceremony, not paperwork.",
  },
  {
    number: "03",
    title: "The Road Ahead",
    body: "From the Moyenne Corniche to Cap Ferrat — curated routes, optional chauffeur, and 24/7 roadside concierge.",
  },
] as const;

export function StorySection() {
  return (
    <section className="section-padding">
      <div className="container-luxury">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">Our Ritual</p>
          <h2 className="font-display text-4xl text-champagne md:text-5xl lg:text-6xl">Designed for those who expect more</h2>
          <p className="mt-6 text-base leading-relaxed text-champagne/70 md:text-lg">
            STARADA exists at the intersection of engineering excellence and hospitality. We do not rent cars — we orchestrate
            moments of absolute freedom along the Côte d&apos;Azur.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden md:aspect-5/4">
            <Image
              src="https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury hypercar on a coastal road at dusk"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <ol className="flex flex-col justify-center gap-10">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-6">
                <span className="font-display text-3xl text-gold/50">{step.number}</span>
                <div>
                  <h3 className="font-display text-2xl text-champagne">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-champagne/60">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
