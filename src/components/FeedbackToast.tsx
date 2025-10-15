import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { FeedbackMessage } from '../services/feedbackService'

interface FeedbackToastProps {
  messages: FeedbackMessage[]
  onClose: () => void
}

const FeedbackToast = ({ messages, onClose }: FeedbackToastProps) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Auto-dismiss after 8 seconds
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // Wait for fade out animation
    }, 8000)

    return () => clearTimeout(timer)
  }, [onClose])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  if (!visible) {
    return null
  }

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 animate-fadeIn">
      <div className="space-y-3">
        {messages.map((feedback, index) => (
          <div
            key={index}
            className={`rounded-3xl p-6 shadow-2xl border-6 transform transition-all duration-300 ${
              visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
            }`}
            style={{
              backgroundColor: feedback.color,
              borderColor: feedback.type === 'caution' ? '#FF6F61' : 
                          feedback.type === 'warning' ? '#FFA07A' : '#88B04B',
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{feedback.emoji}</span>
                  <span className="text-white font-bold text-lg">
                    {feedback.type === 'caution' ? 'Careful!' : 
                     feedback.type === 'warning' ? 'Take Note' : 'Great Job!'}
                  </span>
                </div>
                <p className="text-white text-base leading-relaxed font-medium">
                  {feedback.message}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-xl transition-all flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackToast
