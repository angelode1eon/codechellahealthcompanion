import { useState, useEffect } from 'react'
import { FoodPrediction, MealHistory, DailyStats } from '../types/food'

const HISTORY_KEY = 'meal-history'

const getStoredHistory = (): MealHistory => {
  const stored = localStorage.getItem(HISTORY_KEY)
  return stored ? JSON.parse(stored) : {}
}

export const useMealHistory = () => {
  const [history, setHistory] = useState<MealHistory>(getStoredHistory)

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  const addMealToHistory = (meal: FoodPrediction) => {
    const dateKey = new Date(meal.timestamp!).toDateString()
    setHistory(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), meal]
    }))
  }

  const getMealsForDate = (date: Date): FoodPrediction[] => {
    const dateKey = date.toDateString()
    return history[dateKey] || []
  }

  const getWeeklyStats = (): DailyStats[] => {
    const stats: DailyStats[] = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = date.toDateString()
      const meals = history[dateKey] || []
      
      stats.push({
        date: dateKey,
        calories: meals.reduce((sum, m) => sum + m.calories, 0),
        protein: meals.reduce((sum, m) => sum + m.protein, 0),
        carbs: meals.reduce((sum, m) => sum + m.carbs, 0),
        fat: meals.reduce((sum, m) => sum + m.fat, 0),
        sodium: meals.reduce((sum, m) => sum + m.sodium, 0),
        fiber: meals.reduce((sum, m) => sum + m.fiber, 0),
        sugar: meals.reduce((sum, m) => sum + m.sugar, 0),
        mealCount: meals.length
      })
    }
    
    return stats
  }

  const getMonthlyStats = (): DailyStats[] => {
    const stats: DailyStats[] = []
    const today = new Date()
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateKey = date.toDateString()
      const meals = history[dateKey] || []
      
      stats.push({
        date: dateKey,
        calories: meals.reduce((sum, m) => sum + m.calories, 0),
        protein: meals.reduce((sum, m) => sum + m.protein, 0),
        carbs: meals.reduce((sum, m) => sum + m.carbs, 0),
        fat: meals.reduce((sum, m) => sum + m.fat, 0),
        sodium: meals.reduce((sum, m) => sum + m.sodium, 0),
        fiber: meals.reduce((sum, m) => sum + m.fiber, 0),
        sugar: meals.reduce((sum, m) => sum + m.sugar, 0),
        mealCount: meals.length
      })
    }
    
    return stats
  }

  const getAverageStats = (stats: DailyStats[]) => {
    const daysWithMeals = stats.filter(s => s.mealCount > 0)
    const count = daysWithMeals.length || 1
    
    return {
      avgCalories: Math.round(daysWithMeals.reduce((sum, s) => sum + s.calories, 0) / count),
      avgProtein: Math.round(daysWithMeals.reduce((sum, s) => sum + s.protein, 0) / count),
      avgCarbs: Math.round(daysWithMeals.reduce((sum, s) => sum + s.carbs, 0) / count),
      avgFat: Math.round(daysWithMeals.reduce((sum, s) => sum + s.fat, 0) / count),
      avgSodium: Math.round(daysWithMeals.reduce((sum, s) => sum + s.sodium, 0) / count),
      avgFiber: Math.round(daysWithMeals.reduce((sum, s) => sum + s.fiber, 0) / count),
      avgSugar: Math.round(daysWithMeals.reduce((sum, s) => sum + s.sugar, 0) / count),
      totalMeals: daysWithMeals.reduce((sum, s) => sum + s.mealCount, 0),
      activeDays: daysWithMeals.length
    }
  }

  const getAllMeals = (): FoodPrediction[] => {
    return Object.values(history)
      .flat()
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  }

  return {
    history,
    addMealToHistory,
    getMealsForDate,
    getWeeklyStats,
    getMonthlyStats,
    getAverageStats,
    getAllMeals
  }
}
