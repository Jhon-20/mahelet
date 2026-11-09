import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Sun } from 'lucide-react';

const WEEK = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const CELL = {
  hidden: { opacity: 0, y: 14, scale: 0.6 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const;

// El corazón aparece al final de la cascada con un rebote
const HEART = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 10, delay: 0.7 } },
} as const;

/** Cubito de bebé: bloque redondeado con costura punteada, como los juguetes de tela. */
const Block: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string; tilt: number; delay: number }> = ({
  icon,
  label,
  value,
  color,
  tilt,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, rotate: 0 }}
    whileInView={{ opacity: 1, y: 0, rotate: tilt }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 140, damping: 12, delay }}
    className="flex-1 rounded-[1.4rem] p-1.5 shadow-[0_6px_0_0_rgba(194,87,122,0.18)]"
    style={{ backgroundColor: color }}
  >
    <div className="flex h-full flex-col items-center justify-center rounded-[1.1rem] border-2 border-dashed border-white/90 px-2 py-3">
      <span className="text-[#C2577A]">{icon}</span>
      <p className="mt-1 text-[0.6rem] uppercase tracking-[0.2em] text-[#947871]">{label}</p>
      <p className="text-xl capitalize leading-tight text-[#6B514C]" style={{ fontFamily: 'var(--font-button)' }}>
        {value}
      </p>
    </div>
  </motion.div>
);

/** Mini calendario del mes con el día de la fiesta marcado con un corazón. */
export const PartyCalendar: React.FC<{ iso: string; time: string }> = ({ iso, time }) => {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const monthName = date.toLocaleDateString('es-PE', { month: 'long' });
  const weekday = date.toLocaleDateString('es-PE', { weekday: 'long' });
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // semana inicia en lunes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-[1.6rem] bg-white/70 px-3 pb-4 pt-3 shadow-inner">
        <p className="text-3xl capitalize text-[#C2577A]" style={{ fontFamily: 'var(--font-baby)' }}>
          {monthName} <span className="text-lg text-[#947871]">{year}</span>
        </p>

        {/* Los días caen en cascada y al final "late" el corazón del gran día */}
        <motion.div
          className="mt-3 grid grid-cols-7 gap-y-1 text-center"
          style={{ fontFamily: 'var(--font-button)' }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.018 }}
        >
          {WEEK.map((w, i) => (
            <motion.span key={`w${i}`} variants={CELL} className="pb-1 text-xs font-semibold text-[#DB7093]/70">
              {w}
            </motion.span>
          ))}
          {cells.map((d, i) =>
            d === day ? (
              <motion.span key={i} variants={HEART} className="relative flex h-9 items-center justify-center">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="size-10 fill-[#DB7093] text-[#DB7093] drop-shadow-[0_3px_4px_rgba(194,87,122,0.35)]" />
                </motion.span>
                <span className="relative -mt-0.5 text-sm font-semibold text-white">{d}</span>
              </motion.span>
            ) : (
              <motion.span key={i} variants={CELL} className="flex h-9 items-center justify-center text-sm text-[#6B514C]/70">
                {d ?? ''}
              </motion.span>
            ),
          )}
        </motion.div>
      </div>

      <div className="flex gap-3 px-1">
        <Block icon={<Sun className="size-5" />} label="Día" value={weekday} color="#F6C8D4" tilt={-3} delay={0.1} />
        <Block icon={<Clock className="size-5" />} label="Hora" value={time} color="#EADBCB" tilt={3} delay={0.25} />
      </div>
    </div>
  );
};
