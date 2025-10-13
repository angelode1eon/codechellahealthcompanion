import React, { useState } from 'react'
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react'
import { useMealHistory } from '../hooks/useMealHistory'
import WeeklyView from './WeeklyView'
import MonthlyView from './MonthlyView'
import AllMealsView from './AllMealsView'

type ViewMode = 'all' | 'weekly' | 'monthly'

const FoodLog = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const { getAllMeals, getWeeklyStats, getMonthlyStats, getAverageStats } = useMealHistory()

  const allMeals = getAllMeals()
  const weeklyStats = getWeeklyStats()
  const monthlyStats = getMonthlyStats()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-2xl border-8 border-memphis-green">
        <h2 className="text-4xl font-bold text-memphis-purple mb-6">Food Log 📝</h2>
        
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 whitespace-nowrap ${
              viewMode === 'all'
                ? 'bg-memphis-purple text-white shadow-lg'
                : 'bg-memphis-pink text-memphis-purple'
            }`}
          >
            <Calendar className="w-5 h-5" />
            All Meals
          </button>
          
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 whitespace-nowrap ${
              viewMode === 'weekly'
                ? 'bg-memphis-purple text-white shadow-lg'
                : 'bg-memphis-pink text-memphis-purple'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Weekly
          </button>
          
          <button
            onClick={() => setViewMode('monthly')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 whitespace-nowrap ${
              viewMode === 'monthly'
                ? 'bg-memphis-purple text-white shadow-lg'
                : 'bg-memphis-pink text-memphis-purple'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Monthly
          </button>
        </div>

        {viewMode === 'all' && <AllMealsView meals={allMeals} />}
        {viewMode === 'weekly' && (
          <WeeklyView stats={weeklyStats} averages={getAverageStats(weeklyStats)} />
        )}
        {viewMode === 'monthly' && (
          <MonthlyView stats={monthlyStats} averages={getAverageStats(monthlyStats)} />
        )}
      </div>
    </div>
  )
}

export default FoodLog
