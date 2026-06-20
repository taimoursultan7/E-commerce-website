import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { products, categories } from "../data/products";
import { ProductCard } from "../components/products/ProductCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
        <div className="absolute inset-0">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[56rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-fuchsia-500/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl"
            >
              Premium picks.
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #D3D4C0 0%, #D3D4C0 100%)",
                  textShadow: "0 0 18px rgba(211, 212, 192, 0.45)",
                }}
              >
                Modern shopping.
              </span>
            </motion.h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
              Discover curated products with a fast, Amazon-style layout and Shopify-grade polish: search,
              filters, wishlist, cart, and a secure checkout experience.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => toast.success("Subscribed — welcome to ShopSphere!")}
              >
                Join Newsletter
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-3">
              {[{ k: "Fast Delivery", v: "2–4 days" }, { k: "Secure", v: "Encrypted checkout" }, { k: "Support", v: "24/7" }].map(
                (x) => (
                  <div
                    key={x.k}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{x.k}</div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">{x.v}</div>
                  </div>
                )
              )}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="p-3">
                    <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Trending now</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-sky-500/30 to-indigo-500/30 blur-2xl" />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 md:py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Shop by Category</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Browse quickly with curated categories.</p>
          </div>
          <Link to="/shop" className="text-sm font-semibold text-sky-600 hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories
            .filter((c) => c !== "All")
            .map((c) => (
              <Link
                key={c}
                to={`/shop?category=${encodeURIComponent(c)}`}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{c}</div>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="M13 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Explore premium {c.toLowerCase()}.</p>
              </Link>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured Products</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Hand-picked best sellers and new arrivals.</p>
          </div>

          <div className="w-full max-w-md">
            <Input placeholder="Quick search (try: watch, serum, headphones…)" onChange={() => {}} />
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">Use full search + filters in Shop.</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
