import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Tarjetas apiladas: cada bloque se queda fijo (sticky) y se encoge/atenúa
 * mientras el siguiente sube. `index` desplaza un poco cada capa.
 * La altura sigue al contenido + un tramo fijo de pausa, así un bloque alto nunca
 * se desborda sobre el siguiente y uno bajo no deja un hueco gigante.
 */
export const StackCard: React.FC<{ children: React.ReactNode; index: number; last?: boolean }> = ({ children, index, last }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, last ? 1 : 0.4]);
  return (
    <div ref={ref} className="w-full">
      <motion.div
        style={{ scale, opacity, top: `calc(4rem + ${index * 14}px)`, transformOrigin: 'top center' }}
        className="sticky w-full"
      >
        {children}
      </motion.div>
      {!last && <div aria-hidden="true" className="h-[30vh]" />}
    </div>
  );
};
