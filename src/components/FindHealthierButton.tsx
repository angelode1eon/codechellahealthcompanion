import React from 'react'
import { MapPin } from 'lucide-react'

interface FindHealthierButtonProps {
  onClick?: () => void
}

const FindHealthierButton: React.FC<FindHealthierButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full bg-gradient-to-r from-memphis-green to-memphis-cyan hover:from-memphis-cyan hover:to-memphis-green text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-purple text-xl flex items-center justify-center gap-3"
    >
      <MapPin className="w-7 h-7" strokeWidth={2.5} />
      Find Healthier Option Near Me 🗺️
    </button>
  )
}

export default FindHealthierButton
