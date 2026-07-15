const values = [
  {
    title: "Discretion",
    body: "NDAs available upon request. No press. No spectacle. Your journey remains yours alone.",
  },
  {
    title: "Precision",
    body: "Every vehicle is maintained to manufacturer standards. Delivery windows measured in minutes, not hours.",
  },
  {
    title: "Exclusivity",
    body: "A curated collection — never volume. Access is limited so each engagement receives undivided attention.",
  },
] as const;

export function ValuesGrid() {
  return (
    <section className="section-padding bg-charcoal">
      <div className="container-luxury">
        <p className="mb-3 text-xs tracking-[0.3em] text-gold uppercase">Principles</p>
        <h2 className="mb-14 font-display text-4xl text-champagne md:text-5xl">What we stand for</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="border-subtle flex flex-col gap-4 bg-obsidian p-8">
              <div className="h-px w-12 bg-gold" />
              <h3 className="font-display text-2xl text-champagne md:text-3xl">{value.title}</h3>
              <p className="text-sm leading-relaxed text-champagne/60">{value.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
