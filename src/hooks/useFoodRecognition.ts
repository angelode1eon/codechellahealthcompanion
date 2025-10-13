import { useState, useEffect, useCallback } from 'react'
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'
import { FoodPrediction } from '../types/food'
import { matchSingaporeanDish } from '../utils/singaporeanDishes'

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
            
            const predictionNames = predictions.map(p => p.className)
            const singaporeanDish = matchSingaporeanDish(predictionNames)
            
            if (singaporeanDish) {
              resolve({
                name: singaporeanDish.name,
                confidence: predictions[0].probability * 100,
                calories: singaporeanDish.calories,
                protein: singaporeanDish.protein,
                carbs: singaporeanDish.carbs,
                fat: singaporeanDish.fat,
                sodium: singaporeanDish.sodium,
                fiber: singaporeanDish.fiber,
                sugar: singaporeanDish.sugar,
                image: imageUrl
              })
            } else {
              const topPrediction = predictions[0]
              resolve({
                name: topPrediction.className,
                confidence: topPrediction.probability * 100,
                calories: 350,
                protein: 15,
                carbs: 45,
                fat: 12,
                sodium: 600,
                fiber: 3,
                sugar: 5,
                image: imageUrl
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
