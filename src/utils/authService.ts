import { UserProfile, AuthResponse } from '../types/user'

const HEALTHHUB_API_URL = import.meta.env.VITE_HEALTHHUB_API_URL || 'https://api.healthhub.sg/v1'
const HEALTHHUB_API_KEY = import.meta.env.VITE_HEALTHHUB_API_KEY || ''

const DEMO_USERS = [
  {
    id: 'demo-1',
    email: 'john.tan@example.sg',
    password: 'demo123',
    name: 'John Tan',
    age: 45,
    weight: 78,
    height: 172,
    gender: 'male' as const,
    activityLevel: 'moderate' as const,
    medicalConditions: [
      {
        id: 'mc-1',
        name: 'Type 2 Diabetes',
        severity: 'moderate' as const,
        diagnosedDate: '2020-03-15',
        notes: 'Controlled with medication'
      },
      {
        id: 'mc-2',
        name: 'Hypertension',
        severity: 'mild' as const,
        diagnosedDate: '2019-08-20',
        notes: 'Blood pressure usually 135/85'
      }
    ],
    dietaryRestrictions: [],
    createdAt: '2023-01-15T08:00:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'demo-2',
    email: 'sarah.lim@example.sg',
    password: 'demo123',
    name: 'Sarah Lim',
    age: 32,
    weight: 58,
    height: 160,
    gender: 'female' as const,
    activityLevel: 'light' as const,
    medicalConditions: [
      {
        id: 'mc-3',
        name: 'High Cholesterol',
        severity: 'mild' as const,
        diagnosedDate: '2022-06-10',
        notes: 'LDL slightly elevated'
      }
    ],
    dietaryRestrictions: [
      {
        id: 'dr-1',
        type: 'vegetarian' as const,
        notes: 'Lacto-ovo vegetarian'
      }
    ],
    createdAt: '2023-03-20T10:30:00Z',
    lastLogin: new Date().toISOString()
  },
  {
    id: 'demo-3',
    email: 'ahmad.hassan@example.sg',
    password: 'demo123',
    name: 'Ahmad Hassan',
    age: 28,
    weight: 85,
    height: 178,
    gender: 'male' as const,
    activityLevel: 'active' as const,
    medicalConditions: [],
    dietaryRestrictions: [
      {
        id: 'dr-2',
        type: 'halal' as const,
        notes: 'Strictly halal only'
      }
    ],
    createdAt: '2023-05-10T14:15:00Z',
    lastLogin: new Date().toISOString()
  }
]

export const loginWithHealthHub = async (email: string, password: string): Promise<AuthResponse> => {
  if (HEALTHHUB_API_KEY) {
    try {
      const response = await fetch(`${HEALTHHUB_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HEALTHHUB_API_KEY}`
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const data = await response.json()
      
      localStorage.setItem('healthhub_token', data.token)
      localStorage.setItem('user_profile', JSON.stringify(data.user))
      
      return {
        success: true,
        token: data.token,
        user: data.user
      }
    } catch (error) {
      console.error('HealthHub API error:', error)
      return {
        success: false,
        error: 'Failed to connect to HealthHub. Please try again.'
      }
    }
  }

  await new Promise(resolve => setTimeout(resolve, 1500))

  const user = DEMO_USERS.find(u => u.email === email && u.password === password)

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or password. Try: john.tan@example.sg / demo123'
    }
  }

  const { password: _, ...userProfile } = user
  const token = `demo_token_${Date.now()}`

  localStorage.setItem('healthhub_token', token)
  localStorage.setItem('user_profile', JSON.stringify(userProfile))

  return {
    success: true,
    token,
    user: userProfile as UserProfile
  }
}

export const logout = (): void => {
  localStorage.removeItem('healthhub_token')
  localStorage.removeItem('user_profile')
}

export const getCurrentUser = (): UserProfile | null => {
  const userJson = localStorage.getItem('user_profile')
  if (!userJson) return null

  try {
    return JSON.parse(userJson)
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('healthhub_token')
}

export const getDemoAccounts = () => {
  return DEMO_USERS.map(({ password, ...user }) => ({
    email: user.email,
    name: user.name,
    conditions: user.medicalConditions.map(c => c.name).join(', ') || 'None',
    restrictions: user.dietaryRestrictions.map(r => r.type).join(', ') || 'None'
  }))
}
