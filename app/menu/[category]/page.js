import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import DishCard from '@/components/DishCard';
import CartBar from '@/components/CartBar';
import Reveal from '@/components/Reveal';
import { getCategory, getItemsByCategory, categories } from '@/lib/menu-data';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getItemsByCategory(category.slug);

  return (
    <>
      <div className="backrow">
        <Link href="/" className="backbtn" aria-label="Back to menu">
          <ArrowLeft size={18} />
        </Link>
        <div className="h1">{category.name}</div>
      </div>
      <div className="grid">
        {items.map((item, i) => (
          <Reveal key={item.id} index={i}>
            <DishCard item={item} />
          </Reveal>
        ))}
      </div>
      <CartBar />
    </>
  );
}
