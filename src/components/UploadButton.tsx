import React, { useRef, useState } from 'react'
import { Camera, Upload, Loader2 } from 'lucide-react'
import { useFoodRecognition } from '../hooks/useFoodRecognition'
import FoodResult from './FoodResult'
import { FoodPrediction } from '../types/food'

interface UploadButtonProps {
  onAddMeal: (meal: FoodPrediction) => void
}

const UploadButton = ({ onAddMeal }: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { recognizeFood, isLoading: modelLoading, isModelReady } = useFoodRecognition()
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<FoodPrediction | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsProcessing(true)
      setResult(null)
      
      try {
        const prediction = await recognizeFood(file)
        if (prediction) {
          setResult(prediction)
        }
      } catch (error) {
        console.error('Error processing image:', error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleClose = () => {
    setResult(null)
  }

  if (result) {
    return <FoodResult prediction={result} onClose={handleClose} onAddToLog={onAddMeal} />
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        disabled={!isModelReady || isProcessing}
      />
      
      <button
        onClick={handleClick}
        disabled={!isModelReady || isProcessing}
        className="w-full bg-memphis-coral hover:bg-opacity-90 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-purple relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <div className="absolute inset-0 bg-memphis-yellow opacity-0 group-hover:opacity-20 transition-opacity"></div>
        
        <div className="relative z-10 flex items-center justify-center gap-4">
          {isProcessing ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" strokeWidth={2.5} />
              <span className="text-2xl">Analyzing Food...</span>
            </>
          ) : modelLoading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" strokeWidth={2.5} />
              <span className="text-2xl">Loading AI Model...</span>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Camera className="w-8 h-8" strokeWidth={2.5} />
                <Upload className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <span className="text-2xl">Upload Food Photo</span>
            </>
          )}
        </div>
        
        {!isProcessing && !modelLoading && (
          <>
            <div className="absolute top-2 right-2 w-6 h-6 bg-memphis-yellow rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 bg-memphis-cyan"></div>
          </>
        )}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-lg text-memphis-purple font-bold">
          {modelLoading ? '🤖 AI Model Loading...' : '📸 Snap a pic or choose from gallery'}
        </p>
      </div>
    </div>
  )
}

export default UploadButton
