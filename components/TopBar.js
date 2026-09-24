'use client';

import { useCart } from './CartContext';

export default function TopBar() {
  const { table, points } = useCart();
  return (
    <>
      <div className="table-row">
        <span className="table-pill">Table #{table}</span>
      </div>
      <div className="topbar">
        <div className="avatar">MG</div>
        <div className="who">
          <b>Muhammed El-Goharry</b>
          <span>{points} points</span>
        </div>
      </div>
    </>
  );
}
