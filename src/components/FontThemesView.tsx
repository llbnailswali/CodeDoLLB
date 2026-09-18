/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTheme } from '../types';
import {
  FontCombo,
  RECOMMENDED_FONT_COMBOS,
  getSavedFontCombo,
  saveAndApplyFontCombo,
  resetFontComboToDefault,
} from '../utils/fontThemes';
import { soundFX } from '../utils/audio';

interface FontThemesViewProps {
  theme: AppTheme;
  onBack: () => void;
}

export const FontThemesView: React.FC<FontThemesViewProps> = ({ theme, onBack }) => {
  const isDark = theme === 'dark';
  const [activeCombo, setActiveCombo] = useState<FontCombo>(() => getSavedFontCombo());
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Synchronize on mount
  useEffect(() => {
    const current = getSavedFontCombo();
    setActiveCombo(current);
  }, []);

  const handleSelectCombo = (combo: FontCombo) => {
    soundFX.playClick();
    const updated = saveAndApplyFontCombo(combo.id);
    setActiveCombo(updated);
    setCopiedNotification(`Applied "${combo.name}" across the whole app!`);
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2500);
  };

  const handleReset = () => {
    soundFX.playClick();
    const def = resetFontComboToDefault();
    setActiveCombo(def);
    setCopiedNotification('Reset to Modern Kotlin Native (Default)!');
    setTimeout(() => {
      setCopiedNotification(null);
    }, 2500);
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${
        isDark ? 'bg-[#0b0f19] text-[#dfe2f1]' : 'bg-[#f8f9fb] text-[#191c1e]'
      }`}
    >
      {/* Top App Bar with Back & Reset */}
      <div
        className={`sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-md flex items-center justify-between transition-colors ${
          isDark
            ? 'bg-[#0b0f19]/90 border-white/10'
            : 'bg-[#f8f9fb]/90 border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onBack();
            }}
            aria-label="Back to Profile"
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/5'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 neu-raised-sm'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="font-['Outfit'] text-base font-bold tracking-tight">
              Typography &amp; Font Combos
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Curated font pairings across all screens &amp; sections
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className={`px-3 py-1.5 rounded-lg text-xs font-['Outfit'] font-semibold flex items-center gap-1.5 transition-all ${
            isDark
              ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 neu-raised-sm'
          }`}
          title="Reset to default combo"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span className="hidden sm:inline">Reset Default</span>
        </button>
      </div>

      {/* Floating Notification Toast */}
      {copiedNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-indigo-600 text-white text-xs font-['Outfit'] font-medium shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>{copiedNotification}</span>
        </div>
      )}

      {/* Scrollable Container */}
      <div className="w-full max-w-2xl mx-auto px-4 py-5 flex flex-col gap-6 pb-24">
        {/* Active Combo Hero Summary Card */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            isDark
              ? 'bg-gradient-to-br from-indigo-950/40 via-[#151b28] to-[#0f1422] border-indigo-500/30 shadow-lg'
              : 'bg-gradient-to-br from-indigo-50/70 via-white to-white border-indigo-200 neu-raised'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-500">
                Active Throughout Whole App
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-500 border border-indigo-500/20">
              {activeCombo.badge}
            </span>
          </div>

          <h2 className="text-xl font-bold font-['Outfit'] mb-1 text-inherit">
            {activeCombo.name}
          </h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed font-['Outfit']">
            {activeCombo.tagline}
          </p>

          {/* Quick 4-Section Chip Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-slate-200/40 dark:border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Display &amp; Badges
              </span>
              <span className="text-xs font-bold truncate text-indigo-500 dark:text-indigo-400">
                {activeCombo.roles.display.fontFamily.split(' ')[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                App UI &amp; Quizzes
              </span>
              <span className="text-xs font-bold truncate text-emerald-500 dark:text-emerald-400">
                {activeCombo.roles.ui.fontFamily.split(' ')[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Tutorial Reading
              </span>
              <span className="text-xs font-bold truncate text-cyan-500 dark:text-cyan-400">
                {activeCombo.roles.tutorial.fontFamily.split(' ')[0]}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Code &amp; IDE
              </span>
              <span className="text-xs font-bold truncate text-amber-500 dark:text-amber-400 font-mono">
                {activeCombo.roles.code.fontFamily.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Section Guide / Architecture Explainer */}
        <div
          className={`p-4 rounded-xl border text-xs ${
            isDark ? 'bg-[#121722] border-white/5' : 'bg-slate-100/70 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[18px] text-indigo-400">
              menu_book
            </span>
            <span className="font-['Outfit'] font-bold text-xs">
              How Typography Is Applied by Screen &amp; Section
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400 leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
              <span>
                <strong className="text-slate-200 dark:text-slate-200">Display:</strong> Home World Map, stage numbers, streak counters, and reward celebrations.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>
                <strong className="text-slate-200 dark:text-slate-200">App UI:</strong> Bottom navigation, challenge multiple-choice cards, and profile stats.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
              <span>
                <strong className="text-slate-200 dark:text-slate-200">Detailed Tutorials:</strong> Long-form theory, deep mental model explanations, and concept summaries.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>
                <strong className="text-slate-200 dark:text-slate-200">Code &amp; IDE:</strong> Interactive mobile code playground, keyword tokens, and compiler output.
              </span>
            </div>
          </div>
        </div>

        {/* List of Recommended Font Combos */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold font-['Outfit'] uppercase tracking-wider text-slate-400">
              Recommended Combinations ({RECOMMENDED_FONT_COMBOS.length})
            </h3>
            <span className="text-[11px] text-slate-500">
              Tap any combo to try it out
            </span>
          </div>

          {RECOMMENDED_FONT_COMBOS.map((combo) => {
            const isSelected = activeCombo.id === combo.id;

            return (
              <div
                key={combo.id}
                onClick={() => handleSelectCombo(combo)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? isDark
                      ? 'bg-[#151b28] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.15)] ring-2 ring-indigo-500/50'
                      : 'bg-white border-indigo-500 ring-2 ring-indigo-500/30 neu-raised'
                    : isDark
                    ? 'bg-[#131824] border-white/5 hover:border-white/15 hover:bg-[#161c2a]'
                    : 'bg-white border-slate-200/80 hover:border-slate-300 neu-raised-sm'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4
                      className="text-base font-bold text-inherit"
                      style={{ fontFamily: combo.displayFont }}
                    >
                      {combo.name}
                    </h4>
                    {combo.isDefault && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                        DEFAULT
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                        isSelected
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-500/15 text-slate-400 border border-slate-500/20'
                      }`}
                    >
                      {combo.badge}
                    </span>
                  </div>

                  {/* Selection Radio Indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : isDark
                        ? 'border border-white/20 text-transparent'
                        : 'border border-slate-300 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isSelected ? 'check' : ''}
                    </span>
                  </div>
                </div>

                {/* Tagline & Vibe */}
                <p className="text-xs text-slate-400 mb-3 leading-relaxed font-['Outfit']">
                  {combo.description}
                </p>

                <div className="flex items-center gap-2 mb-4 flex-wrap text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-slate-500/10 text-slate-400 font-mono">
                    {combo.vibe}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">
                    <strong>Best For:</strong> {combo.bestFor}
                  </span>
                </div>

                {/* Section-by-Section Font Assignment Breakdown */}
                <div
                  className={`p-3 rounded-xl mb-4 border grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs ${
                    isDark ? 'bg-[#0f1420] border-white/5' : 'bg-slate-50 border-slate-200/60'
                  }`}
                >
                  {/* Display Role */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-indigo-400">
                        Display &amp; Streaks
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1 rounded bg-indigo-500/10 text-indigo-400">
                        {combo.roles.display.category}
                      </span>
                    </div>
                    <span
                      className="font-semibold text-xs text-slate-200 dark:text-slate-100"
                      style={{ fontFamily: combo.displayFont }}
                    >
                      {combo.roles.display.fontFamily}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {combo.roles.display.description}
                    </span>
                  </div>

                  {/* UI Role */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-emerald-400">
                        App UI &amp; Quizzes
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1 rounded bg-emerald-500/10 text-emerald-400">
                        {combo.roles.ui.category}
                      </span>
                    </div>
                    <span
                      className="font-semibold text-xs text-slate-200 dark:text-slate-100"
                      style={{ fontFamily: combo.bodyFont }}
                    >
                      {combo.roles.ui.fontFamily}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {combo.roles.ui.description}
                    </span>
                  </div>

                  {/* Tutorial Role */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">
                        Detailed Tutorial Reading
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1 rounded bg-cyan-500/10 text-cyan-400">
                        {combo.roles.tutorial.category}
                      </span>
                    </div>
                    <span
                      className="font-semibold text-xs text-slate-200 dark:text-slate-100"
                      style={{ fontFamily: combo.tutorialFont }}
                    >
                      {combo.roles.tutorial.fontFamily}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {combo.roles.tutorial.description}
                    </span>
                  </div>

                  {/* Code Role */}
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-amber-400">
                        Code, IDE &amp; Tokens
                      </span>
                      <span className="text-[9px] uppercase font-mono px-1 rounded bg-amber-500/10 text-amber-400">
                        {combo.roles.code.category}
                      </span>
                    </div>
                    <span
                      className="font-semibold text-xs text-slate-200 dark:text-slate-100"
                      style={{ fontFamily: combo.codeFont }}
                    >
                      {combo.roles.code.fontFamily}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight">
                      {combo.roles.code.description}
                    </span>
                  </div>
                </div>

                {/* Live Sandbox Preview Card */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col gap-2.5 transition-colors ${
                    isDark ? 'bg-[#0d121c] border-white/5' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Live Typography Sample Preview</span>
                    <span className="text-indigo-400 font-semibold">Active rendering</span>
                  </div>

                  {/* Headline rendered in Display Font */}
                  <div
                    className="text-sm font-bold tracking-tight text-slate-100 dark:text-slate-100"
                    style={{ fontFamily: combo.displayFont }}
                  >
                    {combo.sampleHeadline}
                  </div>

                  {/* Paragraph rendered in Tutorial Font */}
                  <p
                    className="text-xs leading-relaxed text-slate-300 dark:text-slate-300"
                    style={{ fontFamily: combo.tutorialFont }}
                  >
                    {combo.sampleParagraph}
                  </p>

                  {/* Code snippet rendered in Code Font */}
                  <div
                    className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-[11px] leading-relaxed text-emerald-300 font-medium overflow-x-auto whitespace-pre"
                    style={{ fontFamily: combo.codeFont }}
                  >
                    {combo.sampleCode}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-['Outfit']">
                    {isSelected ? '✓ Currently applied everywhere' : 'Tap to test on all screens'}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCombo(combo);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-['Outfit'] font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : isDark
                        ? 'bg-indigo-600/90 hover:bg-indigo-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isSelected ? 'Applied' : 'Select Combo'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
