import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  formatPrice,
  generateRatingBreakdown,
  getProductById,
  getRelatedProducts,
} from "../data/products";
import { useShop } from "../state/shop/ShopContext";
import { Button } from "../components/ui/Button";
import { RatingStars } from "../components/ui/RatingStars";
import { ProductCard } from "../components/products/ProductCard";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = id ? getProductById(id) : null;
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const [activeImg, setActiveImg] = useState(0);

  const related = useMemo(() => (id ? getRelatedProducts(id, 3) : []), [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-lg font-semibold">Product not found</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            The product you're looking for doesn't exist.
          </p>
          <Link to="/shop" className="mt-5 inline-block text-sm font-semibold text-sky-600 hover:underline">
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const breakdown = generateRatingBreakdown(product.rating);

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-sm text-slate-500 dark:text-slate-400">
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>{product.category}</span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <img
                src={product.images[activeImg] || product.image}
                alt={product.title}
                className="h-[360px] w-full object-cover md:h-[420px]"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.images.slice(0, 3).map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImg(idx)}
                  className={`overflow-hidden rounded-2xl border shadow-sm transition ${
                    idx === activeImg
                      ? "border-sky-500"
                      : "border-slate-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800"
                  }`}
                >
                  <img src={img} alt="" className="h-24 w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight">{product.title}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-2xl font-semibold text-slate-900 dark:text-white">
                  {formatPrice(product.price)}
                </div>
                {product.badges?.map((b) => (
                  <span
                    key={b}
                    className="rounded-2xl bg-slate-900 px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <RatingStars rating={product.rating} />
                <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  ({product.ratingCount} ratings)
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button size="lg" onClick={() => addToCart(product.id, 1)}>
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => toggleWishlist(product.id)}
              >
                {wished ? "Saved" : "Save to Wishlist"}
              </Button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-sm font-semibold">Product Specs</div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.specs.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {s.label}
                    </div>
                    <div className="text-sm font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">Customer Reviews</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Verified purchases</div>
                </div>
                <Link to="/contact" className="text-sm font-semibold text-sky-600 hover:underline">
                  Need help?
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((n) => {
                    const key = n === 5 ? "five" : n === 4 ? "four" : n === 3 ? "three" : n === 2 ? "two" : "one";
                    const pct = (breakdown as any)[key] as number;
                    return (
                      <div key={n} className="flex items-center gap-3">
                        <div className="w-12 text-xs font-semibold text-slate-600 dark:text-slate-300">
                          {n}★
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                          <div className="h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="w-10 text-right text-xs text-slate-500 dark:text-slate-400">
                          {pct}%
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{r.date}</div>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <RatingStars rating={r.rating} />
                        <div className="text-sm font-semibold">{r.title}</div>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Related Products</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">More you might love</p>
            </div>
            <Link to="/shop" className="text-sm font-semibold text-sky-600 hover:underline">
              Shop all
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
