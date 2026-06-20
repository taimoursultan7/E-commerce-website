import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { products } from "../../data/products";
import type { Order } from "./types";

type ShopState = {
  cart: Record<string, number>;
  wishlist: Set<string>;
  orders: Order[];
  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  placeOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "shopsphere_cart_v1";
const WISH_KEY = "shopsphere_wishlist_v1";
const ORDERS_KEY = "shopsphere_orders_v1";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as Record<string, number>;
    } catch {
      return {};
    }
  });

  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    const raw = localStorage.getItem(WISH_KEY);
    if (!raw) return new Set();
    try {
      const arr = JSON.parse(raw) as string[];
      return new Set(arr);
    } catch {
      return new Set();
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Order[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(Array.from(wishlist)));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId: string, qty = 1) => {
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + qty }));
    toast.success("Added to cart");
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
    toast("Removed from cart");
  };

  const setQty = (productId: string, qty: number) => {
    const nextQty = clamp(qty, 1, 99);
    setCart((prev) => ({ ...prev, [productId]: nextQty }));
  };

  const clearCart = () => setCart({});

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        toast("Removed from wishlist");
      } else {
        next.add(productId);
        toast.success("Saved to wishlist");
      }
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.has(productId);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, n) => sum + n, 0),
    [cart]
  );

  const cartSubtotal = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = products.find((x) => x.id === id);
      return sum + (p ? p.price * qty : 0);
    }, 0);
  }, [cart]);

  const placeOrder: ShopState["placeOrder"] = (orderInput) => {
    const order: Order = {
      ...orderInput,
      id: "ord_" + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      status: "Processing",
    };
    setOrders((prev) => [order, ...prev]);
    setCart({});
    toast.success("Order placed successfully");
    return order;
  };

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      orders,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      cartCount,
      cartSubtotal,
      placeOrder,
    }),
    [cart, wishlist, orders, cartCount, cartSubtotal]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
