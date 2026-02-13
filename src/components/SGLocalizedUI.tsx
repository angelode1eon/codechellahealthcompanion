import React from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

// Singapore-specific copywriting
export const SGCopywriting = {
  welcome: {
    title: 'Welcome to Health Companion!',
    subtitle: 'Track Your Food, Lah!',
    description: 'Your personal AI nutrition tracker for Singaporean food! 🇸🇬'
  },
  upload: {
    button: 'Snap Your Food!',
    processing: 'Analyzing your food...',
    success: 'Shiok! Food logged successfully!',
    error: 'Alamak! Something went wrong. Try again?'
  },
  nutrition: {
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    sodium: 'Sodium',
    fiber: 'Fiber',
    sugar: 'Sugar'
  },
  insights: {
    title: 'Your Health Insights',
    dailyGoal: 'Daily Goal',
    consumed: 'Consumed',
    remaining: 'Remaining'
  },
  rewards: {
    title: 'Your Rewards',
    points: 'Points',
    earnedPoints: 'You earned {points} points!',
    badges: 'Badges Unlocked'
  },
  tips: {
    title: 'Hawker Health Tips',
    subtitle: 'Eat Smart at Hawker Centres! 🍜'
  },
  dataSource: {
    local: 'Local Singaporean Food Database',
    aiPowered: 'AI-Powered Analysis',
    deviceOnly: 'All data stored on your device only'
  }
}

// Message component with Singapore flair
interface SGMessageProps {
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

export const SGMessage: React.FC<SGMessageProps> = ({ type, message }) => {
  const styles = {
    success: 'bg-green-100 border-green-400 text-green-800',
    error: 'bg-red-100 border-red-400 text-red-800',
    info: 'bg-blue-100 border-blue-400 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-800'
  }

  const icons = {
    success: <CheckCircle className="w-6 h-6" />,
    error: <AlertCircle className="w-6 h-6" />,
    info: <Info className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />
  }

  return (
    <div className={`${styles[type]} border-4 rounded-2xl p-4 flex items-start gap-3`}>
      {icons[type]}
      <p className="font-medium flex-1">{message}</p>
    </div>
  )
}

// Loading spinner with Singapore style
interface SGLoadingSpinnerProps {
  message?: string
}

export const SGLoadingSpinner: React.FC<SGLoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-8 border-memphis-pink rounded-full"></div>
        <div className="absolute inset-0 border-8 border-memphis-purple rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-xl font-bold text-memphis-purple">{message}</p>
    </div>
  )
}

// Badge component
interface SGBadgeProps {
  text: string
  color?: 'purple' | 'cyan' | 'green' | 'yellow' | 'pink'
}

export const SGBadge: React.FC<SGBadgeProps> = ({ text, color = 'purple' }) => {
  const colors = {
    purple: 'bg-memphis-purple',
    cyan: 'bg-memphis-cyan',
    green: 'bg-memphis-green',
    yellow: 'bg-memphis-yellow',
    pink: 'bg-memphis-pink'
  }

  return (
    <span className={`${colors[color]} text-white px-4 py-2 rounded-full text-sm font-bold`}>
      {text}
    </span>
  )
}
