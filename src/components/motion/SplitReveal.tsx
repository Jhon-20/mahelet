import React from 'react';
import { motion } from 'framer-motion';

interface SplitRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

/**
 * Cada letra sube desde una máscara, escalonada, al entrar en pantalla.
 * El observador está en el contenedor (no recortado) y las letras heredan la variante;
 * si estuviera en cada letra, la máscara la dejaría "fuera de pantalla" y nunca animaría.
 */
export const SplitReveal: React.FC<SplitRevealProps> = ({ text, className, style, delay = 0 }) => (
  <motion.span
    className={className}
    style={style}
    aria-label={text}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    transition={{ staggerChildren: 0.04, delayChildren: delay }}
  >
    {text.split(' ').map((word, wi) => (
      <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.25em] mr-[0.25em]" aria-hidden="true">
        {word.split('').map((ch, ci) => (
          <motion.span
            key={ci}
            className="inline-block"
            variants={{ hidden: { y: '110%', rotate: 8 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    ))}
  </motion.span>
);
