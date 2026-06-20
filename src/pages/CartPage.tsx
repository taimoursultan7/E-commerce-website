import { Link, useNavigate } from "react-router-dom";

import { products, formatPrice } from "../data/products";
import { useShop } from "../state/shop/ShopContext";
import { Button } from "../components/ui/Button";

export default function CartPage() {
  const { cart, setQty, removeFromCart, cartSubtotal, clearCart } = useShop();
  const navigate = useNavigate();

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
    .filter((x) => Boolean(x.product));

  const shipping = cartSubtotal > 120 ? 0 : lines.length ? 9.99 : 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Cart</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Review items and adjust quantities.</p>
          </div>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-semibold text-rose-600 hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {lines.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-lg font-semibold">Your cart is empty</div>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Browse products and add your favorites.
            </p>
            <Link to="/shop" className="mt-5 inline-block">
              <Button>Go to Shop</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {lines.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-28 w-full rounded-2xl object-cover sm:w-36"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`} className="text-sm font-semibold hover:underline">
                      {product.title}
                    </Link>
                    <div className="mt-1 text-sm font-semibold">{formatPrice(product.price)}</div>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-950">
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <div className="w-10 text-center text-sm font-semibold">{qty}</div>
                      <button
                        type="button"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="text-sm font-semibold">
                      {formatPrice(product.price * qty)}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm font-semibold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-lg font-semibold">Order Summary</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="text-slate-600 dark:text-slate-300">Subtotal</div>
                  <div className="font-semibold">{formatPrice(cartSubtotal)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-slate-600 dark:text-slate-300">Shipping</div>
                  <div className="font-semibold">{shipping === 0 ? "Free" : formatPrice(shipping)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-slate-600 dark:text-slate-300">Tax</div>
                  <div className="font-semibold">{formatPrice(tax)}</div>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-800" />
                <div className="flex items-center justify-between text-base">
                  <div className="font-semibold">Total</div>
                  <div className="font-semibold">{formatPrice(total)}</div>
                </div>
              </div>

              <Button className="mt-5 w-full" size="lg" onClick={() => navigate("/checkout")}>
                Proceed to Checkout
              </Button>
              <Link to="/shop" className="mt-3 block">
                <Button className="w-full" variant="secondary">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
