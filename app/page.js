import { Search } from 'lucide-react';
import TopBar from '@/components/TopBar';
import CategoryPills from '@/components/CategoryPills';
import DishCard from '@/components/DishCard';
import CartBar from '@/components/CartBar';
import Reveal from '@/components/Reveal';
import { getHighlyRated } from '@/lib/menu-data';

export default function HomePage() {
  const highlyRated = getHighlyRated();

  return (
    <>
      <TopBar />
      <div className="search">
        <Search size={16} />
        Search dishes, drinks…
      </div>
      <div className="section-title">Our Cuisines</div>
      <CategoryPills />
      <div className="section-title">Highly Rated</div>
      <div className="grid">
        {highlyRated.map((item, i) => (
          <Reveal key={item.id} index={i}>
            <DishCard item={item} />
          </Reveal>
        ))}
      </div>
      <CartBar />
    </>
  );
}
