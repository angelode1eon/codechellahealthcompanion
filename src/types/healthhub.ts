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
