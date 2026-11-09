import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, MapPin, Shirt, MessageCircle, Heart } from 'lucide-react';
import type { InvitationConfig } from '../../types/invitation';

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

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-5xl sm:text-6xl text-[#C2577A] leading-tight text-center mb-5">{children}</h2>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div
    className={`w-full rounded-[2rem] border border-white/80 bg-white/55 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(194,87,122,0.35)] p-6 text-center ${className}`}
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

export const InvitationSections: React.FC<{ config: InvitationConfig }> = ({ config }) => {
  const { days, hours, minutes, seconds, done } = useCountdown(config.schedule.date);
  const [guest, setGuest] = useState('');
  const [count, setCount] = useState('1');

  const sendRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    const name = guest.trim();
    if (!name) return;
    const text =
      `¡Hola! Soy ${name} y confirmo mi asistencia al cumpleaños de ${config.baby.name} ` +
      `el ${config.schedule.displayDate} a las ${config.schedule.time}. Asistiremos ${count} persona(s). 🎀`;
    window.open(`https://wa.me/${config.whatsapp.phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="w-full flex flex-col items-center gap-24 mt-16">
      <Reveal>
        <Card>
          <p className="text-lg leading-relaxed text-[#6B514C]">{config.quotes.emotionalMessage}</p>
          <p className="mt-4 text-sm text-[#947871]">{config.baby.parentsNames}</p>
        </Card>
      </Reveal>

      <Reveal className="w-full">
        <Title>Cuándo y dónde</Title>
        <Card className="flex flex-col gap-5">
          <div className="flex items-center justify-center gap-3 text-[#6B514C]">
            <CalendarDays className="size-6 text-[#C2577A]" />
            <p className="text-lg font-medium">{config.schedule.displayDate}</p>
          </div>
          <div className="flex items-center justify-center gap-3 text-[#6B514C]">
            <Clock className="size-6 text-[#C2577A]" />
            <p className="text-lg font-medium">{config.schedule.time}</p>
          </div>
          <div className="flex items-center justify-center gap-3 text-[#6B514C]">
            <MapPin className="size-6 text-[#C2577A]" />
            <p className="text-lg font-medium">{config.location.venueName}</p>
          </div>
          {config.features.enableGoogleMaps && (
            <a
              href={config.location.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mx-auto mt-1 rounded-full bg-[#DB7093] px-7 py-3 text-white font-medium shadow-[3px_4px_0_0_#B8587A] active:translate-y-0.5"
            >
              Cómo llegar
            </a>
          )}
        </Card>
      </Reveal>

      {config.features.enableCountdown && (
        <Reveal className="w-full">
          <Title>Falta poquito</Title>
          <Card>
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
        </Reveal>
      )}

      <Reveal className="w-full">
        <Title>Vestimenta</Title>
        <Card>
          <Shirt className="mx-auto mb-3 size-6 text-[#C2577A]" />
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

      <Reveal className="w-full">
        <Title>¿Nos acompañas?</Title>
        <Card>
          <form onSubmit={sendRSVP} className="flex flex-col gap-3 text-left">
            <input
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              placeholder="Tu nombre"
              required
              className="rounded-2xl border border-[#F2B5C8] bg-white/80 px-4 py-3 outline-none focus:border-[#C2577A]"
            />
            <select
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="rounded-2xl border border-[#F2B5C8] bg-white/80 px-4 py-3 outline-none focus:border-[#C2577A]"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'persona' : 'personas'}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#DB7093] px-7 py-3 text-white font-medium shadow-[3px_4px_0_0_#B8587A] active:translate-y-0.5"
            >
              <MessageCircle className="size-5" /> Confirmar por WhatsApp
            </button>
          </form>
        </Card>
      </Reveal>

      <Reveal className="w-full">
        <Title>Antes de venir</Title>
        <div className="flex flex-col gap-3">
          {config.recommendations.map((r) => (
            <Card key={r.id} className="!p-4">
              <p className="font-semibold text-[#C2577A]">{r.title}</p>
              <p className="mt-1 text-sm text-[#6B514C]">{r.description}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal className="w-full">
        <div className="text-center">
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
