import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ChevronDown } from 'lucide-react';
import type { InvitationConfig } from '../../types/invitation';

interface InvitationHeroProps {
  config: InvitationConfig;
}

export const InvitationHero: React.FC<InvitationHeroProps> = ({ config }) => {
  return (
    <section className="relative px-5 pt-10 pb-16 text-center sm:pt-16">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="eyebrow"
      >
        {config.baby.parentsNames || 'Con todo el amor del mundo'}
      </motion.p>

      <div className="relative mx-auto mt-8 flex max-w-md items-center justify-center">
        {/* Giant numeral behind */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="font-display pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 select-none text-[22rem] leading-none text-blush/70 sm:text-[26rem]"
        >
          {config.baby.birthdayNumber}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="arch-lg animate-soft-float relative h-[22rem] w-[16.5rem] overflow-hidden border-[7px] border-white shadow-[0_40px_70px_-30px_rgba(74,37,53,0.5)] sm:h-[26rem] sm:w-[19.5rem]"
        >
          <img
            src="/images/bunny-hero.jpg"
            alt={`Conejita para el cumpleaños de ${config.baby.name}`}
            className="h-full w-full scale-125 object-cover"
          />
        </motion.div>
      </div>

      <div className="relative -mt-14 space-y-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-serif text-lg italic text-mulberry-soft"
        >
          Celebremos juntos a
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="display-title text-gradient text-[5.5rem] sm:text-[8rem]"
        >
          {config.baby.name}
        </motion.h1>
        <p className="font-script -mt-2 text-4xl text-mulberry sm:text-5xl">{config.baby.ageTitle}</p>
      </div>

      {/* Quick facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mx-auto mt-10 flex max-w-md flex-wrap items-center justify-center gap-2.5"
      >
        <Chip icon={<Calendar className="h-3.5 w-3.5" />}>{config.schedule.displayDate}</Chip>
        <Chip icon={<Clock className="h-3.5 w-3.5" />}>{config.schedule.time}</Chip>
        <Chip icon={<MapPin className="h-3.5 w-3.5" />}>{config.location.city}</Chip>
      </motion.div>

      <motion.a
        href="#rsvp"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="mt-10 inline-flex flex-col items-center gap-1 text-[0.65rem] uppercase tracking-[0.3em] text-muted hover:text-rose-deep"
      >
        Desliza
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.a>
    </section>
  );
};

const Chip: React.FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mulberry">
    <span className="text-rose-deep">{icon}</span>
    {children}
  </span>
);
