import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, nodeShadow, LABEL_CLASS } from './VisualCard';

interface FlowVisualProps {
  isDark: boolean;
  inputLabel: string;
  inputValue: string;
  processLabel: string;
  processDetail: string;
  outputLabel: string;
  outputValue: string;
  outputCaption?: string;
}

// Generalized "Input -> Process -> Output" mental model (same beat structure
// as the Functions lesson explainer): a value glides in, the process box
// labels what it does, the result glides out and settles with a green glow.
type Beat = 'idle' | 'toProcess' | 'inProcess' | 'toOutput' | 'settled';
const SEQUENCE: Beat[] = ['idle', 'toProcess', 'inProcess', 'toOutput', 'settled'];
const TIMINGS: Record<Beat, number> = {
  idle: 900,
  toProcess: 700,
  inProcess: 900,
  toOutput: 700,
  settled: 1600,
};

export const FlowVisual: React.FC<FlowVisualProps> = ({
  isDark,
  inputLabel,
  inputValue,
  processLabel,
  processDetail,
  outputLabel,
  outputValue,
  outputCaption,
}) => {
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

  const inputActive = beat === 'idle' || beat === 'toProcess';
  const processActive = beat === 'inProcess';
  const outputActive = beat === 'toOutput' || beat === 'settled';

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {/* INPUT */}
        <div className="flex flex-col items-center gap-2 w-16 sm:w-20">
          <motion.div
            animate={{ scale: inputActive ? 1.08 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black font-['Outfit'] leading-none px-1 text-center ${
              inputValue.length > 3 ? 'text-base sm:text-lg' : 'text-2xl sm:text-3xl'
            } ${isDark ? 'text-white' : 'text-[#181235]'}`}
            style={{
              background: nodeSurface(isDark),
              boxShadow: nodeShadow(isDark, inputActive, '99,102,241'),
            }}
          >
            {inputValue}
          </motion.div>
          <span className={`${LABEL_CLASS} ${inputActive ? 'text-indigo-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {inputLabel}
          </span>
        </div>

        {/* PATH: input -> process */}
        <div className="relative h-0.5 w-6 sm:w-10 shrink-0 rounded-full bg-indigo-500/15 overflow-visible">
          <AnimatePresence>
            {beat === 'toProcess' && (
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

        {/* PROCESS */}
        <div className="flex flex-col items-center gap-2 w-28 sm:w-32">
          <motion.div
            animate={{ scale: processActive ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-28 h-16 sm:w-32 sm:h-20 rounded-3xl flex flex-col items-center justify-center gap-1 px-2 text-center"
            style={{
              background: processActive ? '#4f46e5' : nodeSurface(isDark),
              boxShadow: processActive
                ? '0 10px 24px -8px rgba(79,70,229,0.55)'
                : nodeShadow(isDark, false, '99,102,241'),
            }}
          >
            <span className={`text-xs sm:text-sm font-bold font-mono leading-tight ${processActive ? 'text-white' : isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
              {processLabel}
            </span>
            <AnimatePresence>
              {processActive && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] sm:text-xs font-mono font-bold text-indigo-100 leading-tight"
                >
                  {processDetail}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          <span className={`${LABEL_CLASS} invisible`} aria-hidden="true">
            {processLabel}
          </span>
        </div>

        {/* PATH: process -> output */}
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
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black font-['Outfit'] leading-none px-1 text-center ${
              outputValue.length > 3 ? 'text-base sm:text-lg' : 'text-2xl sm:text-3xl'
            } ${outputActive ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}
            style={{
              background: nodeSurface(isDark),
              boxShadow: outputActive
                ? nodeShadow(isDark, true, '16,185,129')
                : nodeShadow(isDark, false, '99,102,241'),
            }}
          >
            {outputValue}
          </motion.div>
          <span className={`${LABEL_CLASS} ${outputActive ? 'text-emerald-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            {outputLabel}
          </span>
        </div>
      </div>

      {outputCaption && (
        <p className={`text-center text-[11px] mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {outputCaption}
        </p>
      )}
    </VisualCard>
  );
};
