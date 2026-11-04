import React from 'react';
import { motion } from 'framer-motion';
import type { InvitationConfig } from '../../types/invitation';

interface SpecialMessageProps {
  config: InvitationConfig;
}

export const SpecialMessage: React.FC<SpecialMessageProps> = ({ config }) => {
  return (
    <section className="px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-xl"
      >
        <span
          aria-hidden="true"
          className="font-display block h-12 text-7xl leading-none text-rose/70"
        >
          “
        </span>
        <p className="font-serif text-2xl leading-snug text-mulberry sm:text-[1.75rem]">
          {config.quotes.emotionalMessage}
        </p>
        <div className="mx-auto mt-8 flex items-center justify-center gap-3 text-rose-deep" aria-hidden="true">
          <span className="h-px w-12 bg-rose" />
          <span className="text-sm">✦</span>
          <span className="h-px w-12 bg-rose" />
        </div>
      </motion.div>
    </section>
  );
};
