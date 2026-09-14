import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface ToggleVisualProps {
  isDark: boolean;
  label: string; // e.g. "isLoggedIn"
}

// Boolean's mental model isn't a pipeline -- it's a single switch that can
// only ever be one of two states. Flip it back and forth, nothing else moves.
export const ToggleVisual: React.FC<ToggleVisualProps> = ({ isDark, label }) => {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setOn((v) => !v), 1800);
    return () => clearTimeout(timer);
  }, [on]);

  const replay = () => {
    soundFX.playClick();
    setOn(true);
  };

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex flex-col items-center gap-4">
        <span className={`font-mono font-bold text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {label}
        </span>

        <motion.button
          type="button"
          animate={{ backgroundColor: on ? '#10b981' : (isDark ? '#2a2f42' : '#e2e8f0') }}
          transition={{ duration: 0.35 }}
          className="relative w-24 h-12 sm:w-28 sm:h-14 rounded-full flex items-center px-1.5"
          style={{
            boxShadow: isDark
              ? 'inset 0 2px 6px rgba(0,0,0,0.4)'
              : 'inset 0 2px 6px rgba(148,163,184,0.35)',
          }}
        >
          <motion.div
            animate={{ x: on ? '100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black font-['Outfit'] text-[10px]"
            style={{
              background: nodeSurface(isDark),
              boxShadow: '0 3px 10px -2px rgba(0,0,0,0.3)',
              color: on ? '#10b981' : isDark ? '#94a3b8' : '#64748b',
            }}
          >
            {on ? '✓' : '✕'}
          </motion.div>
        </motion.button>

        <span className={`${LABEL_CLASS} ${on ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {on ? 'true' : 'false'}
        </span>
      </div>
    </VisualCard>
  );
};
