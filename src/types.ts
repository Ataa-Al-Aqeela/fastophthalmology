export type UrgencyType = 'CRITICAL' | 'URGENT' | 'FIELD' | 'ROUTINE';

export interface TriageOption {
  label: string;
  labelEn?: string;
  subLabel?: string;
  subLabelEn?: string;
  next: string;
  icon?: string;
}

export interface TriageNode {
  id?: string;
  question: string;
  questionEn?: string;
  hint?: string;
  hintEn?: string;
  pathTitle?: string;
  pathTitleEn?: string;
  options: TriageOption[];
}

export interface TriageResult {
  id: string;
  type: UrgencyType;
  title: string;
  titleEn?: string;
  englishTitle: string;
  badgeText: string;
  badgeTextEn?: string;
  summary: string;
  summaryEn?: string;
  redFlags?: string[];
  redFlagsEn?: string[];
  steps: string[];
  stepsEn?: string[];
  medications?: {
    name: string;
    dose: string;
    doseEn?: string;
    note?: string;
    noteEn?: string;
  }[];
  contraindications?: string[];
  contraindicationsEn?: string[];
  referralTime: string;
  referralTimeEn?: string;
  referralDestination: string;
  referralDestinationEn?: string;
  icon: string;
}

export interface SavedCase {
  id: string;
  timestamp: string;
  patientName?: string;
  ageGender?: string;
  path: string;
  pathTitle: string;
  answers: { question: string; answer: string }[];
  result: TriageResult;
  notes?: string;
}
