import React from 'react'
import { Star, Heart, ExternalLink, Shield, Leaf, Award } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

interface Product {
  id: string
  name: string
  brand: string
  rating: number
  price: string
  image: string
  safetyScore: number
  certifications: string[]
  keyBenefits: string[]
}

const AlternativeProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Gentle Cleansing Foam',
      brand: 'Pure Botanics',
      rating: 4.8,
      price: '$24.99',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center',
      safetyScore: 95,
      certifications: ['Organic', 'Cruelty-Free', 'Vegan'],
      keyBenefits: ['No SLS', 'Hypoallergenic', 'pH Balanced']
    },
    {
      id: '2',
      name: 'Hydrating Face Cleanser',
      brand: 'EcoGlow',
      rating: 4.6,
      price: '$18.50',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop&crop=center',
      safetyScore: 92,
      certifications: ['Natural', 'Dermatologist Tested'],
      keyBenefits: ['Paraben-Free', 'Fragrance-Free', 'Sensitive Skin']
    },
    {
      id: '3',
      name: 'Micellar Cleansing Water',
      brand: 'CleanBeauty Co.',
      rating: 4.7,
      price: '$16.99',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop&crop=center',
      safetyScore: 89,
      certifications: ['Clean Beauty', 'Sustainable'],
      keyBenefits: ['No Rinse Required', 'All Skin Types', 'Travel-Friendly']
    },
    {
      id: '4',
      name: 'Nourishing Oil Cleanser',
      brand: 'Botanical Bliss',
      rating: 4.9,
      price: '$32.00',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=300&fit=crop&crop=center',
      safetyScore: 97,
      certifications: ['Organic', 'Fair Trade', 'Zero Waste'],
      keyBenefits: ['Double Cleansing', 'Anti-Aging', 'Luxury Formula']
    }
  ]

  const getCertificationIcon = (cert: string) => {
    switch (cert.toLowerCase()) {
      case 'organic':
        return <Leaf className="w-3 h-3" />
      case 'cruelty-free':
        return <Heart className="w-3 h-3" />
      case 'vegan':
        return <Shield className="w-3 h-3" />
      default:
        return <Award className="w-3 h-3" />
    }
  }

  const getCertificationColor = (cert: string) => {
    switch (cert.toLowerCase()) {
      case 'organic':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'cruelty-free':
        return 'bg-pink-100 text-pink-700 border-pink-200'
      case 'vegan':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'natural':
        return 'bg-amber-100 text-amber-700 border-amber-200'
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200'
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6 hover-lift">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <div className="p-2 glass-strong rounded-xl">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            Safer Alternatives
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Recommended products without harmful ingredients
          </p>
        </div>
        <Button
          variant="outline"
          className="glass-strong border-2 border-white/40 hover:bg-white/60 rounded-xl"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="glass-strong rounded-2xl p-5 hover-lift transition-all duration-300 group"
          >
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {product.safetyScore}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-slate-600 text-xs">{product.brand}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-slate-700">
                      {product.rating}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">
                    {product.price}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.certifications.slice(0, 2).map((cert, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className={`text-xs px-2 py-0.5 rounded-full border flex items-center gap-1 ${getCertificationColor(cert)}`}
                    >
                      {getCertificationIcon(cert)}
                      {cert}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.keyBenefits.slice(0, 2).map((benefit, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs py-2 rounded-xl"
                  >
                    View Product
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass border border-white/40 hover:bg-white/60 rounded-xl p-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            Compare All Products
          </Button>
          <Button
            variant="outline"
            className="flex-1 glass-strong border-2 border-white/40 hover:bg-white/60 rounded-2xl px-6 py-3"
          >
            Create Wishlist
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AlternativeProducts