import { 
  UserHealthProfile, 
  NutrientTargets, 
  MedicalCondition,
  ActivityLevel 
} from '../types/healthhub'

// HPB-based activity multipliers
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  'sedentary': 1.2,      // Little to no exercise
  'light': 1.375,        // Light exercise 1-3 days/week
  'moderate': 1.55,      // Moderate exercise 3-5 days/week
  'active': 1.725,       // Heavy exercise 6-7 days/week
  'very-active': 1.9     // Very heavy exercise, physical job
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
        // Lower carbs, control sugar, increase fiber
        adjusted.carbs.max = Math.round(adjusted.carbs.max * 0.85)
        adjusted.carbs.recommended = Math.round(adjusted.carbs.recommended * 0.85)
        adjusted.sugar.max = 25 // HPB recommendation for diabetes
        adjusted.sugar.recommended = 20
        adjusted.fiber.recommended = 30 // Higher fiber for blood sugar control
        break

      case 'hypertension':
        // Significantly reduce sodium
        adjusted.sodium.max = 1500 // HPB recommendation for hypertension
        adjusted.sodium.recommended = 1200
        break

      case 'high-cholesterol':
        // Reduce saturated fat, increase fiber
        adjusted.fat.max = Math.round(adjusted.fat.max * 0.85)
        adjusted.fat.recommended = Math.round(adjusted.fat.recommended * 0.85)
        adjusted.fiber.recommended = 30
        break

      case 'kidney-disease':
        // Reduce protein and sodium
        adjusted.protein.max = Math.round(adjusted.protein.max * 0.7)
        adjusted.protein.recommended = Math.round(adjusted.protein.recommended * 0.7)
        adjusted.sodium.max = 1500
        adjusted.sodium.recommended = 1200
        break

      case 'heart-disease':
        // Reduce sodium and saturated fat
        adjusted.sodium.max = 1500
        adjusted.sodium.recommended = 1200
        adjusted.fat.max = Math.round(adjusted.fat.max * 0.8)
        adjusted.fat.recommended = Math.round(adjusted.fat.recommended * 0.8)
        break

      case 'obesity':
        // Reduce calories by 500 for weight loss
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
      min: Math.round(profile.weight * 0.8), // 0.8g per kg (HPB minimum)
      max: Math.round(profile.weight * 2.0), // 2.0g per kg (upper safe limit)
      recommended: Math.round(profile.weight * 1.2) // 1.2g per kg (HPB recommendation)
    },
    carbs: {
      min: Math.round(tdee * 0.45 / 4), // 45% of calories (HPB minimum)
      max: Math.round(tdee * 0.65 / 4), // 65% of calories (HPB maximum)
      recommended: Math.round(tdee * 0.55 / 4) // 55% of calories (HPB recommendation)
    },
    fat: {
      min: Math.round(tdee * 0.20 / 9), // 20% of calories
      max: Math.round(tdee * 0.35 / 9), // 35% of calories (HPB maximum)
      recommended: Math.round(tdee * 0.25 / 9) // 25% of calories (HPB recommendation)
    },
    sodium: {
      min: 500, // Minimum for bodily functions
      max: 2000, // HPB recommendation (2g/day)
      recommended: 1500 // Optimal target
    },
    sugar: {
      min: 0,
      max: 50, // HPB recommendation (10% of calories)
      recommended: 25 // Optimal target (5% of calories)
    },
    fiber: {
      min: 20, // HPB minimum
      recommended: 25 // HPB recommendation
    }
  }

  // Adjust for medical conditions
  return adjustForConditions(baseTargets, profile.medicalConditions)
}

// Calculate BMI
export const calculateBMI = (weight: number, height: number): number => {
  return Number((weight / Math.pow(height / 100, 2)).toFixed(1))
}

// Get BMI category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 23) return 'Normal' // Asian BMI cutoff
  if (bmi < 27.5) return 'Overweight' // Asian BMI cutoff
  return 'Obese'
}
