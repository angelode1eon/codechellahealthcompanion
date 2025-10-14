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

  const recognizeFood = useCallback(async (imageFile: File): Promise<FoodPrediction | null> => {
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
            const predictions = await model.classify(img)
            
            // Use local enhancement layer
            const enhanced = enhancePrediction(predictions)
            
            if (enhanced.enhancedDish) {
              // Singaporean dish identified
              resolve({
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
                mappingReason: enhanced.mappingReason
              })
            } else {
              // No Singaporean match, use original prediction
              const topPrediction = predictions[0]
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
  }, [model])

  return { recognizeFood, isLoading, error, isModelReady: !!model }
}
