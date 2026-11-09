import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { INVITATION_CONFIG } from './config/invitation';
import { VideoIntroScreen } from './components/invitation/VideoIntroScreen';
import { PetalsRain } from './components/ui/PetalsRain';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { InvitationSections } from './components/invitation/InvitationSections';
import { VelocityMarquee } from './components/motion/VelocityMarquee';

export const App: React.FC = () => {
  const [introDone, setIntroDone] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const numScale = useSpring(useTransform(scrollY, [0, 500], [1, 1.5]), { stiffness: 80, damping: 20 });
  const numRotate = useTransform(scrollY, [0, 700], [0, -8]);
  const numY = useTransform(scrollY, [0, 700], [0, 120]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden';
    if (introDone) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDone]);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-transparent text-[#6B514C] flex flex-col items-center selection:bg-[#F6C8D4] selection:text-[#6B514C]">
      <SmoothScroll enabled={introDone} />

      {/* Barra de progreso de scroll */}
      {introDone && (
        <motion.div
          style={{ scaleX: progress }}
          className="fixed top-0 left-0 right-0 h-1 z-40 origin-left bg-[#DB7093]"
        />
      )}

      {/* Background Wallpaper */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/images/body-background.webp')" }}
        aria-hidden="true"
      />

      {/* Background Falling Petals Animation */}
      {INVITATION_CONFIG.features.enablePetalsAnimation && <PetalsRain />}

      {/* Header Fixed: Lazo floral */}
      {introDone && (
        <header className="fixed top-0 left-0 right-0 z-30 flex justify-center pointer-events-none select-none">
          <img
            src="/images/hedaer-lazo.webp"
            alt="Header lazo floral"
            className="w-full max-w-lg object-contain object-top drop-shadow-sm"
          />
        </header>
      )}

      {/* Footer Fixed: Conejita */}
      {introDone && (
        <footer className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none select-none">
          <img
            src="/images/footer-coneja.webp"
            alt="Footer conejita"
            className="w-full max-w-lg object-contain object-bottom max-h-[38vh] drop-shadow-sm"
          />
        </footer>
      )}

      {/* Intro Video Screen */}
      <AnimatePresence>
        {!introDone && (
          <VideoIntroScreen
            config={INVITATION_CONFIG}
            videoSrc="/video/video-intro.mp4"
            onFinish={() => setIntroDone(true)}
          />
        )}
      </AnimatePresence>

      {/* Invitación con scroll y cabecera/pie fijos */}
      {introDone && (
        <motion.main
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg min-h-screen px-4 pt-56 sm:pt-60 pb-60 sm:pb-72 flex flex-col items-center"
        >
          <div className="w-full flex flex-col items-center gap-4">
            {/* Título en acrílico 3D con fuente Alex Brush */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4"
            >
              <h1
                className="acrylic-cutout-title text-7xl sm:text-8xl md:text-9xl leading-[1.05] select-none tracking-wide"
                style={{ fontFamily: 'var(--font-joseph)' }}
              >
                {INVITATION_CONFIG.baby.name}
              </h1>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ scale: numScale, rotate: numRotate, y: numY }}
              src="/images/numero_1.webp"
              alt="Número 1 primer añito"
              className="w-44 sm:w-52 md:w-60 h-auto object-contain drop-shadow-md select-none"
            />

            <div className="mt-28 w-full">
              <VelocityMarquee
                text={`Mahelet · ${INVITATION_CONFIG.baby.ageTitle}`}
                className="text-6xl font-black tracking-tight text-[#DB7093]/20"
              />
            </div>

            <InvitationSections config={INVITATION_CONFIG} />
          </div>
        </motion.main>
      )}
    </div>
  );
};

export default App;
