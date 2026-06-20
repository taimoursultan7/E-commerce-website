export type Category =
  | "All"
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Gaming";

export type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, "All">;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  images: string[];
  badges?: string[];
  specs: { label: string; value: string }[];
  reviews: Review[];
  featured?: boolean;
};

const r = (min: number, max: number) => Math.round((min + Math.random() * (max - min)) * 10) / 10;

import { gamingProducts } from "./gamingProducts";

export const products: Product[] = [
  {
    id: "p-1001",
    title: "AeroNoise Pro Wireless Headphones",
    description:
      "Premium over-ear wireless headphones with adaptive noise cancellation, spatial audio, and 40-hour battery life.",
    category: "Electronics",
    price: 199.99,
    rating: 4.7,
    ratingCount: 2384,
    image: "/images/aeronoise-pro-headphones.png",
    images: [
      "/images/aeronoise-pro-headphones.png",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Bestseller", "Free Shipping"],
    specs: [
      { label: "Battery", value: "Up to 40 hours" },
      { label: "ANC", value: "Adaptive" },
      { label: "Codec", value: "AAC / SBC" },
      { label: "Warranty", value: "2 years" },
    ],
    reviews: [
      {
        id: "r1",
        name: "Daniel",
        rating: 5,
        date: "2026-03-14",
        title: "Like a quiet studio",
        comment: "Noise cancellation is fantastic and the comfort is top-tier. Great for flights.",
      },
      {
        id: "r2",
        name: "Maya",
        rating: 4,
        date: "2026-02-02",
        title: "Amazing sound",
        comment: "Bass is tight and not muddy. App could be better, but overall excellent.",
      },
    ],
    featured: true,
  },
  {
    id: "p-1002",
    title: "LumenWatch S9 Smartwatch",
    description: "A sleek, health-first smartwatch with GPS, sleep tracking, and 10-day battery.",
    category: "Electronics",
    price: 149.0,
    rating: 4.4,
    ratingCount: 5119,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=1200&q=80",
      "/images/lumenwatch-s9-3.png",
    ],
    badges: ["New"],
    specs: [
      { label: "Battery", value: "Up to 10 days" },
      { label: "Water", value: "5 ATM" },
      { label: "GPS", value: "Dual-band" },
      { label: "Sensors", value: "HR, SpO2, Temp" },
    ],
    reviews: [
      {
        id: "r3",
        name: "Sofia",
        rating: 5,
        date: "2026-04-21",
        title: "Battery is unreal",
        comment: "I charge it once a week and it keeps going. Accurate fitness metrics too.",
      },
    ],
    featured: true,
  },
  {
    id: "p-2001",
    title: "SilkStreet Minimal Sneakers",
    description: "Clean, premium leather sneakers with cushioned insoles and durable outsole.",
    category: "Fashion",
    price: 89.99,
    rating: 4.6,
    ratingCount: 1890,
    image: "/images/silkstreet-minimal-sneakers.png",
    images: [
      "/images/silkstreet-minimal-sneakers.png",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Limited"],
    specs: [
      { label: "Upper", value: "Full-grain leather" },
      { label: "Insole", value: "Memory foam" },
      { label: "Fit", value: "True to size" },
      { label: "Care", value: "Wipe clean" },
    ],
    reviews: [
      {
        id: "r4",
        name: "Omar",
        rating: 5,
        date: "2026-01-09",
        title: "Everyday staple",
        comment: "Goes with everything. Comfortable out of the box. Great value.",
      },
    ],
    featured: true,
  },
  {
    id: "p-3001",
    title: "NordGlow Aroma Diffuser",
    description: "Ultra-quiet diffuser with soft ambient lighting and auto shut-off.",
    category: "Home",
    price: 39.99,
    rating: 4.3,
    ratingCount: 702,
    image:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1200&q=80",
      "/images/nordglow-diffuser-3.png",
    ],
    badges: ["Eco"],
    specs: [
      { label: "Capacity", value: "300ml" },
      { label: "Noise", value: "< 28 dB" },
      { label: "Timer", value: "1/3/6h" },
      { label: "Auto-off", value: "Yes" },
    ],
    reviews: [
      {
        id: "r5",
        name: "Hana",
        rating: 4,
        date: "2026-05-02",
        title: "Lovely at night",
        comment: "Light is cozy and it runs quietly. Wish the tank was slightly bigger.",
      },
    ],
    featured: false,
  },
  {
    id: "p-4001",
    title: "VelvetCloud Skin Serum",
    description: "Hydrating serum with niacinamide and peptides for a radiant look.",
    category: "Beauty",
    price: 29.0,
    rating: 4.5,
    ratingCount: 3321,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Top Rated"],
    specs: [
      { label: "Type", value: "All skin" },
      { label: "Key", value: "Niacinamide" },
      { label: "Size", value: "30ml" },
      { label: "Use", value: "AM/PM" },
    ],
    reviews: [
      {
        id: "r6",
        name: "Priya",
        rating: 5,
        date: "2026-02-18",
        title: "Glow in a bottle",
        comment: "Hydrates without being sticky. My skin looks brighter after two weeks.",
      },
    ],
    featured: true,
  },
  {
    id: "p-5001",
    title: "PulseFit Resistance Band Set",
    description: "5-band set with handles and door anchor. Great for home workouts.",
    category: "Sports",
    price: 24.99,
    rating: 4.2,
    ratingCount: 941,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
      "/images/pulsefit-bands-3.png",
    ],
    specs: [
      { label: "Levels", value: "5" },
      { label: "Material", value: "Latex" },
      { label: "Includes", value: "Handles + anchor" },
      { label: "Bag", value: "Yes" },
    ],
    reviews: [
      {
        id: "r7",
        name: "Leo",
        rating: 4,
        date: "2026-03-01",
        title: "Solid for the price",
        comment: "Good quality and lots of options. Handles could be softer.",
      },
    ],
    featured: false,
  },
  ...gamingProducts,
];

export const categories: Category[] = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
  "Gaming",
];

export const priceRange = {
  min: 0,
  max: 250,
};

export function getProductById(id: string) {
  return products.find((p) => p.id === id) || null;
}

export function getRelatedProducts(productId: string, count = 4) {
  const p = getProductById(productId);
  if (!p) return [];
  const rel = products
    .filter((x) => x.id !== productId && x.category === p.category)
    .slice(0, count);
  if (rel.length >= count) return rel;
  const fallback = products.filter((x) => x.id !== productId && x.category !== p.category);
  return rel.concat(fallback.slice(0, count - rel.length));
}

export function formatPrice(value: number) {
  return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export function generateRatingBreakdown(rating: number) {
  // Fake a breakdown that feels realistic.
  const five = Math.min(78, Math.max(10, Math.round(rating * 16)));
  const four = Math.round(r(10, 22));
  const three = Math.round(r(4, 12));
  const two = Math.round(r(2, 8));
  const one = Math.max(1, 100 - five - four - three - two);
  const total = five + four + three + two + one;
  return {
    five: Math.round((five / total) * 100),
    four: Math.round((four / total) * 100),
    three: Math.round((three / total) * 100),
    two: Math.round((two / total) * 100),
    one: Math.round((one / total) * 100),
  };
}
