import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../state/auth/AuthContext";
import { useShop } from "../state/shop/ShopContext";
import { Button } from "../components/ui/Button";
import { formatPrice } from "../data/products";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { orders, wishlist } = useShop();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-lg font-semibold">You're not signed in</div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Login to view your dashboard and order history.
          </p>
          <div className="mt-5 flex gap-3">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Welcome, {user.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => navigate("/shop")}>
              Shop
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="text-sm font-semibold">Account</div>
            <div className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
              <div>{user.email}</div>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-950/40">
              Wishlist items: <span className="font-semibold">{wishlist.size}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-sm font-semibold">Order History</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Your recent orders</div>
              </div>
              <Link to="/shop" className="text-sm font-semibold text-sky-600 hover:underline">
                Buy again
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-950/40 dark:text-slate-300">
                No orders yet. Place an order from the shop.
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold">{o.id}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(o.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <div className="text-slate-600 dark:text-slate-300">
                        {o.items.length} items • {o.status}
                      </div>
                      <div className="font-semibold">{formatPrice(o.total)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
