'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { usePathname } from 'next/navigation';

// Route content fades in with a tiny lift when the page changes.
//
// This is deliberately enter-only. The previous version used
// <AnimatePresence mode="wait"> with an exit animation, which fights the
// App Router: by the time the exit runs, `children` is already the NEW page,
// so the new page appeared instantly, faded back out, then faded in again
// (and the exit + enter ran back to back, ~440ms of dead time). Swapping
// immediately and animating the new page in feels like one quick motion.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  // Don't animate the very first paint (it would flash blank before hydration).
  const firstRender = useRef(true);
  useEffect(() => {
    firstRender.current = false;
  }, []);

  // The document doesn't scroll any more — .app-main is the scroll container —
  // so Next's built-in scroll-to-top on navigation has nothing to act on.
  // Reset it ourselves so a new page always starts at the top.
  useEffect(() => {
    ref.current?.closest('.app-main')?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <motion.div
      ref={ref}
      key={pathname}
      initial={firstRender.current ? false : { opacity: 0, y: reduceMotion ? 0 : 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
