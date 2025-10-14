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
import LoginPage from './components/LoginPage'
import HealthSummaryCard from './components/HealthSummaryCard'
import PersonalizedDashboard from './components/PersonalizedDashboard'
import NutrientAlerts from './components/NutrientAlerts'
import ConditionTrackedNutrients from './components/ConditionTrackedNutrients'
import { SGCopywriting } from './components/SGLocalizedUI'
import { useDailyIntake } from './hooks/useDailyIntake'
import { useMealHistory } from './hooks/useMealHistory'
import { useRewardsPoints } from './hooks/useRewardsPoints'
import { useNutrientAlerts } from './hooks/useNutrientAlerts'
import { healthhubAuth } from './services/healthhubAuth'
import { generateHealthSummary } from './services/healthSummaryService'
import { UserHealthProfile, HealthSummary } from './types/healthhub'
import { LogOut, User } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentUser, setCurrentUser] = useState<UserHealthProfile | null>(null)
  const [healthSummary, setHealthSummary] = useState<HealthSummary | null>(null)
  const { dailyIntake, addMeal } = useDailyIntake()
  const { addMealToHistory } = useMealHistory()
  const { addMealPoints, updateStreak } = useRewardsPoints()
  const { alerts, dismissAlert } = useNutrientAlerts(
    currentUser,
    healthSummary?.targets || null,
    dailyIntake
  )

  useEffect(() => {
    if (healthhubAuth.isAuthenticated()) {
      const user = healthhubAuth.getCurrentUser()
      if (user) {
        setCurrentUser(user)
        setHealthSummary(generateHealthSummary(user))
      }
    }
  }, [])

  const handleLoginSuccess = (user: UserHealthProfile) => {
    setCurrentUser(user)
    setHealthSummary(generateHealthSummary(user))
  }

  const handleLogout = () => {
    healthhubAuth.logout()
    setCurrentUser(null)
    setHealthSummary(null)
    setActiveTab('home')
  }

  const handleAddMeal = (meal: any) => {
    const mealWithTimestamp = addMeal(meal)
    addMealToHistory(mealWithTimestamp)
    
    const { points } = addMealPoints(mealWithTimestamp)
    updateStreak(new Date(mealWithTimestamp.timestamp).toDateString())
    
    console.log(`${SGCopywriting.rewards.earnedPoints.replace('{points}', points.toString())}`)
  }

  if (!currentUser || !healthSummary) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-memphis-pink font-baloo relative overflow-hidden">
      <GeometricBackground />
      
      <div className="relative z-10">
        <Header />
        
        <div className="bg-white border-b-8 border-memphis-purple shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-memphis-cyan rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-memphis-purple">{currentUser.name}</p>
                  <p className="text-sm text-gray-600">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        <main className="container mx-auto px-4 py-8 pb-32">
          <div className="max-w-2xl mx-auto">
            {activeTab === 'home' && (
              <div className="space-y-8">
                <NutrientAlerts alerts={alerts} onDismiss={dismissAlert} />
                
                <PersonalizedDashboard summary={healthSummary} dailyIntake={dailyIntake} />

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

            {activeTab === 'log' && (
              <div className="space-y-8">
                <NutrientAlerts alerts={alerts} onDismiss={dismissAlert} />
                <ConditionTrackedNutrients 
                  profile={currentUser}
                  targets={healthSummary.targets}
                  intake={dailyIntake}
                />
                <FoodLog />
              </div>
            )}

            {activeTab === 'tips' && <HawkerHealthTips />}
            {activeTab === 'wrapped' && <MonthlyWrappedPage />}
            {activeTab === 'rewards' && <RewardsPage />}
            {activeTab === 'profile' && <HealthSummaryCard summary={healthSummary} />}
          </div>
        </main>

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App
