import { UserProfile, DailyNutrientTargets, HealthSummary, ConditionNote } from '../types/user'

const HPB_GUIDELINES = {
  diabetes: {
    calories: { male: 1800, female: 1500 },
    carbohydrates: { percentage: 0.45, max: 200 },
    sugar: { max: 25 },
    fiber: { min: 25 },
    sodium: { max: 2000 },
    notes: [
      'Choose low GI foods like brown rice and wholegrain bread',
      'Limit sugary drinks and desserts',
      'Eat regular meals to maintain stable blood sugar',
      'Include high-fiber foods in every meal'
    ]
  },
  hypertension: {
    sodium: { max: 1500 },
    potassium: { min: 3500 },
    fat: { percentage: 0.25 },
    saturatedFat: { max: 13 },
    notes: [
      'Ask for "少盐" (less salt) when ordering',
      'Avoid processed foods and sauces',
      'Choose steamed or boiled dishes over fried',
      'Eat more fruits and vegetables for potassium'
    ]
  },
  highCholesterol: {
    saturatedFat: { max: 13 },
    transFat: { max: 2 },
    cholesterol: { max: 200 },
    fiber: { min: 25 },
    notes: [
      'Choose lean meats and remove skin from chicken',
      'Limit egg yolks to 3-4 per week',
      'Eat more oats, beans, and vegetables',
      'Avoid deep-fried foods and coconut milk dishes'
    ]
  },
  kidneyDisease: {
    protein: { percentage: 0.15, max: 60 },
    sodium: { max: 1500 },
    potassium: { max: 2000 },
    phosphorus: { max: 1000 },
    notes: [
      'Limit protein intake - choose smaller portions',
      'Avoid high-potassium foods like bananas and durian',
      'Reduce salt and salty condiments',
      'Consult your doctor before making diet changes'
    ]
  },
  preDiabetes: {
    calories: { male: 2000, female: 1600 },
    carbohydrates: { percentage: 0.50 },
    sugar: { max: 30 },
    fiber: { min: 25 },
    notes: [
      'Focus on portion control and regular meals',
      'Choose wholegrain options when available',
      'Limit sugary drinks - drink plain water instead',
      'Stay active with at least 150 minutes of exercise weekly'
    ]
  }
}

export const calculateDailyTargets = (user: UserProfile): DailyNutrientTargets => {
  const { age, weight, height, gender, activityLevel, medicalConditions } = user
  
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161

  const activityMultipliers = {
    'sedentary': 1.2,
    'light': 1.375,
    'moderate': 1.55,
    'active': 1.725,
    'very-active': 1.9
  }

  let baseCalories = Math.round(bmr * activityMultipliers[activityLevel])
  
  const hasDiabetes = medicalConditions.some(c => c.name.toLowerCase().includes('diabetes'))
  const hasHypertension = medicalConditions.some(c => c.name.toLowerCase().includes('hypertension') || c.name.toLowerCase().includes('blood pressure'))
  const hasHighCholesterol = medicalConditions.some(c => c.name.toLowerCase().includes('cholesterol'))
  const hasKidneyDisease = medicalConditions.some(c => c.name.toLowerCase().includes('kidney'))

  if (hasDiabetes) {
    baseCalories = Math.min(baseCalories, gender === 'male' ? 1800 : 1500)
  }

  const proteinPercentage = hasKidneyDisease ? 0.15 : 0.20
  const carbPercentage = hasDiabetes ? 0.45 : 0.50
  const fatPercentage = hasHypertension || hasHighCholesterol ? 0.25 : 0.30

  const protein = Math.round((baseCalories * proteinPercentage) / 4)
  const carbohydrates = Math.round((baseCalories * carbPercentage) / 4)
  const fat = Math.round((baseCalories * fatPercentage) / 9)

  let sodium = 2300
  if (hasHypertension || hasKidneyDisease) sodium = 1500
  else if (hasDiabetes) sodium = 2000

  let sugar = 50
  if (hasDiabetes) sugar = 25
  else if (medicalConditions.length > 0) sugar = 30

  const fiber = 25
  const saturatedFat = hasHighCholesterol || hasHypertension ? 13 : 20

  return {
    calories: baseCalories,
    protein,
    carbohydrates,
    fat,
    sodium,
    sugar,
    fiber,
    saturatedFat
  }
}

export const generateHealthSummary = (user: UserProfile, targets: DailyNutrientTargets): HealthSummary => {
  const conditionNotes: ConditionNote[] = []
  const recommendations: string[] = []
  const warnings: string[] = []

  let overallScore = 100

  user.medicalConditions.forEach(condition => {
    const conditionName = condition.name.toLowerCase()

    if (conditionName.includes('diabetes')) {
      conditionNotes.push({
        condition: 'Diabetes Management',
        severity: condition.severity === 'severe' ? 'critical' : 'warning',
        message: `Keep blood sugar stable with low GI foods. Your daily sugar limit is ${targets.sugar}g.`,
        icon: '🩺'
      })
      recommendations.push(...HPB_GUIDELINES.diabetes.notes)
      if (condition.severity === 'severe') overallScore -= 15
      else overallScore -= 10
    }

    if (conditionName.includes('hypertension') || conditionName.includes('blood pressure')) {
      conditionNotes.push({
        condition: 'Blood Pressure Control',
        severity: condition.severity === 'severe' ? 'critical' : 'warning',
        message: `Low sodium recommended! Your daily limit is ${targets.sodium}mg. Ask for "少盐" when ordering.`,
        icon: '💓'
      })
      recommendations.push(...HPB_GUIDELINES.hypertension.notes)
      if (condition.severity === 'severe') overallScore -= 15
      else overallScore -= 10
    }

    if (conditionName.includes('cholesterol')) {
      conditionNotes.push({
        condition: 'Cholesterol Management',
        severity: condition.severity === 'severe' ? 'critical' : 'warning',
        message: `Limit saturated fat to ${targets.saturatedFat}g daily. Choose lean meats and avoid fried foods.`,
        icon: '❤️'
      })
      recommendations.push(...HPB_GUIDELINES.highCholesterol.notes)
      if (condition.severity === 'severe') overallScore -= 15
      else overallScore -= 10
    }

    if (conditionName.includes('kidney')) {
      conditionNotes.push({
        condition: 'Kidney Health',
        severity: 'critical',
        message: `Limit protein to ${targets.protein}g and sodium to ${targets.sodium}mg daily. Consult your doctor regularly.`,
        icon: '🏥'
      })
      recommendations.push(...HPB_GUIDELINES.kidneyDisease.notes)
      warnings.push('⚠️ Kidney disease requires strict dietary control. Please consult your healthcare provider before making changes.')
      overallScore -= 20
    }

    if (conditionName.includes('pre-diabetes') || conditionName.includes('prediabetes')) {
      conditionNotes.push({
        condition: 'Pre-Diabetes Prevention',
        severity: 'info',
        message: `You can reverse this! Focus on portion control and choose wholegrain options.`,
        icon: '💪'
      })
      recommendations.push(...HPB_GUIDELINES.preDiabetes.notes)
      overallScore -= 5
    }
  })

  if (conditionNotes.length === 0) {
    conditionNotes.push({
      condition: 'Healthy Status',
      severity: 'info',
      message: 'Shiok! No medical conditions detected. Keep up the healthy eating! 🎉',
      icon: '✅'
    })
    recommendations.push(
      'Maintain a balanced diet with variety',
      'Stay active with regular exercise',
      'Drink plenty of water daily',
      'Get adequate sleep (7-9 hours)'
    )
  }

  user.dietaryRestrictions.forEach(restriction => {
    if (restriction.type === 'halal') {
      recommendations.push('🕌 Look for halal-certified hawker stalls')
    } else if (restriction.type === 'vegetarian' || restriction.type === 'vegan') {
      recommendations.push('🥬 Choose vegetable-based dishes and ask for no meat/eggs')
    } else if (restriction.type === 'gluten-free') {
      recommendations.push('🌾 Avoid wheat noodles, choose rice or rice noodles instead')
    }
  })

  return {
    overallScore: Math.max(0, Math.min(100, overallScore)),
    conditionNotes,
    recommendations: [...new Set(recommendations)].slice(0, 6),
    warnings
  }
}
