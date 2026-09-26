import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { AppTheme } from '../types';
import { soundFX } from '../utils/audio';

// Placeholder until CodeDo is actually published -- update once a real Play
// Store (and, if built, App Store) listing exists.
const CODEDO_APP_LINK = 'https://play.google.com/store/apps/details?id=com.codedo.app';

interface BossMasteredModalProps {
  theme: AppTheme;
  worldTitle: string;
  masteredTopics: string[];
  completedWorlds: number;
  totalWorlds: number;
  onContinue: () => void;
}

// Shown in place of the ordinary Mastered stage specifically when a WORLD
// BOSS lesson is completed -- a full-screen celebration overlay (ported from
// the Google Stitch "Boss Challenge Cleared" design) rather than the plain
// inline Mastered page every other lesson uses.
export const BossMasteredModal: React.FC<BossMasteredModalProps> = ({
  theme,
  worldTitle,
  masteredTopics,
  completedWorlds,
  totalWorlds,
  onContinue,
}) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'copied'>('idle');
  const journeyPercentage = Math.round((completedWorlds / Math.max(1, totalWorlds)) * 100);
  const isDark = theme === 'dark';
  // Only the celebration content (hero + mastered topics + journey progress)
  // is captured as the shared image -- the Share section and Continue
  // Journey button below it are deliberately outside this ref.
  const shareableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    soundFX.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors:
          theme === 'dark'
            ? ['#6366f1', '#a855f7', '#fbbf24', '#818cf8']
            : ['#4f46e5', '#7c3aed', '#f59e0b', '#6366f1'],
      });
    } catch {
      // Confetti is a purely cosmetic enhancement -- ignore if unsupported.
    }
  }, [theme]);

  const handleShare = async () => {
    setShareStatus('sharing');
    const shareText = `I just cleared the Boss Challenge for "${worldTitle}" on CodeDo! 🏆`;
    const shareMessage = `${shareText}\n${CODEDO_APP_LINK}`;

    // Rendering the celebration card to an image is best-effort: if it
    // fails for any reason (an unsupported CSS feature in the WebView,
    // etc.), sharing still proceeds as text-only rather than blocking
    // entirely on the image.
    let imageDataUrl: string | null = null;
    if (shareableRef.current) {
      try {
        imageDataUrl = await toPng(shareableRef.current, {
          backgroundColor: isDark ? '#151b28' : '#ffffff',
          pixelRatio: 2,
          cacheBust: true,
        });
      } catch {
        imageDataUrl = null;
      }
    }

    try {
      if (Capacitor.isNativePlatform()) {
        let fileUri: string | undefined;
        if (imageDataUrl) {
          try {
            const base64Data = imageDataUrl.split(',')[1] ?? '';
            const writeResult = await Filesystem.writeFile({
              path: `codedo-boss-${Date.now()}.png`,
              data: base64Data,
              directory: Directory.Cache,
            });
            fileUri = writeResult.uri;
          } catch {
            fileUri = undefined;
          }
        }
        // WhatsApp/LinkedIn/Instagram etc. all appear in this native share
        // sheet -- the image attaches as a real file when captured
        // successfully, with the app link folded into the shared text.
        await Share.share({
          title: 'CodeDo Achievement',
          text: shareMessage,
          dialogTitle: 'Share your achievement',
          files: fileUri ? [fileUri] : undefined,
        });
        setShareStatus('idle');
        return;
      }

      // Browser fallback (e.g. testing the web build directly) -- share
      // the image as a real file when the browser supports Web Share
      // Level 2, otherwise fall back to a text+link share, then clipboard.
      if (imageDataUrl && navigator.canShare) {
        try {
          const blob = await (await fetch(imageDataUrl)).blob();
          const file = new File([blob], 'codedo-boss-challenge.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ title: 'CodeDo Achievement', text: shareText, url: CODEDO_APP_LINK, files: [file] });
            setShareStatus('idle');
            return;
          }
        } catch {
          // Fall through to a text-only share/clipboard below.
        }
      }

      if (navigator.share) {
        await navigator.share({ title: 'CodeDo Achievement', text: shareText, url: CODEDO_APP_LINK });
        setShareStatus('idle');
        return;
      }

      await navigator.clipboard.writeText(shareMessage);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      // User cancelled the share sheet, or no share/clipboard capability is
      // available at all -- either way, nothing further to do.
      setShareStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-1.5 py-3">
      {/* Backdrop -- matches the Task Details modal's backdrop (WriteRun.tsx/
          DebugIde.tsx) so the screen behind (still mounted underneath) is
          dimmed and blurred the same way elsewhere in the app. */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" />

      {/* Modal card */}
      <main
        className={`relative z-10 w-full max-w-[380px] max-h-[85vh] overflow-y-auto rounded-[28px] p-3.5 flex flex-col items-center border animate-scaleUp ${
          isDark
            ? 'bg-[#151b28] border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)]'
            : 'bg-white border-slate-100/90 shadow-[0_20px_40px_-15px_rgba(15,23,42,0.25),0_0_0_1px_rgba(226,232,240,0.8)]'
        }`}
      >
        {/* Everything captured into the shared image -- the Share section
            and Continue Journey button below are deliberately outside this
            wrapper, per the design of the shared achievement card. */}
        <div ref={shareableRef} className={`w-full flex flex-col items-center ${isDark ? 'bg-[#151b28]' : 'bg-white'}`}>
        {/* Celebration hero */}
        <section className="flex flex-col items-center text-center w-full pt-1">
          <div className="relative flex items-center justify-center mb-2.5">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-400/20 to-amber-300/30 blur-md animate-pulse-subtle" />
            <svg className="absolute -left-3.5 -bottom-0.5 w-4 h-4 text-amber-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
            <svg className="absolute -right-3 -top-1 w-3.5 h-3.5 text-indigo-400 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
            </svg>
            <div
              className={`relative w-16 h-16 rounded-full ring-4 border shadow-[0_0_25px_rgba(99,102,241,0.25)] flex items-center justify-center ${
                isDark
                  ? 'bg-gradient-to-b from-indigo-950/70 to-purple-950/50 ring-indigo-500/20 border-indigo-500/30'
                  : 'bg-gradient-to-b from-indigo-50/90 to-purple-50/60 ring-indigo-100/70 border-indigo-200/60'
              }`}
            >
              <svg className="w-8 h-8 drop-shadow-sm" fill="none" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 7C9 5.89543 9.89543 5 11 5H21C22.1046 5 23 5.89543 23 7V13C23 16.866 19.866 20 16 20C12.134 20 9 16.866 9 13V7Z" fill="url(#boss-trophy-cup-gradient)" />
                <path d="M9 8H6.5C5.11929 8 4 9.11929 4 10.5C4 12.7091 5.79086 14.5 8 14.5H9.2C9.07 14.02 9 13.52 9 13V8Z" fill="#FBBF24" />
                <path d="M23 8H25.5C26.8807 8 28 9.11929 28 10.5C28 12.7091 26.2091 14.5 24 14.5H22.8C22.93 14.02 23 13.52 23 13V8Z" fill="#FBBF24" />
                <path d="M14 20V23.5H18V20C17.36 20.32 16.69 20.5 16 20.5C15.31 20.5 14.64 20.32 14 20Z" fill="#4F46E5" />
                <rect fill="#4338CA" height="3" rx="1.5" width="10" x="11" y="23.5" />
                <path d="M14 10.5L12.5 12L14 13.5M18 10.5L19.5 12L18 13.5" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="boss-trophy-cup-gradient" x1="16" x2="16" y1="5" y2="20">
                    <stop stopColor="#6366F1" />
                    <stop offset="1" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider uppercase mb-1 ${
              isDark
                ? 'bg-gradient-to-r from-indigo-950/70 to-purple-950/50 border-indigo-500/30 text-indigo-300'
                : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200/70 text-indigo-700'
            }`}
          >
            <svg className="w-3 h-3 text-amber-500 fill-amber-400" viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>World Mastered!</span>
          </div>

          <h1
            className={`font-['Outfit'] text-[21px] font-bold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {worldTitle}
          </h1>

          <div
            className={`mt-1 inline-flex items-center gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full border ${
              isDark
                ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
                : 'bg-indigo-50/80 text-indigo-600 border-indigo-100'
            }`}
          >
            <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Boss Challenge Cleared</span>
          </div>
        </section>

        {/* Mastered topics -- every lesson in the world, as small-font
            bullet pointers in a two-column grid rather than a handful of
            single-row chips. */}
        {masteredTopics.length > 0 && (
          <section className="w-full mt-2.5">
            <div
              className={`text-[10px] uppercase tracking-widest font-bold mb-1 pl-2 pr-0.5 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              Mastered ({masteredTopics.length})
            </div>
            {/* CSS multi-column (not grid) so each column flows
                independently -- a 2-line item in one column must not force
                its row-partner in the other column to leave matching
                empty space beneath it, which a grid's shared row height
                would otherwise do. The two-column block is sized to its
                own content (w-fit) and centered via mx-auto, so column 1's
                start margin equals column 2's end margin -- centered as one
                unit, without affecting the "Mastered" heading above it.
                No overflow/scroll is applied here (see the <main> card's own
                scroll instead): a scrollbar's reserved gutter would eat
                space from only one side, throwing off that centering. */}
            <div className="w-full flex justify-center">
              <div className="columns-2 gap-x-4 w-fit max-w-full pl-2">
                {masteredTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-start gap-1 min-w-0 mb-1 break-inside-avoid text-left"
                    title={topic}
                  >
                    <span className="text-indigo-400 text-[9px] leading-[15px] shrink-0">•</span>
                    <span
                      className={`text-[10px] leading-[15px] font-medium line-clamp-2 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Journey progress */}
        <section className={`w-full mt-2.5 pt-2 border-t ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold text-[11px] ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {completedWorlds} of {totalWorlds} Worlds
            </span>
            <span className={`font-bold text-[11px] ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              {journeyPercentage}%
            </span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden flex ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 rounded-full"
              style={{ width: `${journeyPercentage}%` }}
            />
          </div>
          <div className={`text-[10px] mt-1 font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Kotlin Mastery Journey
          </div>
        </section>
        </div>

        {/* Share achievement */}
        <section
          className={`w-full mt-2.5 rounded-2xl p-2.5 border text-center ${
            isDark
              ? 'bg-gradient-to-b from-indigo-950/50 to-purple-950/25 border-indigo-500/20'
              : 'bg-gradient-to-b from-indigo-50/70 to-purple-50/40 border-indigo-100/80'
          }`}
        >
          <h2 className={`font-bold text-[13px] leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
            🎉 Share your achievement
          </h2>
          <p className={`text-[11px] mt-0.5 leading-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Show your Kotlin progress to your friends!
          </p>
          <button
            type="button"
            onClick={handleShare}
            disabled={shareStatus === 'sharing'}
            className="w-full h-11 mt-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-70 text-white font-semibold text-xs tracking-wide rounded-xl shadow-md shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            {shareStatus === 'copied' ? (
              <span>Copied to clipboard!</span>
            ) : shareStatus === 'sharing' ? (
              <span>Preparing image…</span>
            ) : (
              <>
                <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <line x1="7" x2="17" y1="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
                <span>Share Achievement</span>
              </>
            )}
          </button>
        </section>

        <button
          type="button"
          onClick={onContinue}
          className={`mt-2 text-xs font-semibold py-1 transition-colors flex items-center gap-1 focus:outline-none ${
            isDark ? 'text-slate-500 hover:text-white active:text-white' : 'text-slate-400 hover:text-slate-700 active:text-slate-900'
          }`}
        >
          <span>Continue Journey</span>
          <span aria-hidden="true">→</span>
        </button>
      </main>
    </div>
  );
};
