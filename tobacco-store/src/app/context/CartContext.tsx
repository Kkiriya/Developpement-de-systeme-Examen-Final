"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import type { Product } from "@/app/data/product";

const CART_STORAGE_KEY = "airsmokes-cart";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Keep a cached snapshot so React receives the same reference
// when localStorage has not changed.
let cachedCartRaw: string | null = null;
let cachedCart: CartItem[] = [];

const listeners = new Set<() => void>();

function getCartRaw() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(CART_STORAGE_KEY);
}

function getCart() {
  const raw = getCartRaw();

  if (raw === cachedCartRaw) {
    return cachedCart;
  }

  cachedCartRaw = raw;

  if (!raw) {
    cachedCart = [];
    return cachedCart;
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      cachedCart = parsed;
    } else {
      cachedCart = [];
    }
  } catch {
    cachedCart = [];
  }

  return cachedCart;
}

const EMPTY_CART: CartItem[] = [];

function getServerCart() {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function saveCart(items: CartItem[]) {
  const raw = JSON.stringify(items);

  cachedCartRaw = raw;
  cachedCart = items;

  localStorage.setItem(CART_STORAGE_KEY, raw);

  listeners.forEach((listener) => listener());
}

// Keep multiple tabs/windows synchronized.
function handleStorageChange(event: StorageEvent) {
  if (event.key === CART_STORAGE_KEY) {
    cachedCartRaw = null;
    listeners.forEach((listener) => listener());
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", handleStorageChange);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getCart, getServerCart);

  const addToCart = (product: Product) => {
    const currentItems = getCart();

    const existingItem = currentItems.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      saveCart(
        currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      );

      return;
    }

    saveCart([
      ...currentItems,
      {
        product,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (productId: string) => {
    const currentItems = getCart();

    saveCart(currentItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const currentItems = getCart();

    saveCart(
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity,
            }
          : item,
      ),
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [items, totalItems, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}
