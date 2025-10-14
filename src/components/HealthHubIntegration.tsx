import React, { useState } from 'react'
import { Shield, Search, CheckCircle, AlertCircle } from 'lucide-react'
import { SGMessage, SGLoadingSpinner } from './SGLocalizedUI'

const HealthHubIntegration = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = async () => {
    setIsLoading(true)
    // Simulate API connection
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-memphis-cyan via-memphis-green to-memphis-yellow rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
            <h2 className="text-5xl font-bold">HealthHub Connect</h2>
          </div>
          <p className="text-xl opacity-90">Get accurate nutrition data from HPB! 🇸🇬</p>
        </div>
      </div>

      {/* Connection Status */}
      {!isConnected ? (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
          <h3 className="text-3xl font-bold text-memphis-purple mb-6">Connect to HealthHub</h3>
          
          <SGMessage 
            type="info"
            message="Connect to HealthHub to get the most accurate nutrition data from Singapore's Health Promotion Board (HPB)!"
          />

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-memphis-green flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-memphis-purple">Official HPB Data</h4>
                <p className="text-gray-700">Get nutrition info verified by Singapore health experts</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-memphis-green flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-memphis-purple">Healthier Choice Symbol</h4>
                <p className="text-gray-700">See which foods have the HCS logo</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-memphis-green flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-lg text-memphis-purple">Local Food Database</h4>
                <p className="text-gray-700">Comprehensive data on Singaporean dishes</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <SGLoadingSpinner message="Connecting to HealthHub..." />
          ) : (
            <button
              onClick={handleConnect}
              className="w-full mt-8 bg-memphis-green hover:bg-opacity-90 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-cyan"
            >
              <span className="text-2xl">Connect Now! 🔗</span>
            </button>
          )}

          <div className="mt-6 bg-memphis-pink rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-memphis-purple flex-shrink-0 mt-1" />
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> You need a HealthHub account to connect. Don't have one? 
                <a href="https://www.healthhub.sg" target="_blank" rel="noopener noreferrer" className="text-memphis-purple font-bold underline ml-1">
                  Sign up here!
                </a>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-green">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-memphis-green mb-2">Connected to HealthHub!</h3>
            <p className="text-xl text-gray-700">You're now getting official HPB nutrition data! 🎉</p>
          </div>

          <SGMessage 
            type="success"
            message="Shiok! Now your food tracking will use accurate Singapore nutrition data from HPB!"
          />

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-memphis-pink rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">🏥</div>
              <div className="text-2xl font-bold text-memphis-purple">HPB</div>
              <div className="text-sm text-gray-700">Official Data</div>
            </div>

            <div className="bg-memphis-pink rounded-2xl p-5 text-center">
              <div className="text-4xl mb-2">✓</div>
              <div className="text-2xl font-bold text-memphis-purple">HCS</div>
              <div className="text-sm text-gray-700">Healthier Choice</div>
            </div>
          </div>

          <button
            onClick={() => setIsConnected(false)}
            className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-2xl transition-all"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* Features Preview */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">What You Get 🎁</h3>
        
        <div className="space-y-4">
          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-memphis-purple" />
              <h4 className="text-xl font-bold text-memphis-purple">Smart Food Search</h4>
            </div>
            <p className="text-gray-700">Search from thousands of local dishes with accurate nutrition info</p>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-memphis-green" />
              <h4 className="text-xl font-bold text-memphis-purple">Healthier Alternatives</h4>
            </div>
            <p className="text-gray-700">Get suggestions for healthier versions of your favorite foods</p>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-memphis-cyan" />
              <h4 className="text-xl font-bold text-memphis-purple">Verified Data</h4>
            </div>
            <p className="text-gray-700">All nutrition info verified by Singapore health experts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthHubIntegration
