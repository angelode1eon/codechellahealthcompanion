import React, { useRef, useState } from 'react'
import { Camera, Upload, Sparkles } from 'lucide-react'
import { useFoodRecognition } from '../hooks/useFoodRecognition'
import { SGMessage, SGLoadingSpinner, SGCopywriting } from './SGLocalizedUI'

interface UploadButtonProps {
  onAddMeal: (meal: any) => void
}

const UploadButton: React.FC<UploadButtonProps> = ({ onAddMeal }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { recognizeFood, isModelReady } = useFoodRecognition()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    try {
      // All nutrition data comes from singaporeanDishes.ts via useFoodRecognition hook
      const prediction = await recognizeFood(file)
      
      if (prediction) {
        // Prediction already contains nutrition data from singaporeanDishes.ts
        onAddMeal(prediction)
      } else {
        setError(SGCopywriting.upload.error)
      }
    } catch (err) {
      setError(SGCopywriting.upload.error)
      console.error('Upload error:', err)
    } finally {
      setIsProcessing(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  if (!isModelReady) {
    return (
      <div className="text-center bg-memphis-pink rounded-3xl p-8 border-6 border-memphis-purple shadow-xl">
        <SGLoadingSpinner message="Loading AI model..." />
        <p className="text-gray-600 mt-4 text-lg">
          First time loading may take a few seconds...
        </p>
        <div className="mt-4 bg-white rounded-2xl p-4 border-4 border-memphis-cyan">
          <p className="text-sm text-gray-700">
            <strong>🤖 Local AI Processing:</strong> All analysis happens on your device!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <SGMessage type="error" message={error} />}

      {isProcessing ? (
        <div className="bg-memphis-pink rounded-3xl p-8 border-6 border-memphis-purple shadow-xl">
          <SGLoadingSpinner message={SGCopywriting.upload.processing} />
          <div className="mt-6 bg-white rounded-2xl p-4 border-4 border-memphis-cyan">
            <div className="flex items-center gap-3 justify-center">
              <Sparkles className="w-5 h-5 text-memphis-purple" />
              <p className="text-sm font-bold text-memphis-purple">
                Analyzing with {SGCopywriting.dataSource.local}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={handleButtonClick}
            className="w-full bg-memphis-green hover:bg-opacity-90 text-white font-bold py-6 px-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all border-6 border-memphis-cyan"
          >
            <div className="flex items-center justify-center gap-4">
              <Camera className="w-8 h-8" />
              <span className="text-3xl">{SGCopywriting.upload.button}</span>
              <Upload className="w-8 h-8" />
            </div>
          </button>

          {/* Data Source Badge */}
          <div className="bg-white rounded-2xl p-4 border-4 border-memphis-purple shadow-lg">
            <div className="flex items-center gap-3 justify-center">
              <div className="text-3xl">🇸🇬</div>
              <div className="text-left">
                <p className="text-sm font-bold text-memphis-purple">
                  {SGCopywriting.dataSource.local}
                </p>
                <p className="text-xs text-gray-600">
                  13+ local dishes • Accurate nutrition data
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Badge */}
          <div className="bg-gradient-to-r from-memphis-cyan to-memphis-green rounded-2xl p-4 border-4 border-memphis-yellow shadow-lg">
            <div className="flex items-center gap-3 justify-center text-white">
              <div className="text-2xl">🔒</div>
              <div className="text-left">
                <p className="text-sm font-bold">100% Private & Secure</p>
                <p className="text-xs opacity-90">
                  All processing happens on your device
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default UploadButton
