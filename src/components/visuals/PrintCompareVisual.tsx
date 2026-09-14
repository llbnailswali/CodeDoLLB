import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface PrintCompareVisualProps {
  isDark: boolean;
}

// Mental model for print() vs println():
// print() keeps the cursor on the same line -> outputs "AB"
// println() drops down to a fresh new line -> outputs "A\nB"
export const PrintCompareVisual: React.FC<PrintCompareVisualProps> = ({ isDark }) => {
  const [active, setActive] = useState<'print' | 'println'>('print');

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev === 'print' ? 'println' : 'print'));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const replay = () => {
    soundFX.playClick();
    setActive('print');
  };

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-stretch gap-3 sm:gap-4">
        {/* PRINT() CARD */}
        <motion.div
          animate={{ scale: active === 'print' ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2 text-center"
          style={{
            background: nodeSurface(isDark),
            boxShadow:
              active === 'print'
                ? '0 0 0 3px #6366f1, 0 8px 18px -6px rgba(99,102,241,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.14)',
          }}
        >
          <span className={`${LABEL_CLASS} ${active === 'print' ? 'text-indigo-500' : 'text-slate-400'}`}>
            print()
          </span>

          <span className="text-[11px] font-mono text-slate-400">
            print("A") + print("B")
          </span>

          {/* Mini Terminal Screen */}
          <div
            className={`w-full py-2 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex items-center justify-center gap-1 my-0.5 ${
              isDark ? 'bg-[#0e121e] text-indigo-300' : 'bg-slate-100 text-indigo-950'
            }`}
          >
            <span>AB</span>
            <span className="w-1.5 h-3.5 bg-indigo-500 animate-pulse rounded-xs" />
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <span className="material-symbols-outlined text-[14px] text-indigo-500">east</span>
            <span>Stays on same line</span>
          </div>
        </motion.div>

        {/* PRINTLN() CARD */}
        <motion.div
          animate={{ scale: active === 'println' ? 1.03 : 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 rounded-3xl px-3 py-4 sm:px-4 sm:py-5 flex flex-col items-center gap-2 text-center"
          style={{
            background: nodeSurface(isDark),
            boxShadow:
              active === 'println'
                ? '0 0 0 3px #10b981, 0 8px 18px -6px rgba(16,185,129,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.14)',
          }}
        >
          <span className={`${LABEL_CLASS} ${active === 'println' ? 'text-emerald-500' : 'text-slate-400'}`}>
            println()
          </span>

          <span className="text-[11px] font-mono text-slate-400">
            println("A") + println("B")
          </span>

          {/* Mini Terminal Screen (Stacked lines) */}
          <div
            className={`w-full py-1 px-3 rounded-xl font-mono text-xs sm:text-sm font-bold flex flex-col items-center justify-center my-0.5 leading-tight ${
              isDark ? 'bg-[#0e121e] text-emerald-300' : 'bg-slate-100 text-emerald-950'
            }`}
          >
            <div>A</div>
            <div className="flex items-center gap-0.5">
              <span>B</span>
              <span className="w-1.5 h-3 bg-emerald-500 animate-pulse rounded-xs" />
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
            <span className="material-symbols-outlined text-[14px] text-emerald-500">south_east</span>
            <span>Moves to new line</span>
          </div>
        </motion.div>
      </div>
    </VisualCard>
  );
};
