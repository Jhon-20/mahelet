import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion';

interface VelocityMarqueeProps {
  text: string;
  baseSpeed?: number; // % por segundo
  className?: string;
}

/** Texto en bucle cuya velocidad y sentido reaccionan al scroll. */
export const VelocityMarquee: React.FC<VelocityMarqueeProps> = ({ text, baseSpeed = -4, className }) => {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    const move = (baseSpeed * dir.current + b * baseSpeed) * (delta / 1000);
    let next = x.get() + move;
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    x.set(next);
  });

  const xPct = useTransform(x, (v) => `${v}%`);
  const chunk = Array.from({ length: 4 }, () => `${text} · `).join('');

  return (
    <div className="w-screen overflow-hidden whitespace-nowrap select-none" aria-hidden="true">
      <motion.div style={{ x: xPct }} className={`inline-flex ${className ?? ''}`}>
        <span>{chunk}</span>
        <span>{chunk}</span>
      </motion.div>
    </div>
  );
};
