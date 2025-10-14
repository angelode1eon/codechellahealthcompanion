import React, { useState, useEffect } from 'react'
import { AlertTriangle, X, AlertCircle } from 'lucide-react'
import { NutrientAlert } from '../types/healthhub'
import { getNutrientDisplayInfo, getConditionDisplayInfo } from '../services/conditionTrackingService'

interface NutrientAlertsProps {
  alerts: NutrientAlert[]
  onDismiss: (alertId: string) => void
}

const NutrientAlerts: React.FC<NutrientAlertsProps> = ({ alerts, onDismiss }) => {
  const [visibleAlerts, setVisibleAlerts] = useState<NutrientAlert[]>([])

  useEffect(() => {
    setVisibleAlerts(alerts.filter(a => !a.dismissed))
  }, [alerts])

  if (visibleAlerts.length === 0) return null

  const getSeverityConfig = (severity: 'warning' | 'danger' | 'critical') => {
    switch (severity) {
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          border: 'border-yellow-400',
          text: 'text-yellow-800',
          icon: AlertCircle,
          emoji: '⚠️'
        }
      case 'danger':
        return {
          bg: 'bg-orange-100',
          border: 'border-orange-400',
          text: 'text-orange-800',
          icon: AlertTriangle,
          emoji: '🚨'
        }
      case 'critical':
        return {
          bg: 'bg-red-100',
          border: 'border-red-400',
          text: 'text-red-800',
          icon: AlertTriangle,
          emoji: '🔴'
        }
    }
  }

  return (
    <div className="space-y-4">
      {visibleAlerts.map((alert) => {
        const severityConfig = getSeverityConfig(alert.severity)
        const nutrientInfo = getNutrientDisplayInfo(alert.nutrient)
        const conditionInfo = getConditionDisplayInfo(alert.condition)
        const Icon = severityConfig.icon

        return (
          <div
            key={alert.id}
            className={`${severityConfig.bg} border-4 ${severityConfig.border} rounded-3xl p-6 shadow-xl animate-bounce-in`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Icon className={`w-8 h-8 ${severityConfig.text}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{severityConfig.emoji}</span>
                  <h3 className={`text-2xl font-bold ${severityConfig.text}`}>
                    {nutrientInfo.name} Alert
                  </h3>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{conditionInfo.icon}</span>
                    <span className="text-lg font-bold text-gray-700">
                      {conditionInfo.name}
                    </span>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-gray-700">
                        {nutrientInfo.icon} Current: {alert.currentValue}{nutrientInfo.unit}
                      </span>
                      <span className="text-lg font-bold text-gray-700">
                        Target: {alert.targetValue}{nutrientInfo.unit}
                      </span>
                    </div>
                    
                    <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(alert.percentage, 100)}%`,
                          backgroundColor: nutrientInfo.color
                        }}
                      />
                      {alert.percentage > 100 && (
                        <div
                          className="absolute top-0 left-0 h-full bg-red-500 opacity-50 animate-pulse"
                          style={{ width: `${Math.min(alert.percentage - 100, 100)}%` }}
                        />
                      )}
                    </div>
                    
                    <div className="text-center mt-2">
                      <span className={`text-2xl font-bold ${severityConfig.text}`}>
                        {alert.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className={`text-xl ${severityConfig.text} leading-relaxed font-medium`}>
                  {alert.message}
                </p>
              </div>
              
              <button
                onClick={() => onDismiss(alert.id)}
                className={`flex-shrink-0 p-2 rounded-full hover:bg-white transition-colors ${severityConfig.text}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NutrientAlerts
