import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Share2, 
  X, 
  Printer
} from 'lucide-react';
import { TriageResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TriageResult;
  pathTitle: string;
  answers: { question: string; answer: string }[];
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  result,
  pathTitle,
  answers
}) => {
  const { lang, t, dir } = useLanguage();
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState<'ذكر' | 'أنثى' | 'Male' | 'Female' | ''>('');
  const [affectedEye, setAffectedEye] = useState<string>(lang === 'ar' ? 'العين اليمنى (OD)' : 'Right Eye (OD)');
  const [visualAcuity, setVisualAcuity] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const displayTitle = lang === 'ar' ? result.title : (result.titleEn || result.englishTitle);
  const displayBadge = lang === 'ar' ? result.badgeText : (result.badgeTextEn || result.badgeText);
  const displayReferralTime = lang === 'ar' ? result.referralTime : (result.referralTimeEn || result.referralTime);
  const displayReferralDest = lang === 'ar' ? result.referralDestination : (result.referralDestinationEn || result.referralDestination);
  const displaySteps = lang === 'ar' ? result.steps : (result.stepsEn || result.steps);
  const displayContraindications = lang === 'ar' ? (result.contraindications || []) : (result.contraindicationsEn || result.contraindications || []);

  const generateReportText = () => {
    if (lang === 'ar') {
      const lines = [
        '========================================',
        '📋 تقرير فرز وإحالة طب العيون الميداني',
        '🏥 برنامج العطاء | مؤسسة عطاء العقيلة التنموية',
        '========================================',
        `📅 التاريخ والوقت: ${currentDate}`,
        `👤 اسم المريض: ${patientName.trim() || 'غير محدد'}`,
        `⚧️ العمر / الجنس: ${patientAge ? `${patientAge} سنة` : ''} ${patientGender}`,
        `👁️ العين المصابة: ${affectedEye}`,
        `👓 حدة الإبصار الأولية (VA): ${visualAcuity.trim() || 'لم تسجل'}`,
        '----------------------------------------',
        `🚩 مسار الشكوى الرئيسية: ${pathTitle}`,
        '📝 نتائج الفحص والفرز التدريجي:',
        ...answers.map((a, idx) => `   ${idx + 1}. ${a.question}\n      ← الإجابة: ${a.answer}`),
        '----------------------------------------',
        `🎯 التشخيص الميداني المرجح: ${result.title}`,
        `🇬🇧 التشخيص بالإنجليزية: ${result.englishTitle}`,
        `🚨 درجة الإلحاح والفرز: ${result.badgeText}`,
        `⏱️ التوقيت الموصى به للتحويل: ${result.referralTime}`,
        `🏥 الوجهة المرجعية: ${result.referralDestination}`,
        '----------------------------------------',
        '⚡ التدابير والإسعافات الميدانية المتخذة:',
        ...displaySteps.map((s, idx) => `   ${idx + 1}. ${s}`),
        ...(displayContraindications.length > 0 ? [
          '----------------------------------------',
          '⛔ المحاذير وموانع الاستعمال:',
          ...displayContraindications.map(c => `   • ${c}`)
        ] : []),
        ...(additionalNotes.trim() ? [
          '----------------------------------------',
          `📌 ملاحظات الطبيب الميداني:\n${additionalNotes.trim()}`
        ] : []),
        '========================================',
        'منظومة برنامج العطاء للفرز السريري والـ Oculomics الميداني'
      ];
      return lines.join('\n');
    } else {
      const lines = [
        '========================================',
        '📋 Ophthalmology Field Triage & Referral Report',
        '🏥 Al-Ata\'a Program | Ataa Al-Aqila Development Foundation',
        '========================================',
        `📅 Date/Time: ${currentDate}`,
        `👤 Patient Name: ${patientName.trim() || 'Not specified'}`,
        `⚧️ Age / Sex: ${patientAge ? `${patientAge} y/o` : ''} ${patientGender}`,
        `👁️ Affected Eye: ${affectedEye}`,
        `👓 Initial Visual Acuity (VA): ${visualAcuity.trim() || 'Not recorded'}`,
        '----------------------------------------',
        `🚩 Primary Pathway: ${pathTitle}`,
        '📝 Triage Decision Trail:',
        ...answers.map((a, idx) => `   ${idx + 1}. ${a.question}\n      → Answer: ${a.answer}`),
        '----------------------------------------',
        `🎯 Working Diagnosis: ${displayTitle}`,
        `🚨 Urgency Level: ${displayBadge}`,
        `⏱️ Recommended Referral Timing: ${displayReferralTime}`,
        `🏥 Referral Destination: ${displayReferralDest}`,
        '----------------------------------------',
        '⚡ Immediate Field Actions & Management:',
        ...displaySteps.map((s, idx) => `   ${idx + 1}. ${s}`),
        ...(displayContraindications.length > 0 ? [
          '----------------------------------------',
          '⛔ Contraindications & Red Flags:',
          ...displayContraindications.map(c => `   • ${c}`)
        ] : []),
        ...(additionalNotes.trim() ? [
          '----------------------------------------',
          `📌 Field Clinician Notes:\n${additionalNotes.trim()}`
        ] : []),
        '========================================',
        'Al-Ata\'a Program Clinical Triage & Field Oculomics Protocol'
      ];
      return lines.join('\n');
    }
  };

  const validatePatientInfo = () => {
    if (!patientName.trim()) {
      alert(lang === 'ar' ? '⚠️ يرجى إدخال اسم المريض أو الرمز السريري أولاً.' : '⚠️ Please enter patient name/ID first.');
      return false;
    }
    if (!patientAge || Number(patientAge) <= 0) {
      alert(lang === 'ar' ? '⚠️ يرجى إدخال عمر صحيح للمريض.' : '⚠️ Please enter a valid patient age.');
      return false;
    }
    return true;
  };

  const handleCopy = () => {
    if (!validatePatientInfo()) return;
    const text = generateReportText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    if (!validatePatientInfo()) return;
    const text = encodeURIComponent(generateReportText());
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="modal-portal-wrapper fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm w-full max-w-full h-full max-h-screen overflow-x-hidden overflow-y-auto animate-in fade-in duration-200" 
      dir={dir}
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[92vh] my-auto mx-auto relative shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cairo']">
                {t.referralReport}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'تجهيز التقرير للمستشفى المرجعي أو إرساله للأخصائي المناوب' : 'Structured referral documentation for receiving centers & on-call specialists'}
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

        {/* Form Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Patient Quick Info Fields */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-slate-200 text-xs sm:text-sm">
              {lang === 'ar' ? 'بيانات المريض (اختياري للتقرير):' : 'Patient Information (Optional):'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">
                  {lang === 'ar' ? 'اسم المريض / الرمز' : 'Patient Name / ID'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'مثال: أحمد محمد' : 'e.g. John Doe'}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">
                  {lang === 'ar' ? 'العمر' : 'Age'}
                </label>
                <input
                  type="number"
                  placeholder={lang === 'ar' ? 'مثال: 45' : 'e.g. 45'}
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">
                  {lang === 'ar' ? 'الجنس' : 'Gender'}
                </label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="">{lang === 'ar' ? 'غير محدد' : 'Unspecified'}</option>
                  <option value={lang === 'ar' ? 'ذكر' : 'Male'}>{lang === 'ar' ? 'ذكر' : 'Male'}</option>
                  <option value={lang === 'ar' ? 'أنثى' : 'Female'}>{lang === 'ar' ? 'أنثى' : 'Female'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">
                  {lang === 'ar' ? 'العين المصابة' : 'Affected Eye'}
                </label>
                <select
                  value={affectedEye}
                  onChange={(e) => setAffectedEye(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value={lang === 'ar' ? 'العين اليمنى (OD)' : 'Right Eye (OD)'}>{lang === 'ar' ? 'العين اليمنى (OD)' : 'Right Eye (OD)'}</option>
                  <option value={lang === 'ar' ? 'العين اليسرى (OS)' : 'Left Eye (OS)'}>{lang === 'ar' ? 'العين اليسرى (OS)' : 'Left Eye (OS)'}</option>
                  <option value={lang === 'ar' ? 'كلتا العينين (OU)' : 'Both Eyes (OU)'}>{lang === 'ar' ? 'كلتا العينين (OU)' : 'Both Eyes (OU)'}</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 text-[11px]">
                  {lang === 'ar' ? 'حدة الإبصار المسجلة (VA)' : 'Visual Acuity (VA)'}
                </label>
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'مثال: 6/60 أو CF @ 1m أو HM' : 'e.g. 6/60, CF @ 1m, HM'}
                  value={visualAcuity}
                  onChange={(e) => setVisualAcuity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 text-[11px]">
                {lang === 'ar' ? 'ملاحظات سريرية أو أدوية أعطيت فوراً' : 'Clinical Notes / Medications Given'}
              </label>
              <textarea
                rows={2}
                placeholder={lang === 'ar' ? 'أضف أي تفاصيل أخرى مثل ضغط الدم، أدوية تم حقنها، حساسية المريض...' : 'Add vital signs, administered treatments, drug allergies...'}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Generated Live Preview Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>{lang === 'ar' ? 'معاينة نص التقرير:' : 'Report Preview:'}</span>
              <span className="text-[11px] text-blue-400">{lang === 'ar' ? 'جاهز للنسخ والإرسال المباشر' : 'Formatted for rapid dispatch'}</span>
            </div>
            <pre className={`p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto select-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {generateReportText()}
            </pre>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs shadow transition active:scale-95 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (lang === 'ar' ? 'تم نسخ التقرير!' : 'Copied!') : t.copyReportBtn}</span>
            </button>

            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition"
            >
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">{t.printBtn}</span>
            </button>
          </div>

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
