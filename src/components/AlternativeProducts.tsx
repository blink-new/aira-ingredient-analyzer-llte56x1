import { Heart, Star, ExternalLink, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface AlternativeProduct {
  name: string
  brand: string
  rating: number
  price: string
  safetyScore: number
  keyBenefits: string[]
  image: string
  link: string
}

export function AlternativeProducts() {
  const alternatives: AlternativeProduct[] = [
    {
      name: "Gentle Cleansing Foam",
      brand: "Pure Botanics",
      rating: 4.8,
      price: "$24.99",
      safetyScore: 95,
      keyBenefits: ["Sulfate-free", "Paraben-free", "Natural ingredients"],
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center",
      link: "#"
    },
    {
      name: "Organic Daily Cleanser",
      brand: "EcoGlow",
      rating: 4.6,
      price: "$19.99",
      safetyScore: 92,
      keyBenefits: ["Certified organic", "Microplastic-free", "Sensitive skin"],
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&h=200&fit=crop&crop=center",
      link: "#"
    },
    {
      name: "Mineral Face Wash",
      brand: "CleanBeauty Co",
      rating: 4.7,
      price: "$32.00",
      safetyScore: 98,
      keyBenefits: ["Dermatologist tested", "Zero toxins", "Reef-safe"],
      image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&h=200&fit=crop&crop=center",
      link: "#"
    }
  ]

  return (
    <Card className="floating-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-aira-accent" />
          <span>Safer Alternative Products</span>
        </CardTitle>
        <p className="text-muted-foreground">
          We found these safer alternatives with better ingredient profiles
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alternatives.map((product, index) => (
            <div key={index} className="group">
              <div className="glass rounded-2xl p-4 hover:shadow-xl transition-all duration-300 border border-aira-border/50">
                {/* Product Image */}
                <div className="relative mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 rounded-full bg-safe/90 backdrop-blur-sm">
                    <Shield className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white">{product.safetyScore}%</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-aira-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-aira-accent text-aira-accent" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="font-semibold text-aira-primary">{product.price}</span>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1">
                    {product.keyBenefits.map((benefit, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className="text-xs bg-safe/10 text-safe border-safe/20"
                      >
                        {benefit}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="outline" 
                    className="w-full border-aira-primary text-aira-primary hover:bg-aira-primary hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Product
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-aira-primary/10 to-aira-accent/10 border border-aira-border/50">
          <div className="text-center space-y-3">
            <h3 className="font-semibold text-lg text-foreground">
              Want More Personalized Recommendations?
            </h3>
            <p className="text-muted-foreground">
              Get tailored product suggestions based on your skin type, concerns, and preferences
            </p>
            <Button className="bg-gradient-to-r from-aira-primary to-aira-accent text-white hover:opacity-90">
              Get Personal Recommendations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}