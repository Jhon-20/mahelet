import React from 'react';
import { motion, type MotionStyle } from 'framer-motion';

type FloatKind = 'bob' | 'drift' | 'flutter' | 'sway';

/** Bucles de flotación suaves para cada tipo de ilustración. */
const FLOATS: Record<FloatKind, { animate: Record<string, number[]>; duration: number }> = {
  bob: { animate: { y: [0, -8, 0] }, duration: 4 },
  drift: { animate: { y: [0, -14, 0], rotate: [-3, 3, -3] }, duration: 7 },
  flutter: { animate: { y: [0, -10, 4, 0], x: [0, 6, -4, 0], rotate: [0, -10, 6, 0] }, duration: 5 },
  sway: { animate: { rotate: [-4, 4, -4] }, duration: 5 },
};

interface StickerProps {
  src: string;
  /** Clases de posición/tamaño del contenedor (p. ej. "absolute -top-6 -right-4 w-16"). */
  className?: string;
  float?: FloatKind;
  delay?: number;
  /** Estilo de motion para el contenedor (parallax con scroll). */
  style?: MotionStyle;
  flip?: boolean;
  /** "pop" crece en su sitio; "left"/"right" entra rodando desde ese lado. */
  enter?: 'pop' | 'left' | 'right';
}

const ENTER = {
  pop: { opacity: 0, scale: 0.6 },
  left: { opacity: 0, x: -160, rotate: -6 },
  right: { opacity: 0, x: 160, rotate: 6 },
};

/** Ilustración decorativa en acuarela: aparece con un "pop" y luego flota en bucle. */
export const Sticker: React.FC<StickerProps> = ({ src, className = '', float = 'bob', delay = 0, style, flip, enter = 'pop' }) => {
  const f = FLOATS[float];
  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className={`pointer-events-none select-none ${className}`}
      initial={ENTER[enter]}
      whileInView={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        enter === 'pop'
          ? { type: 'spring', stiffness: 120, damping: 14, delay }
          : { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      <motion.img
        src={src}
        alt=""
        draggable={false}
        decoding="async"
        className={`h-auto w-full object-contain drop-shadow-[0_6px_10px_rgba(194,87,122,0.18)] ${flip ? '-scale-x-100' : ''}`}
        animate={f.animate}
        transition={{ duration: f.duration, repeat: Infinity, ease: 'easeInOut', delay }}
      />
    </motion.div>
  );
};
