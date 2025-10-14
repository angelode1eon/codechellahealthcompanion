import React from 'react'
import { TrendingUp, Award } from 'lucide-react'
import { useUserCorrections } from '../hooks/useUserCorrections'

const CorrectionStats = () => {
  const { getCorrectionStats, totalCorrections } = useUserCorrections()
  const topCorrections = getCorrectionStats()

  if (totalCorrections === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border-6 border-memphis-cyan mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Award className="w-8 h-8 text-memphis-purple" />
        <h3 className="text-2xl font-bold text-memphis-purple">Your Feedback Impact</h3>
      </div>

      <div className="bg-memphis-pink rounded-2xl p-4 mb-4">
        <div className="text-center">
          <div className="text-5xl font-bold text-memphis-purple">{totalCorrections}</div>
          <div className="text-lg text-gray-700 font-bold mt-1">
            Corrections Made
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Thanks for helping us improve! 🙏
          </p>
        </div>
      </div>

      {topCorrections.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-memphis-green" />
            <h4 className="font-bold text-memphis-purple">Most Common Corrections</h4>
          </div>
          <div className="space-y-2">
            {topCorrections.map(([correction, count], index) => (
              <div
                key={correction}
                className="bg-gray-50 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-memphis-yellow text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{correction}</span>
                </div>
                <span className="text-memphis-purple font-bold">{count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CorrectionStats
