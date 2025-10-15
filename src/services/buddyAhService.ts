import { ChatMessage, QuickAction, ChatContext, BuddyPersonality } from '../types/chatbot'
import { UserHealthProfile } from '../types/healthhub'
import { DailyIntake } from '../types/food'
import { HealthSummary } from '../types/health'

const STORAGE_KEY = 'buddy_ah_chat_history'

// Quick actions that Buddy Ah can suggest
const QUICK_ACTIONS: Record<string, QuickAction> = {
  logMeal: {
    id: 'log_meal',
    label: 'Log Meal',
    emoji: '📸',
    action: 'log_meal'
  },
  viewProgress: {
    id: 'view_progress',
    label: 'View Progress',
    emoji: '📊',
    action: 'view_progress'
  },
  getTips: {
    id: 'get_tips',
    label: 'Get Tips',
    emoji: '💡',
    action: 'get_tips'
  },
  checkGoals: {
    id: 'check_goals',
    label: 'Check Goals',
    emoji: '🎯',
    action: 'check_goals'
  },
  findHealthier: {
    id: 'find_healthier',
    label: 'Find Healthier',
    emoji: '🗺️',
    action: 'find_healthier'
  }
}

// Singlish greetings based on time of day
const getGreeting = (): string => {
  const hour = new Date().getHours()
  
  if (hour < 12) {
    return [
      "Morning! What you makan for breakfast? 🌅",
      "Eh good morning! Ready to start the day right? 💪",
      "Morning lah! Breakfast time already 🍳"
    ][Math.floor(Math.random() * 3)]
  } else if (hour < 18) {
    return [
      "Afternoon! Lunch time or what? 🍽️",
      "Eh afternoon already! What you eating? 😋",
      "Good afternoon! Hungry or not? 🥘"
    ][Math.floor(Math.random() * 3)]
  } else {
    return [
      "Evening! Dinner time liao 🌙",
      "Eh night time already! What's for dinner? 🍜",
      "Good evening! Time to makan 🌃"
    ][Math.floor(Math.random() * 3)]
  }
}

// Generate contextual responses based on user data
export const generateBuddyResponse = (
  context: ChatContext,
  user: UserHealthProfile | null,
  dailyIntake: DailyIntake,
  healthSummary: HealthSummary | null,
  userMessage?: string
): ChatMessage => {
  const personality = determinPersonality(context, dailyIntake, healthSummary)
  const content = generateResponseContent(personality, context, user, dailyIntake, healthSummary, userMessage)
  const quickActions = suggestQuickActions(context, dailyIntake)

  return {
    id: `buddy_${Date.now()}`,
    type: 'buddy',
    content,
    timestamp: Date.now(),
    quickActions
  }
}

// Determine Buddy's personality based on context
const determinPersonality = (
  context: ChatContext,
  dailyIntake: DailyIntake,
  healthSummary: HealthSummary | null
): BuddyPersonality => {
  // Celebratory if user is doing well
  if (context.currentStreak >= 7) return 'celebratory'
  
  // Concerned if exceeding targets significantly
  if (healthSummary) {
    const sodiumPercent = (dailyIntake.totalSodium / healthSummary.targets.sodium) * 100
    const sugarPercent = (dailyIntake.totalSugar / healthSummary.targets.sugar) * 100
    
    if (sodiumPercent > 90 || sugarPercent > 90) return 'concerned'
  }
  
  // Encouraging if making progress
  if (context.todayMealCount > 0 && context.todayMealCount <= 3) return 'encouraging'
  
  // Informative for first-time users
  if (context.todayMealCount === 0) return 'informative'
  
  return 'casual'
}

// Generate response content based on personality
const generateResponseContent = (
  personality: BuddyPersonality,
  context: ChatContext,
  user: UserHealthProfile | null,
  dailyIntake: DailyIntake,
  healthSummary: HealthSummary | null,
  userMessage?: string
): string => {
  // Handle specific user queries
  if (userMessage) {
    const lowerMsg = userMessage.toLowerCase()
    
    if (lowerMsg.includes('help') || lowerMsg.includes('how')) {
      return "No worries! Just snap a photo of your food and I'll help you track it! 📸 Or click the quick actions below lah 👇"
    }
    
    if (lowerMsg.includes('progress') || lowerMsg.includes('doing')) {
      return generateProgressResponse(dailyIntake, healthSummary)
    }
    
    if (lowerMsg.includes('tip') || lowerMsg.includes('advice')) {
      return generateTipsResponse(user, dailyIntake, healthSummary)
    }
  }

  // Generate personality-based responses
  switch (personality) {
    case 'celebratory':
      return [
        `Wah ${context.currentStreak} days streak! You're on fire sia! 🔥 Keep it up!`,
        `Shiok ah! You've been consistent for ${context.currentStreak} days! 🎉`,
        `Power lah you! ${context.currentStreak} days of healthy eating! 💪`
      ][Math.floor(Math.random() * 3)]
    
    case 'concerned':
      const concerns = []
      if (healthSummary) {
        if ((dailyIntake.totalSodium / healthSummary.targets.sodium) * 100 > 90) {
          concerns.push('sodium quite high already')
        }
        if ((dailyIntake.totalSugar / healthSummary.targets.sugar) * 100 > 90) {
          concerns.push('sugar level reaching limit liao')
        }
      }
      
      return `Eh careful ah, your ${concerns.join(' and ')} 😅 Maybe go easy on the next meal? I can help you find healthier options nearby! 🗺️`
    
    case 'encouraging':
      return [
        `Good job logging your meals! ${3 - context.todayMealCount} more to go today 💪`,
        `Nice one! Keep tracking your food, you're doing great! 😊`,
        `Steady lah! ${context.todayMealCount} meal${context.todayMealCount > 1 ? 's' : ''} logged already 📝`
      ][Math.floor(Math.random() * 3)]
    
    case 'informative':
      return getGreeting() + " Upload a photo and I'll help you track your nutrition! 📸"
    
    default:
      return [
        "What you makan today? Show me lah! 🍽️",
        "Hungry or not? Let's log your meal! 😋",
        "Time to track your food! Snap a photo 📸"
      ][Math.floor(Math.random() * 3)]
  }
}

// Generate progress-specific response
const generateProgressResponse = (
  dailyIntake: DailyIntake,
  healthSummary: HealthSummary | null
): string => {
  if (!healthSummary) {
    return "You're doing good! Keep logging your meals to see your progress 📊"
  }

  const caloriePercent = (dailyIntake.totalCalories / healthSummary.targets.calories) * 100
  const proteinPercent = (dailyIntake.totalProtein / healthSummary.targets.protein) * 100
  const sodiumPercent = (dailyIntake.totalSodium / healthSummary.targets.sodium) * 100

  const insights = []
  
  if (caloriePercent < 80) {
    insights.push("calories still got room")
  } else if (caloriePercent > 100) {
    insights.push("calories a bit over already")
  }
  
  if (proteinPercent > 80) {
    insights.push("protein intake shiok")
  } else {
    insights.push("can eat more protein")
  }
  
  if (sodiumPercent < 70) {
    insights.push("sodium level very good")
  } else if (sodiumPercent > 90) {
    insights.push("sodium quite high liao")
  }

  return `Let me check ah... ${insights.join(', ')}! ${dailyIntake.meals.length} meals logged today 📊`
}

// Generate health tips based on user profile
const generateTipsResponse = (
  user: UserHealthProfile | null,
  dailyIntake: DailyIntake,
  healthSummary: HealthSummary | null
): string => {
  if (!user || !healthSummary) {
    return "Drink more water, eat more veggies, and stay active! 💧🥗🏃"
  }

  const tips = []

  // Condition-specific tips
  if (user.medicalConditions.includes('diabetes')) {
    tips.push("Watch your carbs and sugar intake ah")
  }
  if (user.medicalConditions.includes('hypertension')) {
    tips.push("Go easy on the salt and sauces")
  }
  if (user.medicalConditions.includes('high-cholesterol')) {
    tips.push("Try to avoid fried food")
  }

  // General tips based on current intake
  if ((dailyIntake.totalFiber / healthSummary.targets.fiber) * 100 < 50) {
    tips.push("Eat more vegetables and fruits lah")
  }
  if (dailyIntake.meals.length < 3) {
    tips.push("Don't skip meals hor")
  }

  if (tips.length === 0) {
    return "You're doing great! Just keep it up and stay consistent 💪"
  }

  return `Here's some tips for you: ${tips.join(', ')}! 💡`
}

// Suggest relevant quick actions
const suggestQuickActions = (
  context: ChatContext,
  dailyIntake: DailyIntake
): QuickAction[] => {
  const actions: QuickAction[] = []

  // Always suggest logging meal if less than 3 meals today
  if (context.todayMealCount < 3) {
    actions.push(QUICK_ACTIONS.logMeal)
  }

  // Suggest viewing progress if meals logged
  if (dailyIntake.meals.length > 0) {
    actions.push(QUICK_ACTIONS.viewProgress)
  }

  // Always offer tips
  actions.push(QUICK_ACTIONS.getTips)

  // Suggest finding healthier options
  actions.push(QUICK_ACTIONS.findHealthier)

  return actions.slice(0, 3) // Max 3 quick actions
}

// Generate meal logging confirmation
export const generateMealLoggedResponse = (
  mealName: string,
  calories: number,
  isHealthy: boolean
): ChatMessage => {
  const responses = isHealthy
    ? [
        `Nice choice! ${mealName} is quite healthy 👍 ${calories} calories logged!`,
        `Good one! ${mealName} fits your goals well 💚 Tracked ${calories} calories!`,
        `Shiok! ${mealName} is a solid choice 😊 ${calories} calories added!`
      ]
    : [
        `Okay lah, ${mealName} logged! ${calories} calories. Maybe go lighter next meal? 😅`,
        `${mealName} tracked! ${calories} calories. Not bad, but can do better next time 💪`,
        `Alright, ${mealName} is in! ${calories} calories. Balance it out with healthier options later ah 🥗`
      ]

  return {
    id: `buddy_${Date.now()}`,
    type: 'buddy',
    content: responses[Math.floor(Math.random() * responses.length)],
    timestamp: Date.now(),
    quickActions: [QUICK_ACTIONS.viewProgress, QUICK_ACTIONS.findHealthier]
  }
}

// Generate weekly progress commentary
export const generateWeeklyProgressResponse = (
  weeklyStats: {
    avgCalories: number
    avgSodium: number
    avgSugar: number
    mealCount: number
    improvement: boolean
  }
): ChatMessage => {
  const { avgCalories, avgSodium, avgSugar, mealCount, improvement } = weeklyStats

  let content = ''
  
  if (improvement) {
    content = `Wah you improving sia! 🎉 This week better than last week:\n\n`
    content += `• ${mealCount} meals logged\n`
    content += `• Average ${Math.round(avgCalories)} calories per day\n`
    
    if (avgSodium < 2000) {
      content += `• Sodium lower than last week! 💪\n`
    }
    if (avgSugar < 50) {
      content += `• Sugar intake also better! 👍\n`
    }
    
    content += `\nKeep it up! You're on the right track 🚀`
  } else {
    content = `This week not bad lah, but can improve more! 💪\n\n`
    content += `• ${mealCount} meals logged\n`
    content += `• Average ${Math.round(avgCalories)} calories per day\n\n`
    
    if (avgSodium > 2000) {
      content += `Try to cut down on sodium next week ah 🧂\n`
    }
    if (avgSugar > 50) {
      content += `Aiyo too much sugar this week, maybe try fruit tea instead? 🍵\n`
    }
    
    content += `\nSmall changes can make big difference! 💚`
  }

  return {
    id: `buddy_${Date.now()}`,
    type: 'buddy',
    content,
    timestamp: Date.now(),
    quickActions: [QUICK_ACTIONS.getTips, QUICK_ACTIONS.checkGoals]
  }
}

// Save chat history to localStorage
export const saveChatHistory = (messages: ChatMessage[]): void => {
  try {
    // Keep only last 50 messages to avoid storage bloat
    const recentMessages = messages.slice(-50)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentMessages))
  } catch (error) {
    console.error('Failed to save chat history:', error)
  }
}

// Load chat history from localStorage
export const loadChatHistory = (): ChatMessage[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load chat history:', error)
    return []
  }
}

// Clear chat history
export const clearChatHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}

// Generate initial greeting message
export const generateInitialGreeting = (
  user: UserHealthProfile | null,
  context: ChatContext
): ChatMessage => {
  const userName = user?.name?.split(' ')[0] || 'friend'
  
  let content = ''
  
  if (context.todayMealCount === 0) {
    content = `Hey ${userName}! ${getGreeting()} I'm Buddy Ah, your food tracking kaki! 🤝\n\nSnap a photo of your meal and I'll help you track it! 📸`
  } else if (context.currentStreak >= 7) {
    content = `Eh ${userName}! ${context.currentStreak} days streak liao! You're doing super well sia! 🔥 What you eating today?`
  } else {
    content = `Hey ${userName}! ${getGreeting()} Already logged ${context.todayMealCount} meal${context.todayMealCount > 1 ? 's' : ''} today! 💪`
  }

  return {
    id: `buddy_${Date.now()}`,
    type: 'buddy',
    content,
    timestamp: Date.now(),
    quickActions: [QUICK_ACTIONS.logMeal, QUICK_ACTIONS.getTips, QUICK_ACTIONS.viewProgress]
  }
}
