import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Tarjetas apiladas: cada bloque se queda fijo (sticky) y se encoge/atenúa
 * mientras el siguiente sube y lo tapa. `index` desplaza un poco cada capa.
 */
export const StackCard: React.FC<{ children: React.ReactNode; index: number; last?: boolean }> = ({ children, index, last }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.4]);
  return (
    <div ref={ref} className={last ? 'w-full' : 'w-full h-[75vh]'}>
      <motion.div
        style={{ scale, opacity, top: `calc(4rem + ${index * 14}px)`, transformOrigin: 'top center' }}
        className="sticky w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
