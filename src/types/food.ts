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
  image: string
  timestamp: number
  points?: number
}

export interface SingaporeanDish {
  name: string
  keywords: string[]
  calories: number
  protein: number
  carbs: number
  fat: number
  sodium: number
  fiber: number
  sugar: number
  servingSize: string
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

export interface MealHistory {
  [date: string]: FoodPrediction[]
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

export interface RewardsData {
  totalPoints: number
  currentStreak: number
  longestStreak: number
  badges: Badge[]
  pointsHistory: PointsEntry[]
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: number
  progress?: number
  target?: number
}

export interface PointsEntry {
  date: string
  points: number
  mealName: string
  reason: string
}

export interface MonthlyWrapped {
  month: string
  year: number
  totalPoints: number
  totalMeals: number
  activeDays: number
  topMeals: Array<{
    name: string
    count: number
    avgPoints: number
    image: string
  }>
  nutrientImprovements: Array<{
    nutrient: string
    change: number
    trend: 'up' | 'down' | 'stable'
    isGood: boolean
  }>
  achievements: string[]
  avgDailyCalories: number
  healthScore: number
}
