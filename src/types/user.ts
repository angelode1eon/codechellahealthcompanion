export interface UserProfile {
  id: string
  email: string
  name: string
  age: number
  weight: number
  height: number
  gender: 'male' | 'female'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
  medicalConditions: MedicalCondition[]
  dietaryRestrictions: DietaryRestriction[]
  createdAt: string
  lastLogin: string
}

export interface MedicalCondition {
  id: string
  name: string
  severity: 'mild' | 'moderate' | 'severe'
  diagnosedDate: string
  notes?: string
}

export interface DietaryRestriction {
  id: string
  type: 'halal' | 'vegetarian' | 'vegan' | 'gluten-free' | 'lactose-free' | 'nut-allergy' | 'other'
  notes?: string
}

export interface DailyNutrientTargets {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
  sodium: number
  sugar: number
  fiber: number
  saturatedFat: number
}

export interface HealthSummary {
  overallScore: number
  conditionNotes: ConditionNote[]
  recommendations: string[]
  warnings: string[]
}

export interface ConditionNote {
  condition: string
  severity: 'info' | 'warning' | 'critical'
  message: string
  icon: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: UserProfile
  error?: string
}
