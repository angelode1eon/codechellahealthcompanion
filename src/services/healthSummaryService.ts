import { 
  UserHealthProfile, 
  HealthSummary, 
  ConditionNote, 
  MedicalCondition 
} from '../types/healthhub'
import { calculateNutrientTargets, calculateBMI, getBMICategory } from './nutrientCalculator'

const CONDITION_DETAILS: Record<MedicalCondition, Omit<ConditionNote, 'severity'>> = {
  'diabetes': {
    condition: 'diabetes',
    note: 'Control blood sugar with low-GI carbs and regular meals. Limit sugar to <25g/day.',
    icon: '🩸',
    color: '#FF6B6B'
  },
  'hypertension': {
    condition: 'hypertension',
    note: 'Keep sodium under 1500mg/day. Choose fresh foods over processed ones.',
    icon: '❤️',
    color: '#FF6B6B'
  },
  'high-cholesterol': {
    condition: 'high-cholesterol',
    note: 'Reduce saturated fats. Increase fiber intake to 30g/day for better cholesterol control.',
    icon: '🫀',
    color: '#FFA07A'
  },
  'kidney-disease': {
    condition: 'kidney-disease',
    note: 'Limit protein and sodium. Monitor potassium and phosphorus intake carefully.',
    icon: '🫘',
    color: '#FF8C42'
  },
  'heart-disease': {
    condition: 'heart-disease',
    note: 'Follow heart-healthy diet: low sodium, healthy fats, plenty of vegetables.',
    icon: '💚',
    color: '#88B04B'
  },
  'obesity': {
    condition: 'obesity',
    note: 'Aim for 500-calorie deficit daily for gradual weight loss. Focus on whole foods.',
    icon: '⚖️',
    color: '#6B5B95'
  },
  'none': {
    condition: 'none',
    note: 'Maintain balanced diet following HPB guidelines for optimal health.',
    icon: '✨',
    color: '#88B04B'
  }
}

const getSeverity = (condition: MedicalCondition, profile: UserHealthProfile): 'mild' | 'moderate' | 'severe' => {
  const bmi = calculateBMI(profile.weight, profile.height)
  const age = profile.age

  if (condition === 'obesity') {
    if (bmi >= 32.5) return 'severe'
    if (bmi >= 27.5) return 'moderate'
    return 'mild'
  }

  if (condition === 'diabetes' || condition === 'hypertension') {
    if (age >= 60) return 'moderate'
    return 'mild'
  }

  return 'mild'
}

const getRiskLevel = (profile: UserHealthProfile): 'low' | 'moderate' | 'high' => {
  const conditions = profile.medicalConditions.filter(c => c !== 'none')
  const bmi = calculateBMI(profile.weight, profile.height)

  if (conditions.length >= 3 || bmi >= 32.5) return 'high'
  if (conditions.length >= 2 || bmi >= 27.5) return 'moderate'
  if (conditions.length >= 1 || bmi >= 23) return 'moderate'
  return 'low'
}

const getRecommendations = (profile: UserHealthProfile): string[] => {
  const recommendations: string[] = []
  const bmi = calculateBMI(profile.weight, profile.height)
  const conditions = profile.medicalConditions

  if (bmi >= 27.5) {
    recommendations.push('Consider weight management program for better health outcomes')
  } else if (bmi < 18.5) {
    recommendations.push('Increase calorie intake with nutrient-dense foods')
  }

  if (profile.activityLevel === 'sedentary') {
    recommendations.push('Aim for 150 minutes of moderate exercise per week (HPB guideline)')
  }

  if (conditions.includes('diabetes')) {
    recommendations.push('Monitor blood glucose regularly and maintain consistent meal timing')
  }

  if (conditions.includes('hypertension')) {
    recommendations.push('Check blood pressure weekly and reduce salt in cooking')
  }

  if (conditions.includes('high-cholesterol')) {
    recommendations.push('Choose lean proteins and increase omega-3 rich foods like fish')
  }

  if (recommendations.length === 0) {
    recommendations.push('Maintain current healthy habits and stay active')
    recommendations.push('Eat a variety of colorful vegetables daily')
  }

  recommendations.push('Stay hydrated with 8 glasses of water daily')

  return recommendations
}

export const generateHealthSummary = (profile: UserHealthProfile): HealthSummary => {
  const targets = calculateNutrientTargets(profile)
  
  const conditionNotes: ConditionNote[] = profile.medicalConditions
    .filter(c => c !== 'none')
    .map(condition => ({
      ...CONDITION_DETAILS[condition],
      severity: getSeverity(condition, profile)
    }))

  if (conditionNotes.length === 0) {
    conditionNotes.push({
      ...CONDITION_DETAILS['none'],
      severity: 'mild'
    })
  }

  return {
    profile,
    targets,
    conditionNotes,
    riskLevel: getRiskLevel(profile),
    recommendations: getRecommendations(profile)
  }
}
