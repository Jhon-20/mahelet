import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { InvitationConfig } from '../../types/invitation';

interface InvitationFooterProps {
  config: InvitationConfig;
}

export const InvitationFooter: React.FC<InvitationFooterProps> = ({ config }) => {
  return (
    <footer className="px-6 pt-16 pb-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-md"
      >
        <div className="arch-lg mx-auto h-64 w-48 overflow-hidden border-[6px] border-white shadow-[0_30px_50px_-25px_rgba(74,37,53,0.5)]">
          <img
            src="/images/bunny-celebration.jpg"
            alt="Conejita celebrando el primer añito con pastel"
            loading="lazy"
            className="h-full w-full scale-110 object-cover"
          />
        </div>

        <p className="font-script mt-8 text-5xl text-gradient sm:text-6xl">¡Te esperamos!</p>
        <p className="font-serif mx-auto mt-3 max-w-xs text-xl italic leading-snug text-mulberry">
          {config.quotes.closingDedication}
        </p>

        <div className="mt-10 flex flex-col items-center gap-2 text-xs text-muted">
          <span className="h-px w-16 bg-rose" />
          <p className="flex items-center gap-1.5">
            Hecho con <Heart className="h-3 w-3 fill-rose text-rose-deep" /> para{' '}
            <strong className="font-semibold text-mulberry">{config.baby.name}</strong>
          </p>
          <span className="tracking-[0.2em] uppercase">{config.schedule.displayDate}</span>
        </div>
      </motion.div>
    </footer>
  );
};
