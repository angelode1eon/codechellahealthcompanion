import { HawkerCenter, UserLocation, LocationRecommendation, HealthierOption } from '../types/location'
import { SINGAPORE_HAWKER_CENTERS } from '../data/hawkerCenters'
import { UserHealthProfile } from '../types/healthhub'
import { NutrientTargets } from '../types/healthhub'

const EARTH_RADIUS_KM = 6371

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_KM * c
}

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

// Get user's current location
export const getUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: Date.now()
        })
      },
      (error) => {
        let errorMessage = 'Unable to get your location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access in your browser settings.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please try again.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.'
            break
        }
        reject(new Error(errorMessage))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}

// Find nearby hawker centers
export const findNearbyHawkerCenters = (
  userLocation: UserLocation,
  maxDistance: number = 3
): HawkerCenter[] => {
  return SINGAPORE_HAWKER_CENTERS.map((center) => ({
    ...center,
    distance: calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      center.latitude,
      center.longitude
    )
  }))
    .filter((center) => center.distance! <= maxDistance)
    .sort((a, b) => a.distance! - b.distance!)
}

// Filter dishes based on user's health conditions
const filterByHealthConditions = (
  dishes: HealthierOption[],
  conditions: string[]
): HealthierOption[] => {
  if (conditions.length === 0 || conditions.includes('none')) {
    return dishes
  }

  return dishes.filter((dish) => {
    return conditions.some((condition) =>
      dish.conditionFriendly.includes(condition)
    )
  })
}

// Score dishes based on nutrient targets
const scoreDish = (
  dish: HealthierOption,
  targets: NutrientTargets,
  conditions: string[]
): number => {
  let score = 100

  // Calorie check (within 80-120% of target per meal, assuming 3 meals)
  const mealCalorieTarget = targets.calories / 3
  const calorieRatio = dish.calories / mealCalorieTarget
  if (calorieRatio > 1.2) score -= 20
  else if (calorieRatio < 0.8) score -= 10

  // Condition-specific penalties
  if (conditions.includes('diabetes')) {
    if (dish.sugar > 10) score -= 15
    if (dish.carbs > 60) score -= 10
  }

  if (conditions.includes('hypertension')) {
    if (dish.sodium > 700) score -= 20
    else if (dish.sodium > 500) score -= 10
  }

  if (conditions.includes('high-cholesterol')) {
    if (dish.saturatedFat > 5) score -= 15
    if (dish.fat > 15) score -= 10
  }

  if (conditions.includes('kidney-disease')) {
    if (dish.sodium > 600) score -= 20
    if (dish.protein > 25) score -= 10
  }

  if (conditions.includes('obesity')) {
    if (dish.calories > 450) score -= 15
    if (dish.fat > 15) score -= 10
  }

  // Bonus for high fiber
  if (dish.fiber >= 6) score += 10
  else if (dish.fiber >= 4) score += 5

  // Bonus for high protein (if not kidney disease)
  if (!conditions.includes('kidney-disease') && dish.protein >= 25) {
    score += 5
  }

  return Math.max(0, score)
}

// Generate personalized message
const generatePersonalizedMessage = (
  hawkerCenter: HawkerCenter,
  topDish: HealthierOption,
  conditions: string[]
): string => {
  const messages: string[] = [
    `Eh you're near ${hawkerCenter.name}! 📍`
  ]

  if (topDish.alternativeTo) {
    messages.push(`Try ${topDish.dishName} instead of ${topDish.alternativeTo} leh!`)
  } else {
    messages.push(`Try ${topDish.dishName} from ${topDish.stallName}!`)
  }

  // Add condition-specific advice
  if (conditions.includes('diabetes') && topDish.sugar < 8) {
    messages.push('Lower sugar, good for blood glucose control! 🩸')
  }

  if (conditions.includes('hypertension') && topDish.sodium < 600) {
    messages.push('Lower sodium, better for your blood pressure! ❤️')
  }

  if (conditions.includes('high-cholesterol') && topDish.saturatedFat < 4) {
    messages.push('Low saturated fat, heart-friendly choice! 💚')
  }

  if (conditions.includes('obesity') && topDish.calories < 400) {
    messages.push('Lower calories, helps with weight management! ⚖️')
  }

  // Add health benefits
  if (topDish.healthBenefits.length > 0) {
    messages.push(`Plus: ${topDish.healthBenefits.slice(0, 2).join(', ')}! ✨`)
  }

  return messages.join(' ')
}

// Get personalized recommendations
export const getPersonalizedRecommendations = (
  userLocation: UserLocation,
  profile: UserHealthProfile,
  targets: NutrientTargets
): LocationRecommendation[] => {
  const nearbyHawkers = findNearbyHawkerCenters(userLocation, 3)

  return nearbyHawkers.map((hawker) => {
    // Filter dishes by conditions
    const suitableDishes = filterByHealthConditions(
      hawker.healthierOptions,
      profile.medicalConditions
    )

    // Score and sort dishes
    const scoredDishes = suitableDishes
      .map((dish) => ({
        dish,
        score: scoreDish(dish, targets, profile.medicalConditions)
      }))
      .sort((a, b) => b.score - a.score)

    const recommendedDishes = scoredDishes
      .filter((item) => item.score >= 60)
      .map((item) => item.dish)
      .slice(0, 3)

    // Get dishes to avoid
    const avoidDishes = hawker.healthierOptions
      .filter((dish) => !recommendedDishes.includes(dish))
      .filter((dish) => dish.alternativeTo)
      .map((dish) => dish.alternativeTo!)
      .filter((name, index, self) => self.indexOf(name) === index)
      .slice(0, 3)

    const personalizedMessage =
      recommendedDishes.length > 0
        ? generatePersonalizedMessage(
            hawker,
            recommendedDishes[0],
            profile.medicalConditions
          )
        : `${hawker.name} is nearby! Check out their healthier options! 🍽️`

    return {
      hawkerCenter: hawker,
      recommendedDishes,
      avoidDishes,
      personalizedMessage
    }
  }).filter((rec) => rec.recommendedDishes.length > 0)
}

// Format distance for display
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m away`
  }
  return `${distance.toFixed(1)}km away`
}
