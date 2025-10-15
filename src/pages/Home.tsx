import React, { useState, useRef } from 'react'
import { Camera, TrendingUp, Award, Calendar, User } from 'lucide-react'
import { classifyImage } from '../services/foodRecognition'
import { FoodPrediction } from '../types/food'
import FoodResult from '../components/FoodResult'
import DailyIntakeSummary from '../components/DailyIntakeSummary'
import HealthSummaryCard from '../components/HealthSummaryCard'
import FindHealthierButton from '../components/FindHealthierButton'
import BuddyAhChat from '../components/BuddyAhChat'
import { useDailyIntake } from '../hooks/useDailyIntake'
import { healthhubAuth } from '../services/healthhubAuth'
import { generateHealthSummary } from '../services/healthSummaryService'
import FeedbackToast from '../components/FeedbackToast'
import { generateMealFeedback, FeedbackMessage } from '../services/feedbackService'
import { generateMealLoggedResponse } from '../services/buddyAhService'
import LocationRecommendations from '../components/LocationRecommendations'

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<FoodPrediction | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [feedbackMessages, setFeedbackMessages] = useState<FeedbackMessage[]>([])
  const [showLocationRecs, setShowLocationRecs] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { dailyIntake, addMeal } = useDailyIntake()
  const user = healthhubAuth.getCurrentUser()

  const healthSummary = user ? generateHealthSummary(user) : null

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)

    try {
      const result = await classifyImage(file)
      setPrediction({ ...result, image: imageUrl })
    } catch (error) {
      console.error('Error classifying image:', error)
      alert('Oops! Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddToLog = (meal: FoodPrediction) => {
    const mealWithTimestamp = addMeal(meal)
    
    // Generate real-time feedback
    if (user && healthSummary) {
      const feedback = generateMealFeedback(
        meal,
        dailyIntake,
        healthSummary.targets
      )
      setFeedbackMessages(feedback)
    }
    
    setPrediction(null)
    setSelectedImage(null)
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-memphis-pink via-white to-memphis-cyan pb-24">
      {/* Feedback Toast */}
      {feedbackMessages.length > 0 && (
        <FeedbackToast
          messages={feedbackMessages}
          onClose={() => setFeedbackMessages([])}
        />
      )}

      {/* Header */}
      <div className="bg-memphis-purple text-white p-6 rounded-b-[3rem] shadow-2xl border-b-8 border-memphis-coral">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">HealthHub SG 🇸🇬</h1>
            <p className="text-xl opacity-90">Track. Learn. Thrive!</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-2xl">
            <User className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Health Summary Card */}
        {healthSummary && <HealthSummaryCard summary={healthSummary} />}

        {/* Daily Intake Summary */}
        {healthSummary && (
          <DailyIntakeSummary 
            dailyIntake={dailyIntake} 
            targets={healthSummary.targets}
          />
        )}

        {/* Find Healthier Option Button */}
        <FindHealthierButton onClick={() => setShowLocationRecs(true)} />

        {/* Camera Button */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
          <h2 className="text-3xl font-bold text-memphis-purple mb-4 flex items-center gap-3">
            <Camera className="w-8 h-8" />
            Snap Your Food!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            Take a photo of your meal and let AI identify it for you! 📸
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <button
            onClick={handleCameraClick}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-memphis-coral to-memphis-purple hover:from-memphis-purple hover:to-memphis-coral text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-6 border-memphis-yellow text-2xl"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                Analyzing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Camera className="w-8 h-8" strokeWidth={2.5} />
                Take Photo
              </span>
            )}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-memphis-green text-white rounded-2xl p-6 shadow-lg text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{dailyIntake.meals.length}</div>
            <div className="text-sm opacity-90">Meals Today</div>
          </div>
          
          <div className="bg-memphis-coral text-white rounded-2xl p-6 shadow-lg text-center">
            <Award className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">
              {dailyIntake.meals.reduce((sum, meal) => sum + (meal.points || 0), 0)}
            </div>
            <div className="text-sm opacity-90">Points</div>
          </div>
          
          <div className="bg-memphis-lavender text-white rounded-2xl p-6 shadow-lg text-center">
            <Calendar className="w-8 h-8 mx-auto mb-2" />
            <div className="text-3xl font-bold">{dailyIntake.totalCalories}</div>
            <div className="text-sm opacity-90">Calories</div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-memphis-yellow to-memphis-coral rounded-3xl p-6 shadow-lg border-6 border-memphis-purple">
          <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            💡 Today's Tip
          </h3>
          <p className="text-white text-lg leading-relaxed">
            Drink at least 8 glasses of water daily to stay hydrated and support your metabolism! 💧
          </p>
        </div>
      </div>

      {/* Food Result Modal */}
      {prediction && (
        <FoodResult
          prediction={prediction}
          onClose={() => {
            setPrediction(null)
            setSelectedImage(null)
          }}
          onAddToLog={handleAddToLog}
        />
      )}

      {/* Location Recommendations Modal */}
      {showLocationRecs && (
        <LocationRecommendations onClose={() => setShowLocationRecs(false)} />
      )}

      {/* Buddy Ah Chat */}
      <BuddyAhChat
        onLogMealClick={handleCameraClick}
        onViewProgressClick={() => window.location.href = '/insights'}
        onFindHealthierClick={() => setShowLocationRecs(true)}
      />
    </div>
  )
}

export default Home
