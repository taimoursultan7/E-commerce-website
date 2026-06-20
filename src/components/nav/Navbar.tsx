import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useShop } from "../../state/shop/ShopContext";
import { useUI } from "../../state/ui/UIContext";
import { useAuth } from "../../state/auth/AuthContext";
import { ThemeToggle } from "../ui/ThemeToggle";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-sky-500 px-1 text-[11px] font-semibold text-white">
      {children}
    </span>
  );
}

function IconButton({
  label,
  children,
  onClick,
  to,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
}) {
  const Comp: any = to ? Link : "button";
  const props = to ? { to } : { type: "button", onClick };
  return (
    <Comp
      aria-label={label}
      {...props}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
    >
      {children}
    </Comp>
  );
}

export function Navbar() {
  const { cartCount } = useShop();
  const { isMobileMenuOpen, setMobileMenuOpen } = useUI();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="group inline-flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#D3D4C0] text-slate-900 shadow-lg shadow-black/5 dark:shadow-none">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 7h12l-1 12H7L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
                ShopSphere
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Premium Store</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[{ to: "/", label: "Home" }, { to: "/shop", label: "Shop" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }, { to: "/faq", label: "FAQ" }].map(
              (l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              )
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              Search products
            </button>
          </div>

          <ThemeToggle />

          <IconButton label="Cart" to="/cart">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6h15l-1.5 9h-12L6 6Z" />
              <path d="M6 6 5 3H2" />
              <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
              <path d="M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            </svg>
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </IconButton>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {user.name}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-[#D3D4C0] px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden"
        >
          <div className="mx-auto max-w-6xl space-y-2 px-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {[{ to: "/", label: "Home" }, { to: "/shop", label: "Shop" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }, { to: "/faq", label: "FAQ" }, { to: "/cart", label: "Cart" }].map(
                (l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  >
                    {l.label}
                  </Link>
                )
              )}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/40">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold">
                    {user.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-xl bg-white px-3 py-2 text-sm font-medium shadow-sm dark:bg-slate-900"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-sky-600">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
