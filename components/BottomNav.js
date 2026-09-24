'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const onCart = pathname.startsWith('/cart') || pathname.startsWith('/receipt');

  return (
    <nav className="bottomnav">
      <Link href="/" className={`navlink ${!onCart ? 'active' : ''}`}>
        <Home size={19} strokeWidth={!onCart ? 2 : 1.5} />
        Home
      </Link>
      <Link href="/cart" className={`navlink ${onCart ? 'active' : ''}`}>
        <ShoppingCart size={19} strokeWidth={onCart ? 2 : 1.5} />
        Cart
        {count > 0 && <span className="badge">{count}</span>}
      </Link>
    </nav>
  );
}
