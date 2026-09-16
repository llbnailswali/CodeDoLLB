import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFX } from '../../utils/audio';

export type FlowChartVariant = 'if-else' | 'if-only' | 'compiler-filter' | 'while-loop';

export interface AnimatedFlowChartProps {
  isDark: boolean;
  variant?: FlowChartVariant;
  title?: string;
  subtitle?: string;
  conditionText?: string;
  trueLabel?: string;
  falseLabel?: string;
  ifBlockText?: string;
  elseBlockText?: string;
  startLabel?: string;
  endLabel?: string;
  sampleCode?: {
    condition: string;
    ifBody: string;
    elseBody?: string;
  };
  compact?: boolean;
}

export const AnimatedFlowChart: React.FC<AnimatedFlowChartProps> = ({
  isDark,
  variant = 'if-else',
  title = 'Conditional Flow of Execution',
  subtitle = 'Observe how the Kotlin runtime routes code execution based on the condition.',
  conditionText = 'Condition',
  trueLabel = 'if condition is true',
  falseLabel = 'if condition is false',
  ifBlockText = 'if block',
  elseBlockText = 'else block',
  startLabel = 'Start',
  endLabel = 'End',
  sampleCode = {
    condition: 'score >= 50',
    ifBody: 'println("Passed!")',
    elseBody: 'println("Try again")',
  },
  compact = false,
}) => {
  // Active branch state: 'true' or 'false'
  const [activeBranch, setActiveBranch] = useState<'true' | 'false'>('true');
  // Playback mode: 'auto' (alternates) or 'manual'
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  // Animation step inside the active path: 0: Start->Diamond, 1: Diamond->Block, 2: Block, 3: Block->End
  const [pulsePhase, setPulsePhase] = useState<number>(0);
  const [cycle, setCycle] = useState<number>(0);

  // Auto-cycling when auto play is active
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveBranch((prev) => (prev === 'true' ? 'false' : 'true'));
      setCycle((c) => c + 1);
    }, 4200);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Phase sequencing for visual pulse
  useEffect(() => {
    setPulsePhase(0);
    const t1 = setTimeout(() => setPulsePhase(1), 600);
    const t2 = setTimeout(() => setPulsePhase(2), 1500);
    const t3 = setTimeout(() => setPulsePhase(3), 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeBranch, cycle]);

  const toggleBranch = (branch: 'true' | 'false') => {
    soundFX.playClick();
    setIsAutoPlay(false);
    setActiveBranch(branch);
    setCycle((c) => c + 1);
  };

  const handleReplay = () => {
    soundFX.playClick();
    setCycle((c) => c + 1);
  };

  // Color palette for high contrast and pedagogical clarity
  const bgCard = isDark ? 'bg-[#121522]' : 'bg-[#f8f9ff]';
  const borderCard = isDark ? 'border-[#23293d]' : 'border-[#e0e7ff]';
  const textMuted = isDark ? 'text-slate-400' : 'text-slate-600';
  const textPrimary = isDark ? 'text-slate-100' : 'text-slate-900';

  // SVG Theme Colors
  const strokeNeutral = isDark ? '#334155' : '#cbd5e1';
  const lineDefault = isDark ? '#475569' : '#94a3b8';
  const nodeFillDefault = isDark ? '#1e293b' : '#ffffff';

  // True Branch Colors (Emerald / Blue theme)
  const trueActive = activeBranch === 'true';
  const trueColor = '#10b981'; // emerald-500
  const trueFill = isDark ? '#064e3b' : '#d1fae5';
  const trueBoxBorder = trueActive ? '#10b981' : isDark ? '#1e3a8a' : '#bfdbfe';
  const trueBoxFill = trueActive
    ? isDark ? '#062d22' : '#ecfdf5'
    : isDark ? '#1e293b' : '#eff6ff';

  // Has else/second block check
  const hasElseBlock = variant === 'if-else' || variant === 'compiler-filter';

  // False Branch Colors (Amber / Rose / Violet theme)
  const falseActive = activeBranch === 'false';
  const falseColor = '#f59e0b'; // amber-500
  const falseFill = isDark ? '#78350f' : '#fef3c7';
  const falseBoxBorder = falseActive ? '#f59e0b' : isDark ? '#475569' : '#cbd5e1';
  const falseBoxFill = falseActive
    ? isDark ? '#2e1c0c' : '#fffbeb'
    : isDark ? '#1e293b' : '#f8fafc';

  return (
    <div
      className={`relative w-full rounded-2xl p-4 sm:p-5 border transition-all select-none ${bgCard} ${borderCard} shadow-sm`}
    >
      {/* Header bar: Title, status pill, and interactive controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-500 text-[18px]">alt_route</span>
            <h4 className={`text-sm sm:text-base font-['Outfit'] font-bold ${textPrimary}`}>
              {title}
            </h4>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wide uppercase ${
                activeBranch === 'true'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
              }`}
            >
              Path: {activeBranch.toUpperCase()}
            </span>
          </div>
          {!compact && (
            <p className={`text-xs mt-0.5 ${textMuted}`}>{subtitle}</p>
          )}
        </div>

        {/* Branch Selector Pill Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
          <button
            type="button"
            onClick={() => toggleBranch('true')}
            className={`px-2.5 py-1 rounded-lg text-xs font-['Outfit'] font-bold flex items-center gap-1 transition-all active:scale-95 ${
              activeBranch === 'true'
                ? 'bg-emerald-500 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            True
          </button>
          <button
            type="button"
            onClick={() => toggleBranch('false')}
            className={`px-2.5 py-1 rounded-lg text-xs font-['Outfit'] font-bold flex items-center gap-1 transition-all active:scale-95 ${
              activeBranch === 'false'
                ? 'bg-amber-500 text-white shadow-sm'
                : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            False
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setIsAutoPlay((a) => !a);
            }}
            title={isAutoPlay ? 'Pause auto-cycling' : 'Enable auto-cycling'}
            className={`p-1 rounded-lg transition-all ${
              isAutoPlay
                ? 'text-indigo-500 hover:bg-indigo-500/10'
                : isDark
                ? 'text-slate-500 hover:text-slate-300'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isAutoPlay ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleReplay}
            title="Replay active flow animation"
            className="p-1 rounded-lg text-slate-400 hover:text-indigo-500 transition-all active:rotate-180 duration-300"
          >
            <span className="material-symbols-outlined text-[16px]">replay</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* SVG Flow Chart (matching the user's diagram with high precision) */}
        <div className="md:col-span-7 flex justify-center py-2 overflow-x-auto">
          <svg
            viewBox="0 0 350 430"
            className="w-full max-w-[340px] sm:max-w-[360px] h-auto drop-shadow-sm select-none"
            aria-label="Conditional Execution Flow Chart"
          >
            <defs>
              {/* Arrowheads */}
              <marker
                id="arrow-neutral"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={lineDefault} />
              </marker>
              <marker
                id="arrow-true"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={trueActive ? trueColor : lineDefault} />
              </marker>
              <marker
                id="arrow-false"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={falseActive ? falseColor : lineDefault} />
              </marker>

              {/* Glowing filters for signal pulse */}
              <filter id="glow-true" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-false" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* STATIC & DYNAMIC PATHS */}

            {/* 1. Start to Condition Diamond line */}
            <line
              x1="120"
              y1="40"
              x2="120"
              y2="82"
              stroke={pulsePhase >= 0 ? (trueActive ? trueColor : falseColor) : lineDefault}
              strokeWidth={pulsePhase === 0 ? '2.5' : '1.75'}
              strokeDasharray={pulsePhase === 0 ? '4 3' : 'none'}
              markerEnd="url(#arrow-neutral)"
              className="transition-colors duration-300"
            />

            {/* 2. True Branch Path (Diamond Right -> Turn Down -> if block -> Turn Left -> Join) */}
            {/* Path A: Diamond to if-block */}
            <path
              id="path-true-to-block"
              d="M 158 122 L 250 122 L 250 178"
              fill="none"
              stroke={trueActive ? trueColor : strokeNeutral}
              strokeWidth={trueActive ? '2.5' : '1.5'}
              strokeDasharray={trueActive ? 'none' : '3 3'}
              markerEnd={trueActive ? 'url(#arrow-true)' : 'url(#arrow-neutral)'}
              className="transition-colors duration-300"
            />

            {/* Path B: if-block exit to merge junction */}
            <path
              id="path-true-from-block"
              d="M 250 224 L 250 338 L 124 338"
              fill="none"
              stroke={trueActive ? trueColor : strokeNeutral}
              strokeWidth={trueActive ? '2.5' : '1.5'}
              strokeDasharray={trueActive ? 'none' : '3 3'}
              markerEnd={trueActive ? 'url(#arrow-true)' : 'url(#arrow-neutral)'}
              className="transition-colors duration-300"
            />

            {/* 3. False Branch Path (Diamond Bottom -> else block -> Merge Junction) */}
            {hasElseBlock ? (
              <>
                {/* Path A: Diamond to else block */}
                <line
                  id="path-false-to-block"
                  x1="120"
                  y1="160"
                  x2="120"
                  y2="238"
                  stroke={falseActive ? falseColor : strokeNeutral}
                  strokeWidth={falseActive ? '2.5' : '1.5'}
                  strokeDasharray={falseActive ? 'none' : '3 3'}
                  markerEnd={falseActive ? 'url(#arrow-false)' : 'url(#arrow-neutral)'}
                  className="transition-colors duration-300"
                />
                {/* Path B: else block to merge junction */}
                <line
                  id="path-false-from-block"
                  x1="120"
                  y1="284"
                  x2="120"
                  y2="338"
                  stroke={falseActive ? falseColor : strokeNeutral}
                  strokeWidth={falseActive ? '2.5' : '1.5'}
                  strokeDasharray={falseActive ? 'none' : '3 3'}
                  className="transition-colors duration-300"
                />
              </>
            ) : (
              /* if-only: false path bypasses straight down */
              <line
                x1="120"
                y1="160"
                x2="120"
                y2="338"
                stroke={falseActive ? falseColor : strokeNeutral}
                strokeWidth={falseActive ? '2.5' : '1.5'}
                strokeDasharray={falseActive ? 'none' : '3 3'}
                className="transition-colors duration-300"
              />
            )}

            {/* 4. Merge Junction to End */}
            <line
              x1="120"
              y1="338"
              x2="120"
              y2="384"
              stroke={pulsePhase >= 3 ? (trueActive ? trueColor : falseColor) : lineDefault}
              strokeWidth={pulsePhase >= 3 ? '2.5' : '1.75'}
              markerEnd="url(#arrow-neutral)"
              className="transition-colors duration-300"
            />

            {/* Merge junction circular dot */}
            <circle
              cx="120"
              cy="338"
              r="3.5"
              fill={isDark ? '#64748b' : '#475569'}
              stroke={isDark ? '#0f172a' : '#ffffff'}
              strokeWidth="1.5"
            />

            {/* TRAVELING PULSE / PARTICLE (Native SVG animated particle) */}
            {trueActive && (
              <circle r="4.5" fill="#34d399" filter="url(#glow-true)">
                <animateMotion
                  key={`pulse-true-${cycle}`}
                  dur="2.4s"
                  repeatCount="indefinite"
                  path="M 120 25 L 120 122 L 250 122 L 250 204 L 250 338 L 120 338 L 120 398"
                />
              </circle>
            )}

            {falseActive && (
              <circle r="4.5" fill="#fbbf24" filter="url(#glow-false)">
                <animateMotion
                  key={`pulse-false-${cycle}`}
                  dur="2.2s"
                  repeatCount="indefinite"
                  path={
                    hasElseBlock
                      ? 'M 120 25 L 120 122 L 120 262 L 120 338 L 120 398'
                      : 'M 120 25 L 120 122 L 120 338 L 120 398'
                  }
                />
              </circle>
            )}

            {/* NODES */}

            {/* START NODE (Oval / split circle as in diagram) */}
            <g
              transform="translate(120, 25)"
              className="cursor-pointer"
              onClick={handleReplay}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="18"
                ry="13"
                fill={nodeFillDefault}
                stroke={strokeNeutral}
                strokeWidth="1.5"
              />
              <line x1="-18" y1="0" x2="18" y2="0" stroke={strokeNeutral} strokeWidth="1.2" />
            </g>

            {/* CONDITION DIAMOND */}
            <g
              transform="translate(120, 122)"
              className="cursor-pointer transition-transform active:scale-95"
              onClick={() => toggleBranch(activeBranch === 'true' ? 'false' : 'true')}
            >
              {/* Diamond Polygon: rotated 45 deg or polygon points */}
              <polygon
                points="0,-36 38,0 0,36 -38,0"
                fill={
                  trueActive
                    ? isDark ? '#0c2e42' : '#e0f2fe'
                    : isDark ? '#2e2010' : '#fef3c7'
                }
                stroke={trueActive ? '#38bdf8' : '#fbbf24'}
                strokeWidth={pulsePhase === 1 ? '2.5' : '1.75'}
                className="transition-colors duration-300"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
                fill={isDark ? '#f1f5f9' : '#0f172a'}
              >
                {conditionText}
              </text>
            </g>

            {/* BRANCH LABELS (Carefully aligned as in user's diagram) */}
            {/* "if condition is true" Label */}
            <g transform="translate(254, 142)">
              <text
                x="0"
                y="0"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
                fill={trueActive ? (isDark ? '#34d399' : '#059669') : isDark ? '#94a3b8' : '#64748b'}
                className="transition-colors duration-200"
              >
                {trueLabel.includes('is true') ? (
                  <>
                    <tspan x="0" dy="0">if condition</tspan>
                    <tspan x="0" dy="12" fontWeight="800">is true</tspan>
                  </>
                ) : (
                  trueLabel
                )}
              </text>
            </g>

            {/* "if condition is false" Label */}
            <g transform="translate(112, 196)">
              <text
                x="0"
                y="0"
                textAnchor="end"
                fontSize="9.5"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
                fill={falseActive ? (isDark ? '#fbbf24' : '#d97706') : isDark ? '#94a3b8' : '#64748b'}
                className="transition-colors duration-200"
              >
                {falseLabel.includes('is false') ? (
                  <>
                    <tspan x="0" dy="0">if condition</tspan>
                    <tspan x="0" dy="12" fontWeight="800">is false</tspan>
                  </>
                ) : (
                  falseLabel
                )}
              </text>
            </g>

            {/* "if block" RECTANGLE */}
            <g
              transform="translate(250, 204)"
              className="cursor-pointer transition-transform active:scale-95"
              onClick={() => toggleBranch('true')}
            >
              <rect
                x="-48"
                y="-20"
                width="96"
                height="40"
                rx="4"
                fill={trueBoxFill}
                stroke={trueBoxBorder}
                strokeWidth={trueActive && pulsePhase === 2 ? '2.5' : '1.5'}
                className="transition-colors duration-300"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="Outfit, sans-serif"
                fill={trueActive ? (isDark ? '#6ee7b7' : '#047857') : isDark ? '#cbd5e1' : '#334155'}
              >
                {ifBlockText}
              </text>
            </g>

            {/* "else block" RECTANGLE (only when variant has else) */}
            {hasElseBlock && (
              <g
                transform="translate(120, 262)"
                className="cursor-pointer transition-transform active:scale-95"
                onClick={() => toggleBranch('false')}
              >
                <rect
                  x="-48"
                  y="-20"
                  width="96"
                  height="40"
                  rx="4"
                  fill={falseBoxFill}
                  stroke={falseBoxBorder}
                  strokeWidth={falseActive && pulsePhase === 2 ? '2.5' : '1.5'}
                  className="transition-colors duration-300"
                />
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="Outfit, sans-serif"
                  fill={falseActive ? (isDark ? '#fcd34d' : '#b45309') : isDark ? '#cbd5e1' : '#334155'}
                >
                  {elseBlockText}
                </text>
              </g>
            )}

            {/* END NODE (Split circle / terminal oval as in user's diagram) */}
            <g
              transform="translate(120, 398)"
              className="cursor-pointer"
              onClick={handleReplay}
            >
              <ellipse
                cx="0"
                cy="0"
                rx="18"
                ry="13"
                fill={nodeFillDefault}
                stroke={strokeNeutral}
                strokeWidth="1.5"
              />
              <line x1="-18" y1="0" x2="18" y2="0" stroke={strokeNeutral} strokeWidth="1.2" />
            </g>
          </svg>
        </div>

        {/* Live Code Synchronization & Branch Inspector */}
        <div className="md:col-span-5 flex flex-col justify-center gap-3">
          <div
            className={`rounded-xl p-3 border font-mono text-xs leading-relaxed ${
              isDark ? 'bg-[#181c2b] border-[#293248]' : 'bg-[#f1f4ff] border-[#d8e0fc]'
            }`}
          >
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-black/5 dark:border-white/5 text-[10px] font-['Outfit'] uppercase tracking-wider font-bold text-slate-400">
              <span>Kotlin Code Trace</span>
              <span className="text-indigo-400">Live Evaluation</span>
            </div>

            {/* Condition line */}
            <div
              className={`p-1.5 rounded transition-colors ${
                pulsePhase <= 1
                  ? isDark ? 'bg-indigo-950/60 text-indigo-300' : 'bg-indigo-100/80 text-indigo-900'
                  : textMuted
              }`}
            >
              <span className="text-purple-400 font-bold">if</span> ({sampleCode.condition}) {'{'}
            </div>

            {/* If block body */}
            <div
              className={`pl-4 py-1.5 pr-2 rounded transition-all duration-300 ${
                trueActive
                  ? isDark
                    ? 'bg-emerald-950/70 text-emerald-300 border-l-2 border-emerald-400 font-semibold shadow-sm'
                    : 'bg-emerald-100/90 text-emerald-900 border-l-2 border-emerald-500 font-semibold shadow-sm'
                  : 'text-slate-400/60'
              }`}
            >
              {sampleCode.ifBody}
              {trueActive && (
                <span className="ml-2 text-[10px] font-['Outfit'] uppercase font-bold text-emerald-500">
                  ◀ Executed
                </span>
              )}
            </div>

            {/* Else block body (if applicable) */}
            {hasElseBlock && (
              <>
                <div className="p-1 text-slate-400">
                  {'}'} <span className="text-purple-400 font-bold">else</span> {'{'}
                </div>
                <div
                  className={`pl-4 py-1.5 pr-2 rounded transition-all duration-300 ${
                    falseActive
                      ? isDark
                        ? 'bg-amber-950/70 text-amber-300 border-l-2 border-amber-400 font-semibold shadow-sm'
                        : 'bg-amber-100/90 text-amber-900 border-l-2 border-amber-500 font-semibold shadow-sm'
                      : 'text-slate-400/60'
                  }`}
                >
                  {sampleCode.elseBody ?? 'println("Default")'}
                  {falseActive && (
                    <span className="ml-2 text-[10px] font-['Outfit'] uppercase font-bold text-amber-500">
                      ◀ Executed
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="p-1 text-slate-400">{'}'}</div>
          </div>

          {/* Interactive explanation pill */}
          <div
            className={`p-2.5 rounded-xl border text-xs ${
              trueActive
                ? isDark
                  ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : isDark
                ? 'bg-amber-950/30 border-amber-800/40 text-amber-300'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <div className="flex items-center gap-1.5 font-['Outfit'] font-bold text-[11px] mb-0.5">
              <span className="material-symbols-outlined text-[14px]">
                {trueActive ? 'check_circle' : 'swap_horiz'}
              </span>
              <span>
                {trueActive ? 'Condition Evaluates to true' : 'Condition Evaluates to false'}
              </span>
            </div>
            <p className="text-[11px] opacity-90 leading-tight">
              {trueActive
                ? 'The control flow diverges right into the if block. The else block is completely bypassed!'
                : 'The control flow bypasses the if block and branches straight into the else block before continuing.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
