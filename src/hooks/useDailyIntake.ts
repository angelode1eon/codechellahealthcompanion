import { useState, useEffect } from 'react'
import { DailyIntake } from '../types/healthhub'

const STORAGE_KEY = 'daily-intake'

const getInitialIntake = (): DailyIntake => {
  const today = new Date().toDateString()
  const stored = localStorage.getItem(STORAGE_KEY)
  
  if (stored) {
    const data = JSON.parse(stored)
    if (data.date === today) {
      return data.intake
    }
  }
  
  return {
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalSaturatedFat: 0,
    totalSodium: 0,
    totalFiber: 0,
    totalSugar: 0,
    meals: []
  }
}

export const useDailyIntake = () => {
  const [dailyIntake, setDailyIntake] = useState<DailyIntake>(getInitialIntake)

  useEffect(() => {
    const today = new Date().toDateString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      date: today,
      intake: dailyIntake
    }))
  }, [dailyIntake])

  const addMeal = (meal: any) => {
    const mealWithTimestamp = {
      ...meal,
      timestamp: Date.now()
    }
    
    setDailyIntake(prev => ({
      totalCalories: prev.totalCalories + meal.calories,
      totalProtein: prev.totalProtein + meal.protein,
      totalCarbs: prev.totalCarbs + meal.carbs,
      totalFat: prev.totalFat + meal.fat,
      totalSaturatedFat: prev.totalSaturatedFat + (meal.saturatedFat || 0),
      totalSodium: prev.totalSodium + meal.sodium,
      totalFiber: prev.totalFiber + meal.fiber,
      totalSugar: prev.totalSugar + meal.sugar,
      meals: [...prev.meals, mealWithTimestamp]
    }))
    
    return mealWithTimestamp
  }

  const resetIntake = () => {
    setDailyIntake({
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalSaturatedFat: 0,
      totalSodium: 0,
      totalFiber: 0,
      totalSugar: 0,
      meals: []
    })
  }

  return { dailyIntake, addMeal, resetIntake }
}
