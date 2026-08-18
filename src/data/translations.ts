export interface TranslationSchema {
  appTitle: string;
  appSubtitle: string;
  resetBtn: string;
  langBtn: string;
  mainWelcome: string;
  selectComplaint: string;
  visualLossTitle: string;
  visualLossSub: string;
  redEyeTitle: string;
  redEyeSub: string;
  traumaTitle: string;
  traumaSub: string;
  oculomicsTitle: string;
  oculomicsSub: string;
  oculomicsDiabetic: string;
  oculomicsCardio: string;
  oculomicsNeuro: string;
  alAtaaProgram: string;
  alAtaaSub: string;
  bismillah: string;
  quranVerse: string;
  sadaqallah: string;
  orgTitle: string;
  orgTagline: string;
  whatsappContactBtn: string;
  whatsappTooltip: string;
  chemicalTimer: string;
  clinicalGuide: string;
  bedsideTools: string;
  nextBtn: string;
  backBtn: string;
  referralReport: string;

  // Additional UI keys for full bilingual experience
  triageBadge: string;
  protocolsYear: string;
  fieldGoldenRuleTitle: string;
  fieldGoldenRuleText: string;
  currentPath: string;
  questionNumber: string;
  directClinicalAssessment: string;
  triageHistoryTitle: string;
  savedCasesCountLabel: string;
  newCaseBtn: string;
  referralLabel: string;
  clinicalAssessmentSummary: string;
  redFlagsTitle: string;
  contraindicationsTitle: string;
  immediateFirstAid: string;
  recommendedFieldMeds: string;
  referralTiming: string;
  referralDestination: string;
  openTimerBtn: string;
  saveCaseBtn: string;
  caseSavedBtn: string;
  generateReportBtn: string;
  modifyAnswerBtn: string;
  clinicalReferenceTitle: string;
  bedsideToolsTitle: string;
  shiftHistoryTitle: string;
  noCasesRecorded: string;
  clearAllCases: string;
  exportTxt: string;
  patientName: string;
  patientAgeGender: string;
  clinicalNotes: string;
  copyReport: string;
  copied: string;
  shareWhatsApp: string;
  printReport: string;
  timerTitle: string;
  timerMinutes: string;
  timerSeconds: string;
  startTimer: string;
  pauseTimer: string;
  resetTimer: string;
  stepPhases: string;
  searchPlaceholder: string;
  allCategories: string;
  criticalCases: string;
  urgentCases: string;
  fieldCases: string;
  routineCases: string;
  viewTreatmentPlan: string;
  close: string;
  warningNotice: string;
  footerBrand: string;
  footerSub: string;
}

export const translations: Record<'ar' | 'en', TranslationSchema> = {
  ar: {
    appTitle: "FastOphtha",
    appSubtitle: "الفرز السريري السريع لطب وجراحة العيون",
    resetBtn: "إعادة بدء",
    langBtn: "English",
    mainWelcome: "مرحباً بك يا دكتور. حدد الشكوى الرئيسية للمريض:",
    selectComplaint: "اختر المسار الأقرب لحالة المريض لبدء الأسئلة السريرية المتسلسلة:",
    visualLossTitle: "ضعف أو هبوط بالرؤية",
    visualLossSub: "مفاجئ / تدريجي / غباش بدون ألم أو مع ألم",
    redEyeTitle: "عين حمراء / إفرازات / ألم",
    redEyeSub: "احمرار / حكة / صديد / جفاف / قرحة / انزعاج",
    traumaTitle: "إصابات وطوارئ مباشرة",
    traumaSub: "مواد كيميائية / ضربة نافذة / أجسام غريبة / جروح",
    oculomicsTitle: "بوابة الـ Oculomics والمسح الشامل",
    oculomicsSub: "التنبؤ بأمراض السكري، الضغط، القلب، والكلى من قاع العين",
    oculomicsDiabetic: "مسح اعتلال الشبكية والكلى السكري (Diabetic & Renal Risk)",
    oculomicsCardio: "مسح القلب والسكتات الدماغية (Cardiovascular & Stroke Risk)",
    oculomicsNeuro: "مسح ضغط الدماغ والعصب البصري (Neuro & Optic Disc)",
    alAtaaProgram: "برنامج العطاء",
    alAtaaSub: "طب العيون / الفحص البصري الميداني الشامل",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    quranVerse: "وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ",
    sadaqallah: "صَدَقَ اللَّهُ الْعَلِيُّ الْعَظِيمُ",
    orgTitle: "مؤسسة عطاء العقيلة التنموية",
    orgTagline: "من أجل دولة كريمة",
    whatsappContactBtn: "تواصل معنا عبر واتساب (+964 781 260 0392)",
    whatsappTooltip: "تواصل مباشر عبر واتساب مع فريق الدعم والإسناد الطبي الميداني",
    chemicalTimer: "مؤقت الغسيل الكيميائي",
    clinicalGuide: "الدليل السريري المرجعي",
    bedsideTools: "أدوات الفحص الميداني",
    nextBtn: "التالي",
    backBtn: "رجوع",
    referralReport: "توليد تقرير الإحالة الطبية",

    triageBadge: "خوارزمية الفرز السريع",
    protocolsYear: "تحديث البروتوكولات 2026",
    fieldGoldenRuleTitle: "القاعدة الميدانية الذهبية لفرز العيون:",
    fieldGoldenRuleText: "أي مريض يشكو من (1) ألم عيني شديد أو (2) هبوط مفاجئ في حدة الرؤية أو (3) حرق كيميائي أو ضربة نافذة يُعامل كـ حالة طارئة فورية تستلزم اتخاذ الإجراءات التحفظية والتحويل السريع.",
    currentPath: "المسار الحالي:",
    questionNumber: "السؤال #",
    directClinicalAssessment: "تقييم سريري مباشر",
    triageHistoryTitle: "سجل الفرز الميداني",
    savedCasesCountLabel: "حالات مسجلة",
    newCaseBtn: "حالة جديدة",
    referralLabel: "التحويل:",
    clinicalAssessmentSummary: "ملخص التقييم السريري:",
    redFlagsTitle: "العلامات التحذيرية والخطورة السريرية (Red Flags):",
    contraindicationsTitle: "موانع استعمال وتحذيرات حرجة (Contraindications):",
    immediateFirstAid: "الإسعاف الأولي والتدبير الميداني الفوري:",
    recommendedFieldMeds: "العلاجات الميدانية المقترحة (إن توفرت):",
    referralTiming: "مهلة التحويل الموصى بها:",
    referralDestination: "الوجهة الطبية المناسبة:",
    openTimerBtn: "تشغيل مؤقت الغسيل (20 دقيقة)",
    saveCaseBtn: "حفظ بالسجل الميداني",
    caseSavedBtn: "تم الحفظ بالسجل ✓",
    generateReportBtn: "توليد تقرير إحالة رسمي",
    modifyAnswerBtn: "تعديل الإجابة",
    clinicalReferenceTitle: "الدليل السريري المرجعي الشامل",
    bedsideToolsTitle: "أدوات الفحص الميداني وسرير المريض",
    shiftHistoryTitle: "سجل الحالات والمناوبة الميدانية",
    noCasesRecorded: "لا توجد حالات مسجلة بعد في هذه المناوبة.",
    clearAllCases: "مسح السجل",
    exportTxt: "تصدير نصي",
    patientName: "اسم المريض (اختياري)",
    patientAgeGender: "العمر / الجنس",
    clinicalNotes: "ملاحظات سريرية إضافية",
    copyReport: "نسخ نص التقرير",
    copied: "تم النسخ!",
    shareWhatsApp: "مشاركة عبر واتساب",
    printReport: "طباعة التقرير",
    timerTitle: "مؤقت الغسيل الكيميائي الميداني",
    timerMinutes: "دقيقة",
    timerSeconds: "ثانية",
    startTimer: "بدء الغسيل",
    pauseTimer: "إيقاف مؤقت",
    resetTimer: "إعادة ضبط",
    stepPhases: "مراحل الغسيل والتدبير",
    searchPlaceholder: "ابحث بالاسم العربي أو الإنجليزي أو الأعراض...",
    allCategories: "جميع التصنيفات",
    criticalCases: "حرجة للغاية",
    urgentCases: "طارئة عاجلة",
    fieldCases: "تدبير ميداني",
    routineCases: "روتينية",
    viewTreatmentPlan: "عرض البروتوكول السريري",
    close: "إغلاق",
    warningNotice: "تنبيه طبي: هذه المنظومة مخصصة لدعم القرار السريري للكوادر الطبية والإسعافية في الميدان وليست بديلاً عن الفحص المتخصص.",
    footerBrand: "منظومة طب العيون الميداني للفقراء والمناطق النائية",
    footerSub: "أداة مساعدة ودعم للقرار السريري لطواقم الطوارئ والقوافل الطبية"
  },
  en: {
    appTitle: "FastOphtha",
    appSubtitle: "Rapid Field Ophthalmic Triage System",
    resetBtn: "Reset",
    langBtn: "العربية",
    mainWelcome: "Welcome Doctor. Select patient primary complaint:",
    selectComplaint: "Choose the closest clinical pathway to initiate triage logic:",
    visualLossTitle: "Visual Loss / Blur",
    visualLossSub: "Sudden / Gradual / Painful or Painless vision loss",
    redEyeTitle: "Red Eye / Discharge / Pain",
    redEyeSub: "Redness / Itching / Pus / Dryness / Ulcer / Discomfort",
    traumaTitle: "Ocular Trauma & Emergencies",
    traumaSub: "Chemical exposure / Penetrating / Foreign body / Blunt",
    oculomicsTitle: "Oculomics & Systemic Screening",
    oculomicsSub: "Predicting Diabetes, Hypertension, Heart & Kidney risks via Retina",
    oculomicsDiabetic: "Diabetic Retinopathy & Renal Risk Screening",
    oculomicsCardio: "Cardiovascular & Stroke Risk Assessment",
    oculomicsNeuro: "Optic Nerve & Intracranial Pressure Screening",
    alAtaaProgram: "Al-Ata'a Program",
    alAtaaSub: "Ophthalmology / Comprehensive Field Visual Screening",
    bismillah: "In the Name of God, the Most Gracious, the Most Merciful",
    quranVerse: "“And when I am ill, it is He who cures me”",
    sadaqallah: "True are the words of God Almighty",
    orgTitle: "Ataa Al-Aqila Development Foundation",
    orgTagline: "For a Dignified Nation",
    whatsappContactBtn: "Contact us on WhatsApp (+964 781 260 0392)",
    whatsappTooltip: "Direct WhatsApp contact with field team & medical coordination",
    chemicalTimer: "Chemical Irrigation Timer",
    clinicalGuide: "Clinical Reference Guide",
    bedsideTools: "Bedside Exam Tools",
    nextBtn: "Next",
    backBtn: "Back",
    referralReport: "Generate Referral Report",

    triageBadge: "Rapid Triage Algorithm",
    protocolsYear: "Protocols Update 2026",
    fieldGoldenRuleTitle: "Golden Field Rule for Ophthalmic Triage:",
    fieldGoldenRuleText: "Any patient presenting with (1) severe eye pain, (2) sudden visual loss, or (3) chemical exposure / penetrating injury must be treated as an immediate emergency requiring conservative protection and rapid referral.",
    currentPath: "Current Pathway:",
    questionNumber: "Question #",
    directClinicalAssessment: "Direct Clinical Assessment",
    triageHistoryTitle: "Field Triage Log",
    savedCasesCountLabel: "Logged Cases",
    newCaseBtn: "New Case",
    referralLabel: "Referral:",
    clinicalAssessmentSummary: "Clinical Assessment Summary:",
    redFlagsTitle: "Red Flags & Clinical Risk Factors:",
    contraindicationsTitle: "Critical Contraindications & Warnings:",
    immediateFirstAid: "Immediate Field Actions & First Aid:",
    recommendedFieldMeds: "Suggested Field Medications (if available):",
    referralTiming: "Recommended Referral Timeframe:",
    referralDestination: "Appropriate Medical Facility:",
    openTimerBtn: "Launch Irrigation Timer (20 min)",
    saveCaseBtn: "Save to Field Shift Log",
    caseSavedBtn: "Saved in Log ✓",
    generateReportBtn: "Generate Official Referral Report",
    modifyAnswerBtn: "Edit Answer",
    clinicalReferenceTitle: "Comprehensive Clinical Reference Guide",
    bedsideToolsTitle: "Bedside Examination & Field Diagnostic Tools",
    shiftHistoryTitle: "Field Cases & Shift Activity Log",
    noCasesRecorded: "No cases recorded yet in this shift.",
    clearAllCases: "Clear All",
    exportTxt: "Export TXT",
    patientName: "Patient Name (Optional)",
    patientAgeGender: "Age / Gender",
    clinicalNotes: "Additional Clinical Notes",
    copyReport: "Copy Referral Text",
    copied: "Copied!",
    shareWhatsApp: "Share via WhatsApp",
    printReport: "Print Report",
    timerTitle: "Field Chemical Irrigation Timer",
    timerMinutes: "Min",
    timerSeconds: "Sec",
    startTimer: "Start Irrigation",
    pauseTimer: "Pause",
    resetTimer: "Reset Timer",
    stepPhases: "Irrigation Phases & Protocol",
    searchPlaceholder: "Search condition, English name, or symptoms...",
    allCategories: "All Categories",
    criticalCases: "Critical",
    urgentCases: "Urgent",
    fieldCases: "Field Care",
    routineCases: "Routine",
    viewTreatmentPlan: "View Clinical Protocol",
    close: "Close",
    warningNotice: "Medical Disclaimer: This platform supports clinical decision-making for field and emergency personnel and does not replace specialized ophthalmologist examination.",
    footerBrand: "Field Ophthalmology Care System for Remote & Rural Regions",
    footerSub: "Clinical decision support tool for emergency teams, triage staff & medical caravans"
  }
};
