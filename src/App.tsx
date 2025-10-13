import React, { useState, useEffect } from 'react'
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
import LoginPage from './components/LoginPage'
import PersonalizedDashboard from './components/PersonalizedDashboard'
import { SGCopywriting } from './components/SGLocalizedUI'
import { useDailyIntake } from './hooks/useDailyIntake'
import { useMealHistory } from './hooks/useMealHistory'
import { useRewardsPoints } from './hooks/useRewardsPoints'
import { isAuthenticated, getCurrentUser, logout } from './utils/authService'
import { UserProfile } from './types/user'
import { LogOut, User } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  const { dailyIntake, addMeal } = useDailyIntake()
  const { addMealToHistory } = useMealHistory()
  const { addMealPoints, updateStreak } = useRewardsPoints()

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true)
      setCurrentUser(getCurrentUser())
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setCurrentUser(getCurrentUser())
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setCurrentUser(null)
    setActiveTab('home')
  }

  const handleAddMeal = (meal: any) => {
    const mealWithTimestamp = addMeal(meal)
    addMealToHistory(mealWithTimestamp)
    
    const { points } = addMealPoints(mealWithTimestamp)
    updateStreak(new Date(mealWithTimestamp.timestamp).toDateString())
    
    console.log(`${SGCopywriting.rewards.earnedPoints.replace('{points}', points.toString())}`)
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-memphis-pink font-baloo relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10">
        <Header />
        
        {currentUser && (
          <div className="container mx-auto px-4 pt-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-purple flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-memphis-purple text-white w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-memphis-purple">{currentUser.name}</div>
                    <div className="text-sm text-gray-600">{currentUser.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-memphis-coral hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-xl transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
        
        <main className="container mx-auto px-4 py-8 pb-32">
          <div className="max-w-2xl mx-auto">
            {activeTab === 'home' && currentUser && (
              <div className="space-y-8">
                <PersonalizedDashboard 
                  user={currentUser} 
                  currentIntake={dailyIntake}
                />

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
