import { TriageNode, TriageResult } from '../types';

export const triagePaths = [
  {
    id: 'visual_loss',
    title: 'ضعف أو هبوط بالرؤية',
    titleEn: 'Visual Loss / Blur',
    subTitle: 'مفاجئ / تدريجي / غباش بدون ألم أو مع ألم',
    subTitleEn: 'Sudden / Gradual / Painful or Painless vision loss',
    icon: 'Eye',
    badge: 'طوارئ & عيادة',
    badgeEn: 'Emergency & Clinic',
    color: 'blue'
  },
  {
    id: 'red_eye',
    title: 'عين حمراء / إفرازات / ألم',
    titleEn: 'Red Eye / Discharge / Pain',
    subTitle: 'احمرار / حكة / صديد / جفاف / قرحة / انزعاج',
    subTitleEn: 'Redness / Itching / Pus / Dryness / Ulcer / Discomfort',
    icon: 'Flame',
    badge: 'التهابات وقرنية',
    badgeEn: 'Infections & Cornea',
    color: 'rose'
  },
  {
    id: 'trauma',
    title: 'إصابات وطوارئ مباشرة',
    titleEn: 'Ocular Trauma & Emergencies',
    subTitle: 'مواد كيميائية / ضربة نافذة / أجسام غريبة / جروح',
    subTitleEn: 'Chemical exposure / Penetrating / Foreign body / Blunt',
    icon: 'AlertTriangle',
    badge: 'حالات حرجة',
    badgeEn: 'Critical Emergencies',
    color: 'amber'
  }
];

export const decisionTrees: Record<string, TriageNode> = {
  // ==================== PATH 1: VISUAL LOSS ====================
  visual_loss: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "هل توجد أي علامة إنذار إسعافية مرافقة لفقدان الرؤية؟",
  "questionEn": "Are any emergency warning features present?",
  "hint": "وجود العلامات التالية يستدعي التقييم الإسعافي دون إكمال الفرز. عدم وجودها لا يستبعد مرضاً خطيراً.",
  "hintEn": "Emergency features require immediate assessment; their absence does not exclude serious disease.",
  "options": [
    {
      "label": "ضعف أو خدر مفاجئ، اضطراب الكلام، تدلي الوجه، فقدان مجال بصري مفاجئ أو ازدواج جديد مع أعراض عصبية",
      "labelEn": "Sudden weakness/numbness, speech or facial changes, acute visual-field loss, or new diplopia with neurologic symptoms",
      "subLabel": "حتى لو زالت الأعراض",
      "subLabelEn": "Even if symptoms have resolved",
      "next": "RES_VL_NEURO_EMERGENCY",
      "icon": "AlertOctagon"
    },
    {
      "label": "فقدان رؤية مفاجئ وعابر في عين واحدة ثم عادت الرؤية",
      "labelEn": "Sudden transient monocular visual loss with subsequent recovery",
      "subLabel": "قد يمثل نقص تروية شبكية عابراً",
      "subLabelEn": "May represent transient retinal ischemia",
      "next": "RES_OCULOMICS_ALERT",
      "icon": "AlertTriangle"
    },
    {
      "label": "العمر 50 سنة أو أكثر مع فقدان رؤية جديد وصداع جديد أو ألم الفك عند المضغ أو ألم فروة الرأس",
      "labelEn": "Age 50 or older with new visual loss plus new headache, jaw claudication, or scalp tenderness",
      "subLabel": "اشتباه التهاب الشريان ذي الخلايا العملاقة",
      "subLabelEn": "Possible giant cell arteritis",
      "next": "RES_VL_GCA",
      "icon": "AlertOctagon"
    },
    {
      "label": "لا توجد أي من العلامات السابقة أو لا تنطبق على الحالة",
      "labelEn": "None of the above features are present or identified",
      "subLabel": "تابع تقييم نمط فقدان الرؤية",
      "subLabelEn": "Continue assessment of visual-loss pattern",
      "next": "vl_onset",
      "icon": "Eye"
    }
  ]
},
  vl_onset: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "ما نمط بدء فقدان الرؤية؟",
  "questionEn": "What is the onset and course of visual loss?",
  "hint": "وثّق العين المصابة ووقت البداية وقياس حدة البصر إن أمكن دون تأخير الإحالة.",
  "hintEn": "Record laterality, onset, and visual acuity if feasible without delaying urgent referral.",
  "options": [
    {
      "label": "مفاجئ أو سريع خلال دقائق إلى ساعات، أو عند الاستيقاظ",
      "labelEn": "Sudden or rapid onset over minutes to hours, including on waking",
      "subLabel": "",
      "subLabelEn": "",
      "next": "vl_sudden_pain",
      "icon": "Activity"
    },
    {
      "label": "تدهور خلال أيام إلى أسابيع، أو نمط غير واضح",
      "labelEn": "Progression over days to weeks, or unclear onset",
      "subLabel": "يحتاج فحصاً عينياً سريعاً بحسب الأعراض",
      "subLabelEn": "Requires timely examination based on clinical features",
      "next": "RES_VL_UNDIFFERENTIATED",
      "icon": "Activity"
    },
    {
      "label": "تدريجي خلال أشهر إلى سنوات دون تغير حديث مفاجئ",
      "labelEn": "Gradual over months to years without recent acute change",
      "subLabel": "",
      "subLabelEn": "",
      "next": "vl_gradual",
      "icon": "Activity"
    }
  ]
},
  vl_sudden_pain: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "هل يصاحب الفقدان المفاجئ ألم عيني شديد أو احمرار أو رهاب ضوء؟",
  "questionEn": "Is sudden visual loss associated with severe eye pain, redness, or photophobia?",
  "hint": "الألم مع فقدان الرؤية يستدعي استبعاد أسباب مهددة للبصر؛ لا يؤكد الزرق وحده.",
  "hintEn": "Pain with visual loss may reflect several sight-threatening disorders, not glaucoma alone.",
  "options": [
    {
      "label": "نعم: ألم شديد أو احمرار أو هالات أو غثيان/قيء",
      "labelEn": "Yes: severe pain, redness, halos, nausea, or vomiting",
      "subLabel": "اشتباه طارئ عيني مؤلم، بما فيه انغلاق الزاوية",
      "subLabelEn": "Painful ocular emergency including possible angle closure",
      "next": "RES_GLAUCOMA",
      "icon": "AlertOctagon"
    },
    {
      "label": "لا: فقدان الرؤية دون ألم عيني ملحوظ",
      "labelEn": "No: visual loss without significant eye pain",
      "subLabel": "",
      "subLabelEn": "",
      "next": "vl_painless_type",
      "icon": "Activity"
    }
  ]
},
  vl_painless_type: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "ما العرض الأبرز مع فقدان الرؤية المفاجئ غير المؤلم؟",
  "questionEn": "What best describes the acute painless visual symptoms?",
  "hint": "الأعراض ترشد إلى التشخيص التفريقي ولا تؤكد سبباً بعينه.",
  "hintEn": "Symptoms guide differential diagnosis but are not diagnostic.",
  "options": [
    {
      "label": "ستارة أو ظل، ومضات جديدة أو زيادة مفاجئة في العوائم",
      "labelEn": "Curtain/shadow, new flashes, or sudden increase in floaters",
      "subLabel": "اشتباه تمزق أو انفصال شبكية أو نزف زجاجي",
      "subLabelEn": "Possible retinal tear/detachment or vitreous hemorrhage",
      "next": "RES_RETINAL_DET",
      "icon": "CloudRain"
    },
    {
      "label": "فقدان مفاجئ واضح للرؤية في عين واحدة دون ألم، مع أو دون عودة الرؤية",
      "labelEn": "Sudden significant painless loss of vision in one eye, with or without recovery",
      "subLabel": "استبعاد نقص التروية الشبكية الحاد",
      "subLabelEn": "Exclude acute retinal ischemia",
      "next": "RES_OCULOMICS_ALERT",
      "icon": "AlertOctagon"
    },
    {
      "label": "فقدان رؤية آخر أو غير محدد، أو لا ينطبق أي وصف",
      "labelEn": "Other or unclear visual loss; none of the descriptions fit",
      "subLabel": "لا تفترض تشخيصاً من الخيارات المتاحة",
      "subLabelEn": "Do not force a diagnosis",
      "next": "RES_VL_UNDIFFERENTIATED",
      "icon": "Eye"
    }
  ]
},
  vl_gradual: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "هل تتحسن حدة البصر باستخدام الثقب الصغير (Pinhole)؟",
  "questionEn": "Does visual acuity improve with a pinhole?",
  "hint": "التحسن يرجّح مكوّناً انكسارياً ولا يستبعد أمراض العين؛ قيّم العلامات الأخرى.",
  "hintEn": "Improvement suggests a refractive component but does not exclude coexisting disease.",
  "options": [
    {
      "label": "نعم، تتحسن الرؤية دون علامات إنذار أخرى",
      "labelEn": "Yes, vision improves and no other warning features are identified",
      "subLabel": "",
      "subLabelEn": "",
      "next": "RES_REFRACTIVE",
      "icon": "Activity"
    },
    {
      "label": "لا، لا تتحسن أو الفحص غير متاح أو النتيجة غير واضحة",
      "labelEn": "No improvement, test unavailable, or result uncertain",
      "subLabel": "",
      "subLabelEn": "",
      "next": "vl_gradual_cause",
      "icon": "Activity"
    }
  ]
},
  vl_gradual_cause: {
  "pathTitle": "فرز فقدان الرؤية",
  "pathTitleEn": "Visual Loss Triage",
  "question": "ما الموجود السريري الأبرز في ضعف الرؤية التدريجي؟",
  "questionEn": "What is the most relevant finding in gradual visual loss?",
  "hint": "لا تكفي العلامات التالية وحدها لإثبات التشخيص؛ افحص قاع العين عند الإمكان.",
  "hintEn": "These findings alone do not establish a diagnosis; examine the fundus when feasible.",
  "options": [
    {
      "label": "عتامة عدسة مرجحة بفحص العين أو ضعف المنعكس الأحمر",
      "labelEn": "Suspected lens opacity or reduced red reflex on examination",
      "subLabel": "استبعاد أسباب أخرى لضعف المنعكس الأحمر أو ابيضاض الحدقة",
      "subLabelEn": "Exclude other causes of abnormal red reflex or leukocoria",
      "next": "RES_CATARACT",
      "icon": "CircleDot"
    },
    {
      "label": "سكري أو ارتفاع ضغط أو اشتباه اعتلال شبكي دون علامات إسعافية",
      "labelEn": "Diabetes, hypertension, or possible retinopathy without emergency features",
      "subLabel": "عوامل الخطورة لا تثبت وجود اعتلال شبكي",
      "subLabelEn": "Risk factors do not confirm retinopathy",
      "next": "RES_DR_SCREENING",
      "icon": "HeartPulse"
    },
    {
      "label": "لا توجد علامات مميزة أو يوجد شك في السبب",
      "labelEn": "No defining findings or the cause remains uncertain",
      "subLabel": "",
      "subLabelEn": "",
      "next": "RES_VL_UNDIFFERENTIATED",
      "icon": "Activity"
    }
  ]
},

  // ==================== PATH 2: RED EYE ====================
  red_eye: {
    id: 're_pain',
    pathTitle: 'عين حمراء',
    pathTitleEn: 'Red Eye & Inflammation',
    question: 'هل توجد مع احمرار العين أي علامات إنذار، مثل ألم شديد، أو انخفاض الرؤية، أو رهاب الضوء الشديد، أو عتامة القرنية، أو رؤية هالات مع صداع أو غثيان، أو استعمال العدسات اللاصقة مع ألم أو رهاب الضوء؟',
    questionEn: 'Does the red eye have any warning features, such as severe pain, reduced vision, marked photophobia, corneal opacity, halos with headache or nausea, or contact lens wear with pain or photophobia?',
    hint: 'الألم الحاد أو تأثر النظر يحوّل العين الحمراء من روتينية إلى طارئة فوراً',
    hintEn: 'Severe pain, ciliary flush, or reduced vision indicates a sight-threatening emergency',
    options: [
      {
        label: 'نعم، توجد علامة إنذار واحدة أو أكثر',
        labelEn: 'Yes, one or more warning features are present',
        subLabel: 'ألم عميق، تحسس شديد من الضوء (Photophobia)، عدم وضوح النظر',
        subLabelEn: 'Deep ache, severe photophobia, blurred vision (Corneal / Uveal emergency)',
        next: 'RES_GLAUCOMA',
        icon: 'AlertCircle'
      },
      {
        label: 'لا، لم تُكتشف أي من علامات الإنذار المذكورة بعد التقييم',
        labelEn: 'No warning features identified after screening',
        subLabel: 'لا يوجد ألم عميق، النظر طبيعي، مجرد حرقان أو إفرازات',
        subLabelEn: 'No deep pain, normal acuity, superficial irritation or discharge only',
        next: 're_discharge',
        icon: 'CheckCircle2'
      }
    ]
  },
  re_cornea_check: {
    pathTitle: 'عين حمراء مؤلمة',
    pathTitleEn: 'Painful Red Eye',
    question: 'عند فحص القرنية بضوء كشاف مائل، هل توجد بقعة بيضاء أو عتامة على القرنية؟',
    questionEn: 'Upon penlight examination, is there a white spot or infiltrate on the cornea?',
    hint: 'التمييز الحاسم بين قرحة القرنية الجرثومية والتهاب القزحية الحاد',
    hintEn: 'Crucial distinction between microbial corneal ulcer and acute anterior uveitis',
    options: [
      {
        label: 'نعم، توجد بقعة بيضاء/عتامة أو قرحة مرئية على سطح القرنية',
        labelEn: 'Yes, focal white infiltrate, opacity, or epithelial defect on cornea',
        subLabel: 'اشتباه قرحة قرنية بكتيرية أو فطرية (Corneal Ulcer / Infiltrate)',
        subLabelEn: 'Suspected microbial corneal ulcer (Steroids strictly forbidden!)',
        next: 'RES_CORNEAL_ULCER',
        icon: 'ShieldAlert'
      },
      {
        label: 'لا، القرنية شفافة ولامعة لكن الحدقة ضيقة والألم يزيد بشدة مع الضوء',
        labelEn: 'No, clear cornea but constricted pupil with marked photophobia',
        subLabel: 'احتقان حول القرنية (Ciliary flush) مع رهاب الضوء الشديد',
        subLabelEn: 'Ciliary flush around limbus and intense consensual photophobia (Uveitis)',
        next: 'RES_UVEITIS',
        icon: 'Sun'
      }
    ]
  },
  re_discharge: {
    pathTitle: 'إفرازات واحمرار سطحي',
    pathTitleEn: 'Superficial Redness & Discharge',
    question: 'ما هي طبيعة الإفرازات والأعراض المصاحبة لاحمرار العين؟',
    questionEn: 'What is the characteristic discharge and associated conjunctival symptoms?',
    hint: 'تحديد نوع الالتهاب لوصف العلاج الميداني المناسب وتجنب الإفراط بالمضادات',
    hintEn: 'Identify infectious vs allergic vs dry eye etiology for appropriate field management',
    options: [
      {
        label: 'إفرازات صديدية سميكة (صفراء/خضراء) تلتصق بها الجفون صباحاً',
        labelEn: 'Thick purulent / mucopurulent yellow-green discharge with morning matted lids',
        subLabel: 'غزارة المفرزات وصعوبة فتح العين عند الاستيقاظ (Bacterial Conjunctivitis)',
        subLabelEn: 'Copious crusting, eyelids glued shut upon waking',
        next: 'RES_BACTERIAL_CONJ',
        icon: 'Droplets'
      },
      {
        label: 'إفرازات مائية/مخاطية خفيفة مع حكة شديدة أو جفاف شديد/تراخوما',
        labelEn: 'Watery/stringy discharge with prominent itching, grit, or dryness/trachoma',
        subLabel: 'احمرار ثنائي الجانب، فرك العين، قشور جفون أو بيئة رملية جافة',
        subLabelEn: 'Bilateral itching, allergic shiners, gritty foreign sensation, or arid climate',
        next: 'RES_ALLERGY_DRY',
        icon: 'Sparkles'
      }
    ]
  },

  // ==================== PATH 3: TRAUMA ====================
  trauma: {
    id: 'tr_type',
    pathTitle: 'إصابات وطوارئ العين المباشرة',
    pathTitleEn: 'Ocular Trauma & Direct Emergencies',
    question: 'ما هو نوع وتاريخ الإصابة المباشرة التي تعرضت لها العين؟',
    questionEn: 'What is the mechanism and nature of the direct ocular injury?',
    hint: 'في الحروق الكيميائية: ابدأ الغسيل فوراً قبل أي فحص أو كتابة تقرير!',
    hintEn: 'For chemical burns: Start immediate copious irrigation before any exam or paperwork!',
    options: [
      {
        label: 'تعرض لمادة كيميائية / قلويات / أحماض / أسمنت / منظفات منزلية',
        labelEn: 'Chemical exposure (Alkali, Acid, Cement, Lime, Detergents)',
        subLabel: 'طوارئ قصوى: تتطلب الغسيل الفوري بالماء الجاري لمدة 20 دقيقة قبل أي شيء!',
        subLabelEn: 'Ultra Emergency: Immediate continuous irrigation for 20 minutes!',
        next: 'RES_CHEMICAL_BURN',
        icon: 'Flame'
      },
      {
        label: 'ضربة بآلة حادة / شظية / نافذة / تشوه بؤبؤ العين (Open Globe)',
        labelEn: 'Penetrating injury / Sharp trauma / High velocity projectile (Open Globe)',
        subLabel: 'اشتباه تمزق مقلة العين، نزف الحجرة الأمامية، أو جرح نافذ',
        subLabelEn: 'Suspected globe rupture, teardrop pupil, prolapsed tissue (Rigid shield protocol)',
        next: 'RES_RUPTURED_GLOBE',
        icon: 'ShieldX'
      },
      {
        label: 'دخول جسم غريب سطحي (شظية حدادة / نشارة خشب / غبار رملي)',
        labelEn: 'Superficial foreign body (metal shaving, wood splinter, sand/grit)',
        subLabel: 'شعور المريض بوجود حبة رمل مع دماع واحمرار سطحي دون ثقب',
        subLabelEn: 'Gritty foreign sensation, tearing, superficial location without perforation',
        next: 'RES_FOREIGN_BODY',
        icon: 'Target'
      }
    ]
  },

  // ==================== PATH 4: OCULOMICS & SYSTEMIC HEALTH SCREENING ====================
  oculomics: {
    id: 'oculomics',
    pathTitle: 'بوابة الـ Oculomics والمسح الشامل',
    pathTitleEn: 'Oculomics & Systemic Health Screening',
    question: 'ما هو المحور السريري الرئيسي المراد مسحه عبر قاع العين وفحص الشبكية؟',
    questionEn: 'What is the primary clinical domain to screen via fundus/retinal examination?',
    hint: 'شبكية العين نافذة حية مباشرة وغير جراحية لرؤية الأوعية الدموية الدقيقة والعصب القحفي الثاني مباشرة',
    hintEn: 'The retina provides a direct, non-invasive window into microvascular and central nervous system health.',
    options: [
      {
        label: 'مسح اعتلال الشبكية والكلى السكري (Diabetic & Renal Risk)',
        labelEn: 'Diabetic Retinopathy & Renal Risk Screening',
        subLabel: 'تقييم أمهات الدم الدقيقة، النزوف النقطية، النضبات، والتنبؤ باعتلال الكلية السكري',
        subLabelEn: 'Microaneurysms, dot hemorrhages, hard exudates, predictive marker for diabetic nephropathy',
        next: 'oculomics_diabetic_check',
        icon: 'Droplets'
      },
      {
        label: 'مسح القلب والسكتات الدماغية (Cardiovascular & Stroke Risk)',
        labelEn: 'Cardiovascular & Stroke Risk Assessment',
        subLabel: 'تضيق الشرايين، علامة Gunn للتقاطع الوعائي، اللمعان النحاسي، لويحات Hollenhorst والتصلب العصيدي',
        subLabelEn: 'Arteriolar narrowing, AV nicking, copper wiring, cholesterol emboli & atherosclerosis',
        next: 'oculomics_cardio_check',
        icon: 'HeartPulse'
      },
      {
        label: 'مسح ضغط الدماغ والعصب البصري (Neuro & Optic Disc)',
        labelEn: 'Optic Nerve & Intracranial Pressure Screening',
        subLabel: 'وذمة حليمة العصب البصري (Papilledema)، شحوب القرص، واشتباه ارتفاع ضغط الدماغ أو التصلب اللويحي',
        subLabelEn: 'Optic disc swelling (Papilledema), disc pallor, intracranial pressure & demyelinating disease',
        next: 'oculomics_neuro_check',
        icon: 'ScanEye'
      }
    ]
  },

  oculomics_diabetic_check: {
    pathTitle: 'مسح اعتلال الشبكية والكلى السكري',
    pathTitleEn: 'Diabetic & Renal Microvascular Screening',
    question: 'ما هي الموجودات الدقيقة المرصودة في فحص قاع العين لمريض السكري؟',
    questionEn: 'What specific retinal microvascular findings are observed in the diabetic patient?',
    hint: 'وجود أمهات دم أو نضحات صفراء يرتبط باحتمال >80% لوجود زلال دقيق بالبول واعتلال كبيبات الكلى (Diabetic Nephropathy)',
    hintEn: 'Retinal microaneurysms & exudates strongly correlate with microalbuminuria & diabetic nephropathy progression.',
    options: [
      {
        label: 'أوعية دموية جديدة غير طبيعية (NVD/NVE) أو نضحات صفراء في مركز البصر (DME) أو نزف زجاجي',
        labelEn: 'Neovascularization (NVD/NVE), macular hard exudates (DME), or vitreous hemorrhage',
        subLabel: 'مرحلة متقدمة عالية الخطورة تهدد البصر وتدل على اعتلال وعائي كلوي وجهازي متقدم',
        subLabelEn: 'High-risk proliferative stage / macular edema indicating advanced microvascular renal strain',
        next: 'RES_OCULOMICS_DIABETIC_RENAL_SEVERE',
        icon: 'AlertTriangle'
      },
      {
        label: 'بضع أمهات دم دقيقة (Microaneurysms) مع نزوف نقطية قليلة وبصر محافظ عليه',
        labelEn: 'Few microaneurysms, dot hemorrhages, preserved visual acuity (Early NPDR)',
        subLabel: 'مرحلة اعتلال غير تكاثري مبكر — إنذار أولي للبدء بضبط السكر والوظائف الكلوية',
        subLabelEn: 'Early non-proliferative stage — critical window for preventive metabolic & renal intervention',
        next: 'RES_OCULOMICS_DIABETIC_RENAL_EARLY',
        icon: 'Activity'
      },
      {
        label: 'قاع العين سليم تماماً بدون أمهات دم أو نزوف أو نضحات دهنية',
        labelEn: 'Normal fundus — zero microaneurysms, hemorrhages, or exudates',
        subLabel: 'مؤشرات الأوعية الدقيقة ممتازة — استمرار المتابعة الدورية السنوية',
        subLabelEn: 'Intact microvasculature — continue standard annual preventive screening',
        next: 'RES_OCULOMICS_NORMAL',
        icon: 'CheckCircle2'
      }
    ]
  },

  oculomics_cardio_check: {
    pathTitle: 'مسح القلب والسكتات الدماغية',
    pathTitleEn: 'Cardiovascular & Stroke Oculomics Risk',
    question: 'ما هي علامات التصلب والاعتلال الوعائي المرصودة في شرايين وأوردة الشبكية؟',
    questionEn: 'What vascular hypertensive or atherosclerotic signs are visible on retinal vessels?',
    hint: 'تضيق الشرايين والتقاطعات الوعائية ولويحات الكوليسترول تعد مؤشراً مستقلاً لأمراض الشرايين التاجية والسكتة الدماغية',
    hintEn: 'Retinal arteriolar narrowing, AV nicking, and Hollenhorst plaques are independent predictors of stroke and CAD.',
    options: [
      {
        label: 'لويحة كولسترول صفراء لامعة (Hollenhorst plaque) أو تضيق شديد مع تقاطع شرياني وريدي غائر (Gunn sign) أو نزف لهبي',
        labelEn: 'Glistening yellow Hollenhorst plaque, severe AV nicking (Gunn sign), or flame hemorrhages',
        subLabel: 'إنذار وعائي حرج: خطورة مرتفعة جداً لسكتة دماغية (TIA/Stroke) أو صمة قلبية وشيكة',
        subLabelEn: 'Critical vascular warning: high imminent risk of ischemic stroke, TIA, or carotid embolization',
        next: 'RES_OCULOMICS_CARDIO_STROKE_HIGH',
        icon: 'AlertOctagon'
      },
      {
        label: 'انعكاس نحاسي للشرايين (Copper wiring) مع تضيق معمّم خفيف بالقطر الشرياني دون نزوف',
        labelEn: 'Copper wiring reflex with mild generalized arteriolar narrowing (Grade I-II Hypertensive)',
        subLabel: 'مؤشر على تصلب الشرايين واعتلال ضغط الدم المزمن بحاجة لضبط قلبي ودوائي',
        subLabelEn: 'Evidence of systemic arterial stiffness & chronic hypertension requiring medical optimization',
        next: 'RES_OCULOMICS_CARDIO_MODERATE',
        icon: 'Activity'
      },
      {
        label: 'أوعية دموية مرنة وبنسبة شريانية/وريدية طبيعية (A:V ratio = 2:3) دون تضيق أو تصلب',
        labelEn: 'Normal arteriolar-to-venular ratio (A:V = 2:3) with smooth calibre and no nicking',
        subLabel: 'سلامة الأوعية الدقيقة ومخاطر وعائية قلبية منخفضة',
        subLabelEn: 'Healthy retinal vascular tree and low baseline cardiovascular risk profile',
        next: 'RES_OCULOMICS_NORMAL',
        icon: 'CheckCircle2'
      }
    ]
  },

  oculomics_neuro_check: {
    pathTitle: 'مسح ضغط الدماغ والعصب البصري',
    pathTitleEn: 'Neuro-Ophthalmic & Intracranial Pressure Screening',
    question: 'ما هي حالة قرص العصب البصري (Optic Disc) وحدوده ونبضان الأوردة التلقائي؟',
    questionEn: 'What is the status of the optic nerve head margins, cup, and spontaneous venous pulsations?',
    hint: 'عدم وضوح حواف القرص العيني ثنائياً مع غياب النبض الوريدي علامة طارئة لارتفاع ضغط السائل الدماغي الشوكي',
    hintEn: 'Bilateral optic disc margin blurring and absent venous pulsations indicate dangerously elevated intracranial pressure.',
    options: [
      {
        label: 'انتفاخ وتورم حواف القرص البصري في العينين (Papilledema) مع غياب النبض الوريدي وصداع صباحي',
        labelEn: 'Bilateral optic disc swelling (Papilledema) with absent venous pulsations and morning headache',
        subLabel: 'طوارئ عصبية قصوى: اشتباه ورم دماغي، ارتفاع ضغط الدماغ، أو خثار وريدي بالدماغ',
        subLabelEn: 'Urgent neurological red flag: suspected space-occupying lesion, IIH, or venous sinus thrombosis',
        next: 'RES_OCULOMICS_NEURO_ICP',
        icon: 'AlertOctagon'
      },
      {
        label: 'شحوب قطاعي/كلي في القرص البصري (Optic Pallor) أو تقعر غير متناظر (C/D ratio > 0.6) مع عتمة بمجال الرؤية',
        labelEn: 'Sectoral or total optic disc pallor, or asymmetric cupping (C/D > 0.6) with visual field defect',
        subLabel: 'اشتباه اعتلال العصب البصري، التهاب مزيل للميالين (MS)، أو زرق متقدم',
        subLabelEn: 'Suspected optic neuropathy, demyelinating optic neuritis (MS), or compressive lesion',
        next: 'RES_OCULOMICS_NEURO_ATROPHY',
        icon: 'ShieldAlert'
      },
      {
        label: 'قرص وردي بحواف حادة واضحة، تقعر فسيولوجي طبيعي (C/D < 0.3)، ونبضان وريدي تلقائي واضح',
        labelEn: 'Pink crisp optic disc, physiologic cup (< 0.3), and visible spontaneous venous pulsations',
        subLabel: 'العصب البصري وضغط السائل الدماغي ضمن النطاق السليم تماماً',
        subLabelEn: 'Normal optic disc margins & healthy intracranial pressure profile',
        next: 'RES_OCULOMICS_NORMAL',
        icon: 'CheckCircle2'
      }
    ]
  }
};

export const resultsDatabase: Record<string, TriageResult> = {

  RES_GLAUCOMA: {
  "id": "RES_GLAUCOMA",
  "type": "CRITICAL",
  "title": "علامات إنذار عينية — اشتباه بحالة طارئة مهددة للبصر",
  "titleEn": "Ocular Warning Signs — Suspected Sight-Threatening Emergency",
  "englishTitle": "Ocular Warning Signs — Suspected Sight-Threatening Emergency",
  "badgeText": "طوارئ فورية 🔴",
  "badgeTextEn": "Immediate Emergency 🔴",
  "summary": "وجود ألم شديد أو نقص في الرؤية أو رهاب ضوء واضح أو عتامة قرنية أو هالات مصحوبة بصداع أو غثيان، أو أعراض مقلقة لدى مستخدمي العدسات اللاصقة، قد يشير إلى حالة عينية مهددة للبصر، مثل التهاب القرنية أو انغلاق الزاوية الحاد أو التهاب داخل العين. لا يمكن تحديد التشخيص من الأعراض وحدها، وتلزم إحالة طارئة لتقييم طبيب العيون.",
  "summaryEn": "Severe eye pain, reduced vision, marked photophobia, corneal opacity, halos with headache or nausea, or concerning symptoms in contact lens wearers may indicate a sight-threatening ocular emergency, including keratitis, acute angle closure, or intraocular inflammation. Symptoms alone cannot establish the diagnosis; immediate emergency ophthalmology assessment is required.",
  "redFlags": [
    "ألم شديد مع نقص الرؤية",
    "احمرار شديد أو عتامة قرنية أو هالات مع غثيان",
    "رهاب ضوء شديد أو تدهور سريع"
  ],
  "redFlagsEn": [
    "Severe pain with reduced vision",
    "Marked redness, corneal haze, or halos with nausea",
    "Severe photophobia or rapid deterioration"
  ],
  "contraindications": [
    "لا تضغط على المقلة ولا تستخدم الجس الرقمي لتشخيص ارتفاع الضغط.",
    "لا تعط قطرات موسعة للحدقة أو أدوية ضغط العين تلقائياً دون تقييم سريري."
  ],
  "contraindicationsEn": [
    "Do not press or digitally palpate the globe to diagnose elevated IOP.",
    "Do not automatically administer dilating drops or IOP-lowering medications without clinical assessment."
  ],
  "steps": [
    "إحالة فورية إلى طوارئ العيون؛ لا تؤخر النقل لاستكمال فحوص غير متاحة.",
    "قياس حدة البصر والحدقة وضغط العين إذا كان ذلك آمناً ومتاحاً، مع استبعاد الإصابة النافذة قبل قياس الضغط.",
    "يقرر طبيب العيون خفض ضغط العين والعلاج النوعي وفق التشخيص وموانع الأدوية."
  ],
  "stepsEn": [
    "Immediate emergency ophthalmology referral; do not delay transfer for unavailable tests.",
    "Document visual acuity and pupil findings; measure IOP only when safe and available, after excluding possible open-globe injury.",
    "IOP-lowering therapy and definitive treatment require clinician assessment of diagnosis and contraindications."
  ],
  "referralTime": "فوراً",
  "referralTimeEn": "Immediately",
  "referralDestination": "طوارئ العيون",
  "referralDestinationEn": "Emergency Ophthalmology",
  "icon": "AlertOctagon"
},

  RES_RETINAL_DET: {
  "id": "RES_RETINAL_DET",
  "type": "URGENT",
  "title": "اشتباه تمزق أو انفصال شبكية",
  "titleEn": "Possible Retinal Tear or Detachment",
  "englishTitle": "Possible Retinal Tear or Detachment",
  "badgeText": "تقييم عاجل 🟠",
  "badgeTextEn": "Urgent Assessment 🟠",
  "summary": "ظهور ستارة أو ظل أو ومضات أو عوائم جديدة قد يشير إلى تمزق أو انفصال شبكي أو نزف زجاجي؛ يلزم فحص شبكية موسع لتحديد السبب.",
  "summaryEn": "New curtain, shadow, flashes, or floaters may indicate a retinal tear, detachment, or vitreous hemorrhage; a dilated retinal examination is needed.",
  "redFlags": [
    "ستارة أو عيب مجال بصري جديد",
    "ومضات مع عوائم جديدة كثيرة",
    "انخفاض حدة الرؤية المركزية"
  ],
  "redFlagsEn": [
    "New curtain or field defect",
    "New flashes with numerous floaters",
    "Loss of central visual acuity"
  ],
  "contraindications": [
    "لا تؤخر التقييم بانتظار ظهور ستارة كاملة."
  ],
  "contraindicationsEn": [
    "Do not delay assessment while waiting for a complete curtain."
  ],
  "steps": [
    "قياس وتوثيق حدة البصر في كل عين إن أمكن.",
    "ترتيب فحص شبكية موسع عاجل في اليوم نفسه لدى اختصاصي عيون؛ الاشتباه بانفصال يهدد اللطخة يستدعي تقييماً فورياً.",
    "يحدد اختصاصي الشبكية الحاجة للتصوير أو الليزر أو الجراحة وتوقيتها."
  ],
  "stepsEn": [
    "Document visual acuity in each eye if feasible.",
    "Arrange same-day dilated retinal examination; suspected macula-threatening detachment requires immediate specialist assessment.",
    "Retina specialist determines need and timing of imaging, laser, or surgery."
  ],
  "referralTime": "اليوم نفسه؛ فوراً عند الاشتباه بانفصال مهدد للرؤية المركزية",
  "referralTimeEn": "Same day; immediately for suspected macula-threatening detachment",
  "referralDestination": "اختصاصي عيون / وحدة الشبكية",
  "referralDestinationEn": "Ophthalmology / Retina Service",
  "icon": "CloudRain"
},

  RES_OCULOMICS_ALERT: {
  "id": "RES_OCULOMICS_ALERT",
  "type": "CRITICAL",
  "title": "اشتباه نقص تروية شبكية حاد أو عابر",
  "titleEn": "Possible Acute or Transient Retinal Ischemia",
  "englishTitle": "Possible Acute or Transient Retinal Ischemia",
  "badgeText": "طوارئ فورية 🔴",
  "badgeTextEn": "Immediate Emergency 🔴",
  "summary": "فقدان الرؤية الأحادي المفاجئ غير المؤلم، حتى لو زال، قد يمثل انسداد شريان شبكي أو نقص تروية عابراً؛ يلزم تقييم إسعافي وفق مسار السكتة الدماغية. لا يمكن تأكيد CRAO أو CRVO بالأعراض وحدها.",
  "summaryEn": "Sudden painless monocular visual loss, even if transient, may represent retinal arterial occlusion or transient ischemia and requires emergency stroke-pathway assessment. Symptoms alone cannot diagnose CRAO or CRVO.",
  "redFlags": [
    "فقدان مفاجئ للرؤية في عين واحدة",
    "نوبة عابرة من فقدان الرؤية",
    "أعراض عصبية مرافقة أو حديثة"
  ],
  "redFlagsEn": [
    "Sudden monocular vision loss",
    "Transient monocular blackout",
    "Concurrent or recent neurologic symptoms"
  ],
  "contraindications": [
    "لا تؤخر الإحالة بتدليك العين أو إجراءات غير مثبتة.",
    "لا تعتبر انسداد الوريد الشبكي (CRVO) مساوياً لانسداد الشريان الشبكي (CRAO) في مسار السكتة."
  ],
  "contraindicationsEn": [
    "Do not delay referral for ocular massage or unproven maneuvers.",
    "Do not equate CRVO with CRAO for stroke-pathway decisions."
  ],
  "steps": [
    "إحالة فورية إلى طوارئ مستشفى لديه مسار تقييم السكتة الدماغية، مع تقييم عيني متزامن عند الإمكان.",
    "سجّل وقت آخر رؤية طبيعية والأعراض العصبية والعلامات الحيوية دون تأخير النقل.",
    "يقرر الفريق المختص الفحوص الوعائية والقلبية والعلاج وفق التشخيص؛ لا تبدأ تدليك العين أو الأسبرين تلقائياً."
  ],
  "stepsEn": [
    "Immediate emergency referral to a stroke-capable service with parallel ophthalmic evaluation when available.",
    "Record last-known-well time, neurologic symptoms, and vital signs without delaying transfer.",
    "Specialists determine vascular/cardiac investigations and treatment; do not routinely perform ocular massage or start aspirin."
  ],
  "referralTime": "فوراً حتى لو عادت الرؤية",
  "referralTimeEn": "Immediately, even if vision has recovered",
  "referralDestination": "طوارئ السكتة الدماغية مع تقييم عيون",
  "referralDestinationEn": "Stroke-Capable Emergency Department and Ophthalmology",
  "icon": "Activity"
},

  RES_REFRACTIVE: {
  "id": "RES_REFRACTIVE",
  "type": "ROUTINE",
  "title": "اشتباه مكوّن انكساري لضعف الرؤية",
  "titleEn": "Possible Refractive Component",
  "englishTitle": "Possible Refractive Component",
  "badgeText": "متابعة روتينية 🟢",
  "badgeTextEn": "Routine Assessment 🟢",
  "summary": "تحسن حدة البصر بالثقب الصغير يرجح وجود خطأ انكساري لكنه لا يثبت سلامة القرنية أو العدسة أو الشبكية أو العصب البصري.",
  "summaryEn": "Pinhole improvement suggests a refractive component but does not establish that the cornea, lens, retina, or optic nerve is healthy.",
  "redFlags": [],
  "redFlagsEn": [],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "وثّق حدة البصر قبل الثقب وبعده في كل عين.",
    "رتّب فحص انكسار وفحصاً عينياً مناسباً، خاصة إذا استمر ضعف الرؤية أو ظهرت أعراض أخرى.",
    "إذا حدث فقدان مفاجئ أو ألم أو علامات إنذار، أعد تصنيف الحالة إلى مسار عاجل."
  ],
  "stepsEn": [
    "Record monocular acuity before and after pinhole.",
    "Arrange refraction and an appropriate eye examination, particularly for persistent symptoms.",
    "Re-triage urgently if acute loss, pain, or warning features develop."
  ],
  "referralTime": "روتيني عند غياب علامات الإنذار",
  "referralTimeEn": "Routine if no warning features",
  "referralDestination": "عيادة البصريات / العيون",
  "referralDestinationEn": "Optometry / Eye Clinic",
  "icon": "Glasses"
},

  RES_CATARACT: {
  "id": "RES_CATARACT",
  "type": "FIELD",
  "title": "اشتباه عتامة عدسة أو خلل في المنعكس الأحمر",
  "titleEn": "Possible Cataract or Abnormal Red Reflex",
  "englishTitle": "Possible Cataract or Abnormal Red Reflex",
  "badgeText": "متابعة بحسب الحالة 🟡",
  "badgeTextEn": "Risk-Based Follow-Up 🟡",
  "summary": "عتامة العدسة سبب محتمل لضعف الرؤية التدريجي، لكن ابيضاض الحدقة أو ضعف المنعكس الأحمر لهما أسباب أخرى ويستلزمان فحصاً عينياً لتأكيد السبب.",
  "summaryEn": "Lens opacity may cause gradual visual loss, but leukocoria or an abnormal red reflex has other causes and requires an eye examination for confirmation.",
  "redFlags": [
    "ابيضاض حدقة لدى طفل أو تغير جديد غير مفسر",
    "ألم أو احمرار أو تدهور سريع",
    "ضعف رؤية غير متناسب مع العتامة"
  ],
  "redFlagsEn": [
    "Leukocoria in a child or new unexplained pupil whitening",
    "Pain, redness, or rapid deterioration",
    "Vision loss disproportionate to apparent opacity"
  ],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "رتّب فحص عيون لتأكيد وجود الساد واستبعاد الأسباب الأخرى.",
    "أي ابيضاض حدقة لدى طفل يستدعي إحالة عاجلة جداً، ولا يوضع على قائمة جراحة الساد الروتينية.",
    "ناقش جراحة الساد فقط بعد تقييم أثره على الوظيفة البصرية وبقية أمراض العين."
  ],
  "stepsEn": [
    "Arrange ophthalmic examination to confirm cataract and exclude other causes.",
    "Childhood leukocoria requires urgent specialist referral, not routine cataract scheduling.",
    "Consider cataract surgery only after evaluating visual impact and coexisting eye disease."
  ],
  "referralTime": "حسب العمر والأعراض؛ ابيضاض الحدقة لدى طفل عاجل",
  "referralTimeEn": "Risk-based; childhood leukocoria is urgent",
  "referralDestination": "عيادة العيون / اختصاصي عيون أطفال عند اللزوم",
  "referralDestinationEn": "Ophthalmology / Pediatric Ophthalmology when indicated",
  "icon": "CircleDot"
},

  RES_DR_SCREENING: {
  "id": "RES_DR_SCREENING",
  "type": "FIELD",
  "title": "فحص شبكية لمريض لديه عوامل خطورة",
  "titleEn": "Retinal Assessment in Diabetes or Hypertension",
  "englishTitle": "Retinal Assessment in Diabetes or Hypertension",
  "badgeText": "متابعة بحسب الحالة 🟡",
  "badgeTextEn": "Risk-Based Follow-Up 🟡",
  "summary": "وجود السكري أو ارتفاع الضغط يزيد احتمال اعتلال الشبكية لكنه لا يثبت الإصابة. يلزم فحص قاع عين مناسب وتحديد الاستعجال حسب الأعراض والموجودات.",
  "summaryEn": "Diabetes or hypertension increases retinopathy risk but does not confirm retinal disease. Fundus assessment and urgency depend on symptoms and findings.",
  "redFlags": [
    "هبوط رؤية جديد أو سريع",
    "عوائم كثيفة مفاجئة أو اشتباه نزف زجاجي",
    "علامات اعتلال ضغط شديد مع أعراض جهازية"
  ],
  "redFlagsEn": [
    "New or rapidly worsening vision loss",
    "Sudden dense floaters or suspected vitreous hemorrhage",
    "Severe hypertensive retinal signs with systemic symptoms"
  ],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "وثّق حدة البصر وضغط الدم وتاريخ السكري والأدوية.",
    "رتّب فحص قاع العين أو تصويراً شبكياً قابلاً للتقييم؛ OCT عند الاشتباه بوذمة بقعية بحسب المختص.",
    "وجّه المريض إلى ضبط عوامل الخطورة مع الطبيب المعالج بأهداف علاجية فردية؛ سرّع الإحالة عند ظهور علامات إنذار."
  ],
  "stepsEn": [
    "Document visual acuity, blood pressure, diabetes history, and medications.",
    "Arrange gradable retinal examination/imaging; OCT for suspected macular edema when indicated.",
    "Coordinate individualized risk-factor management; expedite referral for warning features."
  ],
  "referralTime": "بحسب الأعراض والموجودات؛ عاجل عند علامات الإنذار",
  "referralTimeEn": "Based on symptoms and findings; urgent for warning features",
  "referralDestination": "عيادة العيون مع الرعاية الباطنية المناسبة",
  "referralDestinationEn": "Eye Clinic and Relevant Medical Care",
  "icon": "HeartPulse"
},


  RES_VL_NEURO_EMERGENCY: {
  "id": "RES_VL_NEURO_EMERGENCY",
  "type": "CRITICAL",
  "title": "فقدان رؤية مع علامات عصبية إسعافية",
  "titleEn": "Visual Loss with Neurologic Emergency Features",
  "englishTitle": "Visual Loss with Neurologic Emergency Features",
  "badgeText": "طوارئ فورية 🔴",
  "badgeTextEn": "Immediate Emergency 🔴",
  "summary": "فقدان الرؤية مع عجز عصبي مفاجئ أو فقدان مجال بصري جديد قد يشير إلى سكتة دماغية أو حالة عصبية إسعافية حتى إن زالت الأعراض.",
  "summaryEn": "Visual loss with sudden neurologic deficits or new visual-field loss may indicate stroke or another neurologic emergency, even when symptoms resolve.",
  "redFlags": [
    "ضعف أو خدر أحادي الجانب",
    "اضطراب الكلام أو الوجه",
    "فقدان مجال بصري أو ازدواج مفاجئ مع أعراض عصبية"
  ],
  "redFlagsEn": [
    "Unilateral weakness or numbness",
    "Speech or facial changes",
    "Acute visual-field loss or diplopia with neurologic symptoms"
  ],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "فعّل الإسعاف أو الإحالة الفورية لمسار السكتة الدماغية.",
    "سجّل وقت آخر حالة طبيعية ولا تؤخر النقل لاستكمال فحص عيني.",
    "تحديد التصوير والعلاج من اختصاص فريق الطوارئ والسكتة."
  ],
  "stepsEn": [
    "Activate emergency stroke referral.",
    "Record last-known-well time and do not delay transport for an eye examination.",
    "Emergency/stroke team determines imaging and treatment."
  ],
  "referralTime": "فوراً",
  "referralTimeEn": "Immediately",
  "referralDestination": "طوارئ السكتة الدماغية",
  "referralDestinationEn": "Stroke-Capable Emergency Department",
  "icon": "AlertOctagon"
},

  RES_VL_GCA: {
  "id": "RES_VL_GCA",
  "type": "CRITICAL",
  "title": "اشتباه التهاب الشريان ذي الخلايا العملاقة",
  "titleEn": "Possible Giant Cell Arteritis with Visual Symptoms",
  "englishTitle": "Possible Giant Cell Arteritis with Visual Symptoms",
  "badgeText": "طوارئ فورية 🔴",
  "badgeTextEn": "Immediate Emergency 🔴",
  "summary": "في عمر 50 سنة أو أكثر، فقدان رؤية جديد مع صداع جديد أو عرج الفك أو ألم فروة الرأس قد يشير إلى التهاب الشريان ذي الخلايا العملاقة، وهو خطر على رؤية العين الأخرى.",
  "summaryEn": "In adults aged 50 or older, new visual symptoms with headache, jaw claudication, or scalp tenderness may indicate giant cell arteritis and threaten the fellow eye.",
  "redFlags": [
    "فقدان رؤية جديد مع ألم الفك عند المضغ",
    "صداع جديد أو ألم فروة الرأس",
    "أعراض عامة مثل حمى أو ألم كتفين"
  ],
  "redFlagsEn": [
    "New visual loss with jaw claudication",
    "New headache or scalp tenderness",
    "Systemic symptoms such as fever or shoulder pain"
  ],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "إحالة إسعافية فورية؛ لا تنتظر نتائج الفحوص لتبدأ التقييم والعلاج لدى الطبيب المختص.",
    "يقرر الطبيب بدء الستيرويدات الجهازية فور الاشتباه المرتفع، مع تقييم موانع الاستعمال وترتيب الفحوص التأكيدية."
  ],
  "stepsEn": [
    "Immediate emergency referral; do not wait for confirmatory testing before specialist-directed management.",
    "Clinician determines prompt systemic glucocorticoid treatment when suspicion is high, alongside appropriate investigations."
  ],
  "referralTime": "فوراً",
  "referralTimeEn": "Immediately",
  "referralDestination": "طوارئ العيون / الباطنة أو الروماتيزم",
  "referralDestinationEn": "Emergency Ophthalmology / Medicine or Rheumatology",
  "icon": "AlertOctagon"
},

  RES_VL_UNDIFFERENTIATED: {
  "id": "RES_VL_UNDIFFERENTIATED",
  "type": "URGENT",
  "title": "فقدان رؤية غير مفسر يحتاج تقييماً",
  "titleEn": "Unexplained Visual Loss Requiring Assessment",
  "englishTitle": "Unexplained Visual Loss Requiring Assessment",
  "badgeText": "تقييم عاجل 🟠",
  "badgeTextEn": "Urgent Assessment 🟠",
  "summary": "لا تكفي الخيارات الحالية لتحديد سبب فقدان الرؤية. لا يُفترض أن الحالة روتينية لمجرد عدم مطابقة الأعراض للأنماط الشائعة.",
  "summaryEn": "Available findings do not identify the cause of visual loss; a nonmatching presentation should not be presumed routine.",
  "redFlags": [
    "تدهور خلال أيام",
    "تغير مفاجئ أو أحادي الجانب",
    "ألم أو أعراض عصبية أو علامات غير معتادة"
  ],
  "redFlagsEn": [
    "Deterioration over days",
    "Sudden or unilateral change",
    "Pain, neurologic symptoms, or atypical findings"
  ],
  "contraindications": [],
  "contraindicationsEn": [],
  "steps": [
    "وثّق حدة البصر في كل عين والحدقات ووقت بدء الأعراض إن أمكن.",
    "رتّب تقييماً عينياً عاجلاً؛ أحِل فوراً للطوارئ عند فقدان مفاجئ أو علامات عصبية أو ألم شديد.",
    "لا تبدأ علاجاً نوعياً دون تشخيص سريري."
  ],
  "stepsEn": [
    "Document acuity in each eye, pupil findings, and onset when feasible.",
    "Arrange prompt ophthalmic evaluation; emergency referral for sudden loss, neurologic signs, or severe pain.",
    "Avoid diagnosis-specific treatment without clinical assessment."
  ],
  "referralTime": "عاجل؛ فوراً عند العلامات الإسعافية",
  "referralTimeEn": "Urgent; immediately if emergency features are present",
  "referralDestination": "عيادة العيون العاجلة / الطوارئ",
  "referralDestinationEn": "Urgent Ophthalmology / Emergency Department",
  "icon": "Eye"
},

  RES_CORNEAL_ULCER: {
    id: 'RES_CORNEAL_ULCER',
    type: 'URGENT',
    title: 'قرحة القرنية الجرثومية الحادة',
    titleEn: 'Acute Microbial Corneal Ulcer / Keratitis',
    englishTitle: 'Microbial Corneal Ulcer / Keratitis',
    badgeText: 'طوارئ قرنية قصوى 🔴',
    badgeTextEn: 'Corneal Emergency 🔴',
    summary: 'إنتان ميكروبي مدمر لسدى القرنية قد يؤدي إلى انثقاب القرنية والعمى أو استئصال العين إذا لم يعالج فوراً بمضادات حيوية مكثفة.',
    summaryEn: 'Destructive corneal stromal infection that can rapidly cause corneal perforation and permanent blindness if not aggressively treated with intensive topical antibiotics.',
    redFlags: [
      'بقعة بيضاء أو ارتشاح معتم على القرنية (White corneal infiltrate)',
      'مستوى صديدي في الحجرة الأمامية (Hypopyon)',
      'تاريخ ارتداء عدسات لاصقة أو إصابة بنبات/غبار'
    ],
    redFlagsEn: [
      'White focal corneal stromal infiltrate or dense ulceration',
      'Presence of hypopyon (pus level in anterior chamber)',
      'Contact lens overwear history or vegetative/agricultural trauma'
    ],
    contraindications: [
      ' ⛔ لا تبدأ قطرات الكورتيزون في قرحة القرنية المشتبه بأنها معدية دون تقييم اختصاصي العيون. قد تُستخدم في حالات بكتيرية مختارة بعد بدء العلاج المضاد للميكروبات وتحت إشراف متخصص، وتُتجنب عند الاشتباه بعدوى فطرية أو هربسية ظهارية.',
      '⛔️ لا تغطِّ العين المصابة بقرحة قرنية إنتانية مشتبه بها برقعة أو ضمادة؛ فقد تؤخر ملاحظة تدهور الحالة وقد تزيد العدوى سوءاً.',
    ],
    contraindicationsEn: [
      'Do not start topical corticosteroids for suspected infectious corneal ulcer without ophthalmologist assessment. In selected bacterial keratitis cases, steroids may be considered after appropriate antimicrobial treatment under specialist supervision; avoid them when fungal or epithelial herpetic keratitis is suspected.',
      '⛔ Do not patch an eye with suspected infectious corneal ulcer; patching can delay recognition of deterioration and may worsen the infection.'
    ],
    steps: [
      'الاشتباه بقرحة قرنية إنتانية يستلزم تقييماً عاجلاً لدى اختصاصي العيون في اليوم نفسه؛ الحالات الشديدة أو المركزية أو المصحوبة بترقق/ثقب محتمل أو تدهور سريع تستلزم إحالة إسعافية فورية.',
      'أوقف العدسات اللاصقة فوراً، ولا تضع رقعة ضاغطة على العين. قيّم حدة البصر وافحص القرنية بالمصباح الشقي وصبغة الفلورسين بواسطة مختص عند الإمكان، دون تأخير الإحالة.',
      'يحدد اختصاصي العيون الحاجة إلى كشط القرنية للزرع والفحوص، خاصةً في القرح الكبيرة أو المركزية أو العميقة أو غير النمطية أو غير المستجيبة للعلاج.',
      'ابدأ العلاج المضاد للميكروبات المناسب بصورة عاجلة وفق تقييم الطبيب والبروتوكول المحلي؛ اختيار الدواء وتركيزه وتكراره يتغير حسب شدة الحالة والسبب المشتبه به. لا تؤخر الإحالة من أجل العلاج.',
      'تجنب الستيرويدات الموضعية دون توجيه اختصاصي القرنية، ولا تستخدم موسعات الحدقة إلا إذا قررها الطبيب بعد التقييم.'
    ],
    stepsEn: [
      'Suspected infectious corneal ulcer requires urgent same-day ophthalmic assessment; severe or central ulcers, thinning, suspected perforation, or rapidly worsening vision require immediate emergency eye referral.',
      'Stop contact lens wear immediately and do not patch the eye. Assess visual acuity and arrange slit-lamp and fluorescein examination by a qualified clinician where available, without delaying referral.',
      'The ophthalmologist determines whether corneal scraping and microbiological testing are needed, particularly for large, central, deep, atypical, or treatment-resistant ulcers.',
      'Initiate appropriate antimicrobial therapy promptly under clinician direction and local protocols; agent, concentration, and dosing frequency depend on severity and suspected organism. Do not delay referral to arrange treatment.',
      'Avoid topical corticosteroids unless directed by a corneal specialist; use cycloplegics only if prescribed following clinical assessment.'
    ],
    medications: [
      { name: 'Topical antimicrobial therapy — clinician-directed', dose: 'يُحدَّد الدواء والجرعة والتكرار بعد التقييم الطبي بحسب شدة القرحة والسبب المحتمل', doseEn: 'Drug, dose, and frequency determined by the treating clinician according to ulcer severity and suspected cause', note: 'لا توجد وصفة موحدة آمنة لجميع القرح القرنية؛ العلاج لا يؤخر الإحالة العاجلة', noteEn: 'No single empirical prescription is appropriate for every corneal ulcer; treatment must not delay urgent referral' }
    ],
    referralTime: 'تقييم اختصاصي عيون عاجل في اليوم نفسه عند الاشتباه بقرحة قرنية معدية. إحالة فورية إلى طوارئ العيون عند وجود قرحة شديدة أو مركزية أو ترقق قرني أو اشتباه بانثقاب أو تدهور سريع في الرؤية.',
    referralTimeEn: 'Urgent same-day ophthalmic assessment for suspected infectious corneal ulcer. Immediate emergency eye referral for severe or central ulcers, corneal thinning, suspected perforation, or rapidly worsening vision.',
    referralDestination: 'أخصائي قرنية / مستشفى عيون مرجعي',
    referralDestinationEn: 'Cornea Specialist / Tertiary Eye Hospital',
    icon: 'ShieldAlert'
  },

  RES_UVEITIS: {
    id: 'RES_UVEITIS',
    type: 'URGENT',
    title: 'اشتباه التهاب العنبية الأمامي الحاد — يتطلب تقييماً عاجلاً للعين',
    titleEn: 'Suspected Acute Anterior Uveitis — Urgent Eye Assessment',
    englishTitle: 'Suspected Acute Anterior Uveitis — Urgent Eye Assessment',
    badgeText: 'حالة عيون طارئة 🔴',
    badgeTextEn: 'Ocular Emergency 🔴',
    summary: 'يُشتبه بالتهاب العنبية الأمامي عند وجود ألم عيني ورهاب للضوء واحمرار حول القرنية، وقد يصاحبه تشوش الرؤية أو تغير في شكل الحدقة. هذه العلامات ليست تشخيصية بمفردها، وقد تظهر في حالات عينية خطرة أخرى؛ لذلك يلزم تقييم عاجل لدى طبيب العيون لتأكيد التشخيص واستبعاد الأسباب المهددة للبصر.',
    summaryEn: 'Anterior uveitis should be suspected in patients presenting with ocular pain, photophobia, and perilimbal redness, sometimes accompanied by blurred vision or an abnormal pupil. These findings are not diagnostic on their own and may occur in other serious ocular conditions. Urgent ophthalmic assessment is required to confirm the diagnosis and exclude sight-threatening causes.',
    redFlags: [
      'ألم عيني يزداد عند تسليط الضوء على العين الأخرى (Consensual photophobia)',
      'احتقان مهدب عميق حول القرنية بلون قرمزي (Ciliary flush)',
      'التصاقات خلفية بين القزحية والعدسة تجعل الحدقة مشوهة (Posterior synechiae)'
    ],
    redFlagsEn: [
      'Pain exacerbated when shining light into contralateral unaffected eye (Consensual photophobia)',
      'Violaceous deep perilimbal ciliary injection (Ciliary flush)',
      'Irregular pupil due to posterior synechiae adhesions to anterior lens capsule'
    ],
    contraindications: [
      '⚠️ لا تبدأ قطرات الكورتيزون قبل تقييم طبيب العيون وتأكيد ملاءمتها؛ يجب استبعاد التهاب القرنية المعدي، بما فيه الهربس، وتقييم قرحة القرنية وسائر موانع العلاج. فحص الفلوريسين وحده لا يكفي لاستبعاد جميع الأسباب المعدية.'
    ],
    contraindicationsEn: [
      '⚠️ Do not initiate topical corticosteroids before ophthalmologist assessment and confirmation that treatment is appropriate. Infectious keratitis, including herpetic keratitis, corneal ulceration, and other relevant contraindications must be evaluated. Fluorescein staining alone does not exclude all infectious causes.'
    ],
    steps: [
      'يُقرر طبيب العيون الحاجة إلى قطرات شلّ العضلة الهدبية وتوسيع الحدقة (مثل Cyclopentolate أو Atropine) بعد تقييم الحالة واستبعاد الموانع؛ لتخفيف التشنج الهدبي والمساعدة في الوقاية من الالتصاقات الخلفية.',
      'يمكن النظر في استخدام مسكنات الألم الفموية (مثل Paracetamol أو Ibuprofen) عند ملاءمتها طبياً، مع مراعاة عمر المريض ووزنه وتاريخه المرضي والتداخلات الدوائية وموانع الاستعمال. يجب ألا يؤخر إعطاء المسكنات التقييم العاجل لدى طبيب العيون.',
      'ارتداء نظارة شمسية داكنة لتخفيف رهاب الضوء المزعج.',
      'إحالة المريض لتقييم طبيب العيون في اليوم نفسه لإجراء فحص المصباح الشقي، وتأكيد التشخيص، وتحديد العلاج المناسب. عند وجود ألم شديد أو تدهور بالرؤية أو اشتباه بحالة مهددة للبصر، تكون الإحالة إلى طوارئ العيون فورية.'
    ],
    stepsEn: [
      'The ophthalmologist should determine whether cycloplegic and mydriatic drops (such as Cyclopentolate or Atropine) are appropriate after clinical assessment and review of contraindications, to relieve ciliary spasm and help prevent posterior synechiae.',
      'Consider appropriate oral analgesia (such as Paracetamol or Ibuprofen) when clinically suitable, taking into account patient age, weight, medical history, potential drug interactions, and contraindications. Analgesia must not delay urgent ophthalmic assessment.',
      'Advise wearing dark sunglasses to reduce discomfort from photophobia.',
      'Arrange same-day ophthalmologist assessment for slit-lamp examination, diagnostic confirmation, and appropriate treatment. Refer immediately to an ophthalmic emergency service if severe pain, worsening vision, or a sight-threatening condition is suspected.'
    ],
    medications: [
      { name: 'Cyclopentolate eye drops', dose: 'يحدد طبيب العيون الجرعة وتكرار الاستعمال بعد تقييم الحالة وموانع العلاج؛ لا يُستخدم تلقائياً قبل التشخيص.', doseEn: 'Dosage and frequency must be determined by the ophthalmologist after clinical assessment and review of contraindications; do not initiate empirically before diagnosis.', note: 'لتوسيع الحدقة وفك الالتصاقات وتسكين التشنج', noteEn: 'Cycloplegia and synechiae prevention' },
      { name: 'Paracetamol / Ibuprofen', dose: 'تُحدد جرعة المسكن المناسبة حسب العمر والوزن والحالة الصحية وموانع الاستعمال؛ لا تُعتمد جرعة ثابتة لجميع المرضى.', doseEn: 'Analgesic dosage must be individualized according to age, weight, medical history, and contraindications. Do not apply a fixed dose to all patients.', note: 'لتسكين الألم العيني والصدغي', noteEn: 'Systemic analgesia' }
    ],
    referralTime: 'تقييم عيني عاجل في اليوم نفسه؛ إحالة فورية للطوارئ عند الألم الشديد أو تدهور الرؤية أو الاشتباه بحالة مهددة للبصر',
    referralTimeEn: 'Urgent same-day ophthalmic assessment; immediate emergency referral for severe pain, worsening vision, or suspected sight-threatening disease',
    referralDestination: 'أخصائي عيون (مجهز بمصباح شقي عالي الدقة)',
    referralDestinationEn: 'Ophthalmic Clinic (Slit-lamp biomicroscopy equipped)',
    icon: 'Sun'
  },

  RES_BACTERIAL_CONJ: {
    id: 'RES_BACTERIAL_CONJ',
    type: 'FIELD',
    title: 'التهاب الملتحمة البكتيري الحاد',
    titleEn: 'Acute Bacterial Conjunctivitis ("Pink Eye")',
    englishTitle: 'Acute Bacterial Conjunctivitis ("Pink Eye")',
    badgeText: 'علاج ميداني مباشر 🟡',
    badgeTextEn: 'Direct Field Treatment 🟡',
    summary: 'التهاب بكتيري سطحي شائع في الملتحمة يترافق مع إفرازات صديدية صفراء أو خضراء والتصاق الجفون، وتكون القرنية والرؤية سليمة تماماً.',
    summaryEn: 'Common superficial bacterial infection of the conjunctiva characterized by mucopurulent discharge and glued eyelids, with intact cornea and normal visual acuity.',
    redFlags: [
      'إذا ظهر ألم حاد أو انخفض النظر، أعد التقييم لاستبعاد قرحة القرنية فوراً'
    ],
    redFlagsEn: [
      'If significant pain or blurred vision develops, re-evaluate to rule out keratitis'
    ],
    contraindications: [
      '⚠️ حظر فرك العينين وتجنب مشاركة المناشف والأغطية للحد من العدوى السريعة.'
    ],
    contraindicationsEn: [
      '⚠️ Do not rub eyes; avoid sharing pillows, towels, or cosmetics to prevent epidemic spread.'
    ],
    steps: [
      'تنظيف حواف الجفون والرموش من الإفرازات بقطنة معقمة مبللة بماء دافئ نظيف.',
      'وصف قطرة مضاد حيوي موضعي: Tobramycin 0.3% أو Chloramphenicol 0.5% (قطرة 4 مرات يومياً لمدة 5-7 أيام).',
      'وضع مرهم مضاد حيوي (مثل Tetracycline أو Erythromycin) قبل النوم لمنع التصاق الجفون.',
      'إرشاد المريض وأسرته بغسل اليدين بالصابون بانتظام والامتناع عن لمس العين السليمة.'
    ],
    stepsEn: [
      'Cleanse eyelids and lashes with sterile saline / warm moist cotton to remove dried discharge.',
      'Prescribe broad-spectrum topical antibiotic drops: Tobramycin 0.3% or Chloramphenicol 0.5% (1 drop 4 times daily for 5-7 days).',
      'Apply antibiotic ointment (Tetracycline 1% or Erythromycin) at bedtime to prevent morning eyelid sticking.',
      'Educate patient and family on frequent hand hygiene and isolating personal towels.'
    ],
    medications: [
      { name: 'Tobramycin 0.3% drops', dose: 'قطرة واحدة 4 مرات يومياً لمدة 7 أيام', doseEn: '1 drop 4 times daily for 7 days', note: 'مضاد حيوي واسع الطيف للالتهابات السطحية', noteEn: 'Broad-spectrum superficial ocular antibiotic' },
      { name: 'Tetracycline 1% eye ointment', dose: 'شريط صغير داخل الجفن السفلي قبل النوم', doseEn: 'Small ribbon in lower conjunctival fornix at bedtime', note: 'يمنع التصاق الجفون أثناء الليل', noteEn: 'Prevents nocturnal lid adhesion' }
    ],
    referralTime: 'متابعة ميدانية بعد 3-5 أيام؛ التحويل فقط إذا لم تتحسن الأعراض',
    referralTimeEn: 'Field recheck in 3-5 days; refer only if no clinical improvement',
    referralDestination: 'العيادة الميدانية / الرعاية الأولية',
    referralDestinationEn: 'Field Clinic / Primary Healthcare Center',
    icon: 'Droplets'
  },

  RES_ALLERGY_DRY: {
    id: 'RES_ALLERGY_DRY',
    type: 'FIELD',
    title: 'الرمد الربيعي / جفاف القرنية والتراخوما الميدانية',
    titleEn: 'Allergic Conjunctivitis / Dry Eye Syndrome / Trachoma',
    englishTitle: 'Allergic Conjunctivitis / Dry Eye / Trachoma',
    badgeText: 'علاج ميداني ورعاية أولية 🟢',
    badgeTextEn: 'Field Primary Care 🟢',
    summary: 'حالات شائعة في البيئات المتربة والمناطق الجافة، تشمل الحساسية الموسمية، نقص الدمع، والتهابات المتدثرة التراخومية المزمنة في المخيمات.',
    summaryEn: 'Prevalent conditions in arid, dusty, and camp environments encompassing seasonal allergies, aqueous tear deficiency, and endemic trachoma.',
    redFlags: [
      'وجود انقلاب الحافة الجفنية واحتكاك الرموش بالقرنية (Trachomatous Trichiasis - TT)'
    ],
    redFlagsEn: [
      'Trachomatous Trichiasis (in-turned eyelashes scratching cornea)'
    ],
    contraindications: [
      '⚠️ تجنب الاستخدام العشوائي لقطرات الكورتيزون بدون إشراف طبي.'
    ],
    contraindicationsEn: [
      '⚠️ Avoid OTC steroid drop self-medication due to glaucoma/cataract hazards.'
    ],
    steps: [
      'وصف قطرات الدموع الاصطناعية المرطبة الخالية من المواد الحافظة (Artificial Tears) 4-6 مرات يومياً.',
      'في الحساسية والحكة الشديدة: كمادات باردة + قطرة مضاد هيستامين / مثبت الخلايا البدينة (مثل Olopatadine 0.1% مرتين يومياً).',
      'في مناطق توطن التراخوما والجفاف الشديد: إعطاء جرعات فيتامين (أ) المركزة للأطفال + جرعة فموية واحدة من Azithromycin 20mg/kg (حتى 1g) للمريض والمخالطين.',
      'في حال وجود شعرة داخلية (Trichiasis): إزالة الرموش المحتكة والتحويل لجراحة الجفون الوقائية.'
    ],
    stepsEn: [
      'Prescribe preservative-free artificial tear lubricants 4-6 times daily.',
      'For prominent itch/allergy: cold compresses + dual-action antihistamine/mast-cell stabilizer (Olopatadine 0.1% BID).',
      'In trachoma-endemic arid zones: WHO SAFE strategy (Single-dose oral Azithromycin 20mg/kg up to 1g + facial hygiene + Vitamin A supplementation).',
      'If trichiasis is present: epilate aberrant lashes and refer for eyelid rotation surgery.'
    ],
    medications: [
      { name: 'Artificial Tears (Carboxymethylcellulose)', dose: 'قطرة 4-6 مرات يومياً', doseEn: '1 drop 4-6 times daily', note: 'ترطيب وتلطيف سطح العين', noteEn: 'Ocular surface lubrication' },
      { name: 'Olopatadine 0.1% drops', dose: 'قطرة مرتين يومياً', doseEn: '1 drop twice daily', note: 'مضاد حساسية وحكة ممتاز', noteEn: 'Antihistamine / mast cell stabilizer' },
      { name: 'Azithromycin (في حالات التراخوما)', dose: 'جرعة واحدة فموية 20mg/kg (بحد أقصى 1g)', doseEn: 'Single oral dose 20mg/kg (max 1g)', note: 'بروتوكول منظمة الصحة العالمية (SAFE)', noteEn: 'WHO SAFE Trachoma protocol' }
    ],
    referralTime: 'متابعة دورية؛ تحويل جراحي في حالات انقلاب الرموش (Trichiasis)',
    referralTimeEn: 'Routine follow-up; surgical referral for trichiasis',
    referralDestination: 'عيادة العيون الأولية / فريق مكافحة التراخوما',
    referralDestinationEn: 'Primary Eye Care Clinic / Mobile Trachoma Team',
    icon: 'Sparkles'
  },

  RES_CHEMICAL_BURN: {
    id: 'RES_CHEMICAL_BURN',
    type: 'CRITICAL',
    title: 'الحروق الكيميائية للعين (قلويات / أحماض / أسمنت)',
    titleEn: 'Ocular Chemical Injury (Alkali / Acid Burn / Lime)',
    englishTitle: 'Ocular Chemical Injury (Alkali / Acid Burn)',
    badgeText: 'طوارئ عيون حرجة وفورية 🚨',
    badgeTextEn: 'Immediate Critical Emergency 🚨',
    summary: 'القلويات (مثل الأسمنت، ماء الجير، المنظفات، هيدروكسيد الصوديوم) تنفذ بسرعة هائلة داخل العين وتسبب نخر التسييل وتدمير الخلايا الجذعية الحوفية. العلاج هو الغسيل المباشر قبل أي استجواب طبي!',
    summaryEn: 'Alkalis (cement, lime, drain cleaners, lye) penetrate intraocular tissues rapidly causing liquefaction necrosis and limbal stem cell destruction. Immediate irrigation takes precedence over all examinations!',
    redFlags: [
      'شحوب بياض العين حول القرنية (Limbal ischemia - بياض القرنية كالرخام يشير لحرق كيميائي من الدرجة الرابعة)',
      'الأسمنت ومواد البناء تحتوي على جير قلوي يذوب ببطء ويستمر في حرق العين ما لم يتم إزالة جزيئاته'
    ],
    redFlagsEn: [
      'Limbal ischemia / blanching (porcelain-white marble eye indicates Grade IV chemical burn)',
      'Cement & lime particulate entrapment in fornices causing ongoing caustic saponification'
    ],
    contraindications: [
      '⛔ حظر تأجيل الغسيل لكتابة تقرير أو قياس النظر أو البحث عن دواء!',
      '⛔ حظر تغطية العين قبل الغسيل المتواصل بالماء لمدة 20 دقيقة على الأقل!',
      '⛔ حظر محاولة معادلة الحرق الكيميائي بمادة كيميائية أخرى (مثل محاولة معادلة القلوي بحمض ضعيف)!'
    ],
    contraindicationsEn: [
      '⛔ NEVER delay irrigation for visual acuity testing, clinical charting, or paperwork!',
      '⛔ NEVER patch or bandage the eye prior to 20-30 minutes of continuous irrigation!',
      '⛔ NEVER attempt chemical neutralization (e.g. attempting to neutralize alkali with acid)!'
    ],
    steps: [
      '⚡ ابدأ الغسيل الميكانيكي فوراً وبدون ثانية تأخير باستخدام ماء نظيف جارٍ أو محلول ملحي متواصل (Normal Saline / Ringer) لمدة 20-30 دقيقة متواصلة.',
      'ضع قطرة مخدر موضعي (مثل Benoxinate أو Tetracaine إن توفرت) لتسهيل فتح الجفون وغسيل العين.',
      'اقلب الجفون العلوية والسفلية وامسح الرتوج بقطنة مبللة لإزالة أي حبيبات أسمنت أو جير عالقة.',
      'استمر بالغسيل حتى يصبح الرقم الهيدروجيني (pH) لدمع العين متعادلاً (7.0 - 7.4) باستخدام شريط فحص البول/الـ pH.',
      'بعد انتهاء الغسيل: وضع مرهم مضاد حيوي + قطرة توسيع ومرخية للعضلة الهدبية والتحويل الفوري لمستشفى العيون.'
    ],
    stepsEn: [
      '⚡ Initiate continuous copious irrigation immediately with Normal Saline, Ringer Lactate, or clean tap water for 20-30 uninterrupted minutes.',
      'Instill topical anesthetic drops (Benoxinate / Tetracaine) to facilitate eyelid retraction and patient cooperation.',
      'Evert both upper and lower eyelids and sweep fornices with moist cotton swab to remove particulate cement/lime.',
      'Continue irrigation until tear film pH reaches neutral physiological range (7.0 - 7.4) on test strip.',
      'Post-irrigation: apply preservative-free antibiotic ointment + cycloplegic drop and immediately transfer to tertiary ophthalmology center.'
    ],
    medications: [
      { name: 'Normal Saline 0.9% / Ringer Lactate', dose: '1 إلى 2 لتر غسيل مستمر لمدة 20-30 دقيقة', doseEn: '1-2 Liters continuous irrigation for 20-30 min', note: 'الأولوية القصوى المطلقة', noteEn: 'Absolute clinical first priority' },
      { name: 'Moxifloxacin or Erythromycin ointment', dose: 'تطبيق مرهم بعد انتهاء الغسيل بالكامل', doseEn: 'Apply sterile ointment after complete irrigation', note: 'لحماية السطح المتآكل', noteEn: 'Protects denuded corneal epithelium' }
    ],
    referralTime: 'فوري عقب انتهاء الغسيل المستمر لـ 20 دقيقة',
    referralTimeEn: 'Immediate upon completing 20-minute irrigation',
    referralDestination: 'مركز حروق وطوارئ عيون متقدم',
    referralDestinationEn: 'Tertiary Ocular Trauma & Burn Center',
    icon: 'Flame'
  },

  RES_RUPTURED_GLOBE: {
    id: 'RES_RUPTURED_GLOBE',
    type: 'CRITICAL',
    title: 'تمزق أو جرح نافذ بمقلة العين',
    titleEn: 'Open Globe Injury / Ruptured Globe / Penetrating Trauma',
    englishTitle: 'Open Globe Injury / Ruptured Globe / Penetrating Trauma',
    badgeText: 'طوارئ جراحية قصوى 🚨',
    badgeTextEn: 'Critical Surgical Emergency 🚨',
    summary: 'انثقاب أو تمزق جدار مقلة العين بسبب ضربة حادة أو نافذة. أي ضغط على العين قد يقذف محتويات العين الداخلية (القزحية والشبكية) للخارج ويسبب العمى النهائي.',
    summaryEn: 'Full-thickness breach of the cornea or sclera from blunt rupture or penetrating trauma. Any external pressure can cause catastrophic extrusion of intraocular uveal/retinal contents.',
    redFlags: [
      'تشوه شكل البؤبؤ وسحبه باتجاه موقع الجرح (Peaked / Teardrop pupil)',
      'بروز نسيج بني داكن أو قزحية من خلال الجرح القرني أو الصلبي',
      'نزف كامل في الحجرة الأمامية (Total Hyphema) أو انخفاض عمق الحجرة الأمامية (Flat AC)',
      'تدلي الجفون وورم دموي مداري هائل'
    ],
    redFlagsEn: [
      'Peaked or teardrop pupil pointing toward wound site',
      'Prolapse of uveal tissue / pigmented brown mass through corneal/scleral defect',
      'Flat or shallow anterior chamber / Total 8-ball hyphema',
      'Massive periocular hematoma with marked subconjunctival bullous hemorrhage'
    ],
    contraindications: [
      '⛔ حظر تام ومطلق للضغط على العين أو جسها أو محاولة فتح الجفون بالقوة!',
      '⛔ حظر غسيل العين بالماء أو وضع أي قطرات أو مراهم داخل العين!',
      '⛔ حظر إزالة أي جسم غريب نافذ يبرز من مقلة العين في الميدان!'
    ],
    contraindicationsEn: [
      '⛔ ABSOLUTE CONTRAINDICATION: NEVER exert any pressure, palpate, or forcefully pry open eyelids!',
      '⛔ NEVER irrigate the eye or apply topical ointments/drops into the open globe!',
      '⛔ NEVER attempt to remove protruding penetrating foreign objects in the field!'
    ],
    steps: [
      'إيقاف أي فحص مباشر فور الاشتباه وتنبيه الفريق الطبي بعدم لمس العين.',
      'تغطية العين بكرتون واقٍ مقبب أو شيلد صلب (Rigid Eye Shield) يستند على عظام الحجاج والجبهة دون لمس مقلة العين نهائياً.',
      'إبقاء المريض صائماً تماماً (NPO) تحضيراً للتخدير العام والعملية الجراحية الطارئة.',
      'إعطاء مضاد حيوي وريدي (مثل Ceftriaxone 1g IV + Vancomycin إن أمكن) ومضاد قيء لمنع زيادة الضغط، وإعطاء لقاح الكزاز (Tetanus toxoid).',
      'نقل فوري بسيارة إسعاف إلى غرفة عمليات العيون.'
    ],
    stepsEn: [
      'Halt all direct ocular examination immediately and warn entire medical team NOT to touch the eye.',
      'Apply a Rigid Eye Shield (or improvised cup) resting solely on orbital bone margins with ZERO contact to the eyeball.',
      'Keep patient strictly NPO (nothing by mouth) for immediate emergency general anesthesia.',
      'Administer IV broad-spectrum antibiotics (Ceftriaxone 1g IV), IV antiemetic (Ondansetron), and update Tetanus toxoid vaccination.',
      'Immediate code-1 ambulance transfer directly to Ophthalmic Operating Theatre.'
    ],
    medications: [
      { name: 'Ceftriaxone IV', dose: '1g وريدياً للوقاية من التهاب باطن المقلة (Endophthalmitis)', doseEn: '1g IV for endophthalmitis prophylaxis', note: 'جرعة وريدية وقائية', noteEn: 'Systemic antimicrobial coverage' },
      { name: 'Ondansetron 4-8mg IV/IM', dose: 'حقنة مضادة للغثيان والتقيؤ', doseEn: '4-8mg IV/IM antiemetic', note: 'التقيؤ يرفع الضغط ويقذف محتويات العين', noteEn: 'Prevents vomiting and intraocular expulsion' },
      { name: 'Tetanus Toxoid 0.5ml IM', dose: 'حقنة كزاز عضلية في الإصابات الملوثة', doseEn: '0.5ml IM booster', note: 'لقاح وقائي', noteEn: 'Tetanus prophylaxis' }
    ],
    referralTime: 'فوري بأقصى سرعة (خلال 1-2 ساعة للعمليات)',
    referralTimeEn: 'Immediate code emergency (< 1-2 hours to O.R.)',
    referralDestination: 'غرفة عمليات جراحة العيون وطوارئ الحوادث',
    referralDestinationEn: 'Ophthalmic Surgical Operating Room / Major Trauma Center',
    icon: 'ShieldX'
  },

  RES_FOREIGN_BODY: {
    id: 'RES_FOREIGN_BODY',
    type: 'FIELD',
    title: 'جسم غريب سطحي في القرنية أو الملتحمة',
    titleEn: 'Superficial Corneal / Conjunctival Foreign Body',
    englishTitle: 'Superficial Corneal / Conjunctival Foreign Body',
    badgeText: 'علاج وإجراء ميداني 🟡',
    badgeTextEn: 'Field Removal Procedure 🟡',
    summary: 'دخول شظية معدنية أو نشارة أو رمل على سطح القرنية أو تحت الجفن العلوي. إزالتها في الميدان تمنع تآكل القرنية وتكون حلقة الصدأ والعدوى.',
    summaryEn: 'Superficial particle (metallic splinter, rust, wood dust, grit) embedded on corneal epithelium or trapped subtarsally under the upper eyelid.',
    redFlags: [
      'إذا كان الجسم الغريب منغرزاً عميقاً أو نافذاً للقرنية، لا تلمسه وحوّله كجرح نافذ'
    ],
    redFlagsEn: [
      'If foreign object is deeply embedded, full-thickness, or surrounded by anterior chamber leak, manage as Open Globe'
    ],
    contraindications: [
      '⚠️ لا تستخدم أدوات حادة غير معقمة، ولا تفرك القرنية بشدة.'
    ],
    contraindicationsEn: [
      '⚠️ Do not use unsterile needles or scrape the corneal stroma aggressively.'
    ],
    steps: [
      'فحص الجفن العلوي بقلبه (Eversion of upper eyelid) للبحث عن أجسام غريبة محتبسة في الرتج الملتحمي.',
      'وضع قطرة مخدر موضعي (Benoxinate 0.4%) لتهدئة الألم ومنع حركة العين اللاإرادية.',
      'إذا كان الجسم سطحياً تماماً: إزالته برفق شديد باستخدام مسحة قطنية معقمة مبللة بمحلول ملحي، أو عبر الغسيل بمحلول معقم.',
      'فحص تآكل القرنية بصبغة الفلوريسين إن توفرت للتأكد من حجم السحجة (Abrasion).',
      'وضع مرهم مضاد حيوي واسع الطيف (Tobramycin or Erythromycin) وتغطية العين بضمادة خفيفة لمدة 24 ساعة (ما لم تكن ملوثة بنباتات).'
    ],
    stepsEn: [
      'Perform upper eyelid eversion to inspect subtarsal sulcus for trapped foreign matter.',
      'Instill topical anesthetic drop (Benoxinate / Proparacaine) for patient comfort and immobilization.',
      'If purely superficial: gently sweep away using sterile saline-moistened cotton tip applicator or direct sterile stream.',
      'Instill fluorescein drop to assess residual corneal epithelial defect/abrasion.',
      'Apply prophylactic antibiotic ointment (Tobramycin / Erythromycin) and light eye pad for 24 hours (unless vegetative).'
    ],
    medications: [
      { name: 'Benoxinate 0.4% / Proparacaine', dose: 'قطرة واحدة قبل الإزالة الميدانية', doseEn: '1 drop prior to removal', note: 'تخدير موضعي لتسهيل الإجراء', noteEn: 'Topical surface anesthesia' },
      { name: 'Tobramycin eye ointment', dose: 'تطبيق مرهم بعد الإزالة 3 مرات يومياً لـ 3 أيام', doseEn: 'Apply ointment 3 times daily for 3 days', note: 'لمنع الإنتان الثانوي', noteEn: 'Prophylaxis against secondary keratitis' }
    ],
    referralTime: 'متابعة خلال 24 ساعة؛ التحويل إذا كان الجسم عميقاً أو ترك حلقة صدأ (Rust ring)',
    referralTimeEn: 'Recheck in 24h; refer if deep stromal involvement or retained rust ring',
    referralDestination: 'العيادة الميدانية / عيادة العيون العامة',
    referralDestinationEn: 'Field Eye Clinic / General Ophthalmology',
    icon: 'Target'
  },

  // ==================== OCULOMICS & SYSTEMIC RESULTS ====================
  RES_OCULOMICS_DIABETIC_RENAL_SEVERE: {
    id: 'RES_OCULOMICS_DIABETIC_RENAL_SEVERE',
    type: 'URGENT',
    title: 'اعتلال شبكي وكلوي سكري متقدم (High-Risk Oculomics Marker)',
    titleEn: 'Severe Proliferative Diabetic Retinopathy & Renal Risk Marker',
    englishTitle: 'Severe Proliferative Diabetic Retinopathy & Diabetic Nephropathy Risk',
    badgeText: 'إنذار وعائي وكلوي عاجل 🔴',
    badgeTextEn: 'Urgent Retino-Renal Warning 🔴',
    summary: 'وجود أوعية مستحدثة أو نضحات بقعية أو نزف زجاجي يعكس تلفاً ميكرووعائياً متقدماً، ويرتبط بشكل وثيق بارتفاع شديد في خطر اعتلال الكبيبات الكلوية (Diabetic Nephropathy)، الفشل الكلوي، والجلطات القلبية.',
    summaryEn: 'Proliferative retinal neovascularization and macular exudates reflect systemic end-organ microvascular damage, with an ultra-high risk of coexisting diabetic nephropathy (proteinuria/eGFR decline) and cardiovascular morbidity.',
    redFlags: [
      'نقص حاد بالرؤية المركزية (وذمة لطخية DME)',
      'نزف داخل الجسم الزجاجي (Vitreous Hemorrhage) أو ورم أوعية دموية جديدة',
      'ارتفاع ضغط الدم غير المضبوط وزلال البول مع وذمات بالأطراف السفلية'
    ],
    redFlagsEn: [
      'Drop in central visual acuity (Diabetic Macular Edema)',
      'Sudden dense dark floaters shower (Vitreous hemorrhage)',
      'Uncontrolled systemic hypertension and microalbuminuria / peripheral edema'
    ],
    contraindications: [
      '⚠️ حظر إهمال الفحص الكلوي المخبري الفوري للمريض (UACR + eGFR).',
      '⚠️ تجنب تأخير الإحالة لعيادة الشبكية للحقن المضاد لنمو الأوعية أو الليزر.'
    ],
    contraindicationsEn: [
      '⚠️ NEVER overlook immediate systemic nephrology and renal laboratory workup (UACR + eGFR).',
      '⚠️ Do not delay vitreoretinal referral for anti-VEGF therapy or panretinal photocoagulation (PRP).'
    ],
    steps: [
      'فحص سكر الدم التراكمي (HbA1c) وضغط الدم وطلب تحليل البول لنسبة الألبومين إلى الكرياتينين (UACR) ومعدل الترشيح الكبيبي (eGFR).',
      'تحويل عاجل مشترك لعيادة الشبكية (Retina Clinic) لإجراء تصوير مقطعي (OCT) وتقييم الحقن المضاد لنمو البطانة الوعائية (Anti-VEGF) أو ليزر التخثير الضوئي (PRP).',
      'إحالة استشارية موازية لقسم أمراض الكلى (Nephrology) لتقييم الحماية الكلوية (ACEi / ARBs / SGLT2i) لمنع تطور القصور الكلوي.',
      'إحالة لعيادة الغدد الصماء والسكري لضبط السكر الصارم دون تذبذب حاد.'
    ],
    stepsEn: [
      'Check HbA1c, blood pressure, and order Spot Urine Albumin-to-Creatinine Ratio (UACR) and estimated GFR (eGFR).',
      'Urgent co-referral to Retina Subspecialty for Optical Coherence Tomography (OCT) and Anti-VEGF / Panretinal Photocoagulation (PRP) evaluation.',
      'Parallel referral to Nephrology for renoprotective therapy optimization (ACEi/ARB/SGLT2i) to mitigate progressive nephron loss.',
      'Endocrinology review for tight glycemic stabilization.'
    ],
    medications: [
      { name: 'Glycemic & Renal Optimization', dose: 'حسب البروتوكول الاستشاري المشترك', doseEn: 'Per Endocrinology & Nephrology protocols', note: 'متابعة UACR و eGFR التراكمي', noteEn: 'Monitor UACR & eGFR' }
    ],
    referralTime: 'خلال 1 إلى 2 أسبوع (عاجل)',
    referralTimeEn: 'Within 1 to 2 weeks (Urgent Co-Referral)',
    referralDestination: 'عيادة شبكية العيون + قسم أمراض الكلى (Nephrology) + الغدد الصماء',
    referralDestinationEn: 'Retina Subspecialty + Nephrology Renal Unit + Endocrinology',
    icon: 'Droplets'
  },

  RES_OCULOMICS_DIABETIC_RENAL_EARLY: {
    id: 'RES_OCULOMICS_DIABETIC_RENAL_EARLY',
    type: 'FIELD',
    title: 'اعتلال شبكي سكري مبكر / إنذار ميكرووعائي كلوي أولي',
    titleEn: 'Early Non-Proliferative Diabetic Retinopathy (NPDR) & Microvascular Alert',
    englishTitle: 'Early NPDR & Predictive Renal Microvascular Marker',
    badgeText: 'متابعة ووقاية استباقية 🟡',
    badgeTextEn: 'Proactive Prevention 🟡',
    summary: 'ظهور أمهات دم دقيقة ونزوف نقطية في قاع العين يمثل المرحلة الذهبية للتدخل الاستباقي لمنع تدهور شبكية العين وتلف المرشحات الكلوية الدقيقة.',
    summaryEn: 'Early retinal microaneurysms represent the critical golden window for proactive intervention, preventing progression to irreversible vision loss and diabetic kidney disease.',
    redFlags: [
      'تغيرات مفاجئة في جودة الرؤية أو تعتيم بالمركز'
    ],
    redFlagsEn: [
      'Sudden central blur or vision fluctuations'
    ],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'فحص السكر التراكمي (الهدف: HbA1c < 7.0%) وفحص ضغط الدم (الهدف: < 130/80 mmHg).',
      'طلب فحص زلال البول الدوري (Spot Urine Albumin-to-Creatinine Ratio) للكشف المبكر عن الاعتلال الكلوي.',
      'تثقيف المريض حول فحص قاع العين السنوي وضبط نمط الحياة والتغذية.',
      'إعادة تقييم قاع العين الميداني أو التصوير الرقمي بعد 6 إلى 12 شهراً.'
    ],
    stepsEn: [
      'Check HbA1c (Target: < 7.0%) and monitor systemic blood pressure (Target: < 130/80 mmHg).',
      'Order baseline Urine Albumin-to-Creatinine Ratio (UACR) for early nephropathy screening.',
      'Provide patient education on annual dilated eye exams and lifestyle/dietary optimization.',
      'Schedule repeat fundus examination or digital imaging in 6 to 12 months.'
    ],
    referralTime: 'متابعة دورية خلال شهر لعيادة السكري والباطنة',
    referralTimeEn: 'Follow-up within 1 month with Primary Care / Endocrinology',
    referralDestination: 'عيادة السكري والباطنة العامة + فحص قاع العين السنوي',
    referralDestinationEn: 'Diabetic / Internal Medicine Clinic + Annual Retinal Screening',
    icon: 'Activity'
  },

  RES_OCULOMICS_CARDIO_STROKE_HIGH: {
    id: 'RES_OCULOMICS_CARDIO_STROKE_HIGH',
    type: 'URGENT',
    title: 'إنذار قلبي وسكتات دماغية عالي الخطورة (Cardiovascular & Stroke Alert)',
    titleEn: 'High-Risk Retinal Oculomics Marker for Stroke & Coronary Disease',
    englishTitle: 'Retinal Atherosclerosis, Hollenhorst Plaque & Stroke Alert',
    badgeText: 'إنذار وعائي قلبي عاجل 🔴',
    badgeTextEn: 'Urgent Cardio-Stroke Alert 🔴',
    summary: 'قد تشير الصمات الكوليسترولية الشبكية إلى مصدر وعائي يستدعي التقييم. أما تضيق الشرايين الشبكية وتغيرات التقاطعات الوعائية فقد ترتبط بارتفاع ضغط الدم المزمن وعوامل خطورة وعائية أخرى. لا تثبت هذه العلامات وحدها وجود سكتة دماغية أو احتشاء قلبي وشيك. يستدعي فقدان الرؤية الإقفاري المفاجئ أو ظهور أعراض عصبية حادة تقييماً إسعافياً فورياً.',
    summaryEn: 'Retinal cholesterol emboli may indicate an underlying vascular embolic source requiring evaluation. Retinal arteriolar narrowing and AV crossing changes may be associated with chronic hypertension and other vascular risk factors. These findings alone do not establish an impending stroke or myocardial infarction. Sudden suspected ischemic visual loss or acute neurological symptoms require immediate emergency assessment.',
    redFlags: [
      'ضعف مفاجئ أو اضطراب الكلام أو أعراض عصبية بؤرية، حتى لو زالت سريعاً (Stroke/TIA)',
      'فقدان مفاجئ للرؤية في عين واحدة أو اشتباه نقص تروية شبكية حاد، حتى لو كان عابراً',
      'ارتفاع شديد في ضغط الدم مع أعراض أو علامات أذية حادة للأعضاء'
    ],
    redFlagsEn: [
      'Sudden focal neurological symptoms, even if resolved (Stroke/TIA)',
      'Sudden monocular visual loss or suspected acute retinal ischemia, including transient episodes',
      'Severely elevated blood pressure with signs or symptoms of acute target-organ injury'
    ],
    contraindications: [
      '⚠️ لا تؤخر الإحالة الإسعافية عند ظهور أعراض عصبية حادة أو فقدان رؤية مفاجئ مشتبه بأنه إقفاري، حتى لو زالت الأعراض.',
      '⚠️ لا تعتبر العلامات الوعائية الشبكية وحدها دليلاً على سكتة وشيكة؛ حدد الفحوص القلبية والوعائية وفق التقييم السريري.'
    ],
    contraindicationsEn: [
      '⚠️ Do not delay emergency assessment for acute neurological symptoms or sudden suspected ischemic visual loss, even if symptoms resolve.',
      '⚠️ Retinal vascular findings alone do not establish impending stroke; select cardiac and vascular investigations according to clinical assessment.'
    ],
    steps: [
      'تقييم الأعراض العصبية والبصرية الحادة وقياس العلامات الحيوية المتاحة دون تأخير الإحالة الإسعافية عند الاشتباه بسكتة دماغية أو نقص تروية شبكية حاد.',
      'عند الاشتباه بسكتة دماغية أو نقص تروية شبكية حاد، أحِل المريض فوراً إلى الطوارئ أو مسار السكتة الدماغية. أما الصمات الكوليسترولية الشبكية المكتشفة دون أعراض فتستدعي تقييماً طبياً ووعائياً سريعاً، مع تحديد تصوير الشرايين السباتية وفق الحالة السريرية.',
      'تقييم الحاجة إلى تخطيط القلب وتصوير صدى القلب أو مراقبة نظم القلب عند الاشتباه بمصدر صمات قلبي، وفق التقييم السريري وتوصيات الفريق المختص، دون تأخير الإحالة الإسعافية.',
      'تقييم الحاجة إلى مضادات الصفيحات وخافضات الدهون وفق التشخيص المؤكد وعوامل الخطورة القلبية الوعائية وخطر النزف وموانع الاستعمال، بقرار من الطبيب المختص. ولا يبدأ الأسبرين أو الستاتين تلقائياً اعتماداً على العلامات الشبكية وحدها.'
    ],
    stepsEn: [
      'Assess acute neurological and visual symptoms and obtain available vital signs without delaying emergency referral for suspected stroke or acute retinal ischemia.',
      'For suspected stroke or acute retinal ischemia, arrange immediate emergency or stroke-pathway assessment. Asymptomatic retinal cholesterol emboli warrant prompt medical and vascular evaluation, with carotid imaging guided by clinical assessment.',
      'Assess the need for ECG, echocardiography, or cardiac rhythm monitoring when a cardiac embolic source is suspected, guided by clinical assessment and specialist recommendations, without delaying emergency referral.',
      'Assess indications for antiplatelet and lipid-lowering therapy based on the established diagnosis, cardiovascular risk, bleeding risk, and contraindications under clinician supervision. Do not initiate aspirin or statins solely on the basis of retinal findings.'
    ],
    referralTime: 'إحالة إسعافية فورية عند الاشتباه بسكتة دماغية أو نوبة إقفارية عابرة أو نقص تروية شبكية حاد، حتى لو زالت الأعراض. أما الصمات الشبكية المكتشفة دون أعراض فتحتاج تقييماً وعائياً سريعاً بحسب الحالة، والتغيرات الوعائية المزمنة تُتابع وفق عوامل الخطورة.',
    referralTimeEn: 'Immediate emergency assessment for suspected stroke, TIA, or acute retinal ischemia, even if symptoms resolve. Asymptomatic retinal emboli require prompt individualized vascular assessment; chronic vascular changes warrant risk-based follow-up.',
    referralDestination: 'عيادة القلب والأوعية الدموية + وحدة الوقاية من السكتات الدماغية (Stroke Unit)',
    referralDestinationEn: 'Cardiology & Vascular Medicine + Acute Stroke Prevention Unit',
    icon: 'HeartPulse'
  },

  RES_OCULOMICS_CARDIO_MODERATE: {
    id: 'RES_OCULOMICS_CARDIO_MODERATE',
    type: 'FIELD',
    title: 'تصلب وعائي شرياني معتدل / اعتلال ضغطي بالشبكية',
    titleEn: 'Moderate Hypertensive Retinal Vasculopathy & Arterial Stiffness',
    englishTitle: 'Hypertensive Retinopathy & Systemic Vascular Stiffness',
    badgeText: 'متابعة ضغط الدم والقلب 🟡',
    badgeTextEn: 'Cardiovascular Monitoring 🟡',
    summary: 'الانعكاس النحاسي (Copper wiring) وتضيق الشرايين الشبكية يعكس صلابة الجدران الوعائية الجهازية وتأثير فرط ضغط الدم المزمن على الأعضاء الحيوية.',
    summaryEn: 'Copper wiring and generalized retinal arteriolar narrowing provide real-time biomarkers of chronic systemic hypertension, vascular remodeling, and elevated peripheral resistance.',
    redFlags: [
      'صداع مؤخرة الرأس الصباحي مع أرقام ضغط دم تفوق 160/100 mmHg'
    ],
    redFlagsEn: [
      'Occipital morning headaches with blood pressure > 160/100 mmHg'
    ],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'إجراء مراقبة ضغط الدم المتنقلة على مدار 24 ساعة (24h ABPM).',
      'فحص دهنيات الدم الشاملة (Lipid Profile) ووظائف الكلى ونسبة الألبومين بالبول.',
      'تعديل جرعات أدوية الضغط بواسطة طبيب الباطنة/الأسرة لتحقيق الضغط المستهدف (< 130/80 mmHg).',
      'توصية بنمط حياة صحي: تقليل الصوديوم، ممارسة الرياضة الهوائية، والإقلاع عن التدخين.'
    ],
    stepsEn: [
      'Initiate 24-hour Ambulatory Blood Pressure Monitoring (ABPM).',
      'Order comprehensive lipid profile, renal function panel, and urine albumin assessment.',
      'Titrate antihypertensive regimen to achieve target guideline blood pressure (< 130/80 mmHg).',
      'Counsel on sodium reduction, aerobic physical activity, and smoking cessation.'
    ],
    referralTime: 'خلال أسبوعين إلى شهر لعيادة الباطنة والقلب',
    referralTimeEn: 'Within 2-4 weeks to Internal Medicine / Primary Care',
    referralDestination: 'عيادة طب الأسرة والباطنة / عيادة القلب',
    referralDestinationEn: 'Internal Medicine / Preventive Cardiology Clinic',
    icon: 'Activity'
  },

  RES_OCULOMICS_NEURO_ICP: {
    id: 'RES_OCULOMICS_NEURO_ICP',
    type: 'CRITICAL',
    title: 'وذمة حليمة العصب البصري / اشتباه ارتفاع ضغط الدماغ (Papilledema)',
    titleEn: 'Bilateral Optic Disc Swelling (Papilledema) / Raised Intracranial Pressure (ICP)',
    englishTitle: 'Papilledema & Raised Intracranial Pressure Emergency',
    badgeText: 'طوارئ عصبية ومخ قصوى 🚨',
    badgeTextEn: 'Critical Neuro Emergency 🚨',
    summary: 'انتفاخ قرص العصب البصري في كلتا العينين مع غياب النبضان الوريدي التلقائي وصداع صباحي نابض، يمثل حالة طوارئ عصبية تستوجب نفي وجود ورم بالدماغ، استسقاء دماغي، أو خثار وريدي بالدماغ فوراً.',
    summaryEn: 'Bilateral optic disc edema due to increased intracranial pressure (ICP). Urgent neuro-emergency requiring immediate neuroimaging to rule out brain tumor, intracranial hemorrhage, hydrocephalus, or cerebral venous sinus thrombosis.',
    redFlags: [
      'صداع شديد يزداد في الصباح الباكر أو عند الانحناء والسعال',
      'غثيان وقيء مقذوف (Projectile vomiting)',
      'نوبات تعتيم بصري عابر تدوم ثوانٍ (Transient Visual Obscurations - TVOs)',
      'ازدواج الرؤية الأفقي (شلل العصب القحفي السادس - 6th Nerve Palsy)'
    ],
    redFlagsEn: [
      'Severe headache worsening in morning or on Valsalva/bending',
      'Projectile nausea & vomiting',
      'Transient visual obscurations lasting seconds (TVOs)',
      'Horizontal binocular diplopia (6th cranial nerve palsy)'
    ],
    contraindications: [
      '⛔ حظر إجراء بزل قطني (Lumbar Puncture) قبل عمل أشعة مقطعية أو رنين مغناطيسي للدماغ لمنع انفتاق الدماغ القاتل (Brain Herniation)!'
    ],
    contraindicationsEn: [
      '⛔ ABSOLUTE CONTRAINDICATION: NEVER perform Lumbar Puncture before urgent Brain MRI/CT to avoid fatal brainstem herniation!'
    ],
    steps: [
      'إحالة فورية طارئة بأقصى سرعة لقسم طوارئ المخ والأعصاب (Neurology/Neurosurgery ER).',
      'إجراء تصوير بالرنين المغناطيسي للدماغ مع تصوير الأوردة (Brain MRI + MRV) أو أشعة مقطعية عاجلة مع الصبغة.',
      'فحص حدة البصر ومجال الرؤية (Visual Field) بدقة وتوثيق سلامة حركة العين وحجم الحدقتين.',
      'عقب نفي أي آفة كتلية بالرنين: قياس ضغط السائل الدماغي عبر البزل القطني، وبدء خافضات ضغط الدماغ (مثل Acetazolamide) تحت إشراف طبيب الأعصاب.'
    ],
    stepsEn: [
      'Immediate code emergency transfer to Neurology / Neurosurgery Emergency Department.',
      'Urgent Brain MRI with Magnetic Resonance Venography (MRI+MRV) or contrast CT to exclude mass lesion / venous sinus thrombosis.',
      'Document baseline visual acuity, pupil reflexes, and formal confrontation visual fields.',
      'Following neuroimaging clearance: proceed with diagnostic lumbar puncture with opening pressure measurement.'
    ],
    referralTime: 'فوري وطارئ بأقصى سرعة (خلال ساعات)',
    referralTimeEn: 'Immediate neuro-emergency (< 2-4 hours)',
    referralDestination: 'طوارئ المخ والأعصاب وجراحة الأعصاب (Neurology / Neurosurgery ER)',
    referralDestinationEn: 'Emergency Dept - Neurology & Neurosurgical Center',
    icon: 'AlertOctagon'
  },

  RES_OCULOMICS_NEURO_ATROPHY: {
    id: 'RES_OCULOMICS_NEURO_ATROPHY',
    type: 'URGENT',
    title: 'شحوب واعتلال العصب البصري (Optic Neuropathy / Optic Atrophy)',
    titleEn: 'Optic Nerve Pallor / Optic Neuropathy Screening Marker',
    englishTitle: 'Optic Nerve Pallor / Compressive & Demyelinating Neuropathy',
    badgeText: 'تحويل عيون وأعصاب عاجل 🔴',
    badgeTextEn: 'Urgent Neuro-Ophtha Referral 🔴',
    summary: 'شحوب قرص العصب البصري أو التقعر غير المتناظر يعكس فقدان الألياف العصبية البصرية، ويستلزم نفي الزرق المتقدم (Glaucoma)، التهاب العصب البصري المزيل للميالين (التصلب المتعدد MS)، أو ضغط خارجي على المسار البصري.',
    summaryEn: 'Optic disc pallor indicates irreversible retinal ganglion cell axon loss. Requires urgent workup to exclude advanced glaucoma, demyelinating optic neuritis (Multiple Sclerosis), nutritional/toxic neuropathy, or compressive chiasmal lesion.',
    redFlags: [
      'خلل في رؤية الألوان (Red Desaturation / Color Vision Defect)',
      'عيب حدقي وارد نسبي (RAPD / Marcus Gunn pupil)',
      'عتمات مركزية أو نقص نصفي بمجال الرؤية (Bitemporal / Homonymous Hemianopia)'
    ],
    redFlagsEn: [
      'Impaired color saturation (Red desaturation)',
      'Relative Afferent Pupillary Defect (RAPD)',
      'Central scotoma or hemianopic visual field defects'
    ],
    contraindications: [
      '⚠️ حظر إهمال فحص المجال البصري ورؤية الألوان.'
    ],
    contraindicationsEn: [
      '⚠️ Do not omit formal color vision and visual field testing.'
    ],
    steps: [
      'فحص استجابة الحدقة للضوء (Swinging Flashlight Test) للبحث عن عيب RAPD.',
      'فحص تمييز الألوان (Ishihara / Red Cap Test) واختبار المجال البصري الميداني بالمواجهة (Confrontation).',
      'تحويل لأخصائي طب العيون والأعصاب (Neuro-Ophthalmologist) أو عيادة الزرق.',
      'إجراء تصوير مقطعي لطبقة الألياف العصبية (RNFL-OCT) ومجال الرؤية المحوسب (Humphrey Visual Field 24-2).'
    ],
    stepsEn: [
      'Perform swinging flashlight test to assess Relative Afferent Pupillary Defect (RAPD).',
      'Test color desaturation (Red cap test) and perform gross confrontation visual fields.',
      'Refer to Neuro-Ophthalmology or Glaucoma Subspecialty clinic.',
      'Schedule Optical Coherence Tomography (RNFL-OCT) and automated Humphrey Visual Field (HVF 24-2).'
    ],
    referralTime: 'خلال 1 إلى 2 أسبوع لعيادة العيون والأعصاب',
    referralTimeEn: 'Within 1 to 2 weeks to Neuro-Ophthalmology Clinic',
    referralDestination: 'عيادة طب العيون والأعصاب / عيادة الجلوكوما التخصصية',
    referralDestinationEn: 'Neuro-Ophthalmology Subspecialty / Glaucoma Service',
    icon: 'ShieldAlert'
  },

  RES_OCULOMICS_NORMAL: {
    id: 'RES_OCULOMICS_NORMAL',
    type: 'ROUTINE',
    title: 'لم تُرصد تغيرات واضحة في قاع العين ضمن الفحص المتاح',
    titleEn: 'No Obvious Retinal Abnormalities Detected',
    englishTitle: 'No Obvious Retinal Abnormalities Detected',
    badgeText: 'لا تغيرات واضحة في الفحص 🟢',
    badgeTextEn: 'No Obvious Abnormalities 🟢',
    summary: 'لم تُرصد تغيرات مرضية واضحة في تراكيب الشبكية الظاهرة ضمن الفحص المتاح. ولا تستبعد هذه النتيجة وجود أمراض عينية أو قلبية وعائية أو عصبية أو جهازية. ويجب تحديد التقييم السريري والمتابعة وفق الأعراض والتاريخ المرضي وعوامل الخطورة الفردية.',
    summaryEn: 'No obvious abnormalities are identified in the visible retinal structures on the available examination. A normal-appearing fundus does not exclude ocular, cardiovascular, neurological, or systemic disease. Clinical assessment and follow-up should be guided by symptoms, medical history, and individual risk factors.',
    redFlags: [],
    redFlagsEn: [],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'توضيح عدم رصد تغيرات شبكية واضحة ضمن الفحص المتاح، مع التأكيد أن هذه النتيجة لا تستبعد وجود أمراض عينية أو جهازية.',
      'تشجيع الاستمرار في نمط الحياة الصحي وممارسة الرياضة والتغذية المتوازنة.',
      'تحديد موعد فحص العين التالي وفق التشخيص والعمر والأعراض وعوامل الخطورة والإرشادات السريرية المناسبة.'
    ],
    stepsEn: [
      'Explain that no obvious retinal abnormalities were detected on the available examination; this does not exclude ocular or systemic disease.',
      'Encourage sustained healthy lifestyle, routine physical activity, and balanced nutrition.',
      'Schedule the next eye examination according to diagnosis, age, symptoms, risk factors, and applicable clinical guidelines.'
    ],
    referralTime: 'متابعة وقائية حسب الحالة السريرية وعوامل الخطورة',
    referralTimeEn: 'Risk-Based Preventive Follow-Up',
    referralDestination: 'العيادة الميدانية / الرعاية الصحية الأولية',
    referralDestinationEn: 'Primary Healthcare / Field Vision Clinic',
    icon: 'CheckCircle2'
  }
};
