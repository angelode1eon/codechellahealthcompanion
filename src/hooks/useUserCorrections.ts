import { useState, useEffect, useCallback } from 'react'
import { UserCorrection } from '../types/food'
import CryptoJS from 'crypto-js'

const STORAGE_KEY = 'health_companion_corrections'
const ENCRYPTION_KEY = 'health-companion-corrections-key-2024'

export const useUserCorrections = () => {
  const [corrections, setCorrections] = useState<UserCorrection[]>([])

  useEffect(() => {
    loadCorrections()
  }, [])

  const loadCorrections = () => {
    try {
      const encrypted = localStorage.getItem(STORAGE_KEY)
      if (encrypted) {
        const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
        const data = JSON.parse(decrypted)
        setCorrections(data)
      }
    } catch (error) {
      console.error('Failed to load corrections:', error)
    }
  }

  const saveCorrections = (data: UserCorrection[]) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString()
      localStorage.setItem(STORAGE_KEY, encrypted)
      setCorrections(data)
    } catch (error) {
      console.error('Failed to save corrections:', error)
    }
  }

  const addCorrection = useCallback((originalPrediction: string, correctedDish: string, imageHash?: string) => {
    const newCorrection: UserCorrection = {
      timestamp: Date.now(),
      originalPrediction,
      correctedDish,
      imageHash
    }
    
    const updated = [...corrections, newCorrection]
    saveCorrections(updated)
  }, [corrections])

  const getCorrectionStats = useCallback(() => {
    const stats = corrections.reduce((acc, correction) => {
      const key = `${correction.originalPrediction} → ${correction.correctedDish}`
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return Object.entries(stats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
  }, [corrections])

  return {
    corrections,
    addCorrection,
    getCorrectionStats,
    totalCorrections: corrections.length
  }
}
