import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Heart, HeartCrack, Mail, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

type Status = 'idle' | 'sending' | 'sent';

interface Props {
  /** Construye el texto según la respuesta elegida */
  buildMessage: (attending: boolean) => string;
  phone: string;
}

const OPTIONS = [
  { value: true, label: 'Sí, asistiré', hint: '¡Qué alegría!', Icon: Heart },
  { value: false, label: 'No podré asistir', hint: 'Te extrañaremos', Icon: HeartCrack },
] as const;

/** Desplegable propio (en lugar del select nativo) con animación y teclado */
const AttendanceSelect: React.FC<{ value: boolean; onChange: (v: boolean) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-xs text-left"
      onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}
    >
      <span className="mb-1 block text-xs font-medium text-[#947871]">Tu respuesta</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-2xl border bg-white/80 px-4 py-3 text-left text-[#6B514C] shadow-sm transition-colors ${
          open ? 'border-[#DB7093]' : 'border-[#F2B5C8]'
        }`}
      >
        <current.Icon className={`size-5 shrink-0 text-[#DB7093] ${value ? 'fill-[#DB7093]' : ''}`} />
        <span className="flex-1 text-base font-medium">{current.label}</span>
        <ChevronDown className={`size-5 text-[#C2577A] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-[#F2B5C8] bg-[#FFF9F2] p-1.5 shadow-[0_14px_30px_-12px_rgba(194,87,122,0.45)]"
          >
            {OPTIONS.map(({ value: v, label, hint, Icon }) => {
              const selected = v === value;
              return (
                <li key={label} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(v);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      selected ? 'bg-[#F6C8D4]/60' : 'hover:bg-[#F6C8D4]/30'
                    }`}
                  >
                    <Icon className={`size-5 shrink-0 text-[#DB7093] ${v ? 'fill-[#DB7093]' : ''}`} />
                    <span className="flex-1">
                      <span className="block text-base font-medium text-[#6B514C]">{label}</span>
                      <span className="block text-xs text-[#947871]">{hint}</span>
                    </span>
                    {selected && <Check className="size-4 text-[#C2577A]" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

/**
 * Envía el mensaje a WhatsApp sin abrir la app, a través del Worker de Cloudflare.
 * Devuelve false si no hay endpoint configurado o el Worker no confirma el envío.
 */
const sendInBackground = async (text: string): Promise<boolean> => {
  if (!ENDPOINT) return false;
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = (await res.json()) as { ok?: boolean };
    return res.ok && data.ok === true;
  } catch {
    return false;
  }
};

const SEND_MS = 3400;

/** Sobre que se abre, recibe la carta, se sella con un corazón y sale volando */
const SendingEnvelope: React.FC = () => {
  const D = SEND_MS / 1000;
  // Línea de tiempo (0–1): aparece · abre · carta entra · cierra · sello · vuela
  const flight = {
    y: [0, 0, 0, 0, 0, -24, -190],
    x: [0, 0, 0, 0, 0, 0, 90],
    scale: [0.5, 1, 1, 1, 1.06, 1, 0.3],
    rotate: [0, 0, 0, 0, 0, -6, 18],
    opacity: [0, 1, 1, 1, 1, 1, 0],
  };
  const flightTimes = [0, 0.1, 0.3, 0.5, 0.62, 0.72, 1];
  return (
    <div className="relative h-44 w-full">
      {/* Estela de corazones y destellos tras el despegue */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute top-[58%] text-[#DB7093]"
          style={{ left: `${34 + i * 8}%`, fontSize: 12 + (i % 3) * 5 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, -60 - i * 14], x: [0, (i - 2) * 10] }}
          transition={{ delay: D * 0.72 + i * 0.1, duration: 0.9, ease: 'easeOut' }}
        >
          {i % 2 ? '✦' : '♥'}
        </motion.span>
      ))}

      <motion.div
        className="absolute left-1/2 top-[42%] -ml-[60px] -mt-[42px] h-[84px] w-[120px]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={flight}
        transition={{ duration: D, times: flightTimes, ease: 'easeInOut' }}
      >
        {/* Fondo interior del sobre */}
        <div className="absolute inset-0 rounded-lg bg-[#E8A3B8]" />

        {/* Carta que se desliza dentro */}
        <motion.div
          className="absolute left-3 right-3 top-1 h-[64px] rounded-md bg-[#FFF9F2] shadow-sm"
          initial={{ y: -58 }}
          animate={{ y: [-58, -58, 6, 6] }}
          transition={{ duration: D, times: [0, 0.3, 0.5, 1], ease: 'easeInOut' }}
        >
          <div className="mx-auto mt-3 h-1 w-3/4 rounded bg-[#F2B5C8]" />
          <div className="mx-auto mt-1.5 h-1 w-2/3 rounded bg-[#F2B5C8]/70" />
          <div className="mx-auto mt-1.5 h-1 w-1/2 rounded bg-[#F2B5C8]/50" />
        </motion.div>

        {/* Frente del sobre (bolsillo en V) */}
        <svg viewBox="0 0 120 84" className="absolute inset-0" aria-hidden="true">
          <path d="M0 8 L60 52 L120 8 L120 76 a8 8 0 0 1 -8 8 H8 a8 8 0 0 1 -8 -8 Z" fill="#F6C8D4" />
          <path d="M0 76 L52 40 M120 76 L68 40" stroke="#E8A3B8" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Solapa: empieza abierta (hacia arriba) y se cierra */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[46px]"
          style={{ transformOrigin: 'top center' }}
          initial={{ scaleY: -1 }}
          animate={{ scaleY: [-1, -1, 1, 1] }}
          transition={{ duration: D, times: [0, 0.1, 0.5, 1], ease: 'easeInOut' }}
        >
          <svg viewBox="0 0 120 46" className="h-full w-full" aria-hidden="true">
            <path d="M0 4 a4 4 0 0 1 4 -4 H116 a4 4 0 0 1 4 4 L60 46 Z" fill="#EFB3C5" stroke="#E8A3B8" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Sello de corazón */}
        <motion.div
          className="absolute left-1/2 top-[34px] -ml-3 flex size-6 items-center justify-center rounded-full bg-[#C2577A] text-[11px] text-white shadow"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 0, 1.3, 1, 1] }}
          transition={{ duration: D, times: [0, 0.5, 0.58, 0.64, 1] }}
        >
          ♥
        </motion.div>
      </motion.div>
    </div>
  );
};

/** Selector de asistencia + envío con animación de carta que vuela, y luego abre WhatsApp. */
export const RSVPLetter: React.FC<Props> = ({ buildMessage, phone }) => {
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [autoSent, setAutoSent] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach(clearTimeout);
  }, []);

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildMessage(attending))}`;

  const send = () => {
    if (status !== 'idle') return;
    setStatus('sending');
    // El envío real ocurre en segundo plano mientras corre la animación de la carta
    const delivery = sendInBackground(buildMessage(attending));
    timers.current.push(
      window.setTimeout(async () => {
        const ok = await delivery;
        setAutoSent(ok);
        setStatus('sent');
        if (attending) {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.7 },
            colors: ['#F6C8D4', '#DB7093', '#FFFFFF', '#EADBCB'],
            shapes: ['circle'],
          });
        }
        // Sin envío automático configurado (o si falló) se abre WhatsApp con el mensaje listo
        if (!ok) window.open(url, '_blank', 'noopener');
      }, SEND_MS),
    );
  };

  return (
    <div className="mt-6">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center gap-4">
            <AttendanceSelect value={attending} onChange={setAttending} />
            <button
              type="button"
              onClick={send}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#E88FAB] to-[#C2577A] px-8 py-4 text-lg font-semibold text-white shadow-[0_5px_0_0_#A9466A,0_14px_28px_-10px_rgba(194,87,122,0.7)] transition-transform active:translate-y-1 active:shadow-[0_2px_0_0_#A9466A]"
              style={{ fontFamily: 'var(--font-button)' }}
            >
              <Mail className="size-6" />
              Enviar confirmación
            </button>
          </motion.div>
        )}

        {status === 'sending' && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto flex w-full max-w-xs flex-col items-center"
          >
            <SendingEnvelope />
            <p className="mt-2 text-base font-medium text-[#C2577A]">
              Enviando tu mensaje
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                >
                  .
                </motion.span>
              ))}
            </p>
            <div className="mt-3 h-1.5 w-40 overflow-hidden rounded-full bg-[#F2B5C8]/40">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#E88FAB] to-[#C2577A]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: SEND_MS / 1000, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}

        {status === 'sent' && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex size-14 items-center justify-center rounded-full bg-[#DB7093] text-white">
              <Check className="size-8" />
            </div>
            <p className="text-2xl text-[#C2577A]" style={{ fontFamily: 'var(--font-joseph)' }}>
              ¡Mensaje enviado!
            </p>
            <p className="max-w-xs text-sm text-[#6B514C]">
              {attending ? '¡Gracias por confirmar, nos vemos pronto! 🐰💕' : 'Gracias por avisarnos, te enviamos un abrazo 💕'}
            </p>
            {!autoSent && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white"
              >
                <MessageCircle className="size-4" />
                Abrir WhatsApp si no se abrió
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
