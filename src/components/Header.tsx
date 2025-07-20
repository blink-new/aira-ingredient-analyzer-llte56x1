import { Wind, Shield, Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="glass-strong border-b border-aira-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-aira-primary to-aira-accent flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-aira-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-aira-primary to-aira-accent bg-clip-text text-transparent">
                Aira
              </h1>
              <p className="text-sm text-muted-foreground">Ingredient Safety Analyzer</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-safe/10 border border-safe/20">
              <Shield className="w-4 h-4 text-safe" />
              <span className="text-sm font-medium text-safe">Safe & Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}