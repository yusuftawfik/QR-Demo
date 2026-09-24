import Link from 'next/link';
import * as Icons from 'lucide-react';
import { categories } from '@/lib/menu-data';

export default function CategoryPills() {
  return (
    <div className="pills">
      {categories.map((c) => {
        const Icon = Icons[c.icon] || Icons.UtensilsCrossed;
        return (
          <Link key={c.slug} href={`/menu/${c.slug}`} className="pill">
            <span className="circ">
              <Icon size={22} strokeWidth={1.5} />
            </span>
            <span>{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
