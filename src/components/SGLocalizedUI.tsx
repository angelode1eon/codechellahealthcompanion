import React from 'react'
import { AlertCircle, CheckCircle, Info } from 'lucide-react'

interface SGMessageProps {
  type: 'success' | 'info' | 'warning'
  message: string
}

export const SGMessage = ({ type, message }: SGMessageProps) => {
  const configs = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-400',
      icon: CheckCircle,
      iconColor: 'text-green-600'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      icon: Info,
      iconColor: 'text-blue-600'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-400',
      icon: AlertCircle,
      iconColor: 'text-yellow-600'
    }
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className={`${config.bg} ${config.border} border-4 rounded-2xl p-4 flex items-start gap-3`}>
      <Icon className={`w-6 h-6 ${config.iconColor} flex-shrink-0 mt-1`} />
      <p className="text-gray-800 font-medium">{message}</p>
    </div>
  )
}

export const SGLoadingSpinner = ({ message = 'Loading liao...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20 mb-4">
        <div className="absolute inset-0 border-8 border-memphis-pink rounded-full"></div>
        <div className="absolute inset-0 border-8 border-memphis-purple rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-xl font-bold text-memphis-purple">{message}</p>
    </div>
  )
}

export const SGEmptyState = ({ 
  emoji, 
  title, 
  description 
}: { 
  emoji: string
  title: string
  description: string 
}) => {
  return (
    <div className="text-center py-12">
      <div className="text-8xl mb-4">{emoji}</div>
      <h3 className="text-3xl font-bold text-memphis-purple mb-3">{title}</h3>
      <p className="text-xl text-gray-700">{description}</p>
    </div>
  )
}

// Singlish copywriting constants
export const SGCopywriting = {
  welcome: {
    title: 'Eh welcome lah! 👋',
    subtitle: 'Track your makan, stay healthy can!',
    cta: 'Start tracking now!'
  },
  upload: {
    button: 'Snap Your Food! 📸',
    processing: 'AI checking your food liao...',
    success: 'Wah! Found your dish already! 🎉',
    error: 'Alamak! Cannot recognize leh. Try again?'
  },
  rewards: {
    earnedPoints: 'Shiok! You earned {points} points! 🌟',
    lowPoints: 'Not bad lah, keep trying! 💪',
    highPoints: 'Wah steady lah! Very healthy! 🏆',
    streakMessage: 'You on fire! {days} days streak! 🔥'
  },
  tips: {
    lessOil: 'Ask uncle "少油" (less oil) can save calories!',
    noSkin: 'No skin = healthier, still shiok what!',
    shareFood: 'Share with friend lah, healthier and cheaper!',
    plainRice: 'Plain rice better than oily rice, trust me',
    drinkWater: 'Drink plain water also can, free and healthy!'
  },
  achievements: {
    firstMeal: 'First meal logged! Steady pom pi pi! 🎊',
    weekStreak: 'One week streak! You very consistent leh! 🔥',
    healthyChoice: 'Wah you choose healthy option! Respect! 💚',
    pointMaster: 'Point master sia! Keep it up! 🏆'
  },
  errors: {
    noImage: 'Eh, need to upload photo first leh!',
    apiError: 'Alamak! Server got problem. Try again later?',
    noInternet: 'Wah your internet down ah? Check your connection!',
    invalidData: 'Something wrong with the data leh. Try again?'
  },
  navigation: {
    home: 'Home',
    log: 'My Makan',
    tips: 'Hawker Tips',
    wrapped: 'My Progress',
    rewards: 'Rewards'
  }
}
