'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getItem } from '@/lib/menu-data';

const CartContext = createContext(null);

// Points awarded for leaving a review (Rate us screen).
export const REVIEW_POINTS = 100;

export function CartProvider({ children }) {
  const [table, setTable] = useState('05');
  const [cart, setCart] = useState({}); // { itemId: qty }
  const [payment, setPayment] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [points, setPoints] = useState(240);
  const [reviewed, setReviewed] = useState(false);

  // Read ?table=07 from the URL client-side (plain window.location rather
  // than next/navigation's useSearchParams, which would force this whole
  // provider — and every page under it — out of static rendering). Falls
  // back to '05' if the QR code's URL didn't include one.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('table');
    if (fromUrl) setTable(fromUrl);
  }, []);

  function addItem(id) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function changeQty(id, delta) {
    setCart((c) => {
      const next = { ...c };
      const qty = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }

  function clearCart() {
    setCart({});
    setPayment(null);
  }

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: getItem(id), qty }))
        .filter((l) => l.item),
    [cart]
  );
  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.item.price * l.qty, 0), [lines]);
  const count = useMemo(() => lines.reduce((s, l) => s + l.qty, 0), [lines]);

  function placeOrder() {
    if (!payment || lines.length === 0) return null;
    const order = {
      number: '#' + Math.floor(1000 + Math.random() * 9000),
      lines,
      subtotal,
      payment,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setLastOrder(order);
    setReviewed(false); // each order can earn one review reward
    clearCart();
    return order;
  }

  function claimReview() {
    if (reviewed) return;
    setPoints((p) => p + REVIEW_POINTS);
    setReviewed(true);
  }

  const value = {
    cart,
    lines,
    subtotal,
    count,
    payment,
    setPayment,
    addItem,
    changeQty,
    clearCart,
    placeOrder,
    lastOrder,
    table,
    points,
    reviewed,
    claimReview,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
