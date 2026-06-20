import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../nav/Navbar";
import { Footer } from "../nav/Footer";

export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="pt-16">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
