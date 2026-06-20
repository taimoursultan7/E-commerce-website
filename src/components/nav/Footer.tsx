import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-semibold">ShopSphere</div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A premium demo store with modern UX, fast search, filters, wishlist, and a secure checkout
            flow.
          </p>
          
          <div className="flex items-center gap-2">
            {[
              { label: "X", href: "https://x.com" },
              {
                label: "Instagram",
                href: "https://www.instagram.com/dxkhan_7?igsh=ajRmc2sweWIwYXI=",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.4 2H7.8A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.6-2.4a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                  </svg>
                ),
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/taimour-sultan-/",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.4v1.56h.05c.47-.9 1.63-1.86 3.35-1.86 3.58 0 4.24 2.36 4.24 5.43v6.32ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0Z" />
                  </svg>
                ),
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/923490799233",
                icon: (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M20.52 3.48A11.85 11.85 0 0 0 12.06 0C5.52 0 .22 5.3.22 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.77a11.8 11.8 0 0 0 5.66 1.44h.01c6.54 0 11.84-5.3 11.84-11.83 0-3.16-1.23-6.13-3.39-8.36ZM12.07 21.6h-.01a9.86 9.86 0 0 1-5.04-1.39l-.36-.22-3.8 1.05 1.02-3.7-.24-.38a9.84 9.84 0 0 1-1.5-5.22C2.14 6.38 6.61 1.9 12.06 1.9c2.63 0 5.1 1.02 6.96 2.88a9.78 9.78 0 0 1 2.88 6.95c0 5.45-4.48 9.87-9.83 9.87Zm5.72-7.39c-.31-.16-1.86-.92-2.15-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.19.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.55-1.83-1.73-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.97-2.36-.26-.62-.52-.54-.71-.55h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.39 5.37 4.75.75.32 1.33.51 1.78.65.75.24 1.43.21 1.97.13.6-.09 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.6-.37Z" />
                  </svg>
                ),
              },

            ].map((s: any) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
className="rounded-xl border border-[#D3D4C0] bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-[#D3D4C0]/40 dark:bg-slate-900 dark:text-slate-100"
              >
                <span className="inline-flex items-center gap-2">
                  {s.icon ? s.icon : null}
                  <span>{s.label}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Shop</div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <Link className="hover:text-slate-900 dark:hover:text-white" to="/shop">
                All Products
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900 dark:hover:text-white" to="/faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900 dark:hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Company</div>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>
              <Link className="hover:text-slate-900 dark:hover:text-white" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-slate-900 dark:hover:text-white" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Newsletter</div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Get product drops, deals, and style updates. No spam.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <input
              type="email"
              placeholder="taimoursultan07@gmail.com"
              defaultValue="taimoursultan07@gmail.com"
              className="w-full bg-transparent px-3 py-2 text-sm outline-none"
            />
            <button className="rounded-xl bg-[#D3D4C0] px-3 py-2 text-sm font-semibold text-slate-900">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Logged in email: <span className="font-semibold">taimoursultan07@gmail.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} ShopSphere. All rights reserved.
      </div>
    </footer>
  );
}
