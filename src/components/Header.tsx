import React from 'react'
import { Heart } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-memphis-purple text-white py-6 px-4 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-2 left-10 w-8 h-8 border-4 border-white rounded-full"></div>
        <div className="absolute top-8 right-20 w-12 h-12 bg-memphis-yellow"></div>
        <div className="absolute bottom-4 left-1/4 w-0 h-0 border-l-8 border-r-8 border-b-16 border-transparent border-b-memphis-coral"></div>
        <div className="absolute top-1/2 right-10 w-16 h-2 bg-memphis-cyan"></div>
      </div>
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-memphis-coral p-3 rounded-2xl transform rotate-12 shadow-lg">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Health Companion</h1>
              <p className="text-sm opacity-90">🇸🇬 Made for Singaporeans</p>
            </div>
          </div>
          <div className="bg-memphis-yellow text-memphis-purple px-6 py-2 rounded-full font-bold text-lg shadow-lg transform -rotate-3">
            Shiok! 💪
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
