import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { products, formatPrice } from "../data/products";
import { useAuth } from "../state/auth/AuthContext";
import { useShop } from "../state/shop/ShopContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, cartSubtotal, placeOrder } = useShop();
  const navigate = useNavigate();

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
    .filter((x) => Boolean(x.product));

  const shipping = cartSubtotal > 120 ? 0 : lines.length ? 9.99 : 0;
  const tax = cartSubtotal * 0.08;
  const total = cartSubtotal + shipping + tax;

  const [form, setForm] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address1: "",
    city: "",
    region: "",
    postalCode: "",
    country: "United States",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const canCheckout = useMemo(() => lines.length > 0, [lines.length]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCheckout) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!form.fullName || !form.email || !form.address1 || !form.city || !form.postalCode) {
      toast.error("Please complete shipping details.");
      return;
    }
    if (form.cardNumber.replace(/\s/g, "").length < 12) {
      toast.error("Please enter a valid card number.");
      return;
    }

    const last4 = form.cardNumber.replace(/\s/g, "").slice(-4) || "0000";

    const order = placeOrder({
      items: lines.map((l) => ({ product: l.product, qty: l.qty })),
      subtotal: cartSubtotal,
      shipping,
      tax,
      total,
      shippingAddress: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address1: form.address1,
        city: form.city,
        region: form.region,
        postalCode: form.postalCode,
        country: form.country,
      },
      payment: { method: "Card", last4 },
    });

    navigate("/order-summary", { state: { orderId: order.id } });
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-lg font-semibold">Sign in required</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            For a secure checkout and order history, please login.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Create account</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Secure Checkout</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Your payment details are encrypted (demo).
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form onSubmit={onSubmit} className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-sm font-semibold">Shipping Information</div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  placeholder="Full name"
                />
                <Input
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email"
                />
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone"
                />
                <Input
                  value={form.country}
                  onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                  placeholder="Country"
                />
                <Input
                  className="md:col-span-2"
                  value={form.address1}
                  onChange={(e) => setForm((p) => ({ ...p, address1: e.target.value }))}
                  placeholder="Address"
                />
                <Input
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  placeholder="City"
                />
                <Input
                  value={form.region}
                  onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
                  placeholder="State/Region"
                />
                <Input
                  value={form.postalCode}
                  onChange={(e) => setForm((p) => ({ ...p, postalCode: e.target.value }))}
                  placeholder="Postal code"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="text-sm font-semibold">Payment</div>
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                <Input
                  className="md:col-span-2"
                  value={form.cardNumber}
                  onChange={(e) => setForm((p) => ({ ...p, cardNumber: e.target.value }))}
                  placeholder="Card number"
                />
                <Input
                  value={form.expiry}
                  onChange={(e) => setForm((p) => ({ ...p, expiry: e.target.value }))}
                  placeholder="MM/YY"
                />
                <Input
                  value={form.cvc}
                  onChange={(e) => setForm((p) => ({ ...p, cvc: e.target.value }))}
                  placeholder="CVC"
                />
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Demo payments only. Do not enter real card details.
              </div>
            </div>

            <Button size="lg" className="w-full" type="submit">
              Place Order
            </Button>
          </form>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-lg font-semibold">Order Summary</div>
            <div className="mt-4 space-y-3">
              {lines.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.image} alt={product.title} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="line-clamp-1 text-sm font-semibold">{product.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Qty {qty}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(product.price * qty)}</div>
                </div>
              ))}
            </div>
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
            <Link to="/cart" className="mt-5 block">
              <Button variant="secondary" className="w-full">
                Edit Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
