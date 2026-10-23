import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Wraps children in a motion div that fades/slides in when scrolled into view.
 * respects prefers-reduced-motion via CSS.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up', // 'up' | 'left' | 'right' | 'none'
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px 0px' });

  const dirMap = {
    up:    { y: 32, x: 0 },
    left:  { y: 0,  x: -32 },
    right: { y: 0,  x: 32 },
    none:  { y: 0,  x: 0 },
  };

  const initial = { opacity: 0, ...dirMap[direction] };
  const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
