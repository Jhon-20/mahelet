import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DecorativeBow } from './DecorativeBow';

const EASE = [0.22, 1, 0.36, 1] as const;

// Tela de terciopelo: pliegues verticales + sombra hacia el borde exterior
const fabric = (side: 'left' | 'right') => ({
  backgroundImage: [
    `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, rgba(120,40,70,0.28), transparent 35%, transparent 85%, rgba(255,255,255,0.25))`,
    'repeating-linear-gradient(90deg, #E7A1B6 0px, #F7CEDA 14px, #F2B5C8 24px, #DD8FA7 36px)',
  ].join(','),
});

type Phase = 'closing' | 'hold' | 'opening';

/**
 * Cortina de teatro entre el video y la invitación:
 * se cierra sobre el video → muestra lazo y nombre → se abre recogiéndose hacia los lados.
 * `onReveal` avisa justo cuando empieza a abrirse (momento de montar la invitación detrás,
 * así sus animaciones de entrada se ven); `onDone` cuando ya terminó.
 */
export const CurtainReveal: React.FC<{ name: string; onReveal: () => void; onDone: () => void }> = ({
  name,
  onReveal,
  onDone,
}) => {
  const [phase, setPhase] = useState<Phase>('closing');

  useEffect(() => {
    if (phase !== 'hold') return;
    const t = setTimeout(() => {
      setPhase('opening');
      onReveal();
    }, 1700);
    return () => clearTimeout(t);
  }, [phase, onReveal]);

  const closed = phase !== 'opening';
  const panel = (side: 'left' | 'right') => (
    <motion.div
      className={`absolute inset-y-0 w-1/2 ${side === 'left' ? 'left-0' : 'right-0'}`}
      style={{ ...fabric(side), transformOrigin: side === 'left' ? 'left center' : 'right center' }}
      initial={{ x: side === 'left' ? '-100%' : '100%' }}
      animate={
        closed
          ? { x: 0, scaleX: 1, skewY: 0 }
          : { x: 0, scaleX: 0.08, skewY: side === 'left' ? 2 : -2, opacity: [1, 1, 0] }
      }
      transition={closed ? { duration: 0.8, ease: EASE } : { duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => {
        if (side !== 'left') return;
        if (phase === 'closing') setPhase('hold');
        else if (phase === 'opening') onDone();
      }}
    />
  );

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none select-none" aria-hidden="true">
      {panel('left')}
      {panel('right')}

      {/* Cenefa superior con ondas que se levanta al abrir */}
      <motion.div
        className="absolute inset-x-0 top-0"
        initial={{ y: '-100%' }}
        animate={{ y: closed ? 0 : '-120%' }}
        transition={{ duration: closed ? 0.8 : 1.2, ease: EASE, delay: closed ? 0 : 0.3 }}
      >
        <div className="h-12 bg-[#D9839E] shadow-[inset_0_-6px_10px_-6px_rgba(120,40,70,0.35)]" />
        <div
          className="h-[14px] drop-shadow-[0_4px_4px_rgba(120,40,70,0.25)]"
          style={{ background: 'radial-gradient(circle at 50% 0, #D9839E 13.5px, transparent 14px) 0 0 / 28px 14px repeat-x' }}
        />
      </motion.div>

      {/* Lazo y nombre sobre la unión de las cortinas */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={phase === 'hold' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: phase === 'opening' ? 1.15 : 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <DecorativeBow size="lg" className="scale-150" />
        <p
          className="mt-6 px-8 text-5xl leading-tight text-balance text-white drop-shadow-[0_3px_0_rgba(194,87,122,0.8)] sm:text-6xl"
          style={{ fontFamily: 'var(--font-joseph)' }}
        >
          {name}
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.35em] text-white/90">Bienvenidos</p>
      </motion.div>
    </div>
  );
};
