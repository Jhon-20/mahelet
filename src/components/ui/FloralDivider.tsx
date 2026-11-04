import React from 'react';
import { DecorativeBow } from './DecorativeBow';

interface FloralDividerProps {
  className?: string;
  withBow?: boolean;
}

export const FloralDivider: React.FC<FloralDividerProps> = ({
  className = '',
  withBow = true,
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-8 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-r from-transparent via-[#E9A7B8] to-[#C96F8C] opacity-60" />
      
      {withBow ? (
        <DecorativeBow size="sm" className="opacity-90 -my-2" />
      ) : (
        <div className="flex items-center gap-1.5 text-[#C96F8C] opacity-75">
          <span className="text-xs">✦</span>
          <span className="text-sm">🌸</span>
          <span className="text-xs">✦</span>
        </div>
      )}

      <div className="flex-1 max-w-[120px] h-[1px] bg-gradient-to-l from-transparent via-[#E9A7B8] to-[#C96F8C] opacity-60" />
    </div>
  );
};
