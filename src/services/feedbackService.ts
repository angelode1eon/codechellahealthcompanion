import { FoodPrediction, DailyIntake } from '../types/food'
import { NutrientTargets } from '../types/healthhub'

export interface FeedbackMessage {
  message: string
  type: 'success' | 'warning' | 'caution'
  color: string
  emoji: string
  nutrient?: string
}

const FEEDBACK_COLORS = {
  success: '#88B04B', // Memphis green
  warning: '#FFA07A', // Memphis coral
  caution: '#FF6F61'  // Memphis red
}

const getPercentageOfTarget = (current: number, target: number): number => {
  return (current / target) * 100
}

const generateSodiumFeedback = (
  totalSodium: number,
  sodiumTarget: number,
  mealSodium: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalSodium, sodiumTarget)
  
  if (percentage >= 90) {
    return {
      message: `Eh careful ah! Sodium already ${percentage.toFixed(0)}% of your limit liao. Try to go easy on the salt for dinner hor 🧂`,
      type: 'caution',
      color: FEEDBACK_COLORS.caution,
      emoji: '⚠️',
      nutrient: 'sodium'
    }
  } else if (percentage >= 70) {
    return {
      message: `Wah, sodium getting high leh (${percentage.toFixed(0)}%). Maybe choose something lighter for your next meal? 🤔`,
      type: 'warning',
      color: FEEDBACK_COLORS.warning,
      emoji: '⚡',
      nutrient: 'sodium'
    }
  } else if (mealSodium < sodiumTarget * 0.3) {
    return {
      message: `Good choice sia! This meal quite low in sodium, keep it up! 👍`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '✨',
      nutrient: 'sodium'
    }
  }
  
  return null
}

const generateSugarFeedback = (
  totalSugar: number,
  sugarTarget: number,
  mealSugar: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalSugar, sugarTarget)
  
  if (percentage >= 90) {
    return {
      message: `Aiyo! Sugar intake very high already (${percentage.toFixed(0)}%). Better avoid sweet drinks and desserts today ah 🍬`,
      type: 'caution',
      color: FEEDBACK_COLORS.caution,
      emoji: '🚨',
      nutrient: 'sugar'
    }
  } else if (percentage >= 70) {
    return {
      message: `Sugar level getting there leh (${percentage.toFixed(0)}%). Try to cut down on sweet stuff for now 🍭`,
      type: 'warning',
      color: FEEDBACK_COLORS.warning,
      emoji: '⚠️',
      nutrient: 'sugar'
    }
  } else if (mealSugar < sugarTarget * 0.2) {
    return {
      message: `Shiok! Low sugar meal, your body will thank you! 🌟`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '💚',
      nutrient: 'sugar'
    }
  }
  
  return null
}

const generateProteinFeedback = (
  totalProtein: number,
  proteinTarget: number,
  mealProtein: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalProtein, proteinTarget)
  
  if (mealProtein >= proteinTarget * 0.4) {
    return {
      message: `Wah power! This meal got ${mealProtein}g protein, very good for muscle building! 💪`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '🔥',
      nutrient: 'protein'
    }
  } else if (percentage < 50 && mealProtein < proteinTarget * 0.2) {
    return {
      message: `Eh, protein a bit low leh. Maybe add some chicken, fish or tofu next time? 🍗`,
      type: 'warning',
      color: FEEDBACK_COLORS.warning,
      emoji: '💭',
      nutrient: 'protein'
    }
  }
  
  return null
}

const generateFatFeedback = (
  totalFat: number,
  fatTarget: number,
  mealFat: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalFat, fatTarget)
  
  if (percentage >= 90) {
    return {
      message: `Walao! Fat intake quite high already (${percentage.toFixed(0)}%). Try to eat lighter for the rest of the day 🥗`,
      type: 'caution',
      color: FEEDBACK_COLORS.caution,
      emoji: '⚠️',
      nutrient: 'fat'
    }
  } else if (mealFat < fatTarget * 0.25) {
    return {
      message: `Good job sia! This meal low in fat and quite healthy 👏`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '✅',
      nutrient: 'fat'
    }
  }
  
  return null
}

const generateCalorieFeedback = (
  totalCalories: number,
  calorieTarget: number,
  mealCalories: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalCalories, calorieTarget)
  
  if (percentage >= 95) {
    return {
      message: `Wah, you almost hit your calorie limit liao (${percentage.toFixed(0)}%)! Maybe skip supper tonight? 😅`,
      type: 'caution',
      color: FEEDBACK_COLORS.caution,
      emoji: '🔴',
      nutrient: 'calories'
    }
  } else if (percentage >= 75) {
    return {
      message: `You're at ${percentage.toFixed(0)}% of your daily calories. Still got room for one more light meal! 🍽️`,
      type: 'warning',
      color: FEEDBACK_COLORS.warning,
      emoji: '📊',
      nutrient: 'calories'
    }
  }
  
  return null
}

const generateFiberFeedback = (
  totalFiber: number,
  fiberTarget: number,
  mealFiber: number
): FeedbackMessage | null => {
  const percentage = getPercentageOfTarget(totalFiber, fiberTarget)
  
  if (mealFiber >= 8) {
    return {
      message: `Steady lah! This meal got ${mealFiber}g fiber, very good for digestion! 🌾`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '🌟',
      nutrient: 'fiber'
    }
  } else if (percentage < 40) {
    return {
      message: `Fiber still quite low (${percentage.toFixed(0)}%). Try to add more veggies or fruits later! 🥬`,
      type: 'warning',
      color: FEEDBACK_COLORS.warning,
      emoji: '🥗',
      nutrient: 'fiber'
    }
  }
  
  return null
}

const generateBalancedMealFeedback = (
  meal: FoodPrediction,
  targets: NutrientTargets
): FeedbackMessage | null => {
  const proteinRatio = meal.protein / (meal.calories / 4)
  const carbRatio = meal.carbs / (meal.calories / 4)
  const fatRatio = meal.fat / (meal.calories / 9)
  
  // Check if meal is well-balanced (protein 20-35%, carbs 45-65%, fat 20-35%)
  const isBalanced = 
    proteinRatio >= 0.15 && proteinRatio <= 0.40 &&
    carbRatio >= 0.40 && carbRatio <= 0.70 &&
    fatRatio >= 0.15 && fatRatio <= 0.40
  
  if (isBalanced && meal.fiber >= 5) {
    return {
      message: `Wah perfect! This meal very balanced - got protein, carbs, and fiber. Confirm healthy! 🎯`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '⭐',
      nutrient: 'balance'
    }
  }
  
  return null
}

export const generateMealFeedback = (
  meal: FoodPrediction,
  dailyIntake: DailyIntake,
  targets: NutrientTargets
): FeedbackMessage[] => {
  const feedback: FeedbackMessage[] = []
  
  // Priority order: Critical warnings first, then positive feedback
  
  // Check sodium (critical for hypertension)
  const sodiumFeedback = generateSodiumFeedback(
    dailyIntake.totalSodium,
    targets.sodium.max,
    meal.sodium
  )
  if (sodiumFeedback) feedback.push(sodiumFeedback)
  
  // Check sugar (critical for diabetes)
  const sugarFeedback = generateSugarFeedback(
    dailyIntake.totalSugar,
    targets.sugar.max,
    meal.sugar
  )
  if (sugarFeedback) feedback.push(sugarFeedback)
  
  // Check calories
  const calorieFeedback = generateCalorieFeedback(
    dailyIntake.totalCalories,
    targets.calories.recommended,
    meal.calories
  )
  if (calorieFeedback) feedback.push(calorieFeedback)
  
  // Check fat
  const fatFeedback = generateFatFeedback(
    dailyIntake.totalFat,
    targets.fat.max,
    meal.fat
  )
  if (fatFeedback) feedback.push(fatFeedback)
  
  // Check protein (positive feedback)
  const proteinFeedback = generateProteinFeedback(
    dailyIntake.totalProtein,
    targets.protein.recommended,
    meal.protein
  )
  if (proteinFeedback) feedback.push(proteinFeedback)
  
  // Check fiber (positive feedback)
  const fiberFeedback = generateFiberFeedback(
    dailyIntake.totalFiber,
    targets.fiber.recommended,
    meal.fiber
  )
  if (fiberFeedback) feedback.push(fiberFeedback)
  
  // Check overall balance
  const balancedFeedback = generateBalancedMealFeedback(meal, targets)
  if (balancedFeedback) feedback.push(balancedFeedback)
  
  // If no specific feedback, give general encouragement
  if (feedback.length === 0) {
    feedback.push({
      message: `Nice! Meal logged successfully. Keep tracking to stay healthy! 📝`,
      type: 'success',
      color: FEEDBACK_COLORS.success,
      emoji: '✨',
      nutrient: 'general'
    })
  }
  
  // Limit to top 2 most important messages
  return feedback.slice(0, 2)
}
