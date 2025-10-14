import React from 'react'
import { TrendingUp, Target } from 'lucide-react'
import { UserHealthProfile, NutrientTargets, DailyIntake } from '../types/healthhub'
import { getTrackedNutrients, getNutrientDisplayInfo, getConditionDisplayInfo } from '../services/conditionTrackingService'

interface ConditionTrackedNutrientsProps {
  profile: UserHealthProfile
  targets: NutrientTargets
  intake: DailyIntake
}

const ConditionTrackedNutrients: React.FC<ConditionTrackedNutrientsProps> = ({
  profile,
  targets,
  intake
}) => {
  const trackedNutrients = getTrackedNutrients(profile.medicalConditions)

  if (trackedNutrients.length === 0) return null

  const getNutrientValue = (nutrient: string): number => {
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

  const getNutrientTarget = (nutrient: string): number => {
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

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 100) return '#EF4444' // red
    if (percentage >= 90) return '#F59E0B' // orange
    if (percentage >= 75) return '#FCD34D' // yellow
    return '#10B981' // green
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
      <div className="flex items-center gap-3 mb-6">
        <Target className="w-10 h-10 text-memphis-purple" />
        <h2 className="text-4xl font-bold text-memphis-purple">
          Condition-Tracked Nutrients 🎯
        </h2>
      </div>

      <p className="text-xl text-gray-700 mb-6">
        Based on your health conditions, we're monitoring these nutrients extra carefully!
      </p>

      <div className="space-y-6">
        {trackedNutrients.map((nutrient) => {
          const info = getNutrientDisplayInfo(nutrient)
          const current = getNutrientValue(nutrient)
          const target = getNutrientTarget(nutrient)
          const percentage = Math.round((current / target) * 100)
          const progressColor = getProgressColor(percentage)

          return (
            <div
              key={nutrient}
              className="rounded-3xl p-6 border-4"
              style={{ borderColor: info.color, backgroundColor: `${info.color}15` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{info.icon}</span>
                  <div>
                    <h3 className="text-3xl font-bold text-memphis-purple">
                      {info.name}
                    </h3>
                    <p className="text-lg text-gray-600">
                      Daily Limit: {target}{info.unit}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-4xl font-bold text-memphis-purple">
                    {current}{info.unit}
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: progressColor }}
                  >
                    {percentage}%
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="h-8 bg-gray-200 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: progressColor
                    }}
                  />
                  {percentage > 100 && (
                    <div
                      className="absolute top-0 left-0 h-full bg-red-500 opacity-50 animate-pulse"
                      style={{ width: `${Math.min(percentage - 100, 100)}%` }}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex-1 h-3 bg-green-200 rounded-l-full" />
                <div className="flex-1 h-3 bg-yellow-200" />
                <div className="flex-1 h-3 bg-orange-200" />
                <div className="flex-1 h-3 bg-red-200 rounded-r-full" />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>Safe (0-75%)</span>
                <span>Caution (75-90%)</span>
                <span>Warning (90-100%)</span>
                <span>Over (100%+)</span>
              </div>

              {percentage >= 90 && (
                <div className="mt-4 bg-white rounded-2xl p-4 border-2 border-orange-400">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <p className="text-lg font-bold text-orange-800">
                      {percentage >= 100 
                        ? `You've exceeded your ${info.name.toLowerCase()} limit!`
                        : `Almost at your ${info.name.toLowerCase()} limit!`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 bg-memphis-pink rounded-2xl p-6">
        <h4 className="text-2xl font-bold text-memphis-purple mb-3">
          Why We Track These 🤔
        </h4>
        <div className="space-y-2">
          {profile.medicalConditions
            .filter(c => c !== 'none')
            .map((condition) => {
              const info = getConditionDisplayInfo(condition)
              return (
                <div key={condition} className="flex items-center gap-3">
                  <span className="text-3xl">{info.icon}</span>
                  <span className="text-lg text-gray-700">
                    <strong>{info.name}:</strong> Requires careful monitoring
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ConditionTrackedNutrients
