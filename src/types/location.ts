export interface HawkerCenter {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  distance?: number
  healthierOptions: HealthierOption[]
}

export interface HealthierOption {
  dishName: string
  stallName: string
  calories: number
  protein: number
  carbs: number
  fat: number
  saturatedFat: number
  sodium: number
  fiber: number
  sugar: number
  healthBenefits: string[]
  conditionFriendly: string[]
  alternativeTo?: string
}

export interface UserLocation {
  latitude: number
  longitude: number
  timestamp: number
}

export interface LocationRecommendation {
  hawkerCenter: HawkerCenter
  recommendedDishes: HealthierOption[]
  avoidDishes: string[]
  personalizedMessage: string
}
