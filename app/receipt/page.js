'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Info } from 'lucide-react';
import { useCart, REVIEW_POINTS } from '@/components/CartContext';

export default function ReceiptPage() {
  const { lastOrder, table } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!lastOrder) router.replace('/');
  }, [lastOrder, router]);

  if (!lastOrder) return null;

  return (
    <>
      <div className="check-circ">
        <CheckCircle2 size={30} />
      </div>
      <div className="h1" style={{ textAlign: 'center', marginBottom: 4 }}>E-Receipt</div>
      <div style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: 12, marginBottom: 20 }}>
        Order confirmed — sent to the kitchen
      </div>

      <div className="receipt">
        {lastOrder.lines.map(({ item, qty }) => (
          <div className="rrow" key={item.id}>
            <span>{qty}× {item.name}</span>
            <b>${(item.price * qty).toFixed(2)}</b>
          </div>
        ))}
        <div className="rrow" style={{ borderTop: '1px solid var(--line)', marginTop: 8, paddingTop: 10, fontSize: 14 }}>
          <span>Total</span>
          <b>${lastOrder.subtotal.toFixed(2)}</b>
        </div>
        <div className="rrow"><span>Payment</span><b>{lastOrder.payment}</b></div>
        <div className="rrow"><span>Order</span><b>{lastOrder.number} · {lastOrder.time}</b></div>
      </div>

      <div className="staff-note">
        <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          This demo doesn&apos;t process real payments — the selected method
          is just a signal for staff to bring the right machine
          ({lastOrder.payment}) to Table #{table}.
        </span>
      </div>

      <Link
        href="/rate"
        className="btn-primary"
        style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: 16 }}
      >
        Rate us · earn {REVIEW_POINTS} points
      </Link>
    </>
  );
}
