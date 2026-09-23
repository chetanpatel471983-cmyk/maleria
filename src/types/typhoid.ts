export type Language = 'gu' | 'en';

export type SlideId = 'overview' | 'pathogenesis' | 'symptoms' | 'timeline' | 'diagnosis' | 'quiz';

export interface BacteriumPart {
  id: string;
  name: { en: string; gu: string };
  scientificName?: string;
  role: { en: string; gu: string };
  antigenType?: string;
  clinicalSignificance: { en: string; gu: string };
  color: string;
}

export interface PathogenesisStep {
  step: number;
  id: string;
  title: { en: string; gu: string };
  location: { en: string; gu: string };
  timeframe: { en: string; gu: string };
  summary: { en: string; gu: string };
  mechanism: { en: string; gu: string };
  immuneResponse: { en: string; gu: string };
  clinicalSign: { en: string; gu: string };
}

export interface SymptomHotspot {
  id: string;
  position: [number, number, number]; // [x, y, z] in 3D scene
  title: { en: string; gu: string };
  organ: { en: string; gu: string };
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  onsetWeek: string;
  description: { en: string; gu: string };
  mechanism: { en: string; gu: string };
  medicalTerm: string;
  gujaratiPhonetic: string;
}

export interface TimelineWeek {
  week: number;
  title: { en: string; gu: string };
  temperature: string;
  keyFeatures: { en: string[]; gu: string[] };
  pathology: { en: string; gu: string };
  dangerSigns: { en: string; gu: string };
  diagnosticYield: { en: string; gu: string };
}

export interface DiagnosticMethod {
  id: string;
  name: { en: string; gu: string };
  timing: { en: string; gu: string };
  accuracy: string;
  principle: { en: string; gu: string };
  positiveResult: { en: string; gu: string };
}

export interface QuizQuestion {
  id: number;
  question: { en: string; gu: string };
  options: { en: string[]; gu: string[] };
  correctIndex: number;
  explanation: { en: string; gu: string };
}
