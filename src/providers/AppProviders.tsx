import type { ReactNode } from "react";
import { AuthProvider } from "../state/auth/AuthContext";
import { ShopProvider } from "../state/shop/ShopContext";
import { UIProvider } from "../state/ui/UIContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <AuthProvider>
        <ShopProvider>{children}</ShopProvider>
      </AuthProvider>
    </UIProvider>
  );
}
