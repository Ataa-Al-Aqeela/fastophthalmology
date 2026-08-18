import React, { useState } from 'react';
import { 
  Stethoscope, 
  X, 
  Glasses, 
  Flame, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BedsideToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BedsideToolsModal: React.FC<BedsideToolsModalProps> = ({ isOpen, onClose }) => {
  const { lang, t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pinhole' | 'redeye_table' | 'visual_acuity' | 'open_globe' | 'fluorescein'>('pinhole');

  if (!isOpen) return null;

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
            <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-['Cairo']">
                {t.bedsideToolsTitle}
              </h2>
              <p className="text-[11px] text-slate-400">
                {lang === 'ar' ? 'دليل الفحص السريري وسرير المريض في المناطق النائية' : 'Clinical examination guides & rapid bedside triage techniques'}
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-3 bg-slate-900 border-b border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('pinhole')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'pinhole'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>{t.tabPinhole}</span>
          </button>

          <button
            onClick={() => setActiveTab('redeye_table')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'redeye_table'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{t.tabRedEyeTable}</span>
          </button>

          <button
            onClick={() => setActiveTab('visual_acuity')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'visual_acuity'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.tabVisualAcuity}</span>
          </button>

          <button
            onClick={() => setActiveTab('open_globe')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'open_globe'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.tabOpenGlobe}</span>
          </button>

          <button
            onClick={() => setActiveTab('fluorescein')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'fluorescein'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.tabFluorescein}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 text-xs sm:text-sm text-slate-300 space-y-4">
          
          {/* TAB 1: PINHOLE */}
          {activeTab === 'pinhole' && (
            <div className="space-y-4">
              <div className="bg-blue-950/40 border border-blue-800/40 p-4 rounded-xl space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-blue-300 font-['Cairo'] flex items-center gap-2">
                  <Glasses className="w-5 h-5 text-blue-400" />
                  <span>{lang === 'ar' ? 'فحص الثقب الدقيق (Pinhole Acuity Test)' : 'Pinhole Acuity Test'}</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {lang === 'ar' 
                    ? 'أهم فحص ميداني وسريع على الإطلاق للتمييز بين الأخطاء الانكسارية (Refractive Error) التي تحتاج فقط لنظارة، وبين أمراض العين العضوية (مثل الساد، اعتلال الشبكية، أو مشاكل العصب البصري).'
                    : 'The single most decisive field test to differentiate Refractive Errors (correctable with glasses) from organic ocular pathologies (cataracts, macular disease, optic neuropathies).'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إذا تحسنت الرؤية عبر الثقب (Pinhole Improved)' : 'Vision Improves With Pinhole'}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'الثقب يحجب الأشعة الضوئية المحيطية الشاردة ويسمح فقط للأشعة المركزية بالنفاذ إلى اللطخة؛ مما يعني أن الشبكية والقرنية والعصب سليمون والمشكلة هي مجرد خطأ انكساري (قصر/طول نظر/استجماتيزم).'
                      : 'The pinhole blocks aberrant peripheral rays and allows only parallel central rays to hit the fovea. Confirms intact media/retina/nerve with simple refractive error.'}
                  </p>
                  <div className="text-[11px] text-emerald-300 font-medium bg-emerald-950/40 p-2 rounded-lg">
                    {lang === 'ar' ? 'التوجيه: طمأنة المريض + تحويل لمركز بصريات لتفصيل نظارة.' : 'Action: Reassure patient & refer for outpatient refraction.'}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'إذا لم تتحسن الرؤية (No Improvement)' : 'No Vision Improvement'}</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'يشير مباشرة لوجود عتامة في الأوساط الكاسرة (مثل الساد / Cataract، سحابة قرنية) أو تلف عصبي أو شبكي (اعتلال شبكية سكري، ضمور لطخة، جلوكوما).'
                      : 'Points to media opacity (cataract, corneal haze), vascular/retinal pathology, or optic nerve damage.'}
                  </p>
                  <div className="text-[11px] text-rose-300 font-medium bg-rose-950/40 p-2 rounded-lg">
                    {lang === 'ar' ? 'التوجيه: فحص العدسة والحدقة وقاع العين وتحويل لأخصائي العيون.' : 'Action: Urgent or specialized ophthalmology referral.'}
                  </div>
                </div>
              </div>

              {/* How to make a field pinhole */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'كيف تصنع ثقباً دقيقاً (Pinhole) في الميدان إذا لم يتوفر جهاز فحص؟' : 'How to create a makeshift Pinhole in remote field settings:'}</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {lang === 'ar'
                    ? 'احضر قطعة كرتون أو بطاقة ورقية سميكة، واثقب منتصفها بدبوس أو إبرة سرنجة معقمة (قطر حوالي 1-1.5 مم). اطلب من المريض إغلاق العين السليمة والنظر عبر الثقب الصغير بالعين الضعيفة وملاحظة تحسن لوحة العلامات أو التفاصيل.'
                    : 'Take an opaque card or thick paper. Puncture a 1.0 to 1.5 mm central hole using a sterile needle or pin. Occlude the fellow eye and have the patient read through the aperture.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: RED EYE TABLE */}
          {activeTab === 'redeye_table' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200 font-['Cairo']">
                {lang === 'ar' ? 'الجدول السريري المقارن لتشخيص العين الحمراء (Red Eye Differential)' : 'Red Eye Clinical Differential Diagnosis Matrix'}
              </h3>
              <div className="overflow-x-auto">
                <table className={`w-full ${dir === 'rtl' ? 'text-right' : 'text-left'} text-xs border-collapse border border-slate-800`}>
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="p-2.5 border-l border-slate-800">{lang === 'ar' ? 'العلامة السريرية' : 'Clinical Feature'}</th>
                      <th className="p-2.5 border-l border-slate-800 text-amber-300">{lang === 'ar' ? 'التهاب الملتحمة (Conjunctivitis)' : 'Conjunctivitis'}</th>
                      <th className="p-2.5 border-l border-slate-800 text-rose-400">{lang === 'ar' ? 'قرحة القرنية (Corneal Ulcer)' : 'Corneal Ulcer'}</th>
                      <th className="p-2.5 border-l border-slate-800 text-red-400">{lang === 'ar' ? 'ارتفاع الضغط الحاد (Glaucoma)' : 'Acute Glaucoma (AACG)'}</th>
                      <th className="p-2.5 text-purple-300">{lang === 'ar' ? 'التهاب القزحية (Uveitis)' : 'Anterior Uveitis'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold bg-slate-950/60 border-l border-slate-800">{lang === 'ar' ? 'الألم' : 'Pain'}</td>
                      <td className="p-2.5 border-l border-slate-800">{lang === 'ar' ? 'انزعاج / حكة / حرقان' : 'Discomfort / Gritty / Itch'}</td>
                      <td className="p-2.5 border-l border-slate-800 font-bold text-rose-300">{lang === 'ar' ? 'شديد مع وخز شديد' : 'Severe sharp foreign body'}</td>
                      <td className="p-2.5 border-l border-slate-800 font-bold text-red-400">{lang === 'ar' ? 'مبرح مع صداع وغثيان' : 'Excruciating with headache/nausea'}</td>
                      <td className="p-2.5 text-purple-200">{lang === 'ar' ? 'عميق ومؤلم مع الضوء' : 'Deep ache & severe photophobia'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold bg-slate-950/60 border-l border-slate-800">{lang === 'ar' ? 'حدة الإبصار' : 'Visual Acuity'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-emerald-400">{lang === 'ar' ? 'طبيعية تماماً' : 'Completely Normal'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-rose-400">{lang === 'ar' ? 'منخفضة / متأثرة' : 'Decreased'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-red-400">{lang === 'ar' ? 'هبوط حاد ورؤية هالات' : 'Severely reduced + halos'}</td>
                      <td className="p-2.5 text-purple-300">{lang === 'ar' ? 'غباش خفيف إلى متوسط' : 'Mild to moderately blurred'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold bg-slate-950/60 border-l border-slate-800">{lang === 'ar' ? 'القرنية' : 'Cornea'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-emerald-400">{lang === 'ar' ? 'شفافة ولامعة' : 'Clear & lustrous'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-rose-400 font-bold">{lang === 'ar' ? 'بقعة بيضاء / عتامة مرئية' : 'White infiltrate / ulcer defect'}</td>
                      <td className="p-2.5 border-l border-slate-800 text-red-400">{lang === 'ar' ? 'وذمة وغباش عام (Steamy)' : 'Steamy cloudy edema'}</td>
                      <td className="p-2.5 text-purple-300">{lang === 'ar' ? 'شفافة أو رواسب خلفية' : 'Clear / Keratic precipitates'}</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold bg-slate-950/60 border-l border-slate-800">{lang === 'ar' ? 'حجم الحدقة' : 'Pupil'}</td>
                      <td className="p-2.5 border-l border-slate-800">{lang === 'ar' ? 'طبيعية ومتفاعلة' : 'Normal & reactive'}</td>
                      <td className="p-2.5 border-l border-slate-800">{lang === 'ar' ? 'طبيعية أو ضيقة قليلاً' : 'Normal / reactive'}</td>
                      <td className="p-2.5 border-l border-slate-800 font-bold text-red-400">{lang === 'ar' ? 'شبه متسعة وثابتة' : 'Mid-dilated, fixed, oval'}</td>
                      <td className="p-2.5 font-bold text-purple-300">{lang === 'ar' ? 'ضيقة وغير منتظمة' : 'Constricted / Irregular (Miosis)'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: VISUAL ACUITY */}
          {activeTab === 'visual_acuity' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400 font-['Cairo'] flex items-center gap-2">
                  <Eye className="w-5 h-5 text-emerald-400" />
                  <span>{lang === 'ar' ? 'التسلسل القياسي لتوثيق حدة البصر في حالات الهبوط الشديد (Triage Scale)' : 'Standardized Low Vision & Triage Acuity Progression Scale'}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'ar'
                    ? 'عندما يعجز المريض عن قراءة أكبر حرف في لوحة سنيلين أو رمز (E Chart)، لا تكتب "فاقد للبصر" بل تدرج وفق السلم الطبي الإلزامي:'
                    : 'When a patient cannot read the top 6/60 (20/200) Snellen letter, follow this structured emergency acuity staircase:'}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded text-xs">1. CF</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{lang === 'ar' ? 'عد الأصابع (Counting Fingers - CF)' : 'Counting Fingers (CF)'}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {lang === 'ar'
                        ? 'ارفع أصابعك أمام المريض وسجل المسافة بدقة (مثلاً: CF @ 3 meters، CF @ 1 meter، CF @ 50 cm).'
                        : 'Hold up fingers against uniform background and record distance (e.g. CF @ 3m, CF @ 1m, CF @ 50cm).'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
                  <span className="font-mono font-bold text-blue-400 bg-blue-950/80 px-2 py-1 rounded text-xs">2. HM</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{lang === 'ar' ? 'حركة اليد (Hand Motion - HM)' : 'Hand Motion (HM)'}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {lang === 'ar'
                        ? 'إذا لم يستطع عد الأصابع عند مسافة 30 سم، حرّك كفك عمودياً وأفقياً واسأله هل يرى حركة اليد (تسجل: HM @ 1 meter).'
                        : 'If patient cannot count fingers at 30cm, wave hand vertically/horizontally (Record: HM @ 1m).'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-start gap-3">
                  <span className="font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-1 rounded text-xs">3. LP</span>
                  <div>
                    <h4 className="font-bold text-white text-xs">{lang === 'ar' ? 'إدراك الضوء (Light Perception - LP)' : 'Light Perception (LP)'}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      {lang === 'ar'
                        ? 'سلط كشاف الفحص على العين واسأله: "هل ترى الضوء مطفأ أم مشتعل؟" مع فحص اتجاه الإسقاط (LP with projection).'
                        : 'Shine penlight directly into eye; test light perception and directional quadrant projection.'}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-red-800/40 bg-red-950/20 flex items-start gap-3">
                  <span className="font-mono font-bold text-red-400 bg-red-950/80 px-2 py-1 rounded text-xs">4. NLP</span>
                  <div>
                    <h4 className="font-bold text-red-300 text-xs">{lang === 'ar' ? 'انعدام إدراك الضوء (No Light Perception - NLP)' : 'No Light Perception (NLP)'}</h4>
                    <p className="text-slate-300 text-xs mt-0.5">
                      {lang === 'ar'
                        ? 'العمى التام (لا يرى أي ضوء حتى مع تسليط أشد كشاف). تأكد من إغلاق العين الأخرى بإحكام تام أثناء الفحص.'
                        : 'Total visual absence. Always double-check by tightly occluding fellow eye.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: OPEN GLOBE */}
          {activeTab === 'open_globe' && (
            <div className="space-y-4">
              <div className="bg-red-950/40 border border-red-800/40 p-4 rounded-xl space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-red-300 font-['Cairo'] flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                  <span>{lang === 'ar' ? 'بروتوكول تثبيت ووقاية مقلة العين الممزقة (Rigid Eye Shield)' : 'Ruptured / Open Globe Rigid Shield Protection Protocol'}</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {lang === 'ar'
                    ? 'في إصابات الانثقاب والتمزق (Open Globe)، الخطأ الميداني الشائع هو وضع ضمادة قماشية ضاغطة على العين؛ مما يقذف القزحية والشبكية للخارج ويؤدي للعمى الحتمي!'
                    : 'In penetrating ocular trauma, never apply a pressure patch or cloth pad over the globe as it extrudes intraocular contents causing permanent blindness.'}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">{lang === 'ar' ? '1. الواقي الصلب المرتكز على العظام (Rigid Shield):' : '1. Rigid Eye Shield:'}</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'يجب استخدام واقٍ بلاستيكي أو معدني مقبب، يرتكز حصراً على حافة عظم الجبهة وعظم الوجنة، مع وجود فراغ هوائي كامل فوق مقلة العين دون أي ملامسة.'
                      : 'Use a rigid plastic or Fox metal shield resting solely on the orbital rims (frontal and zygomatic bones) with zero contact on the globe.'}
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">{lang === 'ar' ? '2. تثبيت الواقي بالشريط اللاصق:' : '2. Secure with Tape:'}</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'ثبّت الواقي بشرائط لاصقة مائلة تمتد من منتصف الجبهة إلى عظم الوجنة المقابل، دون شد مفرط على العين.'
                      : 'Tape diagonally from mid-forehead across the bridge of the maxilla/zygoma.'}
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="font-bold text-white text-xs">{lang === 'ar' ? '3. التحضير الجراحي الفوري (Pre-Op):' : '3. Immediate Pre-Op Management:'}</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'إبقاء المريض صائماً (NPO)، إعطاء مضاد قيء لمنع التقيؤ، إعطاء مضاد حيوي وريدياً، ونقله فوراً بالإسعاف.'
                      : 'Keep NPO, administer antiemetics to prevent Valsalva/vomiting, IV broad-spectrum antibiotics, and arrange immediate surgical transfer.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FLUORESCEIN */}
          {activeTab === 'fluorescein' && (
            <div className="space-y-4">
              <div className="bg-cyan-950/40 border border-cyan-800/40 p-4 rounded-xl space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-cyan-300 font-['Cairo'] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>{lang === 'ar' ? 'استخدام شرائط صبغة الفلوريسين واختبار سايدل (Seidel Test)' : 'Fluorescein Staining & Seidel Test'}</span>
                </h3>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {lang === 'ar'
                    ? 'صبغة الفلوريسين هي الأداة الذهبية للكشف عن سحجات القرنية والقروح، والتأكد من عدم وجود تسريب لسائل الحجرة الأمامية (انثقاب القرنية).'
                    : 'Fluorescein is the gold-standard bedside dye for detecting epithelial defects, corneal abrasions, and aqueous humor leaks.'}
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-bold text-white text-xs">{lang === 'ar' ? 'طريقة صبغ القرنية في الميدان:' : 'Bedside Technique:'}</div>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 text-xs">
                    <li>{lang === 'ar' ? 'بلل طرف شريط الفلوريسين بمحلول ملحي معقم.' : 'Moisten strip tip with sterile saline drop.'}</li>
                    <li>{lang === 'ar' ? 'المس الرتج الملتحمي للجفن السفلي برفق.' : 'Gently touch lower palpebral conjunctiva.'}</li>
                    <li>{lang === 'ar' ? 'اطلب من المريض أن يرمش لتوزيع الصبغة.' : 'Ask patient to blink.'}</li>
                    <li>{lang === 'ar' ? 'افحص القرنية بضوء أزرق (Cobalt Blue Filter).' : 'Examine under cobalt blue illumination.'}</li>
                  </ol>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-500/30 space-y-1.5">
                  <div className="font-bold text-cyan-300 text-xs">{lang === 'ar' ? 'اختبار سايدل الإيجابي (+ve Seidel Test):' : '+ve Seidel Test:'}</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {lang === 'ar'
                      ? 'إذا كان هناك انثقاب دقيق في القرنية، يتدفق السائل العيني المائي الداخلي الصافي ويشاهد كشلال يذيب ويزيح صبغة الفلوريسين الخضراء المركزة. هذا يؤكد وجود ثقب قرني نافذ طارئ.'
                      : 'A clear stream of leaking aqueous humor dilutes and washes away the concentrated dark orange/green dye like a river. Confirms penetrating corneal perforation.'}
                  </p>
                </div>
              </div>
            </div>
          )}

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
