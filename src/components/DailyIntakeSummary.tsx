import React from 'react'
import { TrendingUp, Activity, Zap, Droplet } from 'lucide-react'
import { DailyIntake } from '../types/healthhub'

interface DailyIntakeSummaryProps {
  intake: DailyIntake
}

const DailyIntakeSummary: React.FC<DailyIntakeSummaryProps> = ({ intake }) => {
  const recommendedCalories = 2000
  const caloriePercentage = Math.min((intake.totalCalories / recommendedCalories) * 100, 100)

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-memphis-cyan rounded-full -mr-16 -mt-16 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-memphis-yellow rounded-full -ml-12 -mb-12 opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-memphis-coral p-3 rounded-2xl transform -rotate-6">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-memphis-purple">Today's Intake 📊</h2>
        </div>

        <div className="bg-gradient-to-br from-memphis-coral to-memphis-purple rounded-2xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-6xl font-bold">{intake.totalCalories}</div>
              <div className="text-xl opacity-90">of {recommendedCalories} kcal</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{caloriePercentage.toFixed(0)}%</div>
              <div className="text-lg opacity-90">Daily Goal</div>
            </div>
          </div>
          
          <div className="w-full bg-white bg-opacity-30 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${caloriePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-memphis-green rounded-2xl p-5 text-white transform rotate-1 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm opacity-90">Protein</span>
            </div>
            <div className="text-3xl font-bold">{intake.totalProtein}g</div>
          </div>

          <div className="bg-memphis-yellow rounded-2xl p-5 text-white transform -rotate-1 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm opacity-90">Carbs</span>
            </div>
            <div className="text-3xl font-bold">{intake.totalCarbs}g</div>
          </div>

          <div className="bg-memphis-lavender rounded-2xl p-5 text-white transform -rotate-1 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="w-5 h-5" />
              <span className="text-sm opacity-90">Fat</span>
            </div>
            <div className="text-3xl font-bold">{intake.totalFat}g</div>
          </div>

          <div className="bg-memphis-cyan rounded-2xl p-5 text-white transform rotate-1 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm opacity-90">Sodium</span>
            </div>
            <div className="text-3xl font-bold">{intake.totalSodium}mg</div>
          </div>
        </div>

        <div className="bg-memphis-pink rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-memphis-purple opacity-75 mb-1">Fiber</div>
              <div className="text-2xl font-bold text-memphis-purple">{intake.totalFiber}g</div>
            </div>
            <div>
              <div className="text-sm text-memphis-purple opacity-75 mb-1">Sugar</div>
              <div className="text-2xl font-bold text-memphis-purple">{intake.totalSugar}g</div>
            </div>
          </div>
        </div>

        {intake.meals.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-memphis-purple mb-3">
              Meals Today ({intake.meals.length})
            </h3>
            <div className="space-y-2">
              {intake.meals.map((meal, index) => (
                <div key={index} className="bg-memphis-pink rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={meal.image} 
                      alt={meal.name}
                      className="w-12 h-12 rounded-lg object-cover border-2 border-memphis-purple"
                    />
                    <span className="font-bold text-memphis-purple">{meal.name}</span>
                  </div>
                  <span className="text-lg font-bold text-memphis-coral">{meal.calories} kcal</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyIntakeSummary
