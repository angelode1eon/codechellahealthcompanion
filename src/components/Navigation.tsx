import React from 'react'
import { Home, BookOpen, TrendingUp, Trophy, Utensils, Shield } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'log', icon: BookOpen, label: 'My Makan' },
    { id: 'tips', icon: Utensils, label: 'Hawker Tips' },
    { id: 'wrapped', icon: TrendingUp, label: 'Progress' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'healthhub', icon: Shield, label: 'HealthHub' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-8 border-memphis-purple shadow-2xl z-50 overflow-x-auto">
      <div className="container mx-auto px-2">
        <div className="flex justify-around items-center py-3 min-w-max">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all transform hover:scale-110 ${
                activeTab === id
                  ? 'bg-memphis-purple text-white shadow-lg scale-110'
                  : 'text-memphis-purple hover:bg-memphis-pink'
              }`}
            >
              <Icon className="w-6 h-6" strokeWidth={2.5} />
              <span className="text-xs font-bold whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
