import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_CONFIG } from './config/invitation';
import { VideoIntroScreen } from './components/invitation/VideoIntroScreen';
import { PinterestCardHero } from './components/invitation/PinterestCardHero';
import { SpecialMessage } from './components/invitation/SpecialMessage';
import { CountdownSection } from './components/invitation/CountdownSection';
import { EventDetails } from './components/invitation/EventDetails';
import { RSVPSection } from './components/invitation/RSVPSection';
import { PhotoGallery } from './components/invitation/PhotoGallery';
import { RecommendationsSection } from './components/invitation/RecommendationsSection';
import { InvitationFooter } from './components/invitation/InvitationFooter';
import { GiftInfoModal } from './components/invitation/GiftInfoModal';
import { PetalsRain } from './components/ui/PetalsRain';

export const App: React.FC = () => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const rsvpSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = introDone ? '' : 'hidden';
    if (introDone) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = '';
    };
  }, [introDone]);

  const handleScrollToRSVP = () => {
    if (rsvpSectionRef.current) {
      rsvpSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F8EBF0] text-[#6B514C] flex flex-col items-center selection:bg-[#F6C8D4] selection:text-[#6B514C] pb-12">
      {/* Background Falling Petals Animation */}
      {INVITATION_CONFIG.features.enablePetalsAnimation && <PetalsRain />}

      <AnimatePresence>
        {!introDone && (
          <VideoIntroScreen
            videoSrc="/video/video-intro.mp4"
            onFinish={() => setIntroDone(true)}
          />
        )}
      </AnimatePresence>

      {/* Invitación (visible solo cuando termina el video) */}
      {introDone && (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg px-2 sm:px-4 py-4 sm:py-6 flex flex-col items-center"
      >
        {/* 2. Interactive Pinterest Card Header & Quick Actions */}
        <div ref={cardSectionRef} className="w-full">
          <PinterestCardHero
            config={INVITATION_CONFIG}
            onOpenRSVP={handleScrollToRSVP}
            onOpenGifts={() => setIsGiftModalOpen(true)}
          />
        </div>

        {/* 3. Emotional Special Message */}
        <SpecialMessage config={INVITATION_CONFIG} />

        {/* 4. Live Dynamic Countdown */}
        {INVITATION_CONFIG.features.enableCountdown && (
          <CountdownSection config={INVITATION_CONFIG} />
        )}

        {/* 5. Complete Event Details (Date, Location, Dress Code, Calendar & Maps) */}
        <EventDetails config={INVITATION_CONFIG} />

        {/* 6. RSVP Confirmation Form via WhatsApp */}
        <div ref={rsvpSectionRef} className="w-full">
          <RSVPSection config={INVITATION_CONFIG} />
        </div>

        {/* 7. Baby Memories Photo Gallery */}
        {INVITATION_CONFIG.features.enablePhotoGallery && (
          <PhotoGallery config={INVITATION_CONFIG} />
        )}

        {/* 8. Recommendations for Guests */}
        {INVITATION_CONFIG.features.enableRecommendations && (
          <RecommendationsSection config={INVITATION_CONFIG} />
        )}

        {/* 9. Memorable Closing Storybook Footer */}
        <InvitationFooter config={INVITATION_CONFIG} />
      </motion.main>
      )}

      {/* Gift and Envelope Info Modal */}
      <GiftInfoModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        babyName={INVITATION_CONFIG.baby.name}
      />
    </div>
  );
};

export default App;
