import React from 'react';

interface DecorativeBowProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DecorativeBow: React.FC<DecorativeBowProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-10 h-7',
    md: 'w-16 h-11',
    lg: 'w-24 h-16',
  };

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="bowPinkGrad" x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#F6C8D4" />
            <stop offset="45%" stopColor="#E9A7B8" />
            <stop offset="100%" stopColor="#C96F8C" />
          </linearGradient>
          <linearGradient id="knotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9A7B8" />
            <stop offset="100%" stopColor="#B35876" />
          </linearGradient>
          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#C96F8C" floodOpacity="0.25" />
          </filter>
        </defs>

        <path
          d="M 50 30 C 35 12, 10 14, 8 28 C 6 42, 30 46, 50 35 Z"
          fill="url(#bowPinkGrad)"
          filter="url(#softShadow)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        <path
          d="M 45 30 C 32 20, 16 22, 16 30 C 16 38, 30 38, 45 33"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />


        <path
          d="M 50 30 C 65 12, 90 14, 92 28 C 94 42, 70 46, 50 35 Z"
          fill="url(#bowPinkGrad)"
          filter="url(#softShadow)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        <path
          d="M 55 30 C 68 20, 84 22, 84 30 C 84 38, 70 38, 55 33"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          opacity="0.6"
          strokeLinecap="round"
        />


        <path
          d="M 48 35 C 44 48, 30 58, 22 66 C 29 64, 38 65, 46 68 C 47 56, 49 44, 49 35 Z"
          fill="url(#bowPinkGrad)"
          opacity="0.95"
        />


        <path
          d="M 52 35 C 56 48, 70 58, 78 66 C 71 64, 62 65, 54 68 C 53 56, 51 44, 51 35 Z"
          fill="url(#bowPinkGrad)"
          opacity="0.95"
        />


        <ellipse
          cx="50"
          cy="32"
          rx="5.5"
          ry="6.5"
          fill="url(#knotGrad)"
          stroke="#FFFFFF"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="32" r="2" fill="#FFFFFF" opacity="0.4" />
      </svg>
    </div>
  );
};
