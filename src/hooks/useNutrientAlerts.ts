import { useState, useEffect } from 'react'
import { NutrientAlert, UserHealthProfile, NutrientTargets, DailyIntake } from '../types/healthhub'
import { checkNutrientAlerts } from '../services/conditionTrackingService'

const ALERTS_STORAGE_KEY = 'nutrient-alerts'

export const useNutrientAlerts = (
  profile: UserHealthProfile | null,
  targets: NutrientTargets | null,
  intake: DailyIntake
) => {
  const [alerts, setAlerts] = useState<NutrientAlert[]>([])

  useEffect(() => {
    if (!profile || !targets) return

    const newAlerts = checkNutrientAlerts(profile, targets, intake)
    
    // Load previously dismissed alerts
    const stored = localStorage.getItem(ALERTS_STORAGE_KEY)
    const dismissedIds = stored ? JSON.parse(stored) : []
    
    // Mark previously dismissed alerts
    const alertsWithDismissed = newAlerts.map(alert => ({
      ...alert,
      dismissed: dismissedIds.includes(alert.id)
    }))
    
    setAlerts(alertsWithDismissed)
  }, [profile, targets, intake])

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, dismissed: true } : alert
      )
    )
    
    // Save dismissed alert IDs
    const stored = localStorage.getItem(ALERTS_STORAGE_KEY)
    const dismissedIds = stored ? JSON.parse(stored) : []
    dismissedIds.push(alertId)
    localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(dismissedIds))
  }

  const clearDismissedAlerts = () => {
    localStorage.removeItem(ALERTS_STORAGE_KEY)
    setAlerts(prev => prev.map(alert => ({ ...alert, dismissed: false })))
  }

  return { alerts, dismissAlert, clearDismissedAlerts }
}
