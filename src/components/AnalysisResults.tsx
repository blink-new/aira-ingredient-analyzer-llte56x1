import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { useState } from 'react'

interface IngredientAnalysis {
  ingredient: string
  riskLevel: 'safe' | 'warning' | 'danger'
  categories: string[]
  description: string
}

interface AnalysisResultsProps {
  analysis: IngredientAnalysis[]
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (ingredient: string) => {
    setOpenItems(prev => 
      prev.includes(ingredient) 
        ? prev.filter(item => item !== ingredient)
        : [...prev, ingredient]
    )
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Microplastic': 'bg-red-100 text-red-800 border-red-200',
      'Comedogenic': 'bg-orange-100 text-orange-800 border-orange-200',
      'Irritant': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Carcinogenic': 'bg-red-100 text-red-800 border-red-200',
      'Endocrine Disruptor': 'bg-purple-100 text-purple-800 border-purple-200',
      'Natural': 'bg-green-100 text-green-800 border-green-200',
      'Preservative': 'bg-blue-100 text-blue-800 border-blue-200',
      'Humectant': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Environmental': 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const safeIngredients = analysis.filter(a => a.riskLevel === 'safe')
  const warningIngredients = analysis.filter(a => a.riskLevel === 'warning')
  const dangerIngredients = analysis.filter(a => a.riskLevel === 'danger')

  return (
    <Card className="floating-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Info className="w-5 h-5 text-aira-primary" />
          <span>Detailed Analysis Results</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-safe/5 border border-safe/20">
            <div className="text-2xl font-bold text-safe">{safeIngredients.length}</div>
            <div className="text-sm text-muted-foreground">Safe</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-warning/5 border border-warning/20">
            <div className="text-2xl font-bold text-warning">{warningIngredients.length}</div>
            <div className="text-sm text-muted-foreground">Caution</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-danger/5 border border-danger/20">
            <div className="text-2xl font-bold text-danger">{dangerIngredients.length}</div>
            <div className="text-sm text-muted-foreground">Harmful</div>
          </div>
        </div>

        {/* Ingredient List */}
        <div className="space-y-3">
          {analysis.map((item, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger 
                onClick={() => toggleItem(item.ingredient)}
                className="w-full"
              >
                <div className="flex items-center justify-between p-4 rounded-xl border border-aira-border hover:bg-aira-surface/50 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    {getSafetyIcon(item.riskLevel)}
                    <div className="text-left">
                      <h4 className="font-medium text-foreground">{item.ingredient}</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.categories.map((category, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(category)}`}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getSafetyColor(item.riskLevel)} border-0`}>
                    {item.riskLevel.toUpperCase()}
                  </Badge>
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <div className="mt-2 p-4 rounded-xl bg-muted/30 border border-aira-border/50">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}