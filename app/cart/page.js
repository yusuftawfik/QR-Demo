'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Minus, Plus, CreditCard, Banknote } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useCart } from '@/components/CartContext';

const PAYMENT_METHODS = [
  { id: 'visa', label: 'Visa', Icon: CreditCard },
  { id: 'apple-pay', label: 'Apple Pay', iconClass: 'fi fi-brands-apple-pay' },
  { id: 'cash', label: 'Cash', Icon: Banknote },
];

export default function CartPage() {
  const { lines, subtotal, payment, setPayment, changeQty, placeOrder } = useCart();
  const router = useRouter();

  function handlePlaceOrder() {
    const order = placeOrder();
    if (order) router.push('/receipt');
  }

  return (
    <>
      <div className="backrow">
        <Link href="/" className="backbtn" aria-label="Back to menu">
          <ArrowLeft size={18} />
        </Link>
        <div className="h1">Your Order</div>
      </div>

      {lines.length === 0 ? (
        <div className="empty-state">
          No items yet.
          <br />
          <Link href="/">Browse the menu →</Link>
        </div>
      ) : (
        <>
          {lines.map(({ item, qty }) => {
            const ItemIcon = Icons[item.icon] || Icons.UtensilsCrossed;
            return (
              <div className="line-item" key={item.id}>
                <div className="thumb-sm">
                  <ItemIcon size={20} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="li-name">{item.name}</div>
                  <div className="li-sub">${item.price.toFixed(2)} each</div>
                </div>
                <div className="stepper">
                  <button onClick={() => changeQty(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                    <Minus size={14} />
                  </button>
                  <b>{qty}</b>
                  <button onClick={() => changeQty(item.id, 1)} aria-label={`Add one ${item.name}`}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="section-title" style={{ marginTop: 22 }}>Pay with</div>
          <div className="paymethods">
            {PAYMENT_METHODS.map(({ id, label, Icon, iconClass }) => (
              <div
                key={id}
                className={`opt ${payment === label ? 'sel' : ''}`}
                onClick={() => setPayment(label)}
                role="button"
                tabIndex={0}
              >
                {Icon ? (
                  <Icon size={20} strokeWidth={1.5} />
                ) : (
                  <i className={`${iconClass} opt-fonticon`} aria-hidden="true" />
                )}
                {label}
              </div>
            ))}
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div style={{ height: 16 }} />
          <button className="btn-primary" disabled={!payment} onClick={handlePlaceOrder}>
            {payment ? `Place Order · $${subtotal.toFixed(2)}` : 'Select a payment method'}
          </button>
        </>
      )}
    </>
  );
}
