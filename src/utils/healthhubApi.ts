import { HPBNutritionData } from '../types/healthhub'

const HEALTHHUB_API_KEY = import.meta.env.VITE_HEALTHHUB_API_KEY || ''
const HEALTHHUB_BASE_URL = import.meta.env.VITE_HEALTHHUB_BASE_URL || 'https://api.healthhub.sg/v1'

export const searchHPBFood = async (foodName: string): Promise<HPBNutritionData | null> => {
  if (!HEALTHHUB_API_KEY) {
    console.warn('HealthHub API key not configured. Using local data.')
    return null
  }

  try {
    const response = await fetch(`${HEALTHHUB_BASE_URL}/nutrition/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HEALTHHUB_API_KEY}`
      },
      body: JSON.stringify({ query: foodName })
    })

    if (!response.ok) {
      throw new Error('HealthHub API request failed')
    }

    const data = await response.json()
    return data.results?.[0] || null
  } catch (error) {
    console.error('HealthHub API error:', error)
    return null
  }
}

export const getHealthierChoiceAlternatives = async (foodName: string): Promise<HPBNutritionData[]> => {
  if (!HEALTHHUB_API_KEY) {
    return []
  }

  try {
    const response = await fetch(`${HEALTHHUB_BASE_URL}/nutrition/alternatives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HEALTHHUB_API_KEY}`
      },
      body: JSON.stringify({ 
        foodName,
        filterHealthierChoice: true 
      })
    })

    if (!response.ok) {
      throw new Error('HealthHub API request failed')
    }

    const data = await response.json()
    return data.alternatives || []
  } catch (error) {
    console.error('HealthHub API error:', error)
    return []
  }
}
