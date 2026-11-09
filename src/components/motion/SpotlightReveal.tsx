import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface SpotlightRevealProps {
  /** Capa base (siempre visible). */
  children: React.ReactNode;
  /** Capa alternativa que se revela dentro del círculo. */
  reveal: React.ReactNode;
  radius?: number;
}

/**
 * Un círculo sigue al cursor/dedo y deja ver otra versión del contenido (estilo landonorris.com).
 * Sin puntero encima, el círculo pasea solo de lado a lado.
 */
export const SpotlightReveal: React.FC<SpotlightRevealProps> = ({ children, reveal, radius = 70 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });
  const r = useSpring(radius * 0.8, { stiffness: 120, damping: 18 });
  const clipPath = useMotionTemplate`circle(${r}px at ${sx}px ${sy}px)`;

  useEffect(() => {
    r.set(active ? radius * 1.25 : radius * 0.8);
    if (active || !ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    y.set(height / 2);
    const ctrl = animate(x, [width * 0.15, width * 0.85], {
      duration: 3.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'mirror',
    });
    return () => ctrl.stop();
  }, [active, radius, r, x, y]);

  const move = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={() => setActive(true)}
      onPointerMove={move}
      onPointerLeave={() => setActive(false)}
    >
      {children}
      <motion.div aria-hidden="true" style={{ clipPath }} className="pointer-events-none absolute inset-0">
        {reveal}
      </motion.div>
    </div>
  );
};
