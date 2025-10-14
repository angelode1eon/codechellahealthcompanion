export interface SingaporeanDish {
  name: string
  keywords: string[]
  genericMappings: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  sodium: number
  fiber: number
  sugar: number
  servingSize: string
}

export interface FoodPrediction {
  name: string
  confidence: number
  calories: number
  protein: number
  carbs: number
  fat: number
  sodium: number
  fiber: number
  sugar: number
  image?: string
  timestamp?: number
  points?: number
  originalPrediction?: string
  mappingReason?: 'keyword_match' | 'generic_mapping' | 'no_match' | 'user_corrected'
  userCorrected?: boolean
}

export interface DailyIntake {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalSodium: number
  totalFiber: number
  totalSugar: number
  meals: FoodPrediction[]
}

export interface UserCorrection {
  timestamp: number
  originalPrediction: string
  correctedDish: string
  imageHash?: string
}
