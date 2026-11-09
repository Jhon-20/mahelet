import React from 'react';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';

interface FloatingAudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  title?: string;
}

/** Botón flotante (arriba a la derecha) para pausar o reanudar la música de fondo. */
export const FloatingAudioControl: React.FC<FloatingAudioControlProps> = ({
  isPlaying,
  onToggle,
  title = 'Música de fondo',
}) => {
  return (
    <motion.div
      className="fixed right-4 top-4 z-40 select-none"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.6 }}
    >
      <button
        onClick={onToggle}
        type="button"
        title={title}
        aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/70 text-[#C2577A] shadow-[0_8px_20px_-8px_rgba(194,87,122,0.6)] backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
            {[0, 0.2, 0.4].map((d) => (
              <motion.span
                key={d}
                className="w-[3px] rounded-full bg-[#C2577A]"
                animate={{ height: ['30%', '100%', '45%', '80%', '30%'] }}
                transition={{ duration: 1, repeat: Infinity, delay: d, ease: 'easeInOut' }}
              />
            ))}
          </span>
        ) : (
          <VolumeX className="size-4 opacity-80" />
        )}
      </button>
    </motion.div>
  );
};
