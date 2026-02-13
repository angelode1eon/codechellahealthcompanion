import CryptoJS from 'crypto-js'
import { UserHealthProfile } from '../types/healthhub'

const USER_PROFILE_KEY = 'health_companion_user_profile'
const ENCRYPTION_KEY = 'health_companion_secret_key_v1'

// Encrypt data before storing
const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

// Decrypt data when retrieving
const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch {
    return ''
  }
}

export const localUserProfile = {
  // Save user profile to localStorage
  saveProfile: (profile: UserHealthProfile): void => {
    const profileData = JSON.stringify(profile)
    const encrypted = encryptData(profileData)
    localStorage.setItem(USER_PROFILE_KEY, encrypted)
  },

  // Get user profile from localStorage
  getProfile: (): UserHealthProfile | null => {
    const encrypted = localStorage.getItem(USER_PROFILE_KEY)
    if (!encrypted) return null

    try {
      const decrypted = decryptData(encrypted)
      if (!decrypted) return null
      return JSON.parse(decrypted)
    } catch {
      return null
    }
  },

  // Update user profile
  updateProfile: (updates: Partial<UserHealthProfile>): boolean => {
    const currentProfile = localUserProfile.getProfile()
    if (!currentProfile) return false

    const updatedProfile: UserHealthProfile = {
      ...currentProfile,
      ...updates,
      lastUpdated: new Date().toISOString()
    }

    localUserProfile.saveProfile(updatedProfile)
    return true
  },

  // Delete user profile
  deleteProfile: (): void => {
    localStorage.removeItem(USER_PROFILE_KEY)
  },

  // Check if profile exists
  hasProfile: (): boolean => {
    return !!localStorage.getItem(USER_PROFILE_KEY)
  },

  // Create default profile
  createDefaultProfile: (name: string, email: string): UserHealthProfile => {
    return {
      id: `user_${Date.now()}`,
      email,
      name,
      age: 30,
      gender: 'male',
      weight: 70,
      height: 170,
      activityLevel: 'moderate',
      medicalConditions: ['none'],
      dietaryRestrictions: ['none'],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }
  }
}
