import React from 'react'
import { SGCopywriting } from './SGLocalizedUI'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-memphis-purple via-memphis-cyan to-memphis-green text-white py-8 shadow-2xl border-b-8 border-memphis-yellow">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-2 drop-shadow-lg">
            {SGCopywriting.welcome.title}
          </h1>
          <p className="text-2xl opacity-90">
            {SGCopywriting.welcome.description}
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <span className="bg-white/20 px-4 py-2 rounded-full font-bold">
              🤖 {SGCopywriting.dataSource.aiPowered}
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-full font-bold">
              🔒 {SGCopywriting.dataSource.deviceOnly}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
