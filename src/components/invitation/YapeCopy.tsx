import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Heart } from 'lucide-react';

/** Copia al portapapeles; si la API no está disponible (http, navegadores viejos) usa un textarea oculto. */
const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
};

const HEARTS = [
  { x: -46, r: -20, d: 0 },
  { x: 0, r: 0, d: 0.06 },
  { x: 46, r: 20, d: 0.12 },
];

/** Tarjetita de Yape: número grande y botón para copiarlo, con corazones que salen al copiar. */
export const YapeCopy: React.FC<{ number: string; name: string }> = ({ number, name }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);
  const pretty = number.replace(/(\d{3})(?=\d)/g, '$1 ');

  const copy = async () => {
    if (!(await copyText(number))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="rounded-[1.6rem] bg-white/75 p-1.5 shadow-[0_6px_0_0_rgba(194,87,122,0.15)]">
      <div className="flex flex-col items-center rounded-[1.3rem] border-2 border-dashed border-[#F2B5C8] px-4 pb-5 pt-4">
        <img src="/images/yape.svg" alt="Yape" className="h-16 w-auto drop-shadow-sm" draggable={false} />

        <button
          type="button"
          onClick={copy}
          aria-label={`Copiar número ${pretty}`}
          className="mt-2 text-4xl font-semibold tracking-wider text-[#6B514C] tabular-nums"
          style={{ fontFamily: 'var(--font-button)' }}
        >
          {pretty}
        </button>
        <p className="mt-1 text-sm text-[#947871]">
          a nombre de <span className="font-semibold text-[#C2577A]">{name}</span>
        </p>

        <div className="relative mt-4">
          {/* Corazones que "vuelan" al copiar */}
          <AnimatePresence>
            {copied &&
              HEARTS.map((h, i) => (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 -ml-2"
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                  animate={{ opacity: [0, 1, 0], x: h.x, y: -46, scale: 1, rotate: h.r }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: h.d, ease: 'easeOut' }}
                >
                  <Heart className="size-4 fill-[#DB7093] text-[#DB7093]" />
                </motion.span>
              ))}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={copy}
            whileTap={{ scale: 0.94 }}
            animate={{ backgroundColor: copied ? '#8FBF9F' : '#DB7093' }}
            className="inline-flex min-w-[11rem] items-center justify-center gap-2 rounded-full px-6 py-2.5 font-medium text-white shadow-[3px_4px_0_0_rgba(107,81,76,0.25)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'ok' : 'copy'}
                className="inline-flex items-center gap-2"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? '¡Número copiado!' : 'Copiar número'}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
