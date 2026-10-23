import { mockAnalysisResult } from './mockData';

export const demoCropReport = {
  result: {
    ...mockAnalysisResult,
    cropName: 'Tomato',
    diseaseName: 'Early Blight',
    scientificName: 'Alternaria solani',
  },
  imageDataUrl: '/demo-tomato-leaf.svg',
  fileName: 'Tomato leaf · sample image',
  cropProfile: {
    scientificName: 'Solanum lycopersicum',
    cropType: 'Vegetable crop',
    growthStage: 'Fruiting stage · illustrative',
    fieldLabel: 'Sample field',
    assessmentStatus: 'Needs a closer look',
  },
  visualAssessment: [
    { label: 'Sample confidence', value: '87.4%' },
    { label: 'Estimated affected area', value: '32%' },
    { label: 'Sample severity', value: 'Moderate' },
    { label: 'Suggested priority', value: 'Treat promptly' },
  ],
  monitoringPlan: [
    'Inspect nearby leaves for similar spots and yellowing.',
    'Recheck the affected plants in a few days and note whether symptoms spread.',
    'Remove badly affected plant debris and avoid wetting foliage when watering.',
  ],
  dataNote: 'This complete sample report is for exploring the interface only. Crop stage, scores, affected area, symptoms, and care guidance are illustrative—not observations made from your photo.',
};
