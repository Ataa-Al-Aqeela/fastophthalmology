import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  AlertOctagon, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Pill, 
  Clock, 
  Send 
} from 'lucide-react';
import { resultsDatabase } from '../data/triageData';
import { TriageResult, UrgencyType } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ClinicalReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCondition?: (result: TriageResult) => void;
}

export const ClinicalReferenceModal: React.FC<ClinicalReferenceModalProps> = ({
  isOpen,
  onClose,
  onSelectCondition
}) => {
  const { lang, t, dir } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | UrgencyType>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const conditionsList = Object.values(resultsDatabase);

  const filteredConditions = conditionsList.filter((item) => {
    const matchesFilter = selectedFilter === 'ALL' || item.type === selectedFilter;
    const term = searchTerm.trim().toLowerCase();
    if (!term) return matchesFilter;

    const matchesSearch = 
      item.title.toLowerCase().includes(term) ||
      item.englishTitle.toLowerCase().includes(term) ||
      (item.titleEn && item.titleEn.toLowerCase().includes(term)) ||
      item.summary.toLowerCase().includes(term) ||
      (item.summaryEn && item.summaryEn.toLowerCase().includes(term)) ||
      item.steps.some(s => s.toLowerCase().includes(term)) ||
      (item.medications && item.medications.some(m => m.name.toLowerCase().includes(term)));

    return matchesFilter && matchesSearch;
  });

  const getUrgencyBadge = (type: UrgencyType) => {
    switch (type) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-500/10 text-red-400 border-red-500/30',
          label: lang === 'ar' ? 'طوارئ حرجة 🚨' : 'Critical 🚨',
          border: 'border-red-600/40'
        };
      case 'URGENT':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          label: lang === 'ar' ? 'طوارئ عاجلة 🔴' : 'Urgent 🔴',
          border: 'border-rose-600/40'
        };
      case 'FIELD':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          label: lang === 'ar' ? 'علاج ميداني 🟡' : 'Field Care 🟡',
          border: 'border-amber-600/40'
        };
      case 'ROUTINE':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          label: lang === 'ar' ? 'روتينية / جدولة 🟢' : 'Routine 🟢',
          border: 'border-emerald-600/40'
        };
    }
  };

  return (
    <div 
      className="modal-portal-wrapper fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm w-full max-w-full h-full max-h-screen overflow-x-hidden overflow-y-auto animate-in fade-in duration-200" 
      dir={dir}
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh] my-auto mx-auto relative shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cairo']">
                {t.clinicalReferenceTitle}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'بروتوكولات التشخيص والتدبير السريري وموانع الاستعمال' : 'Diagnostic protocols, field management & absolute contraindications'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className={`w-4 h-4 text-slate-400 absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2`} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl ${dir === 'rtl' ? 'pr-9 pl-4' : 'pl-9 pr-4'} py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className={`text-xs text-slate-400 hover:text-white absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2`}
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                selectedFilter === 'ALL'
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {t.allCategories} ({conditionsList.length})
            </button>
            <button
              onClick={() => setSelectedFilter('CRITICAL')}
              className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                selectedFilter === 'CRITICAL'
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-red-950/40 text-red-300 border-red-800/40 hover:bg-red-900/40'
              }`}
            >
              🚨 {t.criticalCases}
            </button>
            <button
              onClick={() => setSelectedFilter('URGENT')}
              className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                selectedFilter === 'URGENT'
                  ? 'bg-rose-600 text-white border-rose-500'
                  : 'bg-rose-950/40 text-rose-300 border-rose-800/40 hover:bg-rose-900/40'
              }`}
            >
              🔴 {t.urgentCases}
            </button>
            <button
              onClick={() => setSelectedFilter('FIELD')}
              className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                selectedFilter === 'FIELD'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : 'bg-amber-950/40 text-amber-300 border-amber-800/40 hover:bg-amber-900/40'
              }`}
            >
              🟡 {t.fieldCases}
            </button>
            <button
              onClick={() => setSelectedFilter('ROUTINE')}
              className={`px-3 py-1 rounded-lg border font-medium whitespace-nowrap transition ${
                selectedFilter === 'ROUTINE'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40 hover:bg-emerald-900/40'
              }`}
            >
              🟢 {t.routineCases}
            </button>
          </div>
        </div>

        {/* Conditions List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {filteredConditions.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              {lang === 'ar' ? 'لا توجد حالات تطابق بحثك الحالي' : 'No conditions match your search'}
            </div>
          ) : (
            filteredConditions.map((item) => {
              const badge = getUrgencyBadge(item.type);
              const isExpanded = expandedId === item.id;
              const title = lang === 'ar' ? item.title : (item.titleEn || item.englishTitle);
              const subtitle = lang === 'ar' ? item.englishTitle : item.title;
              const summary = lang === 'ar' ? item.summary : (item.summaryEn || item.summary);
              const redFlags = lang === 'ar' ? (item.redFlags || []) : (item.redFlagsEn || item.redFlags || []);
              const contraindications = lang === 'ar' ? (item.contraindications || []) : (item.contraindicationsEn || item.contraindications || []);
              const steps = lang === 'ar' ? item.steps : (item.stepsEn || item.steps);
              const referralTime = lang === 'ar' ? item.referralTime : (item.referralTimeEn || item.referralTime);
              const referralDest = lang === 'ar' ? item.referralDestination : (item.referralDestinationEn || item.referralDestination);

              return (
                <div
                  key={item.id}
                  className={`bg-slate-950/70 border ${badge.border} rounded-xl overflow-hidden transition-all duration-200`}
                >
                  {/* Item Header */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-white font-['Cairo']">
                          {title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        {subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50 space-y-4 text-xs">
                      {/* Summary */}
                      <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                        {summary}
                      </p>

                      {/* Red flags */}
                      {redFlags.length > 0 && (
                        <div className="space-y-1.5">
                          <h4 className="font-bold text-rose-400 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{t.redFlagsTitle}</span>
                          </h4>
                          <ul className="space-y-1 pr-2 list-disc list-inside text-slate-300">
                            {redFlags.map((flag, i) => (
                              <li key={i}>{flag}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contraindications */}
                      {contraindications.length > 0 && (
                        <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-lg space-y-1.5">
                          <h4 className="font-bold text-red-300 flex items-center gap-1.5">
                            <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                            <span>{t.contraindicationsTitle}</span>
                          </h4>
                          <ul className="space-y-1 pr-2 text-red-200">
                            {contraindications.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Steps */}
                      <div className="space-y-2">
                        <h4 className="font-bold text-blue-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.immediateFirstAid}</span>
                        </h4>
                        <ol className="space-y-1.5">
                          {steps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-300">
                              <span className="font-bold text-blue-400">{idx + 1}.</span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* Medications */}
                      {item.medications && item.medications.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <Pill className="w-3.5 h-3.5" />
                            <span>{t.recommendedFieldMeds}</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.medications.map((med, idx) => {
                              const dose = lang === 'ar' ? med.dose : (med.doseEn || med.dose);
                              const note = lang === 'ar' ? med.note : (med.noteEn || med.note);
                              return (
                                <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                  <div className="font-bold text-white text-[11px] font-mono">{med.name}</div>
                                  <div className="text-emerald-300 text-[10px] font-medium mt-0.5">{dose}</div>
                                  {note && <div className="text-slate-400 text-[10px] mt-1 italic">{note}</div>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Referral info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>{t.referralTiming}: <strong className="text-slate-200">{referralTime}</strong></span>
                        </div>
                        <div>
                          <span>{t.referralDestination}: <strong className="text-slate-200">{referralDest}</strong></span>
                        </div>
                      </div>

                      {/* Select this condition */}
                      {onSelectCondition && (
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              onSelectCondition(item);
                              onClose();
                            }}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{t.viewTreatmentPlan}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>{t.footerSub}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
