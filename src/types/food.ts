export interface SingaporeanDish {
  name: string
  keywords: string[]
  genericMappings: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  saturatedFat?: number
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
  saturatedFat?: number
  sodium: number
  fiber: number
  sugar: number
  image?: string
  timestamp?: number
  points?: number
  originalPrediction?: string
  mappingReason?: 'signature_match' | 'keyword_match' | 'generic_mapping' | 'no_match' | 'user_corrected'
  userCorrected?: boolean
  matchDetails?: {
    keywordMatches: number
    signatureMatch: boolean
    genericMatch: boolean
    weightedScore: number
  }
}

export interface DailyIntake {
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  totalSaturatedFat: number
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

export interface MealHistory {
  [dateKey: string]: FoodPrediction[]
}

export interface DailyStats {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
  sodium: number
  fiber: number
  sugar: number
  mealCount: number
}
