'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Star } from 'lucide-react';
import { useCart, REVIEW_POINTS } from '@/components/CartContext';

const TIERS = [
  { points: 100, off: 10 },
  { points: 200, off: 15 },
  { points: 300, off: 20 },
];

export default function RatePage() {
  const { points, reviewed, claimReview } = useCart();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  if (reviewed) {
    return (
      <>
        <div className="check-circ">
          <CheckCircle2 size={30} />
        </div>
        <div className="h1" style={{ textAlign: 'center', marginBottom: 4 }}>Thanks for your review!</div>
        <div style={{ textAlign: 'center', color: 'var(--ink-soft)', fontSize: 12, marginBottom: 20 }}>
          +{REVIEW_POINTS} points added — you now have {points} points
        </div>
        <Link
          href="/"
          className="btn-primary"
          style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
        >
          Back to menu
        </Link>
      </>
    );
  }

  const shown = hover || rating;

  return (
    <>
      <div className="h1" style={{ marginBottom: 24 }}>
        Give a review for {REVIEW_POINTS} POINT for your next order!
      </div>

      <div className="section-title">Rate us</div>
      <div className="rate-stars" role="radiogroup" aria-label="Rating" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            className={`star-btn ${n <= shown ? 'on' : ''}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setRating(n)}
          >
            <Star size={40} strokeWidth={1.5} />
          </button>
        ))}
      </div>

      <textarea
        className="review-input"
        placeholder="Any recommendations?"
        aria-label="Any recommendations?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn-primary" disabled={rating === 0} onClick={() => claimReview()}>
        Submit &amp; Claim Points
      </button>

      <div className="section-title" style={{ marginTop: 28, marginBottom: 2 }}>Points method</div>
      <div className="tier-note">Above 100 points you take 5% off</div>
      <div className="tiers">
        {TIERS.map(({ points: p, off }) => (
          <div className="tier" key={p}>
            <span>{p} points</span>
            <span>{off}%</span>
          </div>
        ))}
      </div>
    </>
  );
}
