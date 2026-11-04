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
      <div className="relative w-full rounded-[36px] sm:rounded-[44px] overflow-hidden luxury-invitation-frame polka-dot-bg shadow-xl">
        {/* Top Watercolor Rose Garland */}
        <div className="w-full relative select-none">
          <img
            src="/images/floral-top-garland.jpg"
            alt="Guirnalda de rosas en acuarela"
            className="w-full h-auto max-h-36 sm:max-h-44 object-cover object-top opacity-95"
          />
        </div>

        {/* Floating Pink Butterflies */}
        <div className="absolute top-28 left-4 sm:left-6 animate-flutter-left select-none pointer-events-none" aria-hidden="true">
          <ButterflyIcon className="w-6 h-6 text-[#F08FA8] drop-shadow-sm rotate-[-15deg]" />
        </div>
        <div className="absolute top-24 right-5 sm:right-7 animate-flutter-right select-none pointer-events-none" aria-hidden="true">
          <ButterflyIcon className="w-7 h-7 text-[#F5A3B8] drop-shadow-sm rotate-[20deg]" />
        </div>
        <div className="absolute top-72 left-3 sm:left-5 animate-flutter-right select-none pointer-events-none" aria-hidden="true">
          <ButterflyIcon className="w-6 h-6 text-[#F08FA8] drop-shadow-sm rotate-[12deg]" />
        </div>
        <div className="absolute top-80 right-3 sm:right-5 animate-flutter-left select-none pointer-events-none" aria-hidden="true">
          <ButterflyIcon className="w-6 h-6 text-[#F5A3B8] drop-shadow-sm rotate-[-25deg]" />
        </div>

        {/* Soft pastel stars */}
        <div className="absolute top-44 left-10 text-[#F6C8D4] text-xs pointer-events-none" aria-hidden="true">★</div>
        <div className="absolute top-40 right-12 text-[#F6C8D4] text-xs pointer-events-none" aria-hidden="true">★</div>
        <div className="absolute top-64 right-10 text-[#F9D5E0] text-sm pointer-events-none" aria-hidden="true">★</div>

        {/* Center: Adorable Bunny sitting on flowers */}
        <div className="relative -mt-10 sm:-mt-14 mb-2 flex justify-center px-4">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-64 h-64 sm:w-72 sm:h-72 select-none"
          >
            <img
              src="/images/bunny-floral-crown.jpg"
              alt={`Conejita con corona de flores para ${config.baby.name}`}
              className="w-full h-full object-contain filter drop-shadow-md rounded-full"
            />
          </motion.div>
        </div>

        {/* Protagonist Name in 3D Gold Foil */}
        <div className="text-center px-4 relative z-10 -mt-2 sm:-mt-4 mb-4">
          <h1
            className="font-script text-6xl sm:text-7xl lg:text-8xl gold-foil-text tracking-wide select-none leading-none py-1"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {config.baby.name}
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-[#C96F8C] tracking-widest uppercase mt-1">
            {config.baby.ageTitle || 'Mi Primer Añito'}
          </p>
        </div>

        {/* Editorial Date & Time Block between dotted lines (like reference pin) */}
        <div className="mx-6 sm:mx-10 my-4">
          <div className="border-t-2 border-dotted border-[#D5B5BE]/60 w-full mb-3" />

          <div className="flex items-center justify-between px-2 sm:px-4 py-1">
            {/* Left Column: Day of week (vertical), date number, month */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span
                className="font-script text-2xl sm:text-3xl text-[#C96F8C] select-none -rotate-90 origin-center -ml-2 -mr-1"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {capitalizedDayOfWeek}
              </span>

              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#E57399] leading-none tracking-tight">
                  {dayNumber}
                </span>
                <span className="font-serif text-xs sm:text-sm font-bold text-[#6B514C] tracking-widest mt-0.5">
                  {monthAbbr}
                </span>
              </div>
            </div>

            {/* Middle vertical dotted line */}
            <div className="h-16 border-l-2 border-dotted border-[#D5B5BE]/60 mx-2" />

            {/* Right Column: Time with stars, and "Regalo o Sobre" */}
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1.5 text-[#E57399] font-serif font-bold text-base sm:text-lg">
                <span className="text-[#F6C8D4] text-xs">★</span>
                <span>{config.schedule.time}</span>
                <span className="text-[#F6C8D4] text-xs">★</span>
              </div>

              <span className="text-xs font-serif text-[#6B514C] mt-1 font-medium">
                Regalo o Sobre
              </span>

              {/* Linear Rosy Icons */}
              <div className="flex items-center gap-3 mt-1.5 text-[#E57399]">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12v10H4V12" />
                  <path d="M2 7h20v5H2z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>

                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                  <circle cx="12" cy="12" r="2.5" fill="#F6C8D4" stroke="none" />
                </svg>
              </div>
            </div>
          </div>

          <div className="border-b-2 border-dotted border-[#D5B5BE]/60 w-full mt-3" />
        </div>

        {/* Location Text */}
        <div className="text-center px-6 mt-3 mb-5">
          <p className="font-serif text-sm font-semibold text-[#6B514C]">
            {config.location.venueName}
          </p>
          <p className="font-serif italic text-xs text-[#947871] mt-0.5">
            {config.location.address}, {config.location.city}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="px-5 sm:px-8 pb-8 space-y-2.5 relative z-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-full bg-white border border-[#E9A7B8] text-[#C96F8C] font-serif text-sm font-medium shadow-sm hover:bg-[#FFF5F8] transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#C96F8C]" />
            <span>Ver Ubicación (Google Maps)</span>
          </a>

          <button
            type="button"
            onClick={onOpenRSVP}
            className="w-full py-3.5 px-5 rounded-full bg-gradient-to-r from-[#C96F8C] via-[#E07D9B] to-[#C96F8C] text-white font-serif text-sm sm:text-base font-semibold shadow-md shadow-[#C96F8C]/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Asistencia (WhatsApp)</span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={googleCalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-full bg-white/80 border border-[#E9A7B8]/60 text-xs font-serif text-[#6B514C] hover:bg-white text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-[#C96F8C]" />
              <span>Agendar</span>
            </a>

            <button
              type="button"
              onClick={onOpenGifts}
              className="py-2.5 px-3 rounded-full bg-white/80 border border-[#E9A7B8]/60 text-xs font-serif text-[#6B514C] hover:bg-white text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Gift className="w-3.5 h-3.5 text-[#C96F8C]" />
              <span>Lluvia de Sobres</span>
            </button>
          </div>
        </div>

        {/* Bottom Accents */}
        <div className="relative w-full h-10 flex justify-between items-end px-4 select-none pointer-events-none -mt-4 mb-2">
          <span className="text-2xl opacity-80 rotate-[-15deg]">🌸</span>
          <span className="text-xs text-[#E9A7B8] font-serif italic opacity-80">
            ¡Te esperamos con amor! 🎀
          </span>
          <span className="text-2xl opacity-80 rotate-[15deg]">🌸</span>
        </div>
      </div>
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
