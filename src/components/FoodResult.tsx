import React, { useState } from 'react'
import { X, Plus, Sparkles, AlertCircle, CheckCircle, Database } from 'lucide-react'
import { FoodPrediction } from '../types/food'
import { useRewardsPoints } from '../hooks/useRewardsPoints'
import { getAllDishNames, getDishByName } from '../utils/singaporeanDishes'
import { useUserCorrections } from '../hooks/useUserCorrections'
import { SGCopywriting } from './SGLocalizedUI'

interface FoodResultProps {
  prediction: FoodPrediction
  onClose: () => void
  onAddToLog: (meal: FoodPrediction) => void
}

const FoodResult = ({ prediction, onClose, onAddToLog }: FoodResultProps) => {
  const { calculateMealPoints, getPointsReason } = useRewardsPoints()
  const { addCorrection } = useUserCorrections()
  const [showCorrection, setShowCorrection] = useState(false)
  const [selectedDish, setSelectedDish] = useState(prediction.name)
  const [correctionSaved, setCorrectionSaved] = useState(false)
  
  // All nutrition data comes from singaporeanDishes.ts
  const points = calculateMealPoints(prediction)
  const reason = getPointsReason(points)
  const allDishes = getAllDishNames()

  const handleCorrection = () => {
    if (selectedDish !== prediction.name) {
      // Get corrected dish data from singaporeanDishes.ts
      const correctedDish = getDishByName(selectedDish)
      if (correctedDish) {
        // Save correction for learning
        addCorrection(prediction.originalPrediction || prediction.name, selectedDish)
        
        // Update prediction with corrected data from singaporeanDishes.ts
        const correctedPrediction: FoodPrediction = {
          ...prediction,
          name: correctedDish.name,
          calories: correctedDish.calories,
          protein: correctedDish.protein,
          carbs: correctedDish.carbs,
          fat: correctedDish.fat,
          sodium: correctedDish.sodium,
          fiber: correctedDish.fiber,
          sugar: correctedDish.sugar,
          mappingReason: 'user_corrected',
          userCorrected: true
        }
        
        setCorrectionSaved(true)
        setTimeout(() => {
          onAddToLog(correctedPrediction)
          onClose()
        }, 1000)
      }
    } else {
      handleAddToLog()
    }
  }

  const handleAddToLog = () => {
    onAddToLog({ ...prediction, points })
    onClose()
  }

  const getPointsColor = (pts: number) => {
    if (pts >= 80) return 'from-memphis-green to-memphis-cyan'
    if (pts >= 60) return 'from-memphis-yellow to-memphis-coral'
    if (pts >= 40) return 'from-memphis-coral to-memphis-purple'
    return 'from-memphis-purple to-memphis-lavender'
  }

  const getMappingBadge = () => {
    if (prediction.userCorrected) {
      return (
        <div className="bg-memphis-green text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 border-2 border-white shadow-lg">
          <CheckCircle className="w-4 h-4" />
          User Confirmed
        </div>
      )
    }
    
    switch (prediction.mappingReason) {
      case 'signature_match':
        return (
          <div className="bg-memphis-purple text-white px-3 py-1 rounded-lg text-sm font-bold border-2 border-white shadow-lg">
            ⭐ Signature Match
          </div>
        )
      case 'keyword_match':
        return (
          <div className="bg-memphis-green text-white px-3 py-1 rounded-lg text-sm font-bold border-2 border-white shadow-lg">
            🇸🇬 Local Dish
          </div>
        )
      case 'generic_mapping':
        return (
          <div className="bg-memphis-yellow text-white px-3 py-1 rounded-lg text-sm font-bold border-2 border-white shadow-lg">
            🇸🇬 Mapped to Local
          </div>
        )
      case 'no_match':
        return (
          <div className="bg-gray-400 text-white px-3 py-1 rounded-lg text-sm font-bold border-2 border-white shadow-lg">
            Global Prediction
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-8 border-memphis-purple relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-memphis-coral text-white p-3 rounded-2xl hover:bg-opacity-90 transition-all z-10 shadow-lg border-4 border-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {correctionSaved && (
            <div className="bg-memphis-green text-white rounded-2xl p-4 mb-4 flex items-center gap-3 animate-fadeIn border-4 border-memphis-cyan shadow-lg">
              <CheckCircle className="w-6 h-6" />
              <span className="font-bold">Thanks for the feedback! We'll learn from this.</span>
            </div>
          )}

          {/* Data Source Badge */}
          <div className="bg-gradient-to-r from-memphis-cyan to-memphis-purple rounded-2xl p-4 mb-4 text-white border-4 border-memphis-yellow shadow-lg">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6" />
              <div>
                <p className="font-bold text-lg">Nutrition Data Source</p>
                <p className="text-sm opacity-90">{SGCopywriting.dataSource.local}</p>
              </div>
            </div>
          </div>

          {/* Points Badge */}
          <div className={`bg-gradient-to-r ${getPointsColor(points)} rounded-3xl p-6 mb-6 text-white shadow-lg border-6 border-white`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-lg font-bold">Health Points</span>
                </div>
                <div className="text-6xl font-bold">{points}</div>
                <p className="text-lg opacity-90 mt-2">{reason}</p>
              </div>
              <div className="text-8xl">
                {points >= 80 ? '🌟' : points >= 60 ? '💚' : points >= 40 ? '👍' : '✨'}
              </div>
            </div>
          </div>

          <img
            src={prediction.image}
            alt={prediction.name}
            className="w-full h-64 object-cover rounded-2xl mb-6 border-6 border-memphis-yellow shadow-lg"
          />

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h2 className="text-4xl font-bold text-memphis-purple">{prediction.name}</h2>
              {getMappingBadge()}
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <div className="bg-memphis-green text-white px-4 py-2 rounded-xl font-bold border-4 border-memphis-cyan shadow-lg">
                {(prediction.confidence * 100).toFixed(0)}% confident
              </div>
              
              {prediction.originalPrediction && prediction.originalPrediction !== prediction.name && (
                <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm border-4 border-gray-300 shadow-lg">
                  Originally: {prediction.originalPrediction}
                </div>
              )}

              {/* Match Details Badge */}
              {prediction.matchDetails && (
                <div className="bg-memphis-pink text-memphis-purple px-4 py-2 rounded-xl text-sm font-bold border-4 border-memphis-purple shadow-lg">
                  {prediction.matchDetails.signatureMatch && '⭐ Signature • '}
                  {prediction.matchDetails.keywordMatches} keywords matched
                </div>
              )}
            </div>

            {/* Correction Interface */}
            {!showCorrection && !correctionSaved && (
              <button
                onClick={() => setShowCorrection(true)}
                className="mt-4 text-memphis-purple hover:text-memphis-coral font-bold flex items-center gap-2 transition-colors bg-memphis-pink px-4 py-2 rounded-xl border-4 border-memphis-purple shadow-lg"
              >
                <AlertCircle className="w-5 h-5" />
                Not quite right? Click to correct
              </button>
            )}

            {showCorrection && !correctionSaved && (
              <div className="mt-4 bg-memphis-pink rounded-2xl p-4 animate-fadeIn border-6 border-memphis-purple shadow-xl">
                <label className="block text-memphis-purple font-bold mb-2 text-lg">
                  Select the correct dish from our local database:
                </label>
                <select
                  value={selectedDish}
                  onChange={(e) => setSelectedDish(e.target.value)}
                  className="w-full p-3 rounded-xl border-4 border-memphis-purple font-bold text-lg mb-3 shadow-lg"
                >
                  <option value={prediction.name}>{prediction.name} (Keep current)</option>
                  <optgroup label="🇸🇬 Singaporean Dishes">
                    {allDishes.map(dish => (
                      <option key={dish} value={dish}>{dish}</option>
                    ))}
                  </optgroup>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleCorrection}
                    className="flex-1 bg-memphis-green text-white font-bold py-3 px-4 rounded-xl hover:bg-opacity-90 transition-all border-4 border-memphis-cyan shadow-lg"
                  >
                    {selectedDish !== prediction.name ? 'Confirm Correction' : 'Keep & Continue'}
                  </button>
                  <button
                    onClick={() => setShowCorrection(false)}
                    className="px-4 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all border-4 border-gray-400 shadow-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Nutrition Facts - All from singaporeanDishes.ts */}
          <div className="bg-memphis-pink rounded-2xl p-6 mb-6 border-6 border-memphis-purple shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-bold text-memphis-purple">Nutrition Facts</h3>
              <div className="bg-memphis-cyan text-white px-3 py-1 rounded-lg text-xs font-bold border-2 border-white shadow-lg">
                From Local Database
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-coral shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Calories</div>
                <div className="text-3xl font-bold text-memphis-coral">{prediction.calories}</div>
                <div className="text-xs text-gray-600">kcal</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-green shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Protein</div>
                <div className="text-3xl font-bold text-memphis-green">{prediction.protein}g</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-yellow shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Carbs</div>
                <div className="text-2xl font-bold text-memphis-yellow">{prediction.carbs}g</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-lavender shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Fat</div>
                <div className="text-2xl font-bold text-memphis-lavender">{prediction.fat}g</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-cyan shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Sodium</div>
                <div className="text-2xl font-bold text-memphis-cyan">{prediction.sodium}mg</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-4 border-memphis-green shadow-lg">
                <div className="text-sm text-gray-600 mb-1">Fiber</div>
                <div className="text-2xl font-bold text-memphis-green">{prediction.fiber}g</div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4 border-4 border-memphis-coral shadow-lg">
              <div className="text-sm text-gray-600 mb-1">Sugar</div>
              <div className="text-2xl font-bold text-memphis-coral">{prediction.sugar}g</div>
            </div>
          </div>

          {/* Serving Size Info */}
          {prediction.name && getDishByName(prediction.name) && (
            <div className="bg-white rounded-2xl p-4 mb-6 border-4 border-memphis-cyan shadow-lg">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-2xl">📏</span>
                <div>
                  <p className="text-sm font-bold text-memphis-purple">Serving Size</p>
                  <p className="text-sm">{getDishByName(prediction.name)?.servingSize}</p>
                </div>
              </div>
            </div>
          )}

          {!showCorrection && (
            <button
              onClick={handleAddToLog}
              className="w-full bg-memphis-purple hover:bg-opacity-90 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-coral flex items-center justify-center gap-3"
            >
              <Plus className="w-8 h-8" strokeWidth={2.5} />
              <span className="text-2xl">Add to Food Log (+{points} points)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodResult
