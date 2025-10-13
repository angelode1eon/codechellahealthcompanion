import React, { useState } from 'react'
import { Search, TrendingDown, Flame, Droplet, MapPin, ChevronRight } from 'lucide-react'
import { hawkerHealthTips, searchHawkerTips, getHawkerTipsByCategory } from '../utils/hawkerHealthTips'
import { HawkerTip } from '../types/healthhub'

const HawkerHealthTips: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTip, setSelectedTip] = useState<HawkerTip | null>(null)

  const categories = [
    { id: 'all', label: 'All', emoji: '🍽️' },
    { id: 'rice', label: 'Rice', emoji: '🍚' },
    { id: 'noodles', label: 'Noodles', emoji: '🍜' },
    { id: 'soup', label: 'Soup', emoji: '🥣' },
    { id: 'snacks', label: 'Snacks', emoji: '🥙' },
    { id: 'drinks', label: 'Drinks', emoji: '☕' }
  ]

  const filteredTips = searchQuery
    ? searchHawkerTips(searchQuery)
    : selectedCategory === 'all'
    ? hawkerHealthTips
    : getHawkerTipsByCategory(selectedCategory)

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'easy': return 'bg-memphis-green'
      case 'medium': return 'bg-memphis-yellow'
      case 'hard': return 'bg-memphis-coral'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-memphis-coral via-memphis-yellow to-memphis-green rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full -ml-16 -mb-16 opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-3">🏪 Hawker Health Tips</h2>
          <p className="text-xl opacity-90">Eat shiok, stay healthy lah! 💪</p>
          <p className="text-lg opacity-80 mt-2">Learn how to make your favorite hawker dishes healthier</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-purple">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-memphis-purple w-6 h-6" />
          <input
            type="text"
            placeholder="Search for your favorite dish or hawker center..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 text-lg rounded-xl border-2 border-memphis-lavender focus:border-memphis-purple focus:outline-none"
          />
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id)
              setSearchQuery('')
            }}
            className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.id
                ? 'bg-memphis-purple text-white shadow-lg scale-105'
                : 'bg-white text-memphis-purple border-2 border-memphis-purple hover:bg-memphis-pink'
            }`}
          >
            <span className="text-2xl">{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {filteredTips.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-8 border-memphis-lavender text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h3 className="text-3xl font-bold text-memphis-purple mb-4">Alamak! Cannot find leh</h3>
          <p className="text-xl text-gray-700">Try searching for another dish or hawker center</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTips.map(tip => (
            <div
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="bg-white rounded-2xl p-6 shadow-lg border-4 border-memphis-yellow hover:border-memphis-coral transition-all cursor-pointer transform hover:scale-102"
            >
              <div className="flex gap-4">
                <img
                  src={tip.image}
                  alt={tip.dishName}
                  className="w-32 h-32 rounded-xl object-cover border-4 border-memphis-purple"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-memphis-purple">{tip.dishName}</h3>
                    <ChevronRight className="w-6 h-6 text-memphis-coral" />
                  </div>
                  
                  <div className="flex gap-2 mb-3">
                    <span className={`${getDifficultyColor(tip.difficulty)} text-white px-3 py-1 rounded-lg text-sm font-bold`}>
                      {tip.difficulty.toUpperCase()}
                    </span>
                    <span className="bg-memphis-pink text-memphis-purple px-3 py-1 rounded-lg text-sm font-bold">
                      {tip.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-memphis-coral" />
                      <span className="text-sm font-bold text-gray-700">
                        Save {tip.caloriesSaved} cal
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-memphis-cyan" />
                      <span className="text-sm font-bold text-gray-700">
                        -{tip.sodiumReduced}mg sodium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-8 border-memphis-purple">
            <div className="relative">
              <img
                src={selectedTip.image}
                alt={selectedTip.dishName}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedTip(null)}
                className="absolute top-4 right-4 bg-memphis-coral text-white p-3 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-bold text-memphis-purple mb-4">{selectedTip.dishName}</h2>

              <div className="bg-memphis-pink rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-memphis-purple" />
                  <span className="font-bold text-memphis-purple">Popular at:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTip.popularAt.map((place, idx) => (
                    <span key={idx} className="bg-white text-memphis-purple px-3 py-1 rounded-lg text-sm font-bold">
                      {place}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-100 rounded-2xl p-5 border-4 border-red-300">
                  <h3 className="text-xl font-bold text-red-700 mb-3">❌ Regular Version</h3>
                  <p className="text-sm text-gray-700 mb-3">{selectedTip.unhealthyVersion.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Calories:</span>
                      <span className="text-red-700 font-bold">{selectedTip.unhealthyVersion.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sodium:</span>
                      <span className="text-red-700 font-bold">{selectedTip.unhealthyVersion.sodium}mg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-100 rounded-2xl p-5 border-4 border-green-300">
                  <h3 className="text-xl font-bold text-green-700 mb-3">✅ Healthier Version</h3>
                  <p className="text-sm text-gray-700 mb-3">{selectedTip.healthierVersion.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Calories:</span>
                      <span className="text-green-700 font-bold">{selectedTip.healthierVersion.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Sodium:</span>
                      <span className="text-green-700 font-bold">{selectedTip.healthierVersion.sodium}mg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-memphis-green to-memphis-cyan rounded-2xl p-6 mb-6 text-white">
                <h3 className="text-2xl font-bold mb-3">💰 What You Save</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-4xl font-bold">{selectedTip.caloriesSaved}</div>
                    <div className="text-sm opacity-90">calories saved</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold">{selectedTip.sodiumReduced}mg</div>
                    <div className="text-sm opacity-90">sodium reduced</div>
                  </div>
                </div>
              </div>

              <div className="bg-memphis-yellow rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-memphis-purple mb-4">💡 How to Order (Singlish Style!)</h3>
                <ul className="space-y-3">
                  {selectedTip.healthierTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-2xl">👉</span>
                      <span className="text-lg text-gray-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HawkerHealthTips
