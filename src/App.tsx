import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AppProviders } from "./providers/AppProviders";
import { AppShell } from "./components/layout/AppShell";
import { ScrollToTop } from "./components/seo/ScrollToTop";
import { PageSkeleton } from "./components/ui/PageSkeleton";

const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderSummaryPage = lazy(() => import("./pages/OrderSummaryPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));

export default function App() {
  // Initialize theme early to avoid flash.
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    const shouldDark = stored ? stored === "dark" : Boolean(prefersDark);
    document.documentElement.classList.toggle("dark", shouldDark);
  }, []);

  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            style: {
              borderRadius: "14px",
              background: "var(--toast-bg)",
              color: "var(--toast-fg)",
              border: "1px solid var(--toast-border)",
            },
          }}
        />

        <AppShell>
          <Suspense fallback={<PageSkeleton />}> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-summary" element={<OrderSummaryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AppShell>
      </AppProviders>
    </BrowserRouter>
  );
}
