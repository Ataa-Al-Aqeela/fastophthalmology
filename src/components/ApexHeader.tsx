import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Eye } from 'lucide-react';

export const ApexHeader: React.FC = () => {
  const { lang, t, dir } = useLanguage();

  return (
    <div className="w-full max-w-3xl mx-auto pt-4 sm:pt-6 pb-2 px-3 sm:px-4 text-center select-none font-['Tajawal']" dir={dir}>
      
      {/* Top Organization Badge & Apex Title */}
      <div className="flex flex-col items-center justify-center gap-1.5 mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-950/80 via-slate-900/90 to-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-bold shadow-md shadow-blue-950/40">
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span>{lang === 'ar' ? 'منظومة الفرز السريري والـ Oculomics الميداني' : 'Clinical Triage & Field Oculomics System'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        </div>

        {/* Primary Main Title: Large, Bold & Prominent */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-200 tracking-tight drop-shadow-sm font-['Tajawal'] mt-1">
          {t.alAtaaProgram}
        </h1>

        {/* Subtitle: Well balanced */}
        <p className="text-sm sm:text-base md:text-lg font-bold text-cyan-300/90 tracking-wide font-['Tajawal']">
          {t.alAtaaSub}
        </p>
      </div>

      {/* Vertical spacing & Centered Spiritual Banner (بطاقة مباركة) */}
      <div className="my-3 sm:my-4">
        <div className="relative overflow-hidden mx-auto max-w-xl rounded-2xl bg-gradient-to-b from-emerald-950/40 via-slate-900/90 to-slate-950 border border-emerald-500/30 p-3 sm:p-4 shadow-lg shadow-emerald-950/30 backdrop-blur-sm">
          
          {/* Subtle Decorative Golden/Emerald Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/40 rounded-tl-xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/40 rounded-tr-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/40 rounded-bl-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/40 rounded-br-xl pointer-events-none" />

          {/* Spiritual Content */}
          <div className="flex flex-col items-center justify-center text-center space-y-1.5">
            {/* Bismillah */}
            <p className="text-xs sm:text-sm font-semibold text-emerald-300/90 font-['Tajawal'] tracking-wider">
              {t.bismillah}
            </p>

            {/* Central Quranic Healing Verse */}
            <div className="py-1 px-4 my-0.5 rounded-xl bg-emerald-950/50 border border-emerald-500/20 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 hidden sm:inline" />
              <p className="text-base sm:text-lg md:text-xl font-black text-amber-200 tracking-wide font-['Tajawal'] leading-relaxed drop-shadow">
                {t.quranVerse}
              </p>
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 hidden sm:inline" />
            </div>

            {/* Sadaqallah Al-Azeem */}
            <p className="text-[11px] sm:text-xs font-bold text-emerald-400/80 font-['Tajawal'] tracking-widest">
              {t.sadaqallah}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
