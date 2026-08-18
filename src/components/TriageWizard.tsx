import React from 'react';
import { 
  Eye, 
  Flame, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  Zap, 
  Clock, 
  AlertOctagon, 
  EyeOff, 
  CloudRain, 
  Activity, 
  Glasses, 
  ScanEye, 
  CircleDot, 
  HeartPulse, 
  AlertCircle, 
  ShieldAlert, 
  Sun, 
  Droplets, 
  Sparkles, 
  ShieldX, 
  Target,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { triagePaths, decisionTrees } from '../data/triageData';
import { TriageNode, TriageOption } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface TriageWizardProps {
  currentPath: string | null;
  currentNodeId: string | null;
  historyStack: { nodeId: string; question: string; chosenAnswer: string }[];
  onSelectPath: (pathId: string) => void;
  onSelectOption: (option: TriageOption, questionText: string) => void;
  onGoBack: () => void;
}

export const TriageWizard: React.FC<TriageWizardProps> = ({
  currentPath,
  currentNodeId,
  historyStack,
  onSelectPath,
  onSelectOption,
  onGoBack
}) => {
  const { lang, t, dir } = useLanguage();

  // Icon mapper helper
  const renderIcon = (iconName?: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Eye': return <Eye className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Clock': return <Clock className={className} />;
      case 'AlertOctagon': return <AlertOctagon className={className} />;
      case 'EyeOff': return <EyeOff className={className} />;
      case 'CloudRain': return <CloudRain className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Glasses': return <Glasses className={className} />;
      case 'ScanEye': return <ScanEye className={className} />;
      case 'CircleDot': return <CircleDot className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'AlertCircle': return <AlertCircle className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Sun': return <Sun className={className} />;
      case 'Droplets': return <Droplets className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'ShieldX': return <ShieldX className={className} />;
      case 'Target': return <Target className={className} />;
      default: return <CheckCircle2 className={className} />;
    }
  };

  const ForwardIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  // STEP 1: Main Category Selection Menu
  if (!currentPath || !currentNodeId) {
    return (
      <div className="space-y-4 animate-in fade-in duration-300">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-800/40 p-4 sm:p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                {t.triageBadge}
              </span>
              <span className="text-xs text-slate-400">{t.protocolsYear}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white font-['Cairo']">
              {t.mainWelcome}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              {t.selectComplaint}
            </p>
          </div>
        </div>

        {/* 3 Main Categories Cards */}
        <div className="grid grid-cols-1 gap-3.5">
          {triagePaths.map((path) => {
            let colorStyles = {
              border: 'hover:border-blue-500 hover:shadow-blue-500/10',
              iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
              arrowColor: 'group-hover:text-blue-400',
              titleColor: 'group-hover:text-blue-300',
              badgeColor: 'bg-blue-950 text-blue-300 border-blue-800/50'
            };

            if (path.id === 'red_eye') {
              colorStyles = {
                border: 'hover:border-rose-500 hover:shadow-rose-500/10',
                iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                arrowColor: 'group-hover:text-rose-400',
                titleColor: 'group-hover:text-rose-300',
                badgeColor: 'bg-rose-950 text-rose-300 border-rose-800/50'
              };
            } else if (path.id === 'trauma') {
              colorStyles = {
                border: 'hover:border-amber-500 hover:shadow-amber-500/10',
                iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                arrowColor: 'group-hover:text-amber-400',
                titleColor: 'group-hover:text-amber-300',
                badgeColor: 'bg-amber-950 text-amber-300 border-amber-800/50'
              };
            }

            const pathTitle = lang === 'ar' ? path.title : path.titleEn || path.title;
            const pathSub = lang === 'ar' ? path.subTitle : path.subTitleEn || path.subTitle;
            const pathBadge = lang === 'ar' ? path.badge : path.badgeEn || path.badge;

            return (
              <button
                key={path.id}
                onClick={() => onSelectPath(path.id)}
                className={`w-full bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl ${dir === 'rtl' ? 'text-right' : 'text-left'} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group flex items-center justify-between gap-3 ${colorStyles.border}`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${colorStyles.iconBg}`}>
                    {renderIcon(path.icon, 'w-6 h-6')}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-black text-sm sm:text-base text-white font-['Cairo'] transition-colors ${colorStyles.titleColor}`}>
                        {pathTitle}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${colorStyles.badgeColor}`}>
                        {pathBadge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-normal">
                      {pathSub}
                    </p>
                  </div>
                </div>

                <div className={`w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 transition-all ${colorStyles.arrowColor} ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} shrink-0`}>
                  <ForwardIcon className="w-4 h-4" />
                </div>
              </button>
            );
          })}

          {/* 4th Card: Dedicated Oculomics & Systemic Health Screening */}
          <button 
            onClick={() => onSelectPath('oculomics')} 
            className={`w-full bg-gradient-to-r from-purple-900 via-purple-950 to-indigo-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-purple-500/20 ${dir === 'rtl' ? 'text-right' : 'text-left'} flex items-center justify-between group gap-3`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform shadow-inner shadow-purple-500/20">
                🔮
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-sm sm:text-base text-purple-100 font-['Cairo']">
                    {t.oculomicsTitle}
                  </h3>
                  <span className="bg-purple-500/30 text-purple-200 text-[10px] px-2 py-0.5 rounded-full border border-purple-400/40 font-bold tracking-wider">
                    PROACTIVE
                  </span>
                </div>
                <p className="text-xs text-purple-200/80 mt-1 font-medium leading-normal">
                  {t.oculomicsSub}
                </p>
              </div>
            </div>
            <span className={`text-purple-300 text-2xl font-bold ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform shrink-0`}>
              {dir === 'rtl' ? '←' : '→'}
            </span>
          </button>
        </div>

        {/* Rapid Clinical Rule of Thumb Box */}
        <div className="bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            <span>{t.fieldGoldenRuleTitle}</span>
          </div>
          <p className="leading-relaxed">
            {t.fieldGoldenRuleText}
          </p>
        </div>

      </div>
    );
  }

  // STEP 2: Active Decision Node Question
  const node: TriageNode | undefined = decisionTrees[currentNodeId];

  if (!node) {
    return (
      <div className="text-center py-10 text-slate-400">
        {lang === 'ar' ? 'عذراً، حدث خطأ في تسلسل الخطوات.' : 'Sorry, an error occurred in the clinical pathway.'}
      </div>
    );
  }

  const localizedPathTitle = lang === 'ar' ? (node.pathTitle || 'الفرز الميداني') : (node.pathTitleEn || node.pathTitle || 'Field Triage');
  const localizedQuestion = lang === 'ar' ? node.question : (node.questionEn || node.question);
  const localizedHint = lang === 'ar' ? node.hint : (node.hintEn || node.hint);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* Breadcrumb Navigation & Back Button */}
      <div className="flex items-center justify-between text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-slate-400">
          <span className="text-slate-500">{t.currentPath}</span>
          <span className="font-bold text-blue-400">{localizedPathTitle}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-300">{t.questionNumber}{historyStack.length + 1}</span>
        </div>

        <button
          onClick={onGoBack}
          className="flex items-center gap-1 text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-800 transition"
        >
          <BackIcon className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>
      </div>

      {/* Question Container Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        
        {/* Question Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-xs">
              {historyStack.length + 1}
            </span>
            <span className="text-xs text-blue-300 font-semibold">{t.directClinicalAssessment}</span>
          </div>

          <h2 className="text-base sm:text-lg font-black text-white font-['Cairo'] leading-snug">
            {localizedQuestion}
          </h2>

          {localizedHint && (
            <p className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{localizedHint}</span>
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {node.options.map((option, idx) => {
            const optLabel = lang === 'ar' ? option.label : (option.labelEn || option.label);
            const optSub = lang === 'ar' ? option.subLabel : (option.subLabelEn || option.subLabel);

            return (
              <button
                key={idx}
                onClick={() => onSelectOption(option, localizedQuestion)}
                className={`w-full bg-slate-950/80 hover:bg-blue-950/40 border border-slate-800 hover:border-blue-500/60 p-4 rounded-xl ${dir === 'rtl' ? 'text-right' : 'text-left'} transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg group flex items-center justify-between gap-3`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-blue-500/40 flex items-center justify-center text-slate-400 group-hover:text-blue-400 shrink-0 transition-colors mt-0.5">
                    {renderIcon(option.icon, 'w-4 h-4')}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-blue-200 leading-snug">
                      {optLabel}
                    </div>
                    {optSub && (
                      <div className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-normal">
                        {optSub}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-lg bg-slate-900 group-hover:bg-blue-600/30 flex items-center justify-center text-slate-500 group-hover:text-blue-400 shrink-0 transition-all ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`}>
                  <ForwardIcon className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
};
