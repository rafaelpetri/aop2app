import React, { createContext, useContext, useMemo, useState } from 'react';

export type CartProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
};

export type CartItem = {
  product: CartProduct;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  incrementQty: (productId: string) => void;
  decrementQty: (productId: string) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: CartProduct) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const incrementQty = (productId: string) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, qty: i.qty + 1 } : i))
    );
  };

  const decrementQty = (productId: string) => {
    setItems((prev) =>
      prev
        .map((i) => (i.product.id === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    incrementQty,
    decrementQty,
    removeItem,
    clear,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}