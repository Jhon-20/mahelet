import React from 'react';
import { VolumeX } from 'lucide-react';

interface FloatingAudioControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  title?: string;
}

export const FloatingAudioControl: React.FC<FloatingAudioControlProps> = ({
  isPlaying,
  onToggle,
  title = 'Música de fondo',
}) => {
  return (
    <div className="fixed right-4 bottom-4 z-40 select-none">
      <button
        onClick={onToggle}
        type="button"
        title={title}
        aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir música de fondo'}
        className="glass flex h-12 w-12 items-center justify-center rounded-full text-rose-deep transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <div className="flex h-4 items-end justify-center gap-[3px]" aria-hidden="true">
            <span className="bar-1 w-[3px] rounded-full bg-rose-deep" />
            <span className="bar-2 w-[3px] rounded-full bg-rose-deep" />
            <span className="bar-3 w-[3px] rounded-full bg-rose-deep" />
          </div>
        ) : (
          <VolumeX className="h-4 w-4 opacity-80" />
        )}
      </button>
    </div>
  );
};
