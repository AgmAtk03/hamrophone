import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "@/lib/i18n";
import { getProductById, type Product } from "@/lib/products";
import type { Payout, Quote, QuoteInput, TradeHandoff } from "@/lib/trade-in";

export type CartItem = { productId: string; qty: number };

export type Fulfilment = "pickup" | "post" | "nepal";
export type PayMethod = "pickup" | "card";

export type Order = {
  id: string;
  createdAt: string;
  items: { productId: string; qty: number; price: number; name: string }[];
  fulfilment: Fulfilment;
  payMethod: PayMethod;
  name: string;
  mobile: string;
  email: string;
  suburb: string;
  postcode: string;
  notes: string;
  subtotal: number;
  shipping: number;
  credit?: number;
  signupDiscount?: number;
  total: number;
};

export type TradeIn = QuoteInput & {
  id: string;
  createdAt: string;
  expiresAt: string;
  deviceName: string;
  deviceNameNe: string;
  quote: Quote;
  payout: Payout;
  amount: number;
  handoff: TradeHandoff;
  name: string;
  mobile: string;
  email: string;
  payId: string;
  suburb: string;
  postcode: string;
  notes: string;
};

export type Newsletter = {
  name: string;
  email: string;
  at: string;
};

type ShopState = {
  lang: Lang;
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  tradeIns: TradeIn[];
  creditBalance: number;
  newsletter: Newsletter | null;
  setLang: (lang: Lang) => void;
  addToCart: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (order: Order) => void;
  bookTradeIn: (trade: TradeIn) => void;
  joinNewsletter: (name: string, email: string) => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set, get) => ({
      lang: "en",
      cart: [],
      wishlist: [],
      orders: [],
      tradeIns: [],
      creditBalance: 0,
      newsletter: null,
      setLang: (lang) => set({ lang }),
      addToCart: (productId, qty = 1) => {
        const cart = [...get().cart];
        const i = cart.findIndex((c) => c.productId === productId);
        if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + qty };
        else cart.push({ productId, qty });
        set({ cart });
      },
      setQty: (productId, qty) => {
        if (qty <= 0) {
          set({ cart: get().cart.filter((c) => c.productId !== productId) });
          return;
        }
        set({
          cart: get().cart.map((c) => (c.productId === productId ? { ...c, qty } : c)),
        });
      },
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((c) => c.productId !== productId) }),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (productId) => {
        const wishlist = get().wishlist.includes(productId)
          ? get().wishlist.filter((id) => id !== productId)
          : [...get().wishlist, productId];
        set({ wishlist });
      },
      placeOrder: (order) =>
        set({
          orders: [order, ...get().orders],
          cart: [],
          creditBalance: Math.max(0, get().creditBalance - (order.credit || 0)),
        }),
      bookTradeIn: (trade) => {
        const creditAdd = trade.payout === "cash" ? 0 : trade.amount;
        set({
          tradeIns: [trade, ...get().tradeIns],
          creditBalance: get().creditBalance + creditAdd,
        });
      },
      joinNewsletter: (name, email) =>
        set({
          newsletter: { name: name.trim(), email: email.trim().toLowerCase(), at: new Date().toISOString() },
        }),
    }),
    { name: "sasto-iphone" },
  ),
);

export function cartCount(cart: CartItem[]) {
  return cart.reduce((n, i) => n + i.qty, 0);
}

export function cartLines(cart: CartItem[]) {
  return cart
    .map((item) => {
      const product = getProductById(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter((x): x is CartItem & { product: Product } => x !== null);
}

export function cartSubtotal(cart: CartItem[]) {
  return cartLines(cart).reduce((n, l) => n + l.product.price * l.qty, 0);
}

export function shippingFor(subtotal: number, fulfilment: Fulfilment) {
  if (fulfilment === "pickup") return 0;
  if (fulfilment === "nepal") return 49;
  if (subtotal >= 500) return 0;
  return 12;
}
