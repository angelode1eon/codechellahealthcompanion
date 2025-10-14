export interface HealthHubConfig {
  apiKey: string
  baseUrl: string
}

export interface HPBNutritionData {
  foodName: string
  servingSize: string
  calories: number
  protein: number
  carbohydrates: number
  totalFat: number
  saturatedFat: number
  transFat: number
  cholesterol: number
  sodium: number
  dietaryFiber: number
  sugar: number
  calcium: number
  iron: number
  vitaminA: number
  vitaminC: number
  isHealthierChoice: boolean
  category: string
}

export interface HawkerTip {
  id: string
  dishName: string
  category: 'rice' | 'noodles' | 'soup' | 'snacks' | 'drinks'
  image: string
  unhealthyVersion: {
    calories: number
    sodium: number
    description: string
  }
  healthierTips: string[]
  healthierVersion: {
    calories: number
    sodium: number
    description: string
  }
  caloriesSaved: number
  sodiumReduced: number
  difficulty: 'easy' | 'medium' | 'hard'
  popularAt: string[]
}

// New types for authentication and personalization
export type MedicalCondition = 
  | 'diabetes' 
  | 'hypertension' 
  | 'high-cholesterol' 
  | 'kidney-disease'
  | 'heart-disease'
  | 'obesity'
  | 'none'

export type DietaryRestriction = 
  | 'vegetarian' 
  | 'vegan' 
  | 'halal' 
  | 'low-carb' 
  | 'gluten-free'
  | 'dairy-free'
  | 'none'

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'

export type Gender = 'male' | 'female'

export interface UserHealthProfile {
  id: string
  email: string
  name: string
  age: number
  gender: Gender
  weight: number // kg
  height: number // cm
  activityLevel: ActivityLevel
  medicalConditions: MedicalCondition[]
  dietaryRestrictions: DietaryRestriction[]
  createdAt: string
  lastUpdated: string
}

export interface NutrientTargets {
  calories: {
    min: number
    max: number
    recommended: number
  }
  protein: {
    min: number
    max: number
    recommended: number
  }
  carbs: {
    min: number
    max: number
    recommended: number
  }
  fat: {
    min: number
    max: number
    recommended: number
  }
  sodium: {
    min: number
    max: number
    recommended: number
  }
  sugar: {
    min: number
    max: number
    recommended: number
  }
  fiber: {
    min: number
    recommended: number
  }
}

export interface HealthSummary {
  profile: UserHealthProfile
  targets: NutrientTargets
  conditionNotes: ConditionNote[]
  riskLevel: 'low' | 'moderate' | 'high'
  recommendations: string[]
}

export interface ConditionNote {
  condition: MedicalCondition
  severity: 'mild' | 'moderate' | 'severe'
  note: string
  icon: string
  color: string
}

export interface AuthResponse {
  success: boolean
  token?: string
  user?: UserHealthProfile
  error?: string
}

export interface LoginCredentials {
  email: string
  password: string
}
