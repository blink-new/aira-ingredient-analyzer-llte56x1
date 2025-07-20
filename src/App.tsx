import { useState } from 'react'
import { IngredientAnalyzer } from './components/IngredientAnalyzer'
import { Header } from './components/Header'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-aira-background via-aira-surface to-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <IngredientAnalyzer />
      </main>
    </div>
  )
}

export default App