import React from 'react'
import { X, Plus, Sparkles } from 'lucide-react'
import { FoodPrediction } from '../types/food'
import { useRewardsPoints } from '../hooks/useRewardsPoints'

interface FoodResultProps {
  prediction: FoodPrediction
  onClose: () => void
  onAddToLog: (meal: FoodPrediction) => void
}

const FoodResult = ({ prediction, onClose, onAddToLog }: FoodResultProps) => {
  const { calculateMealPoints, getPointsReason } = useRewardsPoints()
  const points = calculateMealPoints(prediction)
  const reason = getPointsReason(points)

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-8 border-memphis-purple relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-memphis-coral text-white p-3 rounded-2xl hover:bg-opacity-90 transition-all z-10 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Points Badge */}
          <div className={`bg-gradient-to-r ${getPointsColor(points)} rounded-3xl p-6 mb-6 text-white shadow-lg`}>
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
            <h2 className="text-4xl font-bold text-memphis-purple mb-2">{prediction.name}</h2>
            <div className="flex items-center gap-2">
              <div className="bg-memphis-green text-white px-4 py-2 rounded-xl font-bold">
                {(prediction.confidence * 100).toFixed(0)}% confident
              </div>
            </div>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-memphis-purple mb-4">Nutrition Facts</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Calories</div>
                <div className="text-3xl font-bold text-memphis-coral">{prediction.calories}</div>
                <div className="text-xs text-gray-600">kcal</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Protein</div>
                <div className="text-3xl font-bold text-memphis-green">{prediction.protein}g</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Carbs</div>
                <div className="text-2xl font-bold text-memphis-yellow">{prediction.carbs}g</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Fat</div>
                <div className="text-2xl font-bold text-memphis-lavender">{prediction.fat}g</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Sodium</div>
                <div className="text-2xl font-bold text-memphis-cyan">{prediction.sodium}mg</div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="text-sm text-gray-600 mb-1">Fiber</div>
                <div className="text-2xl font-bold text-memphis-green">{prediction.fiber}g</div>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-xl p-4">
              <div className="text-sm text-gray-600 mb-1">Sugar</div>
              <div className="text-2xl font-bold text-memphis-coral">{prediction.sugar}g</div>
            </div>
          </div>

          <button
            onClick={handleAddToLog}
            className="w-full bg-memphis-purple hover:bg-opacity-90 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-coral flex items-center justify-center gap-3"
          >
            <Plus className="w-8 h-8" strokeWidth={2.5} />
            <span className="text-2xl">Add to Food Log (+{points} points)</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodResult
