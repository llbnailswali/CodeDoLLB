import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Sparkles, Check, ArrowDown, ArrowRight, Settings2, HelpCircle } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface FunctionAnimatedExplainerProps {
  isDark: boolean;
}

type ModeType = 'juice' | 'math' | 'code';

interface Scenario {
  id: ModeType;
  title: string;
  subtitle: string;
  signature: string;
  inputName: string;
  outputName: string;
  items: {
    id: string;
    label: string;
    icon: string;
    inputVal: string;
    outputVal: string;
    outputIcon: string;
    color: string;
    liquidColor: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'juice',
    title: 'The Juice Machine',
    subtitle: 'Real-World Metaphor',
    signature: 'fun makeJuice(fruit: Fruit): Juice',
    inputName: 'Fruit (Argument)',
    outputName: 'Fresh Juice (Return)',
    items: [
      {
        id: 'orange',
        label: 'Orange',
        icon: '🍊',
        inputVal: '"Orange"',
        outputVal: '"Fresh Orange Juice"',
        outputIcon: '🍹',
        color: '#f97316',
        liquidColor: '#fb923c',
      },
      {
        id: 'apple',
        label: 'Apple',
        icon: '🍎',
        inputVal: '"Apple"',
        outputVal: '"Crisp Apple Cider"',
        outputIcon: '🧃',
        color: '#ef4444',
        liquidColor: '#f87171',
      },
      {
        id: 'berries',
        label: 'Berries',
        icon: '🍓',
        inputVal: '"Strawberry"',
        outputVal: '"Berry Smoothie"',
        outputIcon: '🥤',
        color: '#ec4899',
        liquidColor: '#f472b6',
      },
    ],
  },
  {
    id: 'math',
    title: 'The Number Multiplier',
    subtitle: 'Mathematical Logic',
    signature: 'fun multiplyByTwo(number: Int): Int',
    inputName: 'Number (x)',
    outputName: 'Result (x * 2)',
    items: [
      {
        id: 'n3',
        label: '3',
        icon: '3️⃣',
        inputVal: '3',
        outputVal: '6',
        outputIcon: '6️⃣',
        color: '#6366f1',
        liquidColor: '#818cf8',
      },
      {
        id: 'n5',
        label: '5',
        icon: '5️⃣',
        inputVal: '5',
        outputVal: '10',
        outputIcon: '🔟',
        color: '#8b5cf6',
        liquidColor: '#a78bfa',
      },
      {
        id: 'n8',
        label: '8',
        icon: '8️⃣',
        inputVal: '8',
        outputVal: '16',
        outputIcon: '🎯',
        color: '#06b6d4',
        liquidColor: '#22d3ee',
      },
    ],
  },
  {
    id: 'code',
    title: 'The Greeting Builder',
    subtitle: 'Kotlin Code String Logic',
    signature: 'fun greet(name: String): String',
    inputName: 'Name Parameter',
    outputName: 'Greeting String',
    items: [
      {
        id: 'alex',
        label: 'Alex',
        icon: '👤',
        inputVal: '"Alex"',
        outputVal: '"Hello, Alex!"',
        outputIcon: '💬',
        color: '#10b981',
        liquidColor: '#34d399',
      },
      {
        id: 'sam',
        label: 'Sam',
        icon: '🧑',
        inputVal: '"Sam"',
        outputVal: '"Hello, Sam!"',
        outputIcon: '💬',
        color: '#3b82f6',
        liquidColor: '#60a5fa',
      },
      {
        id: 'kotlin',
        label: 'Kotlin',
        icon: '⚡',
        inputVal: '"Kotlin"',
        outputVal: '"Hello, Kotlin!"',
        outputIcon: '💬',
        color: '#7c3aed',
        liquidColor: '#a855f7',
      },
    ],
  },
];

export const FunctionAnimatedExplainer: React.FC<FunctionAnimatedExplainerProps> = ({ isDark }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<ModeType>('juice');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  
  // Animation State: 'idle' -> 'dropping' -> 'processing' -> 'outputting' -> 'done'
  const [animState, setAnimState] = useState<'idle' | 'dropping' | 'processing' | 'outputting' | 'done'>('idle');
  const [autoLoop, setAutoLoop] = useState<boolean>(true);

  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];
  const activeItem = scenario.items[selectedItemIndex];

  // Run the full graphical machine sequence
  const startMachine = () => {
    soundFX.playClick();
    setAnimState('dropping');
  };

  // State machine sequence timer
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (animState === 'dropping') {
      timer = setTimeout(() => {
        setAnimState('processing');
        soundFX.playClick();
      }, 750);
    } else if (animState === 'processing') {
      timer = setTimeout(() => {
        setAnimState('outputting');
        soundFX.playSuccess();
      }, 1200);
    } else if (animState === 'outputting') {
      timer = setTimeout(() => {
        setAnimState('done');
      }, 850);
    } else if (animState === 'done' && autoLoop) {
      timer = setTimeout(() => {
        // Cycle to next item seamlessly
        setSelectedItemIndex((prev) => (prev + 1) % scenario.items.length);
        setAnimState('dropping');
      }, 2200);
    }

    return () => clearTimeout(timer);
  }, [animState, autoLoop, scenario.items.length]);

  // Initial trigger
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setAnimState('dropping');
    }, 600);
    return () => clearTimeout(initialTimer);
  }, [selectedScenarioId]);

  return (
    <div
      id="function-graphical-explainer"
      className={`rounded-2xl border transition-all overflow-hidden ${
        isDark
          ? 'bg-[#111624] border-indigo-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-white border-indigo-100 shadow-[0_8px_30px_rgba(99,102,241,0.08)]'
      }`}
    >
      {/* 1. Header Toolbar */}
      <div
        className={`px-4 py-3 flex flex-wrap items-center justify-between gap-2 border-b ${
          isDark ? 'bg-[#161c2d] border-white/10' : 'bg-slate-50 border-slate-200/80'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
              isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white shadow-sm'
            }`}
          >
            f(x)
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-['Outfit'] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Visual Architecture
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                GRAPHICAL DIAGRAM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Input ➔ Function Machine ➔ Output
            </p>
          </div>
        </div>

        {/* Metaphor Selectors */}
        <div className="flex items-center gap-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                soundFX.playClick();
                setSelectedScenarioId(s.id);
                setSelectedItemIndex(0);
                setAnimState('idle');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-['Outfit'] font-semibold transition-all cursor-pointer ${
                selectedScenarioId === s.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {s.id === 'juice' ? '🧃 Juice Machine' : s.id === 'math' ? '✖️ Multiplier' : '💬 Greeter'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Graphical Blueprint Canvas */}
      <div className="p-4 sm:p-6 select-none relative overflow-hidden">
        {/* Background Grid Accent */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 pointer-events-none opacity-40 ${
            isDark
              ? 'bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]'
          }`}
        />

        {/* Top 3 Core Concept Badges: Clear visual 3-pillar breakdown */}
        <div className="grid grid-cols-3 gap-2 mb-6 relative z-10">
          <div
            className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
              animState === 'dropping'
                ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-indigo-500/10'
                : isDark
                ? 'bg-[#182032] border-white/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="block text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-indigo-500 uppercase">
              1. INPUT
            </span>
            <span className="text-xs sm:text-sm font-['Outfit'] font-bold text-slate-800 dark:text-slate-100">
              Argument
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">What goes in</span>
          </div>

          <div
            className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
              animState === 'processing'
                ? 'border-purple-500 ring-2 ring-purple-500/30 bg-purple-500/10'
                : isDark
                ? 'bg-[#182032] border-white/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="block text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-purple-500 uppercase">
              2. MACHINE
            </span>
            <span className="text-xs sm:text-sm font-['Outfit'] font-bold text-slate-800 dark:text-slate-100">
              Function Body
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">Does the work</span>
          </div>

          <div
            className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
              animState === 'outputting' || animState === 'done'
                ? 'border-emerald-500 ring-2 ring-emerald-500/30 bg-emerald-500/10'
                : isDark
                ? 'bg-[#182032] border-white/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="block text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-emerald-500 uppercase">
              3. OUTPUT
            </span>
            <span className="text-xs sm:text-sm font-['Outfit'] font-bold text-slate-800 dark:text-slate-100">
              Return Value
            </span>
            <span className="hidden sm:block text-[10px] text-slate-400 mt-0.5">What comes out</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* THE MAIN GRAPHICAL MACHINE (SVG & ANIMATED VECTORS)           */}
        {/* ============================================================== */}
        <div className="relative z-10 flex flex-col items-center">
          {/* A. INPUT CHUTE & CONVEYOR */}
          <div className="flex flex-col items-center w-full max-w-xs relative mb-1">
            {/* Input Selection Pills */}
            <div className="flex items-center gap-2 mb-2">
              {scenario.items.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedItemIndex(idx);
                    setAnimState('dropping');
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    selectedItemIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md scale-105 ring-2 ring-indigo-300 dark:ring-indigo-700'
                      : isDark
                      ? 'bg-[#192236] text-slate-300 hover:bg-[#202b44] border border-white/10'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Inflow Pipe / Funnel */}
            <div className="relative w-28 h-16 flex flex-col items-center justify-center">
              {/* Funnel SVG */}
              <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 60" fill="none">
                <path
                  d="M10 5 L90 5 L65 55 L35 55 Z"
                  className={isDark ? 'fill-[#1c2438] stroke-indigo-500/50' : 'fill-slate-200 stroke-indigo-400'}
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="50"
                  cy="5"
                  rx="40"
                  ry="5"
                  className={isDark ? 'fill-[#25304a] stroke-indigo-400' : 'fill-slate-300 stroke-indigo-500'}
                  strokeWidth="2"
                />
              </svg>

              {/* Input Argument Label Tag */}
              <div className="absolute -top-1 bg-indigo-600 text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                <span>arg:</span>
                <span className="underline">{activeItem.inputVal}</span>
              </div>

              {/* Animated Falling Ingredient */}
              <AnimatePresence mode="wait">
                {(animState === 'dropping' || animState === 'idle') && (
                  <motion.div
                    key={`${activeItem.id}-${animState}`}
                    initial={{ y: -25, scale: 0.7, opacity: 0 }}
                    animate={{
                      y: animState === 'dropping' ? [ -20, 0, 35 ] : 0,
                      scale: animState === 'dropping' ? [ 0.8, 1.2, 0.4 ] : 1,
                      opacity: animState === 'dropping' ? [ 0, 1, 0.8 ] : 1,
                    }}
                    transition={{ duration: 0.75, ease: 'easeInOut' }}
                    className="absolute z-20 flex flex-col items-center pointer-events-none"
                  >
                    <span className="text-2xl filter drop-shadow-lg">{activeItem.icon}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* B. THE MACHINE BODY */}
          <div
            className={`w-full max-w-sm rounded-2xl p-4 sm:p-5 border-2 relative transition-all duration-300 shadow-xl ${
              animState === 'processing'
                ? isDark
                  ? 'bg-gradient-to-b from-[#1b2238] to-[#14192b] border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.35)] ring-4 ring-purple-500/20'
                  : 'bg-gradient-to-b from-purple-50 to-indigo-50/50 border-purple-500 shadow-lg ring-4 ring-purple-200'
                : isDark
                ? 'bg-[#151c2d] border-indigo-500/40'
                : 'bg-slate-100 border-slate-300 shadow-md'
            }`}
          >
            {/* Top Indicator Lights */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    animState === 'processing'
                      ? 'bg-purple-500 animate-ping'
                      : animState === 'outputting' || animState === 'done'
                      ? 'bg-emerald-500'
                      : 'bg-slate-400 dark:bg-slate-600'
                  }`}
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    animState === 'processing' ? 'bg-amber-400' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    animState === 'outputting' ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              </div>

              {/* Function Signature Nameplate */}
              <div
                className={`px-2.5 py-0.5 rounded-md border font-mono text-[10px] font-bold tracking-tight ${
                  isDark
                    ? 'bg-[#0b0f19] border-white/10 text-purple-300'
                    : 'bg-white border-slate-200 text-purple-700 shadow-xs'
                }`}
              >
                {scenario.signature.split('(')[0]}()
              </div>

              <div className="text-[10px] font-mono font-bold text-slate-400">
                STATUS: {animState.toUpperCase()}
              </div>
            </div>

            {/* Central Window / Chamber with Spinning Gears & Particles */}
            <div
              className={`relative h-28 rounded-xl border-2 overflow-hidden flex items-center justify-center transition-all ${
                isDark
                  ? 'bg-[#0c101c] border-indigo-500/30'
                  : 'bg-white border-indigo-200/80'
              }`}
            >
              {/* Internal Chamber Background Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #6366f1 1px, transparent 1px)',
                  backgroundSize: '12px 12px',
                }}
              />

              {/* Spinning Mechanism (Gears / Blender Blades) */}
              <div className="relative flex items-center justify-center">
                {/* Left Gear */}
                <motion.svg
                  animate={{
                    rotate: animState === 'processing' ? 720 : [0, 360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: animState === 'processing' ? 1.2 : 8,
                    ease: 'linear',
                  }}
                  className={`w-14 h-14 -mr-3 ${
                    animState === 'processing' ? 'text-purple-500' : 'text-slate-400/40'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="2" />
                </motion.svg>

                {/* Right Gear */}
                <motion.svg
                  animate={{
                    rotate: animState === 'processing' ? -720 : [0, -360],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: animState === 'processing' ? 1.2 : 8,
                    ease: 'linear',
                  }}
                  className={`w-12 h-12 -ml-2 ${
                    animState === 'processing' ? 'text-indigo-500' : 'text-slate-400/30'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="12" cy="12" r="1.5" />
                </motion.svg>
              </div>

              {/* Processing Bubbles & Laser Light when Active */}
              {animState === 'processing' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.05, 0.95] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-purple-500/20 backdrop-blur-[1px]"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600 text-white font-mono text-xs font-bold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing Body Logic...</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-200 mt-1">
                    Processing {activeItem.inputVal}
                  </span>
                </motion.div>
              )}

              {/* Glass Glare Highlight */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
              />
            </div>

            {/* Bottom Machine Code Banner */}
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 dark:text-slate-400">
                Inside Function Body:
              </span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">
                {selectedScenarioId === 'juice'
                  ? 'blend(fruit)'
                  : selectedScenarioId === 'math'
                  ? 'return number * 2'
                  : 'return "Hello, $name!"'}
              </span>
            </div>
          </div>

          {/* C. OUTFLOW SPOUT & PRODUCED RESULT */}
          <div className="flex flex-col items-center w-full max-w-xs relative mt-1">
            {/* Spout Pipe */}
            <div className="w-8 h-8 bg-slate-300 dark:bg-slate-700 rounded-b-md border-x-2 border-b-2 border-slate-400 dark:border-slate-600 relative overflow-hidden flex items-center justify-center">
              {/* Stream Animation when Outputting */}
              <AnimatePresence>
                {(animState === 'outputting' || animState === 'done') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '100%', opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-4 rounded-full"
                    style={{ backgroundColor: activeItem.liquidColor }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Return Spout Particle drop */}
            <div className="h-6 w-full flex items-center justify-center relative">
              <AnimatePresence>
                {animState === 'outputting' && (
                  <motion.div
                    initial={{ y: -8, scale: 0.5, opacity: 0 }}
                    animate={{ y: [0, 15], scale: [1, 1.2], opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                    className="w-3 h-3 rounded-full shadow-md"
                    style={{ backgroundColor: activeItem.color }}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Final Output Platform */}
            <motion.div
              animate={{
                scale: animState === 'done' || animState === 'outputting' ? [0.95, 1.05, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`w-full rounded-2xl p-3 sm:p-4 border-2 transition-all flex items-center justify-between shadow-lg relative ${
                animState === 'done' || animState === 'outputting'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-4 ring-emerald-500/20'
                  : isDark
                  ? 'bg-[#151c2d] border-white/10 opacity-70'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md border"
                  style={{
                    backgroundColor: `${activeItem.liquidColor}25`,
                    borderColor: activeItem.liquidColor,
                  }}
                >
                  {animState === 'done' || animState === 'outputting' ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12 }}
                    >
                      {activeItem.outputIcon}
                    </motion.span>
                  ) : (
                    <span className="opacity-30">📦</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      return output:
                    </span>
                    {(animState === 'done' || animState === 'outputting') && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </div>
                  <div className="font-['Outfit'] font-bold text-sm text-slate-800 dark:text-white">
                    {animState === 'done' || animState === 'outputting' ? (
                      activeItem.outputVal
                    ) : (
                      <span className="text-slate-400 font-normal italic">Waiting for execution...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {animState === 'done' ? (
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>DELIVERED</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={startMachine}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-600 text-white font-['Outfit'] text-xs font-bold shadow-md hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. KEY TAKEAWAYS: THE 3 GOLDEN RULES OF FUNCTIONS              */}
        {/* ============================================================== */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-[#151c2d] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-['Outfit'] font-bold text-xs mb-1">
              <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">1</span>
              <span>Functions Take Inputs</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Called <strong>Parameters</strong> (the funnel slot) and <strong>Arguments</strong> (the actual fruit you drop in).
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-[#151c2d] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-['Outfit'] font-bold text-xs mb-1">
              <span className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center text-[10px]">2</span>
              <span>The Body Does the Work</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Code inside <code>{'{ ... }'}</code> executes on demand. You write the logic once and run it millions of times.
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isDark ? 'bg-[#151c2d] border-white/5' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-['Outfit'] font-bold text-xs mb-1">
              <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span>
              <span>Functions Return Results</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
              Using the <code>return</code> keyword, the machine sends the finished product back to whoever called it.
            </p>
          </div>
        </div>

        {/* Footer Playback Toggle */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoLoop((prev) => !prev)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border transition-all cursor-pointer ${
                autoLoop
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                  : isDark
                  ? 'bg-white/5 border-white/10 text-slate-400'
                  : 'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              Loop Animation: {autoLoop ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setAnimState('dropping');
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Tap any fruit or number above to test!
          </span>
        </div>
      </div>
    </div>
  );
};
