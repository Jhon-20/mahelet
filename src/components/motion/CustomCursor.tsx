import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Cursor propio: punto + aro que lo sigue y crece sobre enlaces/botones. Solo en dispositivos con mouse. */
export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 250, damping: 24, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 250, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest('a,button,input,select,textarea'));
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 size-2 rounded-full bg-[#C2577A]"
      />
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.5 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[199] -ml-5 -mt-5 size-10 rounded-full border border-[#C2577A]/70"
      />
    </>
  );
};
