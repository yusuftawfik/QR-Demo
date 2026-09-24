'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ConciergeBell, Smartphone } from 'lucide-react';
import { useCart } from './CartContext';
import { categories } from '@/lib/menu-data';

// Floating glass pill from the Figma wireframe (Frames 87 / 88 / 89).
// One component, three active states: Home (/), Menu (/menu/*), Order
// (/cart and /receipt). The active tab gets a heavier stroke, matching the
// filled/bold icon variants in the design.
//
// The Menu tab remembers the last cuisine the user was browsing, so coming
// back from the cart lands on e.g. Cold Drinks rather than always Hot Drinks.
const DEFAULT_CATEGORY = categories[0].slug;
const STORAGE_KEY = 'lastCategory';

function getActiveTab(pathname) {
  if (pathname.startsWith('/cart') || pathname.startsWith('/receipt') || pathname.startsWith('/rate')) return 'order';
  if (pathname.startsWith('/menu')) return 'menu';
  return 'home';
}

export default function BottomNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const active = getActiveTab(pathname);
  const [lastCategory, setLastCategory] = useState(DEFAULT_CATEGORY);

  // Restore after a refresh (sessionStorage), only accepting real slugs.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && categories.some((c) => c.slug === saved)) setLastCategory(saved);
    } catch {}
  }, []);

  // Whenever the user is on /menu/<slug>, remember that slug.
  useEffect(() => {
    const match = pathname.match(/^\/menu\/([^/]+)/);
    if (match && categories.some((c) => c.slug === match[1])) {
      setLastCategory(match[1]);
      try {
        sessionStorage.setItem(STORAGE_KEY, match[1]);
      } catch {}
    }
  }, [pathname]);

  const tabs = [
    { key: 'home', href: '/', label: 'Home', Icon: Home },
    { key: 'menu', href: `/menu/${lastCategory}`, label: 'Menu', Icon: ConciergeBell },
    { key: 'order', href: '/cart', label: 'Your order', Icon: Smartphone },
  ];

  return (
    <nav className="bottomnav" aria-label="Main">
      {tabs.map(({ key, href, label, Icon }) => {
        const isActive = active === key;
        return (
          <Link
            key={key}
            href={href}
            className={`navlink ${isActive ? 'active' : ''}`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2.25 : 1.5} />
            {key === 'order' && count > 0 && <span className="badge">{count}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
