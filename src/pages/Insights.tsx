import React, { useState } from 'react'
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react'
import { useFoodLog } from '../hooks/useFoodLog'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CorrectionStats from '../components/CorrectionStats'
import BuddyAhChat from '../components/BuddyAhChat'

type ViewMode = 'weekly' | 'monthly'

const Insights = () => {
  const { meals } = useFoodLog()
  const [viewMode, setViewMode] = useState<ViewMode>('weekly')

  const getChartData = () => {
    const now = Date.now()
    const daysToShow = viewMode === 'weekly' ? 7 : 30
    const msPerDay = 24 * 60 * 60 * 1000
    
    const data = []
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now - i * msPerDay)
      const dateStr = date.toLocaleDateString('en-SG', { month: 'short', day: 'numeric' })
      
      const dayMeals = meals.filter(meal => {
        const mealDate = new Date(meal.timestamp || 0)
        return mealDate.toDateString() === date.toDateString()
      })
      
      const totalCalories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0)
      const totalProtein = dayMeals.reduce((sum, meal) => sum + meal.protein, 0)
      const totalCarbs = dayMeals.reduce((sum, meal) => sum + meal.carbs, 0)
      const totalFat = dayMeals.reduce((sum, meal) => sum + meal.fat, 0)
      
      data.push({
        date: dateStr,
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        meals: dayMeals.length
      })
    }
    
    return data
  }

  const chartData = getChartData()
  
  const avgCalories = Math.round(chartData.reduce((sum, d) => sum + d.calories, 0) / chartData.length)
  const avgProtein = Math.round(chartData.reduce((sum, d) => sum + d.protein, 0) / chartData.length)
  const avgCarbs = Math.round(chartData.reduce((sum, d) => sum + d.carbs, 0) / chartData.length)
  const avgFat = Math.round(chartData.reduce((sum, d) => sum + d.fat, 0) / chartData.length)
  const activeDays = chartData.filter(d => d.meals > 0).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-memphis-pink via-memphis-lavender to-memphis-cyan p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-memphis-purple p-4 rounded-3xl">
            <TrendingUp className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-5xl font-bold text-memphis-purple">Insights</h1>
            <p className="text-xl text-gray-700 font-bold mt-1">Track your eating trends</p>
          </div>
        </div>

        {/* Correction Stats */}
        <CorrectionStats />

        {/* View Mode Toggle */}
        <div className="bg-white rounded-3xl p-4 shadow-lg border-6 border-memphis-yellow mb-6 flex gap-3">
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all ${
              viewMode === 'weekly'
                ? 'bg-memphis-purple text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-6 h-6 inline mr-2" />
            Weekly
          </button>
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all ${
              viewMode === 'monthly'
                ? 'bg-memphis-purple text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-6 h-6 inline mr-2" />
            Monthly
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-coral">
            <div className="text-sm text-gray-600 mb-1">Avg Calories</div>
            <div className="text-3xl font-bold text-memphis-coral">{avgCalories}</div>
            <div className="text-xs text-gray-600">kcal/day</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-green">
            <div className="text-sm text-gray-600 mb-1">Avg Protein</div>
            <div className="text-3xl font-bold text-memphis-green">{avgProtein}g</div>
            <div className="text-xs text-gray-600">per day</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-yellow">
            <div className="text-sm text-gray-600 mb-1">Avg Carbs</div>
            <div className="text-3xl font-bold text-memphis-yellow">{avgCarbs}g</div>
            <div className="text-xs text-gray-600">per day</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-lavender">
            <div className="text-sm text-gray-600 mb-1">Avg Fat</div>
            <div className="text-3xl font-bold text-memphis-lavender">{avgFat}g</div>
            <div className="text-xs text-gray-600">per day</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-cyan">
            <div className="text-sm text-gray-600 mb-1">Active Days</div>
            <div className="text-3xl font-bold text-memphis-cyan">{activeDays}</div>
            <div className="text-xs text-gray-600">days logged</div>
          </div>
        </div>

        {/* Calorie Trend Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-6 border-memphis-coral mb-6">
          <h3 className="text-2xl font-bold text-memphis-purple mb-4">Calorie Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="date" stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
              <YAxis stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFF', 
                  border: '4px solid #FF6F61',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }} 
              />
              <Legend wrapperStyle={{ fontWeight: 'bold' }} />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#FF6F61" 
                strokeWidth={3}
                dot={{ fill: '#FF6F61', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Macronutrient Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border-6 border-memphis-green mb-6">
          <h3 className="text-2xl font-bold text-memphis-purple mb-4">Macronutrient Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="date" stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
              <YAxis stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFF', 
                  border: '4px solid #88B04B',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }} 
              />
              <Legend wrapperStyle={{ fontWeight: 'bold' }} />
              <Bar dataKey="protein" fill="#88B04B" radius={[8, 8, 0, 0]} />
              <Bar dataKey="carbs" fill="#FFA07A" radius={[8, 8, 0, 0]} />
              <Bar dataKey="fat" fill="#6B5B95" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Area Chart */}
        {viewMode === 'monthly' && (
          <div className="bg-white rounded-3xl p-6 shadow-lg border-6 border-memphis-yellow">
            <h3 className="text-2xl font-bold text-memphis-purple mb-4">Monthly Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="date" stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
                <YAxis stroke="#6B5B95" style={{ fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFF', 
                    border: '4px solid #FFA07A',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }} 
                />
                <Legend wrapperStyle={{ fontWeight: 'bold' }} />
                <Area 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#FFA07A" 
                  fill="#FFA07A" 
                  fillOpacity={0.6}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Buddy Ah Chat */}
      <BuddyAhChat
        onLogMealClick={() => window.location.href = '/'}
        onViewProgressClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onFindHealthierClick={() => window.location.href = '/'}
      />
    </div>
  )
}

export default Insights
