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
