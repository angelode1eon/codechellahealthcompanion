import { 
  AuthResponse, 
  LoginCredentials, 
  UserHealthProfile,
  MedicalCondition,
  DietaryRestriction,
  ActivityLevel,
  Gender
} from '../types/healthhub'

// Mock HealthHub API - In production, replace with real API calls
const MOCK_USERS: Record<string, { password: string; profile: UserHealthProfile }> = {
  'demo@healthhub.sg': {
    password: 'demo123',
    profile: {
      id: 'user-001',
      email: 'demo@healthhub.sg',
      name: 'Tan Ah Kow',
      age: 45,
      gender: 'male',
      weight: 78,
      height: 172,
      activityLevel: 'light',
      medicalConditions: ['diabetes', 'hypertension'],
      dietaryRestrictions: ['halal'],
      createdAt: '2024-01-01T00:00:00Z',
      lastUpdated: new Date().toISOString()
    }
  },
  'sarah@healthhub.sg': {
    password: 'sarah123',
    profile: {
      id: 'user-002',
      email: 'sarah@healthhub.sg',
      name: 'Sarah Lim',
      age: 32,
      gender: 'female',
      weight: 58,
      height: 160,
      activityLevel: 'moderate',
      medicalConditions: ['none'],
      dietaryRestrictions: ['vegetarian'],
      createdAt: '2024-01-15T00:00:00Z',
      lastUpdated: new Date().toISOString()
    }
  },
  'kumar@healthhub.sg': {
    password: 'kumar123',
    profile: {
      id: 'user-003',
      email: 'kumar@healthhub.sg',
      name: 'Kumar Raj',
      age: 55,
      gender: 'male',
      weight: 85,
      height: 175,
      activityLevel: 'sedentary',
      medicalConditions: ['high-cholesterol', 'obesity'],
      dietaryRestrictions: ['none'],
      createdAt: '2024-02-01T00:00:00Z',
      lastUpdated: new Date().toISOString()
    }
  }
}

const SESSION_KEY = 'healthhub_session'
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

interface Session {
  token: string
  userId: string
  expiresAt: number
}

// Simple encryption for demo (use proper encryption in production)
const encryptData = (data: string): string => {
  return btoa(data) // Base64 encoding (NOT secure for production!)
}

const decryptData = (data: string): string => {
  try {
    return atob(data)
  } catch {
    return ''
  }
}

export const healthhubAuth = {
  // Simulate API login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const user = MOCK_USERS[credentials.email]
    
    if (!user || user.password !== credentials.password) {
      return {
        success: false,
        error: 'Invalid email or password. Try demo@healthhub.sg / demo123'
      }
    }

    // Generate mock token
    const token = `hh_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Store session
    const session: Session = {
      token,
      userId: user.profile.id,
      expiresAt: Date.now() + TOKEN_EXPIRY
    }
    
    localStorage.setItem(SESSION_KEY, encryptData(JSON.stringify(session)))
    localStorage.setItem(`profile_${user.profile.id}`, encryptData(JSON.stringify(user.profile)))

    return {
      success: true,
      token,
      user: user.profile
    }
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem(SESSION_KEY)
    // Keep profile data for quick re-login
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const sessionData = localStorage.getItem(SESSION_KEY)
    if (!sessionData) return false

    try {
      const session: Session = JSON.parse(decryptData(sessionData))
      return session.expiresAt > Date.now()
    } catch {
      return false
    }
  },

  // Get current user profile
  getCurrentUser: (): UserHealthProfile | null => {
    const sessionData = localStorage.getItem(SESSION_KEY)
    if (!sessionData) return null

    try {
      const session: Session = JSON.parse(decryptData(sessionData))
      if (session.expiresAt <= Date.now()) {
        healthhubAuth.logout()
        return null
      }

      const profileData = localStorage.getItem(`profile_${session.userId}`)
      if (!profileData) return null

      return JSON.parse(decryptData(profileData))
    } catch {
      return null
    }
  },

  // Update user profile
  updateProfile: async (updates: Partial<UserHealthProfile>): Promise<boolean> => {
    const currentUser = healthhubAuth.getCurrentUser()
    if (!currentUser) return false

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const updatedProfile: UserHealthProfile = {
      ...currentUser,
      ...updates,
      lastUpdated: new Date().toISOString()
    }

    localStorage.setItem(
      `profile_${currentUser.id}`, 
      encryptData(JSON.stringify(updatedProfile))
    )

    return true
  },

  // Get demo credentials for testing
  getDemoCredentials: () => ({
    email: 'demo@healthhub.sg',
    password: 'demo123'
  })
}
