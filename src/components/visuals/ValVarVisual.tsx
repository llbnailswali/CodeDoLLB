import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface ValVarVisualProps {
  isDark: boolean;
}

// Mental model for val vs var:
// val is a locked vault (immutable). Attempting to reassign is blocked.
// var is an open box (mutable). Reassigning updates the value seamlessly.
export const ValVarVisual: React.FC<ValVarVisualProps> = ({ isDark }) => {
  const [focus, setFocus] = useState<'val' | 'var'>('val');

  useEffect(() => {
    const timer = setInterval(() => {
      setFocus((prev) => (prev === 'val' ? 'var' : 'val'));
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const replay = () => {
    soundFX.playClick();
    setFocus('val');
  };

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-stretch gap-3 sm:gap-4">
        {/* VAL SIDE (IMMUTABLE / LOCKED) */}
        <motion.div
          animate={{ scale: focus === 'val' ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2 text-center"
          style={{
            background: nodeSurface(isDark),
            boxShadow:
              focus === 'val'
                ? '0 0 0 3px #6366f1, 0 8px 18px -6px rgba(99,102,241,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.14)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-indigo-500">lock</span>
            <span className={`${LABEL_CLASS} text-indigo-500`}>val</span>
          </div>

          {/* Code */}
          <div className="flex flex-col items-center justify-center min-h-[44px]">
            <span
              className={`font-mono font-bold text-sm sm:text-base ${
                isDark ? 'text-white' : 'text-[#181235]'
              }`}
            >
              x = 5
            </span>
            <span className="text-[11px] font-mono font-bold text-rose-500/90 dark:text-rose-400 mt-0.5 flex items-center gap-1">
              <span className="line-through opacity-80">x = 10</span>
              <span className="text-[12px] font-black">✕</span>
            </span>
          </div>

          {/* Status Badge */}
          <div className="mt-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] font-semibold text-indigo-500">Locked forever</span>
          </div>
        </motion.div>

        {/* VAR SIDE (MUTABLE / EDITABLE) */}
        <motion.div
          animate={{ scale: focus === 'var' ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2 text-center"
          style={{
            background: nodeSurface(isDark),
            boxShadow:
              focus === 'var'
                ? '0 0 0 3px #10b981, 0 8px 18px -6px rgba(16,185,129,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.14)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-emerald-500">edit</span>
            <span className={`${LABEL_CLASS} text-emerald-500`}>var</span>
          </div>

          {/* Code */}
          <div className="flex flex-col items-center justify-center min-h-[44px]">
            <span
              className={`font-mono font-bold text-sm sm:text-base ${
                isDark ? 'text-white' : 'text-[#181235]'
              }`}
            >
              x = 5
            </span>
            <motion.span
              animate={{ scale: focus === 'var' ? [1, 1.06, 1] : 1 }}
              transition={{ duration: 0.4 }}
              className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1"
            >
              <span>x = 10</span>
              <span className="text-[12px] font-black">✓</span>
            </motion.span>
          </div>

          {/* Status Badge */}
          <div className="mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              Can change
            </span>
          </div>
        </motion.div>
      </div>
    </VisualCard>
  );
};
