import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FunctionAnimatedExplainerProps {
  isDark: boolean;
}

type AnimPhase = 'input_ready' | 'input_travel' | 'operating' | 'output_travel' | 'complete';

export const FunctionAnimatedExplainer: React.FC<FunctionAnimatedExplainerProps> = ({ isDark }) => {
  const [phase, setPhase] = useState<AnimPhase>('input_ready');
  const [cycleCount, setCycleCount] = useState<number>(0);

  // Smooth educational animation loop
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;
    let t4: NodeJS.Timeout;
    let t5: NodeJS.Timeout;

    // 1. Input highlights
    t1 = setTimeout(() => {
      setPhase('input_travel');
    }, 1000);

    // 2. Token enters function -> operates x × 2
    t2 = setTimeout(() => {
      setPhase('operating');
    }, 1900);

    // 3. Result token emerges from function
    t3 = setTimeout(() => {
      setPhase('output_travel');
    }, 2800);

    // 4. Result arrives in output -> glows green
    t4 = setTimeout(() => {
      setPhase('complete');
    }, 3500);

    // 5. Brief digest pause -> repeat
    t5 = setTimeout(() => {
      setPhase('input_ready');
      setCycleCount((c) => c + 1);
    }, 5600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [cycleCount]);

  const handleManualReplay = () => {
    soundFX.playClick();
    setPhase('input_ready');
    setCycleCount((c) => c + 1);
  };

  return (
    <div
      id="minimal-function-model"
      onClick={handleManualReplay}
      className={`relative w-full rounded-2xl p-4 sm:p-5 transition-all select-none cursor-pointer ${
        isDark
          ? 'bg-[#141828] border border-indigo-500/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-[#f8f9ff] border border-indigo-100 shadow-[0_4px_20px_rgba(79,70,229,0.06)]'
      }`}
    >
      {/* Replay trigger button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleManualReplay();
        }}
        className={`absolute top-3 right-3 p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          isDark
            ? 'text-slate-400 hover:text-white hover:bg-white/5'
            : 'text-slate-400 hover:text-slate-700 hover:bg-indigo-50'
        }`}
        title="Replay animation"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      {/* Column Headers: INPUT, FUNCTION, OUTPUT */}
      <div className="grid grid-cols-3 text-center mb-2.5">
        <span
          className={`text-[11px] font-mono font-bold tracking-widest uppercase transition-colors ${
            phase === 'input_ready' || phase === 'input_travel'
              ? 'text-slate-900 dark:text-white font-extrabold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          INPUT
        </span>

        <span
          className={`text-[11px] font-mono font-bold tracking-widest uppercase transition-colors ${
            phase === 'operating'
              ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          FUNCTION
        </span>

        <span
          className={`text-[11px] font-mono font-bold tracking-widest uppercase transition-colors ${
            phase === 'complete' || phase === 'output_travel'
              ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          OUTPUT
        </span>
      </div>

      {/* Main Flow Row */}
      <div className="flex items-center justify-between gap-1.5 sm:gap-3 relative">
        
        {/* 1. INPUT CARD - LIGHT BOX WITH DARK TEXT */}
        <div className="flex-1 flex justify-center">
          <motion.div
            animate={{
              scale: phase === 'input_ready' ? 1.04 : 1,
              borderColor:
                phase === 'input_ready' || phase === 'input_travel'
                  ? '#6366f1'
                  : isDark
                  ? 'rgba(255,255,255,0.08)'
                  : '#e2e8f0',
            }}
            transition={{ duration: 0.25 }}
            className={`w-full max-w-[100px] sm:max-w-[115px] h-20 sm:h-22 rounded-xl flex flex-col items-center justify-center transition-all ${
              phase === 'input_ready' || phase === 'input_travel'
                ? isDark
                  ? 'bg-indigo-950/30 border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                  : 'bg-indigo-50/60 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-200/50'
                : isDark
                ? 'bg-[#1b2034] border border-white/10 shadow-sm'
                : 'bg-white border border-slate-200 shadow-xs'
            }`}
          >
            <span className="text-3xl sm:text-4xl font-black font-['Outfit'] tracking-tight text-[#0f172a] dark:text-white leading-none">
              3
            </span>
          </motion.div>
        </div>

        {/* First Connector Arrow + Travelling Token "3" */}
        <div className="relative flex items-center justify-center w-8 sm:w-14 shrink-0">
          <ArrowRight
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              phase === 'input_travel'
                ? 'text-indigo-600 dark:text-indigo-400 scale-110'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />

          {/* Gliding Input Token "3" */}
          <AnimatePresence>
            {phase === 'input_travel' && (
              <motion.div
                initial={{ x: -28, opacity: 0, scale: 0.6 }}
                animate={{ x: 28, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.75, ease: 'easeInOut' }}
                className="absolute w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-lg z-10"
              >
                3
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. FUNCTION CARD */}
        <div className="flex-[1.25] flex justify-center">
          <motion.div
            animate={{
              scale: phase === 'operating' ? 1.04 : 1,
              borderColor:
                phase === 'operating'
                  ? '#6366f1'
                  : isDark
                  ? 'rgba(255,255,255,0.08)'
                  : '#e2e8f0',
            }}
            transition={{ duration: 0.25 }}
            className={`w-full max-w-[130px] sm:max-w-[155px] h-20 sm:h-22 rounded-xl flex flex-col items-center justify-center px-2 text-center transition-all ${
              phase === 'operating'
                ? isDark
                  ? 'bg-indigo-950/40 border-2 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                  : 'bg-indigo-50/80 border-2 border-indigo-500 shadow-md ring-2 ring-indigo-200/60'
                : isDark
                ? 'bg-[#1b2034] border border-white/10 shadow-sm'
                : 'bg-white border border-slate-200 shadow-xs'
            }`}
          >
            {/* Function Name */}
            <span className="text-xs sm:text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 leading-tight">
              double()
            </span>

            {/* Small processing indicator with animated glowing dot */}
            <div className="h-4 flex items-center justify-center my-0.5">
              {phase === 'operating' ? (
                <motion.div
                  key="processing-active"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-indigo-500/15 border border-indigo-500/25"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-600 dark:bg-indigo-400"></span>
                  </span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                    processing
                  </span>
                </motion.div>
              ) : (
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 opacity-60">
                  operation
                </span>
              )}
            </div>

            {/* Operation inside/under function: x × 2 */}
            <motion.div
              animate={{
                scale: phase === 'operating' ? 1.08 : 1,
              }}
              transition={{ duration: 0.2 }}
              className={`text-[11px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                phase === 'operating'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDark
                  ? 'bg-white/5 text-slate-400'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              x × 2
            </motion.div>
          </motion.div>
        </div>

        {/* Second Connector Arrow + Travelling Token "6" */}
        <div className="relative flex items-center justify-center w-8 sm:w-14 shrink-0">
          <ArrowRight
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              phase === 'output_travel' || phase === 'complete'
                ? 'text-emerald-500 scale-110'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />

          {/* Gliding Output Token "6" */}
          <AnimatePresence>
            {phase === 'output_travel' && (
              <motion.div
                initial={{ x: -28, opacity: 0, scale: 0.6 }}
                animate={{ x: 28, opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute w-7 h-7 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-lg z-10"
              >
                6
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. OUTPUT CARD - ALWAYS PERMANENTLY DISPLAYS "6" */}
        <div className="flex-1 flex justify-center">
          <motion.div
            animate={{
              scale: phase === 'complete' ? 1.05 : 1,
              borderColor:
                phase === 'complete'
                  ? '#10b981'
                  : isDark
                  ? 'rgba(255,255,255,0.08)'
                  : '#e2e8f0',
            }}
            transition={{ duration: 0.25 }}
            className={`w-full max-w-[100px] sm:max-w-[115px] h-20 sm:h-22 rounded-xl flex flex-col items-center justify-center transition-all ${
              phase === 'complete'
                ? isDark
                  ? 'bg-emerald-950/30 border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'bg-emerald-50/80 border-2 border-emerald-500 shadow-md ring-2 ring-emerald-200/60'
                : isDark
                ? 'bg-[#1b2034] border border-white/10 shadow-sm'
                : 'bg-white border border-slate-200 shadow-xs'
            }`}
          >
            <motion.span
              animate={{
                scale: phase === 'complete' ? [1, 1.15, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`text-3xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight leading-none ${
                phase === 'complete'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              6
            </motion.span>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
