import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, Shirt, Sparkles, Heart, Camera } from 'lucide-react';
import type { InvitationConfig, RecommendationItem } from '../../types/invitation';

interface RecommendationsSectionProps {
  config: InvitationConfig;
}

const iconMap = {
  clock: Clock,
  gift: Gift,
  shirt: Shirt,
  sparkles: Sparkles,
  heart: Heart,
  camera: Camera,
};

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ config }) => {
  if (!config.features.enableRecommendations || config.recommendations.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="mb-10 text-center">
          <p className="eyebrow">Para los invitados</p>
          <h2 className="display-title mt-2 text-5xl text-mulberry sm:text-6xl">
            Antes de <span className="font-script text-rose-deep">venir</span>
          </h2>
        </div>

        <div className="divide-y divide-rose/30 overflow-hidden rounded-[1.75rem] border border-rose/30 bg-paper/60">
          {config.recommendations.map((item: RecommendationItem, i) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 p-5 transition-colors hover:bg-white/70"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-rose-deep">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-xl font-semibold leading-tight text-mulberry">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
