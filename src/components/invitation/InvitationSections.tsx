import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import { PartyCalendar } from './PartyCalendar';
import { YapeCopy } from './YapeCopy';
import type { InvitationConfig } from '../../types/invitation';
import type { Guest } from '../../utils/guest';
import { SplitReveal } from '../motion/SplitReveal';
import { ScrollFillText } from '../motion/ScrollFillText';
import { Magnetic } from '../motion/MagneticButton';
import { StackCard } from '../motion/StackCard';
import { Sticker } from '../ui/Sticker';
import { HorizontalScroll } from '../motion/HorizontalScroll';
import { RollText } from '../motion/RollText';
import confetti from 'canvas-confetti';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Aparece desde abajo (fade + slide) al entrar en pantalla. Sin clip-path: el observador puede no detectar elementos recortados. */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 1, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Title: React.FC<{ children: string }> = ({ children }) => (
  <h2 className="text-5xl sm:text-6xl text-[#C2577A] leading-tight text-center mb-5">
    <SplitReveal text={children} />
  </h2>
);

/**
 * Tarjeta con el marco ovalado card.webp (736×979) en su proporción original, sin estirar.
 * El contenido va en el rectángulo que cabe dentro del óvalo rosa, centrado; sus tamaños
 * usan cqw (ancho de la tarjeta) para escalar junto con el marco.
 */
const FrameCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="@container relative aspect-[736/979] w-full">
    <img
      src="/images/card.webp"
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full select-none drop-shadow-[0_10px_18px_rgba(194,87,122,0.22)]"
    />
    <div className="absolute inset-x-[17%] inset-y-[14%] flex flex-col items-center justify-center text-center">
      {children}
    </div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`relative w-full rounded-[2rem] border border-white/80 bg-white/55 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(194,87,122,0.35)] p-6 text-center ${className}`}
  >
    {children}
  </div>
);

const useCountdown = (iso: string) => {
  const target = new Date(iso).getTime();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    done: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex-1 rounded-2xl bg-white/70 py-3">
    <p className="text-3xl font-semibold tabular-nums text-[#C2577A]">{String(value).padStart(2, '0')}</p>
    <p className="text-[0.65rem] uppercase tracking-widest text-[#947871]">{label}</p>
  </div>
);

export const InvitationSections: React.FC<{ config: InvitationConfig; guest?: Guest | null }> = ({ config, guest }) => {
  const { days, hours, minutes, seconds, done } = useCountdown(config.schedule.date);
  // Con invitación personal el mensaje lleva el nombre y los pases
  const who = !guest
    ? 'Confirmo mi asistencia'
    : guest.passes === 1
      ? `Soy ${guest.name} y confirmo mi asistencia`
      : `Somos ${guest.name} y confirmamos nuestra asistencia (${guest.passes} pases)`;
  const rsvpText =
    `¡Hola! 🎀 ${who} al primer añito de ${config.baby.name} ` +
    `el ${config.schedule.displayDate} a las ${config.schedule.time}. ¡Ahí nos vemos! 🐰💕`;
  const rsvpUrl = `https://wa.me/${config.whatsapp.phoneNumber}?text=${encodeURIComponent(rsvpText)}`;

  // Confeti pastel que sale desde el botón antes de abrir WhatsApp
  const celebrate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    confetti({
      particleCount: 90,
      spread: 75,
      startVelocity: 35,
      origin: { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight },
      colors: ['#F6C8D4', '#DB7093', '#FFFFFF', '#EADBCB', '#F2B5C8'],
      shapes: ['circle'],
      scalar: 0.9,
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-24 mt-16">
      <Reveal className="relative w-full">
        <Sticker src="/images/mariposa.webp" float="flutter" delay={0.3} className="absolute bottom-[8%] right-0 z-10 w-12" />
        <FrameCard>
          <Sticker src="/images/nube.webp" float="bob" className="mb-[2cqw] w-[22cqw] shrink-0" />
          <ScrollFillText
            text={config.quotes.emotionalMessage}
            className="text-[4cqw] leading-[1.55] text-[#6B514C]"
          />
        </FrameCard>
      </Reveal>

      <StackCard index={0}>
        <Reveal className="w-full">
        <Title>Cuándo y dónde</Title>
        <Card className="flex flex-col gap-5">
          <Sticker src="/images/carruaje.webp" float="sway" enter="left" className="mx-auto -mt-2 w-36" />
          <PartyCalendar iso={config.schedule.date} time={config.schedule.time} />
          <div className="flex items-center justify-center gap-3 text-[#6B514C]">
            <MapPin className="size-6 text-[#C2577A]" />
            <p className="text-lg font-medium">{config.location.venueName}</p>
          </div>
          {config.features.enableGoogleMaps && (
            <div className="mx-auto mt-1">
              <Magnetic>
                <a
                  href={config.location.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-block rounded-full bg-[#DB7093] px-7 py-3 text-white font-medium shadow-[3px_4px_0_0_#B8587A] active:translate-y-0.5"
                >
                  <RollText text="Cómo llegar" />
                </a>
              </Magnetic>
            </div>
          )}
        </Card>
      </Reveal>
      </StackCard>

      {config.features.enableCountdown && (
        <StackCard index={1}><Reveal className="w-full">
          <Title>Falta poquito</Title>
          <Card>
            <Sticker src="/images/mariposa.webp" float="flutter" className="absolute -top-6 -right-3 w-12" />
            <Sticker src="/images/mariposa.webp" float="flutter" delay={0.8} flip className="absolute -bottom-6 -left-3 w-10" />
            {done ? (
              <p className="text-2xl text-[#C2577A]">¡Hoy es el gran día! 🎉</p>
            ) : (
              <div className="flex gap-2">
                <Unit value={days} label="días" />
                <Unit value={hours} label="horas" />
                <Unit value={minutes} label="min" />
                <Unit value={seconds} label="seg" />
              </div>
            )}
          </Card>
        </Reveal></StackCard>
      )}

      <StackCard index={2}>
        <Reveal className="w-full">
        <Title>Vestimenta</Title>
        <Card>
          <Sticker src="/images/coneja.webp" float="sway" className="mx-auto -mt-2 mb-3 w-24" />
          <p className="text-[#6B514C]">{config.dressCode.description}</p>
          <div className="mt-4 flex justify-center gap-3">
            {config.dressCode.paletteColors?.map((c) => (
              <span
                key={c.hex}
                title={c.name}
                className="size-8 rounded-full border-2 border-white shadow"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </Card>
      </Reveal>
      </StackCard>

      <StackCard index={3} last>
        <Reveal className="w-full">
        <Title>¿Nos acompañas?</Title>
        <Card>
          <Sticker src="/images/globo.webp" float="drift" className="mx-auto -mt-2 mb-3 w-24" />
          <p className="text-3xl leading-snug text-balance text-[#C2577A]" style={{ fontFamily: 'var(--font-joseph)' }}>
            Nos encantaría celebrar contigo
          </p>
          <p className="mt-2 text-sm text-[#947871]">Confírmanos con un toquecito 💌</p>

          <div className="relative mx-auto mt-7 w-fit">
            {/* Ondas que "laten" detrás del botón para invitar a tocarlo */}
            {[0, 1].map((i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-[#DB7093]/40"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: i * 1.1 }}
              />
            ))}
            <Magnetic>
              <a
                href={rsvpUrl}
                target="_blank"
                rel="noreferrer"
                onClick={celebrate}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-[#E88FAB] to-[#C2577A] px-8 py-4 text-lg font-semibold text-white shadow-[0_5px_0_0_#A9466A,0_14px_28px_-10px_rgba(194,87,122,0.7)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_0_#A9466A]"
                style={{ fontFamily: 'var(--font-button)' }}
              >
                {/* Brillo que cruza el botón cada pocos segundos */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/55 to-transparent"
                  animate={{ x: ['0%', '520%'] }}
                  transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                />
                <motion.span
                  className="relative"
                  animate={{ rotate: [0, -14, 10, -6, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.6 }}
                >
                  <MessageCircle className="size-6" />
                </motion.span>
                <span className="relative">
                  <RollText text="¡Sí, ahí estaré!" />
                </span>
              </a>
            </Magnetic>
          </div>

          <p className="mt-6 text-xs text-[#947871]">Se abrirá WhatsApp con tu mensaje listo ✨</p>
        </Card>
      </Reveal>
      </StackCard>

      <Reveal className="w-full">
        <Title>Un detallito</Title>
        <Card className="flex flex-col gap-5">
          <Sticker src="/images/regalo.webp" float="bob" className="mx-auto -mt-4 -mb-4 w-52" />
          <p className="text-balance text-[#6B514C]">{config.gifts.message}</p>
          <YapeCopy number={config.gifts.yapeNumber} name={config.gifts.yapeName} />
        </Card>
      </Reveal>

      <HorizontalScroll header={<Title>Antes de venir</Title>}>
        {config.recommendations.map((r, i) => (
          <Card key={r.id} className="!w-[75vw] max-w-[18rem] shrink-0 !p-5 !text-left">
            <p className="text-5xl font-semibold leading-none text-[#F2B5C8]" style={{ fontFamily: 'var(--font-button)' }}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="mt-3 font-semibold text-[#C2577A]">{r.title}</p>
            <p className="mt-1 text-sm text-[#6B514C]">{r.description}</p>
          </Card>
        ))}
        <Sticker src="/images/Baby.webp" float="sway" className="w-16 shrink-0 self-end sm:w-20" />
      </HorizontalScroll>

      <Reveal className="w-full">
        <div className="relative text-center">
          <Sticker src="/images/mariposa.webp" float="flutter" className="absolute -top-4 left-2 w-10" />
          <Sticker src="/images/mariposa.webp" float="flutter" delay={0.6} flip className="absolute top-6 right-2 w-12" />
          <Heart className="mx-auto mb-3 size-6 fill-[#DB7093] text-[#DB7093]" />
          <p className="text-4xl text-[#C2577A]" style={{ fontFamily: 'var(--font-joseph)' }}>
            ¡Te esperamos!
          </p>
          <p className="mt-2 text-[#6B514C]">{config.quotes.closingDedication}</p>
        </div>
      </Reveal>
    </div>
  );
};
