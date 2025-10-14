import React from 'react'
import { Target, TrendingUp, AlertCircle } from 'lucide-react'
import { HealthSummary, DailyIntake } from '../types/healthhub'

interface PersonalizedDashboardProps {
  summary: HealthSummary
  dailyIntake: DailyIntake
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({ summary, dailyIntake }) => {
  const { targets } = summary

  const nutrients = [
    {
      name: 'Calories',
      current: dailyIntake.totalCalories,
      target: targets.calories.recommended,
      min: targets.calories.min,
      max: targets.calories.max,
      unit: 'kcal',
      color: '#FF6F61',
      icon: '🔥'
    },
    {
      name: 'Protein',
      current: dailyIntake.totalProtein,
      target: targets.protein.recommended,
      min: targets.protein.min,
      max: targets.protein.max,
      unit: 'g',
      color: '#6B5B95',
      icon: '🥩'
    },
    {
      name: 'Carbs',
      current: dailyIntake.totalCarbs,
      target: targets.carbs.recommended,
      min: targets.carbs.min,
      max: targets.carbs.max,
      unit: 'g',
      color: '#88B04B',
      icon: '🍚'
    },
    {
      name: 'Fat',
      current: dailyIntake.totalFat,
      target: targets.fat.recommended,
      min: targets.fat.min,
      max: targets.fat.max,
      unit: 'g',
      color: '#FFA07A',
      icon: '🥑'
    },
    {
      name: 'Saturated Fat',
      current: dailyIntake.totalSaturatedFat,
      target: targets.saturatedFat.recommended,
      min: targets.saturatedFat.min,
      max: targets.saturatedFat.max,
      unit: 'g',
      color: '#FF8C42',
      icon: '🥓'
    },
    {
      name: 'Sodium',
      current: dailyIntake.totalSodium,
      target: targets.sodium.recommended,
      min: targets.sodium.min,
      max: targets.sodium.max,
      unit: 'mg',
      color: '#20B2AA',
      icon: '🧂'
    },
    {
      name: 'Sugar',
      current: dailyIntake.totalSugar,
      target: targets.sugar.recommended,
      min: targets.sugar.min,
      max: targets.sugar.max,
      unit: 'g',
      color: '#F7CAC9',
      icon: '🍬'
    },
    {
      name: 'Fiber',
      current: dailyIntake.totalFiber,
      target: targets.fiber.recommended,
      min: targets.fiber.min,
      max: targets.fiber.recommended,
      unit: 'g',
      color: '#88B04B',
      icon: '🥦'
    }
  ]

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getStatus = (current: number, min: number, max: number, target: number) => {
    if (current < min) return { text: 'Too Low', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (current > max) return { text: 'Too High', color: 'text-red-600', bg: 'bg-red-100' }
    if (Math.abs(current - target) / target < 0.1) return { text: 'Perfect!', color: 'text-green-600', bg: 'bg-green-100' }
    return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-memphis-cyan via-memphis-purple to-memphis-pink rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-12 h-12" />
            <h2 className="text-5xl font-bold">Your Daily Targets</h2>
          </div>
          <p className="text-2xl opacity-90">Personalized for your health goals 🎯</p>
        </div>
      </div>

      <div className="grid gap-6">
        {nutrients.map((nutrient) => {
          const progress = getProgressPercentage(nutrient.current, nutrient.target)
          const status = getStatus(nutrient.current, nutrient.min, nutrient.max, nutrient.target)

          return (
            <div 
              key={nutrient.name}
              className="bg-white rounded-3xl p-6 shadow-2xl border-8"
              style={{ borderColor: nutrient.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{nutrient.icon}</div>
                  <div>
                    <h3 className="text-3xl font-bold text-memphis-purple">{nutrient.name}</h3>
                    <p className="text-lg text-gray-600">
                      Target: {nutrient.target}{nutrient.unit}
                    </p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full ${status.bg}`}>
                  <span className={`text-lg font-bold ${status.color}`}>{status.text}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Min: {nutrient.min}{nutrient.unit}</span>
                  <span className="font-bold text-memphis-purple">
                    {nutrient.current}{nutrient.unit}
                  </span>
                  <span>Max: {nutrient.max}{nutrient.unit}</span>
                </div>
                <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: nutrient.color
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex-1 h-2 bg-yellow-200 rounded-l-full" />
                <div className="flex-1 h-2 bg-green-200" />
                <div className="flex-1 h-2 bg-red-200 rounded-r-full" />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Below</span>
                <span>Optimal</span>
                <span>Above</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-10 h-10 text-memphis-purple" />
          <h3 className="text-3xl font-bold text-memphis-purple">Today's Tips 💡</h3>
        </div>
        
        <div className="space-y-4">
          {dailyIntake.totalCalories < targets.calories.min && (
            <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">
                You're below your calorie target. Consider adding a healthy snack!
              </p>
            </div>
          )}

          {dailyIntake.totalSodium > targets.sodium.max && (
            <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">
                Sodium intake is high. Choose fresh foods over processed ones for your next meal.
              </p>
            </div>
          )}

          {dailyIntake.totalFiber < targets.fiber.recommended && (
            <div className="bg-blue-100 border-4 border-blue-400 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">
                Boost your fiber! Add more vegetables, fruits, or whole grains.
              </p>
            </div>
          )}

          {dailyIntake.totalProtein >= targets.protein.recommended && 
           dailyIntake.totalFiber >= targets.fiber.recommended && (
            <div className="bg-green-100 border-4 border-green-400 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700">
                Shiok! You're hitting your protein and fiber targets! Keep it up! 💪
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PersonalizedDashboard
