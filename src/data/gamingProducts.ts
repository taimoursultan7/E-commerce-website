import type { Product } from "./products";

export const gamingProducts: Product[] = [
  {
    id: "p-6001",
    title: "NovaStrike RGB Mechanical Keyboard",
    description:
      "Hot‑swappable mechanical keyboard with per‑key RGB, aluminum top plate, and smooth stabilizers.",
    category: "Gaming",
    price: 119.99,
    rating: 4.6,
    ratingCount: 2841,
    image: "/images/novastrike-keyboard-1.png",
    images: [
      "/images/novastrike-keyboard-1.png",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "/images/novastrike-keyboard-3.png",
    ],
    badges: ["Gaming", "RGB"],
    specs: [
      { label: "Switches", value: "Hot‑swappable" },
      { label: "Layout", value: "TKL" },
      { label: "Frame", value: "Aluminum" },
      { label: "Lighting", value: "Per‑key RGB" },
    ],
    reviews: [
      {
        id: "gr1",
        name: "Ayaan",
        rating: 5,
        date: "2026-04-02",
        title: "Crisp typing & clean RGB",
        comment: "Stabilizers feel premium and the RGB is bright without being harsh.",
      },
    ],
    featured: true,
  },
  {
    id: "p-6002",
    title: "HyperGlide Pro Gaming Mouse",
    description:
      "Ultra‑light 59g mouse with a high‑precision sensor, PTFE skates, and ergonomic shell.",
    category: "Gaming",
    price: 59.99,
    rating: 4.5,
    ratingCount: 6430,
    image:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80",
      "/images/hyperglide-mouse-3.png",
    ],
    badges: ["Esports"],
    specs: [
      { label: "Weight", value: "59g" },
      { label: "Sensor", value: "26K DPI" },
      { label: "Feet", value: "PTFE" },
      { label: "Cable", value: "Paracord" },
    ],
    reviews: [
      {
        id: "gr2",
        name: "Zara",
        rating: 5,
        date: "2026-01-28",
        title: "So light, so fast",
        comment: "Tracking is perfect and it glides effortlessly. Great for FPS.",
      },
    ],
    featured: false,
  },
  {
    id: "p-6003",
    title: "ApexWave Wireless Controller",
    description:
      "Low‑latency wireless controller with hall‑effect sticks, textured grips, and turbo mode.",
    category: "Gaming",
    price: 69.99,
    rating: 4.4,
    ratingCount: 1984,
    image: "/images/apexwave-controller-1.png",
    images: [
      "/images/apexwave-controller-1.png",
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1200&q=80",
    ],
    badges: ["Hall Effect"],
    specs: [
      { label: "Latency", value: "Low" },
      { label: "Sticks", value: "Hall‑effect" },
      { label: "Battery", value: "20 hours" },
      { label: "Platform", value: "PC / Mobile" },
    ],
    reviews: [
      {
        id: "gr3",
        name: "Bilal",
        rating: 4,
        date: "2026-03-19",
        title: "Great sticks",
        comment: "Hall-effect sticks feel consistent. Buttons are satisfying.",
      },
    ],
    featured: true,
  },
];
