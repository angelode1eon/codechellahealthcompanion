import React from 'react'

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Circles */}
      <div className="absolute top-20 left-10 w-32 h-32 border-8 border-memphis-coral rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-memphis-yellow rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 border-8 border-memphis-cyan rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-memphis-lavender rounded-full opacity-30"></div>
      
      {/* Triangles */}
      <div className="absolute top-1/3 right-10 w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-transparent border-b-memphis-green opacity-20"></div>
      <div className="absolute bottom-1/3 left-20 w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] border-transparent border-b-memphis-orange opacity-25"></div>
      
      {/* Squares */}
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-memphis-purple opacity-15 transform rotate-45"></div>
      <div className="absolute top-60 right-1/4 w-12 h-12 border-6 border-memphis-coral opacity-20 transform rotate-12"></div>
      
      {/* Lines */}
      <div className="absolute top-1/4 left-1/2 w-32 h-2 bg-memphis-cyan opacity-25 transform -rotate-45"></div>
      <div className="absolute bottom-1/4 right-1/4 w-24 h-2 bg-memphis-yellow opacity-30 transform rotate-12"></div>
      
      {/* Zigzag pattern */}
      <svg className="absolute top-10 right-1/3 w-40 h-40 opacity-20" viewBox="0 0 100 100">
        <path d="M 0 50 L 25 25 L 50 50 L 75 25 L 100 50" stroke="#FF6F61" strokeWidth="4" fill="none" />
        <path d="M 0 70 L 25 45 L 50 70 L 75 45 L 100 70" stroke="#88B04B" strokeWidth="4" fill="none" />
      </svg>
      
      {/* Dots pattern */}
      <div className="absolute bottom-10 left-10 grid grid-cols-4 gap-3 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-memphis-purple rounded-full"></div>
        ))}
      </div>
    </div>
  )
}

export default GeometricBackground
