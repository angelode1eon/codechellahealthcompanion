import React, { useState } from 'react'
import { User, Heart, Activity, AlertCircle } from 'lucide-react'
import { UserHealthProfile, Gender, ActivityLevel, MedicalCondition, DietaryRestriction } from '../types/healthhub'
import { SGLoadingSpinner } from './SGLocalizedUI'

interface ProfileSetupProps {
  onProfileComplete: (profile: UserHealthProfile) => void
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onProfileComplete }) => {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState<Gender>('male')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate')
  const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>(['none'])
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>(['none'])

  const handleSubmit = () => {
    setIsLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      const profile: UserHealthProfile = {
        id: `user_${Date.now()}`,
        email,
        name,
        age: parseInt(age) || 30,
        gender,
        weight: parseFloat(weight) || 70,
        height: parseFloat(height) || 170,
        activityLevel,
        medicalConditions,
        dietaryRestrictions,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      }

      onProfileComplete(profile)
      setIsLoading(false)
    }, 1500)
  }

  const toggleMedicalCondition = (condition: MedicalCondition) => {
    if (condition === 'none') {
      setMedicalConditions(['none'])
    } else {
      const filtered = medicalConditions.filter(c => c !== 'none')
      if (filtered.includes(condition)) {
        const updated = filtered.filter(c => c !== condition)
        setMedicalConditions(updated.length > 0 ? updated : ['none'])
      } else {
        setMedicalConditions([...filtered, condition])
      }
    }
  }

  const toggleDietaryRestriction = (restriction: DietaryRestriction) => {
    if (restriction === 'none') {
      setDietaryRestrictions(['none'])
    } else {
      const filtered = dietaryRestrictions.filter(r => r !== 'none')
      if (filtered.includes(restriction)) {
        const updated = filtered.filter(r => r !== restriction)
        setDietaryRestrictions(updated.length > 0 ? updated : ['none'])
      } else {
        setDietaryRestrictions([...filtered, restriction])
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-memphis-cyan via-memphis-green to-memphis-yellow flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">👋</div>
          <h1 className="text-6xl font-bold text-white mb-2">Welcome!</h1>
          <p className="text-2xl text-white opacity-90">Let's set up your health profile 🇸🇬</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-3xl p-4 mb-6 shadow-2xl border-8 border-memphis-purple">
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center ${step >= 1 ? 'text-memphis-purple' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 1 ? 'bg-memphis-purple text-white' : 'bg-gray-200'}`}>
                <User className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold">Basic Info</p>
            </div>
            <div className={`flex-1 text-center ${step >= 2 ? 'text-memphis-purple' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 2 ? 'bg-memphis-purple text-white' : 'bg-gray-200'}`}>
                <Activity className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold">Physical</p>
            </div>
            <div className={`flex-1 text-center ${step >= 3 ? 'text-memphis-purple' : 'text-gray-400'}`}>
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${step >= 3 ? 'bg-memphis-purple text-white' : 'bg-gray-200'}`}>
                <Heart className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold">Health</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-memphis-purple mb-6">Basic Information</h2>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                  placeholder="Tan Ah Kow"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                  placeholder="30"
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Gender</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
                      gender === 'male'
                        ? 'bg-memphis-purple text-white border-4 border-memphis-cyan'
                        : 'bg-gray-100 text-gray-700 border-4 border-gray-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-4 px-6 rounded-2xl font-bold text-xl transition-all ${
                      gender === 'female'
                        ? 'bg-memphis-purple text-white border-4 border-memphis-cyan'
                        : 'bg-gray-100 text-gray-700 border-4 border-gray-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!name || !age}
                className="w-full bg-memphis-purple hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all border-4 border-memphis-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="text-2xl">Next Step →</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-memphis-purple mb-6">Physical Information</h2>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                  placeholder="70"
                  min="1"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                  placeholder="170"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-2">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very-active">Very Active (intense daily)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all"
                >
                  <span className="text-2xl">← Back</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!weight || !height}
                  className="flex-1 bg-memphis-purple hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all border-4 border-memphis-cyan disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="text-2xl">Next Step →</span>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-memphis-purple mb-6">Health Information</h2>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-3">Medical Conditions</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['none', 'diabetes', 'hypertension', 'high-cholesterol', 'heart-disease', 'obesity'] as MedicalCondition[]).map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => toggleMedicalCondition(condition)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                        medicalConditions.includes(condition)
                          ? 'bg-memphis-purple text-white border-4 border-memphis-cyan'
                          : 'bg-gray-100 text-gray-700 border-4 border-gray-300'
                      }`}
                    >
                      {condition.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold text-memphis-purple mb-3">Dietary Restrictions</label>
                <div className="grid grid-cols-2 gap-3">
                  {(['none', 'vegetarian', 'vegan', 'halal', 'gluten-free', 'lactose-intolerant'] as DietaryRestriction[]).map((restriction) => (
                    <button
                      key={restriction}
                      type="button"
                      onClick={() => toggleDietaryRestriction(restriction)}
                      className={`py-3 px-4 rounded-xl font-bold text-lg transition-all ${
                        dietaryRestrictions.includes(restriction)
                          ? 'bg-memphis-purple text-white border-4 border-memphis-cyan'
                          : 'bg-gray-100 text-gray-700 border-4 border-gray-300'
                      }`}
                    >
                      {restriction.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-memphis-pink rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-memphis-purple flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700">
                    <strong>Privacy Note:</strong> All your health data is stored securely on your device only. We never send it to any server! 🔒
                  </p>
                </div>
              </div>

              {isLoading ? (
                <SGLoadingSpinner message="Setting up your profile..." />
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-5 px-8 rounded-2xl transition-all"
                  >
                    <span className="text-2xl">← Back</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-memphis-green hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all border-4 border-memphis-cyan"
                  >
                    <span className="text-2xl">Complete Setup! 🎉</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Skip Option */}
        {step === 1 && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                const defaultProfile = {
                  id: `user_${Date.now()}`,
                  email: 'user@example.com',
                  name: 'Guest User',
                  age: 30,
                  gender: 'male' as Gender,
                  weight: 70,
                  height: 170,
                  activityLevel: 'moderate' as ActivityLevel,
                  medicalConditions: ['none'] as MedicalCondition[],
                  dietaryRestrictions: ['none'] as DietaryRestriction[],
                  createdAt: new Date().toISOString(),
                  lastUpdated: new Date().toISOString()
                }
                onProfileComplete(defaultProfile)
              }}
              className="text-white text-lg font-bold underline hover:text-memphis-yellow transition-colors"
            >
              Skip for now (use default profile)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileSetup
