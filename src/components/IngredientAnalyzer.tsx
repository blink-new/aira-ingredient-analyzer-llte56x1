import React, { useState } from 'react'
import { Search, Sparkles, Upload, Camera } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface IngredientAnalyzerProps {
  onAnalyze: (ingredients: string) => void
  isAnalyzing: boolean
}

const IngredientAnalyzer: React.FC<IngredientAnalyzerProps> = ({ onAnalyze, isAnalyzing }) => {
  const [ingredients, setIngredients] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ingredients.trim()) {
      onAnalyze(ingredients)
    }
  }

  const handleImageUpload = () => {
    // Mock image upload functionality
    const mockIngredients = "Water, Sodium Lauryl Sulfate, Cocamidopropyl Betaine, Glycerin, Fragrance, Parabens, Coconut Oil"
    setIngredients(mockIngredients)
  }

  return (
    <div className="glass-card rounded-3xl p-8 hover-lift">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Analyze Your Ingredients
        </h2>
        <p className="text-slate-600">
          Paste your ingredient list or upload a product image for instant analysis
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., Water, Sodium Lauryl Sulfate, Glycerin, Fragrance...)"
            className="min-h-32 text-base glass border-2 border-white/30 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-400/20 rounded-2xl resize-none"
            disabled={isAnalyzing}
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImageUpload}
              className="glass-strong rounded-xl hover:bg-white/60"
              disabled={isAnalyzing}
            >
              <Camera className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="glass-strong rounded-xl hover:bg-white/60"
              disabled={isAnalyzing}
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            disabled={!ingredients.trim() || isAnalyzing}
            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze Ingredients
              </>
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="glass-strong border-2 border-white/40 hover:bg-white/60 rounded-2xl px-6 py-3"
            disabled={isAnalyzing}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Try Sample
          </Button>
        </div>
      </form>

      {/* Quick suggestions */}
      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm text-slate-600 mb-3">Quick test with common ingredients:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Sodium Lauryl Sulfate, Parabens',
            'Coconut Oil, Hyaluronic Acid',
            'Fragrance, Alcohol Denat'
          ].map((sample, index) => (
            <button
              key={index}
              onClick={() => setIngredients(sample)}
              className="text-xs px-3 py-1.5 glass-strong rounded-full hover:bg-white/60 transition-colors text-slate-700"
              disabled={isAnalyzing}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IngredientAnalyzer