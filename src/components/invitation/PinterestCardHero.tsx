import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, CalendarPlus, Gift } from 'lucide-react';
import type { InvitationConfig } from '../../types/invitation';
import { getDirectionsUrl } from '../../utils/maps';
import { getGoogleCalendarUrl } from '../../utils/calendar';

interface PinterestCardHeroProps {
  config: InvitationConfig;
  onOpenRSVP: () => void;
  onOpenGifts: () => void;
}

export const PinterestCardHero: React.FC<PinterestCardHeroProps> = ({
  config,
  onOpenRSVP,
  onOpenGifts,
}) => {
  const eventDate = new Date(config.schedule.date);
  const isValidDate = !isNaN(eventDate.getTime());

  const dayOfWeek = isValidDate
    ? eventDate.toLocaleDateString('es-ES', { weekday: 'long' })
    : 'Sábado';
  const capitalizedDayOfWeek =
    dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  const dayNumber = isValidDate ? eventDate.getDate() : 28;
  const monthAbbr = isValidDate
    ? eventDate.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase().replace('.', '')
    : 'NOV';

  const googleMapsUrl = getDirectionsUrl(config.location);
  const googleCalUrl = getGoogleCalendarUrl(
    config.baby.name,
    config.schedule,
    config.location
  );

  return (
    <section className="relative w-full max-w-md mx-auto my-4 px-2 sm:px-0">

    </section>
  );
};

function ButterflyIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 14 C12 6, 2 6, 4 15 C 6 22, 14 20, 16 26 C 18 20, 26 22, 28 15 C 30 6, 20 6, 16 14 Z"
        opacity="0.85"
      />
      <circle cx="16" cy="18" r="1.5" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}
