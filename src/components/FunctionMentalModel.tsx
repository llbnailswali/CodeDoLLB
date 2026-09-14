import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../utils/audio';

interface FunctionMentalModelProps {
  isDark: boolean;
}

// Single mental-model beat: input sits, glides into the function, the function
// briefly labels its operation, the result glides out, output settles + glows.
type Beat = 'idle' | 'toFunction' | 'inFunction' | 'toOutput' | 'settled';

const TIMINGS: Record<Beat, number> = {
  idle: 900,
  toFunction: 700,
  inFunction: 900,
  toOutput: 700,
  settled: 1600,
};

const SEQUENCE: Beat[] = ['idle', 'toFunction', 'inFunction', 'toOutput', 'settled'];

export const FunctionMentalModel: React.FC<FunctionMentalModelProps> = ({ isDark }) => {
  const [beat, setBeat] = useState<Beat>('idle');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let step = SEQUENCE.indexOf(beat);
    const timer = setTimeout(() => {
      step = (step + 1) % SEQUENCE.length;
      if (step === 0) setCycle((c) => c + 1);
      setBeat(SEQUENCE[step]);
    }, TIMINGS[beat]);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, cycle]);

  const replay = () => {
    soundFX.playClick();
    setBeat('idle');
    setCycle((c) => c + 1);
  };

  const inputActive = beat === 'idle' || beat === 'toFunction';
  const fnActive = beat === 'inFunction';
  const outputActive = beat === 'toOutput' || beat === 'settled';

  return (
    <div
      onClick={replay}
      className={`relative w-full rounded-[28px] px-4 py-6 sm:px-6 sm:py-7 cursor-pointer select-none ${
        isDark ? 'bg-[#12141f]' : 'bg-[#f7f5ff]'
      }`}
      style={{
        boxShadow: isDark
          ? 'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 30px -12px rgba(0,0,0,0.55)'
          : '0 12px 30px -14px rgba(99,102,241,0.28), inset 0 1px 0 rgba(255,255,255,0.6)',
      }}
    >
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {/* INPUT */}
        <div className="flex flex-col items-center gap-2 w-16 sm:w-20">
          <motion.div
            animate={{ scale: inputActive ? 1.08 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl font-['Outfit'] ${
              isDark ? 'text-white' : 'text-[#181235]'
            }`}
            style={{
              background: isDark ? '#1c1f2e' : '#ffffff',
              boxShadow: inputActive
                ? '0 0 0 3px #6366f1, 0 8px 18px -6px rgba(99,102,241,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.18)',
            }}
          >
            3
          </motion.div>
          <span
            className={`text-[10px] font-bold font-['Outfit'] tracking-[0.18em] uppercase ${
              inputActive ? 'text-indigo-500' : isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Input
          </span>
        </div>

        {/* PATH: input -> function */}
        <div className="relative h-0.5 w-6 sm:w-10 shrink-0 rounded-full bg-indigo-500/15 overflow-visible">
          <AnimatePresence>
            {beat === 'toFunction' && (
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: '100%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500 -translate-y-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* FUNCTION */}
        <div className="flex flex-col items-center gap-2 w-28 sm:w-32">
          <motion.div
            animate={{ scale: fnActive ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-28 h-16 sm:w-32 sm:h-20 rounded-3xl flex flex-col items-center justify-center gap-1"
            style={{
              background: fnActive ? '#4f46e5' : isDark ? '#1c1f2e' : '#ffffff',
              boxShadow: fnActive
                ? '0 10px 24px -8px rgba(79,70,229,0.55)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.18)',
            }}
          >
            <span
              className={`text-xs sm:text-sm font-bold font-mono ${
                fnActive ? 'text-white' : isDark ? 'text-indigo-300' : 'text-indigo-600'
              }`}
            >
              double()
            </span>
            <AnimatePresence>
              {fnActive && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] sm:text-xs font-mono font-bold text-indigo-100"
                >
                  x × 2
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <span
            className={`text-[10px] font-bold font-['Outfit'] tracking-[0.18em] uppercase ${
              fnActive ? 'text-indigo-500' : isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Function
          </span>
        </div>

        {/* PATH: function -> output */}
        <div className="relative h-0.5 w-6 sm:w-10 shrink-0 rounded-full bg-emerald-500/15 overflow-visible">
          <AnimatePresence>
            {beat === 'toOutput' && (
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                animate={{ left: '100%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 -translate-y-1/2 -translate-x-1/2 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
              />
            )}
          </AnimatePresence>
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col items-center gap-2 w-16 sm:w-20">
          <motion.div
            animate={{ scale: outputActive ? 1.08 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black text-2xl sm:text-3xl font-['Outfit'] ${
              outputActive ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
            style={{
              background: isDark ? '#1c1f2e' : '#ffffff',
              boxShadow: outputActive
                ? '0 0 0 3px #10b981, 0 8px 18px -6px rgba(16,185,129,0.45)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
                : '0 3px 10px -4px rgba(99,102,241,0.18)',
            }}
          >
            6
          </motion.div>
          <span
            className={`text-[10px] font-bold font-['Outfit'] tracking-[0.18em] uppercase ${
              outputActive ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            Output
          </span>
        </div>
      </div>
    </div>
  );
};
