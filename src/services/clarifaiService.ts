interface ClarifaiConcept {
  id: string
  name: string
  value: number
  app_id: string
}

interface ClarifaiOutput {
  id: string
  status: {
    code: number
    description: string
  }
  created_at: string
  model: {
    id: string
    name: string
    created_at: string
    app_id: string
    output_info: {
      output_config: {
        concepts_mutually_exclusive: boolean
        closed_environment: boolean
      }
      message: string
      type: string
      type_ext: string
    }
    model_version: {
      id: string
      created_at: string
      status: {
        code: number
        description: string
      }
    }
  }
  input: {
    id: string
    data: {
      image: {
        url: string
      }
    }
  }
  data: {
    concepts: ClarifaiConcept[]
  }
}

interface ClarifaiResponse {
  status: {
    code: number
    description: string
  }
  outputs: ClarifaiOutput[]
}

export interface ClarifaiFoodPrediction {
  name: string
  confidence: number
  isFood: boolean
}

const CLARIFAI_PAT = import.meta.env.VITE_CLARIFAI_PAT
const CLARIFAI_USER_ID = import.meta.env.VITE_CLARIFAI_USER_ID || 'clarifai'
const CLARIFAI_APP_ID = import.meta.env.VITE_CLARIFAI_APP_ID || 'main'
const CLARIFAI_MODEL_ID = import.meta.env.VITE_CLARIFAI_MODEL_ID || 'food-item-recognition'

const FOOD_CONFIDENCE_THRESHOLD = 0.5 // 50% confidence minimum

export class ClarifaiService {
  private static instance: ClarifaiService
  private apiUrl: string

  private constructor() {
    this.apiUrl = `https://api.clarifai.com/v2/models/${CLARIFAI_USER_ID}/${CLARIFAI_APP_ID}/${CLARIFAI_MODEL_ID}/outputs`
  }

  static getInstance(): ClarifaiService {
    if (!ClarifaiService.instance) {
      ClarifaiService.instance = new ClarifaiService()
    }
    return ClarifaiService.instance
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = reader.result as string
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = base64.split(',')[1]
        resolve(base64Data)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  async recognizeFood(imageFile: File): Promise<ClarifaiFoodPrediction> {
    if (!CLARIFAI_PAT) {
      throw new Error('Clarifai API key not configured. Please add VITE_CLARIFAI_PAT to your .env file.')
    }

    try {
      // Convert image to base64
      const base64Image = await this.fileToBase64(imageFile)

      // Prepare API request
      const requestBody = {
        user_app_id: {
          user_id: CLARIFAI_USER_ID,
          app_id: CLARIFAI_APP_ID
        },
        inputs: [
          {
            data: {
              image: {
                base64: base64Image
              }
            }
          }
        ]
      }

      // Call Clarifai API
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Key ${CLARIFAI_PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Clarifai API error:', errorText)
        throw new Error(`Clarifai API request failed: ${response.status} ${response.statusText}`)
      }

      const data: ClarifaiResponse = await response.json()

      // Check if API returned valid results
      if (!data.outputs || data.outputs.length === 0) {
        return {
          name: 'Unknown dish',
          confidence: 0,
          isFood: false
        }
      }

      const output = data.outputs[0]
      
      // Check for API errors
      if (output.status.code !== 10000) {
        console.error('Clarifai output error:', output.status.description)
        throw new Error(`Clarifai processing error: ${output.status.description}`)
      }

      // Get concepts (predictions)
      const concepts = output.data.concepts

      if (!concepts || concepts.length === 0) {
        return {
          name: 'Unknown dish',
          confidence: 0,
          isFood: false
        }
      }

      // Get top prediction
      const topPrediction = concepts[0]
      
      // Check if confidence is above threshold
      if (topPrediction.value < FOOD_CONFIDENCE_THRESHOLD) {
        return {
          name: 'Unknown dish',
          confidence: topPrediction.value,
          isFood: false
        }
      }

      return {
        name: topPrediction.name,
        confidence: topPrediction.value,
        isFood: true
      }

    } catch (error) {
      console.error('Error recognizing food with Clarifai:', error)
      
      if (error instanceof Error) {
        throw error
      }
      
      throw new Error('Failed to recognize food. Please try again.')
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    if (!CLARIFAI_PAT) {
      return false
    }

    try {
      const response = await fetch(`https://api.clarifai.com/v2/users/${CLARIFAI_USER_ID}/apps/${CLARIFAI_APP_ID}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Key ${CLARIFAI_PAT}`
        }
      })

      return response.ok
    } catch (error) {
      console.error('Clarifai connection test failed:', error)
      return false
    }
  }
}

export const clarifaiService = ClarifaiService.getInstance()
