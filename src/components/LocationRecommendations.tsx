import React, { useState, useEffect } from 'react'
import { MapPin, X, Navigation, TrendingUp, AlertCircle, Loader } from 'lucide-react'
import { getUserLocation, getPersonalizedRecommendations, formatDistance } from '../services/locationService'
import { LocationRecommendation } from '../types/location'
import { healthhubAuth } from '../services/healthhubAuth'
import { generateHealthSummary } from '../services/healthSummaryService'

interface LocationRecommendationsProps {
  onClose: () => void
}

const LocationRecommendations: React.FC<LocationRecommendationsProps> = ({ onClose }) => {
  const [recommendations, setRecommendations] = useState<LocationRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const user = healthhubAuth.getCurrentUser()

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setError('Please log in to get personalized recommendations')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const location = await getUserLocation()
        const healthSummary = generateHealthSummary(user)
        const recs = getPersonalizedRecommendations(
          location,
          user,
          healthSummary.targets
        )

        if (recs.length === 0) {
          setError('No hawker centers found within 3km. Try moving to a different location!')
        } else {
          setRecommendations(recs)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get recommendations')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecommendations()
  }, [user])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-8 border-memphis-purple">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-memphis-purple to-memphis-coral p-6 rounded-t-3xl border-b-6 border-memphis-yellow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-3xl font-bold text-white">Healthier Options Near You</h2>
                <p className="text-white text-sm opacity-90">Personalized for your health goals 🎯</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-xl transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="w-12 h-12 text-memphis-purple animate-spin mb-4" />
              <p className="text-xl text-gray-600">Finding healthier options near you...</p>
              <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
            </div>
          )}

          {error && (
            <div className="bg-memphis-coral bg-opacity-20 border-4 border-memphis-coral rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-memphis-coral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-memphis-coral mb-2">Oops!</h3>
                  <p className="text-gray-700">{error}</p>
                  {error.includes('permission') && (
                    <p className="text-sm text-gray-600 mt-2">
                      💡 Tip: Enable location access in your browser settings to use this feature
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && recommendations.length > 0 && (
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.hawkerCenter.id}
                  className="bg-gradient-to-br from-memphis-pink to-white rounded-3xl p-6 shadow-lg border-4 border-memphis-yellow"
                >
                  {/* Hawker Center Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-memphis-purple text-white text-sm font-bold px-3 py-1 rounded-full">
                          #{index + 1}
                        </span>
                        <h3 className="text-2xl font-bold text-memphis-purple">
                          {rec.hawkerCenter.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{rec.hawkerCenter.address}</p>
                      <div className="flex items-center gap-2 text-memphis-coral font-bold">
                        <Navigation className="w-4 h-4" />
                        <span>{formatDistance(rec.hawkerCenter.distance!)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Message */}
                  <div className="bg-memphis-green bg-opacity-20 border-4 border-memphis-green rounded-2xl p-4 mb-4">
                    <p className="text-lg font-bold text-memphis-purple leading-relaxed">
                      {rec.personalizedMessage}
                    </p>
                  </div>

                  {/* Recommended Dishes */}
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-memphis-purple flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Recommended for You
                    </h4>
                    {rec.recommendedDishes.map((dish, dishIndex) => (
                      <div
                        key={dishIndex}
                        className="bg-white rounded-2xl p-4 shadow-md border-3 border-memphis-cyan"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-memphis-purple mb-1">
                              {dish.dishName}
                            </h5>
                            <p className="text-sm text-gray-600 mb-2">{dish.stallName}</p>
                            {dish.alternativeTo && (
                              <p className="text-sm text-memphis-coral font-bold">
                                ✨ Better than: {dish.alternativeTo}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-memphis-purple">
                              {dish.calories}
                            </div>
                            <div className="text-xs text-gray-600">calories</div>
                          </div>
                        </div>

                        {/* Nutrition Grid */}
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-memphis-pink bg-opacity-30 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-memphis-purple">{dish.protein}g</div>
                            <div className="text-xs text-gray-600">Protein</div>
                          </div>
                          <div className="bg-memphis-yellow bg-opacity-30 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-memphis-purple">{dish.carbs}g</div>
                            <div className="text-xs text-gray-600">Carbs</div>
                          </div>
                          <div className="bg-memphis-lavender bg-opacity-30 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-memphis-purple">{dish.fat}g</div>
                            <div className="text-xs text-gray-600">Fat</div>
                          </div>
                        </div>

                        {/* Health Benefits */}
                        <div className="flex flex-wrap gap-2">
                          {dish.healthBenefits.slice(0, 3).map((benefit, i) => (
                            <span
                              key={i}
                              className="bg-memphis-green text-white text-xs font-bold px-3 py-1 rounded-full"
                            >
                              ✓ {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Avoid Dishes */}
                  {rec.avoidDishes.length > 0 && (
                    <div className="mt-4 bg-memphis-coral bg-opacity-10 border-3 border-memphis-coral rounded-2xl p-4">
                      <h4 className="text-sm font-bold text-memphis-coral mb-2">
                        ⚠️ Try to avoid: {rec.avoidDishes.join(', ')}
                      </h4>
                      <p className="text-xs text-gray-600">
                        These dishes may not align with your health goals
                      </p>
                    </div>
                  )}
                </div>
              ))}

              {/* Tips */}
              <div className="bg-gradient-to-r from-memphis-yellow to-memphis-coral rounded-2xl p-6 border-4 border-memphis-purple">
                <h3 className="text-xl font-bold text-white mb-3">💡 Pro Tips</h3>
                <ul className="space-y-2 text-white">
                  <li>• Ask for less gravy/sauce to reduce sodium</li>
                  <li>• Request for more vegetables when available</li>
                  <li>• Choose soup-based dishes over fried options</li>
                  <li>• Share larger portions with friends!</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationRecommendations
