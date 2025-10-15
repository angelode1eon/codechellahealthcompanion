export interface ChatMessage {
  id: string
  type: 'user' | 'buddy'
  content: string
  timestamp: number
  quickActions?: QuickAction[]
  imageUrl?: string
}

export interface QuickAction {
  id: string
  label: string
  emoji: string
  action: 'log_meal' | 'view_progress' | 'get_tips' | 'check_goals' | 'find_healthier'
}

export interface ChatContext {
  lastMealLogged?: number
  todayMealCount: number
  recentTopics: string[]
  userGoals: string[]
  currentStreak: number
}

export type BuddyPersonality = 
  | 'encouraging' 
  | 'concerned' 
  | 'celebratory' 
  | 'informative' 
  | 'casual'
