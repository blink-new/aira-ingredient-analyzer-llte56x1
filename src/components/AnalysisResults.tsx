import React from 'react'
import { Shield, AlertTriangle, XCircle, Info, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

interface AnalysisResult {
  ingredient: string
  safetyLevel: 'safe' | 'caution' | 'harmful'
  concerns: string[]
  description: string
}

interface AnalysisResultsProps {
  results: AnalysisResult[]
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const getSafetyIcon = (level: string) => {
    switch (level) {
      case 'safe':
        return <Shield className="w-5 h-5 text-emerald-500" />
      case 'caution':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />
      case 'harmful':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-slate-500" />
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'safe':
        return 'safety-safe'
      case 'caution':
        return 'safety-caution'
      case 'harmful':
        return 'safety-harmful'
      default:
        return 'glass'
    }
  }

  const getSafetyBadgeColor = (concern: string) => {
    const concernColors: { [key: string]: string } = {
      'Irritant': 'bg-red-100 text-red-700 border-red-200',
      'Comedogenic': 'bg-orange-100 text-orange-700 border-orange-200',
      'Endocrine Disruptor': 'bg-purple-100 text-purple-700 border-purple-200',
      'Carcinogen': 'bg-red-100 text-red-700 border-red-200',
      'Microplastic': 'bg-blue-100 text-blue-700 border-blue-200',
      'Potential Allergen': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Preservative': 'bg-gray-100 text-gray-700 border-gray-200'
    }
    return concernColors[concern] || 'bg-slate-100 text-slate-700 border-slate-200'
  }

  const safeCount = results.filter(r => r.safetyLevel === 'safe').length
  const cautionCount = results.filter(r => r.safetyLevel === 'caution').length
  const harmfulCount = results.filter(r => r.safetyLevel === 'harmful').length

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="glass-card rounded-3xl p-6 hover-lift">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="p-2 glass-strong rounded-xl">
            <Shield className="w-5 h-5 text-indigo-600" />
          </div>
          Analysis Summary
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 glass-strong rounded-2xl">
            <div className="text-2xl font-bold text-emerald-600">{safeCount}</div>
            <div className="text-sm text-slate-600">Safe</div>
          </div>
          <div className="text-center p-4 glass-strong rounded-2xl">
            <div className="text-2xl font-bold text-amber-600">{cautionCount}</div>
            <div className="text-sm text-slate-600">Caution</div>
          </div>
          <div className="text-center p-4 glass-strong rounded-2xl">
            <div className="text-2xl font-bold text-red-600">{harmfulCount}</div>
            <div className="text-sm text-slate-600">Harmful</div>
          </div>
        </div>
      </div>

      {/* Detailed Results */}
      <div className="glass-card rounded-3xl p-6 hover-lift">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Detailed Analysis</h3>
        
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-5 rounded-2xl border-2 ${getSafetyColor(result.safetyLevel)} hover-lift transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getSafetyIcon(result.safetyLevel)}
                    <h4 className="font-semibold text-slate-800 capitalize">
                      {result.ingredient}
                    </h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3">
                    {result.description}
                  </p>
                  
                  {result.concerns.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {result.concerns.map((concern, concernIndex) => (
                        <Badge
                          key={concernIndex}
                          variant="outline"
                          className={`text-xs px-2 py-1 rounded-full border ${getSafetyBadgeColor(concern)}`}
                        >
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="glass-strong rounded-xl hover:bg-white/60 shrink-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          Find Safer Alternatives
        </Button>
        <Button
          variant="outline"
          className="flex-1 glass-strong border-2 border-white/40 hover:bg-white/60 rounded-2xl px-6 py-3"
        >
          Save Analysis
        </Button>
        <Button
          variant="outline"
          className="glass-strong border-2 border-white/40 hover:bg-white/60 rounded-2xl px-6 py-3"
        >
          Share Results
        </Button>
      </div>
    </div>
  )
}

export default AnalysisResults