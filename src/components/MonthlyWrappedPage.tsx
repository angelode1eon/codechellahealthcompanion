import React, { useState } from 'react'
import { Calendar, TrendingUp, TrendingDown, Minus, Award, Star, Flame } from 'lucide-react'
import { useMonthlyWrapped } from '../hooks/useMonthlyWrapped'

const MonthlyWrappedPage = () => {
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
  
  const { generateMonthlyWrapped } = useMonthlyWrapped()
  const wrapped = generateMonthlyWrapped(selectedMonth, selectedYear)

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'from-memphis-green to-memphis-cyan'
    if (score >= 60) return 'from-memphis-yellow to-memphis-coral'
    return 'from-memphis-coral to-memphis-purple'
  }

  const getHealthScoreEmoji = (score: number) => {
    if (score >= 80) return '🌟'
    if (score >= 60) return '💪'
    return '🌱'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-memphis-purple via-memphis-lavender to-memphis-yellow rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-memphis-coral rounded-full -mr-20 -mt-20 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-memphis-cyan rounded-full -ml-16 -mb-16 opacity-30"></div>
        
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-4">🎉 Monthly Wrapped</h2>
          <p className="text-xl opacity-90">Your health journey summarized</p>

          {/* Month Selector */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
            {months.map((month, index) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(index)}
                disabled={index > currentDate.getMonth() && selectedYear === currentDate.getFullYear()}
                className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all ${
                  selectedMonth === index
                    ? 'bg-white text-memphis-purple shadow-lg scale-105'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-30 disabled:cursor-not-allowed'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Health Score */}
      <div className={`bg-gradient-to-br ${getHealthScoreColor(wrapped.healthScore)} rounded-3xl p-8 shadow-2xl text-white`}>
        <div className="text-center">
          <div className="text-8xl mb-4">{getHealthScoreEmoji(wrapped.healthScore)}</div>
          <h3 className="text-3xl font-bold mb-2">Health Score</h3>
          <div className="text-7xl font-bold mb-4">{wrapped.healthScore}</div>
          <p className="text-xl opacity-90">
            {wrapped.healthScore >= 80 ? 'Outstanding!' : wrapped.healthScore >= 60 ? 'Great Progress!' : 'Keep Going!'}
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-coral">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-6 h-6 text-memphis-coral" />
            <span className="text-sm text-gray-600">Total Points</span>
          </div>
          <div className="text-4xl font-bold text-memphis-purple">{wrapped.totalPoints}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-green">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-memphis-green" />
            <span className="text-sm text-gray-600">Active Days</span>
          </div>
          <div className="text-4xl font-bold text-memphis-purple">{wrapped.activeDays}/30</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-yellow">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-6 h-6 text-memphis-yellow" />
            <span className="text-sm text-gray-600">Total Meals</span>
          </div>
          <div className="text-4xl font-bold text-memphis-purple">{wrapped.totalMeals}</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-cyan">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-memphis-cyan" />
            <span className="text-sm text-gray-600">Avg Calories</span>
          </div>
          <div className="text-4xl font-bold text-memphis-purple">{wrapped.avgDailyCalories}</div>
        </div>
      </div>

      {/* Top Meals */}
      {wrapped.topMeals.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6">🏆 Top Meals</h3>
          <div className="space-y-4">
            {wrapped.topMeals.map((meal, index) => (
              <div key={index} className="bg-memphis-pink rounded-2xl p-5 flex items-center gap-4">
                <div className="text-4xl font-bold text-memphis-coral">#{index + 1}</div>
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-20 h-20 rounded-xl object-cover border-4 border-memphis-purple"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-memphis-purple">{meal.name}</h4>
                  <p className="text-sm text-gray-700">Logged {meal.count} times</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-memphis-green">{meal.avgPoints}</div>
                  <div className="text-sm text-gray-600">avg points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nutrient Improvements */}
      {wrapped.nutrientImprovements.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-green">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6">📊 Nutrient Changes</h3>
          <div className="space-y-4">
            {wrapped.nutrientImprovements.map((nutrient, index) => {
              const Icon = nutrient.trend === 'up' ? TrendingUp : nutrient.trend === 'down' ? TrendingDown : Minus
              const trendColor = nutrient.isGood ? 'text-memphis-green' : 'text-memphis-coral'
              const bgColor = nutrient.isGood ? 'bg-memphis-green' : 'bg-memphis-coral'

              return (
                <div key={index} className="bg-memphis-pink rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`${bgColor} p-3 rounded-xl text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-memphis-purple">{nutrient.nutrient}</h4>
                      <p className="text-sm text-gray-700">
                        {nutrient.isGood ? '✨ Improved!' : '⚠️ Needs attention'}
                      </p>
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${trendColor}`}>
                    {nutrient.change > 0 ? '+' : ''}{nutrient.change}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Achievements */}
      {wrapped.achievements.length > 0 && (
        <div className="bg-gradient-to-br from-memphis-yellow to-memphis-coral rounded-3xl p-8 shadow-2xl text-white">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Award className="w-8 h-8" />
            Achievements Unlocked
          </h3>
          <div className="space-y-3">
            {wrapped.achievements.map((achievement, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-xl font-bold">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {wrapped.totalMeals === 0 && (
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-8 border-memphis-lavender text-center">
          <div className="text-8xl mb-6">📅</div>
          <h3 className="text-3xl font-bold text-memphis-purple mb-4">No Data Yet</h3>
          <p className="text-xl text-gray-700">
            Start logging meals in {months[selectedMonth]} to see your wrapped!
          </p>
        </div>
      )}
    </div>
  )
}

export default MonthlyWrappedPage
