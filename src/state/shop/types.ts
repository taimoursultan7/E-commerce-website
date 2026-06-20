import type { Product } from "../../data/products";

export type CartLine = {
  productId: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered";
  items: { product: Product; qty: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address1: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  payment: {
    method: "Card";
    last4: string;
  };
};
