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
    id: 'vl_onset',
    pathTitle: 'ضعف أو هبوط بالرؤية',
    pathTitleEn: 'Visual Loss / Blur',
    question: 'كيف كان نمط هبوط / ضعف الرؤية لدى المريض؟',
    questionEn: 'What was the onset and pattern of the patient’s visual loss?',
    hint: 'حدد سرعة تدهور حدة الإبصار بدقة لتحديد درجة الإلحاح',
    hintEn: 'Assess the rapidity of vision deterioration to determine clinical urgency',
    options: [
      {
        label: 'مفاجئ (خلال دقائق إلى ساعات أو عند الاستيقاظ)',
        labelEn: 'Sudden onset (within minutes to hours or upon waking)',
        subLabel: 'تدهور سريع جداً وغير متوقع في حدة البصر',
        subLabelEn: 'Rapid, acute deterioration of visual acuity',
        next: 'vl_sudden_pain',
        icon: 'Zap'
      },
      {
        label: 'تدريجي (خلال أسابيع إلى أشهر أو سنوات)',
        labelEn: 'Gradual onset (over weeks, months, or years)',
        subLabel: 'تراجع بطيء ومستمر في جودة الرؤية',
        subLabelEn: 'Slow, progressive decline in vision quality',
        next: 'vl_gradual',
        icon: 'Clock'
      }
    ]
  },
  vl_sudden_pain: {
    pathTitle: 'هبوط رؤية مفاجئ',
    pathTitleEn: 'Sudden Visual Loss',
    question: 'هل الهبوط المفاجئ مصحوب بألم شديد في العين أو الصداع والغثيان؟',
    questionEn: 'Is the sudden visual loss accompanied by severe eye pain, headache, or nausea?',
    hint: 'الألم الحاد مع هبوط الرؤية علامة خطيرة لارتفاع ضغط العين الحاد أو التهاب قزحي حاد',
    hintEn: 'Severe pain with vision loss is a hallmark of acute glaucoma or acute uveitis',
    options: [
      {
        label: 'نعم، ألم شديد جداً مع احمرار/غباش قرنية وغثيان أو تقيؤ',
        labelEn: 'Yes, severe deep pain, corneal haziness, nausea or vomiting',
        subLabel: 'احتقان تاجي، حدقة شبه متسعة غير متفاعلة، قساوة المقلة باللمس',
        subLabelEn: 'Ciliary flush, mid-dilated fixed pupil, rock-hard globe on palpation',
        next: 'RES_GLAUCOMA',
        icon: 'AlertOctagon'
      },
      {
        label: 'لا، هبوط الرؤية بدون أي ألم إطلاقاً (Painless)',
        labelEn: 'No, visual loss is completely painless',
        subLabel: 'المريض لا يشكو من وجع أو احمرار مرافق',
        subLabelEn: 'No ocular pain, redness, or periocular ache reported',
        next: 'vl_painless_type',
        icon: 'EyeOff'
      }
    ]
  },
  vl_painless_type: {
    pathTitle: 'هبوط رؤية مفاجئ بدون ألم',
    pathTitleEn: 'Painless Sudden Visual Loss',
    question: 'ما هي الأعراض المصاحبة للهبوط المفاجئ غير المؤلم؟',
    questionEn: 'What specific associated visual symptoms does the patient report?',
    hint: 'تفريق انفصال الشبكية عن الحوادث الوعائية الخطيرة للشبكية',
    hintEn: 'Differentiating retinal detachment from retinal vascular occlusions (Stroke alert)',
    options: [
      {
        label: 'رؤية ستارة سوداء تسقط أو ووميض ضوئي (Flashes & Floaters)',
        labelEn: 'Descending black curtain/shadow or sudden light flashes & floaters',
        subLabel: 'فقدان جزء من المجال البصري كالستارة أو الأجسام العائمة',
        subLabelEn: 'Peripheral visual field loss or dark floaters shower',
        next: 'RES_RETINAL_DET',
        icon: 'CloudRain'
      },
      {
        label: 'فقدان رؤية مفاجئ كامل أو جزئي كالظلام التام (اشتباه انسداد وعائي CRAO/CRVO)',
        labelEn: 'Sudden complete blackness/darkness in one eye (CRAO / CRVO suspicion)',
        subLabel: 'انعدام مفاجئ للبصر في عين واحدة (Oculomics Alert)',
        subLabelEn: 'Acute painless blackout (Oculomics vascular emergency)',
        next: 'RES_OCULOMICS_ALERT',
        icon: 'Activity'
      }
    ]
  },
  vl_gradual: {
    pathTitle: 'ضعف رؤية تدريجي',
    pathTitleEn: 'Gradual Visual Loss',
    question: 'عند إجراء فحص الثقب الصغير (Pinhole Test)، هل تحسن البصر؟',
    questionEn: 'When performing the Pinhole Test, does visual acuity improve?',
    hint: 'فحص الثقب الدقيق يفرّق بين عيوب الانكسار الضوئية والأمراض العضوية للعين',
    hintEn: 'The pinhole test reliably differentiates refractive errors from organic ocular pathologies',
    options: [
      {
        label: 'نعم، تحسن البصر بشكل ملحوظ عبر الثقب (Pinhole Improved)',
        labelEn: 'Yes, vision markedly improved through pinhole (Refractive Error)',
        subLabel: 'علامة كلاسيكية تشير إلى عيب انكساري بالعين',
        subLabelEn: 'Classic optical indicator of uncorrected refractive error',
        next: 'RES_REFRACTIVE',
        icon: 'Glasses'
      },
      {
        label: 'لا، لم يتحسن البصر عبر الثقب (No Improvement)',
        labelEn: 'No, vision did not improve with pinhole (Organic cause)',
        subLabel: 'يشير إلى سبب عضوي في العدسة أو الشبكية أو العصب البصري',
        subLabelEn: 'Points to media opacity (cataract) or retinal/neural pathology',
        next: 'vl_gradual_cause',
        icon: 'ScanEye'
      }
    ]
  },
  vl_gradual_cause: {
    pathTitle: 'ضعف رؤية تدريجي عضوي',
    pathTitleEn: 'Organic Gradual Visual Loss',
    question: 'ما هي العلامة السريرية الأبرز وتاريخ المريض المرضي؟',
    questionEn: 'What is the primary examination finding and medical history?',
    hint: 'فحص الحدقة والعدسة بالكشاف وسؤال المريض عن السكري والضغط',
    hintEn: 'Inspect pupil with penlight for red reflex/cataract and check diabetes/hypertension status',
    options: [
      {
        label: 'بياض/تغير في لون الحدقة (عتمة بالعدسة / ماء أبيض)',
        labelEn: 'Whitish/greyish pupil opacity (Cataract / Media Opacity)',
        subLabel: 'عدم وضوح المنعكس الأحمر أو رؤية عتامة رمادية/بيضاء خلف الحدقة',
        subLabelEn: 'Diminished red reflex or visible lens opacification',
        next: 'RES_CATARACT',
        icon: 'CircleDot'
      },
      {
        label: 'العدسة شفافة والمريض لديه تاريخ سكري أو ارتفاع ضغط دم',
        labelEn: 'Clear crystalline lens with history of Diabetes or Hypertension',
        subLabel: 'اشتباه اعتلال الشبكية السكري أو المائي (DR / Oculomics)',
        subLabelEn: 'Suspected Diabetic/Hypertensive Retinopathy screening',
        next: 'RES_DR_SCREENING',
        icon: 'HeartPulse'
      }
    ]
  },

  // ==================== PATH 2: RED EYE ====================
  red_eye: {
    id: 're_pain',
    pathTitle: 'عين حمراء',
    pathTitleEn: 'Red Eye & Inflammation',
    question: 'هل احمرار العين مصحوب بألم شديد أو هبوط في حدة الرؤية؟',
    questionEn: 'Is the red eye accompanied by severe pain or reduced visual acuity?',
    hint: 'الألم الحاد أو تأثر النظر يحوّل العين الحمراء من روتينية إلى طارئة فوراً',
    hintEn: 'Severe pain, ciliary flush, or reduced vision indicates a sight-threatening emergency',
    options: [
      {
        label: 'نعم، يوجد ألم شديد أو انخفاض ملحوظ في حدة الرؤية',
        labelEn: 'Yes, severe deep pain or noticeable decrease in visual acuity',
        subLabel: 'ألم عميق، تحسس شديد من الضوء (Photophobia)، عدم وضوح النظر',
        subLabelEn: 'Deep ache, severe photophobia, blurred vision (Corneal / Uveal emergency)',
        next: 're_cornea_check',
        icon: 'AlertCircle'
      },
      {
        label: 'لا، انزعاج خفيف/حكة مع رؤية سليمة تماماً',
        labelEn: 'No, mild discomfort/itching with completely normal vision',
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
    id: 'RES_GLAUCOMA',
    type: 'URGENT',
    title: 'ارتفاع ضغط العين الحاد المغلق الزاوية',
    titleEn: 'Acute Angle-Closure Glaucoma (AACG)',
    englishTitle: 'Acute Angle-Closure Glaucoma (AACG)',
    badgeText: 'طوارئ عيون قصوى 🔴',
    badgeTextEn: 'Critical Ocular Emergency 🔴',
    summary: 'حالة طوارئ بصرية حادة تهدد العصب البصري بالعمى الدائم خلال ساعات نتيجة انغلاق زاوية التصريف وارتفاع حاد في ضغط العين (IOP > 40-60 mmHg).',
    summaryEn: 'Acute sight-threatening ophthalmic emergency causing irreversible optic nerve damage within hours due to trabecular outflow blockage and severe intraocular pressure spike (IOP > 40-60 mmHg).',
    redFlags: [
      'ألم عيني ورأسي مبرح مع غثيان وقيء متكرر',
      'حدقة شبه متسعة وغير متفاعلة للضوء (Mid-dilated sluggish/fixed pupil)',
      'عتامة في القرنية مع غباش شديد في الرؤية ورؤية هالات ملونة حول الأضواء',
      'قساوة مقلة العين كالحجر عند الجس المقارن برفق (Stony hard globe)'
    ],
    redFlagsEn: [
      'Severe excruciating ocular & frontal headache with nausea and vomiting',
      'Mid-dilated, vertically oval, unreactive fixed pupil',
      'Steamy/hazy cornea, blurred vision, and colored halos around lights',
      'Rock-hard eyeball on gentle digital palpation compared to normal eye'
    ],
    contraindications: [
      '⚠️ حظر تام لتغطية العين أو وضع أي ضمادة أو شاش.',
      '⚠️ حظر تام لإعطاء قطرات توسيع الحدقة (Mydriatics/Cycloplegics) لأنها تفاقم الانسداد فوراً!'
    ],
    contraindicationsEn: [
      '⚠️ NEVER patch or bandage the eye.',
      '⚠️ NEVER administer dilating drops (Mydriatics/Cycloplegics) - this will worsen pupillary block immediately!'
    ],
    steps: [
      'إعطاء خافضات ضغط العين المتاحة فوراً: قطرة Timolol 0.5% + قطرة Brimonidine 0.2% + قطرة Pilocarpine 2% (بعد انخفاض الضغط قليلاً).',
      'إعطاء حبوب Acetazolamide (Diamox) 500mg فموياً (إن توفرت ولم تكن هناك موانع كحساسية السلفا).',
      'تسكين الألم ومضاد قيء للحد من زيادة الضغط داخل العين.',
      'عدم تغطية العين نهائياً وإبقاء المريض مستلقياً مع رفع الرأس 30 درجة.',
      'تحويل طارئ فوري لمركز جراحة عيون لإجراء ثقب القزحية بالليزر (Laser Peripheral Iridotomy - LPI).'
    ],
    stepsEn: [
      'Administer available topical IOP-lowering drops: Timolol 0.5% + Brimonidine 0.2% + Pilocarpine 2% (after pressure begins to drop).',
      'Administer oral Acetazolamide (Diamox) 500mg stat (if available and no sulfa allergy).',
      'Provide systemic analgesia and antiemetics to prevent Valsalva-induced pressure spikes.',
      'Do NOT patch the eye; position patient supine with head elevated 30 degrees.',
      'Immediate emergency referral to an eye center for Laser Peripheral Iridotomy (LPI).'
    ],
    medications: [
      { name: 'Timolol 0.5% eye drops', dose: 'قطرة واحدة في العين المصابة فوراً', doseEn: '1 drop in affected eye immediately', note: 'احذر في مرضى الربو الشديد أو فشل القلب', noteEn: 'Caution in severe asthma or cardiac failure' },
      { name: 'Acetazolamide (Diamox) 500mg', dose: 'قرصين (500mg) بالفم فوراً', doseEn: '500mg orally stat', note: 'خافض جهازي لضغط السائل العيني', noteEn: 'Systemic carbonic anhydrase inhibitor' },
      { name: 'Pilocarpine 2%', dose: 'قطرة واحدة بعد بدء هبوط الضغط', doseEn: '1 drop after initial pressure reduction', note: 'لقبض الحدقة وفتح الزاوية', noteEn: 'Induces miosis to open iridocorneal angle' }
    ],
    referralTime: 'خلال 2 إلى 4 ساعات كحد أقصى (فوري)',
    referralTimeEn: 'Within 2 to 4 hours maximum (Immediate)',
    referralDestination: 'قسم طوارئ عيون مجهز بمصباح شقي وليزر YAG',
    referralDestinationEn: 'Ophthalmic Emergency Dept with Slit-Lamp & YAG Laser',
    icon: 'AlertOctagon'
  },

  RES_RETINAL_DET: {
    id: 'RES_RETINAL_DET',
    type: 'URGENT',
    title: 'اشتباه انفصال شبكية حاد',
    titleEn: 'Suspected Rhegmatogenous Retinal Detachment (RRD)',
    englishTitle: 'Suspected Rhegmatogenous Retinal Detachment (RRD)',
    badgeText: 'حالة جراحية طارئة 🔴',
    badgeTextEn: 'Surgical Emergency 🔴',
    summary: 'انفصال الطبقة الحساسة للشبكية عن الظهارة الصباغية، يتطلب تدخلاً جراحياً عاجلاً قبل وصول الانفصال إلى لطخة الإبصار (Macula-off) لمنع العجز البصري الدائم.',
    summaryEn: 'Separation of neurosensory retina from underlying retinal pigment epithelium (RPE), demanding prompt vitreoretinal surgery before macular involvement (Macula-off) to prevent irreversible visual loss.',
    redFlags: [
      'رؤية ستارة أو ظل مظلم يزحف تدريجياً عبر حقل الرؤية',
      'وميض ضوئي مفاجئ (Photopsia) في المحيط',
      'ظهور مفاجئ لكميات كبيرة من الأجسام العائمة الشبيهة بالسخام (Floaters shower)'
    ],
    redFlagsEn: [
      'Descending dark curtain or peripheral shadow expanding across visual field',
      'Sudden peripheral light flashes (Photopsia)',
      'Sudden onset dense shower of black floaters/spots'
    ],
    contraindications: [
      '⚠️ حظر الإجهاد البدني، حمل الأثقال، أو حركات الرأس العنيفة.',
      '⚠️ حظر الضغط على مقلة العين.'
    ],
    contraindicationsEn: [
      '⚠️ Avoid vigorous head movements, heavy lifting, or physical exertion.',
      '⚠️ Do not apply external pressure on the globe.'
    ],
    steps: [
      'تنبيه المريض بالراحة التامة والاستلقاء الهادئ وتجنب الحركات المفاجئة للرأس.',
      'تغطية خفيفة للعين لحمايتها ومنع إجهاد حركة العين السريعة.',
      'فحص حدة البصر في كلتا العينين وتسجيلها بدقة في تقرير التحويل.',
      'تحويل جراحي عاجل لمستشفى تخصصي مزود بجراح شبكية (Vitreoretinal Surgeon) خلال 24-48 ساعة.'
    ],
    stepsEn: [
      'Instruct patient to maintain quiet bed rest and avoid sudden head movements.',
      'Place a light eye shield/patch to minimize saccadic eye movement strain.',
      'Measure visual acuity in both eyes and document precisely in referral report.',
      'Urgent surgical transfer to a tertiary hospital with Vitreoretinal surgeon within 24-48 hours.'
    ],
    referralTime: 'خلال 24 إلى 48 ساعة (عاجل جداً)',
    referralTimeEn: 'Within 24 to 48 hours (Highly Urgent)',
    referralDestination: 'وحدة جراحة الشبكية والجسم الزجاجي (Vitreoretinal Unit)',
    referralDestinationEn: 'Vitreoretinal Surgical Unit',
    icon: 'CloudRain'
  },

  RES_OCULOMICS_ALERT: {
    id: 'RES_OCULOMICS_ALERT',
    type: 'URGENT',
    title: 'انسداد وعائي بالشبكية / إنذار جهازي وعائي',
    titleEn: 'Central Retinal Vascular Occlusion (CRAO / CRVO - Stroke Alert)',
    englishTitle: 'Central Retinal Artery/Vein Occlusion (CRAO / CRVO - Oculomics Alert)',
    badgeText: 'طوارئ وعائية قصوى 🔴',
    badgeTextEn: 'Vascular Emergency / Stroke Alert 🔴',
    summary: 'انسداد شريان أو وريد الشبكية المركزي هو سكتة شبكية عينية (Eye Stroke)، ويعد مؤشراً حرجاً لخطر وشيك لسكتة دماغية أو احتشاء قلبي حاد.',
    summaryEn: 'Central retinal artery/vein occlusion represents an ocular stroke, carrying an immediate high risk for impending cerebrovascular stroke or acute myocardial infarction.',
    redFlags: [
      'فقدان مفاجئ وشديد للبصر بدون ألم خلال ثوانٍ أو دقائق',
      'وجود عيب حدقي وارد نسبي (Relative Afferent Pupillary Defect - RAPD)',
      'تاريخ مرضي بارتفاع الضغط، السكري، التدخين، أو أمراض القلب التصلبية'
    ],
    redFlagsEn: [
      'Sudden, profound, painless loss of vision occurring in seconds to minutes',
      'Presence of Relative Afferent Pupillary Defect (RAPD / Marcus Gunn pupil)',
      'Comorbid vascular risk factors: hypertension, diabetes, carotid disease, smoking'
    ],
    contraindications: [
      '⚠️ لا تتجاهل التقييم القلبي الوعائي الفوري للمريض.',
      '⚠️ تجنب إهدار الوقت في قطرات غير موجهة.'
    ],
    contraindicationsEn: [
      '⚠️ Do not ignore immediate cardiovascular/stroke risk evaluation.',
      '⚠️ Do not waste precious time with ineffective topical drops.'
    ],
    steps: [
      'قياس ضغط الدم، سكر الدم العشوائي، وتخطيط القلب (ECG) فوراً في المركز الميداني.',
      'في اشتباه انسداد الشريان المركزي (CRAO) في الساعات الأولى (< 4 ساعات): تدليك خفيف لمقلة العين متقطع لتحريك الصمة وإعطاء أكسجين إن توفر.',
      'إعطاء قرص أسبرين 300mg فموياً (إن لم تكن هناك موانع لنزف حاد).',
      'تحويل عاجل مشترك لطوارئ العيون + قسم الباطنة / السكتات الدماغية والقلب.'
    ],
    stepsEn: [
      'Immediately check vital signs, blood glucose, and perform 12-lead ECG at field station.',
      'In early CRAO (< 4 hours): perform gentle ocular digital massage (15s on/off) and provide supplemental high-flow oxygen if available.',
      'Administer soluble Aspirin 300mg orally (if no active hemorrhagic contraindications).',
      'Immediate co-referral to Ophthalmology Emergency + Acute Stroke / Cardiology Unit.'
    ],
    medications: [
      { name: 'Aspirin 300mg', dose: 'قرص واحد للمضغ فموياً', doseEn: '300mg chewable oral tablet', note: 'بعد التأكد من عدم وجود موانع تخثرية نشطة', noteEn: 'Verify absence of active GI bleeding or hemorrhagic stroke' }
    ],
    referralTime: 'فوري (خلال دقائق إلى ساعة كحالة Stroke)',
    referralTimeEn: 'Immediate (within minutes to 1 hour as Stroke protocol)',
    referralDestination: 'طوارئ مستشفى عام متكامل (عيون + باطنة وعائية + أعصاب)',
    referralDestinationEn: 'Comprehensive Emergency Dept (Ophthalmology + Stroke/Neuro Team)',
    icon: 'Activity'
  },

  RES_REFRACTIVE: {
    id: 'RES_REFRACTIVE',
    type: 'ROUTINE',
    title: 'أخطاء انكسارية بصرية',
    titleEn: 'Refractive Error (Myopia, Hyperopia, Astigmatism, Presbyopia)',
    englishTitle: 'Refractive Error (Myopia, Hyperopia, Astigmatism, Presbyopia)',
    badgeText: 'حالة روتينية انكسارية 🟢',
    badgeTextEn: 'Routine Optical Care 🟢',
    summary: 'ضعف الرؤية ناتج عن عدم تركز الضوء بدقة على الشبكية بسبب شكل المقلة أو مرونة العدسة، ويتحسن مباشرة عند استخدام الثقب الصغير (Pinhole). لا يوجد خطر عضوي.',
    summaryEn: 'Visual blurring is caused by optical focal mismatch on the retina, corrected immediately with the Pinhole occluder. No organic or sight-threatening pathology present.',
    redFlags: [],
    redFlagsEn: [],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'طمأنة المريض بأن صحة العين الداخلية والعصب البصري والقرنية سليمة تماماً.',
      'شرح نتيجة فحص الثقب الصغير (Pinhole) الإيجابي للمريض وكيف تحسن البصر.',
      'توجيه المريض لمركز فحص بصريات مجاور أو قافلة قياس النظر للحصول على نظارة طبية ملائمة.'
    ],
    stepsEn: [
      'Reassure the patient that the cornea, lens, optic nerve, and retina are healthy.',
      'Explain the positive Pinhole test result demonstrating optical focus improvement.',
      'Direct patient to optometry clinic or mobile vision caravan for corrective prescription glasses.'
    ],
    referralTime: 'عيادة بصريات روتينية خلال أسبوعين إلى شهر',
    referralTimeEn: 'Routine Optometry appointment within 2-4 weeks',
    referralDestination: 'أخصائي بصريات / مركز فحص النظر',
    referralDestinationEn: 'Optometrist / Vision Screening Caravan',
    icon: 'Glasses'
  },

  RES_CATARACT: {
    id: 'RES_CATARACT',
    type: 'ROUTINE',
    title: 'الساد / المياه البيضاء الشيخوخية',
    titleEn: 'Senile / Complicated Cataract',
    englishTitle: 'Senile / Complicated Cataract',
    badgeText: 'حالة جراحية مجدولة 🟢',
    badgeTextEn: 'Elective Surgical Care 🟢',
    summary: 'عتمة تدريجية في عدسة العين الطبيعية تمنع نفاذ الضوء بوضوح. السبب الأول للعمى القابل للعلاج بالعالم، ونسبة نجاح استعادة البصر بالجراحة ممتازة.',
    summaryEn: 'Gradual opacification of the natural crystalline lens impairing light transmission. Leading cause of treatable blindness globally, with >98% surgical visual restoration success.',
    redFlags: [
      'تأكد من عدم وجود احمرار شديد أو ارتفاع ضغط مصاحب (Phacomorphic glaucoma)'
    ],
    redFlagsEn: [
      'Ensure absence of severe red eye or secondary lens-induced glaucoma'
    ],
    contraindications: [
      '⚠️ لا داعي للاستعجال بالطوارئ ما لم يرتفع ضغط العين أو تلتهب.'
    ],
    contraindicationsEn: [
      '⚠️ No emergency intervention required unless complicated by intraocular hypertension or uveitis.'
    ],
    steps: [
      'طمأنة المريض وأهله بأن المياه البيضاء حالة شائعة جداً وتستجيب لجراحة استحلاب العدسة وزرع عدسة صناعية بنسبة نجاح تفوق 98%.',
      'فحص حركات العين واستجابة الحدقة للضوء للتأكد من سلامة العصب البصري خلف العتامة.',
      'تسجيل بيانات المريض في كشوفات قوافل جراحة المياه البيضاء المجانية والمخيمات الجراحية الميدانية.'
    ],
    stepsEn: [
      'Reassure patient that modern phacoemulsification/IOL surgery has an exceptional visual recovery rate (>98%).',
      'Check pupillary reflexes to confirm intact optic nerve function behind the cataract.',
      'Enroll patient into elective ophthalmic surgical list or free mobile cataract surgery camp.'
    ],
    referralTime: 'جدولة روتينية ضمن قوائم العمليات / القوافل الطبية',
    referralTimeEn: 'Elective scheduling with cataract surgical mission',
    referralDestination: 'عيادة جراحة العيون / قوافل مكافحة العمى الميدانية',
    referralDestinationEn: 'Ophthalmic Surgical Clinic / Vision Outreach Camps',
    icon: 'CircleDot'
  },

  RES_DR_SCREENING: {
    id: 'RES_DR_SCREENING',
    type: 'FIELD',
    title: 'فحص اعتلال الشبكية السكري والضغطي (Oculomics)',
    titleEn: 'Diabetic & Hypertensive Retinopathy Screening',
    englishTitle: 'Diabetic / Hypertensive Retinopathy Screening',
    badgeText: 'متابعة وفحص ميداني 🟡',
    badgeTextEn: 'Field Screening & Referral 🟡',
    summary: 'تأثير مرض السكري وضغط الدم المزمن على الشعيرات الدقيقة للشبكية. يستلزم فحص قاع العين الدوري وضبط السكر التراكمي للوقاية من فقدان البصر.',
    summaryEn: 'Chronic microvascular retinal damage from diabetes mellitus and hypertension. Requires regular fundus imaging and strict glycemic control to prevent preventable blindness.',
    redFlags: [
      'ظهور عتامات مفاجئة تدل على نزف زجاجي (Vitreous hemorrhage)',
      'تراجع حاد في الرؤية المركزية يشير لوذمة لطخية سكرية (Diabetic Macular Edema - DME)'
    ],
    redFlagsEn: [
      'Sudden dense dark floaters indicative of vitreous hemorrhage',
      'Rapid drop in central visual acuity suggesting diabetic macular edema (DME)'
    ],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'التقاط صورة لقاع العين باستخدام الهاتف الذكي مع عدسة فحص الشبكية المحمولة إن توفرت (Fundus Camera / 20D lens).',
      'فحص سكر الدم التراكمي (HbA1c) وضغط الدم وتوثيقهما.',
      'توعية المريض بأهمية الضبط الصارم للسكر (HbA1c < 7%) والضغط لحماية الأوعية الدقيقة.',
      'تحويل لعيادة شبكية لإجراء تصوير مقطعي للشبكية (OCT) وحقن دوائي أو ليزر عند الحاجة.'
    ],
    stepsEn: [
      'Capture mobile smartphone fundus photograph using portable condensing lens if available.',
      'Record HbA1c and blood pressure values in patient referral card.',
      'Educate patient on rigorous glycemic (HbA1c < 7%) and blood pressure target control.',
      'Refer to retina clinic for Optical Coherence Tomography (OCT) and anti-VEGF / laser evaluation.'
    ],
    referralTime: 'خلال أسبوعين إلى شهر لعيادة الشبكية',
    referralTimeEn: 'Within 2 to 4 weeks to Retina Clinic',
    referralDestination: 'عيادة شبكية العيون + عيادة الباطنة والسكري',
    referralDestinationEn: 'Retina Subspecialty Clinic + Diabetic Management Team',
    icon: 'HeartPulse'
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
      '⛔ حظر تام ونهائي ومطلق لوصف أي قطرات تحتوي على الكورتيزون (Steroids / Dexamethasone / Prednisolone)! الكورتيزون يؤدي لانثقاب القرنية السريع!',
      '⛔ حظر تغطية العين بضمادة لاصقة دافئة لأنها تسرع تكاثر البكتيريا اللاهوائية.'
    ],
    contraindicationsEn: [
      '⛔ ABSOLUTE CONTRAINDICATION: NEVER prescribe steroid eye drops (Dexamethasone/Prednisolone)! Steroids cause rapid stromal melt & perforation!',
      '⛔ NEVER apply tight patch/bandage over corneal ulcer as it accelerates anaerobic bacterial growth.'
    ],
    steps: [
      'البدء فوراً بقطرة مضاد حيوي واسع الطيف فلوروكينولون (مثل Moxifloxacin 0.5% أو Ofloxacin 0.3%) قطرة كل 15-30 دقيقة في أول ساعتين، ثم كل ساعة على مدار الساعة.',
      'إعطاء قطرة مرخية للعضلة الهدبية لتخفيف التشنج والألم (Cyclopentolate 1%).',
      'حظر الكورتيزون والضمادات حظراً باتاً.',
      'تحويل عاجل جداً لأخصائي قرنية خلال 24 ساعة لعمل مسحة وتحديد خطة العلاج.'
    ],
    stepsEn: [
      'Start intensive broad-spectrum fluoroquinolone drops (Moxifloxacin 0.5% or Ofloxacin 0.3%) 1 drop every 15-30 mins for 2 hours, then hourly around the clock.',
      'Instill Cyclopentolate 1% cycloplegic drops to relieve ciliary spasm and pain.',
      'Strictly avoid topical steroids and eye patching.',
      'Urgent transfer to cornea specialist within 24 hours for scrapings, culture, and fortified antibiotics.'
    ],
    medications: [
      { name: 'Moxifloxacin 0.5% drops (Vigamox)', dose: 'قطرة كل ساعة على مدار 24 ساعة', doseEn: '1 drop hourly around the clock', note: 'المضاد الحيوي الأول لقرحة القرنية', noteEn: 'First-line intensive corneal antibiotic' },
      { name: 'Cyclopentolate 1% drops', dose: 'قطرة مرتين إلى 3 مرات يومياً', doseEn: '1 drop 2-3 times daily', note: 'لتسكين تشنج الجسم الهدبي ومنع الالتصاقات', noteEn: 'Relieves ciliary spasm and prevents posterior synechiae' }
    ],
    referralTime: 'خلال 24 ساعة كحد أقصى',
    referralTimeEn: 'Within 24 hours maximum (Urgent)',
    referralDestination: 'أخصائي قرنية / مستشفى عيون مرجعي',
    referralDestinationEn: 'Cornea Specialist / Tertiary Eye Hospital',
    icon: 'ShieldAlert'
  },

  RES_UVEITIS: {
    id: 'RES_UVEITIS',
    type: 'URGENT',
    title: 'التهاب القزحية والجسم الهدبي الحاد',
    titleEn: 'Acute Anterior Uveitis / Iridocyclitis',
    englishTitle: 'Acute Anterior Uveitis / Iridocyclitis',
    badgeText: 'حالة عيون طارئة 🔴',
    badgeTextEn: 'Ocular Emergency 🔴',
    summary: 'التهاب مناعي أو جرثومي يصيب القزحية والجسم الهدبي، يتظاهر بألم عميق، احتقان تاجي، رهاب ضديد للضوء، وحدقة ضيقة غير منتظمة.',
    summaryEn: 'Intraocular inflammation of iris and ciliary body characterized by deep aching pain, ciliary flush, severe photophobia, and constricted sluggish pupil.',
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
      '⚠️ لا تبدأ قطرات الكورتيزون إلا بعد استبعاد قرحة القرنية بصبغة الفلوريسين تماماً.'
    ],
    contraindicationsEn: [
      '⚠️ Never start topical steroids without first performing fluorescein staining to rule out herpes/corneal ulcer.'
    ],
    steps: [
      'وضع قطرة توسيع الحدقة (Cyclopentolate 1% أو Atropine 1%) لشل العضلة الهدبية وتخفيف الألم ومنع التصاق القزحية بالعدسة.',
      'إعطاء مسكنات ألم فموية (مثل Paracetamol أو Ibuprofen).',
      'ارتداء نظارة شمسية داكنة لتخفيف رهاب الضوء المزعج.',
      'تحويل لأخصائي العيون خلال 24-48 ساعة لتقييم الخلايا بالمصباح الشقي ووصف الكورتيزون المناسب والبحث عن أسباب مناعية جهازية.'
    ],
    stepsEn: [
      'Instill cycloplegic drops (Cyclopentolate 1% or Atropine 1%) to paralyze ciliary body, break synechiae, and relieve deep ache.',
      'Prescribe oral analgesics (Paracetamol 1g or Ibuprofen 400mg).',
      'Advise wearing dark sunglasses to reduce discomfort from photophobia.',
      'Refer to ophthalmologist within 24-48 hours for slit-lamp anterior chamber cell grading and targeted topical steroid therapy.'
    ],
    medications: [
      { name: 'Cyclopentolate 1% drops', dose: 'قطرة 3 مرات يومياً', doseEn: '1 drop 3 times daily', note: 'لتوسيع الحدقة وفك الالتصاقات وتسكين التشنج', noteEn: 'Cycloplegia and synechiae prevention' },
      { name: 'Paracetamol 1g / Ibuprofen 400mg', dose: 'قرص كل 8 ساعات عند اللزوم', doseEn: '1 tablet every 8 hours PRN', note: 'لتسكين الألم العيني والصدغي', noteEn: 'Systemic analgesia' }
    ],
    referralTime: 'خلال 24 إلى 48 ساعة',
    referralTimeEn: 'Within 24 to 48 hours',
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
    summary: 'وجود لويحات كوليسترول شريانية (Hollenhorst plaques)، تضيق شديد في الشرايين الشبكية، أو تقاطعات وعائية غائرة (Gunn sign) يشير إلى تصلب شرايين جهازي متقدم وخطر مرتفع جداً لسكتة دماغية (Stroke/TIA) أو احتشاء قلبي.',
    summaryEn: 'Retinal cholesterol emboli (Hollenhorst plaques), severe arteriolar attenuation, and marked AV crossing changes are direct ocular proxies for carotid stenosis, systemic atherosclerosis, and impending stroke/myocardial infarction.',
    redFlags: [
      'أعراض عصبية عابرة مثل شلل خفيف مؤقت، صعوبة نطق، أو تنميل (TIA)',
      'تاريخ نوبات إقفارية عابرة بفقدان البصر المؤقت في عين واحدة (Amaurosis Fugax)',
      'ارتفاع ضغط دم حاد غير مسيطر عليه'
    ],
    redFlagsEn: [
      'Transient neurologic deficits: weakness, dysarthria, numbness (TIA)',
      'Episodes of transient monocular visual loss (Amaurosis Fugax)',
      'Severely elevated systemic blood pressure'
    ],
    contraindications: [
      '⚠️ حظر تجاهل فحص الشريان السباتي وتخطيط القلب.',
      '⚠️ لا تكتفِ بفحص العين فقط؛ المريض يحتاج تقييماً قلبياً وعائياً فورياً لمنع السكتة الدماغية.'
    ],
    contraindicationsEn: [
      '⚠️ NEVER neglect urgent carotid Doppler and cardiac evaluation.',
      '⚠️ Do not treat as isolated eye finding; requires immediate cardiovascular workup to prevent catastrophic stroke.'
    ],
    steps: [
      'قياس العلامات الحيوية فوراً: ضغط الدم في كلا الذراعين، وتخطيط القلب (12-Lead ECG).',
      'تحويل عاجل لقسم القلب والأوعية الدموية والسكتات الدماغية لإجراء سونار الدوبلر للشرايين السباتية (Carotid Doppler Ultrasound) لكشف التضيق أو اللويحات المتصلبة.',
      'طلب تصوير صدى القلب (Echocardiogram) وتخطيط هولتر 24 ساعة للبحث عن الرجفان الأذيني (Atrial Fibrillation) أو مصدر صمات قلبية.',
      'تقييم البدء بالعلاجات الخافضة للدهون (High-intensity Statins) ومضادات الصفيحات (Aspirin) من قبل طبيب القلب/الباطنة.'
    ],
    stepsEn: [
      'Immediately obtain bilateral arm blood pressure measurements and 12-lead ECG at field station.',
      'Urgent referral to Vascular Medicine / Stroke Prevention for Bilateral Carotid Doppler Ultrasound to assess carotid stenosis/plaques.',
      'Echocardiogram and 24-hour Holter monitoring to screen for embolic cardiac sources and occult Atrial Fibrillation.',
      'Optimization of cardioprotective pharmacotherapy (High-potency Statins, Antiplatelet agent) under specialist care.'
    ],
    referralTime: 'عاجل خلال 24 إلى 48 ساعة كحد أقصى (فوري إذا صاحبه فقدان بصر مؤقت أو أعراض عصبية)',
    referralTimeEn: 'Urgent within 24-48h (Immediate if accompanied by TIA or Amaurosis Fugax)',
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
    title: 'قاع العين سليم / مؤشرات حيوية شبكية طبيعية (Optimal Oculomics)',
    titleEn: 'Normal Retinal Microvasculature & Optic Disc (Low Oculomics Risk)',
    englishTitle: 'Healthy Fundus & Optimal Systemic Microvascular Biomarkers',
    badgeText: 'مؤشرات ممتازة ووقاية سنوية 🟢',
    badgeTextEn: 'Optimal Biomarkers 🟢',
    summary: 'الأوعية الدموية الشبكية وقرص العصب البصري واللطخة الصفراء في حالة صحية ممتازة. المؤشرات الميكرووعائية للجسم تعكس مرونة الشرايين وسلامة الدورة الدموية.',
    summaryEn: 'Retinal microvasculature, optic nerve head, and macula exhibit normal physiological architecture. Microvascular biomarkers indicate healthy vascular compliance and optimal baseline systemic profile.',
    redFlags: [],
    redFlagsEn: [],
    contraindications: [],
    contraindicationsEn: [],
    steps: [
      'طمأنة المريض بسلامة فحص قاع العين والأوعية الدموية والعصب البصري.',
      'تشجيع الاستمرار في نمط الحياة الصحي وممارسة الرياضة والتغذية المتوازنة.',
      'جدولة الفحص الوقائي السنوي الدوري لقاع العين، خاصة لمرضى السكري والضغط.'
    ],
    stepsEn: [
      'Reassure patient of clear, healthy fundus and intact retinal microvasculature.',
      'Encourage sustained healthy lifestyle, routine physical activity, and balanced nutrition.',
      'Schedule standard annual preventive retinal screening, particularly for diabetic and hypertensive individuals.'
    ],
    referralTime: 'فحص وقائي سنوي روتيني (Annual Checkup)',
    referralTimeEn: 'Routine Annual Preventive Screening',
    referralDestination: 'العيادة الميدانية / الرعاية الصحية الأولية',
    referralDestinationEn: 'Primary Healthcare / Field Vision Clinic',
    icon: 'CheckCircle2'
  }
};
