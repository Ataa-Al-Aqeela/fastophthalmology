import React from 'react';
import { 
  ClipboardList, 
  Trash2, 
  X, 
  FileText, 
  Calendar, 
  Download
} from 'lucide-react';
import { SavedCase } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface FieldCaseHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  savedCases: SavedCase[];
  onDeleteCase: (id: string) => void;
  onClearAll: () => void;
  onViewReport: (c: SavedCase) => void;
}

export const FieldCaseHistory: React.FC<FieldCaseHistoryProps> = ({
  isOpen,
  onClose,
  savedCases,
  onDeleteCase,
  onClearAll,
  onViewReport
}) => {
  const { lang, t, dir } = useLanguage();

  if (!isOpen) return null;

  const handleExportText = () => {
    if (savedCases.length === 0) return;
    const content = savedCases.map((c, i) => `
Case #${i + 1}
Date/Time: ${c.timestamp}
Patient: ${c.patientName || 'N/A'} (${c.ageGender || 'N/A'})
Pathway: ${c.pathTitle}
Diagnosis: ${c.result.title} (${c.result.englishTitle})
Urgency: ${c.result.badgeText}
Referral: ${c.result.referralTime} - ${c.result.referralDestination}
Steps:
${c.result.steps.map(s => ` - ${s}`).join('\n')}
------------------------------------------------
`).join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FastOphtha-Field-Log-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="modal-portal-wrapper fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm w-full max-w-full h-full max-h-screen overflow-x-hidden overflow-y-auto animate-in fade-in duration-200" 
      dir={dir}
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh] my-auto mx-auto relative shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cairo']">
                {t.caseHistoryTitle}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'أرشيف الحالات التي تم فرزها محلياً أثناء المناوبة الميدانية' : 'Local shift archive of triaged ocular emergencies'}
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

        {/* Action bar */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">
            {lang === 'ar' ? 'إجمالي الحالات المسجلة:' : 'Total Cases Logged:'} <strong className="text-white">{savedCases.length}</strong>
          </span>
          <div className="flex items-center gap-2">
            {savedCases.length > 0 && (
              <>
                <button
                  onClick={handleExportText}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.exportLogBtn}</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 font-medium transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.clearHistoryBtn}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Cases List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
          {savedCases.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <ClipboardList className="w-10 h-10 mx-auto text-slate-600 stroke-[1.5]" />
              <p className="text-sm">{t.noCasesLogged}</p>
              <p className="text-[11px] text-slate-600">
                {lang === 'ar' ? 'عند الانتهاء من تقييم أي حالة، اضغط "حفظ في سجل الحالات" لتسجيلها هنا.' : 'Click "Save to Case Log" after evaluating a case to store it here.'}
              </p>
            </div>
          ) : (
            savedCases.map((c) => {
              const diagTitle = lang === 'ar' ? c.result.title : (c.result.titleEn || c.result.englishTitle);
              const badge = lang === 'ar' ? c.result.badgeText : (c.result.badgeTextEn || c.result.badgeText);

              return (
                <div
                  key={c.id}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                          {badge}
                        </span>
                        <h4 className="font-bold text-white text-xs sm:text-sm font-['Cairo']">
                          {diagTitle}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{c.timestamp}</span>
                        </span>
                        {c.patientName && (
                          <span>{lang === 'ar' ? 'المريض:' : 'Patient:'} <strong className="text-slate-300">{c.patientName}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onViewReport(c)}
                        title={lang === 'ar' ? "عرض وإصدار تقرير الإحالة" : "View Referral Report"}
                        className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg border border-blue-500/30 transition"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteCase(c.id)}
                        title={lang === 'ar' ? "حذف هذه الحالة" : "Delete Case"}
                        className="p-1.5 bg-red-950/40 hover:bg-red-900/50 text-red-400 rounded-lg border border-red-800/40 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/70 p-2 rounded-lg border border-slate-800/60">
                    <span className="text-slate-500">{t.currentPath}: </span>
                    <span className="text-slate-300">{c.pathTitle}</span>
                    {c.answers.length > 0 && (
                      <span className="text-slate-400"> → {c.answers.map(a => a.answer).join(' → ')}</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
