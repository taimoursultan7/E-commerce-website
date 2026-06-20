import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight">About ShopSphere</h1>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              ShopSphere is a production-grade e-commerce front-end demo built with React, Tailwind,
              Router, Context API, and Framer Motion. It showcases modern UI patterns: sticky navigation,
              fast product discovery, wishlist, cart, and a secure checkout flow.
            </p>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The app is optimized for performance with lazy-loaded routes, skeleton loading states, and
              responsive layouts from mobile to desktop.
            </p>
            <div className="flex gap-3 pt-2">
              <Link to="/shop">
                <Button>Browse Shop</Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary">Contact</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { t: "Modern UI", d: "Shopify-style cards, premium typography, smooth transitions." },
                { t: "Fast", d: "Route-based code splitting, lightweight state management." },
                { t: "Accessible", d: "Semantic HTML, sensible focus states, responsive design." },
                { t: "Extensible", d: "Reusable components and clean folder structure." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-950">
                  <div className="text-sm font-semibold">{x.t}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-300">{x.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
