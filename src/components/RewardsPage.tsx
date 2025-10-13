import React from 'react'
import { Trophy, Star, Flame, TrendingUp, Award, Zap } from 'lucide-react'
import { useRewardsPoints } from '../hooks/useRewardsPoints'

const RewardsPage = () => {
  const { rewards } = useRewardsPoints()

  const unlockedBadges = rewards.badges.filter(b => b.unlockedAt)
  const lockedBadges = rewards.badges.filter(b => !b.unlockedAt)

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-memphis-purple via-memphis-lavender to-memphis-coral rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-memphis-yellow rounded-full -mr-20 -mt-20 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-memphis-cyan rounded-full -ml-16 -mb-16 opacity-30"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-12 h-12" />
            <h2 className="text-5xl font-bold">Your Rewards</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6" />
                <span className="text-sm opacity-90">Total Points</span>
              </div>
              <div className="text-5xl font-bold">{rewards.totalPoints}</div>
            </div>

            <div className="bg-white bg-opacity-20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-6 h-6" />
                <span className="text-sm opacity-90">Current Streak</span>
              </div>
              <div className="text-5xl font-bold">{rewards.currentStreak}</div>
              <div className="text-sm opacity-90 mt-1">days</div>
            </div>
          </div>

          <div className="mt-6 bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Longest Streak</span>
              </div>
              <span className="text-2xl font-bold">{rewards.longestStreak} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unlocked Badges */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-green">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6 flex items-center gap-3">
          <Zap className="w-8 h-8 text-memphis-yellow" />
          Unlocked Badges ({unlockedBadges.length})
        </h3>

        {unlockedBadges.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-xl text-gray-700 font-bold">No badges yet!</p>
            <p className="text-lg text-gray-600 mt-2">Keep logging healthy meals to earn badges</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {unlockedBadges.map(badge => (
              <div key={badge.id} className="bg-gradient-to-br from-memphis-yellow to-memphis-coral rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all">
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h4 className="text-xl font-bold mb-2">{badge.name}</h4>
                <p className="text-sm opacity-90 mb-3">{badge.description}</p>
                <div className="text-xs opacity-75">
                  Unlocked {new Date(badge.unlockedAt!).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Locked Badges */}
      {lockedBadges.length > 0 && (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-cyan">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-memphis-cyan" />
            In Progress ({lockedBadges.length})
          </h3>

          <div className="space-y-4">
            {lockedBadges.map(badge => {
              const progress = badge.progress || 0
              const target = badge.target || 1
              const percentage = Math.min((progress / target) * 100, 100)

              return (
                <div key={badge.id} className="bg-memphis-pink rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl opacity-50">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-memphis-purple mb-1">{badge.name}</h4>
                      <p className="text-sm text-gray-700 mb-3">{badge.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-bold text-memphis-purple">
                          <span>{progress} / {target}</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-memphis-green to-memphis-cyan h-full rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent Points */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-lavender">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">Recent Points 📈</h3>

        {rewards.pointsHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">⭐</div>
            <p className="text-xl text-gray-700 font-bold">No points earned yet!</p>
            <p className="text-lg text-gray-600 mt-2">Start logging meals to earn points</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rewards.pointsHistory.slice(0, 10).map((entry, index) => (
              <div key={index} className="bg-memphis-pink rounded-xl p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-memphis-purple">{entry.mealName}</h4>
                  <p className="text-sm text-gray-700">{entry.reason}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {new Date(entry.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-memphis-coral">+{entry.points}</div>
                  <div className="text-sm text-gray-600">points</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RewardsPage
