export type VehicleSpecs = {
  topSpeed: number;
  topSpeedUnit: string;
  horsepower: number;
  acceleration: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  brand: string;
  tagline: string;
  image: string;
  imageAlt: string;
  specs: VehicleSpecs;
  priceFrom: string;
  description: string;
};

export const fleet: Vehicle[] = [
  {
    slug: "bugatti-chiron-super-sport",
    name: "Chiron Super Sport",
    brand: "Bugatti",
    tagline: "The absolute pinnacle of velocity",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Bugatti Chiron Super Sport hypercar",
    specs: {
      topSpeed: 490,
      topSpeedUnit: "km/h",
      horsepower: 1578,
      acceleration: "2.4s",
    },
    priceFrom: "€18,500/day",
    description:
      "An engineering masterpiece reserved for those who demand the extraordinary. Delivered with white-glove care across Monaco and the Riviera.",
  },
  {
    slug: "lamborghini-revuelto",
    name: "Revuelto",
    brand: "Lamborghini",
    tagline: "Hybrid fury, sculpted in carbon",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Lamborghini Revuelto supercar",
    specs: {
      topSpeed: 350,
      topSpeedUnit: "km/h",
      horsepower: 1015,
      acceleration: "2.5s",
    },
    priceFrom: "€9,800/day",
    description: "The V12 hybrid flagship that redefines presence on the Corniche. Raw theatre meets precision engineering.",
  },
  {
    slug: "ferrari-sf90-stradale",
    name: "SF90 Stradale",
    brand: "Ferrari",
    tagline: "Prancing horse, electric soul",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Ferrari SF90 Stradale supercar",
    specs: {
      topSpeed: 340,
      topSpeedUnit: "km/h",
      horsepower: 986,
      acceleration: "2.5s",
    },
    priceFrom: "€8,500/day",
    description:
      "Ferrari's most powerful series production car — a plug-in hybrid that delivers uncompromising track DNA for coastal roads.",
  },
  {
    slug: "bmw-m4-competition",
    name: "M4 Competition",
    brand: "BMW",
    tagline: "Precision aggression, Bavarian craft",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "BMW M4 Competition coupe",
    specs: {
      topSpeed: 290,
      topSpeedUnit: "km/h",
      horsepower: 510,
      acceleration: "3.5s",
    },
    priceFrom: "€3,200/day",
    description:
      "The Competition package M4 — twin-turbo fury with track-honed chassis dynamics for mountain passes and coastal runs alike.",
  },
  {
    slug: "porsche-911-gt3-rs",
    name: "911 GT3 RS",
    brand: "Porsche",
    tagline: "Motorsport distilled",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Porsche 911 GT3 RS sports car",
    specs: {
      topSpeed: 312,
      topSpeedUnit: "km/h",
      horsepower: 518,
      acceleration: "3.2s",
    },
    priceFrom: "€4,900/day",
    description: "The most track-focused 911 ever offered for road use — precision, balance, and an unforgettable soundtrack.",
  },
  {
    slug: "rolls-royce-spectre",
    name: "Spectre",
    brand: "Rolls-Royce",
    tagline: "Silent grandeur, electric poise",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Rolls-Royce Spectre luxury electric coupe",
    specs: {
      topSpeed: 250,
      topSpeedUnit: "km/h",
      horsepower: 577,
      acceleration: "4.5s",
    },
    priceFrom: "€6,800/day",
    description: "The first fully electric Rolls-Royce. Whisper-quiet presence for evenings in Monte Carlo and beyond.",
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return fleet.find((v) => v.slug === slug);
}

export function getFeaturedFleet(count = 3): Vehicle[] {
  return fleet.slice(0, count);
}
