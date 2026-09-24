'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function CartBar() {
  const { count, subtotal } = useCart();
  if (count === 0) return null;

  return (
    <Link href="/cart" className="cart-bar">
      <span>
        {count} {count === 1 ? 'item' : 'items'} · ${subtotal.toFixed(2)}
      </span>
      <span>View Order →</span>
    </Link>
  );
}
