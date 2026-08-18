import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ApexHeader } from './components/ApexHeader';
import { Footer } from './components/Footer';
import { TriageWizard } from './components/TriageWizard';
import { TriageResultCard } from './components/TriageResultCard';
import { ChemicalTimerModal } from './components/ChemicalTimerModal';
import { ClinicalReferenceModal } from './components/ClinicalReferenceModal';
import { BedsideToolsModal } from './components/BedsideToolsModal';
import { FieldCaseHistory } from './components/FieldCaseHistory';
import { ReportModal } from './components/ReportModal';
import { decisionTrees, resultsDatabase } from './data/triageData';
import { TriageOption, TriageResult, SavedCase } from './types';
import { useLanguage } from './context/LanguageContext';
import { 
  BookOpen, 
  Timer,
  Stethoscope
} from 'lucide-react';

export default function App() {
  const { lang, t, dir } = useLanguage();

  // Navigation & Wizard State
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [historyStack, setHistoryStack] = useState<{ nodeId: string; question: string; chosenAnswer: string }[]>([]);
  const [currentResult, setCurrentResult] = useState<TriageResult | null>(null);

  // Modals state
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [isBedsideToolsOpen, setIsBedsideToolsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const isAnyModalOpen = isTimerOpen || isReferenceOpen || isBedsideToolsOpen || isHistoryOpen || isReportOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isAnyModalOpen]);

  // Saved Cases (LocalStorage)
  const [savedCases, setSavedCases] = useState<SavedCase[]>(() => {
    try {
      const stored = localStorage.getItem('fastophtha_cases');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fastophtha_cases', JSON.stringify(savedCases));
    } catch {
      // ignore storage limits
    }
  }, [savedCases]);

  // Path Selection
  const handleSelectPath = (pathId: string) => {
    setCurrentPath(pathId);
    setCurrentNodeId(pathId);
    setHistoryStack([]);
    setCurrentResult(null);
  };

  // Option Selection
  const handleSelectOption = (option: TriageOption, questionText: string) => {
    const chosenAnswer = lang === 'ar' ? option.label : (option.labelEn || option.label);
    
    // Record step in history
    if (currentNodeId) {
      setHistoryStack((prev) => [
        ...prev,
        { nodeId: currentNodeId, question: questionText, chosenAnswer }
      ]);
    }

    // Check if target is a clinical result
    if (option.next.startsWith('RES_')) {
      const res = resultsDatabase[option.next];
      if (res) {
        setCurrentResult(res);
      }
    } else {
      setCurrentNodeId(option.next);
    }
  };

  // Go back one step
  const handleGoBack = () => {
    if (currentResult) {
      // Step back from result
      setCurrentResult(null);
      return;
    }

    if (historyStack.length === 0) {
      // Step back to main menu
      setCurrentPath(null);
      setCurrentNodeId(null);
      return;
    }

    const lastStep = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setCurrentNodeId(lastStep.nodeId);
  };

  // Reset entire wizard
  const handleReset = () => {
    setCurrentPath(null);
    setCurrentNodeId(null);
    setHistoryStack([]);
    setCurrentResult(null);
  };

  // Helper to get localized path title
  const getLocalizedPathTitle = () => {
    if (!currentPath) return lang === 'ar' ? 'فرز العيون' : 'Eye Triage';
    const treeNode = decisionTrees[currentPath];
    if (!treeNode) return currentPath;
    return lang === 'ar' ? treeNode.pathTitle : (treeNode.pathTitleEn || treeNode.pathTitle);
  };

  // Save current case
  const handleSaveCase = () => {
    if (!currentResult) return;
    const pathTitle = getLocalizedPathTitle();
    
    const newCase: SavedCase = {
      id: 'case_' + Date.now(),
      timestamp: new Date().toLocaleString(lang === 'ar' ? 'ar-SA' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      path: currentPath || 'general',
      pathTitle,
      answers: historyStack.map(h => ({ question: h.question, answer: h.chosenAnswer })),
      result: currentResult
    };

    setSavedCases((prev) => [newCase, ...prev]);
  };

  const isCaseSaved = currentResult ? savedCases.some(c => c.result.id === currentResult.id && c.answers.length === historyStack.length) : false;

  // View saved case report
  const handleViewSavedCaseReport = (c: SavedCase) => {
    setCurrentResult(c.result);
    setCurrentPath(c.path);
    setIsHistoryOpen(false);
    setIsReportOpen(true);
  };

  // Delete saved case
  const handleDeleteCase = (id: string) => {
    setSavedCases((prev) => prev.filter(c => c.id !== id));
  };

  const handleClearAllCases = () => {
    const confirmMsg = lang === 'ar' ? 'هل أنت متأكد من مسح جميع الحالات المحفوظة من السجل؟' : 'Are you sure you want to clear all logged cases?';
    if (window.confirm(confirmMsg)) {
      setSavedCases([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white w-full max-w-full overflow-x-hidden relative" dir={dir}>
      
      {/* Top Navbar */}
      <Navbar
        onReset={handleReset}
        onOpenTimer={() => setIsTimerOpen(true)}
        onOpenReference={() => setIsReferenceOpen(true)}
        onOpenBedsideTools={() => setIsBedsideToolsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCasesCount={savedCases.length}
      />

      {/* Top Apex Header & Centered Spiritual Banner */}
      <ApexHeader />

      {/* Main Container */}
      <main className="max-w-3xl mx-auto p-4 sm:p-6 w-full max-w-full overflow-x-hidden flex-1 flex flex-col justify-center">
        
        {/* If result is ready, show Result Card */}
        {currentResult ? (
          <TriageResultCard
            result={currentResult}
            pathTitle={getLocalizedPathTitle()}
            answers={historyStack.map(h => ({ question: h.question, answer: h.chosenAnswer }))}
            onReset={handleReset}
            onBack={handleGoBack}
            onOpenReport={() => setIsReportOpen(true)}
            onOpenChemicalTimer={() => setIsTimerOpen(true)}
            onSaveCase={handleSaveCase}
            isCaseSaved={isCaseSaved}
          />
        ) : (
          /* Otherwise show Wizard Steps */
          <TriageWizard
            currentPath={currentPath}
            currentNodeId={currentNodeId}
            historyStack={historyStack}
            onSelectPath={handleSelectPath}
            onSelectOption={handleSelectOption}
            onGoBack={handleGoBack}
          />
        )}

      </main>

      {/* Quick Launch Bottom Bar (when on main screen) */}
      {!currentPath && (
        <div className="max-w-3xl mx-auto px-4 pb-4 w-full">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <button
              onClick={() => setIsTimerOpen(true)}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 rounded-xl transition flex flex-col items-center gap-1.5 text-slate-300 hover:text-amber-300"
            >
              <Timer className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-[11px]">{t.chemicalTimer}</span>
            </button>

            <button
              onClick={() => setIsReferenceOpen(true)}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/40 rounded-xl transition flex flex-col items-center gap-1.5 text-slate-300 hover:text-blue-300"
            >
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-[11px]">{t.clinicalGuide}</span>
            </button>

            <button
              onClick={() => setIsBedsideToolsOpen(true)}
              className="p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 rounded-xl transition flex flex-col items-center gap-1.5 text-slate-300 hover:text-emerald-300"
            >
              <Stethoscope className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-[11px]">{t.bedsideTools}</span>
            </button>
          </div>
        </div>
      )}

      {/* Official Foundation Footer & Interactive Telegram Contact */}
      <Footer />

      {/* Modals */}
      <ChemicalTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      <ClinicalReferenceModal
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
        onSelectCondition={(res) => {
          setCurrentResult(res);
          setCurrentPath('manual');
          setHistoryStack([]);
        }}
      />

      <BedsideToolsModal
        isOpen={isBedsideToolsOpen}
        onClose={() => setIsBedsideToolsOpen(false)}
      />

      <FieldCaseHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedCases={savedCases}
        onDeleteCase={handleDeleteCase}
        onClearAll={handleClearAllCases}
        onViewReport={handleViewSavedCaseReport}
      />

      {currentResult && (
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          result={currentResult}
          pathTitle={getLocalizedPathTitle()}
          answers={historyStack.map(h => ({ question: h.question, answer: h.chosenAnswer }))}
        />
      )}

    </div>
  );
}
