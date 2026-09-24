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
  const { lines, subtotal, payment, setPayment, changeQty, notes, setNote, placeOrder } = useCart();
  const router = useRouter();

  function handlePlaceOrder() {
    const order = placeOrder();
    if (order) router.push('/receipt');
  }

  return (
    <>
      <Link href="/" className="backbtn" aria-label="Back to menu" style={{ marginBottom: 22 }}>
        <ArrowLeft size={18} />
      </Link>
      <div className="h1" style={{ marginBottom: 20 }}>Your Order</div>

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
              <div className="cart-card" key={item.id}>
                <div className="cart-thumb">
                  <ItemIcon size={32} strokeWidth={1.5} />
                </div>
                <div className="cart-body">
                  <div className="cart-top">
                    <div className="cart-titles">
                      <div className="cart-name">{item.name}</div>
                      <div className="cart-desc">{item.description || 'Description'}</div>
                    </div>
                    <div className="cart-side">
                      <span>${(item.price * qty).toFixed(2)}</span>
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
                  </div>
                  <textarea
                    className="cart-note"
                    placeholder="Note"
                    aria-label={`Note for ${item.name}`}
                    maxLength={140}
                    value={notes[item.id] || ''}
                    onChange={(e) => setNote(item.id, e.target.value)}
                  />
                </div>
              </div>
            );
          })}

          <div className="paymethods" role="group" aria-label="Payment method">
            {PAYMENT_METHODS.map(({ id, label, Icon, iconClass }) => (
              <div
                key={id}
                className={`opt ${payment === label ? 'sel' : ''}`}
                onClick={() => setPayment(label)}
                role="button"
                aria-pressed={payment === label}
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

          <button className="btn-primary" disabled={!payment} onClick={handlePlaceOrder}>
            {payment ? `Place Order · $${subtotal.toFixed(2)}` : 'Select a payment method'}
          </button>
        </>
      )}
    </>
  );
}
