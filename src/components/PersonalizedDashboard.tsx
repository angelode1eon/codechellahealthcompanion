import React from 'react'
import { Target, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { UserProfile, DailyNutrientTargets, HealthSummary } from '../types/user'
import { calculateDailyTargets, generateHealthSummary } from '../utils/hpbGuidelines'

interface PersonalizedDashboardProps {
  user: UserProfile
  currentIntake: {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
    sodium: number
    sugar: number
    fiber: number
  }
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({ user, currentIntake }) => {
  const targets = calculateDailyTargets(user)
  const healthSummary = generateHealthSummary(user, targets)

  const calculateProgress = (current: number, target: number): number => {
    return Math.min(100, Math.round((current / target) * 100))
  }

  const getProgressColor = (progress: number, isLowerBetter: boolean = false): string => {
    if (isLowerBetter) {
      if (progress <= 70) return 'bg-memphis-green'
      if (progress <= 90) return 'bg-memphis-yellow'
      return 'bg-memphis-coral'
    }
    if (progress >= 90) return 'bg-memphis-green'
    if (progress >= 70) return 'bg-memphis-yellow'
    return 'bg-memphis-coral'
  }

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      default: return 'border-blue-500 bg-blue-50'
    }
  }

  const nutrients = [
    { name: 'Calories', current: currentIntake.calories, target: targets.calories, unit: 'kcal', icon: '🔥' },
    { name: 'Protein', current: currentIntake.protein, target: targets.protein, unit: 'g', icon: '🥩' },
    { name: 'Carbs', current: currentIntake.carbohydrates, target: targets.carbohydrates, unit: 'g', icon: '🍚' },
    { name: 'Fat', current: currentIntake.fat, target: targets.fat, unit: 'g', icon: '🥑' },
    { name: 'Sodium', current: currentIntake.sodium, target: targets.sodium, unit: 'mg', icon: '🧂', isLowerBetter: true },
    { name: 'Sugar', current: currentIntake.sugar, target: targets.sugar, unit: 'g', icon: '🍬', isLowerBetter: true }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-memphis-purple via-memphis-coral to-memphis-yellow rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">Welcome back, {user.name}! 👋</h2>
          <p className="text-xl opacity-90">Your personalized health dashboard</p>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{user.age}</div>
              <div className="text-sm opacity-90">years old</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{user.weight}kg</div>
              <div className="text-sm opacity-90">weight</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold">{healthSummary.overallScore}</div>
              <div className="text-sm opacity-90">health score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-green">
        <div className="flex items-center gap-3 mb-6">
          <AlertCircle className="w-8 h-8 text-memphis-purple" />
          <h3 className="text-3xl font-bold text-memphis-purple">Your Health Summary</h3>
        </div>

        {healthSummary.warnings.length > 0 && (
          <div className="mb-6 space-y-3">
            {healthSummary.warnings.map((warning, idx) => (
              <div key={idx} className="bg-red-100 border-4 border-red-400 rounded-2xl p-4">
                <p className="text-red-800 font-bold">{warning}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {healthSummary.conditionNotes.map((note, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-5 border-4 ${getSeverityColor(note.severity)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{note.icon}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{note.condition}</h4>
                  <p className="text-gray-700">{note.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {user.dietaryRestrictions.length > 0 && (
          <div className="mt-6 bg-memphis-pink rounded-2xl p-5">
            <h4 className="text-xl font-bold text-memphis-purple mb-3">Dietary Restrictions</h4>
            <div className="flex flex-wrap gap-2">
              {user.dietaryRestrictions.map((restriction) => (
                <span
                  key={restriction.id}
                  className="bg-white text-memphis-purple px-4 py-2 rounded-xl font-bold border-2 border-memphis-purple"
                >
                  {restriction.type.replace('-', ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-cyan">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-memphis-purple" />
          <h3 className="text-3xl font-bold text-memphis-purple">Daily Nutrient Targets</h3>
        </div>

        <p className="text-gray-700 mb-6 text-lg">
          Based on HPB dietary guidelines for your profile
        </p>

        <div className="grid gap-4">
          {nutrients.map((nutrient) => {
            const progress = calculateProgress(nutrient.current, nutrient.target)
            const progressColor = getProgressColor(progress, nutrient.isLowerBetter)

            return (
              <div key={nutrient.name} className="bg-memphis-pink rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{nutrient.icon}</span>
                    <span className="text-xl font-bold text-memphis-purple">{nutrient.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-memphis-purple">
                      {nutrient.current} / {nutrient.target}
                    </div>
                    <div className="text-sm text-gray-600">{nutrient.unit}</div>
                  </div>
                </div>

                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-full ${progressColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="mt-2 text-right text-sm font-bold text-gray-600">
                  {progress}% of target
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-8 h-8 text-memphis-purple" />
          <h3 className="text-3xl font-bold text-memphis-purple">Personalized Tips</h3>
        </div>

        <div className="space-y-3">
          {healthSummary.recommendations.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-memphis-pink rounded-2xl p-4">
              <CheckCircle className="w-6 h-6 text-memphis-green flex-shrink-0 mt-1" />
              <p className="text-gray-800 text-lg">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-purple">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-memphis-purple flex-shrink-0 mt-1" />
          <div className="text-sm text-gray-700">
            <strong>Note:</strong> These targets are based on HPB (Health Promotion Board) dietary guidelines and your personal health profile. Always consult your healthcare provider before making significant dietary changes.
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalizedDashboard
