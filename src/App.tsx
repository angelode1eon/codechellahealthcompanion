import React, { useState } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import UploadButton from './components/UploadButton'
import GeometricBackground from './components/GeometricBackground'
import DailyIntakeSummary from './components/DailyIntakeSummary'
import FoodLog from './components/FoodLog'
import RewardsPage from './components/RewardsPage'
import MonthlyWrappedPage from './components/MonthlyWrappedPage'
import HawkerHealthTips from './components/HawkerHealthTips'
import HealthHubIntegration from './components/HealthHubIntegration'
import { SGCopywriting } from './components/SGLocalizedUI'
import { useDailyIntake } from './hooks/useDailyIntake'
import { useMealHistory } from './hooks/useMealHistory'
import { useRewardsPoints } from './hooks/useRewardsPoints'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const { dailyIntake, addMeal } = useDailyIntake()
  const { addMealToHistory } = useMealHistory()
  const { addMealPoints, updateStreak } = useRewardsPoints()

  const handleAddMeal = (meal: any) => {
    const mealWithTimestamp = addMeal(meal)
    addMealToHistory(mealWithTimestamp)
    
    const { points, reason } = addMealPoints(mealWithTimestamp)
    updateStreak(new Date(mealWithTimestamp.timestamp).toDateString())
    
    console.log(`${SGCopywriting.rewards.earnedPoints.replace('{points}', points.toString())}`)
  }

  return (
    <div className="min-h-screen bg-memphis-pink font-baloo relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8 pb-32">
          <div className="max-w-2xl mx-auto">
            {activeTab === 'home' && (
              <div className="space-y-8">
                <DailyIntakeSummary intake={dailyIntake} />

                <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-memphis-yellow rounded-full -mr-16 -mt-16 opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-memphis-cyan rounded-full -ml-12 -mb-12 opacity-50"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-4xl font-bold text-memphis-purple mb-4">
                      {SGCopywriting.welcome.subtitle} 🍽️
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                      Upload photo and let AI check your food with HPB nutrition data!
                    </p>
                    
                    <UploadButton onAddMeal={handleAddMeal} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'log' && <FoodLog />}
            {activeTab === 'tips' && <HawkerHealthTips />}
            {activeTab === 'wrapped' && <MonthlyWrappedPage />}
            {activeTab === 'rewards' && <RewardsPage />}
            {activeTab === 'healthhub' && <HealthHubIntegration />}
          </div>
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App
