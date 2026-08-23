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
  const dateStr = new Date().toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const interventionsList = Array.isArray(data.initialInterventions)
    ? data.initialInterventions.map((item: string) => <li>${item}</li>).join('')
    : <li>${data.initialInterventions}</li>;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>بطاقة تحويل وتفقّد ميداني طارئ</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        body {
          font-family: 'Tajawal', sans-serif;
          margin: 0;
          padding: 20px;
          color: #1e293b;
          direction: rtl;
        }
        .header {
          background-color: #0f172a;
          color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          margin-bottom: 20px;
        }
        .header h1 { margin: 0 0 5px 0; font-size: 20px; }
        .header p { margin: 0; font-size: 14px; color: #94a3b8; }
        .section {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
        }
        .section-title {
          font-weight: bold;
          color: #0284c7;
          font-size: 16px;
          margin-bottom: 10px;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 5px;
        }
        .field { margin-bottom: 8px; font-size: 14px; }
        .field-label { font-weight: bold; color: #475569; }
        ul { margin: 5px 0; padding-right: 20px; }
        li { margin-bottom: 4px; font-size: 14px; }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #64748b;
          border-top: 1px dashed #cbd5e1;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>مؤسسة عطاء التنموية</h1>
        <p>بطاقة تحويل وتفقّد ميداني طارئ</p>
      </div>

      <div class="section">
        <div class="field"><span class="field-label">تاريخ الفحص:</span> ${dateStr}</div>
        <div class="field"><span class="field-label">تصنيف الحالة (Triage):</span> ${data.triageCategory}</div>
      </div>

      <div class="section">
        <div class="section-title">1. الشكوى الرئيسية والتقييم السريري</div>
        <div class="field"><span class="field-label">الشكوى:</span> ${data.chiefComplaint}</div>
        ${
          data.visualAcuityOD || data.visualAcuityOS
            ? <div class="field"><span class="field-label">حدة البصر:</span> اليمنى (${data.visualAcuityOD  'N/A'}) - اليسرى (${data.visualAcuityOS  'N/A'})</div>`
            : ''
        }
      </div>

      <div class="section">
        <div class="section-title">2. التدابير والإسعافات الأولية المجرأة في الميدان</div>
        <ul>${interventionsList}</ul>
      </div>

      <div class="section">
        <div class="section-title">3. التوجيه والتحويل</div>
        <div class="field"><span class="field-label">الجهة الموصى بها:</span> ${data.referralDestination}</div>
      </div>

      <div class="footer">
        تنبيـه طـبي: هذه الوثيقة صادرة من منظومة الفرز السريري وال Oculomics الميداني لبرنامج العطاء لطب العيون.<br>
        تُسلم هذه البطاقة للطاقم الطبي في مستشفى الإحالة النهائي.
      </div>
      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() { window.close(); }, 750);
        };
      </script>
    </body>
    </html>
  `);

  printWindow.document.close();
};