'use client';

import { motion } from 'motion/react';

// Wraps a single grid item (a DishCard) so it fades/lifts in as it scrolls
// into view. Left as a plain wrapper — rather than animating DishCard's own
// root element — so its CSS `:active` press effect isn't fought by an inline
// transform left behind by the animation.
//
// No per-card stagger delay: the whole page already fades in on navigation
// (see PageTransition), and staggering the first row on top of that made the
// arrival feel layered and slow. `index` is still accepted so callers don't
// need to change.
export default function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
