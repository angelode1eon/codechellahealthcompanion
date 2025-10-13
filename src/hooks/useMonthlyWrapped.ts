import { useMealHistory } from './useMealHistory'
import { MonthlyWrapped, FoodPrediction } from '../types/food'

export const useMonthlyWrapped = () => {
  const { history } = useMealHistory()

  const generateMonthlyWrapped = (month: number, year: number): MonthlyWrapped => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December']
    
    // Get all meals for the specified month
    const monthMeals: FoodPrediction[] = []
    Object.entries(history).forEach(([dateStr, meals]) => {
      const date = new Date(dateStr)
      if (date.getMonth() === month && date.getFullYear() === year) {
        monthMeals.push(...meals)
      }
    })

    // Get previous month meals for comparison
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const prevMonthMeals: FoodPrediction[] = []
    Object.entries(history).forEach(([dateStr, meals]) => {
      const date = new Date(dateStr)
      if (date.getMonth() === prevMonth && date.getFullYear() === prevYear) {
        prevMonthMeals.push(...meals)
      }
    })

    // Calculate total points
    const totalPoints = monthMeals.reduce((sum, meal) => sum + (meal.points || 0), 0)

    // Count active days
    const activeDays = new Set(
      monthMeals.map(meal => new Date(meal.timestamp).toDateString())
    ).size

    // Find top meals
    const mealCounts: Record<string, { count: number; totalPoints: number; image: string }> = {}
    monthMeals.forEach(meal => {
      if (!mealCounts[meal.name]) {
        mealCounts[meal.name] = { count: 0, totalPoints: 0, image: meal.image }
      }
      mealCounts[meal.name].count++
      mealCounts[meal.name].totalPoints += meal.points || 0
    })

    const topMeals = Object.entries(mealCounts)
      .map(([name, data]) => ({
        name,
        count: data.count,
        avgPoints: Math.round(data.totalPoints / data.count),
        image: data.image
      }))
      .sort((a, b) => b.avgPoints - a.avgPoints)
      .slice(0, 5)

    // Calculate nutrient improvements
    const currentAvg = {
      protein: monthMeals.reduce((sum, m) => sum + m.protein, 0) / (monthMeals.length || 1),
      fiber: monthMeals.reduce((sum, m) => sum + m.fiber, 0) / (monthMeals.length || 1),
      sodium: monthMeals.reduce((sum, m) => sum + m.sodium, 0) / (monthMeals.length || 1),
      sugar: monthMeals.reduce((sum, m) => sum + m.sugar, 0) / (monthMeals.length || 1),
      calories: monthMeals.reduce((sum, m) => sum + m.calories, 0) / (monthMeals.length || 1)
    }

    const prevAvg = {
      protein: prevMonthMeals.reduce((sum, m) => sum + m.protein, 0) / (prevMonthMeals.length || 1),
      fiber: prevMonthMeals.reduce((sum, m) => sum + m.fiber, 0) / (prevMonthMeals.length || 1),
      sodium: prevMonthMeals.reduce((sum, m) => sum + m.sodium, 0) / (prevMonthMeals.length || 1),
      sugar: prevMonthMeals.reduce((sum, m) => sum + m.sugar, 0) / (prevMonthMeals.length || 1),
      calories: prevMonthMeals.reduce((sum, m) => sum + m.calories, 0) / (prevMonthMeals.length || 1)
    }

    const nutrientImprovements = [
      {
        nutrient: 'Protein',
        change: Math.round(((currentAvg.protein - prevAvg.protein) / prevAvg.protein) * 100) || 0,
        trend: currentAvg.protein > prevAvg.protein ? 'up' : currentAvg.protein < prevAvg.protein ? 'down' : 'stable',
        isGood: currentAvg.protein > prevAvg.protein
      },
      {
        nutrient: 'Fiber',
        change: Math.round(((currentAvg.fiber - prevAvg.fiber) / prevAvg.fiber) * 100) || 0,
        trend: currentAvg.fiber > prevAvg.fiber ? 'up' : currentAvg.fiber < prevAvg.fiber ? 'down' : 'stable',
        isGood: currentAvg.fiber > prevAvg.fiber
      },
      {
        nutrient: 'Sodium',
        change: Math.round(((currentAvg.sodium - prevAvg.sodium) / prevAvg.sodium) * 100) || 0,
        trend: currentAvg.sodium > prevAvg.sodium ? 'up' : currentAvg.sodium < prevAvg.sodium ? 'down' : 'stable',
        isGood: currentAvg.sodium < prevAvg.sodium
      },
      {
        nutrient: 'Sugar',
        change: Math.round(((currentAvg.sugar - prevAvg.sugar) / prevAvg.sugar) * 100) || 0,
        trend: currentAvg.sugar > prevAvg.sugar ? 'up' : currentAvg.sugar < prevAvg.sugar ? 'down' : 'stable',
        isGood: currentAvg.sugar < prevAvg.sugar
      }
    ].filter(n => Math.abs(n.change) > 0) as Array<{
      nutrient: string
      change: number
      trend: 'up' | 'down' | 'stable'
      isGood: boolean
    }>

    // Generate achievements
    const achievements: string[] = []
    if (activeDays >= 25) achievements.push('🌟 Consistency Champion - Logged 25+ days!')
    if (totalPoints >= 1000) achievements.push('💎 Point Master - Earned 1000+ points!')
    if (topMeals[0]?.avgPoints >= 80) achievements.push('🏆 Nutrition Expert - Top meal scored 80+ points!')
    if (currentAvg.fiber > prevAvg.fiber) achievements.push('🌾 Fiber Boost - Increased fiber intake!')
    if (currentAvg.sodium < prevAvg.sodium) achievements.push('🧂 Sodium Reducer - Lowered sodium intake!')
    if (monthMeals.length >= 60) achievements.push('📊 Data Collector - Logged 60+ meals!')

    // Calculate health score (0-100)
    let healthScore = 0
    healthScore += Math.min((activeDays / 30) * 30, 30) // 30 points for consistency
    healthScore += Math.min((totalPoints / 2000) * 40, 40) // 40 points for total points
    healthScore += Math.min((nutrientImprovements.filter(n => n.isGood).length / 4) * 30, 30) // 30 points for improvements

    return {
      month: monthNames[month],
      year,
      totalPoints,
      totalMeals: monthMeals.length,
      activeDays,
      topMeals,
      nutrientImprovements,
      achievements,
      avgDailyCalories: Math.round(currentAvg.calories),
      healthScore: Math.round(healthScore)
    }
  }

  return { generateMonthlyWrapped }
}
