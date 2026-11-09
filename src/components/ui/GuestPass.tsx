import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Guest } from '../../utils/guest';

/** Pase personal tipo "ticket" que sube desde abajo cuando el footer se oculta. */
export const GuestPass: React.FC<{ guest: Guest; visible: boolean }> = ({ guest, visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        key="guest-pass"
        initial={{ y: '130%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '130%', opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 select-none"
      >
        <div className="flex w-full max-w-sm items-stretch overflow-hidden rounded-[1.6rem] border border-white bg-white/85 shadow-[0_14px_40px_-12px_rgba(194,87,122,0.55)] backdrop-blur-md">
          <div className="min-w-0 flex-1 px-5 py-3">
            <p className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.25em] text-[#947871]">
              <Heart className="size-3 fill-[#DB7093] text-[#DB7093]" />
              Invitación especial para
            </p>
            <p
              className="mt-0.5 text-[1.9rem] leading-tight text-[#C2577A] [overflow-wrap:anywhere]"
              style={{ fontFamily: 'var(--font-joseph)' }}
            >
              {guest.name}
            </p>
          </div>

          {/* Talón del ticket con los pases */}
          <div className="relative flex w-24 shrink-0 flex-col items-center justify-center bg-gradient-to-br from-[#E88FAB] to-[#C2577A] text-white">
            <span aria-hidden="true" className="absolute inset-y-2 left-0 border-l-2 border-dashed border-white/70" />
            <motion.span
              className="text-4xl font-semibold leading-none"
              style={{ fontFamily: 'var(--font-button)' }}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.2 }}
            >
              {guest.passes}
            </motion.span>
            <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em]">
              {guest.passes === 1 ? 'pase' : 'pases'}
            </span>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
