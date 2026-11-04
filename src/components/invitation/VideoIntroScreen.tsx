import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InvitationConfig } from '../../types/invitation';

interface VideoIntroScreenProps {
  config: InvitationConfig;
  videoSrc?: string;
  onFinish: () => void;
}

/**
 * 1) Portada con el nombre y el botón "Abrir invitación".
 * 2) Al tocar, el video se reproduce a pantalla completa CON sonido.
 * 3) Al terminar, llama a onFinish y se muestra la invitación.
 */
export const VideoIntroScreen: React.FC<VideoIntroScreenProps> = ({
  config,
  videoSrc = '/video/video-intro.mp4',
  onFinish,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleOpen = () => {
    const video = videoRef.current;
    if (!video) return onFinish();
    // Este toque es el gesto válido que permite el sonido.
    video.muted = false;
    video.currentTime = 0;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => onFinish());
    });
    setStarted(true);
  };

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={`${videoSrc}#t=0.001`}
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        onPause={(e) => {
          const v = e.currentTarget;
          if (!started || v.ended) return;
          v.play().catch(() => {
            v.muted = true;
            v.play().catch(() => {});
          });
        }}
        onEnded={onFinish}
        onError={onFinish}
        className="pointer-events-none h-[100dvh] w-full object-cover md:object-contain"
      />

      <AnimatePresence>
        {!started && (
          <motion.div
            key="cover"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-black/25 backdrop-blur-xl flex flex-col items-center justify-center px-6 text-center"
          >
            <h1
              className="text-6xl sm:text-7xl text-white leading-tight select-none mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              {config.baby.name}
            </h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              type="button"
              className="py-3.5 px-8 rounded-full bg-gradient-to-r from-[#C96F8C] via-[#E07D9B] to-[#C96F8C] text-white font-serif text-base font-semibold shadow-lg shadow-[#C96F8C]/30 cursor-pointer border border-white/40"
            >
              Abrir invitación 🎀
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
