import React from 'react';

interface VisualCardProps {
  isDark: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

// Shared card shell for every lesson mental-model visual: soft neumorphic
// depth, light-lavender / near-black surface, no borders -- matches the
// FunctionMentalModel reference so the whole gallery reads as one system.
export const VisualCard: React.FC<VisualCardProps> = ({ isDark, onClick, children }) => (
  <div
    onClick={onClick}
    className={`relative w-full rounded-[28px] px-4 py-6 sm:px-6 sm:py-7 select-none ${
      onClick ? 'cursor-pointer' : ''
    } ${isDark ? 'bg-[#12141f]' : 'bg-[#f7f5ff]'}`}
    style={{
      boxShadow: isDark
        ? 'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px -12px rgba(0,0,0,0.55)'
        : '0 12px 30px -14px rgba(99,102,241,0.28), inset 0 1px 0 rgba(255,255,255,0.6)',
    }}
  >
    {children}
  </div>
);

export const nodeSurface = (isDark: boolean) => (isDark ? '#1c1f2e' : '#ffffff');

export const nodeShadow = (isDark: boolean, active: boolean, colorRgb: string) => {
  if (active) {
    return `0 0 0 3px rgb(${colorRgb}), 0 8px 18px -6px rgba(${colorRgb},0.45)`;
  }
  return isDark
    ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
    : '0 3px 10px -4px rgba(99,102,241,0.18)';
};

export const LABEL_CLASS =
  "text-[10px] font-bold font-['Outfit'] tracking-[0.18em] uppercase";
