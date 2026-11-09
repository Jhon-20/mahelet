import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OpenInvitationButton } from '../ui/OpenInvitationButton';
import type { InvitationConfig } from '../../types/invitation';

interface VideoIntroScreenProps {
  config: InvitationConfig;
  videoSrc?: string;
  onFinish: () => void;
  /** Se llama dentro del toque en "Abrir invitación" (sirve para desbloquear el audio en iOS). */
  onOpen?: () => void;
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
  onOpen,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const handleOpen = () => {
    onOpen?.();
    const video = videoRef.current;
    if (!video) {
      onFinish();
      return;
    }
    setStarted(true);
    video.currentTime = 0;
    video.muted = false;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si el navegador bloquea el audio automático, intentamos silenciado
        video.muted = true;
        video.play().catch(() => {
          onFinish();
        });
      });
    }
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
        src={videoSrc}
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
        onError={(e) => {
          console.warn('Video error:', e);
          if (started) {
            onFinish();
          }
        }}
        className="h-[100dvh] w-full object-cover md:object-contain"
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
              className="text-6xl sm:text-7xl text-white leading-tight select-none mb-10 drop-shadow-[0_4px_0_rgba(201,111,140,0.9)] [text-shadow:0_0_18px_rgba(0,0,0,0.25)]"
              style={{ fontFamily: 'var(--font-joseph)' }}
            >
              {config.baby.name}
            </h1>
            <OpenInvitationButton onClick={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
