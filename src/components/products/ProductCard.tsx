import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import type { Product } from "../../data/products";
import { formatPrice } from "../../data/products";
import { useShop } from "../../state/shop/ShopContext";
import { RatingStars } from "../ui/RatingStars";
import { Button } from "../ui/Button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useShop();
  const wished = isWishlisted(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.03] md:h-56"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:scale-105 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200"
          aria-label="Toggle wishlist"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 ${wished ? "text-rose-500" : "text-slate-700 dark:text-slate-200"}`}
            fill={wished ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 21s-7-4.6-9.5-9A5.8 5.8 0 0 1 12 5.3 5.8 5.8 0 0 1 21.5 12C19 16.4 12 21 12 21Z" />
          </svg>
        </button>
        {product.badges?.[0] && (
          <div className="absolute left-3 top-3 rounded-2xl bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur dark:bg-white/10">
            {product.badges[0]}
          </div>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <Link to={`/product/${product.id}`} className="line-clamp-1 text-sm font-semibold text-slate-900 dark:text-white">
            {product.title}
          </Link>
          <div className="flex items-center justify-between">
            <div className="text-base font-semibold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </div>
            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} />
              <span className="text-xs text-slate-500 dark:text-slate-400">({product.ratingCount})</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button className="flex-1" onClick={() => addToCart(product.id, 1)}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12L6 6Z" />
              <path d="M6 6 5 3H2" />
            </svg>
            Add to Cart
          </Button>
          <Link
            to={`/product/${product.id}`}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
