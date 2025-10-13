import { useState, useEffect } from 'react'
import { FoodPrediction, RewardsData, Badge, PointsEntry } from '../types/food'

const REWARDS_KEY = 'rewards-data'

const BADGES: Badge[] = [
  {
    id: 'first-meal',
    name: 'First Steps',
    description: 'Log your first meal',
    icon: '🌱',
    target: 1
  },
  {
    id: 'week-streak',
    name: 'Week Warrior',
    description: 'Log meals for 7 days straight',
    icon: '🔥',
    target: 7
  },
  {
    id: 'balanced-eater',
    name: 'Balanced Eater',
    description: 'Earn 50+ points in a single meal',
    icon: '⚖️',
    target: 50
  },
  {
    id: 'fiber-fan',
    name: 'Fiber Fan',
    description: 'Log 10 high-fiber meals',
    icon: '🌾',
    target: 10
  },
  {
    id: 'protein-pro',
    name: 'Protein Pro',
    description: 'Log 10 high-protein meals',
    icon: '💪',
    target: 10
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Earn 100 total points',
    icon: '💯',
    target: 100
  },
  {
    id: 'health-champion',
    name: 'Health Champion',
    description: 'Earn 500 total points',
    icon: '🏆',
    target: 500
  }
]

const getStoredRewards = (): RewardsData => {
  const stored = localStorage.getItem(REWARDS_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return {
    totalPoints: 0,
    currentStreak: 0,
    longestStreak: 0,
    badges: BADGES.map(b => ({ ...b, progress: 0 })),
    pointsHistory: []
  }
}

export const useRewardsPoints = () => {
  const [rewards, setRewards] = useState<RewardsData>(getStoredRewards)

  useEffect(() => {
    localStorage.setItem(REWARDS_KEY, JSON.stringify(rewards))
  }, [rewards])

  const calculateMealPoints = (meal: FoodPrediction): number => {
    let points = 0
    
    // Base points for logging (10 points)
    points += 10
    
    // Protein points (0-20 points)
    // Good: 15-40g protein
    if (meal.protein >= 15 && meal.protein <= 40) {
      points += 20
    } else if (meal.protein >= 10) {
      points += 10
    }
    
    // Fiber points (0-15 points)
    // Good: 5g+ fiber
    if (meal.fiber >= 5) {
      points += 15
    } else if (meal.fiber >= 3) {
      points += 10
    }
    
    // Low sodium bonus (0-15 points)
    // Good: under 600mg
    if (meal.sodium < 400) {
      points += 15
    } else if (meal.sodium < 600) {
      points += 10
    }
    
    // Low sugar bonus (0-15 points)
    // Good: under 10g
    if (meal.sugar < 5) {
      points += 15
    } else if (meal.sugar < 10) {
      points += 10
    }
    
    // Balanced macros bonus (0-15 points)
    const totalMacros = meal.protein + meal.carbs + meal.fat
    const proteinRatio = meal.protein / totalMacros
    const carbRatio = meal.carbs / totalMacros
    const fatRatio = meal.fat / totalMacros
    
    // Ideal ratios: Protein 20-35%, Carbs 45-65%, Fat 20-35%
    if (proteinRatio >= 0.20 && proteinRatio <= 0.35 &&
        carbRatio >= 0.45 && carbRatio <= 0.65 &&
        fatRatio >= 0.20 && fatRatio <= 0.35) {
      points += 15
    } else if (proteinRatio >= 0.15 && fatRatio <= 0.40) {
      points += 8
    }
    
    // Calorie range bonus (0-10 points)
    // Good: 300-700 calories per meal
    if (meal.calories >= 300 && meal.calories <= 700) {
      points += 10
    } else if (meal.calories >= 200 && meal.calories <= 800) {
      points += 5
    }
    
    return Math.min(points, 100) // Cap at 100 points
  }

  const getPointsReason = (points: number): string => {
    if (points >= 80) return 'Excellent balanced meal! 🌟'
    if (points >= 60) return 'Great nutritional choice! 💚'
    if (points >= 40) return 'Good healthy meal! 👍'
    if (points >= 20) return 'Nice meal logged! ✨'
    return 'Meal tracked! 📝'
  }

  const addMealPoints = (meal: FoodPrediction) => {
    const points = calculateMealPoints(meal)
    const reason = getPointsReason(points)
    
    const entry: PointsEntry = {
      date: new Date(meal.timestamp).toDateString(),
      points,
      mealName: meal.name,
      reason
    }

    setRewards(prev => {
      const newTotalPoints = prev.totalPoints + points
      const updatedBadges = checkBadgeProgress(prev.badges, newTotalPoints, meal, prev.pointsHistory.length + 1)
      
      return {
        ...prev,
        totalPoints: newTotalPoints,
        badges: updatedBadges,
        pointsHistory: [entry, ...prev.pointsHistory]
      }
    })

    return { points, reason }
  }

  const checkBadgeProgress = (
    badges: Badge[], 
    totalPoints: number, 
    meal: FoodPrediction,
    totalMeals: number
  ): Badge[] => {
    return badges.map(badge => {
      let progress = badge.progress || 0
      let unlockedAt = badge.unlockedAt

      switch (badge.id) {
        case 'first-meal':
          progress = totalMeals
          if (totalMeals >= 1 && !unlockedAt) {
            unlockedAt = Date.now()
          }
          break
        
        case 'century-club':
          progress = totalPoints
          if (totalPoints >= 100 && !unlockedAt) {
            unlockedAt = Date.now()
          }
          break
        
        case 'health-champion':
          progress = totalPoints
          if (totalPoints >= 500 && !unlockedAt) {
            unlockedAt = Date.now()
          }
          break
        
        case 'balanced-eater':
          const mealPoints = calculateMealPoints(meal)
          if (mealPoints >= 50) {
            progress = Math.min((progress || 0) + 1, badge.target || 1)
            if (progress >= (badge.target || 1) && !unlockedAt) {
              unlockedAt = Date.now()
            }
          }
          break
        
        case 'fiber-fan':
          if (meal.fiber >= 5) {
            progress = Math.min((progress || 0) + 1, badge.target || 10)
            if (progress >= (badge.target || 10) && !unlockedAt) {
              unlockedAt = Date.now()
            }
          }
          break
        
        case 'protein-pro':
          if (meal.protein >= 20) {
            progress = Math.min((progress || 0) + 1, badge.target || 10)
            if (progress >= (badge.target || 10) && !unlockedAt) {
              unlockedAt = Date.now()
            }
          }
          break
      }

      return { ...badge, progress, unlockedAt }
    })
  }

  const updateStreak = (lastLogDate: string) => {
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    
    setRewards(prev => {
      if (lastLogDate === today) {
        return prev
      }
      
      let newStreak = prev.currentStreak
      
      if (lastLogDate === yesterday) {
        newStreak += 1
      } else {
        newStreak = 1
      }
      
      const newLongestStreak = Math.max(newStreak, prev.longestStreak)
      
      // Check week streak badge
      const updatedBadges = prev.badges.map(badge => {
        if (badge.id === 'week-streak' && newStreak >= 7 && !badge.unlockedAt) {
          return { ...badge, progress: newStreak, unlockedAt: Date.now() }
        }
        if (badge.id === 'week-streak') {
          return { ...badge, progress: newStreak }
        }
        return badge
      })
      
      return {
        ...prev,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        badges: updatedBadges
      }
    })
  }

  return {
    rewards,
    addMealPoints,
    updateStreak,
    calculateMealPoints,
    getPointsReason
  }
}
