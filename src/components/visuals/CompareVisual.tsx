import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface CompareSide {
  label: string;
  code: string;
  note: string;
  valid: boolean; // true -> emerald accent/check, false -> rose accent/cross
  meter?: number; // 0-1, renders a small capacity/precision bar under the code (optional)
}

interface CompareVisualProps {
  isDark: boolean;
  left: CompareSide;
  right: CompareSide;
}

// "Two things that look similar but behave differently" mental model:
// spotlight alternates left/right on a slow loop so the contrast reads as
// one continuous idea rather than two static cards.
export const CompareVisual: React.FC<CompareVisualProps> = ({ isDark, left, right }) => {
  const [focus, setFocus] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const timer = setTimeout(() => setFocus((f) => (f === 'left' ? 'right' : 'left')), 2200);
    return () => clearTimeout(timer);
  }, [focus]);

  const replay = () => {
    soundFX.playClick();
    setFocus('left');
  };

  const Side: React.FC<{ side: CompareSide; active: boolean }> = ({ side, active }) => (
    <motion.div
      animate={{ scale: active ? 1.03 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex-1 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2.5 text-center"
      style={{
        background: nodeSurface(isDark),
        boxShadow: active
          ? side.valid
            ? '0 0 0 3px #10b981, 0 8px 18px -6px rgba(16,185,129,0.4)'
            : '0 0 0 3px #6366f1, 0 8px 18px -6px rgba(99,102,241,0.4)'
          : isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
          : '0 3px 10px -4px rgba(99,102,241,0.14)',
      }}
    >
      <span className={`${LABEL_CLASS} ${active ? (side.valid ? 'text-emerald-500' : 'text-indigo-500') : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
        {side.label}
      </span>
      <span className={`font-mono font-bold text-sm sm:text-base leading-snug ${isDark ? 'text-white' : 'text-[#181235]'}`}>
        {side.code}
      </span>
      {typeof side.meter === 'number' && (
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}>
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${Math.round(side.meter * 100)}%` }}
          />
        </div>
      )}
      <div className="flex items-center gap-1.5">
        <span className={`material-symbols-outlined text-[15px] ${side.valid ? 'text-emerald-500' : 'text-rose-500'}`}>
          {side.valid ? 'check_circle' : 'cancel'}
        </span>
        <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {side.note}
        </span>
      </div>
    </motion.div>
  );

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-stretch gap-3 sm:gap-4">
        <Side side={left} active={focus === 'left'} />
        <Side side={right} active={focus === 'right'} />
      </div>
    </VisualCard>
  );
};
