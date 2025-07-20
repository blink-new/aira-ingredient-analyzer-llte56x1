import { useState } from 'react'
import { Scan, Upload, Sparkles, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { AnalysisResults } from './AnalysisResults'
import { AlternativeProducts } from './AlternativeProducts'

interface IngredientAnalysis {
  ingredient: string
  riskLevel: 'safe' | 'warning' | 'danger'
  categories: string[]
  description: string
}

export function IngredientAnalyzer() {
  const [ingredientText, setIngredientText] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<IngredientAnalysis[] | null>(null)
  const [overallSafety, setOverallSafety] = useState<'safe' | 'warning' | 'danger' | null>(null)

  const handleAnalyze = async () => {
    if (!ingredientText.trim()) return
    
    setIsAnalyzing(true)
    
    // Simulate analysis with mock data
    setTimeout(() => {
      const mockAnalysis: IngredientAnalysis[] = [
        {
          ingredient: 'Sodium Lauryl Sulfate',
          riskLevel: 'warning',
          categories: ['Irritant', 'Comedogenic'],
          description: 'Can cause skin irritation and may clog pores in sensitive individuals.'
        },
        {
          ingredient: 'Parabens (Methylparaben)',
          riskLevel: 'danger',
          categories: ['Endocrine Disruptor', 'Preservative'],
          description: 'May interfere with hormone function and has been linked to health concerns.'
        },
        {
          ingredient: 'Glycerin',
          riskLevel: 'safe',
          categories: ['Humectant', 'Natural'],
          description: 'Safe moisturizing ingredient that helps retain skin hydration.'
        },
        {
          ingredient: 'Microplastic Beads',
          riskLevel: 'danger',
          categories: ['Microplastic', 'Environmental'],
          description: 'Harmful to environment and may cause skin irritation.'
        }
      ]
      
      setAnalysis(mockAnalysis)
      
      // Calculate overall safety
      const dangerCount = mockAnalysis.filter(a => a.riskLevel === 'danger').length
      const warningCount = mockAnalysis.filter(a => a.riskLevel === 'warning').length
      
      if (dangerCount > 0) {
        setOverallSafety('danger')
      } else if (warningCount > 0) {
        setOverallSafety('warning')
      } else {
        setOverallSafety('safe')
      }
      
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleImageUpload = () => {
    // Placeholder for image upload functionality
    alert('Image upload feature coming soon!')
  }

  const getSafetyIcon = (level: 'safe' | 'warning' | 'danger') => {
    switch (level) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-safe" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case 'danger':
        return <XCircle className="w-5 h-5 text-danger" />
    }
  }

  const getSafetyColor = (level: 'safe' | 'warning' | 'danger') => {
    switch (level) {
      case 'safe':
        return 'safety-safe'
      case 'warning':
        return 'safety-warning'
      case 'danger':
        return 'safety-danger'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-aira-primary/10 border border-aira-primary/20">
          <Sparkles className="w-4 h-4 text-aira-primary" />
          <span className="text-sm font-medium text-aira-primary">AI-Powered Safety Analysis</span>
        </div>
        <h2 className="text-4xl font-bold text-foreground">
          Analyze Your Product Ingredients
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Instantly identify harmful substances like microplastics, comedogenic compounds, 
          irritants, carcinogens, and endocrine disruptors in your beauty and personal care products.
        </p>
      </div>

      {/* Input Section */}
      <Card className="floating-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Scan className="w-5 h-5 text-aira-primary" />
            <span>Ingredient Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Paste ingredient list or product label text:
            </label>
            <Textarea
              placeholder="Water, Sodium Lauryl Sulfate, Glycerin, Parabens, Fragrance..."
              value={ingredientText}
              onChange={(e) => setIngredientText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleAnalyze}
              disabled={!ingredientText.trim() || isAnalyzing}
              className="flex-1 bg-gradient-to-r from-aira-primary to-aira-accent hover:opacity-90 text-white"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Analyze Ingredients
                </>
              )}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleImageUpload}
              className="flex-1 sm:flex-none border-aira-border hover:bg-aira-surface"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overall Safety Score */}
      {overallSafety && (
        <Card className="floating-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getSafetyIcon(overallSafety)}
                <div>
                  <h3 className="font-semibold text-lg">Overall Safety Score</h3>
                  <p className="text-muted-foreground">
                    {overallSafety === 'safe' && 'This product appears to be safe for most users'}
                    {overallSafety === 'warning' && 'This product contains some concerning ingredients'}
                    {overallSafety === 'danger' && 'This product contains potentially harmful ingredients'}
                  </p>
                </div>
              </div>
              <Badge className={`${getSafetyColor(overallSafety)} border-0 px-4 py-2 text-sm font-medium`}>
                {overallSafety.toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && <AnalysisResults analysis={analysis} />}

      {/* Alternative Products */}
      {analysis && overallSafety !== 'safe' && <AlternativeProducts />}
    </div>
  )
}