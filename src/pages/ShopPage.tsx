import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { categories, priceRange, products, type Category } from "../data/products";
import { Input } from "../components/ui/Input";
import { ProductCard } from "../components/products/ProductCard";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ShopPage() {
  const q = useQuery();
  const navigate = useNavigate();

  const [search, setSearch] = useState(q.get("q") ?? "");
  const [category, setCategory] = useState<Category>((q.get("category") as Category) ?? "All");
  const [maxPrice, setMaxPrice] = useState(Number(q.get("max")) || priceRange.max);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    if (category && category !== "All") params.set("category", category);
    if (maxPrice !== priceRange.max) params.set("max", String(maxPrice));
    navigate({ pathname: "/shop", search: params.toString() }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category, maxPrice]);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return products
      .filter((p) => (category === "All" ? true : p.category === category))
      .filter((p) => p.price <= maxPrice)
      .filter((p) =>
        !s
          ? true
          : `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(s)
      );
  }, [search, category, maxPrice]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Shop</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Search products, filter by category, and cap by price.
            </p>
          </div>

          <div className="grid w-full gap-3 md:max-w-2xl md:grid-cols-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
            />
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Max Price</div>
                <div className="text-sm font-semibold">${maxPrice}</div>
              </div>
              <input
                type="range"
                min={priceRange.min}
                max={priceRange.max}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full accent-sky-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            Showing <span className="font-semibold">{filtered.length}</span> products
          </div>
        </div>

        <motion.div layout className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
