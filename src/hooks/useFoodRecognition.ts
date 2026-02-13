import { useState, useEffect, useCallback } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'
import { FoodPrediction } from '../types/food'
import { enhancePrediction } from '../utils/singaporeanDishes'

export const useFoodRecognition = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready()
        const loadedModel = await mobilenet.load()
        setModel(loadedModel)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load AI model')
        setIsLoading(false)
        console.error('Model loading error:', err)
      }
    }

    loadModel()
  }, [])

  const recognizeFood = useCallback(
    async (imageFile: File): Promise<FoodPrediction | null> => {
      if (!model) {
        setError('Model not loaded yet')
        return null
      }

      try {
        const imageUrl = URL.createObjectURL(imageFile)
        const img = new Image()

        return new Promise((resolve) => {
          img.onload = async () => {
            try {
              // Get top 5 predictions for better context
              const predictions = await model.classify(img, 5)

              console.log('MobileNet predictions:', predictions)

              // Use enhanced prediction with weighted scoring
              // ALL nutrition data comes from singaporeanDishes.ts
              const enhanced = enhancePrediction(predictions)

              console.log('Enhanced prediction:', enhanced)

              if (enhanced.enhancedDish) {
                // Singaporean dish identified - nutrition data from singaporeanDishes.ts
                const result: FoodPrediction = {
                  name: enhanced.enhancedDish.name,
                  confidence: enhanced.confidence,
                  calories: enhanced.enhancedDish.calories,
                  protein: enhanced.enhancedDish.protein,
                  carbs: enhanced.enhancedDish.carbs,
                  fat: enhanced.enhancedDish.fat,
                  sodium: enhanced.enhancedDish.sodium,
                  fiber: enhanced.enhancedDish.fiber,
                  sugar: enhanced.enhancedDish.sugar,
                  image: imageUrl,
                  originalPrediction: enhanced.originalPrediction,
                  mappingReason: enhanced.mappingReason,
                  matchDetails: enhanced.matchDetails
                }

                console.log('Final prediction with local nutrition data:', result)
                resolve(result)
              } else {
                // No Singaporean match - try aggressive generic mapping
                const topPrediction = predictions[0]
                const predictionText = predictions
                  .map(p => p.className)
                  .join(' ')
                  .toLowerCase()

                // Check if any high-confidence generic terms strongly suggest a local dish
                const aggressiveMatch = tryAggressiveMapping(
                  predictionText,
                  topPrediction.probability
                )

                if (aggressiveMatch) {
                  console.log('Aggressive mapping found with local nutrition data:', aggressiveMatch)
                  resolve({
                    ...aggressiveMatch,
                    image: imageUrl
                  })
                } else {
                  // Use original prediction with estimated nutrition
                  // Note: Even generic predictions use estimated values, not external APIs
                  console.log('No match found, using original prediction with estimated nutrition')
                  resolve({
                    name: topPrediction.className,
                    confidence: topPrediction.probability,
                    calories: 350,
                    protein: 15,
                    carbs: 45,
                    fat: 12,
                    sodium: 600,
                    fiber: 3,
                    sugar: 5,
                    image: imageUrl,
                    originalPrediction: topPrediction.className,
                    mappingReason: 'no_match'
                  })
                }
              }
            } catch (err) {
              console.error('Classification error:', err)
              setError('Failed to classify image')
              resolve(null)
            }
          }

          img.onerror = () => {
            setError('Failed to load image')
            resolve(null)
          }

          img.src = imageUrl
        })
      } catch (err) {
        console.error('Recognition error:', err)
        setError('Failed to process image')
        return null
      }
    },
    [model]
  )

  return { recognizeFood, isLoading, error, isModelReady: !!model }
}

// Aggressive mapping for high-confidence generic terms
// ALL nutrition data comes from singaporeanDishes.ts
const tryAggressiveMapping = (
  predictionText: string,
  confidence: number
): FoodPrediction | null => {
  // Only apply aggressive mapping for high-confidence predictions
  if (confidence < 0.6) return null

  // Import dishes from singaporeanDishes.ts
  const { singaporeanDishes } = require('../utils/singaporeanDishes')

  // Define strong generic term mappings
  const strongMappings: Record<string, string[]> = {
    'rice': ['Chicken Rice', 'Nasi Lemak', 'Nasi Goreng'],
    'noodle': ['Laksa', 'Char Kway Teow', 'Hokkien Mee', 'Wanton Mee'],
    'soup': ['Laksa', 'Bak Kut Teh', 'Fish Soup'],
    'curry': ['Laksa'],
    'fried': ['Char Kway Teow', 'Nasi Goreng', 'Carrot Cake'],
    'chicken': ['Chicken Rice'],
    'pork': ['Bak Kut Teh', 'Wanton Mee'],
    'seafood': ['Laksa', 'Char Kway Teow', 'Hokkien Mee'],
    'flatbread': ['Roti Prata'],
    'pancake': ['Roti Prata']
  }

  // Check for strong matches
  for (const [term, dishNames] of Object.entries(strongMappings)) {
    if (predictionText.includes(term)) {
      // If high confidence and matches a strong term, return first matching dish
      // Nutrition data comes from singaporeanDishes.ts
      const matchedDish = singaporeanDishes.find((dish: any) =>
        dishNames.includes(dish.name)
      )

      if (matchedDish) {
        return {
          name: matchedDish.name,
          confidence: confidence * 0.85, // Slightly reduce confidence for aggressive mapping
          calories: matchedDish.calories,
          protein: matchedDish.protein,
          carbs: matchedDish.carbs,
          fat: matchedDish.fat,
          sodium: matchedDish.sodium,
          fiber: matchedDish.fiber,
          sugar: matchedDish.sugar,
          originalPrediction: predictionText,
          mappingReason: 'generic_mapping'
        }
      }
    }
  }

  return null
}
