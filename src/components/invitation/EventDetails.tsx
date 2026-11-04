import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowUpRight, CalendarPlus, Sparkles, Palette, Check } from 'lucide-react';
import { getDirectionsUrl } from '../../utils/maps';
import { getGoogleCalendarUrl, downloadIcsFile } from '../../utils/calendar';
import type { InvitationConfig } from '../../types/invitation';

interface EventDetailsProps {
  config: InvitationConfig;
}

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay: i * 0.08 },
});

export const EventDetails: React.FC<EventDetailsProps> = ({ config }) => {
  const [downloadedIcs, setDownloadedIcs] = useState(false);

  const googleMapsUrl = getDirectionsUrl(config.location);
  const googleCalUrl = getGoogleCalendarUrl(config.baby.name, config.schedule, config.location);

  const handleDownloadIcs = () => {
    downloadIcsFile(config.baby.name, config.schedule, config.location);
    setDownloadedIcs(true);
    setTimeout(() => setDownloadedIcs(false), 3000);
  };

  // "Sábado, 28 de Noviembre de 2026" -> split for big display
  const dateObj = new Date(config.schedule.date);
  const day = isNaN(dateObj.getTime()) ? '' : String(dateObj.getDate());
  const month = isNaN(dateObj.getTime())
    ? ''
    : dateObj.toLocaleDateString('es-PE', { month: 'long' });

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <motion.div {...reveal()} className="mb-10 text-center">
          <p className="eyebrow">Detalles</p>
          <h2 className="display-title mt-2 text-5xl text-mulberry sm:text-6xl">
            Cuándo <span className="font-script text-rose-deep">&</span> dónde
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Date: big tile */}
          <motion.div
            {...reveal(0)}
            className="glass relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-5"
          >
            <Calendar className="h-5 w-5 text-rose-deep" />
            <div className="mt-8">
              <p className="font-serif text-7xl font-medium leading-none text-mulberry">{day}</p>
              <p className="font-serif mt-1 text-2xl capitalize italic text-rose-deep">{month}</p>
              <p className="mt-1 text-xs text-muted">{config.schedule.displayDate.split(',')[0]} · 2026</p>
            </div>
          </motion.div>

          {/* Time tile */}
          <motion.div
            {...reveal(1)}
            className="relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-blush p-5"
          >
            <Clock className="h-5 w-5 text-mulberry" />
            <div className="mt-8">
              <p className="font-serif text-4xl font-medium leading-none text-mulberry">
                {config.schedule.time}
              </p>
              {config.schedule.endTime && (
                <p className="mt-2 text-xs text-mulberry-soft">hasta las {config.schedule.endTime}</p>
              )}
            </div>
          </motion.div>

          {/* Location tile */}
          <motion.div
            {...reveal(2)}
            className="glass col-span-2 rounded-[1.75rem] p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-rose-deep">
                <MapPin className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="eyebrow">Lugar</p>
                <h3 className="font-serif mt-1 text-2xl font-semibold leading-tight text-mulberry">
                  {config.location.venueName}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {config.location.address}, {config.location.city}
                </p>
                {config.location.notes && (
                  <p className="font-serif mt-3 text-sm italic text-rose-deep">{config.location.notes}</p>
                )}
                {config.features.enableGoogleMaps && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost mt-4"
                  >
                    Cómo llegar
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Dress code tile */}
          <motion.div
            {...reveal(3)}
            className="col-span-2 rounded-[1.75rem] border border-rose/40 bg-paper/60 p-6"
          >
            <div className="flex items-center gap-2 text-rose-deep">
              <Palette className="h-4 w-4" />
              <p className="eyebrow">{config.dressCode.title}</p>
            </div>
            <p className="font-serif mt-2 text-lg leading-snug text-mulberry">
              {config.dressCode.description}
            </p>
            {config.dressCode.paletteColors && (
              <div className="mt-5 flex items-center gap-3">
                {config.dressCode.paletteColors.map((color) => (
                  <div key={color.name} className="group flex flex-col items-center gap-1.5">
                    <span
                      className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-110 sm:h-12 sm:w-12"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="hidden text-[0.6rem] text-muted sm:block">{color.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {config.features.enableAddToCalendar && (
          <motion.div {...reveal(4)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <CalendarPlus className="h-4 w-4 text-rose-deep" />
              Google Calendar
            </a>
            <button type="button" onClick={handleDownloadIcs} className="btn-ghost">
              {downloadedIcs ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Sparkles className="h-4 w-4 text-rose-deep" />
              )}
              {downloadedIcs ? '¡Descargado!' : 'Apple / Outlook'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
