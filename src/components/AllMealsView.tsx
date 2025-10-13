import React from 'react'
import { FoodPrediction } from '../types/food'
import { Clock } from 'lucide-react'

interface AllMealsViewProps {
  meals: FoodPrediction[]
}

const AllMealsView = ({ meals }: AllMealsViewProps) => {
  if (meals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <p className="text-xl text-gray-700 font-bold">No meals logged yet!</p>
        <p className="text-lg text-gray-600 mt-2">Start tracking by uploading a food photo</p>
      </div>
    )
  }

  const groupedMeals = meals.reduce((groups, meal) => {
    const date = new Date(meal.timestamp).toDateString()
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(meal)
    return groups
  }, {} as Record<string, FoodPrediction[]>)

  return (
    <div className="space-y-6">
      {Object.entries(groupedMeals).map(([date, dayMeals]) => {
        const totalCalories = dayMeals.reduce((sum, m) => sum + m.calories, 0)
        const isToday = date === new Date().toDateString()
        
        return (
          <div key={date} className="bg-memphis-pink rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-memphis-purple">
                  {isToday ? '🌟 Today' : new Date(date).toLocaleDateString('en-SG', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h3>
                <p className="text-lg text-memphis-coral font-bold">
                  {dayMeals.length} meal{dayMeals.length !== 1 ? 's' : ''} • {totalCalories} kcal
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {dayMeals.map((meal, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-md">
                  <div className="flex items-center gap-4">
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-20 h-20 rounded-lg object-cover border-4 border-memphis-purple"
                    />
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-memphis-purple">{meal.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(meal.timestamp).toLocaleTimeString('en-SG', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-memphis-coral">{meal.calories}</div>
                      <div className="text-sm text-gray-600">kcal</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-memphis-pink rounded-lg p-2 text-center">
                      <div className="font-bold text-memphis-green">{meal.protein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="bg-memphis-pink rounded-lg p-2 text-center">
                      <div className="font-bold text-memphis-yellow">{meal.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="bg-memphis-pink rounded-lg p-2 text-center">
                      <div className="font-bold text-memphis-lavender">{meal.fat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default AllMealsView
