import React, { useState } from 'react'
import { Sparkles, Shield, Leaf, AlertTriangle } from 'lucide-react'
import IngredientAnalyzer from './components/IngredientAnalyzer'
import AnalysisResults from './components/AnalysisResults'
import AlternativeProducts from './components/AlternativeProducts'

interface AnalysisResult {
  ingredient: string
  safetyLevel: 'safe' | 'caution' | 'harmful'
  concerns: string[]
  description: string
}

function App() {
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalysis = async (ingredients: string) => {
    setIsAnalyzing(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock analysis results
    const ingredientList = ingredients.split(',').map(i => i.trim()).filter(i => i)
    const results: AnalysisResult[] = ingredientList.map(ingredient => {
      const mockResults = {
        'sodium lauryl sulfate': {
          safetyLevel: 'harmful' as const,
          concerns: ['Irritant', 'Comedogenic'],
          description: 'A harsh surfactant that can strip natural oils and cause irritation.'
        },
        'parabens': {
          safetyLevel: 'harmful' as const,
          concerns: ['Endocrine Disruptor', 'Preservative'],
          description: 'Synthetic preservatives linked to hormone disruption.'
        },
        'coconut oil': {
          safetyLevel: 'safe' as const,
          concerns: [],
          description: 'Natural moisturizing oil with antimicrobial properties.'
        },
        'hyaluronic acid': {
          safetyLevel: 'safe' as const,
          concerns: [],
          description: 'Powerful humectant that holds up to 1000x its weight in water.'
        },
        'fragrance': {
          safetyLevel: 'caution' as const,
          concerns: ['Potential Allergen'],
          description: 'Generic term that may contain undisclosed allergens.'
        }
      }
      
      const lowerIngredient = ingredient.toLowerCase()
      const match = Object.keys(mockResults).find(key => 
        lowerIngredient.includes(key) || key.includes(lowerIngredient)
      )
      
      if (match) {
        return {
          ingredient,
          ...mockResults[match as keyof typeof mockResults]
        }
      }
      
      return {
        ingredient,
        safetyLevel: 'safe' as const,
        concerns: [],
        description: 'No known safety concerns identified.'
      }
    })
    
    setAnalysisResults(results)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-xl float-animation"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-xl float-animation" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl float-animation" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 glass-card rounded-2xl">
              <Sparkles className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-5xl font-bold gradient-text">Aira</h1>
          </div>
          <p className="text-xl text-slate-600 font-medium">
            Ingredient Safety Analyzer
          </p>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
            Analyze product ingredients for harmful substances like microplastics, 
            comedogenic compounds, irritants, and endocrine disruptors.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-emerald-500" />
              <span className="font-semibold text-slate-700">Safe Ingredients</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">2,847</p>
            <p className="text-sm text-slate-500">Verified as safe</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <span className="font-semibold text-slate-700">Flagged Items</span>
            </div>
            <p className="text-2xl font-bold text-amber-600">1,203</p>
            <p className="text-sm text-slate-500">Require caution</p>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover-lift">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-6 h-6 text-indigo-500" />
              <span className="font-semibold text-slate-700">Alternatives</span>
            </div>
            <p className="text-2xl font-bold text-indigo-600">5,692</p>
            <p className="text-sm text-slate-500">Safer options</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <IngredientAnalyzer onAnalyze={handleAnalysis} isAnalyzing={isAnalyzing} />
          
          {analysisResults.length > 0 && (
            <>
              <AnalysisResults results={analysisResults} />
              <AlternativeProducts />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App