import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import type { InvitationConfig } from '../../types/invitation';

interface CountdownSectionProps {
  config: InvitationConfig;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const countdown = useCountdown(config.schedule.date);

  return (
    <section className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        className="grain relative mx-auto max-w-xl overflow-hidden rounded-[2rem] bg-mulberry px-5 py-10 text-center text-white shadow-[0_30px_60px_-30px_rgba(74,37,53,0.7)] sm:px-10"
      >
        {/* glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-rose-deep/40 blur-3xl" />

        <p className="eyebrow relative !text-rose">Falta muy poco</p>
        <h2 className="display-title relative mt-2 text-4xl sm:text-5xl">
          Cuenta <span className="font-script text-rose">regresiva</span>
        </h2>

        {!countdown.isConfigured && (
          <p className="font-serif relative mt-8 text-lg italic text-white/80">
            La fecha oficial se confirmará muy pronto. ¡Mantente atento!
          </p>
        )}

        {countdown.isConfigured && countdown.isToday && (
          <div className="animate-gentle-pulse relative mt-8">
            <p className="font-serif text-3xl text-rose">🎉 ¡Hoy es el gran día! 🎂</p>
            <p className="font-serif mt-1 italic text-white/80">
              ¡Te esperamos para celebrar el 1er añito de {config.baby.name}!
            </p>
          </div>
        )}

        {countdown.isConfigured && countdown.isExpired && !countdown.isToday && (
          <div className="relative mt-8">
            <Heart className="mx-auto mb-2 h-6 w-6 fill-rose text-rose" />
            <p className="font-serif text-xl">¡Este hermoso día ya fue celebrado con muchísimo amor!</p>
            <p className="font-serif mt-1 text-sm italic text-white/70">
              Gracias de corazón a todos los que nos acompañaron.
            </p>
          </div>
        )}

        {countdown.isConfigured && !countdown.isExpired && (
          <div className="relative mt-8 grid grid-cols-4 divide-x divide-white/15">
            <Unit value={countdown.days} label="Días" />
            <Unit value={countdown.hours} label="Horas" />
            <Unit value={countdown.minutes} label="Min" />
            <Unit value={countdown.seconds} label="Seg" />
          </div>
        )}
      </motion.div>
    </section>
  );
};

const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center px-1">
    <span className="font-serif text-5xl font-medium tabular-nums leading-none sm:text-6xl">
      {String(value).padStart(2, '0')}
    </span>
    <span className="mt-2 text-[0.6rem] uppercase tracking-[0.25em] text-rose">{label}</span>
  </div>
);
