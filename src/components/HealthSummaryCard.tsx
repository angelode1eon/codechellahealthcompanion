import React from 'react'
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react'
import { HealthSummary } from '../types/healthhub'
import { calculateBMI, getBMICategory } from '../services/nutrientCalculator'

interface HealthSummaryCardProps {
  summary: HealthSummary
}

const HealthSummaryCard: React.FC<HealthSummaryCardProps> = ({ summary }) => {
  const { profile, conditionNotes, riskLevel, recommendations } = summary
  const bmi = calculateBMI(profile.weight, profile.height)
  const bmiCategory = getBMICategory(bmi)

  const riskConfig = {
    low: { color: 'bg-memphis-green', icon: CheckCircle, text: 'Low Risk', emoji: '✅' },
    moderate: { color: 'bg-memphis-yellow', icon: AlertTriangle, text: 'Moderate Risk', emoji: '⚠️' },
    high: { color: 'bg-red-500', icon: AlertTriangle, text: 'High Risk', emoji: '🚨' }
  }

  const risk = riskConfig[riskLevel]
  const RiskIcon = risk.icon

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-br from-memphis-purple via-memphis-cyan to-memphis-green rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
            <h2 className="text-5xl font-bold">Your Health Summary</h2>
          </div>
          <p className="text-2xl opacity-90">Personalized for {profile.name} 🇸🇬</p>
        </div>
      </div>

      {/* Profile Overview */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-pink">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">Health Profile 📋</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="text-4xl mb-2">👤</div>
            <div className="text-sm text-gray-600">Age</div>
            <div className="text-3xl font-bold text-memphis-purple">{profile.age} years</div>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="text-4xl mb-2">⚖️</div>
            <div className="text-sm text-gray-600">Weight</div>
            <div className="text-3xl font-bold text-memphis-purple">{profile.weight} kg</div>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="text-4xl mb-2">📏</div>
            <div className="text-sm text-gray-600">Height</div>
            <div className="text-3xl font-bold text-memphis-purple">{profile.height} cm</div>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="text-4xl mb-2">📊</div>
            <div className="text-sm text-gray-600">BMI</div>
            <div className="text-3xl font-bold text-memphis-purple">{bmi}</div>
            <div className="text-sm text-gray-600 mt-1">{bmiCategory}</div>
          </div>
        </div>

        <div className="bg-memphis-yellow rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-memphis-purple" />
            <span className="text-xl font-bold text-memphis-purple">Activity Level</span>
          </div>
          <p className="text-lg text-gray-700 capitalize">{profile.activityLevel.replace('-', ' ')}</p>
        </div>
      </div>

      {/* Risk Level */}
      <div className={`${risk.color} rounded-3xl p-8 shadow-2xl text-white`}>
        <div className="flex items-center gap-4 mb-4">
          <RiskIcon className="w-12 h-12" />
          <div>
            <h3 className="text-4xl font-bold">{risk.text} {risk.emoji}</h3>
            <p className="text-xl opacity-90">Overall Health Assessment</p>
          </div>
        </div>
      </div>

      {/* Medical Conditions */}
      {conditionNotes.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-cyan">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6">
            Health Conditions & Guidance 🏥
          </h3>
          
          <div className="space-y-4">
            {conditionNotes.map((note, index) => (
              <div 
                key={index}
                className="rounded-2xl p-6 border-4"
                style={{ 
                  borderColor: note.color,
                  backgroundColor: `${note.color}15`
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{note.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-memphis-purple capitalize">
                        {note.condition.replace('-', ' ')}
                      </h4>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: note.color }}
                      >
                        {note.severity}
                      </span>
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{note.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Restrictions */}
      {profile.dietaryRestrictions.filter(r => r !== 'none').length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-green">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6">
            Dietary Preferences 🥗
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {profile.dietaryRestrictions
              .filter(r => r !== 'none')
              .map((restriction, index) => (
                <div 
                  key={index}
                  className="bg-memphis-green text-white px-6 py-3 rounded-full text-xl font-bold"
                >
                  {restriction.replace('-', ' ').toUpperCase()}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-10 h-10 text-memphis-purple" />
          <h3 className="text-3xl font-bold text-memphis-purple">
            Personalized Recommendations 💡
          </h3>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className="bg-memphis-pink rounded-2xl p-5 flex items-start gap-4"
            >
              <div className="text-3xl">{index + 1}️⃣</div>
              <p className="text-lg text-gray-700 leading-relaxed flex-1">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-gray-100 rounded-2xl p-6 border-4 border-gray-300">
        <p className="text-sm text-gray-600 text-center leading-relaxed">
          ⚕️ <strong>Medical Disclaimer:</strong> This information is for educational purposes only and does not replace professional medical advice. 
          Always consult your doctor or healthcare provider for personalized medical guidance. 
          Based on HPB (Health Promotion Board) dietary guidelines.
        </p>
      </div>
    </div>
  )
}

export default HealthSummaryCard
