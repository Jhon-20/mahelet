import React from 'react';

/** Texto que "rueda" hacia arriba al pasar el mouse por el botón padre (clase `group`). */
export const RollText: React.FC<{ text: string }> = ({ text }) => (
  <span className="relative inline-block overflow-hidden align-bottom">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
      {text}
    </span>
    <span
      aria-hidden="true"
      className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
    >
      {text}
    </span>
  </span>
);
