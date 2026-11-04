import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoIntroScreenProps {
  videoSrc?: string;
  onFinish: () => void;
}

/** Solo el video a pantalla completa. Al terminar llama a onFinish. */
export const VideoIntroScreen: React.FC<VideoIntroScreenProps> = ({
  videoSrc = '/video/video-intro.mp4',
  onFinish,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Con sonido si el navegador lo permite; si no, silenciado.
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => onFinish());
    });

    // Primer toque activa el sonido si quedó silenciado.
    const unmute = () => {
      if (video.muted) video.muted = false;
    };
    window.addEventListener('pointerdown', unmute, { once: true });
    return () => window.removeEventListener('pointerdown', unmute);
  }, [onFinish]);

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
        onEnded={onFinish}
        onError={onFinish}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
};
