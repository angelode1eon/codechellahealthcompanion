import React, { useState } from 'react'
import { LogIn, Shield, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { healthhubAuth } from '../services/healthhubAuth'
import { UserHealthProfile } from '../types/healthhub'
import { SGLoadingSpinner } from './SGLocalizedUI'

interface LoginPageProps {
  onLoginSuccess: (user: UserHealthProfile) => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const demoCredentials = healthhubAuth.getDemoCredentials()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await healthhubAuth.login({ email, password })
      
      if (response.success && response.user) {
        onLoginSuccess(response.user)
      } else {
        setError(response.error || 'Login failed. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail(demoCredentials.email)
    setPassword(demoCredentials.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-memphis-cyan via-memphis-green to-memphis-yellow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">🏥</div>
          <h1 className="text-6xl font-bold text-white mb-2">Health Companion</h1>
          <p className="text-2xl text-white opacity-90">Powered by HealthHub 🇸🇬</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-10 h-10 text-memphis-purple" />
            <h2 className="text-4xl font-bold text-memphis-purple">Secure Login</h2>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 border-4 border-red-400 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xl font-bold text-memphis-purple mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors"
                placeholder="your.email@healthhub.sg"
                required
              />
            </div>

            <div>
              <label className="block text-xl font-bold text-memphis-purple mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 text-xl border-4 border-memphis-cyan rounded-2xl focus:outline-none focus:border-memphis-purple transition-colors pr-14"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-memphis-purple transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {isLoading ? (
              <SGLoadingSpinner message="Logging in..." />
            ) : (
              <button
                type="submit"
                className="w-full bg-memphis-purple hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all border-4 border-memphis-cyan"
              >
                <div className="flex items-center justify-center gap-3">
                  <LogIn className="w-6 h-6" />
                  <span className="text-2xl">Login to HealthHub</span>
                </div>
              </button>
            )}
          </form>

          {/* Demo Login */}
          <div className="mt-6 pt-6 border-t-4 border-memphis-pink">
            <button
              onClick={handleDemoLogin}
              className="w-full bg-memphis-yellow hover:bg-opacity-90 text-memphis-purple font-bold py-4 px-6 rounded-2xl shadow-lg transition-all"
            >
              <span className="text-xl">Try Demo Account 🎮</span>
            </button>
            <p className="text-center text-sm text-gray-600 mt-3">
              Demo: {demoCredentials.email} / {demoCredentials.password}
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="mt-6 bg-memphis-pink rounded-2xl p-4">
            <p className="text-sm text-gray-700 text-center">
              🔒 Your health data is encrypted and secure. We follow HPB privacy guidelines.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white">
          <p className="text-lg opacity-90">
            Don't have an account?{' '}
            <a href="https://www.healthhub.sg" target="_blank" rel="noopener noreferrer" className="font-bold underline">
              Sign up at HealthHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
