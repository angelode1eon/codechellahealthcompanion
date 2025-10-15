import { useState, useCallback } from 'react'
import { FoodPrediction } from '@/types/food'
import { enhancePrediction } from '@/utils/singaporeanDishes'
import { clarifaiService, ClarifaiFoodPrediction } from '@/services/clarifaiService'

export const useFoodRecognition = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const recognizeFood = useCallback(async (imageFile: File): Promise<FoodPrediction | null> => {
    setIsLoading(true)
    setError(null)

    try {
      // Call Clarifai API for food recognition
      const clarifaiPrediction: ClarifaiFoodPrediction = await clarifaiService.recognizeFood(imageFile)
      
      const imageUrl = URL.createObjectURL(imageFile)

      // If no food detected, return unknown dish
      if (!clarifaiPrediction.isFood) {
        return {
          name: 'Unknown dish',
          confidence: clarifaiPrediction.confidence,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          sodium: 0,
          fiber: 0,
          sugar: 0,
          image: imageUrl,
          originalPrediction: clarifaiPrediction.name,
          mappingReason: 'no_match'
        }
      }

      // Use local enhancement layer to map to Singaporean dishes
      const mockPredictions = [{
        className: clarifaiPrediction.name,
        probability: clarifaiPrediction.confidence
      }]
      
      const enhanced = enhancePrediction(mockPredictions)
      
      if (enhanced.enhancedDish) {
        // Singaporean dish identified
        return {
          name: enhanced.enhancedDish.name,
          confidence: enhanced.confidence,
          calories: enhanced.enhancedDish.calories,
          protein: enhanced.enhancedDish.protein,
          carbs: enhanced.enhancedDish.carbs,
          fat: enhanced.enhancedDish.fat,
          saturatedFat: enhanced.enhancedDish.saturatedFat,
          sodium: enhanced.enhancedDish.sodium,
          fiber: enhanced.enhancedDish.fiber,
          sugar: enhanced.enhancedDish.sugar,
          image: imageUrl,
          originalPrediction: enhanced.originalPrediction,
          mappingReason: enhanced.mappingReason
        }
      } else {
        // No Singaporean match, use Clarifai prediction with estimated nutrition
        return {
          name: clarifaiPrediction.name,
          confidence: clarifaiPrediction.confidence,
          calories: 350,
          protein: 15,
          carbs: 45,
          fat: 12,
          sodium: 600,
          fiber: 3,
          sugar: 5,
          image: imageUrl,
          originalPrediction: clarifaiPrediction.name,
          mappingReason: 'no_match'
        }
      }
    } catch (err) {
      console.error('Recognition error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to recognize food. Please try again.'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    recognizeFood, 
    isLoading, 
    error, 
    isModelReady: true // Clarifai is always ready (cloud-based)
  }
}
