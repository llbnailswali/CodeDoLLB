import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface ProfileProgramVisualProps {
  isDark: boolean;
}

type Step = 'vars' | 'print' | 'output';

export const ProfileProgramVisual: React.FC<ProfileProgramVisualProps> = ({ isDark }) => {
  const [step, setStep] = useState<Step>('vars');

  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    let t3: NodeJS.Timeout;

    if (step === 'vars') {
      t1 = setTimeout(() => setStep('print'), 1100);
    } else if (step === 'print') {
      t2 = setTimeout(() => setStep('output'), 1100);
    } else {
      t3 = setTimeout(() => setStep('vars'), 2400);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [step]);

  const replay = () => {
    soundFX.playClick();
    setStep('vars');
  };

  const isVars = step === 'vars';
  const isPrint = step === 'print';
  const isOutput = step === 'output';

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-center justify-between gap-1.5 sm:gap-3">
        {/* 1. VARIABLES (INPUT) */}
        <div className="flex flex-col gap-1.5 w-24 sm:w-28 shrink-0">
          <motion.div
            animate={{ scale: isVars ? 1.04 : 1 }}
            className="p-1.5 rounded-xl font-mono text-[11px] text-center"
            style={{
              background: nodeSurface(isDark),
              boxShadow: isVars
                ? '0 0 0 2px #6366f1, 0 4px 12px -3px rgba(99,102,241,0.4)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)'
                : '0 2px 6px -2px rgba(99,102,241,0.1)',
            }}
          >
            <span className="text-slate-400">val </span>
            <span className={isDark ? 'text-white' : 'text-slate-800'}>name </span>
            <span className="text-indigo-500 font-bold">"Ana"</span>
          </motion.div>

          <motion.div
            animate={{ scale: isVars ? 1.04 : 1 }}
            className="p-1.5 rounded-xl font-mono text-[11px] text-center"
            style={{
              background: nodeSurface(isDark),
              boxShadow: isVars
                ? '0 0 0 2px #6366f1, 0 4px 12px -3px rgba(99,102,241,0.4)'
                : isDark
                ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)'
                : '0 2px 6px -2px rgba(99,102,241,0.1)',
            }}
          >
            <span className="text-slate-400">val </span>
            <span className={isDark ? 'text-white' : 'text-slate-800'}>age = </span>
            <span className="text-emerald-500 font-bold">21</span>
          </motion.div>

          <span className={`${LABEL_CLASS} text-center ${isVars ? 'text-indigo-500' : 'text-slate-400'}`}>
            Variables
          </span>
        </div>

        {/* CONNECTOR */}
        <span className={`material-symbols-outlined text-[18px] shrink-0 ${isPrint ? 'text-indigo-500' : 'text-slate-400'}`}>
          arrow_forward
        </span>

        {/* 2. PRINTLN() COMBINER */}
        <motion.div
          animate={{ scale: isPrint ? 1.05 : 1 }}
          className="flex-1 rounded-2xl py-3 px-2 flex flex-col items-center justify-center text-center min-w-0"
          style={{
            background: isPrint ? '#4f46e5' : nodeSurface(isDark),
            boxShadow: isPrint
              ? '0 10px 24px -8px rgba(79,70,229,0.55)'
              : isDark
              ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
              : '0 3px 10px -4px rgba(99,102,241,0.14)',
          }}
        >
          <span className={`text-[11px] sm:text-xs font-mono font-bold ${isPrint ? 'text-white' : isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
            println()
          </span>
          <span className={`text-[10px] font-mono mt-0.5 truncate ${isPrint ? 'text-indigo-100' : 'text-slate-400'}`}>
            "$name, $age"
          </span>
          <span className={`${LABEL_CLASS} mt-1 ${isPrint ? 'text-indigo-200' : 'text-slate-400'}`}>
            Combines
          </span>
        </motion.div>

        {/* CONNECTOR */}
        <span className={`material-symbols-outlined text-[18px] shrink-0 ${isOutput ? 'text-emerald-500' : 'text-slate-400'}`}>
          arrow_forward
        </span>

        {/* 3. TERMINAL SCREEN OUTPUT */}
        <motion.div
          animate={{ scale: isOutput ? 1.05 : 1 }}
          className="w-24 sm:w-28 shrink-0 rounded-2xl p-2 flex flex-col justify-center"
          style={{
            background: isDark ? '#0d111d' : '#f1f5f9',
            boxShadow: isOutput
              ? '0 0 0 2px #10b981, 0 8px 18px -6px rgba(16,185,129,0.4)'
              : isDark
              ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.2)'
              : '0 2px 6px -2px rgba(99,102,241,0.1)',
          }}
        >
          <div className="font-mono text-[10px] sm:text-[11px] leading-tight">
            <div className={isOutput ? 'text-emerald-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>
              Ana
            </div>
            <div className={isOutput ? 'text-emerald-400 font-bold' : isDark ? 'text-slate-400' : 'text-slate-600'}>
              21 yrs
            </div>
          </div>
          <span className={`${LABEL_CLASS} mt-1 text-center ${isOutput ? 'text-emerald-500' : 'text-slate-400'}`}>
            Printed
          </span>
        </motion.div>
      </div>

      <p className={`text-center text-[11px] mt-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Declare variables, format with templates, and output to screen.
      </p>
    </VisualCard>
  );
};
