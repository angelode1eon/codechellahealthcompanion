import React from 'react'
import { Home, BookOpen, TrendingUp, Award, MessageCircle } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home', emoji: '🏠' },
    { id: 'log', icon: BookOpen, label: 'Log', emoji: '📖' },
    { id: 'insights', icon: TrendingUp, label: 'Insights', emoji: '💡' },
    { id: 'rewards', icon: Award, label: 'Rewards', emoji: '🏆' },
    { id: 'buddy', icon: MessageCircle, label: 'Buddy Ah', emoji: '💬' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-memphis-purple shadow-2xl z-50">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-2xl transition-all transform ${
                  isActive
                    ? 'bg-memphis-purple text-white scale-110 shadow-lg'
                    : 'text-gray-600 hover:bg-memphis-pink hover:scale-105'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
                <span className="text-xs font-bold">{tab.label}</span>
                {isActive && <span className="text-base">{tab.emoji}</span>}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
