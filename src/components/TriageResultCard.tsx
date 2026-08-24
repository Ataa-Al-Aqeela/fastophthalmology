import React from 'react';
import { 
  Clock, 
  FileText, 
  Save, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft,
  Timer, 
  AlertTriangle, 
  Pill, 
  Check, 
  Building2,
  Share2,
  ShieldAlert,
  AlertOctagon
} from 'lucide-react';
import { TriageResult, UrgencyType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TriageResultCardProps {
  result: TriageResult;
  pathTitle: string;
  answers: { question: string; answer: string }[];
  onReset: () => void;
  onBack: () => void;
  onOpenReport: () => void;
  onOpenChemicalTimer: () => void;
  onSaveCase: () => void;
  isCaseSaved: boolean;
}

export const TriageResultCard: React.FC<TriageResultCardProps> = ({
  result,
  pathTitle,
  answers,
  onReset,
  onBack,
  onOpenReport,
  onOpenChemicalTimer,
  onSaveCase,
  isCaseSaved
}) => {
  const { lang, t, dir } = useLanguage();
const [hasAsthmaOrHeart, setHasAsthmaOrHeart] = React.useState<boolean | null>(null);
  const getTheme = (type: UrgencyType) => {
    switch (type) {
      case 'CRITICAL':
        return {
          bannerBg: 'bg-gradient-to-r from-red-950 via-red-900 to-rose-950 border-red-700/60',
          badgeBg: 'bg-red-500 text-white shadow-lg shadow-red-500/40 animate-pulse',
          borderColor: 'border-red-600/40',
          cardBg: 'bg-red-950/10',
          accentText: 'text-red-400',
          lightAccent: 'text-red-300'
        };
      case 'URGENT':
        return {
          bannerBg: 'bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border-rose-800/50',
          badgeBg: 'bg-rose-600 text-white shadow-md shadow-rose-600/30',
          borderColor: 'border-rose-700/40',
          cardBg: 'bg-rose-950/10',
          accentText: 'text-rose-400',
          lightAccent: 'text-rose-300'
        };
      case 'FIELD':
        return {
          bannerBg: 'bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-amber-800/50',
          badgeBg: 'bg-amber-600 text-white shadow-md shadow-amber-600/30',
          borderColor: 'border-amber-700/40',
          cardBg: 'bg-amber-950/10',
          accentText: 'text-amber-400',
          lightAccent: 'text-amber-300'
        };
      case 'ROUTINE':
        return {
          bannerBg: 'bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-emerald-800/50',
          badgeBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30',
          borderColor: 'border-emerald-700/40',
          cardBg: 'bg-emerald-950/10',
          accentText: 'text-emerald-400',
          lightAccent: 'text-emerald-300'
        };
    }
  };

  const theme = getTheme(result.type);
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // Localized Content
  const displayTitle = lang === 'ar' ? result.title : (result.titleEn || result.englishTitle);
  const displaySubTitle = lang === 'ar' ? result.englishTitle : result.title;
  const displayBadge = lang === 'ar' ? result.badgeText : (result.badgeTextEn || result.badgeText);
  const displaySummary = lang === 'ar' ? result.summary : (result.summaryEn || result.summary);
  const displayRedFlags = lang === 'ar' ? (result.redFlags || []) : (result.redFlagsEn || result.redFlags || []);
  const displayContraindications = lang === 'ar' ? (result.contraindications || []) : (result.contraindicationsEn || result.contraindications || []);
  const displaySteps = lang === 'ar' ? result.steps : (result.stepsEn || result.steps);
  const displayReferralTime = lang === 'ar' ? result.referralTime : (result.referralTimeEn || result.referralTime);
  const displayReferralDest = lang === 'ar' ? result.referralDestination : (result.referralDestinationEn || result.referralDestination);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb Path */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="text-slate-500">{t.currentPath}</span>
          <span className="font-semibold text-slate-300">{pathTitle}</span>
          <span className="text-slate-600">/</span>
          <span className="text-blue-400 font-medium">{displayTitle}</span>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-slate-800 transition shrink-0"
        >
          <BackIcon className="w-3.5 h-3.5" />
          <span>{t.modifyAnswerBtn}</span>
        </button>
      </div>

      {/* Main Clinical Decision Card */}
      <div className={`bg-slate-900 border ${theme.borderColor} rounded-2xl overflow-hidden shadow-xl`}>
        
        {/* Banner Header */}
        <div className={`p-5 border-b ${theme.bannerBg} space-y-2`}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${theme.badgeBg}`}>
              {displayBadge}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.referralLabel} <strong>{displayReferralTime}</strong></span>
            </div>
          </div>

          <h2 className="text-lg sm:text-xl font-black text-white font-['Cairo'] leading-tight">
            {displayTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium italic">
            {displaySubTitle}
          </p>
        </div>

        {/* Clinical Content */}
        <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm text-slate-200">
          
          {/* Summary / Pathophysiology Overview */}
          <div className="bg-slate-950/70 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-1">
            <h3 className="font-bold text-slate-300 text-xs flex items-center gap-1.5">
              <span>🩺 {t.clinicalAssessmentSummary}</span>
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {displaySummary}
            </p>
          </div>

          {/* Red Flags / Clinical Warnings */}
          {displayRedFlags.length > 0 && (
            <div className="bg-red-950/20 border border-red-800/40 p-3.5 sm:p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-red-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{t.redFlagsTitle}</span>
              </h3>
              <ul className="space-y-1.5 text-slate-300 text-xs sm:text-sm">
                {displayRedFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-red-400 font-bold mt-0.5">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

         {/* Critical Contraindications & Interactive Safety Check */}
          {displayContraindications.length > 0 && (
            <div className="bg-rose-950/30 border border-rose-600/50 p-3.5 sm:p-4 rounded-xl space-y-3">
              <h3 className="font-black text-rose-300 flex items-center gap-1.5 text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
                <span>{t.contraindicationsTitle}</span>
              </h3>
              
              <div className="space-y-1.5 text-rose-200 text-xs sm:text-sm font-semibold">
                {displayContraindications.map((ci, idx) => (
                  <p key={idx} className="leading-relaxed bg-rose-950/40 p-2 rounded-lg border border-rose-800/40">
                    {ci}
                  </p>
                ))}
              </div>

              {/* Interactive Drug Safety Checklist (Decision Support) */}
              {result.medications?.some(m => m.name.toLowerCase().includes('timolol')) && (
                <div className="bg-slate-950/90 p-3 rounded-xl border border-amber-500/40 space-y-2 mt-2">
                  <p className="font-bold text-amber-300 text-xs">
                    ⚠️ فحص السلامة قبل صرف (Timolol): هل يعاني المريض من الربو أو قصور القلب؟
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHasAsthmaOrHeart(true)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        hasAsthmaOrHeart === true ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      نعم (يوجد مانع)
                    </button>
                    <button
                      onClick={() => setHasAsthmaOrHeart(false)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                        hasAsthmaOrHeart === false ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      لا (آمن)
                    </button>
                  </div>

                  {hasAsthmaOrHeart === true && (
                    <div className="bg-red-950/80 border border-red-500/80 p-2.5 rounded-lg text-red-200 text-xs font-bold space-y-1 animate-in fade-in">
                      <p>⛔ يُمنع استخدام Timolol نهائياً!</p>
                      <p className="text-amber-300">💡 البديل الميداني الآمن: قطرة Brimonidine 0.2% أو Dorzolamide 2%.</p>
                    </div>
                  )}
                  {hasAsthmaOrHeart === false && (
                    <p className="text-emerald-400 text-xs font-semibold">✓ تم التأكيد: آمن للجرعة المقررة.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Immediate First Aid Actions / Step by Step */}
          <div className="space-y-2.5">
            <h3 className="font-black text-slate-100 flex items-center gap-2 text-xs sm:text-sm">
              <span className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
                ✓
              </span>
              <span>{t.immediateFirstAid}</span>
            </h3>

            <div className="space-y-2">
              {displaySteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 bg-slate-950/80 p-3 sm:p-3.5 rounded-xl border border-slate-800/80 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200 text-xs sm:text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Field Medications & Dosing */}
          {result.medications && result.medications.length > 0 && (
            <div className="space-y-2.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-slate-200 flex items-center gap-2 text-xs sm:text-sm">
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>{t.recommendedFieldMeds}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {result.medications.map((med, idx) => {
                  const doseText = lang === 'ar' ? med.dose : (med.doseEn || med.dose);
                  const noteText = lang === 'ar' ? med.note : (med.noteEn || med.note);
                  return (
                    <div key={idx} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-1">
                      <div className="font-bold text-emerald-400 text-xs sm:text-sm font-mono">
                        {med.name}
                      </div>
                      <div className="text-xs text-slate-300">
                        {doseText}
                      </div>
                      {noteText && (
                        <div className="text-[11px] text-slate-400 italic">
                          ℹ️ {noteText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Referral Timing & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-bold">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.referralTiming}</span>
              </div>
              <div className="font-bold text-amber-300 text-xs sm:text-sm">
                {displayReferralTime}
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-bold">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.referralDestination}</span>
              </div>
              <div className="font-bold text-blue-300 text-xs sm:text-sm">
                {displayReferralDest}
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
          
          {/* Chemical wash quick trigger if chemical burn */}
          {result.id === 'RES_CHEMICAL_BURN' && (
            <button
              onClick={onOpenChemicalTimer}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-600/30 transition active:scale-95 text-xs sm:text-sm"
            >
              <Timer className="w-4 h-4 animate-spin" />
              <span>{t.openTimerBtn}</span>
            </button>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            {/* Save Case */}
            <button
              onClick={onSaveCase}
              disabled={isCaseSaved}
              className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition active:scale-95 ${
                isCaseSaved 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50 cursor-default' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isCaseSaved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.caseSavedBtn}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-blue-400" />
                  <span>{t.saveCaseBtn}</span>
                </>
              )}
            </button>

           {/* Generate Report Button */}
          <button
            onClick={() => {
              if (!isCaseSaved && onSaveCase) {
                onSaveCase();
              }
              onOpenReport();
            }}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>{t.generateReportBtn}</span>
          </button>

            {/* Reset */}
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.newCaseBtn}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
