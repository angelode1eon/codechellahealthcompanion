import React from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DailyStats } from '../types/food'
import { Calendar, TrendingUp } from 'lucide-react'

interface MonthlyViewProps {
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

const MonthlyView = ({ stats, averages }: MonthlyViewProps) => {
  const chartData = stats.map(stat => ({
    date: new Date(stat.date).getDate(),
    calories: stat.calories,
    protein: stat.protein,
    carbs: stat.carbs,
    fat: stat.fat,
    sodium: stat.sodium,
    fiber: stat.fiber,
    sugar: stat.sugar
  }))

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-memphis-purple to-memphis-lavender rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6" />
            <span className="text-sm opacity-90">Monthly Average</span>
          </div>
          <div className="text-4xl font-bold">{averages.avgCalories}</div>
          <div className="text-sm opacity-90 mt-1">kcal/day</div>
        </div>

        <div className="bg-gradient-to-br from-memphis-coral to-memphis-yellow rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm opacity-90">Total Meals</span>
          </div>
          <div className="text-4xl font-bold">{averages.totalMeals}</div>
          <div className="text-sm opacity-90 mt-1">{averages.activeDays}/30 days</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-memphis-purple mb-4">📈 30-Day Calorie Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF6F61" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FF6F61" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
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
            <Area 
              type="monotone" 
              dataKey="calories" 
              stroke="#FF6F61" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCalories)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold text-memphis-purple mb-4">🥗 Nutrient Breakdown</h3>
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
            <Bar dataKey="protein" fill="#88B04B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="carbs" fill="#FFA07A" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fat" fill="#6B5B95" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-memphis-pink rounded-2xl p-5">
          <h4 className="text-lg font-bold text-memphis-purple mb-3">Average Macros</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Protein</span>
              <span className="font-bold text-memphis-green">{averages.avgProtein}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Carbs</span>
              <span className="font-bold text-memphis-yellow">{averages.avgCarbs}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Fat</span>
              <span className="font-bold text-memphis-lavender">{averages.avgFat}g</span>
            </div>
          </div>
        </div>

        <div className="bg-memphis-pink rounded-2xl p-5">
          <h4 className="text-lg font-bold text-memphis-purple mb-3">Average Micros</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Sodium</span>
              <span className="font-bold text-memphis-cyan">{averages.avgSodium}mg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Fiber</span>
              <span className="font-bold text-memphis-green">{averages.avgFiber}g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Sugar</span>
              <span className="font-bold text-memphis-coral">{averages.avgSugar}g</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyView
