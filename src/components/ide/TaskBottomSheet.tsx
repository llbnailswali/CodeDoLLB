import React, { useState, useRef, useEffect } from 'react';

interface TaskBottomSheetProps {
  functionName: string;
  parameters: string;
  returns: string;
  description: string;
  summaryText?: string;
  sampleCall?: string;
  expectedOutput?: string;
  className?: string;
}

export const TaskBottomSheet: React.FC<TaskBottomSheetProps> = ({
  functionName,
  parameters,
  returns,
  description,
  summaryText,
  sampleCall,
  expectedOutput,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);

  const displaySummary =
    summaryText || 'Calculate & return product of two Int values';

  // Drag handlers for draggable bottom sheet
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - dragStartY;
    // If closed, only allow dragging up (negative diff)
    // If open, only allow dragging down (positive diff)
    if (!isOpen && diff < 0) {
      setDragOffset(Math.max(diff, -260));
    } else if (isOpen && diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset < -60 && !isOpen) {
      setIsOpen(true);
    } else if (dragOffset > 60 && isOpen) {
      setIsOpen(false);
    }
    setDragStartY(null);
    setDragOffset(0);
  };

  return (
    <>
      {/* Dim backdrop when sheet is expanded */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 transition-opacity duration-300 pointer-events-auto"
        />
      )}

      {/* Draggable Bottom Sheet Container */}
      <div
        style={{
          transform: isOpen
            ? `translateY(${Math.max(0, dragOffset)}px)`
            : dragOffset < 0
            ? `translateY(${dragOffset}px)`
            : undefined,
        }}
        className={`bg-[#101522] border-t border-slate-800 px-3.5 pt-1.5 pb-2 flex flex-col shrink-0 shadow-xl transition-transform duration-200 select-none z-40 ${
          isOpen ? 'fixed bottom-0 left-0 right-0 max-w-[412px] mx-auto rounded-t-2xl max-h-[75vh] overflow-y-auto' : 'relative'
        } ${className}`}
        id="task-bottom-sheet"
      >
        {/* Centered Drag Handle */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex flex-col items-center py-1 cursor-grab active:cursor-grabbing group"
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Collapse Task Sheet' : 'Expand Task Sheet'}
        >
          <div className="w-10 h-1 rounded-full bg-slate-600 group-hover:bg-indigo-400 transition-colors" />
        </div>

        {/* Collapsed Peek Header */}
        <div className="w-full flex items-center justify-between text-[11.5px] py-0.5">
          <div
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 truncate cursor-pointer flex-1"
          >
            <span className="px-1.5 py-0.5 rounded bg-indigo-950/90 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-700/50 shrink-0">
              TASK
            </span>
            <span className="font-medium text-slate-200 truncate">
              {displaySummary.includes('Int') ? (
                <>
                  Calculate &amp; return product of two <code className="font-mono text-amber-300 text-[10.5px]">Int</code> values
                </>
              ) : (
                displaySummary
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 font-medium shrink-0 ml-2 cursor-pointer"
          >
            <span className="text-[10.5px] font-mono text-indigo-300/90">Details</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Expanded Sheet Content (No Test Cases, purely functional specification) */}
        {isOpen && (
          <div className="pt-3 pb-3 border-t border-slate-800/80 mt-2 flex flex-col gap-3 text-xs animate-fadeIn">
            {/* Function Signature Specification Grid */}
            <div className="grid grid-cols-3 gap-2 text-[10.5px] font-mono">
              <div className="bg-[#171c2b] p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">FUNCTION</span>
                <span className="text-sky-300 font-semibold truncate block mt-0.5">
                  {functionName ? `${functionName}()` : 'multiply()'}
                </span>
              </div>
              <div className="bg-[#171c2b] p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">PARAMETERS</span>
                <span className="text-amber-300 truncate block mt-0.5">
                  {parameters || 'a: Int, b: Int'}
                </span>
              </div>
              <div className="bg-[#171c2b] p-2 rounded-lg border border-slate-800">
                <span className="text-slate-500 block text-[9px] uppercase font-bold tracking-wider">RETURNS</span>
                <span className="text-emerald-300 truncate block mt-0.5">
                  {returns || 'Int'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#141926] p-2.5 rounded-lg border border-slate-800 text-slate-300 text-[11.5px] leading-relaxed">
              {description || 'Implement the function logic to calculate and return the required value.'}
            </div>

            {/* Example Expression (Pure example, zero test references) */}
            {sampleCall && (
              <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0d121d] border border-slate-800 text-[11px] font-mono">
                <span className="text-slate-500 font-medium">Example:</span>
                <span className="text-slate-200">
                  <span className="text-sky-300">{sampleCall}</span>
                  <span className="text-slate-500 mx-1.5">→</span>
                  <span className="text-amber-300 font-bold">{expectedOutput || '20'}</span>
                </span>
              </div>
            )}

            {/* Quick Action Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer mt-1 text-center"
            >
              Back to Editor
            </button>
          </div>
        )}
      </div>
    </>
  );
};
