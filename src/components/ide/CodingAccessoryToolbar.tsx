import React from 'react';

interface CodingAccessoryToolbarProps {
  onInsertToken: (token: string) => void;
  onInsertSymbol: (symbol: string) => void;
  customTokens?: string[];
}

const DEFAULT_KEYWORDS = [
  { text: 'println', color: 'text-amber-300 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40 font-semibold' },
  { text: 'val', color: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40' },
  { text: 'var', color: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40' },
  { text: 'fun', color: 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40' },
  { text: 'return', color: 'text-indigo-300 border-indigo-500/40 bg-indigo-950/40 hover:bg-indigo-900/50' },
  { text: 'if', color: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40' },
  { text: 'else', color: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40' },
  { text: 'when', color: 'text-sky-300 border-sky-500/40 bg-sky-950/30 hover:bg-sky-900/40' },
  { text: 'for', color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40' },
  { text: 'in', color: 'text-emerald-300 border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40' },
  { text: 'listOf', color: 'text-teal-300 border-teal-500/40 bg-teal-950/30 hover:bg-teal-900/40' },
  { text: 'mapOf', color: 'text-teal-300 border-teal-500/40 bg-teal-950/30 hover:bg-teal-900/40' },
  { text: 'Int', color: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40' },
  { text: 'String', color: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40' },
  { text: 'Boolean', color: 'text-amber-200 border-amber-500/40 bg-amber-950/30 hover:bg-amber-900/40' },
];

const PROGRAMMING_SYMBOLS = [
  { label: 'Tab', value: '    ', width: 'px-2.5' },
  { label: '*', value: '*', width: 'w-[30px]', special: 'text-indigo-300 font-bold' },
  { label: '{', value: '{', width: 'w-[30px]' },
  { label: '}', value: '}', width: 'w-[30px]' },
  { label: '(', value: '(', width: 'w-[30px]' },
  { label: ')', value: ')', width: 'w-[30px]' },
  { label: '[', value: '[', width: 'w-[30px]' },
  { label: ']', value: ']', width: 'w-[30px]' },
  { label: '=', value: '=', width: 'w-[30px]' },
  { label: '+', value: '+', width: 'w-[30px]' },
  { label: '-', value: '-', width: 'w-[30px]' },
  { label: '.', value: '.', width: 'w-[30px]' },
  { label: ',', value: ',', width: 'w-[30px]' },
  { label: ':', value: ':', width: 'w-[30px]' },
  { label: ';', value: ';', width: 'w-[30px]' },
  { label: '"', value: '"', width: 'w-[30px]' },
];

export const CodingAccessoryToolbar: React.FC<CodingAccessoryToolbarProps> = ({
  onInsertToken,
  onInsertSymbol,
  customTokens = [],
}) => {
  return (
    <nav
      aria-label="Code Input Quick Bar"
      className="bg-[#121623] border-t border-slate-800/90 px-2 py-1 shrink-0 flex flex-col gap-1 z-20 select-none"
    >
      {/* Row 1: Contextual Kotlin suggestions row */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5">
        {/* Custom lesson tokens shown first with high priority styling */}
        {customTokens.map((token) => (
          <button
            key={`custom-${token}`}
            type="button"
            onClick={() => onInsertToken(token)}
            className="font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-900/60 text-indigo-200 border border-indigo-400/50 shrink-0 hover:bg-indigo-800/80 active:scale-95 transition-all cursor-pointer whitespace-nowrap shadow-xs"
          >
            {token}
          </button>
        ))}

        {DEFAULT_KEYWORDS.filter((item) => !customTokens.includes(item.text)).map((item) => (
          <button
            key={item.text}
            type="button"
            onClick={() => onInsertToken(item.text)}
            className={`font-mono text-[11px] px-2.5 py-0.5 rounded-full border shrink-0 active:scale-95 transition-all cursor-pointer whitespace-nowrap ${item.color}`}
          >
            {item.text}
          </button>
        ))}
      </div>

      {/* Row 2: Frequently used programming symbols strip including * */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5 px-0.5">
        {PROGRAMMING_SYMBOLS.map((sym) => (
          <button
            key={sym.label}
            type="button"
            onClick={() => onInsertSymbol(sym.value)}
            className={`font-mono text-[12px] h-[28px] rounded-md bg-[#1f2638] hover:bg-[#28324a] active:bg-indigo-600 ${
              sym.special || 'text-slate-200'
            } border border-slate-700/50 shrink-0 flex items-center justify-center cursor-pointer transition-all active:scale-95 ${
              sym.width
            }`}
          >
            {sym.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
