import jsPDF from 'jspdf';

export interface PatientReportData {
  patientName?: string;
  age?: string;
  gender?: string;
  triageCategory: string;
  chiefComplaint: string;
  visualAcuityOD?: string;
  visualAcuityOS?: string;
  initialInterventions: string[];
  referralDestination: string;
  notes?: string;
}

export const generateReferralPDF = async (data: PatientReportData) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const dateStr = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // إعدادات الهيدر الرئيسي
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text('مؤسسة عطاء العقيلة التنموية', 105, 15, { align: 'center' });
  doc.setFontSize(12);
  doc.text('بطاقة تحويل وتقريــر فحص ميداني طارئ', 105, 25, { align: 'center' });

  // تفاصيل التقرير
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(10);
  doc.text(`تاريخ الفحص: ${dateStr}`, 15, 45);
  doc.text(`تصنيف الحالة (Triage): ${data.triageCategory}`, 15, 53);

  // خط فاصل
  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 58, 195, 58);

  // الشكوى والفحص الميداني
  doc.setFontSize(12);
  doc.text('1. الشكوى الرئيسية والتقييم السريري:', 15, 68);
  doc.setFontSize(10);
  doc.text(`• الشكوى: ${data.chiefComplaint}`, 20, 76);
  if (data.visualAcuityOD || data.visualAcuityOS) {
    doc.text(`• حدة البصر: اليمنى (${data.visualAcuityOD || 'N/A'}) - اليسرى (${data.visualAcuityOS || 'N/A'})`, 20, 84);
  }

  // التدابير والإسعافات المُجراة
  doc.setFontSize(12);
  doc.text('2. الإسعافات والتدابير الأولية المُجراة في الميدان:', 15, 98);
  doc.setFontSize(10);
  let yPos = 106;
  data.initialInterventions.forEach((item) => {
    doc.text(`• ${item}`, 20, yPos);
    yPos += 7;
  });

  // التوجيه والتحويل
  yPos += 5;
  doc.setFontSize(12);
  doc.text('3. وجهة التحويل والتعليمات:', 15, yPos);
  doc.setFontSize(10);
  doc.text(`• الجهة الموصى بها: ${data.referralDestination}`, 20, yPos + 8);

  // الفوتر الخاتم
  doc.setFillColor(241, 245, 249);
  doc.rect(0, 270, 210, 27, 'F');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('تنبيه طبي: هذه الوثيقة صادرة من منظومة الفرز السريري الميداني - برنامج العطاء لطب العيون.', 105, 280, { align: 'center' });
  doc.text('تُسلم هذه البطاقة للطاقم الطبي في مستشفى الإحالة النهائي.', 105, 285, { align: 'center' });

  // حفظ الملف وتنزيله
  doc.save(`تقرير_تحويل_ميداني_${Date.now()}.pdf`);
};