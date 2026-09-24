'use client';

import { motion } from 'motion/react';

// Wraps a single grid item (a DishCard) so it fades/lifts in as it enters
// the viewport while scrolling. Left as a plain wrapper — rather than
// animating DishCard's own root element — so its CSS `:active` press effect
// isn't fought by an inline transform left behind by the animation.
export default function Reveal({ children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.2) }}
    >
      {children}
    </motion.div>
  );
}
