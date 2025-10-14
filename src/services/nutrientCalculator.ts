import { 
  UserHealthProfile, 
  NutrientTargets, 
  MedicalCondition,
  ActivityLevel 
} from '../types/healthhub'

// HPB-based activity multipliers
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  'sedentary': 1.2,
  'light': 1.375,
  'moderate': 1.55,
  'active': 1.725,
  'very-active': 1.9
}

// Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
const calculateBMR = (profile: UserHealthProfile): number => {
  const { weight, height, age, gender } = profile
  
  if (gender === 'male') {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5
  } else {
    return (10 * weight) + (6.25 * height) - (5 * age) - 161
  }
}

// Calculate Total Daily Energy Expenditure (TDEE)
const calculateTDEE = (profile: UserHealthProfile): number => {
  const bmr = calculateBMR(profile)
  const multiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel]
  return Math.round(bmr * multiplier)
}

// Adjust targets based on medical conditions
const adjustForConditions = (
  baseTargets: NutrientTargets,
  conditions: MedicalCondition[]
): NutrientTargets => {
  let adjusted = { ...baseTargets }

  conditions.forEach(condition => {
    switch (condition) {
      case 'diabetes':
        adjusted.carbs.max = Math.round(adjusted.carbs.max * 0.85)
        adjusted.carbs.recommended = Math.round(adjusted.carbs.recommended * 0.85)
        adjusted.sugar.max = 25
        adjusted.sugar.recommended = 20
        adjusted.fiber.recommended = 30
        break

      case 'hypertension':
        adjusted.sodium.max = 1500
        adjusted.sodium.recommended = 1200
        break

      case 'high-cholesterol':
        adjusted.fat.max = Math.round(adjusted.fat.max * 0.85)
        adjusted.fat.recommended = Math.round(adjusted.fat.recommended * 0.85)
        adjusted.saturatedFat.max = Math.round(adjusted.saturatedFat.max * 0.7)
        adjusted.saturatedFat.recommended = Math.round(adjusted.saturatedFat.recommended * 0.7)
        adjusted.fiber.recommended = 30
        break

      case 'kidney-disease':
        adjusted.protein.max = Math.round(adjusted.protein.max * 0.7)
        adjusted.protein.recommended = Math.round(adjusted.protein.recommended * 0.7)
        adjusted.sodium.max = 1500
        adjusted.sodium.recommended = 1200
        break

      case 'heart-disease':
        adjusted.sodium.max = 1500
        adjusted.sodium.recommended = 1200
        adjusted.fat.max = Math.round(adjusted.fat.max * 0.8)
        adjusted.fat.recommended = Math.round(adjusted.fat.recommended * 0.8)
        adjusted.saturatedFat.max = Math.round(adjusted.saturatedFat.max * 0.7)
        adjusted.saturatedFat.recommended = Math.round(adjusted.saturatedFat.recommended * 0.7)
        break

      case 'obesity':
        adjusted.calories.max = adjusted.calories.recommended - 500
        adjusted.calories.recommended = adjusted.calories.max
        adjusted.calories.min = adjusted.calories.max - 300
        break
    }
  })

  return adjusted
}

export const calculateNutrientTargets = (profile: UserHealthProfile): NutrientTargets => {
  const tdee = calculateTDEE(profile)

  // Base targets following HPB guidelines
  const baseTargets: NutrientTargets = {
    calories: {
      min: tdee - 300,
      max: tdee + 300,
      recommended: tdee
    },
    protein: {
      min: Math.round(profile.weight * 0.8),
      max: Math.round(profile.weight * 2.0),
      recommended: Math.round(profile.weight * 1.2)
    },
    carbs: {
      min: Math.round(tdee * 0.45 / 4),
      max: Math.round(tdee * 0.65 / 4),
      recommended: Math.round(tdee * 0.55 / 4)
    },
    fat: {
      min: Math.round(tdee * 0.20 / 9),
      max: Math.round(tdee * 0.35 / 9),
      recommended: Math.round(tdee * 0.25 / 9)
    },
    saturatedFat: {
      min: 0,
      max: Math.round(tdee * 0.10 / 9), // <10% of calories (HPB guideline)
      recommended: Math.round(tdee * 0.07 / 9) // 7% optimal
    },
    sodium: {
      min: 500,
      max: 2000,
      recommended: 1500
    },
    sugar: {
      min: 0,
      max: 50,
      recommended: 25
    },
    fiber: {
      min: 20,
      recommended: 25
    }
  }

  return adjustForConditions(baseTargets, profile.medicalConditions)
}

export const calculateBMI = (weight: number, height: number): number => {
  return Number((weight / Math.pow(height / 100, 2)).toFixed(1))
}

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 23) return 'Normal'
  if (bmi < 27.5) return 'Overweight'
  return 'Obese'
}
