export interface PatientReportData {
  [key: string]: any;
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
    ? data.initialInterventions.map((item: string) => `<li>${item}</li>`).join('')
    : `<li>${data.initialInterventions || ''}</li>`;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html dir="rtl" lang="ar">
    <head>
      <meta charset="UTF-8">
      <title>بطاقة تحويل وتفقد ميداني طارئ</title>
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
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        .section {
          margin-top: 15px;
          padding: 10px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
        }
        .section-title {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .field {
          margin-bottom: 5px;
        }
        .field-label {
          font-weight: bold;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #64748b;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>بطاقة تحويل وتفقد ميداني طارئ</h2>
        <p>${dateStr}</p>
      </div>

      <div class="section">
        <div class="section-title">1. حدة البصر</div>
        ${(data.visualAcuityOD || data.visualAcuityOS) ? `
          <div class="field"><span class="field-label">اليمنى:</span> ${data.visualAcuityOD || 'N/A'} - <span class="field-label">اليسرى:</span> ${data.visualAcuityOS || 'N/A'}</div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">2. التدابير والإسعافات الأولية المجراة في الميدان</div>
        <ul>${interventionsList}</ul>
      </div>

      <div class="section">
        <div class="section-title">3. التوجيه والتحويل</div>
        <div class="field"><span class="field-label">الجهة الموصى بها:</span> ${data.referralDestination || 'N/A'}</div>
      </div>

      <div class="footer">
        برنامج العطاء لطب العيون الميداني - Oculomics<br>
        تنبيه طبي: هذه الوثيقة صادرة من منظومة الفرز السريري والتقييم الميداني...
      </div>

      <script>
        window.onload = function() {
          window.print();
          setTimeout(function() { window.close(); }, 750);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};