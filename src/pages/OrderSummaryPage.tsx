import { Link, useLocation } from "react-router-dom";

import { useShop } from "../state/shop/ShopContext";
import { formatPrice } from "../data/products";
import { Button } from "../components/ui/Button";

export default function OrderSummaryPage() {
  const { state } = useLocation() as { state?: { orderId?: string } };
  const { orders } = useShop();

  const order = state?.orderId ? orders.find((o) => o.id === state.orderId) : orders[0];

  if (!order) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-lg font-semibold">No order found</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Place an order to see the summary.
          </p>
          <Link to="/shop" className="mt-5 inline-block">
            <Button>Go to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-emerald-600">Order Confirmed</div>
              <h1 className="text-2xl font-semibold tracking-tight">Thanks for your purchase</h1>
              <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Order <span className="font-semibold">{order.id}</span> • {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-semibold dark:bg-slate-950/40">
              Status: {order.status}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="text-sm font-semibold">Shipping</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {order.shippingAddress.fullName}
                <br />
                {order.shippingAddress.address1}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.region} {order.shippingAddress.postalCode}
                <br />
                {order.shippingAddress.country}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Payment</div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Card •••• {order.payment.last4}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold">Items</div>
            <div className="mt-3 space-y-3">
              {order.items.map((it) => (
                <div key={it.product.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/40">
                  <img src={it.product.image} alt={it.product.title} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{it.product.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Qty {it.qty}</div>
                  </div>
                  <div className="text-sm font-semibold">{formatPrice(it.product.price * it.qty)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
            <div className="space-y-1 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.subtotal)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Shipping</div>
                <div className="font-semibold text-slate-900 dark:text-white">{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Tax</div>
                <div className="font-semibold text-slate-900 dark:text-white">{formatPrice(order.tax)}</div>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-base font-semibold dark:bg-slate-950/40">
              <div>Total</div>
              <div>{formatPrice(order.total)}</div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/dashboard" className="flex-1">
              <Button className="w-full" variant="secondary">
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/shop" className="flex-1">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
