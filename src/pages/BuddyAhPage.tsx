import React, { useState, useEffect, useRef } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatMessage } from '../types/chatbot'
import { healthhubAuth } from '../services/healthhubAuth'
import { useDailyIntake } from '../hooks/useDailyIntake'
import { generateHealthSummary } from '../services/healthSummaryService'
import {
  generateBuddyResponse,
  generateInitialGreeting,
  saveChatHistory,
  loadChatHistory
} from '../services/buddyAhService'

const BuddyAhPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

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
  const buildContext = () => {
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

  // Generate contextual response based on keywords
  const generateContextualResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase()

    // Tired keyword
    if (lowerMsg.includes('tired') || lowerMsg.includes('sian')) {
      return "Aiyo feeling tired ah? 😴 Maybe you need more iron and B vitamins! Try eating more leafy greens, eggs, and lean meat. Also don't forget to sleep early hor! 💤"
    }

    // Exercise keyword
    if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('gym')) {
      return "Wah shiok! Exercise is good! 💪 Remember to eat protein after workout to help muscles recover. Maybe have some chicken breast, tofu, or Greek yogurt? And drink plenty of water! 💧"
    }

    // Hungry keyword
    if (lowerMsg.includes('hungry') || lowerMsg.includes('craving')) {
      return "Hungry ah? 🍽️ Try to eat something with protein and fiber to keep you full longer! Maybe some oats with nuts, or whole grain bread with peanut butter? Don't go for sugary snacks hor, later you hungry again! 😅"
    }

    // Bubble tea keyword
    if (lowerMsg.includes('bubble tea') || lowerMsg.includes('bbt') || lowerMsg.includes('milk tea')) {
      return "Aiyo bubble tea again? 🧋 I know it's shiok but got a lot of sugar leh! Maybe try 0% sugar or fruit tea instead? Your body will thank you! 💚"
    }

    // Hawker food keyword
    if (lowerMsg.includes('hawker') || lowerMsg.includes('kopitiam')) {
      return "Hawker food is the best! 🍜 But remember to choose wisely ah. Go for less oily options, ask for less gravy, and add more vegetables. Can also share with friends to eat less! 😊"
    }

    // Weight/diet keyword
    if (lowerMsg.includes('weight') || lowerMsg.includes('diet') || lowerMsg.includes('lose')) {
      return "Want to manage weight ah? 💪 Don't need to diet until so strict! Just eat balanced meals, control portions, and stay active. Slow and steady wins the race! Remember, it's about being healthy, not just skinny hor! 🌟"
    }

    // Stress keyword
    if (lowerMsg.includes('stress') || lowerMsg.includes('busy')) {
      return "Wah so stress ah? 😰 Don't forget to take care of yourself! Eat regular meals, don't skip breakfast, and try to avoid too much caffeine. Maybe do some deep breathing or go for a walk? Your health is important! 💚"
    }

    // Default response
    return null
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
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    // Simulate Buddy Ah thinking
    setTimeout(() => {
      // Try contextual response first
      const contextualResponse = generateContextualResponse(currentInput)
      
      let buddyResponse: ChatMessage
      
      if (contextualResponse) {
        buddyResponse = {
          id: `buddy_${Date.now()}`,
          type: 'buddy',
          content: contextualResponse,
          timestamp: Date.now()
        }
      } else {
        // Fall back to general response
        const context = buildContext()
        buddyResponse = generateBuddyResponse(
          context,
          user,
          dailyIntake,
          healthSummary,
          currentInput
        )
      }
      
      setMessages(prev => [...prev, buddyResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [inputValue])

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-memphis-pink to-memphis-cyan">
      {/* Header */}
      <div className="bg-gradient-to-r from-memphis-purple to-memphis-coral p-6 shadow-lg border-b-6 border-memphis-yellow">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">👋 Chat with Buddy Ah</h1>
              <p className="text-white text-sm opacity-90 mt-1">
                Your personal wellness companion, here to help you makan smart and live shiok.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-memphis-purple to-memphis-coral text-white'
                      : 'bg-white border-4 border-memphis-yellow text-gray-800'
                  }`}
                >
                  <p className="text-base leading-relaxed whitespace-pre-line">{message.content}</p>
                  <div className="text-xs opacity-70 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString('en-SG', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border-4 border-memphis-yellow rounded-3xl px-6 py-4 shadow-lg">
                <div className="flex gap-2">
                  <motion.div
                    className="w-3 h-3 bg-memphis-purple rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-memphis-purple rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-memphis-purple rounded-full"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-0 right-0 bg-white border-t-6 border-memphis-purple shadow-2xl p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message... (Press Enter to send)"
              rows={1}
              className="flex-1 px-6 py-4 rounded-3xl border-4 border-memphis-purple focus:outline-none focus:border-memphis-coral text-base resize-none"
              style={{ maxHeight: '120px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-memphis-purple to-memphis-coral text-white p-4 rounded-full hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Buddy Ah is here to help! Ask about nutrition, exercise, or just chat 💬
          </p>
        </div>
      </div>
    </div>
  )
}

export default BuddyAhPage
