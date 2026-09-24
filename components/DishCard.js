'use client';

import * as Icons from 'lucide-react';
import { useCart } from './CartContext';

export default function DishCard({ item }) {
  const { cart, addItem, changeQty } = useCart();
  const Icon = Icons[item.icon] || Icons.UtensilsCrossed;
  const qty = cart[item.id] || 0;

  return (
    <div className="dish">
      <div className="thumb">
        <Icon size={30} strokeWidth={1.5} />
      </div>
      <div className="info">
        <div className="name">{item.name}</div>
        <div className="row">
          <span className="price">${item.price.toFixed(2)}</span>
          {qty > 0 ? (
            <div className="stepper">
              <button onClick={() => changeQty(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                <Icons.Minus size={14} />
              </button>
              <b>{qty}</b>
              <button onClick={() => changeQty(item.id, 1)} aria-label={`Add one ${item.name}`}>
                <Icons.Plus size={14} />
              </button>
            </div>
          ) : (
            <button className="icon-btn" onClick={() => addItem(item.id)} aria-label={`Add ${item.name}`}>
              <Icons.Plus size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
