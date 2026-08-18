import React, { useState, useEffect, useRef } from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  X, 
  Volume2, 
  VolumeX, 
  Plus
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChemicalTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChemicalTimerModal: React.FC<ChemicalTimerModalProps> = ({ isOpen, onClose }) => {
  const { lang, t, dir } = useLanguage();
  const TOTAL_SECONDS = 20 * 60; // 20 minutes
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Audio beep
  const playBeep = (freq = 880, type: OscillatorType = 'sine', duration = 0.2) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before gesture
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playBeep(1200, 'triangle', 0.8);
            return 0;
          }
          // Beep at key minutes
          if (prev % 300 === 0) {
            playBeep(600, 'sine', 0.3);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((TOTAL_SECONDS - timeLeft) / TOTAL_SECONDS) * 100;

  // Phases
  const elapsed = TOTAL_SECONDS - timeLeft;
  let phaseText = lang === 'ar' 
    ? 'المرحلة 1: الغسيل الأولي الكثيف بالماء الجاري أو المحلول الملحي' 
    : 'Phase 1: Initial copious irrigation with saline or clean water';
  let phaseColor = 'text-amber-400';
  let phaseDesc = lang === 'ar'
    ? 'افتح الجفون بأصابعك واستخدم قطرة مخدر موضعي لتسهيل الغسيل المتواصل.'
    : 'Retract eyelids and instill topical anesthetic drops to facilitate uninterrupted irrigation.';
  
  if (elapsed >= 300 && elapsed < 900) {
    phaseText = lang === 'ar'
      ? 'المرحلة 2: قلب الجفون ومسح الرتوج بقطنة مبللة لإزالة جزيئات الأسمنت/الجير'
      : 'Phase 2: Evert eyelids & sweep fornices to remove cement/lime particulates';
    phaseColor = 'text-blue-400';
    phaseDesc = lang === 'ar'
      ? 'الأسمنت ومواد البناء تحتوي على حبيبات قلوية تذوب ببطء؛ يجب مسحها يدوياً.'
      : 'Cement and construction material contain alkaline particles that dissolve slowly; remove them manually.';
  } else if (elapsed >= 900) {
    phaseText = lang === 'ar'
      ? 'المرحلة 3: استمرار الغسيل وإعادة فحص الـ pH للتأكد من التعادل (7.0 - 7.4)'
      : 'Phase 3: Ongoing irrigation & pH strip testing for neutrality (7.0 - 7.4)';
    phaseColor = 'text-emerald-400';
    phaseDesc = lang === 'ar'
      ? 'لا توقف الغسيل حتى يصل الرقم الهيدروجيني للتعادل التام.'
      : 'Do not discontinue irrigation until the tear film pH is fully neutral.';
  }

  return (
    <div 
      className="modal-portal-wrapper fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm w-full max-w-full h-full max-h-screen overflow-x-hidden overflow-y-auto animate-in fade-in duration-200" 
      dir={dir}
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh] my-auto mx-auto relative shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-b border-red-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400">
              <Timer className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cairo']">
                {t.timerTitle}
              </h2>
              <p className="text-[11px] text-red-300">
                {lang === 'ar' ? '20 دقيقة غسيل مستمر إلزامي لإصابات الأسمنت والأحماض والقلويات' : 'Mandatory 20-minute continuous irrigation for chemical and cement injuries'}
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

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          
          {/* Main Countdown Display */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative">
            <div className="text-5xl sm:text-6xl font-mono font-black tracking-wider text-amber-400 mb-2">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden mb-3">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Phase info */}
            <div className="text-center">
              <span className={`text-xs font-bold ${phaseColor} block mb-1`}>
                {phaseText}
              </span>
              <p className="text-[11px] text-slate-400 max-w-sm">
                {phaseDesc}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition active:scale-95 ${
                isRunning 
                  ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>{t.pauseTimer}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{timeLeft === TOTAL_SECONDS ? t.startTimer : (lang === 'ar' ? 'استئناف الغسيل' : 'Resume')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setTimeLeft((prev) => prev + 5 * 60);
              }}
              title={lang === 'ar' ? "إضافة 5 دقائق إضافية" : "Add 5 minutes"}
              className="flex items-center gap-1.5 px-3 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>+5 {t.timerMinutes}</span>
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setTimeLeft(TOTAL_SECONDS);
              }}
              title={t.resetTimer}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={lang === 'ar' ? "تفعيل / كتم صوت التنبيه" : "Toggle Sound"}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>

          {/* Critical Clinical Reminders */}
          <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-red-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{lang === 'ar' ? 'قواعد ذهبية للتعامل مع الحروق الكيميائية:' : 'Golden Chemical Burn Field Rules:'}</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside leading-relaxed">
              <li>
                <strong className="text-white">{lang === 'ar' ? 'لا تؤجل الغسيل' : 'NEVER delay irrigation'}</strong> {lang === 'ar' ? 'لأخذ التاريخ المرضي أو قياس النظر أو ملء الاستمارة!' : 'for clinical history taking, visual acuity, or paperwork!'}
              </li>
              <li>
                {lang === 'ar' ? 'استخدم' : 'Use'} <strong className="text-white">1 - 2 {lang === 'ar' ? 'لتر' : 'Liters'}</strong> {lang === 'ar' ? 'من المحلول الملحي (Normal Saline / Ringer) أو الماء النظيف الجاري.' : 'of Normal Saline or clean continuous running water.'}
              </li>
              <li>
                {lang === 'ar' ? 'استخدم شريط قياس الـ pH (مثل شريط البول) بعد الغسيل بـ 5 دقائق؛ إذا كان غير متعادل، استأنف الغسيل فوراً.' : 'Check pH strip 5 minutes post-irrigation; if not neutral, resume immediately.'}
              </li>
              <li>
                <strong className="text-white">{lang === 'ar' ? 'حظر تام' : 'NEVER attempt'}</strong> {lang === 'ar' ? 'لمحاولة معادلة الحرق بحمض أو قاعدة ضعيفة.' : 'chemical neutralization.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
