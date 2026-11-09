import React from 'react';
import type { InvitationConfig } from '../../types/invitation';

interface PinterestCardHeroProps {
  config?: InvitationConfig;
  onOpenRSVP?: () => void;
  onOpenGifts?: () => void;
}

export const PinterestCardHero: React.FC<PinterestCardHeroProps> = () => {
  return (
    <section className="relative w-full max-w-md mx-auto my-4 px-2 sm:px-0" />
  );
};
