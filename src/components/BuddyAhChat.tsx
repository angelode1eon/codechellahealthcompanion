import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Camera, TrendingUp, Lightbulb, Target, MapPin } from 'lucide-react'
import { ChatMessage, ChatContext } from '../types/chatbot'
import { healthhubAuth } from '../services/healthhubAuth'
import { useDailyIntake } from '../hooks/useDailyIntake'
import { generateHealthSummary } from '../services/healthSummaryService'
import {
  generateBuddyResponse,
  generateInitialGreeting,
  saveChatHistory,
  loadChatHistory
} from '../services/buddyAhService'

interface BuddyAhChatProps {
  onLogMealClick?: () => void
  onViewProgressClick?: () => void
  onFindHealthierClick?: () => void
}

const BuddyAhChat: React.FC<BuddyAhChatProps> = ({
  onLogMealClick,
  onViewProgressClick,
  onFindHealthierClick
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const user = healthhubAuth.getCurrentUser()
  const { dailyIntake } = useDailyIntake()
  const healthSummary = user ? generateHealthSummary(user) : null

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory()
    if (history.length > 0) {
      setMessages(history)
    } else {
      // Generate initial greeting
      const context = buildContext()
      const greeting = generateInitialGreeting(user, context)
      setMessages([greeting])
    }
  }, [])

  // Save chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages)
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Build context for Buddy Ah
  const buildContext = (): ChatContext => {
    const today = new Date().toDateString()
    const todayMeals = dailyIntake.meals.filter(
      meal => new Date(meal.timestamp || 0).toDateString() === today
    )

    return {
      lastMealLogged: todayMeals[todayMeals.length - 1]?.timestamp,
      todayMealCount: todayMeals.length,
      recentTopics: [],
      userGoals: user?.medicalConditions || [],
      currentStreak: calculateStreak()
    }
  }

  // Calculate current streak
  const calculateStreak = (): number => {
    const sortedMeals = [...dailyIntake.meals].sort((a, b) => 
      (b.timestamp || 0) - (a.timestamp || 0)
    )

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (let i = 0; i < 30; i++) {
      const dateStr = currentDate.toDateString()
      const hasMeal = sortedMeals.some(
        meal => new Date(meal.timestamp || 0).toDateString() === dateStr
      )

      if (hasMeal) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    return streak
  }

  // Handle user message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate Buddy Ah thinking
    setTimeout(() => {
      const context = buildContext()
      const buddyResponse = generateBuddyResponse(
        context,
        user,
        dailyIntake,
        healthSummary,
        inputValue
      )
      setMessages(prev => [...prev, buddyResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  // Handle quick action
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'log_meal':
        onLogMealClick?.()
        setIsOpen(false)
        break
      case 'view_progress':
        onViewProgressClick?.()
        setIsOpen(false)
        break
      case 'get_tips':
        handleSendMessage()
        setInputValue('Give me some tips')
        break
      case 'check_goals':
        handleSendMessage()
        setInputValue('How am I doing?')
        break
      case 'find_healthier':
        onFindHealthierClick?.()
        setIsOpen(false)
        break
    }
  }

  // Get icon for quick action
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'log_meal':
        return <Camera className="w-4 h-4" />
      case 'view_progress':
        return <TrendingUp className="w-4 h-4" />
      case 'get_tips':
        return <Lightbulb className="w-4 h-4" />
      case 'check_goals':
        return <Target className="w-4 h-4" />
      case 'find_healthier':
        return <MapPin className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 bg-gradient-to-r from-memphis-purple to-memphis-coral text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 border-4 border-memphis-yellow"
          aria-label="Open Buddy Ah chat"
        >
          <MessageCircle className="w-8 h-8" strokeWidth={2.5} />
          <div className="absolute -top-1 -right-1 bg-memphis-green text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
            !
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl shadow-2xl z-50 border-8 border-memphis-purple flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-memphis-purple to-memphis-coral p-4 rounded-t-3xl flex items-center justify-between border-b-6 border-memphis-yellow">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Buddy Ah</h3>
                <p className="text-xs text-white opacity-90">Your food tracking kaki 🤝</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-memphis-pink via-white to-memphis-cyan"
            style={{ maxHeight: '400px' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.type === 'user'
                      ? 'bg-memphis-purple text-white'
                      : 'bg-white border-4 border-memphis-yellow text-gray-800'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                  
                  {/* Quick Actions */}
                  {message.type === 'buddy' && message.quickActions && message.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.quickActions.map((action) => (
                        <button
                          key={action.id}
                          onClick={() => handleQuickAction(action.action)}
                          className="bg-memphis-coral hover:bg-memphis-purple text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1"
                        >
                          {getActionIcon(action.action)}
                          <span>{action.emoji} {action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-4 border-memphis-yellow rounded-2xl p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-memphis-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-memphis-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-memphis-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t-4 border-memphis-yellow bg-white rounded-b-3xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-2xl border-3 border-memphis-purple focus:outline-none focus:border-memphis-coral text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-memphis-purple to-memphis-coral text-white p-3 rounded-2xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BuddyAhChat
