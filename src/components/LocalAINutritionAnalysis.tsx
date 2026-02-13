import React from 'react'
import { Brain, Database, Zap, CheckCircle, TrendingUp } from 'lucide-react'
import { SGMessage } from './SGLocalizedUI'

const LocalAINutritionAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-memphis-purple via-memphis-cyan to-memphis-green rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-12 h-12" />
            <h2 className="text-5xl font-bold">Local AI Analysis</h2>
          </div>
          <p className="text-xl opacity-90">Powered by our Local Singaporean Food Database! 🇸🇬</p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">How Our AI Works 🤖</h3>
        
        <SGMessage 
          type="info"
          message="Our AI uses advanced image recognition to identify Singaporean dishes and provides accurate nutrition data from our local database!"
        />

        <div className="mt-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-memphis-cyan rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📸</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-memphis-purple">1. Photo Upload</h4>
              <p className="text-gray-700">Take a photo of your food or upload from gallery</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-memphis-green rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-memphis-purple">2. AI Recognition</h4>
              <p className="text-gray-700">Our AI analyzes the image using TensorFlow.js</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-memphis-yellow rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-memphis-purple">3. Local Dish Matching</h4>
              <p className="text-gray-700">Matches to our database of 13+ Singaporean dishes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-memphis-pink rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-memphis-purple">4. Nutrition Data</h4>
              <p className="text-gray-700">Provides detailed nutrition info from local database</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-cyan">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">What Makes Us Special 🌟</h3>
        
        <div className="space-y-4">
          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-6 h-6 text-memphis-purple" />
              <h4 className="text-xl font-bold text-memphis-purple">Local Food Database</h4>
            </div>
            <p className="text-gray-700">Comprehensive nutrition data for Singaporean dishes like Chicken Rice, Laksa, Nasi Lemak, and more!</p>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-memphis-green" />
              <h4 className="text-xl font-bold text-memphis-purple">Instant Analysis</h4>
            </div>
            <p className="text-gray-700">Get results in seconds! All processing happens on your device - no waiting for servers!</p>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-memphis-green" />
              <h4 className="text-xl font-bold text-memphis-purple">Signature Matching</h4>
            </div>
            <p className="text-gray-700">Our AI recognizes signature ingredient combinations for accurate dish identification!</p>
          </div>

          <div className="bg-memphis-pink rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-memphis-cyan" />
              <h4 className="text-xl font-bold text-memphis-purple">Continuous Learning</h4>
            </div>
            <p className="text-gray-700">You can correct predictions to help improve accuracy over time!</p>
          </div>
        </div>
      </div>

      {/* Supported Dishes */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-yellow">
        <h3 className="text-3xl font-bold text-memphis-purple mb-6">Supported Dishes 🍜</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {[
            'Chicken Rice',
            'Laksa',
            'Nasi Lemak',
            'Bak Kut Teh',
            'Char Kway Teow',
            'Wanton Mee',
            'Roti Prata',
            'Fish Soup',
            'Hokkien Mee',
            'Mee Rebus',
            'Mee Siam',
            'Nasi Goreng',
            'Carrot Cake'
          ].map((dish) => (
            <div key={dish} className="bg-memphis-pink rounded-xl p-3 text-center">
              <p className="font-bold text-memphis-purple">{dish}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg">
            <strong>More dishes coming soon!</strong> 🎉
          </p>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="bg-gradient-to-r from-memphis-green to-memphis-cyan rounded-3xl p-6 text-white">
        <div className="flex items-start gap-3">
          <div className="text-4xl">🔒</div>
          <div>
            <h4 className="text-2xl font-bold mb-2">100% Private & Secure</h4>
            <p className="text-lg opacity-90">
              All AI processing happens on your device! Your photos never leave your phone. 
              All data is stored locally and encrypted. 🛡️
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocalAINutritionAnalysis
