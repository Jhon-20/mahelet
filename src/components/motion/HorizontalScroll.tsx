import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Sección fijada: al bajar con el scroll, las tarjetas se desplazan en horizontal (estilo landonorris.com).
 * Ocupa todo el ancho de la pantalla; la primera tarjeta queda alineada con la columna de la invitación.
 */
export const HorizontalScroll: React.FC<{ header: React.ReactNode; children: React.ReactNode }> = ({ header, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      distance.current = Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth);
      setHeight(window.innerHeight + distance.current);
    };
    measure();
    // Re-medir si cambian las tarjetas (p. ej. al cargar fuentes) o la ventana
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => -p * distance.current);

  return (
    <div ref={ref} className="relative w-full" style={{ height }}>
      <div
        ref={viewportRef}
        className="sticky top-0 ml-[calc(50%-50vw)] flex h-screen w-screen flex-col justify-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-lg px-4">{header}</div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-4 px-[max(1rem,calc(50vw-15rem))]"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};
