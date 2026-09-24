'use client';

import { useCart } from './CartContext';

export default function TopBar() {
  const { table } = useCart();
  return (
    <div className="topbar">
      <div className="avatar">JM</div>
      <div className="who">
        <b>Jordan M.</b>
        <span>240 points</span>
      </div>
      <div className="table-pill">Table #{table}</div>
    </div>
  );
}
