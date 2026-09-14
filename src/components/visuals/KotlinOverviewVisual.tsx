import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface KotlinOverviewVisualProps {
  isDark: boolean;
}

const TARGETS = [
  { id: 'android', label: 'Android', icon: 'smartphone', color: '#10b981' },
  { id: 'backend', label: 'Backend / JVM', icon: 'dns', color: '#6366f1' },
  { id: 'multi', label: 'Multiplatform', icon: 'devices', color: '#8b5cf6' },
];

export const KotlinOverviewVisual: React.FC<KotlinOverviewVisualProps> = ({ isDark }) => {
  const [activeTarget, setActiveTarget] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTarget((prev) => (prev + 1) % TARGETS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const replay = () => {
    soundFX.playClick();
    setActiveTarget(0);
  };

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* LEFT: KOTLIN CODE / SOURCE */}
        <div className="flex flex-col items-center gap-1.5 w-24 sm:w-28 shrink-0">
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-18 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-2 text-center"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              boxShadow: '0 8px 20px -6px rgba(124,58,237,0.5)',
            }}
          >
            <span className="text-white font-black text-sm sm:text-base font-['Outfit']">
              Kotlin
            </span>
            <span className="text-[10px] font-mono text-purple-200 mt-0.5">
              Write once
            </span>
          </motion.div>
          <span className={`${LABEL_CLASS} text-indigo-500`}>Modern Code</span>
        </div>

        {/* ARROW WITH GLOWING TOKEN */}
        <div className="flex items-center justify-center w-8 shrink-0 text-indigo-400">
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="material-symbols-outlined text-[22px]"
          >
            arrow_forward
          </motion.span>
        </div>

        {/* RIGHT: TARGET PLATFORMS */}
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          {TARGETS.map((target, idx) => {
            const isActive = activeTarget === idx;
            return (
              <motion.div
                key={target.id}
                animate={{
                  scale: isActive ? 1.03 : 1,
                  x: isActive ? 3 : 0,
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all"
                style={{
                  background: nodeSurface(isDark),
                  boxShadow: isActive
                    ? `0 0 0 2px ${target.color}, 0 4px 14px -4px ${target.color}66`
                    : isDark
                    ? 'inset 0 1px 0 rgba(255,255,255,0.04), 0 2px 5px rgba(0,0,0,0.25)'
                    : '0 2px 6px -2px rgba(99,102,241,0.1)',
                }}
              >
                <span
                  className="material-symbols-outlined text-[16px] shrink-0"
                  style={{ color: target.color }}
                >
                  {target.icon}
                </span>
                <span
                  className={`text-xs font-bold font-['Outfit'] truncate ${
                    isDark ? 'text-white' : 'text-slate-800'
                  }`}
                >
                  {target.label}
                </span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <p
        className={`text-center text-[11px] mt-4 font-medium ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        Modern, concise syntax that runs on Android, servers, and multiplatform.
      </p>
    </VisualCard>
  );
};
