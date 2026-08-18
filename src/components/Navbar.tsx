import React from 'react';
import { 
  RotateCcw, 
  BookOpen, 
  Timer, 
  Stethoscope, 
  ClipboardList, 
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onReset: () => void;
  onOpenTimer?: () => void;
  onOpenReference?: () => void;
  onOpenBedsideTools?: () => void;
  onOpenHistory?: () => void;
  savedCasesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  onOpenTimer,
  onOpenReference,
  onOpenBedsideTools,
  onOpenHistory,
  savedCasesCount = 0
}) => {
  const { lang, t, toggleLanguage } = useLanguage();

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md bg-slate-900/95 shadow-md w-full">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none group min-w-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <span className="text-base sm:text-xl">👁️</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-lg font-black tracking-wide text-white font-['Tajawal'] truncate">
                {t.alAtaaProgram}
              </h1>
              <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30 whitespace-nowrap shrink-0">
                {lang === 'ar' ? 'فرز سريري' : 'Clinical Triage'}
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[120px] sm:max-w-none font-['Tajawal'] hidden xs:block">
              {t.alAtaaSub}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Quick Tool: Chemical Timer */}
          {onOpenTimer && (
            <button
              onClick={onOpenTimer}
              title={t.chemicalTimer}
              className="hidden sm:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
            >
              <Timer className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden md:inline">{t.chemicalTimer}</span>
            </button>
          )}

          {/* Quick Tool: Reference Guide */}
          {onOpenReference && (
            <button
              onClick={onOpenReference}
              title={t.clinicalGuide}
              className="hidden md:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="hidden lg:inline">{t.clinicalGuide}</span>
            </button>
          )}

          {/* Quick Tool: Bedside Tools */}
          {onOpenBedsideTools && (
            <button
              onClick={onOpenBedsideTools}
              title={t.bedsideTools}
              className="hidden md:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">{t.bedsideTools}</span>
            </button>
          )}

          {/* Quick Tool: Case History */}
          {onOpenHistory && (
            <button
              onClick={onOpenHistory}
              title={t.triageHistoryTitle}
              className="relative hidden sm:flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <ClipboardList className="w-4 h-4 text-purple-400" />
              <span className="hidden lg:inline">{t.triageHistoryTitle}</span>
              {savedCasesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {savedCasesCount}
                </span>
              )}
            </button>
          )}

          {/* Language Switcher - ALWAYS VISIBLE ON MOBILE AND DESKTOP */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 sm:gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm active:scale-95 shrink-0"
            title="Switch Language / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="font-['Tajawal']">{t.langBtn}</span>
          </button>

          {/* Reset / New Case Button */}
          <button 
            onClick={onReset}
            title={t.resetBtn}
            className="flex items-center gap-1 sm:gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold shadow-md shadow-blue-600/30 transition active:scale-95 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden xs:inline">{t.resetBtn}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
