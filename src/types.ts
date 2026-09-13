export type PageExperience = 
  | 'homepage'
  | 'atelier-world'
  | 'paint-revolution'
  | 'finishes'
  | 'case-study'
  | 'suburbs'
  | 'guidance'
  | 'quote-flow';

export type ContestSection =
  | 'all'
  | 'visual-direction'
  | 'walkthrough-video'
  | 'design-system'
  | 'transformation-engine'
  | 'performance-mobile'
  | 'proof-vs-inspiration'
  | 'homeowner-psychology'
  | 'past-work'
  | 'figma-tokens';

export type TimeOfDay = 'morning' | 'midday' | 'golden' | 'evening';

export interface FinishItem {
  id: string;
  name: string;
  category: 'Mineral & Lime' | 'Plaster & Clay' | 'Textured & Concrete' | 'Architectural & Spray';
  tagline: string;
  description: string;
  mineralOrigin: string;
  tactileFeel: string;
  lightResponse: {
    morning: string;
    midday: string;
    golden: string;
    evening: string;
  };
  sheenLevel: string;
  durabilityRating: string;
  idealMelbourneSpaces: string[];
  swatchGradient: string;
  bgTextureClass: string;
  accentColor: string;
  accentHex: string;
  depthSpec: string;
  quoteEstimateHint: string;
  roomImage: string;
  macroImage: string;
  beforeImage: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  suburb: string;
  architectureEra: string;
  clientBrief: string;
  transformationStory: string;
  /** Honest taxonomy for brief criterion 06 — never conflate stock with client proof. */
  proofStatus: 'verified-commission' | 'directional-narrative';
  imageSourceNote: string;
  relatedFinishIds: string[];
  relatedSuburbId: string;
  completionYear: string;
  finishesUsed: string[];
  beforeImage: string;
  afterImage: string;
  colorPalette: { name: string; hex: string; role: string }[];
  architecturalNotes: string;
  homeownerQuote: { quote: string; author: string };
  timeline: string;
}

export interface SuburbProfile {
  id: string;
  name: string;
  region: 'Inner North' | 'Bayside' | 'Inner East' | 'Heritage South';
  housingType: string;
  climateFactors: string;
  heritageCovenants: string;
  recommendedFinishes: string[];
  suburbPalette: { name: string; hex: string; inspiration: string }[];
  localCaseStudyId: string;
  description: string;
}

export interface ColorToken {
  name: string;
  hex: string;
  usage: string;
  inspiration: string;
}
