import React from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DailyStats } from '../types/food'
import { TrendingUp, Activity } from 'lucide-react'

interface WeeklyViewProps {
  stats: DailyStats[]
  averages: {
    avgCalories: number
    avgProtein: number
    avgCarbs: number
    avgFat: number
    avgSodium: number
    avgFiber: number
    avgSugar: number
    totalMeals: number
    activeDays: number
  }
}

const WeeklyView = ({ stats, averages }: WeeklyViewProps) => {
  const chartData = stats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString('en-SG', { weekday: 'short' }),
    calories: stat.calories,
    protein: stat.protein,
    carbs: stat.carbs,
    fat: stat.fat,
    meals: stat.mealCount
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-memphis-coral to-memphis-purple rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm opacity-90">Avg Daily Calories</span>
          </div>
          <div className="text-4xl font-bold">{averages.avgCalories}</div>
          <div className="text-sm opacity-90 mt-1">kcal/day</div>
        </div>

        <div className="bg-gradient-to-br from-memphis-green to-memphis-cyan rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-6 h-6" />
            <span className="text-sm opacity-90">Total Meals</span>
          </div>
          <div className="text-4xl font-bold">{averages.totalMeals}</div>
          <div className="text-sm opacity-90 mt-1">{averages.activeDays} active days</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-memphis-purple mb-4">📊 Calorie Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7CAC9" />
            <XAxis dataKey="date" stroke="#6B5B95" />
            <YAxis stroke="#6B5B95" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '3px solid #6B5B95',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#FF6F61" 
              strokeWidth={3}
              dot={{ fill: '#FF6F61', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-memphis-purple mb-4">🍖 Macronutrients</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F7CAC9" />
            <XAxis dataKey="date" stroke="#6B5B95" />
            <YAxis stroke="#6B5B95" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '3px solid #6B5B95',
                borderRadius: '12px',
                fontWeight: 'bold'
              }}
            />
            <Legend />
            <Bar dataKey="protein" fill="#88B04B" radius={[8, 8, 0, 0]} />
            <Bar dataKey="carbs" fill="#FFA07A" radius={[8, 8, 0, 0]} />
            <Bar dataKey="fat" fill="#6B5B95" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-memphis-green rounded-2xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{averages.avgProtein}g</div>
          <div className="text-sm opacity-90 mt-1">Avg Protein</div>
        </div>
        <div className="bg-memphis-yellow rounded-2xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{averages.avgCarbs}g</div>
          <div className="text-sm opacity-90 mt-1">Avg Carbs</div>
        </div>
        <div className="bg-memphis-lavender rounded-2xl p-4 text-white text-center shadow-lg">
          <div className="text-3xl font-bold">{averages.avgFat}g</div>
          <div className="text-sm opacity-90 mt-1">Avg Fat</div>
        </div>
      </div>
    </div>
  )
}

export default WeeklyView
