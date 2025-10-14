import { 
  MedicalCondition, 
  TrackedNutrient, 
  ConditionNutrientMapping,
  NutrientAlert,
  UserHealthProfile,
  NutrientTargets,
  DailyIntake
} from '../types/healthhub'

// Condition-to-nutrient mapping with priority
export const CONDITION_NUTRIENT_MAP: ConditionNutrientMapping[] = [
  {
    condition: 'diabetes',
    trackedNutrients: ['sugar', 'carbs'],
    priority: 'high'
  },
  {
    condition: 'hypertension',
    trackedNutrients: ['sodium'],
    priority: 'high'
  },
  {
    condition: 'high-cholesterol',
    trackedNutrients: ['saturatedFat'],
    priority: 'high'
  },
  {
    condition: 'kidney-disease',
    trackedNutrients: ['protein', 'sodium'],
    priority: 'high'
  },
  {
    condition: 'heart-disease',
    trackedNutrients: ['sodium', 'saturatedFat'],
    priority: 'high'
  },
  {
    condition: 'obesity',
    trackedNutrients: ['calories'],
    priority: 'medium'
  }
]

// Singlish alert messages for different nutrients and thresholds
const ALERT_MESSAGES = {
  sugar: {
    90: "Wah, you've hit 90% of your sugar target already leh! Maybe go easy on dessert later?",
    100: "Alamak! You've reached your sugar limit for today. Better skip the sweet stuff now.",
    110: "Aiyo! You've exceeded your sugar target! Tomorrow must cut down hor."
  },
  carbs: {
    90: "Your carbs intake is at 90% already! Maybe have lighter dinner tonight?",
    100: "You've hit your carb limit for today. Time to focus on proteins and veggies!",
    110: "Carbs over the limit liao! Tomorrow must be more careful with rice and noodles."
  },
  sodium: {
    90: "Eh, your sodium is at 90% already! Better avoid salty foods for the rest of the day.",
    100: "Sodium limit reached! No more adding salt or soy sauce today hor.",
    110: "Wah lau! Sodium too high already! Tomorrow must eat more fresh foods, less processed."
  },
  saturatedFat: {
    90: "Your saturated fat is at 90% liao! Maybe choose leaner options for your next meal?",
    100: "Saturated fat limit reached! Time to go for healthier fats like fish or nuts.",
    110: "Aiyo! Too much saturated fat today. Tomorrow must avoid fried foods and fatty meats."
  },
  protein: {
    90: "Protein intake at 90% already. For kidney health, better not overdo it.",
    100: "You've reached your protein limit. Choose smaller portions for dinner.",
    110: "Protein exceeded! For your kidneys, must be more careful with meat portions."
  },
  calories: {
    90: "You're at 90% of your calorie target! Maybe have a light dinner tonight?",
    100: "Calorie limit reached for today! Time to stop eating unless really hungry.",
    110: "Calories exceeded! Tomorrow must be more mindful of portion sizes hor."
  }
}

// Get tracked nutrients for a user based on their conditions
export const getTrackedNutrients = (conditions: MedicalCondition[]): TrackedNutrient[] => {
  const nutrients = new Set<TrackedNutrient>()
  
  conditions.forEach(condition => {
    const mapping = CONDITION_NUTRIENT_MAP.find(m => m.condition === condition)
    if (mapping) {
      mapping.trackedNutrients.forEach(n => nutrients.add(n))
    }
  })
  
  return Array.from(nutrients)
}

// Get current value for a nutrient from daily intake
const getNutrientValue = (nutrient: TrackedNutrient, intake: DailyIntake): number => {
  switch (nutrient) {
    case 'sugar': return intake.totalSugar
    case 'carbs': return intake.totalCarbs
    case 'sodium': return intake.totalSodium
    case 'saturatedFat': return intake.totalSaturatedFat
    case 'protein': return intake.totalProtein
    case 'calories': return intake.totalCalories
    default: return 0
  }
}

// Get target value for a nutrient
const getNutrientTarget = (nutrient: TrackedNutrient, targets: NutrientTargets): number => {
  switch (nutrient) {
    case 'sugar': return targets.sugar.max
    case 'carbs': return targets.carbs.max
    case 'sodium': return targets.sodium.max
    case 'saturatedFat': return targets.saturatedFat.max
    case 'protein': return targets.protein.max
    case 'calories': return targets.calories.max
    default: return 0
  }
}

// Get alert severity based on percentage
const getAlertSeverity = (percentage: number): 'warning' | 'danger' | 'critical' => {
  if (percentage >= 110) return 'critical'
  if (percentage >= 100) return 'danger'
  return 'warning'
}

// Get alert message based on nutrient and percentage
const getAlertMessage = (nutrient: TrackedNutrient, percentage: number): string => {
  const messages = ALERT_MESSAGES[nutrient]
  
  if (percentage >= 110) return messages[110]
  if (percentage >= 100) return messages[100]
  return messages[90]
}

// Check for threshold alerts
export const checkNutrientAlerts = (
  profile: UserHealthProfile,
  targets: NutrientTargets,
  intake: DailyIntake
): NutrientAlert[] => {
  const alerts: NutrientAlert[] = []
  const trackedNutrients = getTrackedNutrients(profile.medicalConditions)
  
  trackedNutrients.forEach(nutrient => {
    const currentValue = getNutrientValue(nutrient, intake)
    const targetValue = getNutrientTarget(nutrient, targets)
    const percentage = (currentValue / targetValue) * 100
    
    // Only create alerts if >= 90%
    if (percentage >= 90) {
      // Find which condition(s) track this nutrient
      const relatedConditions = CONDITION_NUTRIENT_MAP
        .filter(m => m.trackedNutrients.includes(nutrient))
        .map(m => m.condition)
        .filter(c => profile.medicalConditions.includes(c))
      
      relatedConditions.forEach(condition => {
        alerts.push({
          id: `${nutrient}-${condition}-${Date.now()}`,
          nutrient,
          condition,
          currentValue,
          targetValue,
          percentage: Math.round(percentage),
          severity: getAlertSeverity(percentage),
          message: getAlertMessage(nutrient, percentage),
          timestamp: Date.now(),
          dismissed: false
        })
      })
    }
  })
  
  return alerts
}

// Get nutrient display info
export const getNutrientDisplayInfo = (nutrient: TrackedNutrient) => {
  const info = {
    sugar: { name: 'Sugar', unit: 'g', icon: '🍬', color: '#F7CAC9' },
    carbs: { name: 'Carbs', unit: 'g', icon: '🍚', color: '#88B04B' },
    sodium: { name: 'Sodium', unit: 'mg', icon: '🧂', color: '#20B2AA' },
    saturatedFat: { name: 'Saturated Fat', unit: 'g', icon: '🥓', color: '#FF8C42' },
    protein: { name: 'Protein', unit: 'g', icon: '🥩', color: '#6B5B95' },
    calories: { name: 'Calories', unit: 'kcal', icon: '🔥', color: '#FF6F61' }
  }
  
  return info[nutrient]
}

// Get condition display info
export const getConditionDisplayInfo = (condition: MedicalCondition) => {
  const info = {
    'diabetes': { name: 'Diabetes', icon: '🩸', color: '#FF6B6B' },
    'hypertension': { name: 'Hypertension', icon: '❤️', color: '#FF6B6B' },
    'high-cholesterol': { name: 'High Cholesterol', icon: '🫀', color: '#FFA07A' },
    'kidney-disease': { name: 'Kidney Disease', icon: '🫘', color: '#FF8C42' },
    'heart-disease': { name: 'Heart Disease', icon: '💚', color: '#88B04B' },
    'obesity': { name: 'Obesity', icon: '⚖️', color: '#6B5B95' },
    'none': { name: 'General Health', icon: '✨', color: '#88B04B' }
  }
  
  return info[condition]
}
