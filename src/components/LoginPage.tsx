import React, { useState } from 'react'
import { Shield, Mail, Lock, AlertCircle, Info } from 'lucide-react'
import { loginWithHealthHub, getDemoAccounts } from '../utils/authService'
import { SGMessage, SGLoadingSpinner } from './SGLocalizedUI'

interface LoginPageProps {
  onLoginSuccess: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [showDemoAccounts, setShowDemoAccounts] = useState<boolean>(false)

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await loginWithHealthHub(email, password)

    setIsLoading(false)

    if (result.success) {
      onLoginSuccess()
    } else {
      setError(result.error || 'Login failed. Please try again.')
    }
  }

  const demoAccounts = getDemoAccounts()

  return (
    <div className="min-h-screen bg-memphis-pink flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-gradient-to-br from-memphis-purple via-memphis-coral to-memphis-yellow rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12 opacity-20"></div>
          
          <div className="relative z-10 text-center">
            <Shield className="w-20 h-20 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-3">Welcome Back! 👋</h1>
            <p className="text-xl opacity-90">Login to track your health journey</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl border-8 border-memphis-purple">
          <h2 className="text-3xl font-bold text-memphis-purple mb-6 text-center">
            Login to HealthHub
          </h2>

          {error && (
            <div className="mb-6">
              <SGMessage type="warning" message={error} />
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-memphis-purple mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-memphis-purple w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.sg"
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-4 border-memphis-lavender focus:border-memphis-purple focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg font-bold text-memphis-purple mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-memphis-purple w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-4 border-memphis-lavender focus:border-memphis-purple focus:outline-none"
                />
              </div>
            </div>

            {isLoading ? (
              <SGLoadingSpinner message="Logging in..." />
            ) : (
              <button
                type="submit"
                className="w-full bg-memphis-green hover:bg-opacity-90 text-white font-bold py-5 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-4 border-memphis-cyan text-xl"
              >
                Login Now! 🚀
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="text-memphis-purple font-bold underline hover:text-memphis-coral transition-colors"
            >
              {showDemoAccounts ? 'Hide' : 'Show'} Demo Accounts
            </button>
          </div>
        </div>

        {showDemoAccounts && (
          <div className="bg-white rounded-3xl p-6 shadow-2xl border-8 border-memphis-yellow">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-6 h-6 text-memphis-purple" />
              <h3 className="text-2xl font-bold text-memphis-purple">Demo Accounts</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              Try these demo accounts! Password for all: <strong>demo123</strong>
            </p>

            <div className="space-y-3">
              {demoAccounts.map((account, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setEmail(account.email)
                    setPassword('demo123')
                  }}
                  className="bg-memphis-pink rounded-2xl p-4 cursor-pointer hover:bg-opacity-70 transition-all border-2 border-memphis-purple"
                >
                  <div className="font-bold text-memphis-purple text-lg">{account.name}</div>
                  <div className="text-sm text-gray-700">{account.email}</div>
                  <div className="text-xs text-gray-600 mt-2">
                    <strong>Conditions:</strong> {account.conditions}
                  </div>
                  {account.restrictions !== 'None' && (
                    <div className="text-xs text-gray-600">
                      <strong>Restrictions:</strong> {account.restrictions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-memphis-cyan">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-memphis-purple flex-shrink-0 mt-1" />
            <div className="text-sm text-gray-700">
              <strong>Note:</strong> This is a demo app. In production, this would connect to the official HealthHub API with secure OAuth authentication.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
