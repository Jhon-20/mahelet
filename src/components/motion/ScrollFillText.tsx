import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const Word: React.FC<{ word: string; range: [number, number]; progress: MotionValue<number> }> = ({ word, range, progress }) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-[0.28em]">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
};

/** Las palabras se "encienden" una a una según avanzas con el scroll (estilo landonorris.com). */
export const ScrollFillText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} />
      ))}
    </p>
  );
};
