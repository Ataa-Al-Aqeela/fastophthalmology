import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Heart, MessageCircle, ShieldAlert, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { lang, t, dir } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-6 pb-6 px-4 text-center select-none font-['Tajawal']" dir={dir}>
      <div className="max-w-3xl mx-auto flex flex-col items-center justify-center space-y-5">
        
        {/* WhatsApp Direct Contact Action Button */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://wa.me/9647812600392"
            target="_blank"
            rel="noopener noreferrer"
            title={t.whatsappTooltip}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <MessageCircle className="w-5 h-5 text-white fill-emerald-500/30 group-hover:scale-110 transition-transform" />
            <span className="font-['Tajawal']">{t.whatsappContactBtn}</span>
          </a>
        </div>

        {/* Organization Branding & Tagline */}
        <div className="pt-2 border-t border-slate-800/80 w-full flex flex-col items-center justify-center space-y-1">
          <div className="flex items-center gap-2 text-slate-200 font-black text-base sm:text-lg font-['Tajawal']">
            <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{t.orgTitle}</span>
          </div>
          
          <p className="text-xs sm:text-sm text-cyan-300 font-bold tracking-wider font-['Tajawal']">
            « {t.orgTagline} »
          </p>
        </div>

        {/* Medical Disclaimer & Protocols Notice */}
        <div className="max-w-2xl px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-center gap-2 leading-relaxed">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{t.warningNotice}</span>
        </div>

        {/* Bottom Credits & Heart */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full text-[11px] text-slate-500 font-medium pt-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-400 font-['Tajawal']">{t.alAtaaProgram}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>{lang === 'ar' ? 'لخدمة المرضى والميدان' : 'Dedicated to Patient Field Care'}</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </div>
          <div className="text-slate-500">
            {lang === 'ar' ? 'منظومة الفرز السريري لطب العيون 2026' : 'Ophthalmic Clinical Triage System 2026'}
          </div>
        </div>

      </div>
    </footer>
  );
};
