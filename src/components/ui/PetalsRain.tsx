import React, { useEffect, useState } from 'react';

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
}

export const PetalsRain: React.FC = () => {
  const [petals, setPetals] = useState<PetalItem[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    if (!mediaQuery.matches) {
      // 18 subtle petals floating
      const generatedPetals: PetalItem[] = Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 96 + 2, // 2% to 98%
        size: Math.floor(Math.random() * 8) + 12, // 12px to 20px
        duration: Math.floor(Math.random() * 9) + 11, // 11s to 20s
        delay: Math.random() * 12,
        rotation: Math.floor(Math.random() * 360),
        opacity: Math.random() * 0.45 + 0.35,
      }));
      setPetals(generatedPetals);
    }

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion || petals.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-10 select-none"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute top-[-40px]"
          style={{
            left: `${petal.left}%`,
            animation: `fallAndSway ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 24 32"
            fill="none"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              transition: 'transform 0.5s ease',
            }}
          >
            <path
              d="M12 0 C18 8, 24 16, 20 26 C 16 34, 4 32, 2 22 C 0 14, 6 6, 12 0 Z"
              fill={petal.id % 2 === 0 ? '#F4D6DE' : '#E3A0B4'}
            />
            <path
              d="M12 4 C14 10, 16 16, 14 22"
              stroke="#FBF6F0"
              strokeWidth="0.8"
              opacity="0.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translate3d(0, -40px, 0) rotate(0deg);
          }
          33% {
            transform: translate3d(24px, 35vh, 0) rotate(70deg);
          }
          66% {
            transform: translate3d(-18px, 70vh, 0) rotate(190deg);
          }
          100% {
            transform: translate3d(16px, 108vh, 0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
