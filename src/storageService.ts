export interface SavedCase {
  id: string;
  createdAt: string;
  triageCategory: string;
  chiefComplaint: string;
  visualAcuityOD?: string;
  visualAcuityOS?: string;
  initialInterventions: string[];
  referralDestination: string;
  notes?: string;
}

const STORAGE_KEY = 'fast_ophthalmology_field_cases';

// جلب جميع الحالات المحفوظة محلياً
export const getSavedCases = (): SavedCase[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('خطأ أثناء جلب الحالات المحفوظة:', error);
    return [];
  }
};

// حفظ حالة جديدة محلياً
export const saveCaseLocally = (newCaseData: Omit<SavedCase, 'id' | 'createdAt'>): SavedCase[] => {
    const existingCases = getSavedCases();
    const newCase: SavedCase = {
        ...newCaseData,
        id: CASE-${Date.now()},
        createdAt: new Date().toISOString(),
    };

    const updatedCases = [newCase, ...existingCases];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCases));
    return updatedCases;
};
// حذف حالة معينة
export const deleteCaseLocally = (id: string) => {
  const existingCases = getSavedCases();
  const filteredCases = existingCases.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCases));
};

// تصدير الحالات إلى ملف JSON
export const exportCasesToJSON = () => {
  const cases = getSavedCases();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cases, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", سجل_الحالات_الميدانية_${Date.now()}.json);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};