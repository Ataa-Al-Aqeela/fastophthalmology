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

// ط·آ¬ط¸â€‍ط·آ¨ ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط¸ظ¾ط¸ث†ط·آ¸ط·آ© ط¸â€¦ط·آ­ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹
export const getSavedCases = (): SavedCase[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('ط·آ®ط·آ·ط·آ£ ط·آ£ط·آ«ط¸â€ ط·آ§ط·طŒ ط·آ¬ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط¸ظ¾ط¸ث†ط·آ¸ط·آ©:', error);
    return [];
  }
};

// ط·آ­ط¸ظ¾ط·آ¸ ط·آ­ط·آ§ط¸â€‍ط·آ© ط·آ¬ط·آ¯ط¸ظ¹ط·آ¯ط·آ© ط¸â€¦ط·آ­ط¸â€‍ط¸ظ¹ط·آ§ط¸â€¹
export const saveCaseLocally = (newCaseData: Omit<SavedCase, 'id' | 'createdAt'>): SavedCase[] => {
    const existingCases = getSavedCases();
    const newCase: SavedCase = {
        ...newCaseData,
        id: 'CASE-' + Date.now(),
        createdAt: new Date().toISOString(),
    };

    const updatedCases = [newCase, ...existingCases];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCases));
    return updatedCases;
};
// ط·آ­ط·آ°ط¸ظ¾ ط·آ­ط·آ§ط¸â€‍ط·آ© ط¸â€¦ط·آ¹ط¸ظ¹ط¸â€ ط·آ©
export const deleteCaseLocally = (id: string) => {
  const existingCases = getSavedCases();
  const filteredCases = existingCases.filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCases));
};

// ط·ع¾ط·آµط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ­ط·آ§ط¸â€‍ط·آ§ط·ع¾ ط·آ¥ط¸â€‍ط¸â€° ط¸â€¦ط¸â€‍ط¸ظ¾ JSON
export const exportCasesToJSON = () => {
  const cases = getSavedCases();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cases, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "field_cases.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
