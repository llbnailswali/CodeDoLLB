import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../../utils/audio';
import { VisualCard, nodeSurface, LABEL_CLASS } from './VisualCard';

interface TokenVisualProps {
  isDark: boolean;
  quote: "'" | '"';
  characters: string[]; // e.g. ['A'] for Char, ['K','o','t','l','i','n'] for String
}

// Char vs String both boil down to "how many letters can live inside the
// quotes" -- so the visual is just the quoted literal itself, with each
// character revealed one at a time to make the count viscerally obvious.
export const TokenVisual: React.FC<TokenVisualProps> = ({ isDark, quote, characters }) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= characters.length) {
      const pause = setTimeout(() => setVisibleCount(0), 1700);
      return () => clearTimeout(pause);
    }
    const step = setTimeout(() => setVisibleCount((c) => c + 1), 260);
    return () => clearTimeout(step);
  }, [visibleCount, characters.length]);

  const replay = () => {
    soundFX.playClick();
    setVisibleCount(0);
  };

  const settled = visibleCount >= characters.length;

  return (
    <VisualCard isDark={isDark} onClick={replay}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="flex items-center gap-1 sm:gap-1.5 rounded-3xl px-4 py-4 sm:px-5 sm:py-5"
          style={{
            background: nodeSurface(isDark),
            boxShadow: settled
              ? '0 0 0 3px #6366f1, 0 8px 18px -6px rgba(99,102,241,0.4)'
              : isDark
              ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 6px rgba(0,0,0,0.3)'
              : '0 3px 10px -4px rgba(99,102,241,0.18)',
          }}
        >
          <span className={`font-mono font-black text-xl sm:text-2xl ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>
            {quote}
          </span>
          <div className="flex items-center">
            <AnimatePresence>
              {characters.slice(0, visibleCount).map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`font-mono font-black text-xl sm:text-2xl ${isDark ? 'text-white' : 'text-[#181235]'}`}
                >
                  {ch}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
          <span className={`font-mono font-black text-xl sm:text-2xl ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>
            {quote}
          </span>
        </div>

        <span className={`${LABEL_CLASS} ${settled ? 'text-indigo-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {characters.length === 1 ? 'ONE CHARACTER' : 'SEQUENCE OF CHARACTERS'}
        </span>
      </div>
    </VisualCard>
  );
};
