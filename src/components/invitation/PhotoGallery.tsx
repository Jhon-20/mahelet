import React from 'react';
import { motion } from 'framer-motion';
import type { InvitationConfig } from '../../types/invitation';

interface PhotoGalleryProps {
  config: InvitationConfig;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ config }) => {
  if (!config.features.enablePhotoGallery || config.photos.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="mb-8 px-6 text-center">
        <p className="eyebrow">Recuerdos</p>
        <h2 className="display-title mt-2 text-5xl text-mulberry sm:text-6xl">
          Un año de <span className="font-script text-rose-deep">amor</span>
        </h2>
        <p className="font-serif mt-3 text-lg italic text-muted">Pequeños destellos de su primer año</p>
      </div>

      {/* Horizontal snap carousel */}
      <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-6 sm:justify-center">
        {config.photos.map((photo, index) => (
          <motion.figure
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`group relative w-56 shrink-0 snap-center sm:w-48 ${index % 2 === 1 ? 'sm:mt-10' : ''}`}
          >
            <div className="arch relative aspect-[3/4] overflow-hidden border-[5px] border-white shadow-[0_24px_40px_-22px_rgba(74,37,53,0.5)]">
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mulberry/55 via-transparent to-transparent" />
              {photo.monthOrStage && (
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-rose-deep backdrop-blur">
                  {photo.monthOrStage}
                </span>
              )}
            </div>
            <figcaption className="font-serif mt-3 text-center text-lg italic text-mulberry">
              {photo.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
};
